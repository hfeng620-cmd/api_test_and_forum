"use client";

import Link from "next/link";
import { useState } from "react";

import { CommunityPostPanel } from "@/components/community-post-panel";
import { DiscussionFeed } from "@/components/discussion-feed";
import { QqGroupModalButton } from "@/components/qq-group-modal-button";
import { ThemeToggle } from "@/components/theme-toggle";
import { forumHighlights } from "@/lib/site-data";

export default function CommunityPage() {
  const [feedRefreshKey, setFeedRefreshKey] = useState(0);

  return (
    <main className="min-h-screen bg-[var(--color-bg)] text-[var(--color-ink)]">
      <section className="border-b border-[var(--color-line)] bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4 lg:px-10">
          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--color-brand)] text-xl font-black text-white shadow-[0_10px_30px_var(--color-panel-glow)]">
              T
            </div>
            <div>
              <p className="text-2xl font-black tracking-tight">Timin观察站</p>
              <p className="text-sm text-[var(--color-muted)]">讨论区与共建入口</p>
            </div>
            <div className="hidden md:block">
              <QqGroupModalButton />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <nav className="hidden items-center gap-2 rounded-full border border-[var(--color-line)] bg-white p-1 md:flex">
              <Link
                className="rounded-full px-4 py-2 text-sm font-semibold text-[var(--color-muted)] transition hover:bg-[var(--color-soft)] hover:text-[var(--color-ink)]"
                href="/"
              >
                首页
              </Link>
              <Link
                className="rounded-full px-4 py-2 text-sm font-semibold text-[var(--color-muted)] transition hover:bg-[var(--color-soft)] hover:text-[var(--color-ink)]"
                href="/stations"
              >
                中转站榜单
              </Link>
              <span className="rounded-full bg-[var(--color-brand)] px-4 py-2 text-sm font-semibold text-white shadow-[0_10px_24px_var(--color-panel-glow)]">
                论坛入口
              </span>
            </nav>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
        <div className="grid gap-8 xl:grid-cols-[minmax(0,0.88fr)_minmax(260px,0.46fr)] xl:justify-between">
          <div className="space-y-6">
            <div className="border-b border-[var(--color-line)] pb-6">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-brand-deep)]">
                社区主入口
              </p>
              <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
                <div className="max-w-3xl">
                  <h1 className="text-4xl font-black tracking-tight lg:text-5xl">价格变化、试用线索和避坑记录都先发到这里</h1>
                  <p className="mt-4 text-base leading-8 text-[var(--color-muted)]">
                    左边是最新帖子流，右边是发帖入口。QQ群负责实时协作，GitHub Discussions 负责沉淀长讨论。
                  </p>
                </div>
                <a
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--color-line)] bg-white px-4 py-2 text-sm font-semibold text-[var(--color-ink)] transition hover:border-[var(--color-brand)] hover:text-[var(--color-brand-deep)]"
                  href="https://github.com/hfeng620-cmd/api_test_and_forum/discussions"
                  rel="noreferrer"
                  target="_blank"
                >
                  <span className="text-[var(--color-brand-deep)]">GitHub Discussions</span>
                  <span className="text-[var(--color-muted)]">适合沉淀长讨论</span>
                </a>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {forumHighlights.map((item) => (
                  <span
                    key={item.title}
                    className="rounded-full bg-[var(--color-soft)] px-3 py-2 text-sm font-semibold text-[var(--color-muted)]"
                  >
                    {item.title}
                  </span>
                ))}
              </div>
            </div>

            <DiscussionFeed
              key={feedRefreshKey}
              hideComposer
              title="最新讨论"
              subtitle="右侧发出的新帖会直接落到这里。这里负责承接站点更新、试用线索、避坑记录和正式回复。"
              limit={8}
            />
          </div>

          <CommunityPostPanel onPostCreated={() => setFeedRefreshKey((value) => value + 1)} />
        </div>
      </section>
    </main>
  );
}
