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
  const [status, setStatus] = useState("先发一条新帖，左侧帖子流会立刻接住它。");

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
    setStatus("已发到左侧帖子流，下面就可以继续回复、点赞和收藏。");
    onPostCreated?.();
  }

  return (
    <div
      className="rounded-[28px] border border-[var(--color-line)] bg-white/96 p-5 shadow-[0_16px_50px_rgba(13,25,48,0.06)] backdrop-blur xl:sticky xl:top-24 xl:ml-auto xl:w-[332px]"
      data-selection-comments="off"
    >
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-muted)]">
        右侧动作区
      </p>

      {!open ? (
        <div className="mt-4">
          <h2 className="text-[28px] font-black leading-[1.08] tracking-tight">发一条正式讨论</h2>
          <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">
            这里负责站内轻量发帖。QQ群适合即时交流，GitHub Discussions 适合沉淀长讨论。
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            <span className="rounded-full bg-[var(--color-soft)] px-3 py-1 text-xs font-semibold text-[var(--color-muted)]">
              价格变化
            </span>
            <span className="rounded-full bg-[var(--color-soft)] px-3 py-1 text-xs font-semibold text-[var(--color-muted)]">
              试用入口
            </span>
            <span className="rounded-full bg-[var(--color-soft)] px-3 py-1 text-xs font-semibold text-[var(--color-muted)]">
              模型口径
            </span>
            <span className="rounded-full bg-[var(--color-soft)] px-3 py-1 text-xs font-semibold text-[var(--color-muted)]">
              避坑记录
            </span>
          </div>

          <div className="mt-6 grid gap-3">
            <button
              className="w-full rounded-full bg-[var(--color-brand)] px-6 py-3 text-sm font-bold text-white transition hover:bg-[var(--color-brand-deep)]"
              onClick={() => setOpen(true)}
              type="button"
            >
              发布新帖
            </button>
            <a
              className="inline-flex w-full items-center justify-center rounded-full border border-[var(--color-line)] bg-white px-4 py-3 text-sm font-bold text-[var(--color-ink)] transition hover:border-[var(--color-brand)] hover:text-[var(--color-brand-deep)]"
              href="https://github.com/hfeng620-cmd/api_test_and_forum/discussions"
              rel="noreferrer"
              target="_blank"
            >
              打开 GitHub Discussions
            </a>
          </div>

          <div className="mt-5 rounded-[22px] bg-[var(--color-soft)] px-4 py-4 text-sm leading-7 text-[var(--color-muted)]">
            <p className="font-semibold text-[var(--color-ink)]">QQ群 602190132</p>
            <p className="mt-1">适合先报线索、同步倍率变化、拉群友一起补测。</p>
          </div>

          <p className="mt-4 text-xs leading-6 text-[var(--color-muted)]">{status}</p>
        </div>
      ) : (
        <div className="mt-5 rounded-[24px] bg-[var(--color-soft)] p-4">
          <p className="text-lg font-black">发布一个新帖</p>
          <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">
            先写你看到的价格变化、试用活动、模型口径或避坑记录。
          </p>

          <input
            className="mt-4 w-full rounded-2xl border border-[var(--color-line)] bg-white px-4 py-3 text-sm outline-none transition focus:border-[var(--color-brand)]"
            onChange={(event) => setStation(event.target.value)}
            placeholder="关联站点，例如 虎虎 / Aether / 杂货铺"
            value={station}
          />

          <textarea
            className="mt-3 min-h-36 w-full rounded-2xl border border-[var(--color-line)] bg-white px-4 py-3 text-sm leading-7 outline-none transition focus:border-[var(--color-brand)]"
            onChange={(event) => setBody(event.target.value)}
            placeholder="例如：Aether 这两天口径没变，但高峰期速度比上周好一些。"
            value={body}
          />

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <button
              className="rounded-full border border-[var(--color-line)] bg-white px-4 py-2 text-sm font-semibold text-[var(--color-muted)] transition hover:bg-[var(--color-soft)] hover:text-[var(--color-ink)]"
              onClick={() => setOpen(false)}
              type="button"
            >
              先收起
            </button>

            <button
              className="rounded-full bg-[var(--color-brand)] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[var(--color-brand-deep)]"
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
