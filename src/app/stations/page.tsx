import Link from "next/link";

import { AuthButton } from "@/components/auth-button";
import { NotificationBell } from "@/components/notification-bell";
import { OnlineIndicator } from "@/components/online-indicator";
import { StationsBoard } from "@/components/stations-board";

export default function StationsPage() {
  return (
    <main className="theme-stage relative min-h-screen overflow-hidden bg-transparent text-[var(--color-ink)]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[920px] bg-[radial-gradient(circle_at_8%_10%,var(--color-brand-soft),transparent_31%),radial-gradient(circle_at_88%_16%,var(--color-panel-glow),transparent_29%),linear-gradient(180deg,var(--color-header),transparent_76%)] opacity-80"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-[540px] h-[980px] bg-[radial-gradient(circle_at_18%_20%,var(--color-soft),transparent_34%),radial-gradient(circle_at_82%_58%,var(--color-brand-soft),transparent_32%)] opacity-55"
      />
      <section className="sticky top-0 z-30 border-b border-[var(--color-line)] bg-[var(--color-header)] backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1680px] items-center justify-between gap-4 px-4 py-3.5 sm:px-5 lg:px-8">
          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--color-brand)] text-xl font-black text-[var(--color-on-brand)] shadow-[0_10px_30px_var(--color-panel-glow)]">
              T
            </div>
            <div>
              <p className="text-2xl font-black tracking-tight">Timix观察站</p>
              <p className="text-sm text-[var(--color-muted)]">价格、倍率、入口，放在同一张判断桌上。</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <nav className="hidden items-center gap-2 rounded-full border border-[var(--color-line)] bg-[var(--color-panel)] p-1 lg:flex">
              <Link
                className="rounded-full px-4 py-2 text-sm font-semibold text-[var(--color-muted)] transition hover:bg-[var(--color-soft)] hover:text-[var(--color-ink)]"
                href="/"
              >
                首页
              </Link>
              <span className="rounded-full bg-[var(--color-brand)] px-4 py-2 text-sm font-semibold text-[var(--color-on-brand)] shadow-[0_10px_24px_var(--color-panel-glow)]">
                中转站榜单
              </span>
              <Link
                className="rounded-full px-4 py-2 text-sm font-semibold text-[var(--color-muted)] transition hover:bg-[var(--color-soft)] hover:text-[var(--color-ink)]"
                href="/community"
              >
                论坛入口
              </Link>
            </nav>
            <OnlineIndicator />
            <NotificationBell />
            <AuthButton />
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-b border-[var(--color-line)]">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,color-mix(in_srgb,var(--color-panel)_78%,transparent),color-mix(in_srgb,var(--color-soft)_48%,transparent)_55%,transparent)]" />
        <div className="relative mx-auto max-w-[1680px] px-4 py-4 sm:px-5 lg:px-8 lg:py-5">
          <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_minmax(460px,0.58fr)] xl:items-center">
            <div className="max-w-4xl">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-brand-deep)]">
                Relay Workflow
              </p>
              <h1 className="mt-2 text-2xl font-black tracking-tight sm:text-3xl">
                先在榜单缩候选，再回社区补变化。
              </h1>
              <p className="mt-2 text-sm leading-7 text-[var(--color-muted)] sm:text-base">
                这一页先负责第一轮判断，把倍率、门槛和入口放在一张桌面上，后面的验证再交给社区流转。
              </p>
            </div>

            <div className="grid gap-2 sm:grid-cols-3 xl:justify-self-end">
              <div className="rounded-[18px] border border-[var(--color-line)] bg-[var(--color-panel)] px-3.5 py-2.5 shadow-[var(--shadow-card)] backdrop-blur">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-muted)]">
                  先看
                </p>
                <p className="mt-1 text-sm font-black text-[var(--color-ink)]">倍率 / 门槛</p>
              </div>
              <div className="rounded-[18px] border border-[var(--color-line)] bg-[var(--color-panel)] px-3.5 py-2.5 shadow-[var(--shadow-card)] backdrop-blur">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-muted)]">
                  再做
                </p>
                <p className="mt-1 text-sm font-black text-[var(--color-ink)]">缩到 2-3 个</p>
              </div>
              <div className="rounded-[18px] border border-[var(--color-line)] bg-[var(--color-panel)] px-3.5 py-2.5 shadow-[var(--shadow-card)] backdrop-blur">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-muted)]">
                  最后
                </p>
                <p className="mt-1 text-sm font-black text-[var(--color-ink)]">论坛补风险</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <StationsBoard />
    </main>
  );
}
