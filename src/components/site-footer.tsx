"use client";

import Link from "next/link";

import { useForumAuth } from "@/lib/forum-auth";
import { siteLinks } from "@/lib/site-links";

const decisionMap = [
  {
    step: "01",
    eyebrow: "榜单",
    title: "先锁定候选站点",
    description: "先从榜单圈定候选。",
    href: "/stations",
  },
  {
    step: "02",
    eyebrow: "模型",
    title: "再把站点和模型放一起比",
    description: "把能力、稳定性和场景放到一起看。",
    href: "/models",
  },
  {
    step: "03",
    eyebrow: "指南",
    title: "有疑问时回指南校准",
    description: "有分歧时先回这里统一口径。",
    href: "/guides",
  },
  {
    step: "04",
    eyebrow: "社区",
    title: "把结论带回社区",
    description: "把体验和提醒沉淀回讨论区。",
    href: "/community",
  },
];

const collaborationLinks = [
  {
    label: "GitHub Discussions",
    href: siteLinks.discussions,
    external: true,
  },
  {
    label: "GitHub 仓库",
    href: siteLinks.repo,
    external: true,
  },
] as const;

export function SiteFooter() {
  const { isAdmin } = useForumAuth();

  return (
    <footer className="relative mt-auto overflow-hidden border-t border-[var(--color-line)] bg-[var(--color-panel)] backdrop-blur">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,var(--color-panel-glow),transparent_26%),radial-gradient(circle_at_88%_18%,var(--color-brand-soft),transparent_24%),linear-gradient(180deg,color-mix(in_srgb,var(--color-panel-strong)_54%,transparent),transparent)]" />
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-8 lg:grid-cols-[1.1fr_0.9fr] lg:px-10 lg:py-10">
        <div className="relative space-y-6">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-brand-deep)]">
            Timix观察站
          </p>
          <h2 className="mt-3 max-w-2xl text-2xl font-black tracking-tight text-[var(--color-ink)]">
            看到这里，下一步应该很清楚了。
          </h2>
          <p className="max-w-2xl text-sm leading-7 text-[var(--color-muted)]">
            先圈候选，再做判断，最后把结论回流到社区。
          </p>

          <div className="grid gap-3 md:grid-cols-2">
            {decisionMap.map((item) => (
              <Link
                key={item.href}
                className="group rounded-3xl border border-[var(--color-line)] bg-[var(--color-panel-strong)] p-5 transition hover:-translate-y-0.5 hover:border-[var(--color-brand)] hover:bg-[var(--color-soft)] hover:shadow-[0_18px_50px_var(--color-panel-glow)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand)] motion-reduce:transform-none motion-reduce:transition-none"
                href={item.href}
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-brand-deep)]">
                    {item.eyebrow}
                  </p>
                  <span className="text-xs font-semibold text-[var(--color-muted)]">
                    {item.step}
                  </span>
                </div>
                <h3 className="mt-3 text-base font-black leading-6 text-[var(--color-ink)] transition group-hover:text-[var(--color-brand-deep)]">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">
                  {item.description}
                </p>
              </Link>
            ))}
          </div>
        </div>

        <div className="relative grid gap-6">
          <div className="rounded-[28px] border border-[var(--color-line)] bg-[var(--color-panel-strong)] p-6 shadow-[0_18px_44px_var(--color-panel-glow)]">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-muted)]">
              下一步
            </p>
            <div className="mt-4 space-y-4 text-sm text-[var(--color-muted)]">
              <div className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-brand-soft)] px-4 py-3">
                <p className="font-semibold text-[var(--color-ink)]">想先筛站点</p>
                <p className="mt-1 leading-6">先看榜单，快速把候选缩小。</p>
              </div>
              <div className="rounded-2xl border border-[var(--color-line)] px-4 py-3">
                <p className="font-semibold text-[var(--color-ink)]">想尽快做判断</p>
                <p className="mt-1 leading-6">模型页和指南负责帮你收口。</p>
              </div>
              <div className="rounded-2xl border border-[var(--color-line)] px-4 py-3">
                <p className="font-semibold text-[var(--color-ink)]">想补样本或提醒</p>
                <p className="mt-1 leading-6">把新发现留在社区，下一轮会更准。</p>
              </div>
            </div>
            <div className="mt-5 rounded-2xl border border-[var(--color-line)] bg-[var(--color-panel)] px-4 py-3 text-sm leading-7 text-[var(--color-muted)]">
              <p className="font-semibold text-[var(--color-ink)]">维护提示</p>
              <p className="mt-1">有新样本或异常提醒时，优先回社区补充上下文。</p>
            </div>
          </div>

          <div className="rounded-[28px] border border-[var(--color-line)] bg-[var(--color-panel-strong)] p-6 shadow-[0_18px_44px_var(--color-panel-glow)]">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-muted)]">
              协作入口
            </p>
            <div className="mt-4 grid gap-3 text-sm">
              {collaborationLinks.map((item) => (
                <a
                  key={item.label}
                  className="inline-flex items-center justify-between rounded-2xl border border-[var(--color-line)] px-4 py-3 font-medium text-[var(--color-ink)] transition hover:border-[var(--color-brand)] hover:bg-[var(--color-soft)] hover:text-[var(--color-brand-deep)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand)] motion-reduce:transition-none"
                  href={item.href}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span>{item.label}</span>
                  <span className="text-xs uppercase tracking-[0.2em] text-[var(--color-muted)]">
                    打开
                  </span>
                </a>
              ))}
              {isAdmin ? (
                <Link
                  className="inline-flex items-center justify-between rounded-2xl border border-[var(--color-line)] px-4 py-3 font-medium text-[var(--color-ink)] transition hover:border-[var(--color-brand)] hover:bg-[var(--color-soft)] hover:text-[var(--color-brand-deep)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand)] motion-reduce:transition-none"
                  href="/admin"
                >
                  <span>管理员面板</span>
                  <span className="text-xs uppercase tracking-[0.2em] text-[var(--color-muted)]">
                    进入
                  </span>
                </Link>
              ) : null}
            </div>
            <div className="mt-5 rounded-2xl border border-[var(--color-line)] bg-[var(--color-panel)] px-4 py-3 text-sm leading-7 text-[var(--color-muted)]">
              <p>QQ群：602190132</p>
              <p>维护提示：发现变化时，欢迎补充样本和提醒。</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
