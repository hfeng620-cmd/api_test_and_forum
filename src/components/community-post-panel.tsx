"use client";

import { useState } from "react";

import { createDiscussionPost } from "@/lib/discussion-storage";

type CommunityPostPanelProps = {
  onPostCreated?: () => void;
};

export function CommunityPostPanel({ onPostCreated }: CommunityPostPanelProps) {
  const [open, setOpen] = useState(false);
  const [station, setStation] = useState("");
  const [body, setBody] = useState("");
  const [status, setStatus] = useState("新帖会出现在左侧。");

  function handleSubmit() {
    if (!body.trim()) {
      setStatus("先写一点正文，再发布。");
      return;
    }

    const tags = station
      .split(/[，,\s]+/)
      .map((item) => item.trim())
      .filter(Boolean);

    createDiscussionPost({
      body: body.trim(),
      station: station.trim(),
      tags,
    });

    setBody("");
    setStation("");
    setOpen(false);
    setStatus("已发布。");
    onPostCreated?.();
  }

  return (
    <div
      className="rounded-[8px] border border-[var(--color-line)] bg-[var(--color-panel)] p-4 shadow-[0_16px_50px_rgba(13,25,48,0.06)] backdrop-blur xl:sticky xl:top-24 xl:ml-auto xl:w-[320px]"
      data-selection-comments="off"
    >
      <div className="flex items-center justify-between gap-3 border-b border-[var(--color-line)] pb-3">
        <h2 className="text-lg font-black tracking-tight">发布讨论</h2>
        <span className="text-xs text-[var(--color-muted)]">QQ群 602190132</span>
      </div>

      {!open ? (
        <div className="mt-4">
          <div className="grid gap-3">
            <button
              className="w-full rounded-full bg-[var(--color-brand)] px-6 py-3 text-sm font-bold text-[var(--color-on-brand)] transition hover:bg-[var(--color-brand-deep)]"
              onClick={() => setOpen(true)}
              type="button"
            >
              发布新帖
            </button>
            <a
              className="w-full rounded-full border border-[var(--color-line)] bg-[var(--color-panel)] px-5 py-3 text-center text-sm font-bold text-[var(--color-ink)] transition hover:border-[var(--color-brand)] hover:text-[var(--color-brand-deep)]"
              href="https://github.com/hfeng620-cmd/timin_api_test_and_forum/discussions"
              rel="noreferrer"
              target="_blank"
            >
              GitHub Discussions
            </a>
          </div>

          <p className="mt-3 text-xs leading-6 text-[var(--color-muted)]">{status}</p>
        </div>
      ) : (
        <div className="mt-4">
          <input
            className="w-full rounded-[8px] border border-[var(--color-line)] bg-[var(--color-input)] px-4 py-3 text-sm outline-none transition focus:border-[var(--color-brand)]"
            onChange={(event) => setStation(event.target.value)}
            placeholder="关联站点或标签"
            value={station}
          />

          <textarea
            className="mt-3 min-h-36 w-full resize-none rounded-[8px] border border-[var(--color-line)] bg-[var(--color-input)] px-4 py-3 text-sm leading-7 outline-none transition focus:border-[var(--color-brand)]"
            onChange={(event) => setBody(event.target.value)}
            placeholder="写价格变化、试用活动、模型口径或避坑记录。"
            value={body}
          />

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <button
              className="rounded-full border border-[var(--color-line)] bg-[var(--color-panel)] px-4 py-2 text-sm font-semibold text-[var(--color-muted)] transition hover:bg-[var(--color-soft)] hover:text-[var(--color-ink)]"
              onClick={() => setOpen(false)}
              type="button"
            >
              先收起
            </button>

            <button
              className="rounded-full bg-[var(--color-brand)] px-5 py-2.5 text-sm font-bold text-[var(--color-on-brand)] transition hover:bg-[var(--color-brand-deep)]"
              onClick={handleSubmit}
              type="button"
            >
              发布帖子
            </button>
          </div>

          <p className="mt-3 text-xs leading-6 text-[var(--color-muted)]">{status}</p>
        </div>
      )}
    </div>
  );
}
