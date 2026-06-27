"use client";

import Link from "next/link";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

import { AuthButton } from "@/components/auth-button";
import { NotificationBell } from "@/components/notification-bell";
import { OnlineIndicator } from "@/components/online-indicator";
import { CommunityPostPanel } from "@/components/community-post-panel";
import { DiscussionFeed } from "@/components/discussion-feed";
import { QqGroupModalButton } from "@/components/qq-group-modal-button";
import HotTopicsPanel from "@/components/hot-topics-panel";
import UserRankPanel from "@/components/user-rank-panel";
import { useForumAuth } from "@/lib/forum-auth";
import { siteLinks } from "@/lib/site-links";

const collaborationCards = [
  {
    id: "01",
    title: "站内快反馈",
    summary: "补一句、报跳价、留试用。",
    actionLabel: "进入站内区",
    href: "#community-composer" as string,
    external: false,
    accent:
      "border-[var(--color-brand)] bg-[linear-gradient(135deg,var(--color-brand),var(--color-brand-deep))] text-[var(--color-on-brand)] shadow-[0_20px_50px_var(--color-panel-glow)]",
    badge: "bg-[color-mix(in_srgb,var(--color-on-brand)_18%,transparent)] text-[var(--color-on-brand)] ring-1 ring-[color-mix(in_srgb,var(--color-on-brand)_28%,transparent)]",
  },
  {
    id: "02",
    title: "GitHub Discussions",
    summary: "专题归档、经验整理、长期追踪。",
    actionLabel: "进入 Discussions",
    href: siteLinks.discussions as string,
    external: true,
    accent:
      "border border-[var(--color-line)] bg-[var(--color-panel)] text-[var(--color-ink)] shadow-[var(--shadow-card)]",
    badge:
      "bg-[var(--color-soft)] text-[var(--color-brand-deep)] ring-1 ring-[var(--color-line)]",
  },
  {
    id: "03",
    title: "QQ 群 602190132",
    summary: "急线索先同步，再回流站内。",
    actionLabel: "查看加群方式",
    href: "#qq-group-entry" as string,
    external: false,
    accent:
      "border border-[var(--color-line)] bg-[linear-gradient(180deg,var(--color-panel),var(--color-brand-soft))] text-[var(--color-ink)] shadow-[var(--shadow-card)]",
    badge:
      "bg-[var(--color-panel)] text-[var(--color-brand-deep)] ring-1 ring-[var(--color-line)]",
  },
];

const ambientOrbs = [
  "left-[6%] top-16 h-56 w-56 bg-[var(--color-brand-soft)] opacity-70 animate-[pulse_8s_ease-in-out_infinite]",
  "right-[8%] top-28 h-64 w-64 bg-[var(--color-panel-glow)] opacity-55 animate-[pulse_10s_ease-in-out_infinite]",
  "left-[44%] top-[420px] h-72 w-72 bg-[var(--color-soft)] opacity-75 animate-[pulse_12s_ease-in-out_infinite]",
  "right-[18%] top-[940px] h-80 w-80 bg-[var(--color-brand-soft)] opacity-35 animate-[pulse_14s_ease-in-out_infinite]",
];

