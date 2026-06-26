"use client";

import { useEffect, useState } from "react";
import { getSupabaseClient, isSupabaseConfigured } from "@/lib/supabase";

const DISMISS_KEY = "timin-announce-dismissed";

interface Announcement {
  id: string;
  title: string;
  body: string;
  created_at: string;
}

export function AnnouncementModal() {
  const [announcement, setAnnouncement] = useState<Announcement | null>(null);
  const [visible, setVisible] = useState(false);
  const [loadFailed, setLoadFailed] = useState(false);

  useEffect(() => {
    if (!isSupabaseConfigured()) {
      setAnnouncement(null);
      setVisible(false);
      setLoadFailed(false);
      return;
    }

    let cancelled = false;
    const supabase = getSupabaseClient();
    const run = async () => {
      setLoadFailed(false);
      const { data, error } = await supabase
        .from("forum_posts")
        .select("id, title, body, created_at")
        .contains("tags", ["弹窗公告"])
        .eq("is_hidden", false)
        .order("created_at", { ascending: false })
        .limit(1);
      if (error) throw error;

      if (cancelled) return;

      if (!data || data.length === 0) {
        setAnnouncement(null);
        setVisible(false);
        return;
      }

      if (data.length > 0) {
        const latest = data[0] as unknown as Announcement;
        // Check if this specific announcement was already dismissed
        try {
          const dismissed = localStorage.getItem(DISMISS_KEY);
          if (dismissed) {
            const ids = JSON.parse(dismissed) as string[];
            if (ids.includes(latest.id)) {
              setAnnouncement(null);
              setVisible(false);
              return;
            }
          }
        } catch { /* ignore */ }

        setAnnouncement(latest);
        setVisible(true);
      }
    };
    run().catch(() => {
      if (cancelled) return;
      setLoadFailed(true);
      setAnnouncement(null);
      setVisible(false);
    });
    return () => { cancelled = true; };
  }, []);

  function handleDismiss() {
    setVisible(false);
    if (announcement) {
      try {
        const raw = localStorage.getItem(DISMISS_KEY);
        const ids = raw ? (JSON.parse(raw) as string[]) : [];
        if (!ids.includes(announcement.id)) {
          ids.push(announcement.id);
        }
        // Keep only last 20 to avoid localStorage bloat
        localStorage.setItem(DISMISS_KEY, JSON.stringify(ids.slice(-20)));
      } catch { /* ignore */ }
    }
  }

  if (loadFailed) return null;
  if (!visible || !announcement) return null;

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm">
      <div className="modal-enter w-full max-w-lg overflow-hidden rounded-[24px] border border-[var(--color-line)] bg-[var(--color-panel)] shadow-[0_24px_80px_rgba(15,23,42,0.18)]">
        {/* Header */}
        <div className="border-b border-[var(--color-line)] px-6 py-4">
          <div className="flex items-center gap-2">
            <span className="text-lg">📢</span>
            <h2 className="text-lg font-bold text-[var(--color-ink)]">{announcement.title}</h2>
          </div>
        </div>

        {/* Body */}
        <div className="max-h-[50vh] overflow-y-auto px-6 py-4">
          <p className="text-sm leading-7 text-[var(--color-ink)] whitespace-pre-wrap">
            {announcement.body}
          </p>
          <p className="mt-3 text-[11px] text-[var(--color-muted)]">
            {new Date(announcement.created_at).toLocaleString("zh-CN")}
          </p>
        </div>

        {/* Footer */}
        <div className="border-t border-[var(--color-line)] px-6 py-4 flex justify-end">
          <button
            className="rounded-full bg-[var(--color-brand)] px-6 py-3 text-sm font-bold text-[var(--color-on-brand)] transition hover:bg-[var(--color-brand-deep)]"
            onClick={handleDismiss}
            type="button"
          >
            我知道了
          </button>
        </div>
      </div>
    </div>
  );
}
