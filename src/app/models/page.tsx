import Link from "next/link";

import { NotificationBell } from "@/components/notification-bell";
import { modelGuideNotes, modelPreviewRows, modelRankings, tickerItems } from "@/lib/site-data";

export default function ModelsPage() {
  return (
    <main className="min-h-screen bg-[var(--color-bg)] text-[var(--color-ink)]">
      <section className="border-b border-[var(--color-line)] bg-[var(--color-header)] backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4 lg:px-10">
          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--color-brand)] text-xl font-black text-[var(--color-on-brand)] shadow-[0_10px_30px_var(--color-panel-glow)]">
              T
            </div>
            <div>
              <p className="text-2xl font-black tracking-tight">Timix观察站</p>
              <p className="text-sm text-[var(--color-muted)]">模型观察与站点选择</p>
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
              <Link
                className="rounded-full px-4 py-2 text-sm font-semibold text-[var(--color-muted)] transition hover:bg-[var(--color-soft)] hover:text-[var(--color-ink)]"
                href="/stations"
              >
                中转站榜单
              </Link>
              <span className="rounded-full bg-[var(--color-brand)] px-4 py-2 text-sm font-semibold text-[var(--color-on-brand)] shadow-[0_10px_24px_var(--color-panel-glow)]">
                模型择优
              </span>
            </nav>
            <NotificationBell />
          </div>
        </div>

        <div className="border-t border-[var(--color-line)] bg-[var(--color-soft)]">
          <div className="mx-auto flex max-w-7xl items-center gap-5 overflow-x-auto px-6 py-3 text-sm whitespace-nowrap text-[var(--color-muted)] lg:px-10">
            <span className="font-semibold text-[var(--color-ink)]">模型观察</span>
            {tickerItems.slice(0, 3).map((item) => (
              item.href.startsWith("http") ? (
                <a
                  key={item.label}
                  className="flex items-center gap-2 transition hover:text-[var(--color-ink)]"
                  href={item.href}
                  rel="noreferrer"
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

      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
        {/* ---- 模型智商排行榜 ---- */}
        <div className="mb-10 rounded-[36px] border border-[var(--color-line)] bg-white p-7 shadow-[var(--shadow-card)]">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="inline-flex rounded-full bg-[var(--color-brand-soft)] px-3 py-1 text-sm font-bold text-[var(--color-brand-deep)]">
                模型智商排行榜
              </p>
              <h2 className="mt-4 text-3xl font-black tracking-tight">
                按使用场景 · 基于 Analysis Intelligence Index
              </h2>
              <p className="mt-2 text-sm text-[var(--color-muted)]">
                智商 index 越高代表模型综合能力越强，中转站价格为各站中位数。数据仅供参考，实际体验可能因站点不同而有差异。
              </p>
            </div>
          </div>

          <div className="mt-6 overflow-hidden rounded-[28px] border border-[var(--color-line)]">
            {/* 表头 */}
            <div className="grid grid-cols-[0.5fr_1.5fr_1fr_1fr_1fr] bg-[var(--color-soft)] px-5 py-4 text-sm font-bold text-[var(--color-muted)]">
              <span>排名</span>
              <span>模型</span>
              <span>智商 index</span>
              <span>中转站中位数价格</span>
              <span>厂商</span>
            </div>
            {/* 数据行 */}
            {modelRankings.map((model, index) => {
              // 前三名特殊样式
              const isTop3 = model.rank <= 3;
              const rankColors: Record<number, string> = {
                1: "bg-yellow-400 text-yellow-900",
                2: "bg-gray-300 text-gray-800",
                3: "bg-orange-300 text-orange-900",
              };

              return (
                <article
                  key={model.rank}
                  className={`grid grid-cols-[0.5fr_1.5fr_1fr_1fr_1fr] items-center px-5 py-4 ${
                    index % 2 === 0 ? "bg-white" : "bg-[var(--color-row-alt)]"
                  }`}
                >
                  <div>
                    <span className={`inline-flex h-7 w-7 items-center justify-center rounded-full text-xs font-black ${
                      isTop3 ? rankColors[model.rank] : "bg-[var(--color-soft)] text-[var(--color-muted)]"
                    }`}>
                      {model.rank}
                    </span>
                  </div>
                  <div className="font-bold">{model.name}</div>
                  <div>
                    <span className="font-black text-[var(--color-brand)]">{model.intelligenceIndex}</span>
                  </div>
                  <div className="font-semibold">{model.medianPrice}</div>
                  <div className="text-sm text-[var(--color-muted)]">{model.provider}</div>
                </article>
              );
            })}
          </div>

          <div className="mt-4 rounded-[20px] bg-[var(--color-soft)] px-5 py-4 text-sm text-[var(--color-muted)]">
            <p className="font-semibold text-[var(--color-ink)]">💡 怎么看这个榜？</p>
            <p className="mt-2 leading-7">
              智商 index 高的模型适合复杂推理、长文分析和高质量写作；价格低的模型适合日常对话、简单问答和批量任务。
              建议先确定你的主要使用场景，再在中转站榜单里找支持该模型的站点比价。
            </p>
          </div>
        </div>

        <div className="rounded-[36px] border border-[var(--color-line)] bg-white p-7 shadow-[var(--shadow-card)]">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="inline-flex rounded-full bg-[var(--color-brand-soft)] px-3 py-1 text-sm font-bold text-[var(--color-brand-deep)]">
                模型观察页
              </p>
              <h1 className="mt-4 text-5xl font-black tracking-tight sm:text-6xl">
                不知道先用哪个模型？
              </h1>
              <p className="mt-5 text-lg leading-8 text-[var(--color-muted)]">
                这一页把“先选模型，还是先选站”这件事拆开讲清楚。你可以先按任务看模型，再回到中转站榜单比价格、倍率、试用入口和社区备注，避免一开始就被站点名带跑。
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[26px] bg-[var(--color-soft)] px-5 py-4">
                <p className="text-sm text-[var(--color-muted)]">这页的作用</p>
                <p className="mt-2 text-3xl font-black">先定模型</p>
                <p className="mt-1 text-sm text-[var(--color-muted)]">
                  先想清楚你主要做什么任务，再回站点页比较真实成本和入口条件
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
            <span className="rounded-full bg-[var(--color-brand)] px-4 py-2 text-sm font-bold text-[var(--color-on-brand)] shadow-[0_10px_24px_var(--color-panel-glow)]">
              按任务看
            </span>
            <Link href="/stations" className="rounded-full px-4 py-2 text-sm font-semibold text-[var(--color-muted)] transition-colors hover:text-[var(--color-ink)]">
              回站点页比价
            </Link>
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
                  index % 2 === 0 ? "bg-white" : "bg-[var(--color-row-alt)]"
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

          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {modelGuideNotes.map((item) => (
              <article
                key={item.title}
                className="rounded-[26px] border border-[var(--color-line)] bg-[var(--color-soft)] px-5 py-5"
              >
                <h2 className="text-xl font-bold">{item.title}</h2>
                <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
