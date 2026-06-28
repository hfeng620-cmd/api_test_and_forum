"use client";

import { useEffect, useRef, useState } from "react";
import { lockBodyScroll } from "@/lib/body-scroll-lock";
import { getSupabaseClient, isSupabaseConfigured } from "@/lib/supabase";

const DISMISS_PERMANENT_KEY = "timin-announce-dismissed-permanent";
const DISMISS_TODAY_KEY = "timin-announce-dismissed-today";

interface Announcement {
  id: string;
  title: string;
  body: string;
  created_at: string;
}

function getTodayKey(): string {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}

export function AnnouncementModal() {
  const [announcement, setAnnouncement] = useState<Announcement | null>(null);
  const [visible, setVisible] = useState(false);
  const [loadFailed, setLoadFailed] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

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

        // Check permanently dismissed
        try {
          const dismissed = localStorage.getItem(DISMISS_PERMANENT_KEY);
          if (dismissed) {
            const ids = JSON.parse(dismissed) as string[];
            if (ids.includes(latest.id)) {
              setAnnouncement(null);
              setVisible(false);
              return;
            }
          }
        } catch { /* ignore */ }

        // Check today dismissed
        try {
          const todayData = localStorage.getItem(DISMISS_TODAY_KEY);
          if (todayData) {
            const parsed = JSON.parse(todayData) as { date: string; ids: string[] };
            if (parsed.date === getTodayKey() && parsed.ids.includes(latest.id)) {
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

  function handleDismissPermanent() {
    setVisible(false);
    if (announcement) {
      try {
        const raw = localStorage.getItem(DISMISS_PERMANENT_KEY);
        const ids = raw ? (JSON.parse(raw) as string[]) : [];
        if (!ids.includes(announcement.id)) {
          ids.push(announcement.id);
        }
        localStorage.setItem(DISMISS_PERMANENT_KEY, JSON.stringify(ids.slice(-20)));
      } catch { /* ignore */ }
    }
  }

  function handleDismissToday() {
    setVisible(false);
    if (announcement) {
      try {
        const todayKey = getTodayKey();
        const raw = localStorage.getItem(DISMISS_TODAY_KEY);
        let parsed: { date: string; ids: string[] } = { date: todayKey, ids: [] };
        if (raw) {
          const existing = JSON.parse(raw) as { date: string; ids: string[] };
          if (existing.date === todayKey) {
            parsed = existing;
          }
        }
        if (!parsed.ids.includes(announcement.id)) {
          parsed.ids.push(announcement.id);
        }
        localStorage.setItem(DISMISS_TODAY_KEY, JSON.stringify(parsed));
      } catch { /* ignore */ }
    }
  }

  // Keyboard handling: Escape to close
  useEffect(() => {
    if (!visible) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setVisible(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    const unlockBodyScroll = lockBodyScroll();
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      unlockBodyScroll();
    };
  }, [visible]);

  if (loadFailed) return null;
  if (!visible || !announcement) return null;

  return (
    <div
      aria-modal="true"
      className="fixed inset-0 z-[300] flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm"
      role="dialog"
    >
      <div ref={panelRef} aria-labelledby="announcement-title" className="modal-enter w-full max-w-lg overflow-hidden rounded-[24px] border border-[var(--color-line)] bg-[var(--color-panel)] shadow-[0_24px_80px_rgba(15,23,42,0.18)]">
        {/* Header */}
        <div className="border-b border-[var(--color-line)] px-6 py-4">
          <div className="flex items-center gap-2">
            <span className="text-lg" aria-hidden="true">📢</span>
            <h2 className="text-lg font-bold text-[var(--color-ink)]" id="announcement-title">{announcement.title}</h2>
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
        <div className="border-t border-[var(--color-line)] px-6 py-4 flex flex-wrap justify-end gap-3">
          <button
            className="rounded-full border border-[var(--color-line)] bg-[var(--color-panel)] px-5 py-2.5 text-sm font-semibold text-[var(--color-muted)] transition hover:bg-[var(--color-soft)] hover:text-[var(--color-ink)]"
            onClick={handleDismissToday}
            type="button"
          >
            今日不再显示
          </button>
          <button
            className="rounded-full bg-[var(--color-brand)] px-5 py-2.5 text-sm font-bold text-[var(--color-on-brand)] transition hover:bg-[var(--color-brand-deep)]"
            onClick={handleDismissPermanent}
            type="button"
          >
            不再显示
          </button>
        </div>
      </div>
    </div>
  );
}
