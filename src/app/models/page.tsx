import Link from "next/link";

import { ThemeToggle } from "@/components/theme-toggle";
import { modelPreviewRows, tickerItems } from "@/lib/site-data";

export default function ModelsPage() {
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
              <p className="text-sm text-[var(--color-muted)]">模型择优预留页</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <nav className="hidden items-center gap-2 rounded-full border border-[var(--color-line)] bg-white p-1 lg:flex">
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
              <span className="rounded-full bg-[var(--color-ink)] px-4 py-2 text-sm font-semibold text-white">
                模型择优
              </span>
            </nav>
          </div>
        </div>

        <div className="border-t border-[var(--color-line)] bg-[var(--color-soft)]">
          <div className="mx-auto flex max-w-7xl items-center gap-5 overflow-x-auto px-6 py-3 text-sm whitespace-nowrap text-[var(--color-muted)] lg:px-10">
            <span className="font-semibold text-[var(--color-ink)]">模型观察预留</span>
            {tickerItems.slice(0, 3).map((item) => (
              <span key={item.label} className="flex items-center gap-2">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span>{item.label}</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
        <div className="rounded-[36px] border border-[var(--color-line)] bg-white p-7 shadow-[0_18px_60px_rgba(13,25,48,0.08)]">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="inline-flex rounded-full bg-[var(--color-brand-soft)] px-3 py-1 text-sm font-bold text-[var(--color-brand-deep)]">
                后续可扩展的二级页
              </p>
              <h1 className="mt-4 text-5xl font-black tracking-tight sm:text-6xl">
                不知道先用哪个模型？
              </h1>
              <p className="mt-5 text-lg leading-8 text-[var(--color-muted)]">
                这个页面后面可以做成类似你发的那种模型能力排序、使用场景和中转站价格联动页。当前先做骨架，方便以后把真实模型排行、中位价格和推荐场景接进来。
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[26px] bg-[var(--color-soft)] px-5 py-4">
                <p className="text-sm text-[var(--color-muted)]">当前作用</p>
                <p className="mt-2 text-3xl font-black">预留入口</p>
                <p className="mt-1 text-sm text-[var(--color-muted)]">
                  先把结构和视觉方向定下来，后面再接真实榜单数据
                </p>
              </div>
              <div className="rounded-[26px] bg-[var(--color-soft)] px-5 py-4">
                <p className="text-sm text-[var(--color-muted)]">和中转站页的区别</p>
                <p className="mt-2 text-3xl font-black">先看模型</p>
                <p className="mt-1 text-sm text-[var(--color-muted)]">
                  模型页讲能力与场景，中转站页讲价格、倍率、入口和口径
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 inline-flex rounded-full bg-[var(--color-soft)] p-1">
            <span className="rounded-full bg-[var(--color-ink)] px-4 py-2 text-sm font-bold text-white">
              按能力预览
            </span>
            <span className="px-4 py-2 text-sm font-semibold text-[var(--color-muted)]">
              按场景预览
            </span>
          </div>

          <div className="mt-6 overflow-hidden rounded-[28px] border border-[var(--color-line)]">
            <div className="grid grid-cols-[0.8fr_0.9fr_0.9fr_1.1fr_1.2fr] bg-[var(--color-soft)] px-5 py-4 text-sm font-bold text-[var(--color-muted)]">
              <span>排序</span>
              <span>模型家族</span>
              <span>适用场景</span>
              <span>为什么会选它</span>
              <span>和中转站页怎么联动</span>
            </div>
            {modelPreviewRows.map((row, index) => (
              <article
                key={row.rank}
                className={`grid grid-cols-[0.8fr_0.9fr_0.9fr_1.1fr_1.2fr] items-center px-5 py-5 ${
                  index % 2 === 0 ? "bg-white" : "bg-[#f9fbfe]"
                }`}
              >
                <div className="font-black">{row.rank}</div>
                <div className="font-bold">{row.family}</div>
                <div className="font-bold">{row.scene}</div>
                <div className="text-sm leading-6 text-[var(--color-muted)]">
                  {row.focus}
                </div>
                <div className="text-sm leading-6 text-[var(--color-muted)]">
                  {row.stationHint}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
