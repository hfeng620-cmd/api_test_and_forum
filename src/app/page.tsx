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
    title: "我先比价格",
    description: "直接进榜单，看价格、倍率和试用门槛。",
    href: "/stations",
  },
  {
    title: "我先看反馈",
    description: "先看最近讨论、价格变化和避坑口径。",
    href: "/community",
  },
  {
    title: "我还没定模型",
    description: "先去模型页，把长期路线先定下来。",
    href: "/models",
  },
];

const productLayers = [
  {
    label: "低门槛",
    title: "虎虎、星见雅先验证",
    description: "注册送额和免费入口先看能不能用。",
  },
  {
    label: "低倍率",
    title: "杂货铺、ai8 单独核价",
    description: "低倍率先看稳定性，不直接当长期结论。",
  },
  {
    label: "主力候选",
    title: "Aether、秋天继续补样本",
    description: "稳定反馈和新入口分开沉淀。",
  },
];

const actionFlows = [
  {
    step: "01",
    title: "低门槛先试",
    description: "虎虎注册送额、星见雅公益免费入口，适合先验证能不能用。",
    href: "/stations",
    cta: "看试用",
  },
  {
    step: "02",
    title: "低倍率重点看",
    description: "杂货铺 GPT 0.058x、ai8.my 0.06x，但要继续核验稳定性。",
    href: "/stations",
    cta: "看低倍率",
  },
  {
    step: "03",
    title: "主力候选留意",
    description: "Aether 反馈偏稳，秋天中转站已收录入口，等社区继续补样本。",
    href: "/models",
    cta: "看模型",
  },
];

