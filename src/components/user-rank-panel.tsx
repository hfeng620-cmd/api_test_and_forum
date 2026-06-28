"use client";

import { useEffect, useState } from "react";
import { getSupabaseClient, isSupabaseConfigured } from "@/lib/supabase";

type UserRankRow = {
  rank: number;
  display_name: string;
  avatar_url: string | null;
  reputation: number;
  post_count: number;
};

function RankBadge({ rank }: { rank: number }) {
  if (rank === 1) {
    return (
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-400 text-xs font-black text-white shadow-[0_2px_8px_rgba(245,158,11,0.35)]">
        {rank}
      </span>
    );
  }
  if (rank === 2) {
    return (
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-300 text-xs font-black text-white shadow-[0_2px_8px_rgba(148,163,184,0.30)]">
        {rank}
      </span>
    );
  }
  if (rank === 3) {
    return (
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-700 text-xs font-black text-white shadow-[0_2px_8px_rgba(180,83,9,0.30)]">
        {rank}
      </span>
    );
  }
  return (
    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--color-soft)] text-xs font-bold text-[var(--color-muted)]">
      {rank}
    </span>
  );
}

export default function UserRankPanel() {
  const [users, setUsers] = useState<UserRankRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchRanks() {
      if (!isSupabaseConfigured()) {
        if (!cancelled) {
          setLoading(false);
          setUsers([]);
        }
        return;
      }

      try {
        const supabase = getSupabaseClient();
        const { data, error: queryError } = await supabase
          .from("forum_user_ranks")
          .select("*")
          .order("reputation", { ascending: false })
          .limit(10);

        if (queryError) throw queryError;

        if (!cancelled) {
          setUsers(
            ((data ?? []) as UserRankRow[]).map((row, index) => ({
              ...row,
              rank: index + 1,
            })),
          );
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "加载排行失败");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchRanks();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="rounded-[20px] border border-[var(--color-line)] bg-[var(--color-panel)] p-5 shadow-[var(--shadow-card)]">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-muted)]">
        贡献排行
      </p>

      {loading && (
        <div className="mt-4 space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="h-10 animate-pulse rounded-xl bg-[var(--color-soft)]"
            />
          ))}
        </div>
      )}

      {!loading && error && (
        <p className="mt-4 text-sm text-[var(--color-muted)]">
          排行加载失败，请稍后再试
        </p>
      )}

      {!loading && !error && users.length === 0 && (
        <p className="mt-4 text-sm text-[var(--color-muted)]">还没有用户排名数据。参与讨论和回复后，会根据活跃度生成排名。</p>
      )}

      {!loading && !error && users.length > 0 && (
        <div className="mt-3">
          {users.map((user) => (
            <div
              key={user.rank}
              className="flex items-center gap-3 border-b border-[var(--color-line)] py-2.5 last:border-b-0"
              style={{ minHeight: 40 }}
            >
              <RankBadge rank={user.rank} />

              {user.avatar_url ? (
                <img
                  alt={user.display_name}
                  className="h-7 w-7 shrink-0 rounded-full object-cover"
                  referrerPolicy="no-referrer"
                  src={user.avatar_url}
                />
              ) : (
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--color-soft)] text-xs font-bold text-[var(--color-muted)]">
                  {user.display_name.charAt(0)}
                </div>
              )}

              <span className="flex-1 truncate text-sm font-bold text-[var(--color-ink)]">
                {user.display_name}
              </span>

              <div className="flex items-center gap-3 text-xs text-[var(--color-muted)]">
                <span className="font-semibold text-[var(--color-brand-deep)]">
                  {user.reputation ?? 0} 声望
                </span>
                <span>{user.post_count ?? 0} 帖</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
