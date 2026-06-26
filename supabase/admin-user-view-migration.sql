-- Migration: Admin user list with email and online status
-- Run in Supabase SQL editor after forum-schema.sql, owner-schema.sql, and presence-schema.sql.
-- Creates a security_definer RPC that returns all forum profiles with:
--   email (from auth.users), last_seen (from user_presence), is_online (boolean).
-- Only callable by admins (checked via is_forum_admin).

create or replace function public.get_admin_user_list()
returns table (
  user_id uuid,
  display_name text,
  avatar_url text,
  email text,
  last_seen timestamptz,
  is_online boolean
)
language plpgsql
stable
security definer
set search_path = public
as $$
begin
  -- Only admins may call this function
  if not public.is_forum_admin() then
    raise exception 'not authorized';
  end if;

  return query
  select
    fp.id as user_id,
    fp.display_name,
    fp.avatar_url,
    u.email,
    up.last_seen,
    (up.last_seen is not null and up.last_seen > now() - interval '10 minutes') as is_online
  from public.forum_profiles fp
  join auth.users u on u.id = fp.id
  left join public.user_presence up on up.user_id = fp.id
  order by
    (up.last_seen is not null and up.last_seen > now() - interval '10 minutes') desc,
    up.last_seen desc nulls last,
    fp.created_at desc
  limit 200;
end;
$$;

grant execute on function public.get_admin_user_list() to authenticated;
