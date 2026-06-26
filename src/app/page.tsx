import type { Metadata } from "next";
import Link from "next/link";

import { AiNewsPanel } from "@/components/ai-news-panel";
import { AuthButton } from "@/components/auth-button";
import { OnlineIndicator } from "@/components/online-indicator";
import { NotificationBell } from "@/components/notification-bell";
import { QqGroupModalButton } from "@/components/qq-group-modal-button";
import { RelayNetworkCanvas } from "@/components/relay-network-canvas";
import { StationRowLink } from "@/components/station-row-link";
import { FavoriteButton } from "@/components/favorite-button";
import {
  prioritizedStationNames,
  resourceLinks,
  stationComparisonRows,
  stationLinkMap,
  tickerItems,
} from "@/lib/site-data";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
  openGraph: {
    url: "/",
  },
};

const decisionRoutes = [
  {
    title: "先比价格和倍率",
    description: "已经有目标模型时，直接去榜单页比真实成本。",
    href: "/stations",
  },
  {
    title: "先看社区反馈",
    description: "想避坑或补线索时，先看最近讨论和群友口径。",
    href: "/community",
  },
  {
    title: "先定模型方向",
    description: "还没想清楚用什么模型时，先走模型择优页。",
    href: "/models",
  },
];

const productLayers = [
  {
    label: "中心任务",
    title: "先把候选站缩到 2 到 3 个",
    description:
      "首页先帮你做第一轮去留判断，不让你一上来就在大量站点里反复横跳。",
  },
  {
    label: "关键输入",
    title: "把成本、口径和风险放进同一视角",
    description:
      "倍率、试用、备注和社区反馈一起看，能更快区分“便宜能用”和“值得长期用”。",
  },
  {
    label: "清晰下一步",
    title: "每块信息都直接连接下一个动作",
    description:
      "榜单负责初筛，社区负责校验，模型页负责定方向，减少无效跳转。",
  },
];

const actionFlows = [
  {
    step: "01",
    title: "先建立第一轮候选",
    description:
      "如果你已经知道目标模型，先按倍率、试用和入口成本筛掉明显不合适的站点。",
    href: "/stations",
    cta: "进入榜单初筛",
  },
  {
    step: "02",
    title: "再补齐风险信号",
    description:
      "把价格变化、群友反馈和特殊口径补进来，避免只凭静态价格做决定。",
    href: "/community",
    cta: "查看实时反馈",
  },
  {
    step: "03",
    title: "最后锁定长期路线",
    description:
      "如果目标模型还没定，再回模型页看场景适配，最后再决定长期充值。",
    href: "/models",
    cta: "去定模型方向",
  },
];

