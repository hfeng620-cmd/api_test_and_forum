-- Forum enhancements: audit log, soft-delete, hot topics, auto-moderation
-- Run in Supabase SQL editor

-- 1. Audit log for moderation actions
create table if not exists public.forum_audit_log (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid not null references auth.users(id) on delete cascade,
  action text not null check (action in ('approve','reject','delete','hide','pin','unpin','edit')),
  target_type text not null check (target_type in ('post','reply')),
  target_id uuid not null,
  reason text,
  old_status jsonb,
  new_status jsonb,
  created_at timestamptz not null default now()
);

create index if not exists forum_audit_actor_idx on public.forum_audit_log(actor_id);
create index if not exists forum_audit_created_idx on public.forum_audit_log(created_at desc);

alter table public.forum_audit_log enable row level security;

create policy "Admins can read audit log" on public.forum_audit_log
  for select using (public.is_forum_admin());

create policy "Admins can insert audit log" on public.forum_audit_log
  for insert with check (public.is_forum_admin());

-- 2. Hot topics view (适配人少的论坛：扩大时间窗口，降低门槛，新帖加权)
create or replace view public.forum_hot_topics
with (security_invoker = true)
as
select
  p.id,
  p.title,
  p.station,
  p.tags,
  p.is_hidden,
  p.created_at,
  pr.display_name as author_name,
  count(distinct r.id) filter (where r.is_hidden = false) as reply_count,
  count(distinct l.user_id) filter (where l.post_id is not null) as like_count,
  greatest(p.created_at, max(r.created_at)) as last_activity,
  (
    -- 点赞：每人 3 分
    count(distinct l.user_id) * 3
    -- 回复：每条 2 分
    + count(distinct r.id) * 2
    -- 新帖保底 1 分（7天内的帖子）
    + case when p.created_at > now() - interval '7 days' then 1 else 0 end
  ) as hot_score
from public.forum_posts p
join public.forum_profiles pr on pr.id = p.author_id
left join public.forum_replies r on r.post_id = p.id and r.is_hidden = false
left join public.forum_likes l on l.post_id = p.id
where p.is_hidden = false
  and p.created_at > now() - interval '30 days'
group by p.id, pr.display_name
order by hot_score desc, p.created_at desc
limit 20;

grant select on public.forum_hot_topics to anon, authenticated;

-- 3. Auto-moderation: spam keyword filter
create table if not exists public.forum_spam_keywords (
  keyword text primary key,
  created_at timestamptz not null default now()
);

-- Default spam keywords (Chinese)
insert into public.forum_spam_keywords (keyword) values
  ('加微信'), ('免费领取'), ('点击链接'), ('日赚'),
  ('兼职'), ('刷单'), ('代理'), ('广告')
on conflict (keyword) do nothing;

create or replace function public.check_spam_content(content text)
returns boolean
language plpgsql
stable
security definer
set search_path = public
as $$
begin
  return exists (
    select 1 from public.forum_spam_keywords
    where lower(content) like '%' || lower(keyword) || '%'
  );
end;
$$;

-- 4. Post statistics for dashboard
create or replace view public.forum_stats
with (security_invoker = true)
as
select
  (select count(*) from public.forum_posts where is_hidden = false) as visible_posts,
  (select count(*) from public.forum_posts where is_hidden = true) as pending_posts,
  (select count(*) from public.forum_replies where is_hidden = false) as visible_replies,
  (select count(*) from public.forum_likes) as total_likes,
  (select count(distinct author_id) from public.forum_posts) as active_authors;

grant select on public.forum_stats to anon, authenticated;

-- 5. User reputation (posts + replies + likes received)
create or replace view public.forum_user_ranks
with (security_invoker = true)
as
select
  pr.id,
  pr.display_name,
  pr.avatar_url,
  pr.created_at,
  coalesce(pc.post_count, 0) as post_count,
  coalesce(rc.reply_count, 0) as reply_count,
  coalesce(lr.likes_received, 0) as likes_received,
  (coalesce(pc.post_count, 0) * 3 + coalesce(rc.reply_count, 0) * 1 + coalesce(lr.likes_received, 0) * 2) as reputation
from public.forum_profiles pr
left join lateral (
  select count(*) as post_count from public.forum_posts p
  where p.author_id = pr.id and p.is_hidden = false
) pc on true
left join lateral (
  select count(*) as reply_count from public.forum_replies r
  where r.author_id = pr.id and r.is_hidden = false
) rc on true
left join lateral (
  select count(*) as likes_received
  from public.forum_likes l
  join public.forum_posts p on p.id = l.post_id and p.author_id = pr.id
  where l.post_id is not null
) lr on true
order by reputation desc;

grant select on public.forum_user_ranks to anon, authenticated;
