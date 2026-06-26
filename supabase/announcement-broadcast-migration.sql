-- Migration: announcement-broadcast-migration.sql
-- Description: Creates a security-definer RPC function that inserts a notification
--              for every user in forum_profiles when an admin broadcasts an announcement.
--
-- Usage: Run this in the Supabase SQL Editor before using the popup announcement feature.

-- 1. Ensure the notifications table exists with the expected schema
CREATE TABLE IF NOT EXISTS public.notifications (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  type       text NOT NULL,
  message    text NOT NULL,
  post_id    uuid,
  reply_id   uuid,
  read       boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Index for fast lookup by user
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON public.notifications(user_id);

-- 2. Grant necessary permissions
-- The function is security_definer so it runs with the privileges of the owner
-- (typically the postgres role), meaning it can INSERT into notifications on
-- behalf of any user.

-- 3. Create the broadcast_notification RPC
CREATE OR REPLACE FUNCTION public.broadcast_notification(
  p_content text,
  p_link_url text DEFAULT NULL
)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_admin_id uuid;
  v_count integer;
BEGIN
  -- Get the calling user's id
  v_admin_id := auth.uid();

  -- Guard: only admins (forum_admins or site_owners) may call this
  IF NOT (
    EXISTS (SELECT 1 FROM public.forum_admins WHERE user_id = v_admin_id)
    OR EXISTS (SELECT 1 FROM public.site_owners  WHERE user_id = v_admin_id)
  ) THEN
    RAISE EXCEPTION 'permission denied: only admins can broadcast notifications';
  END IF;

  -- Insert one notification row for every registered user
  INSERT INTO public.notifications (user_id, type, message, post_id)
  SELECT
    fp.id                          AS user_id,
    'admin_announcement'::text     AS type,
    p_content                      AS message,
    NULL::uuid                     AS post_id
  FROM public.forum_profiles fp;

  GET DIAGNOSTICS v_count = ROW_COUNT;
  RETURN v_count;
END;
$$;

-- 4. Allow authenticated users to call the function (the function itself checks admin)
GRANT EXECUTE ON FUNCTION public.broadcast_notification(text, text) TO authenticated;