export default function Home() {
  type StationRow = (typeof stationComparisonRows)[number];
  const topRows = prioritizedStationNames
    .map((name) => stationComparisonRows.find((row) => row.name === name))
    .filter((row): row is StationRow => Boolean(row));
  const moreRows = stationComparisonRows.filter(
    (row) => !prioritizedStationNames.includes(row.name),
  );
  const featuredLead = topRows[0] ?? null;
  const lowRateCount = stationComparisonRows.filter((row) => {
    const value = Number(row.multiplier.match(/(\d+(?:\.\d+)?)x/)?.[1] ?? Number.NaN);
    return Number.isFinite(value) && value <= 0.15;
  }).length;
  const trialReadyCount = stationComparisonRows.filter(
    (row) =>
      row.badge.includes("试用") ||
      row.badge.includes("免费") ||
      row.note.includes("注册送") ||
      row.price.includes("免费"),
  ).length;

  return (
    <main className="min-h-screen bg-[var(--color-bg)] text-[var(--color-ink)]">
      <style>{`
        @keyframes logo-pulse {
          0%, 100% { box-shadow: 0 10px 30px var(--color-panel-glow); }
          50% { box-shadow: 0 14px 38px var(--color-panel-glow); }
        }
        @keyframes ticker-slide {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .logo-pulse {
          animation: logo-pulse 2.4s ease-in-out infinite;
        }
        .ticker-enter {
          animation: ticker-slide 480ms 200ms cubic-bezier(0.2, 0.8, 0.2, 1) both;
        }
        .stagger-in:nth-child(5) { animation-delay: 160ms; }
        .stagger-in:nth-child(6) { animation-delay: 200ms; }
        .stagger-in:nth-child(7) { animation-delay: 240ms; }
        .stagger-in:nth-child(8) { animation-delay: 280ms; }
        @media (prefers-reduced-motion: reduce) {
          .logo-pulse, .ticker-enter { animation: none; }
        }
      `}</style>
      <section className="sticky top-0 z-30 border-b border-[var(--color-line)] bg-[var(--color-header)] backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4 lg:px-10">
          <div className="flex items-center gap-4">
            <div className="logo-pulse flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--color-brand)] text-xl font-black text-[var(--color-on-brand)]">
              T
            </div>
            <div>
              <p className="text-2xl font-black tracking-tight">Timix观察站</p>
              <p className="text-sm text-[var(--color-muted)]">
                先看榜单，再决定长期用谁。
              </p>
            </div>
            <div className="hidden lg:block hover:scale-105 transition-transform">
              <QqGroupModalButton />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <nav className="hidden items-center gap-8 text-sm font-semibold text-[var(--color-muted)] lg:flex">
              <span className="text-[var(--color-ink)]">首页</span>
              <Link className="link-underline transition hover:text-[var(--color-ink)]" href="/stations">
                中转站榜单
              </Link>
              <Link className="link-underline transition hover:text-[var(--color-ink)]" href="/community">
                论坛入口
              </Link>
              <Link className="link-underline transition hover:text-[var(--color-ink)]" href="/models">
                模型择优
              </Link>
              <Link className="link-underline transition hover:text-[var(--color-ink)]" href="/guides">
                更多指南
              </Link>
            </nav>
            <OnlineIndicator />
            <NotificationBell />
            <AuthButton />
          </div>
        </div>

        <div className="border-t border-[var(--color-line)] bg-[var(--color-panel)]">
          <div className="ticker-enter mx-auto flex max-w-7xl items-center gap-5 overflow-x-auto px-6 py-3 text-sm whitespace-nowrap text-[var(--color-muted)] lg:px-10">
            <span className="font-semibold text-[var(--color-ink)]">站点速报</span>
            {tickerItems.map((item) => (
              item.href.startsWith("http") ? (
                <a
                  key={item.label}
                  className="flex items-center gap-2 transition hover:text-[var(--color-ink)]"
                  href={item.href}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span>{item.label}</span>
                </a>
              ) : (
                <Link
                  key={item.label}
                  className="flex items-center gap-2 transition hover:text-[var(--color-ink)]"
                  href={item.href}
                >
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span>{item.label}</span>
                </Link>
              )
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-b border-[var(--color-line)]">
        <RelayNetworkCanvas className="opacity-90" />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.72),rgba(244,247,251,0.28)_55%,rgba(219,234,254,0.62))]" />
        <div className="relative mx-auto max-w-7xl px-6 py-10 lg:px-10 lg:py-14">
          <div className="grid gap-8 lg:grid-cols-[1.12fr_0.88fr] lg:items-end">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--color-brand-deep)]">
                Relay Signal Desk
              </p>
              <h1 className="mt-5 max-w-4xl text-4xl font-black tracking-tight text-[var(--color-ink)] sm:text-5xl">
                把中转站从“能用”，筛到“值得长期用”。
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--color-muted)] sm:text-lg">
                我们把倍率、真实入口、模型口径、社区备注和试用线索放进同一块观察面板里，
                让你先做低成本验证，再决定谁适合长期放进工作流。
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href="/stations"
                  className="rounded-full bg-[var(--color-brand)] px-6 py-3 text-sm font-black text-[var(--color-on-brand)] shadow-[0_14px_34px_var(--color-panel-glow)] transition hover:scale-105 hover:bg-[var(--color-brand-deep)]"
                >
                  进入观察总表
                </Link>
                <Link
                  href="/community"
                  className="rounded-full border border-[var(--color-line)] bg-white/80 px-6 py-3 text-sm font-bold text-[var(--color-ink)] backdrop-blur transition hover:border-[var(--color-brand)] hover:text-[var(--color-brand-deep)]"
                >
                  去社区看实时反馈
                </Link>
              </div>
              <div className="mt-7 grid gap-3 sm:grid-cols-3">
                {decisionRoutes.map((route) => (
                  <Link
                    key={route.title}
                    href={route.href}
                    className="rounded-[22px] border border-white/70 bg-white/72 px-4 py-4 shadow-[0_16px_34px_rgba(15,23,42,0.06)] backdrop-blur transition hover:-translate-y-0.5 hover:border-[var(--color-brand)] hover:shadow-[0_18px_36px_rgba(15,23,42,0.10)]"
                  >
                    <p className="text-sm font-black text-[var(--color-ink)]">{route.title}</p>
                    <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">{route.description}</p>
                  </Link>
                ))}
              </div>
              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                <div className="rounded-[20px] border border-white/70 bg-white/72 px-4 py-4 shadow-[0_16px_34px_rgba(15,23,42,0.06)] backdrop-blur">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-muted)]">
                    收录站点
                  </p>
                  <p className="mt-2 text-3xl font-black">{stationComparisonRows.length}</p>
                </div>
                <div className="rounded-[20px] border border-white/70 bg-white/72 px-4 py-4 shadow-[0_16px_34px_rgba(15,23,42,0.06)] backdrop-blur">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-muted)]">
                    低倍率样本
                  </p>
                  <p className="mt-2 text-3xl font-black">{lowRateCount}</p>
                </div>
                <div className="rounded-[20px] border border-white/70 bg-white/72 px-4 py-4 shadow-[0_16px_34px_rgba(15,23,42,0.06)] backdrop-blur">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-muted)]">
                    可先试用
                  </p>
                  <p className="mt-2 text-3xl font-black">{trialReadyCount}</p>
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[28px] border border-white/70 bg-white/78 p-6 shadow-[0_22px_64px_rgba(15,23,42,0.08)] backdrop-blur">
              <div className="absolute inset-x-0 top-0 h-28 bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.16),transparent_70%)]" />
              <div className="relative">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--color-brand-deep)]">
                  当前主观察面
                </p>
                {featuredLead ? (
                  <>
                    <div className="mt-4 flex items-start justify-between gap-4">
                      <div>
                        <h2 className="text-2xl font-black">{featuredLead.name}</h2>
                        <p className="mt-2 text-sm leading-7 text-[var(--color-muted)]">
                          {featuredLead.note}
                        </p>
                      </div>
                      <span className="rounded-full bg-[var(--color-brand-soft)] px-3 py-1 text-xs font-bold text-[var(--color-brand-deep)]">
                        {featuredLead.badge}
                      </span>
                    </div>
                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                      <div className="rounded-[18px] border border-[var(--color-line)] bg-white/82 px-4 py-4">
                        <p className="text-xs text-[var(--color-muted)]">价格 / 倍率</p>
                        <p className="mt-2 text-lg font-black">{featuredLead.price}</p>
                        <p className="mt-1 text-sm font-semibold text-[var(--color-brand-deep)]">
                          {featuredLead.multiplier}
                        </p>
                      </div>
                      <div className="rounded-[18px] border border-[var(--color-line)] bg-white/82 px-4 py-4">
                        <p className="text-xs text-[var(--color-muted)]">一句判断</p>
                        <p className="mt-2 text-sm leading-7 text-[var(--color-ink)]">
                          {featuredLead.verdict}
                        </p>
                      </div>
                    </div>
                  </>
                ) : null}
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-[18px] border border-[var(--color-line)] bg-white/76 px-4 py-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-muted)]">
                      先看什么
                    </p>
                    <p className="mt-2 text-sm leading-7 text-[var(--color-ink)]">
                      先筛倍率和试用，再看群友备注，最后再决定值不值得长期充值。
                    </p>
                  </div>
                  <div className="rounded-[18px] border border-[var(--color-line)] bg-white/76 px-4 py-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-muted)]">
                      观察口径
                    </p>
                    <p className="mt-2 text-sm leading-7 text-[var(--color-ink)]">
                      同站不同模型可能完全不是一个价格，像 GPT、Claude、Grok 要拆开判断。
                    </p>
                  </div>
                </div>
                <div className="mt-5 rounded-[18px] border border-[var(--color-line)] bg-white/76 px-4 py-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-muted)]">
                    三步判断
                  </p>
                  <div className="mt-3 grid gap-3 sm:grid-cols-3">
                    <div>
                      <p className="text-sm font-black text-[var(--color-ink)]">01 先试用</p>
                      <p className="mt-1 text-sm leading-6 text-[var(--color-muted)]">优先拿可试用、注册送额和低门槛入口做验证。</p>
                    </div>
                    <div>
                      <p className="text-sm font-black text-[var(--color-ink)]">02 看备注</p>
                      <p className="mt-1 text-sm leading-6 text-[var(--color-muted)]">重点看群友反馈、特殊口径、双档价格和模型分组。</p>
                    </div>
                    <div>
                      <p className="text-sm font-black text-[var(--color-ink)]">03 再长期用</p>
                      <p className="mt-1 text-sm leading-6 text-[var(--color-muted)]">稳定性、成本和口径都顺了，再决定谁进主工作流。</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--color-line)]">
        <div className="mx-auto max-w-7xl px-6 py-10 lg:px-10 lg:py-12">
          <div className="grid gap-6 xl:grid-cols-[1.04fr_0.96fr]">
            <div className="rounded-[30px] border border-[var(--color-line)] bg-[linear-gradient(180deg,rgba(255,255,255,0.94),rgba(239,246,255,0.9))] p-6 shadow-[0_22px_60px_rgba(15,23,42,0.06)] lg:p-7">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--color-brand-deep)]">
                产品路径
              </p>
              <h2 className="mt-4 max-w-3xl text-3xl font-black tracking-tight sm:text-4xl">
                从首页直接完成第一轮判断，再进入更深的验证。
              </h2>
              <p className="mt-4 max-w-3xl text-base leading-8 text-[var(--color-muted)]">
                先在这里理解该看什么、先做什么、下一步去哪里。这样用户不会只看到信息堆叠，
                而是能顺着明确路径，把“要不要试”“要不要长期用”拆成连续动作。
              </p>
              <div className="mt-6 grid gap-4 lg:grid-cols-3">
                {productLayers.map((layer) => (
                  <article
                    key={layer.title}
                    className="rounded-[24px] border border-white/80 bg-white/82 px-5 py-5 shadow-[0_16px_34px_rgba(15,23,42,0.05)] backdrop-blur"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-muted)]">
                      {layer.label}
                    </p>
                    <h3 className="mt-3 text-lg font-black text-[var(--color-ink)]">{layer.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">
                      {layer.description}
                    </p>
                  </article>
                ))}
              </div>
            </div>

            <aside className="rounded-[30px] border border-[var(--color-line)] bg-[linear-gradient(180deg,rgba(239,246,255,0.96),rgba(255,255,255,0.92))] p-6 shadow-[0_22px_60px_rgba(37,99,235,0.08)] lg:p-7">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-white/80 px-3 py-1 text-xs font-bold text-[var(--color-brand-deep)]">
                  已收录 {stationComparisonRows.length} 个站点
                </span>
                <span className="rounded-full bg-white/80 px-3 py-1 text-xs font-bold text-[var(--color-brand-deep)]">
                  {lowRateCount} 个低倍率样本
                </span>
                <span className="rounded-full bg-white/80 px-3 py-1 text-xs font-bold text-[var(--color-brand-deep)]">
                  {trialReadyCount} 个可先试用
                </span>
              </div>
              <h2 className="mt-4 text-2xl font-black tracking-tight sm:text-3xl">
                推荐起步路径
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--color-muted)]">
                默认建议是先小成本验证，再补风险信号，最后才做长期选择。每一步都只解决一个问题，
                决策会更轻，也更接近真实使用场景。
              </p>
              <div className="mt-6 space-y-4">
                {actionFlows.map((flow) => (
                  <div
                    key={flow.step}
                    className="rounded-[24px] border border-white/80 bg-white/84 px-5 py-5 shadow-[0_14px_32px_rgba(15,23,42,0.05)]"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-muted)]">
                          Step {flow.step}
                        </p>
                        <h3 className="mt-2 text-lg font-black text-[var(--color-ink)]">{flow.title}</h3>
                      </div>
                      <Link
                        href={flow.href}
                        className="rounded-full border border-[var(--color-line)] bg-[var(--color-panel)] px-4 py-2 text-xs font-bold text-[var(--color-brand-deep)] transition hover:border-[var(--color-brand)] hover:text-[var(--color-brand)]"
                      >
                        {flow.cta}
                      </Link>
                    </div>
                    <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">
                      {flow.description}
                    </p>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--color-line)]">
        <div className="surface-in mx-auto max-w-7xl px-6 py-8 lg:px-10 lg:py-10">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--color-brand-deep)]">
                建立判断基准
              </p>
              <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
                先从代表性站点看出差异
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--color-muted)]">
                这一屏不是给你看完全部信息，而是帮你快速建立价格、倍率和站点口径的参考面。
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/stations"
                className="rounded-full bg-[var(--color-brand)] px-5 py-3 text-sm font-black text-[var(--color-on-brand)] shadow-[0_12px_28px_var(--color-panel-glow)] transition hover:scale-105 hover:bg-[var(--color-brand-deep)]"
              >
                查看完整榜单
              </Link>
              <Link
                href="/community"
                className="rounded-full border border-[var(--color-line)] bg-[var(--color-panel)] px-5 py-3 text-sm font-bold text-[var(--color-ink)] transition hover:scale-105 hover:border-[var(--color-brand)] hover:text-[var(--color-brand-deep)]"
              >
                进入社区讨论
              </Link>
              <div className="lg:hidden hover:scale-105 transition-transform">
                <QqGroupModalButton />
              </div>
            </div>
          </div>

          <div className="surface-in overflow-hidden rounded-[20px] border border-[var(--color-line)] bg-[var(--surface-gradient)] shadow-[var(--shadow-card)]">
            <div className="grid gap-0 lg:grid-cols-[1.35fr_0.65fr]">
              <div className="px-6 py-6 lg:px-8 lg:py-7">
                <div className="hidden grid-cols-[0.55fr_1fr_0.95fr_0.75fr_1.35fr] border-b border-[var(--color-line)] pb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--color-muted)] md:grid">
                  <span>排名</span>
                  <span>站点</span>
                  <span>价格</span>
                  <span>倍率</span>
                  <span>一句判断</span>
                </div>

                <div className="mt-1">
                  {topRows.map((row, index) => (
                    <StationRowLink
                      key={`${row.name}-${index}`}
                      href={stationLinkMap[row.name]}
                      className="stagger-in grid cursor-pointer gap-4 border-b border-[var(--color-line)] py-5 transition hover:bg-[var(--color-hover)] md:grid-cols-[0.55fr_1fr_0.95fr_0.75fr_1.35fr] md:items-start"
                    >
                      <div className="flex min-w-0 items-center justify-between gap-3 md:block">
                        <span className="text-sm font-bold text-[var(--color-muted)] md:pt-1">
                          {(index + 1).toString().padStart(2, "0")}
                        </span>
                        <span className="rounded-full bg-[var(--color-brand-soft)] px-3 py-1 text-xs font-bold text-[var(--color-brand-deep)] md:hidden">
                          {row.badge}
                        </span>
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-3">
                          <h3 className="text-lg font-black">{row.name}</h3>
                          <FavoriteButton stationName={row.name} />
                          <span className="hidden text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-brand-deep)] md:inline">
                            {row.badge}
                          </span>
                        </div>
                        <p className="mt-2 truncate text-sm leading-6 text-[var(--color-muted)]">{row.group}</p>
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-base font-black">{row.price}</p>
                        <p className="mt-2 truncate text-sm leading-6 text-[var(--color-brand-deep)]">{row.entry}</p>
                      </div>
                      <p className="min-w-0 truncate pt-1 text-base font-black">{row.multiplier}</p>
                      <div className="min-w-0">
                        <p className="truncate text-base font-black">{row.verdict}</p>
                        <p className="mt-2 line-clamp-2 text-sm leading-6 text-[var(--color-muted)]">{row.note}</p>
                      </div>
                    </StationRowLink>
                  ))}
                </div>
              </div>

              <aside className="border-t border-[var(--color-line)] bg-[var(--color-panel)] px-6 py-6 lg:border-t-0 lg:border-l lg:px-8 lg:py-7">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--color-muted)]">
                  社区入口
                </p>
                <div className="mt-4 space-y-5">
                  <div className="border-b border-[var(--color-line)] pb-5">
                    <p className="text-sm text-[var(--color-muted)]">站内讨论</p>
                    <p className="mt-1 text-2xl font-black">站点反馈、价格变化、试用线索</p>
                    <Link
                      href="/community"
                      className="mt-4 inline-flex rounded-full bg-[var(--color-brand)] px-5 py-3 text-sm font-black text-[var(--color-on-brand)] transition hover:scale-105 hover:bg-[var(--color-brand-deep)]"
                    >
                      进入讨论区
                    </Link>
                  </div>
                  <div className="border-b border-[var(--color-line)] pb-5">
                    <p className="text-sm text-[var(--color-muted)]">QQ群</p>
                    <p className="mt-1 text-xl font-black">602190132</p>
                  </div>
                  <div className="border-b border-[var(--color-line)] pb-5">
                    <p className="text-sm text-[var(--color-muted)]">GitHub</p>
                    <a
                      className="mt-1 inline-flex text-base font-black text-[var(--color-brand-deep)] transition hover:scale-105 hover:text-[var(--color-brand)]"
                      href="https://github.com/hfeng620-cmd/timin_api_test_and_forum/discussions"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      打开 GitHub Discussions
                    </a>
                  </div>
                  <div className="space-y-3">
                    {resourceLinks.slice(0, 2).map((link) =>
                      link.href.startsWith("http") ? (
                        <a
                          key={link.title}
                          className="block border-b border-[var(--color-line)] pb-3 transition hover:border-[var(--color-brand)]"
                          href={link.href}
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          <p className="text-base font-black text-[var(--color-ink)]">{link.title}</p>
                          <p className="mt-1 text-sm leading-6 text-[var(--color-muted)] line-clamp-2">
                            {link.note}
                          </p>
                        </a>
                      ) : (
                        <Link
                          key={link.title}
                          className="block border-b border-[var(--color-line)] pb-3 transition hover:border-[var(--color-brand)]"
                          href={link.href}
                        >
                          <p className="text-base font-black text-[var(--color-ink)]">{link.title}</p>
                          <p className="mt-1 text-sm leading-6 text-[var(--color-muted)] line-clamp-2">
                            {link.note}
                          </p>
                        </Link>
                      ),
                    )}
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-[var(--color-line)]">
        <div className="mx-auto max-w-7xl px-6 py-10 lg:px-10 lg:py-6">
          <AiNewsPanel />
        </div>
      </section>

      <section className="border-t border-[var(--color-line)]">
        <div className="mx-auto max-w-7xl px-6 py-10 lg:px-10 lg:py-12">
          <div className="flex items-end justify-between gap-6 border-b border-[var(--color-line)] pb-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--color-muted)]">
                更多中转站
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight">更多站点</h2>
            </div>
            <Link
              href="/stations"
              className="inline-flex items-center text-sm font-bold text-[var(--color-brand-deep)]"
            >
              完整榜单 →
            </Link>
          </div>
          <div className="mt-3">
            {moreRows.map((row, index) => {
              const url = stationLinkMap[row.name];
              const baseClasses =
                "stagger-in card-lift grid gap-3 border-b border-[var(--color-line)] py-5 transition md:grid-cols-[0.9fr_0.9fr_0.6fr_1.4fr]";
              const linkClasses = `${baseClasses} cursor-pointer hover:bg-[var(--color-hover)]`;
              const plainClasses = `${baseClasses} hover:bg-[var(--color-hover)]`;

              const content = (
                <>
                  <div className="min-w-0">
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-black">{row.name}</h3>
                      <FavoriteButton stationName={row.name} />
                      <span className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-brand-deep)]">
                        {row.badge}
                      </span>
                    </div>
                    <p className="mt-2 truncate text-sm leading-6 text-[var(--color-muted)]">{row.group}</p>
                  </div>
                  <div className="min-w-0">
                    <p className="truncate font-black">{row.price}</p>
                    <p className="mt-2 truncate text-sm leading-6 text-[var(--color-muted)]">
                      {row.packageType}
                    </p>
                  </div>
                  <p className="min-w-0 truncate font-black">{row.multiplier}</p>
                  <p className="min-w-0 text-sm leading-6 text-[var(--color-muted)] line-clamp-2">{row.note}</p>
                </>
              );

              return url ? (
                <StationRowLink
                  key={`${row.name}-extended-${index}`}
                  className={linkClasses}
                  href={url}
                >
                  {content}
                </StationRowLink>
              ) : (
                <article
                  key={`${row.name}-extended-${index}`}
                  className={plainClasses}
                >
                  {content}
                </article>
              );
            })}
          </div>
          <div className="mt-8 rounded-[28px] border border-[var(--color-line)] bg-[linear-gradient(135deg,rgba(239,246,255,0.96),rgba(255,255,255,0.92))] px-6 py-6 shadow-[0_18px_44px_rgba(37,99,235,0.08)]">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--color-brand-deep)]">
                  下一步动作
                </p>
                <h2 className="mt-3 text-2xl font-black tracking-tight sm:text-3xl">
                  看完榜单后，把判断继续往前推一步。
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--color-muted)]">
                  如果你已经筛出候选，就去社区补风险信息；如果还没定模型路线，就直接回模型页继续收口。
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/community"
                  className="rounded-full bg-[var(--color-brand)] px-5 py-3 text-sm font-black text-[var(--color-on-brand)] shadow-[0_12px_30px_var(--color-panel-glow)] transition hover:scale-105 hover:bg-[var(--color-brand-deep)]"
                >
                  去社区补风险
                </Link>
                <Link
                  href="/models"
                  className="rounded-full border border-[var(--color-line)] bg-white/88 px-5 py-3 text-sm font-bold text-[var(--color-ink)] transition hover:border-[var(--color-brand)] hover:text-[var(--color-brand-deep)]"
                >
                  继续定模型方向
                </Link>
                <div className="hover:scale-105 transition-transform">
                  <QqGroupModalButton />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
