"use client";

import { useEffect, useRef, useState } from "react";

import { ThemeToggleInline } from "@/components/theme-toggle";

export function FloatingQuickPanel() {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, []);

  return (
    <div className="fixed bottom-4 left-4 z-30" data-selection-comments="off" ref={wrapperRef}>
      {open ? (
        <div className="mb-3 w-[240px] rounded-[24px] border border-[var(--color-line)] bg-white/96 p-4 shadow-[0_16px_50px_rgba(15,23,42,0.12)] backdrop-blur">
          <p className="text-sm font-bold text-[var(--color-ink)]">快捷面板</p>
          <p className="mt-2 text-xs leading-6 text-[var(--color-muted)]">
            这里放中文快捷入口，顺手把配色切换也并进来。
          </p>
          <div className="mt-4 grid gap-2">
            <a
              className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-soft)] px-3 py-3 text-sm font-semibold text-[var(--color-ink)] transition hover:border-[var(--color-brand)] hover:text-[var(--color-brand-deep)]"
              href="https://github.com/hfeng620-cmd/api_test_and_forum/discussions"
              rel="noreferrer"
              target="_blank"
            >
              打开 Discussions
            </a>
          </div>
          <div className="mt-4">
            <ThemeToggleInline />
          </div>
        </div>
      ) : null}

      <button
        aria-label="打开快捷面板"
        className="flex h-11 min-w-11 items-center justify-center rounded-full border border-[var(--color-line)] bg-white/96 px-3 text-sm font-bold text-[var(--color-brand-deep)] shadow-[0_10px_26px_rgba(15,23,42,0.10)] transition hover:border-[var(--color-brand)] hover:bg-[var(--color-brand-soft)]"
        onClick={() => setOpen((current) => !current)}
        type="button"
      >
        面板
      </button>
    </div>
  );
}
