"use client";

import { useEffect, useState } from "react";

const THEME_STORAGE_KEY = "relay-theme-v2";

const THEMES = [
  { id: "blue", label: "白蓝" },
  { id: "green", label: "白绿" },
  { id: "cyber", label: "黑绿" },
  { id: "midnight", label: "夜蓝" },
  { id: "stone", label: "暖灰" },
] as const;

type ThemeId = (typeof THEMES)[number]["id"];

function isThemeId(value: string | null): value is ThemeId {
  return THEMES.some((theme) => theme.id === value);
}

function readSavedTheme(): ThemeId {
  if (typeof window === "undefined") {
    return "midnight";
  }

  const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
  return isThemeId(savedTheme) ? savedTheme : "midnight";
}

function syncTheme(theme: ThemeId) {
  if (typeof document !== "undefined") {
    document.documentElement.dataset.theme = theme;
  }

  if (typeof window !== "undefined") {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<ThemeId>(readSavedTheme);

  useEffect(() => {
    syncTheme(theme);
  }, [theme]);

  return (
    <div className="inline-flex max-w-[56vw] items-center gap-1 overflow-x-auto rounded-full border border-[var(--color-line)] bg-[var(--color-panel)] p-1 shadow-[0_10px_30px_rgba(15,23,42,0.08)]">
      {THEMES.map((item) => (
        <button
          key={item.id}
          className={`rounded-full px-3 py-2 text-sm font-semibold transition ${
            theme === item.id
              ? "bg-[var(--color-brand)] text-[var(--color-on-brand)] shadow-[0_8px_24px_var(--color-panel-glow)]"
              : "text-[var(--color-muted)] hover:bg-[var(--color-soft)] hover:text-[var(--color-ink)]"
          }`}
          onClick={() => setTheme(item.id)}
          type="button"
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}

export function ThemeToggleInline() {
  const [theme, setTheme] = useState<ThemeId>(readSavedTheme);

  useEffect(() => {
    syncTheme(theme);
  }, [theme]);

  return (
    <div className="grid gap-2">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-muted)]">
        配色方案
      </p>
      <div className="inline-flex flex-wrap items-center gap-1 rounded-[18px] border border-[var(--color-line)] bg-[var(--color-panel)] p-1">
        {THEMES.map((item) => (
          <button
            key={item.id}
            className={`rounded-full px-3 py-2 text-xs font-semibold transition ${
              theme === item.id
                ? "bg-[var(--color-brand)] text-[var(--color-on-brand)] shadow-[0_8px_24px_var(--color-panel-glow)]"
                : "text-[var(--color-muted)] hover:bg-[var(--color-soft)] hover:text-[var(--color-ink)]"
            }`}
            onClick={() => setTheme(item.id)}
            type="button"
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}