export default function CommunityPage() {
  const { isAdmin } = useForumAuth();
  const [feedRefreshKey, setFeedRefreshKey] = useState(0);
  const [mobilePanel, setMobilePanel] = useState<"hot" | "rank" | null>(null);
  const [qqModalOpen, setQqModalOpen] = useState(false);
  const [feedbackCard, discussionsCard, qqCard] = collaborationCards;

  useEffect(() => {
    if (!qqModalOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setQqModalOpen(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [qqModalOpen]);

  const handleTopicClick = useCallback((postId: string) => {
    const el = document.getElementById(postId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, []);

  return (
    <main className="theme-stage relative min-h-screen overflow-hidden bg-transparent text-[var(--color-ink)]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[920px] bg-[radial-gradient(circle_at_10%_8%,var(--color-brand-soft),transparent_32%),radial-gradient(circle_at_88%_14%,var(--color-panel-glow),transparent_30%),linear-gradient(180deg,var(--color-header),transparent_76%)] opacity-80"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-[620px] h-[1240px] bg-[radial-gradient(circle_at_12%_18%,var(--color-soft),transparent_34%),radial-gradient(circle_at_86%_48%,var(--color-brand-soft),transparent_32%),linear-gradient(180deg,transparent,color-mix(in_srgb,var(--color-header)_58%,transparent),transparent)] opacity-55"
      />
      {ambientOrbs.map((orb) => (
        <div
          key={orb}
          aria-hidden="true"
          className={`pointer-events-none absolute rounded-full blur-3xl motion-reduce:animate-none ${orb}`}
        />
      ))}
      <section className="sticky top-0 z-30 border-b border-[var(--color-line)] bg-[var(--color-header)] backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1680px] items-center justify-between gap-4 px-4 py-3.5 sm:px-5 lg:px-8">
          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--color-brand)] text-xl font-black text-[var(--color-on-brand)] shadow-[0_10px_30px_var(--color-panel-glow)]">
              T
            </div>
            <div>
              <p className="text-2xl font-black tracking-tight">Timix观察站</p>
              <p className="text-sm text-[var(--color-muted)]">讨论区与共建入口</p>
            </div>
            <div className="hidden md:block">
              <QqGroupModalButton />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <nav className="hidden items-center gap-2 rounded-full border border-[var(--color-line)] bg-[var(--color-panel)] p-1 md:flex">
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
              <span className="rounded-full bg-[var(--color-brand)] px-4 py-2 text-sm font-semibold text-[var(--color-on-brand)] shadow-[0_10px_24px_var(--color-panel-glow)]">
                论坛入口
              </span>
              {isAdmin ? (
                <Link
                  className="rounded-full px-4 py-2 text-sm font-semibold text-[var(--color-muted)] transition hover:bg-[var(--color-soft)] hover:text-[var(--color-ink)]"
                  href="/admin"
                >
                  管理面板
                </Link>
              ) : null}
            </nav>

            <OnlineIndicator />
            <NotificationBell />
            <AuthButton />
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-[1680px] px-4 py-4 sm:px-5 lg:px-8">
        <div className="relative mb-4 overflow-hidden rounded-[32px] border border-[var(--color-line)] bg-[linear-gradient(145deg,var(--color-panel),var(--color-brand-soft)_58%,var(--color-panel))] shadow-[0_24px_72px_rgba(15,23,42,0.09)]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,var(--color-panel-glow),transparent_28%),radial-gradient(circle_at_18%_18%,var(--color-soft),transparent_24%),linear-gradient(180deg,transparent,var(--color-header))] opacity-70"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,var(--color-panel),transparent)]"
          />
          <div className="relative grid gap-5 px-4 py-5 sm:px-6 lg:px-7 lg:py-6 2xl:grid-cols-[minmax(0,0.78fr)_minmax(720px,1.22fr)] 2xl:items-stretch">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between 2xl:flex-col 2xl:items-start 2xl:rounded-[26px] 2xl:border 2xl:border-[var(--color-line)] 2xl:bg-[color-mix(in_srgb,var(--color-panel)_54%,transparent)] 2xl:p-5 2xl:backdrop-blur">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.24em] text-[var(--color-brand-deep)]">
                  Community Hub
                </p>
                <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
                  讨论入口先分流，帖子区再沉淀。
                </h1>
              </div>
              <p className="max-w-lg text-sm leading-7 text-[var(--color-muted)] 2xl:max-w-md">
                站内接短反馈，Discussions 放长期主题，QQ 群只处理急同步；往下就是发帖和讨论工作台。
              </p>
            </div>

            <div className="grid gap-3 md:grid-cols-3 2xl:grid-cols-2">
              <Link
                className={`group flex min-h-[128px] flex-col justify-between rounded-[24px] border px-4 py-4 transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_44px_rgba(15,23,42,0.12)] motion-reduce:hover:translate-y-0 sm:px-5 sm:py-5 2xl:row-span-2 2xl:min-h-[292px] 2xl:p-6 ${feedbackCard.accent}`}
                href={feedbackCard.href}
              >
                <div>
                  <span
                    className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-black tracking-[0.18em] ${feedbackCard.badge}`}
                  >
                    {feedbackCard.id}
                  </span>
                  <p className="mt-4 text-xl font-black">{feedbackCard.title}</p>
                  <p className="mt-2 text-sm leading-6 opacity-90">{feedbackCard.summary}</p>
                </div>
                <p className="mt-4 text-sm font-black">
                  {feedbackCard.actionLabel} <span aria-hidden>→</span>
                </p>
              </Link>

              <a
                className={`group flex min-h-[128px] flex-col justify-between rounded-[24px] border px-4 py-4 transition duration-300 hover:-translate-y-1 hover:border-[var(--color-brand)] hover:shadow-[0_18px_44px_rgba(15,23,42,0.12)] motion-reduce:hover:translate-y-0 sm:px-5 sm:py-5 ${discussionsCard.accent}`}
                href={discussionsCard.href}
                rel="noopener noreferrer"
                target="_blank"
              >
                <div>
                  <span
                    className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-black tracking-[0.18em] ${discussionsCard.badge}`}
                  >
                    {discussionsCard.id}
                  </span>
                  <p className="mt-4 text-xl font-black">{discussionsCard.title}</p>
                  <p className="mt-2 text-sm leading-6 opacity-85">{discussionsCard.summary}</p>
                </div>
                <p className="mt-4 text-sm font-black">
                  {discussionsCard.actionLabel} <span aria-hidden>→</span>
                </p>
              </a>

              <button
                id="qq-group-entry"
                className={`group flex min-h-[128px] flex-col justify-between rounded-[24px] border px-4 py-4 text-left transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_44px_rgba(15,23,42,0.12)] motion-reduce:hover:translate-y-0 sm:px-5 sm:py-5 ${qqCard.accent}`}
                onClick={() => setQqModalOpen(true)}
                type="button"
              >
                <div>
                  <span
                    className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-black tracking-[0.18em] ${qqCard.badge}`}
                  >
                    {qqCard.id}
                  </span>
                  <p className="mt-4 text-xl font-black">{qqCard.title}</p>
                  <p className="mt-2 text-sm leading-6 opacity-90">{qqCard.summary}</p>
                </div>
                <p className="mt-4 text-sm font-black">
                  {qqCard.actionLabel} <span aria-hidden>→</span>
                </p>
              </button>
            </div>
          </div>
        </div>

        <div className="mb-4 rounded-[24px] border border-[var(--color-line)] bg-[color-mix(in_srgb,var(--color-panel)_88%,transparent)] px-4 py-3.5 shadow-[0_14px_34px_rgba(15,23,42,0.05)] backdrop-blur sm:px-5">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-muted)]">
                Discussion Desk
              </p>
              <p className="mt-1 text-base font-black tracking-tight text-[var(--color-ink)]">
                下方先发站内反馈，再从帖子区跟进热议。
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link
                className="rounded-full bg-[var(--color-brand)] px-4 py-2.5 text-sm font-bold text-[var(--color-on-brand)] shadow-[0_12px_24px_var(--color-panel-glow)]"
                href="#community-composer"
              >
                发反馈
              </Link>
              <a
                className="rounded-full border border-[var(--color-line)] bg-[var(--color-panel)] px-4 py-2.5 text-sm font-bold text-[var(--color-ink)] transition hover:border-[var(--color-brand)] hover:text-[var(--color-brand-deep)]"
                href={siteLinks.discussions}
                rel="noopener noreferrer"
                target="_blank"
              >
                去 Discussions
              </a>
            </div>
          </div>
        </div>

        <div className="mb-4 grid grid-cols-2 gap-2 xl:hidden">
          <button
            className={`flex-1 rounded-full px-4 py-2.5 text-sm font-bold transition ${
              mobilePanel === "hot"
                ? "bg-[var(--color-brand)] text-[var(--color-on-brand)]"
                : "border border-[var(--color-line)] bg-[var(--color-panel)] text-[var(--color-muted)]"
            }`}
            onClick={() => setMobilePanel(mobilePanel === "hot" ? null : "hot")}
            type="button"
          >
            热门
          </button>
          <button
            className={`flex-1 rounded-full px-4 py-2.5 text-sm font-bold transition ${
              mobilePanel === "rank"
                ? "bg-[var(--color-brand)] text-[var(--color-on-brand)]"
                : "border border-[var(--color-line)] bg-[var(--color-panel)] text-[var(--color-muted)]"
            }`}
            onClick={() => setMobilePanel(mobilePanel === "rank" ? null : "rank")}
            type="button"
          >
            排行
          </button>
        </div>

        <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_320px] 2xl:grid-cols-[minmax(0,1fr)_360px]">
          <div className="min-w-0 flex-1 space-y-5">
            <div id="community-composer" className="scroll-mt-24">
              <CommunityPostPanel onPostCreated={() => setFeedRefreshKey((value) => value + 1)} />
            </div>
            <DiscussionFeed
              key={feedRefreshKey}
              hideComposer
              title="讨论工作台"
              limit={8}
            />
          </div>

          <aside className="hidden min-w-0 xl:block">
            <div className="sticky top-24 space-y-5">
              <HotTopicsPanel onTopicClick={handleTopicClick} />
              <UserRankPanel />
            </div>
          </aside>
        </div>

        {mobilePanel === "hot" && (
          <div className="mt-5 xl:hidden">
            <HotTopicsPanel onTopicClick={handleTopicClick} />
          </div>
        )}
        {mobilePanel === "rank" && (
          <div className="mt-5 xl:hidden">
            <UserRankPanel />
          </div>
        )}
      </section>

      {qqModalOpen ? (
        <div
          aria-labelledby="qq-group-modal-title"
          aria-modal="true"
          className="fixed inset-0 z-50 grid place-items-center bg-slate-950/35 px-4 py-8 backdrop-blur-sm"
          role="dialog"
        >
          <button
            aria-label="关闭 QQ 群加入方式"
            className="absolute inset-0 cursor-default"
            onClick={() => setQqModalOpen(false)}
            type="button"
          />
          <div className="surface-in relative w-full max-w-sm overflow-hidden rounded-[28px] border border-[var(--color-line)] bg-[var(--surface-gradient)] p-5 shadow-[0_28px_90px_rgba(15,23,42,0.18)]">
            <div className="flex items-start justify-between gap-4 border-b border-[var(--color-line)] pb-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-brand-deep)]">
                  加入 QQ 群
                </p>
                <h2
                  id="qq-group-modal-title"
                  className="mt-2 text-xl font-black tracking-tight text-[var(--color-ink)]"
                >
                  群号 602190132
                </h2>
              </div>
              <button
                className="rounded-full px-2 py-1 text-xs font-semibold text-[var(--color-muted)] transition hover:bg-[var(--color-soft)] hover:text-[var(--color-ink)]"
                onClick={() => setQqModalOpen(false)}
                type="button"
              >
                关闭
              </button>
            </div>

            <div className="mt-5 rounded-[20px] bg-[var(--color-soft)] p-4">
              <div className="flex justify-center rounded-[16px] bg-[var(--color-panel-strong)] p-3 shadow-[inset_0_0_0_1px_var(--color-line)]">
                <Image
                  src="/qq-group-qrcode.jpg"
                  alt="Timix观察站 QQ群二维码"
                  width={248}
                  height={248}
                  className="h-auto w-[248px] rounded-[18px]"
                  unoptimized
                  priority
                />
              </div>
              <div className="mt-4 grid gap-2 text-center">
                <p className="text-sm font-bold text-[var(--color-ink)]">扫码加入 QQ 群</p>
                <p className="text-xs font-semibold text-[var(--color-muted)]">
                  也可以在 QQ 搜索群号 602190132
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
}
