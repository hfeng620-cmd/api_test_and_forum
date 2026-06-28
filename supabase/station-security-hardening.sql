-- ========================================
-- Timix观察站 · 站点榜单安全加固
-- 在 Supabase SQL Editor 中运行。
-- 目的：
-- 1) 正式榜单 stations 只允许管理员/站主直接写。
-- 2) 普通登录用户继续通过 station_pending_edits 提交审核。
-- 3) 待审核字段增加数据库 allowlist，避免审核时写入非预期列。
-- ========================================

begin;

alter table public.stations enable row level security;
alter table public.station_pending_edits enable row level security;

-- 正式榜单：公开可读，管理员/站主可直接新增/修改/删除。
drop policy if exists "Authenticated users create stations" on public.stations;
drop policy if exists "Authenticated users update stations" on public.stations;
drop policy if exists "Authenticated users delete stations" on public.stations;
drop policy if exists "Only admins delete stations" on public.stations;
drop policy if exists "Admins create stations" on public.stations;
drop policy if exists "Admins update stations" on public.stations;
drop policy if exists "Admins delete stations" on public.stations;

create policy "Admins create stations" on public.stations
  for insert
  with check (public.is_forum_admin());

create policy "Admins update stations" on public.stations
  for update
  using (public.is_forum_admin())
  with check (public.is_forum_admin());

create policy "Admins delete stations" on public.stations
  for delete
  using (public.is_forum_admin());

-- 待审核编辑：字段只允许落在正式榜单可编辑列中。
alter table public.station_pending_edits
  drop constraint if exists station_pending_edits_field_name_check;

alter table public.station_pending_edits
  add constraint station_pending_edits_field_name_check
  check (
    field_name in (
      'name',
      'url',
      'price',
      'multiplier',
      'entry',
      'package_type',
      'status',
      'models',
      'uptime',
      'latency',
      'source',
      'verdict',
      'note',
      'advantage',
      'risk',
      'badge',
      'group_name',
      'sort_order'
    )
  );

-- 普通用户只能插入自己的 pending edit；审核状态仍由管理员更新。
drop policy if exists "Anyone can submit pending edits" on public.station_pending_edits;
drop policy if exists "Admins can review pending edits" on public.station_pending_edits;

create policy "Anyone can submit pending edits" on public.station_pending_edits
  for insert
  with check (
    auth.uid() = editor_id
    and status = 'pending'
    and reviewed_by is null
    and reviewed_at is null
  );

create policy "Admins can review pending edits" on public.station_pending_edits
  for update
  using (public.is_forum_admin())
  with check (public.is_forum_admin());

commit;
