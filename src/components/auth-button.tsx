"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { getSupabaseClient } from "@/lib/supabase";
import { useForumAuth } from "@/lib/forum-auth";

const AVATAR_COLORS = ["#6366f1","#0ea5e9","#10b981","#f59e0b","#ef4444","#8b5cf6","#ec4899","#14b8a6","#f97316","#84cc16"];

function getAvatarColor(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

export function AuthButton() {
  const { isConnected, isAdmin, isOwner, displayName, email, needsPassword, signOut, showAuthModal, user } = useForumAuth();
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!isConnected || !user) return;
    (async () => {
      try {
        const { data } = await getSupabaseClient()
          .from("forum_profiles")
          .select("avatar_url")
          .eq("id", user.id)
          .single();
        if (data?.avatar_url) setAvatarUrl(data.avatar_url);
      } catch { /* ignore */ }
    })();
  }, [isConnected, user]);

  if (isConnected) {
    const label = displayName || email?.split("@")[0] || "我";
    const initial = label.charAt(0).toUpperCase();
    const bgColor = getAvatarColor(label);

    return (
      <div className="flex items-center gap-2">
        {needsPassword ? (
          <button
            className="flex min-h-11 min-w-11 items-center justify-center rounded-full bg-[var(--color-brand)] text-xs font-bold text-[var(--color-on-brand)] transition hover:bg-[var(--color-brand-deep)]"
            onClick={showAuthModal}
            title="设置密码和昵称"
            type="button"
          >
            !
          </button>
        ) : null}
        <Link
          className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border-2 border-[var(--color-line)] transition hover:border-[var(--color-brand)] hover:shadow-[0_0_12px_var(--color-panel-glow)]"
          href="/profile"
          title={email ?? undefined}
        >
          {avatarUrl ? (
            <img alt={label} className="h-full w-full object-cover" src={avatarUrl} />
          ) : (
            <span className="flex h-full w-full items-center justify-center text-xs font-bold text-white" style={{ backgroundColor: bgColor }}>
              {initial}
            </span>
          )}
        </Link>
        {(isAdmin || isOwner) && (
          <Link
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-line)] bg-[var(--color-panel)] text-[var(--color-muted)] transition hover:border-[var(--color-brand)] hover:bg-[var(--color-brand-soft)] hover:text-[var(--color-brand-deep)]"
            href="/admin"
            title="管理面板"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </Link>
        )}
        <button
          aria-label="退出登录"
          className="hidden min-h-11 min-w-11 items-center justify-center rounded-full border border-[var(--color-line)] bg-[var(--color-panel)] text-xs font-bold text-[var(--color-muted)] transition hover:bg-[var(--color-soft)] hover:text-[var(--color-ink)] sm:flex"
          onClick={() => signOut()}
          title="退出登录"
          type="button"
        >
          ✕
        </button>
      </div>
    );
  }

  return (
    <button
      aria-label="登录"
      className="flex min-h-11 min-w-11 items-center justify-center rounded-full bg-[var(--color-brand)] text-sm font-bold text-[var(--color-on-brand)] transition hover:bg-[var(--color-brand-deep)] shadow-[0_8px_20px_var(--color-panel-glow)] btn-press"
      onClick={showAuthModal}
      title="登录"
      type="button"
    >
      <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    </button>
  );
}
