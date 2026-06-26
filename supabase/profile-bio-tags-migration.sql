-- ========================================
-- Timix观察站 · 用户个人资料 Bio & 自定义标签
-- 在 Supabase SQL Editor 中运行
-- ========================================
-- 注意：bio 和 updated_at 列已存在于 forum-schema.sql 中，
-- 此迁移仅添加 tags 列及相关约束。

-- 1. 添加 tags 列（text[] 数组，默认空数组）
alter table public.forum_profiles
  add column if not exists tags text[] not null default '{}';

-- 2. 添加约束：最多 5 个标签，每个标签最长 20 个字符
--    使用 CHECK 约束 + 函数验证
create or replace function public.validate_profile_tags(tags text[])
returns boolean
language plpgsql
immutable
as $$
declare
  t text;
begin
  -- 允许空数组
  if tags is null or array_length(tags, 1) is null then
    return true;
  end if;
  -- 最多 5 个标签
  if array_length(tags, 1) > 5 then
    return false;
  end if;
  -- 每个标签最长 20 个字符
  foreach t in array tags loop
    if char_length(t) > 20 then
      return false;
    end if;
  end loop;
  return true;
end;
$$;

-- 添加约束（先删除旧约束避免重复）
alter table public.forum_profiles
  drop constraint if exists forum_profiles_tags_check;

alter table public.forum_profiles
  add constraint forum_profiles_tags_check
  check (public.validate_profile_tags(tags));

-- 3. 确保 updated_at 自动更新触发器存在（forum-schema.sql 已创建，此处防御性检查）
-- 触发器 set_forum_profiles_updated_at 已在 forum-schema.sql 中定义

-- 4. 权限：anon 和 authenticated 可读取 profiles（已有 RLS 策略覆盖）
-- forum-schema.sql 中已设置：
--   - "Profiles are public" (SELECT using true)
--   - "Users create their profile" (INSERT with check auth.uid() = id)
--   - "Users update their profile" (UPDATE using auth.uid() = id or is_forum_admin())
-- 无需额外权限设置
