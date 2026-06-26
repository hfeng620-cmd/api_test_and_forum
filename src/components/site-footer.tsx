"use client";

import Link from "next/link";

import { useForumAuth } from "@/lib/forum-auth";
import { siteLinks } from "@/lib/site-links";

const decisionMap = [
  {
    step: "01",
    eyebrow: "榜单",
    title: "先锁定值得继续看的站点",
    description: "从中转站榜单里快速筛出正在被验证、值得跟进的候选。",
    href: "/stations",
  },
  {
    step: "02",
    eyebrow: "模型",
    title: "再把站点和模型放在一起比",
    description: "进入模型择优，把能力、稳定性和使用场景放到同一张桌面上看。",
    href: "/models",
  },
  {
    step: "03",
    eyebrow: "指南",
    title: "有疑问时回到指南校准判断",
    description: "用常见问题和操作说明补齐背景，避免只凭片段反馈做决定。",
    href: "/guides",
  },
  {
    step: "04",
    eyebrow: "社区",
    title: "把结论带回社区继续共建",
    description: "将体验、提醒和新发现沉淀到讨论区，反过来影响下一轮榜单。",
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
  {
    label: "打开线上站点",
    href: siteLinks.pages,
    external: true,
  },
];

export function SiteFooter() {
  const { isAdmin } = useForumAuth();

  return (
    <footer className="mt-auto border-t border-[var(--color-line)] bg-[var(--color-panel)] backdrop-blur">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-8 lg:grid-cols-[1.1fr_0.9fr] lg:px-10 lg:py-10">
        <div className="space-y-6">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-brand-deep)]">
            Timix观察站
          </p>
          <h2 className="mt-3 max-w-2xl text-2xl font-black tracking-tight text-[var(--color-ink)]">
            从榜单出发，穿过模型与指南，最后把判断沉淀回社区。
          </h2>
          <p className="max-w-2xl text-sm leading-7 text-[var(--color-muted)]">
            这里不再只是出口链接，而是一张收束区地图: 先发现候选，再校准选择，最后把反馈送回讨论现场，让榜单、模型、指南、社区形成闭环。
          </p>

          <div className="grid gap-3 md:grid-cols-2">
            {decisionMap.map((item) => (
              <Link
                key={item.href}
                className="group rounded-3xl border border-[var(--color-line)] bg-[color:color-mix(in_srgb,var(--color-panel)_78%,white)] p-5 transition hover:-translate-y-0.5 hover:border-[var(--color-brand)] hover:shadow-[0_18px_50px_rgba(15,23,42,0.08)]"
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

        <div className="grid gap-6">
          <div className="rounded-[28px] border border-[var(--color-line)] bg-[color:color-mix(in_srgb,var(--color-panel)_74%,white)] p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-muted)]">
              下一步地图
            </p>
            <div className="mt-4 space-y-4 text-sm text-[var(--color-muted)]">
              <div className="rounded-2xl border border-[var(--color-line)] px-4 py-3">
                <p className="font-semibold text-[var(--color-ink)]">发现候选</p>
                <p className="mt-1 leading-6">榜单负责给出现场热度，模型页负责把“能不能用”讲得更具体。</p>
              </div>
              <div className="rounded-2xl border border-[var(--color-line)] px-4 py-3">
                <p className="font-semibold text-[var(--color-ink)]">校准判断</p>
                <p className="mt-1 leading-6">当反馈互相矛盾时，指南是统一口径，社区是补充真实样本。</p>
              </div>
              <div className="rounded-2xl border border-[var(--color-line)] px-4 py-3">
                <p className="font-semibold text-[var(--color-ink)]">回流共建</p>
                <p className="mt-1 leading-6">社区里的新结论会继续反哺榜单排序，让下一次进入的人少走弯路。</p>
              </div>
            </div>
          </div>

          <div className="rounded-[28px] border border-[var(--color-line)] bg-[color:color-mix(in_srgb,var(--color-panel)_74%,white)] p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-muted)]">
              协作入口
            </p>
            <div className="mt-4 grid gap-3 text-sm">
              {collaborationLinks.map((item) => (
                <a
                  key={item.label}
                  className="inline-flex items-center justify-between rounded-2xl border border-[var(--color-line)] px-4 py-3 font-medium text-[var(--color-ink)] transition hover:border-[var(--color-brand)] hover:text-[var(--color-brand-deep)]"
                  href={item.href}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span>{item.label}</span>
                  <span className="text-xs uppercase tracking-[0.2em] text-[var(--color-muted)]">
                    Go
                  </span>
                </a>
              ))}
              {isAdmin ? (
                <Link
                  className="inline-flex items-center justify-between rounded-2xl border border-[var(--color-line)] px-4 py-3 font-medium text-[var(--color-ink)] transition hover:border-[var(--color-brand)] hover:text-[var(--color-brand-deep)]"
                  href="/admin"
                >
                  <span>管理员面板</span>
                  <span className="text-xs uppercase tracking-[0.2em] text-[var(--color-muted)]">
                    Admin
                  </span>
                </Link>
              ) : null}
            </div>
            <div className="mt-5 space-y-2 text-sm leading-7 text-[var(--color-muted)]">
              <p>QQ群：602190132</p>
              <p>建议路径：先看榜单，再查模型，遇到问题翻指南，最后回社区对答案。</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