const homeVerseLines = [
  {
    line: "遥望齐州九点烟，一泓海水杯中泻。",
    source: "李贺《梦天》",
    note: "把尺度先放大，再回到眼前的一条判断。",
  },
  {
    line: "云散月明谁点缀？天容海色本澄清。",
    source: "苏轼《六月二十日夜渡海》",
  },
  {
    line: "向使当初身便死，一生真伪复谁知？",
    source: "白居易《放言五首·其三》",
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
    <main className="theme-stage min-h-screen bg-transparent text-[var(--color-ink)]">
      <style>{`
        @keyframes logo-pulse {
          0%, 100% { box-shadow: 0 10px 28px var(--color-panel-glow); }
          50% { box-shadow: 0 12px 34px var(--color-panel-glow); }
        }
        @keyframes ticker-slide {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes section-rise {
          from { opacity: 0; transform: translate3d(0, 18px, 0); }
          to { opacity: 1; transform: translate3d(0, 0, 0); }
        }
        @keyframes section-fade {
          from { opacity: 0; transform: translate3d(0, 10px, 0); }
          to { opacity: 1; transform: translate3d(0, 0, 0); }
        }
        @keyframes ambient-drift {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); opacity: 0.72; }
          50% { transform: translate3d(18px, -14px, 0) scale(1.06); opacity: 0.96; }
        }
        .logo-pulse {
          animation: logo-pulse 3.6s ease-in-out infinite;
        }
        .ticker-enter {
          animation: ticker-slide 420ms 140ms cubic-bezier(0.2, 0.8, 0.2, 1) both;
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .ticker-enter::-webkit-scrollbar {
          display: none;
          width: 0;
          height: 0;
        }
        .home-reveal {
          --reveal-duration: 760ms;
        }
        .home-reveal-soft {
          --reveal-duration: 640ms;
        }
        .home-delay-1 { --reveal-delay: 80ms; }
        .home-delay-2 { --reveal-delay: 160ms; }
        .home-delay-3 { --reveal-delay: 240ms; }
        .reveal-ready .home-flow > *,
        .reveal-ready.home-flow > *,
        .reveal-ready .home-flow-tight > *,
        .reveal-ready.home-flow-tight > *,
        .reveal-ready .stagger-in {
          animation: none;
          opacity: 0;
          transform: translate3d(0, 12px, 0);
        }
        .reveal-visible .home-flow > *,
        .reveal-visible.home-flow > *,
        .reveal-visible .home-flow-tight > *,
        .reveal-visible.home-flow-tight > *,
        .reveal-visible .stagger-in {
          animation: section-fade 620ms cubic-bezier(0.2, 0.8, 0.2, 1) both;
        }
        .reveal-visible .home-flow-tight > *,
        .reveal-visible.home-flow-tight > * {
          animation-duration: 560ms;
        }
        .reveal-visible .home-flow > :nth-child(1),
        .reveal-visible.home-flow > :nth-child(1) { animation-delay: 80ms; }
        .reveal-visible .home-flow > :nth-child(2),
        .reveal-visible.home-flow > :nth-child(2) { animation-delay: 150ms; }
        .reveal-visible .home-flow > :nth-child(3),
        .reveal-visible.home-flow > :nth-child(3) { animation-delay: 220ms; }
        .reveal-visible .home-flow > :nth-child(4),
        .reveal-visible.home-flow > :nth-child(4) { animation-delay: 290ms; }
        .reveal-visible .home-flow > :nth-child(5),
        .reveal-visible.home-flow > :nth-child(5) { animation-delay: 360ms; }
        .reveal-visible .home-flow > :nth-child(6),
        .reveal-visible.home-flow > :nth-child(6) { animation-delay: 430ms; }
        .reveal-visible .home-flow-tight > :nth-child(1),
        .reveal-visible.home-flow-tight > :nth-child(1) { animation-delay: 60ms; }
        .reveal-visible .home-flow-tight > :nth-child(2),
        .reveal-visible.home-flow-tight > :nth-child(2) { animation-delay: 110ms; }
        .reveal-visible .home-flow-tight > :nth-child(3),
        .reveal-visible.home-flow-tight > :nth-child(3) { animation-delay: 160ms; }
        .home-ambient {
          animation: ambient-drift 12s ease-in-out infinite;
        }
        .home-ambient-fast {
          animation: ambient-drift 8.5s ease-in-out infinite reverse;
        }
        .reveal-visible .stagger-in:nth-child(5) { animation-delay: 160ms; }
        .reveal-visible .stagger-in:nth-child(6) { animation-delay: 200ms; }
        .reveal-visible .stagger-in:nth-child(7) { animation-delay: 240ms; }
        .reveal-visible .stagger-in:nth-child(8) { animation-delay: 280ms; }
        .home-hero-title {
          text-wrap: balance;
        }
        .home-hero-wash {
          background:
            radial-gradient(circle at 18% 14%, rgba(var(--theme-glow-rgb),0.15), transparent 34%),
            radial-gradient(circle at 88% 8%, rgba(var(--theme-secondary-rgb),0.16), transparent 32%),
            linear-gradient(135deg, rgba(var(--theme-surface-rgb),0.78), rgba(var(--theme-surface-rgb),0.34) 56%, rgba(var(--theme-glow-rgb),0.13));
        }
        .home-hero-grid {
          background-image:
            linear-gradient(rgba(var(--theme-glow-rgb),0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(var(--theme-glow-rgb),0.08) 1px, transparent 1px);
          background-size: 46px 46px;
          -webkit-mask-image: radial-gradient(circle at 50% 26%, black, transparent 72%);
          mask-image: radial-gradient(circle at 50% 26%, black, transparent 72%);
          opacity: 0.42;
        }
        .home-card-sheen {
          isolation: isolate;
          position: relative;
        }
        .home-card-sheen::after {
          content: "";
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          border-radius: inherit;
          background:
            linear-gradient(145deg, rgba(255,255,255,0.34), transparent 36%),
            radial-gradient(circle at 88% 8%, rgba(var(--theme-secondary-rgb),0.14), transparent 30%);
          opacity: 0.7;
        }
        .home-card-sheen > :not(.absolute) {
          position: relative;
          z-index: 1;
        }
        .home-glass-edge {
          position: relative;
        }
        .home-glass-edge::before {
          content: "";
          position: absolute;
          inset: 1px;
          pointer-events: none;
          border-radius: inherit;
          background:
            linear-gradient(135deg, rgba(255,255,255,0.52), transparent 34%),
            radial-gradient(circle at 82% 12%, rgba(var(--theme-glow-rgb),0.18), transparent 34%);
          opacity: 0.82;
        }
        .home-soft-panel {
          background: rgba(255,255,255,0.74);
          border-color: rgba(255,255,255,0.72);
        }
        .home-command-card {
          background:
            radial-gradient(circle at 86% 12%, rgba(var(--theme-secondary-rgb),0.18), transparent 36%),
            linear-gradient(145deg, rgba(var(--theme-surface-rgb),0.86), rgba(var(--theme-surface-rgb),0.58));
          border-color: rgba(255,255,255,0.72);
        }
        .home-signal-pill {
          background: rgba(255,255,255,0.72);
          border-color: rgba(255,255,255,0.7);
          color: var(--color-brand-deep);
        }
        .home-quote-line {
          font-family: "KaiTi", "STKaiti", "Songti SC", serif;
          letter-spacing: 0;
        }
        .home-info-tile {
          background: rgba(255,255,255,0.76);
          border-color: var(--color-line);
        }
        .home-chip {
          background: rgba(255,255,255,0.78);
          border: 1px solid rgba(255,255,255,0.72);
          color: var(--color-brand-deep);
        }
        .home-secondary-action {
          background: rgba(255,255,255,0.8);
          border-color: var(--color-line);
          color: var(--color-ink);
        }
        :root[data-theme="midnight"] .theme-stage {
          --color-panel: rgba(10,19,34,0.88);
          --color-panel-strong: rgba(13,24,42,0.96);
          --color-header: rgba(5,10,20,0.9);
          --surface-gradient:
            linear-gradient(180deg, rgba(13,24,42,0.94), rgba(7,13,25,0.96));
        }
        :root[data-theme="midnight"] .home-hero-wash {
          background:
            radial-gradient(circle at 20% 10%, rgba(var(--theme-glow-rgb),0.22), transparent 36%),
            radial-gradient(circle at 88% 8%, rgba(var(--theme-secondary-rgb),0.16), transparent 34%),
            linear-gradient(135deg, rgba(5,10,20,0.94), rgba(9,18,34,0.72) 54%, rgba(var(--theme-glow-rgb),0.16));
        }
        :root[data-theme="midnight"] .home-hero-title {
          background-image: linear-gradient(112deg,#eef7ff 0%,#8cc9ff 42%,#3394ff 70%,#dff1ff 100%);
        }
        :root[data-theme="midnight"] .home-card-sheen::after {
          background:
            linear-gradient(145deg, rgba(255,255,255,0.045), transparent 38%),
            radial-gradient(circle at 88% 8%, rgba(var(--theme-glow-rgb),0.18), transparent 34%);
          opacity: 0.46;
        }
        :root[data-theme="midnight"] .home-glass-edge::before {
          background:
            linear-gradient(135deg, rgba(140,201,255,0.08), transparent 36%),
            radial-gradient(circle at 82% 12%, rgba(var(--theme-glow-rgb),0.22), transparent 34%);
          opacity: 0.6;
        }
        :root[data-theme="midnight"] .home-soft-panel {
          background:
            linear-gradient(145deg, rgba(15,27,45,0.78), rgba(9,16,29,0.72)) !important;
          border-color: rgba(112,184,255,0.18) !important;
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.06), 0 18px 42px rgba(0,0,0,0.18) !important;
        }
        :root[data-theme="midnight"] .home-command-card {
          background:
            radial-gradient(circle at 86% 10%, rgba(112,184,255,0.18), transparent 34%),
            radial-gradient(circle at 12% 100%, rgba(10,132,255,0.12), transparent 38%),
            linear-gradient(145deg, rgba(11,20,36,0.9), rgba(7,12,23,0.78) 56%, rgba(12,26,48,0.72)) !important;
          border-color: rgba(112,184,255,0.24) !important;
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.08), 0 28px 78px rgba(0,0,0,0.32), 0 0 42px rgba(10,132,255,0.08) !important;
        }
        :root[data-theme="midnight"] .home-signal-pill {
          background: rgba(10,132,255,0.12) !important;
          border-color: rgba(112,184,255,0.28) !important;
          color: #8cc9ff !important;
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.08), 0 12px 30px rgba(10,132,255,0.08) !important;
        }
        :root[data-theme="midnight"] .home-info-tile {
          background: rgba(12,22,38,0.74) !important;
          border-color: rgba(112,184,255,0.18) !important;
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.05);
        }
        :root[data-theme="midnight"] .home-chip {
          background: rgba(10,132,255,0.13) !important;
          border-color: rgba(112,184,255,0.28) !important;
          color: #8cc9ff !important;
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.08);
        }
        :root[data-theme="midnight"] .home-secondary-action {
          background: rgba(13,24,41,0.82) !important;
          border-color: rgba(112,184,255,0.2) !important;
          color: var(--color-ink) !important;
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.06);
        }
        @media (max-width: 640px) {
          .home-mobile-actions > * {
            width: 100%;
            justify-content: center;
            text-align: center;
          }
          .home-mobile-balance {
            text-wrap: balance;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .logo-pulse,
          .ticker-enter,
          .home-reveal,
          .home-reveal-soft,
          .home-ambient,
          .home-ambient-fast,
          .reveal-ready .home-flow > *,
          .reveal-ready.home-flow > *,
          .reveal-ready .home-flow-tight > *,
          .reveal-ready.home-flow-tight > *,
          .reveal-ready .stagger-in,
          .home-flow > *,
          .home-flow-tight > * { animation: none; opacity: 1; transform: none; }
        }
      `}</style>
      <section data-route-reveal="off" className="sticky top-0 z-30 border-b border-[var(--color-line)] bg-[var(--color-header)] backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:gap-6 sm:px-6 sm:py-4 lg:px-10">
          <div className="flex min-w-0 items-center gap-3 sm:gap-4">
            <div className="logo-pulse flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[var(--color-brand)] text-lg font-black text-[var(--color-on-brand)] sm:h-11 sm:w-11 sm:text-xl">
              T
            </div>
            <div className="min-w-0">
              <p className="truncate text-xl font-black tracking-tight sm:text-2xl">Timix观察站</p>
              <p className="hidden text-sm text-[var(--color-muted)] sm:block">
                先看榜单，再决定长期用谁。
              </p>
            </div>
            <div className="hidden lg:block hover:scale-105 transition-transform">
              <QqGroupModalButton />
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2 sm:gap-4">
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

      <section className="relative overflow-x-clip overflow-y-visible border-b border-[var(--color-line)]">
        <RelayNetworkCanvas className="opacity-90" />
        <div className="home-hero-wash pointer-events-none absolute inset-0" />
        <div className="home-hero-grid pointer-events-none absolute inset-0" />
        <div className="pointer-events-none absolute inset-x-6 top-8 h-px bg-[linear-gradient(90deg,transparent,rgba(var(--theme-glow-rgb),0.34),transparent)] lg:inset-x-10" />
        <div className="relative mx-auto max-w-7xl px-5 pb-8 pt-5 sm:px-6 sm:pb-10 sm:pt-7 lg:px-10 lg:pb-12 lg:pt-9">
          <div className="grid gap-6 lg:grid-cols-[1.12fr_0.88fr] lg:items-start xl:gap-10">
            <div className="home-reveal max-w-3xl">
              <p className="home-signal-pill inline-flex rounded-full border px-3 py-1 text-[11px] font-black uppercase tracking-[0.24em] shadow-[0_12px_30px_rgba(15,23,42,0.05)] backdrop-blur sm:text-xs">
                Relay Signal Desk
              </p>
              <h1 className="home-hero-title mt-5 max-w-4xl bg-[linear-gradient(112deg,var(--color-ink)_0%,var(--color-brand-deep)_48%,var(--color-ink)_92%)] bg-clip-text text-[2.65rem] font-black leading-[0.98] tracking-tight text-transparent sm:text-6xl lg:text-[4.75rem]">
                把中转站从“能用”，筛到“值得长期用”。
              </h1>
              <p className="home-mobile-balance mt-5 max-w-2xl text-base leading-8 text-[var(--color-muted)] sm:text-lg">
                首页先把价格、倍率、试用和反馈压到同一个判断面，帮你更快决定先试谁、避开什么。
              </p>
              <div className="home-mobile-actions mt-6 flex flex-wrap gap-3">
                <Link
                  href="/stations"
                  className="inline-flex rounded-full bg-[var(--color-brand)] px-6 py-3 text-sm font-black text-[var(--color-on-brand)] shadow-[0_14px_34px_var(--color-panel-glow)] transition hover:scale-105 hover:bg-[var(--color-brand-deep)]"
                >
                  直接看榜单
                </Link>
                <Link
                  href="/community"
                  className="home-secondary-action inline-flex rounded-full border px-6 py-3 text-sm font-bold backdrop-blur transition hover:border-[var(--color-brand)] hover:text-[var(--color-brand-deep)]"
                >
                  去看实时反馈
                </Link>
              </div>
              <div className="mt-6">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-muted)]">
                  按你的起步方式进入
                </p>
                <div className="home-flow grid gap-3 sm:grid-cols-3">
                {decisionRoutes.map((route) => (
                  <Link
                    key={route.title}
                    href={route.href}
                    className="home-card-sheen home-soft-panel card-lift rounded-[22px] border px-4 py-4 backdrop-blur transition hover:-translate-y-0.5 hover:border-[var(--color-brand)]"
                  >
                    <p className="text-sm font-black text-[var(--color-ink)]">{route.title}</p>
                    <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">{route.description}</p>
                  </Link>
                ))}
                </div>
              </div>
              <div className="home-flow-tight mt-7 grid gap-3 sm:grid-cols-3">
                <div className="home-card-sheen home-soft-panel rounded-[20px] border px-4 py-4 backdrop-blur">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-muted)]">
                    收录站点
                  </p>
                  <p className="mt-2 text-3xl font-black">{stationComparisonRows.length}</p>
                </div>
                <div className="home-card-sheen home-soft-panel rounded-[20px] border px-4 py-4 backdrop-blur">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-muted)]">
                    低倍率样本
                  </p>
                  <p className="mt-2 text-3xl font-black">{lowRateCount}</p>
                </div>
                <div className="home-card-sheen home-soft-panel rounded-[20px] border px-4 py-4 backdrop-blur">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-muted)]">
                    可先试用
                  </p>
                  <p className="mt-2 text-3xl font-black">{trialReadyCount}</p>
                </div>
              </div>
            </div>

            <div className="home-reveal home-delay-2 home-glass-edge home-card-sheen home-command-card relative h-fit self-start overflow-clip rounded-[30px] border p-5 backdrop-blur sm:p-6">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-[radial-gradient(circle_at_top,rgba(var(--theme-glow-rgb),0.22),transparent_70%)]" />
              <div className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-[radial-gradient(circle,rgba(var(--theme-secondary-rgb),0.16),transparent_70%)] blur-xl" />
              <div className="relative">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--color-brand-deep)]">
                  当前主观察面
                </p>
                <div className="my-7 max-w-md">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--color-muted)]">
                    文脉题记 / {homeVerseLines[0].source}
                  </p>
                  <p className="home-quote-line mt-3 text-2xl font-black leading-snug text-[var(--color-ink)] sm:text-3xl">
                    {homeVerseLines[0].line}
                  </p>
                  <p className="mt-3 max-w-sm text-sm leading-7 text-[var(--color-muted)]">
                    {homeVerseLines[0].note}
                  </p>
                  <div className="mt-4 border-l border-[rgba(var(--theme-glow-rgb),0.28)] pl-3">
                    <p className="text-sm font-semibold leading-7 text-[var(--color-ink)]">
                      {homeVerseLines[1].line}
                    </p>
                    <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--color-muted)]">
                      {homeVerseLines[1].source}
                    </p>
                  </div>
                </div>
                {featuredLead ? (
                  <>
                    <div className="mt-4 flex items-start justify-between gap-4">
                      <div>
                        <h2 className="text-2xl font-black">{featuredLead.name}</h2>
                        <p className="mt-2 text-sm leading-7 text-[var(--color-muted)]">
                          {featuredLead.note}
                        </p>
                      </div>
                      <span className="home-chip rounded-full px-3 py-1 text-xs font-bold">
                        {featuredLead.badge}
                      </span>
                    </div>
                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                      <div className="home-info-tile rounded-[18px] border px-4 py-4">
                        <p className="text-xs text-[var(--color-muted)]">价格 / 倍率</p>
                        <p className="mt-2 text-lg font-black">{featuredLead.price}</p>
                        <p className="mt-1 text-sm font-semibold text-[var(--color-brand-deep)]">
                          {featuredLead.multiplier}
                        </p>
                      </div>
                      <div className="home-info-tile rounded-[18px] border px-4 py-4">
                        <p className="text-xs text-[var(--color-muted)]">一句判断</p>
                        <p className="mt-2 text-sm leading-7 text-[var(--color-ink)]">
                          {featuredLead.verdict}
                        </p>
                      </div>
                    </div>
                  </>
                ) : null}
                <div className="home-flow-tight mt-5 grid gap-3 sm:grid-cols-2">
                  <div className="home-info-tile rounded-[18px] border px-4 py-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-muted)]">
                      先看什么
                    </p>
                    <p className="mt-2 text-sm leading-7 text-[var(--color-ink)]">
                      先看倍率和试用，再看备注。
                    </p>
                  </div>
                  <div className="home-info-tile rounded-[18px] border px-4 py-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-muted)]">
                      观察口径
                    </p>
                    <p className="mt-2 text-sm leading-7 text-[var(--color-ink)]">
                      GPT、Claude、Grok 往往要拆开判断。
                    </p>
                  </div>
                </div>
                <div className="home-info-tile mt-5 rounded-[18px] border px-4 py-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-muted)]">
                    三步判断
                  </p>
                  <div className="home-flow-tight mt-3 grid gap-3 sm:grid-cols-3">
                    <div>
                      <p className="text-sm font-black text-[var(--color-ink)]">01 先试用</p>
                      <p className="mt-1 text-sm leading-6 text-[var(--color-muted)]">优先验证低门槛入口。</p>
                    </div>
                    <div>
                      <p className="text-sm font-black text-[var(--color-ink)]">02 看备注</p>
                      <p className="mt-1 text-sm leading-6 text-[var(--color-muted)]">重点看反馈和特殊口径。</p>
                    </div>
                    <div>
                      <p className="text-sm font-black text-[var(--color-ink)]">03 再长期用</p>
                      <p className="mt-1 text-sm leading-6 text-[var(--color-muted)]">确认稳定后再进主工作流。</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section data-reveal className="relative overflow-x-clip overflow-y-visible border-b border-[var(--color-line)] bg-[linear-gradient(180deg,rgba(var(--theme-surface-rgb),0.14),rgba(var(--theme-glow-rgb),0.045))]">
        <div className="home-ambient pointer-events-none absolute -left-24 top-12 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(var(--theme-glow-rgb),0.14),transparent_68%)] blur-2xl" />
        <div className="home-ambient-fast pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(var(--theme-secondary-rgb),0.14),transparent_70%)] blur-2xl" />
        <div className="relative mx-auto max-w-7xl px-5 py-8 sm:px-6 sm:py-9 lg:px-10 lg:py-11">
          <div className="grid gap-6 xl:grid-cols-[1.04fr_0.96fr]">
            <div className="home-reveal home-glass-edge home-card-sheen home-command-card relative overflow-clip rounded-[30px] border p-5 sm:p-6 lg:p-7">
              <div className="pointer-events-none absolute right-0 top-0 h-32 w-48 rounded-bl-full bg-[radial-gradient(circle_at_top_right,rgba(var(--theme-glow-rgb),0.16),transparent_70%)]" />
              <div className="relative">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--color-brand-deep)]">
                  线索分层
                </p>
                <h2 className="home-mobile-balance mt-4 max-w-3xl text-3xl font-black tracking-tight sm:text-4xl">
                  先看真实线索，再决定要不要深入。
                </h2>
                <p className="mt-4 max-w-3xl text-base leading-8 text-[var(--color-muted)]">
                  试用、低倍率和主力候选分开摆，避免把不同类型的站点混成一个结论。
                </p>
              </div>
              <div className="home-flow relative mt-6 grid gap-4 lg:grid-cols-3">
                {productLayers.map((layer, index) => (
                  <article
                    key={layer.title}
                    className="home-card-sheen home-soft-panel group relative overflow-clip rounded-[24px] border px-5 py-5 backdrop-blur transition hover:-translate-y-1 hover:border-[var(--color-brand)]"
                  >
                    <div className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,var(--color-brand),rgba(var(--theme-secondary-rgb),0.64))] opacity-0 transition group-hover:opacity-100" />
                    <div className="flex items-center justify-between gap-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-muted)]">
                        {layer.label}
                      </p>
                      <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-[var(--color-brand-soft)] text-sm font-black text-[var(--color-brand-deep)]">
                        {(index + 1).toString().padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="mt-3 text-lg font-black text-[var(--color-ink)]">{layer.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">
                      {layer.description}
                    </p>
                  </article>
                ))}
              </div>
            </div>

            <aside className="home-reveal home-delay-2 home-command-card relative overflow-clip rounded-[30px] border p-5 sm:p-6 lg:p-7">
              <div className="pointer-events-none absolute -right-16 top-12 h-40 w-40 rounded-full bg-[radial-gradient(circle,rgba(var(--theme-glow-rgb),0.18),transparent_70%)] blur-xl" />
              <div className="flex flex-wrap items-center gap-2">
                <span className="home-chip rounded-full px-3 py-1 text-xs font-bold">
                  已收录 {stationComparisonRows.length} 个站点
                </span>
                <span className="home-chip rounded-full px-3 py-1 text-xs font-bold">
                  {lowRateCount} 个低倍率样本
                </span>
                <span className="home-chip rounded-full px-3 py-1 text-xs font-bold">
                  {trialReadyCount} 个可先试用
                </span>
              </div>
              <h2 className="mt-4 text-2xl font-black tracking-tight sm:text-3xl">
                当前值得先看的线索
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--color-muted)]">
                不是推荐充值，是把低门槛、低倍率和待补样本先摆出来。
              </p>
              <div className="relative mt-6">
                <div className="absolute bottom-4 left-[33px] top-4 hidden w-px bg-[linear-gradient(180deg,var(--color-brand),transparent)] sm:block" />
                <div className="home-flow space-y-4">
                  {actionFlows.map((flow) => (
                  <div
                    key={flow.step}
                    className="home-card-sheen home-soft-panel relative rounded-[24px] border px-5 py-5 backdrop-blur transition hover:-translate-y-0.5 hover:border-[var(--color-brand)]"
                  >
                    <div className="grid grid-cols-[1.75rem_minmax(0,1fr)] gap-4">
                      <span className="relative z-10 mt-0.5 flex h-7 w-7 items-center justify-center rounded-full border border-[rgba(var(--theme-secondary-rgb),0.3)] bg-[var(--color-brand)] text-[10px] font-black text-[var(--color-on-brand)] shadow-[0_10px_22px_var(--color-panel-glow)]">
                        {flow.step}
                      </span>
                      <div className="min-w-0">
                        <div className="flex items-start justify-between gap-4">
                          <div className="min-w-0">
                            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-muted)]">
                              Step {flow.step}
                            </p>
                            <h3 className="mt-2 text-lg font-black text-[var(--color-ink)]">{flow.title}</h3>
                          </div>
                          <Link
                            href={flow.href}
                            className="home-secondary-action shrink-0 rounded-full border px-4 py-2 text-xs font-bold transition hover:border-[var(--color-brand)] hover:text-[var(--color-brand)]"
                          >
                            {flow.cta}
                          </Link>
                        </div>
                        <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">
                          {flow.description}
                        </p>
                      </div>
                    </div>
                  </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section data-reveal className="relative overflow-x-clip overflow-y-visible border-b border-[var(--color-line)]">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-[linear-gradient(180deg,rgba(var(--theme-glow-rgb),0.055),transparent)]" />
        <div className="surface-in relative mx-auto max-w-7xl px-5 py-8 sm:px-6 lg:px-10 lg:py-10">
          <div className="home-reveal mb-6 flex flex-col items-start justify-between gap-4 lg:flex-row lg:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--color-brand-deep)]">
                建立判断基准
              </p>
              <h2 className="home-mobile-balance mt-4 text-3xl font-black tracking-tight sm:text-4xl">
                先从代表性站点看出差异
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--color-muted)]">
                这一屏不是给你看完全部信息，而是帮你快速建立价格、倍率和站点口径的参考面。
              </p>
            </div>
            <div className="home-mobile-actions flex w-full flex-wrap gap-3 lg:w-auto">
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

          <div data-reveal className="home-reveal home-delay-1 surface-in overflow-clip rounded-[24px] border border-[var(--color-line)] bg-[var(--surface-gradient)] shadow-[var(--shadow-card)]">
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

      <section data-reveal className="border-t border-[var(--color-line)]">
        <div className="home-reveal-soft mx-auto max-w-7xl px-5 py-8 sm:px-6 sm:py-10 lg:px-10 lg:py-9">
          <AiNewsPanel />
        </div>
      </section>

      <section data-reveal className="relative overflow-x-clip overflow-y-visible border-t border-[var(--color-line)] bg-[linear-gradient(180deg,rgba(var(--theme-surface-rgb),0),rgba(var(--theme-glow-rgb),0.055))]">
        <div className="home-ambient pointer-events-none absolute -right-24 top-20 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(var(--theme-glow-rgb),0.13),transparent_70%)] blur-2xl" />
        <div className="relative mx-auto max-w-7xl px-5 py-8 sm:px-6 sm:py-10 lg:px-10 lg:py-12">
          <div className="home-reveal flex flex-col items-start justify-between gap-4 border-b border-[var(--color-line)] pb-4 sm:flex-row sm:items-end sm:gap-6">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--color-muted)]">
                更多中转站
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight">更多站点</h2>
              <p className="mt-2 max-w-xl text-sm leading-7 text-[var(--color-muted)]">
                作为补充池保留，适合在主候选之外继续横向比价。
              </p>
            </div>
            <Link
              href="/stations"
              className="home-secondary-action inline-flex items-center rounded-full border px-4 py-2 text-sm font-bold transition hover:border-[var(--color-brand)] hover:text-[var(--color-brand)]"
            >
              完整榜单 →
            </Link>
          </div>
          <div data-reveal className="mt-5 overflow-clip rounded-[26px] border border-[var(--color-line)] bg-[var(--surface-gradient)] px-4 shadow-[0_18px_46px_rgba(15,23,42,0.055)] sm:px-5">
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
          <div data-reveal className="home-reveal home-delay-2 home-card-sheen home-command-card mt-8 rounded-[28px] border px-5 py-6 sm:px-6">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--color-brand-deep)]">
                  下一步动作
                </p>
                <h2 className="home-mobile-balance mt-3 text-2xl font-black tracking-tight sm:text-3xl">
                  看完榜单，继续收口。
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--color-muted)]">
                  已有候选就去社区补风险，模型未定就回模型页。
                </p>
              </div>
              <div className="home-mobile-actions flex flex-wrap gap-3">
                <Link
                  href="/community"
                  className="inline-flex rounded-full bg-[var(--color-brand)] px-5 py-3 text-sm font-black text-[var(--color-on-brand)] shadow-[0_12px_30px_var(--color-panel-glow)] transition hover:scale-105 hover:bg-[var(--color-brand-deep)]"
                >
                  去社区补风险
                </Link>
                <Link
                  href="/models"
                  className="home-secondary-action inline-flex rounded-full border px-5 py-3 text-sm font-bold transition hover:border-[var(--color-brand)] hover:text-[var(--color-brand-deep)]"
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
