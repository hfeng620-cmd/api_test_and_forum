import Link from "next/link";

import { NotificationBell } from "@/components/notification-bell";
import { modelGuideNotes, modelPreviewRows, modelRankings, tickerItems } from "@/lib/site-data";

const modelDecisionRoutes = [
  {
    title: "我要主力写作 / 代码",
    description: "先看通用模型，再回榜单页比真实长期成本。",
  },
  {
    title: "我要长文阅读 / 总结",
    description: "优先看长上下文和稳定输出，再判断是否值得长期充值。",
  },
  {
    title: "我想低成本先试一圈",
    description: "先挑低门槛入口和可试用站，再决定主力站。",
  },
];

export default function ModelsPage() {
  return (
    <main className="theme-stage min-h-screen bg-transparent text-[var(--color-ink)]">
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
            {/* 移动端导航 */}
            <nav aria-label="页面导航" className="flex items-center gap-1.5 lg:hidden">
              <Link
                className="rounded-full px-3 py-2 text-xs font-semibold text-[var(--color-muted)] transition hover:bg-[var(--color-soft)] hover:text-[var(--color-ink)]"
                href="/"
              >
                首页
              </Link>
              <Link
                className="rounded-full px-3 py-2 text-xs font-semibold text-[var(--color-muted)] transition hover:bg-[var(--color-soft)] hover:text-[var(--color-ink)]"
                href="/stations"
              >
                榜单
              </Link>
              <Link
                className="rounded-full px-3 py-2 text-xs font-semibold text-[var(--color-muted)] transition hover:bg-[var(--color-soft)] hover:text-[var(--color-ink)]"
                href="/community"
              >
                社区
              </Link>
              <Link
                className="rounded-full px-3 py-2 text-xs font-semibold text-[var(--color-muted)] transition hover:bg-[var(--color-soft)] hover:text-[var(--color-ink)]"
                href="/guides"
              >
                指南
              </Link>
            </nav>
            {/* 桌面端导航 */}
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

      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
        <div data-reveal className="surface-in mb-10 overflow-hidden rounded-[36px] border border-[var(--color-line)] bg-[var(--surface-gradient)] p-7 shadow-[var(--shadow-card)] backdrop-blur">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <p className="inline-flex rounded-full bg-[var(--color-brand-soft)] px-3 py-1 text-sm font-bold text-[var(--color-brand-deep)]">
                先定模型，再去比价
              </p>
              <h1 className="mt-4 max-w-3xl text-4xl font-black tracking-tight sm:text-5xl">
                不要先被站点名带跑，先把你要做的任务说清楚。
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--color-muted)]">
                这一页先帮你做第一层判断：你的主力是通用写作与代码、长文分析，还是低成本尝鲜。模型方向先定下来，回到榜单页比价格、倍率和入口时才不会失焦。
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  className="rounded-full bg-[var(--color-brand)] px-5 py-3 text-sm font-bold text-[var(--color-on-brand)] shadow-[0_12px_24px_var(--color-panel-glow)]"
                  href="/stations"
                >
                  选完就去比价
                </Link>
                <Link
                  className="rounded-full border border-[var(--color-line)] bg-[var(--color-panel)] px-5 py-3 text-sm font-bold text-[var(--color-ink)] transition hover:border-[var(--color-brand)] hover:text-[var(--color-brand-deep)]"
                  href="/community"
                >
                  去看社区反馈
                </Link>
              </div>
            </div>

            <div className="grid gap-3">
              {modelDecisionRoutes.map((item, index) => (
                <article
                  key={item.title}
                  className="stagger-in card-lift rounded-[24px] border border-[var(--color-line)] bg-[var(--color-panel)] px-5 py-5 shadow-[var(--shadow-card)] transition hover:-translate-y-0.5 hover:border-[var(--color-brand)]"
                >
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-brand-deep)]">
                    0{index + 1}
                  </p>
                  <h2 className="mt-2 text-xl font-black">{item.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </div>

        {/* ---- 模型智商排行榜 ---- */}
        <div data-reveal className="surface-in mb-10 rounded-[36px] border border-[var(--color-line)] bg-[var(--color-panel)] p-7 shadow-[var(--shadow-card)] backdrop-blur">
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
            <div className="hidden md:grid grid-cols-[0.5fr_1.5fr_1fr_1fr_1fr] bg-[var(--color-soft)] px-5 py-4 text-sm font-bold text-[var(--color-muted)]">
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
                  className={`grid grid-cols-[auto_1fr] md:grid-cols-[0.5fr_1.5fr_1fr_1fr_1fr] items-center gap-2 md:gap-0 px-5 py-4 ${
                    index % 2 === 0 ? "bg-[var(--color-panel)]" : "bg-[var(--color-row-alt)]"
                  }`}
                >
                  <div>
                    <span className={`inline-flex h-7 w-7 items-center justify-center rounded-full text-xs font-black ${
                      isTop3 ? rankColors[model.rank] : "bg-[var(--color-soft)] text-[var(--color-muted)]"
                    }`}>
                      {model.rank}
                    </span>
                  </div>
                  <div className="md:hidden">
                    <p className="font-bold">{model.name}</p>
                    <p className="text-xs text-[var(--color-muted)]">
                      智商 {model.intelligenceIndex} · {model.medianPrice} · {model.provider}
                    </p>
                  </div>
                  <div className="hidden md:block font-bold">{model.name}</div>
                  <div className="hidden md:block">
                    <span className="font-black text-[var(--color-brand)]">{model.intelligenceIndex}</span>
                  </div>
                  <div className="hidden md:block font-semibold">{model.medianPrice}</div>
                  <div className="hidden md:block text-sm text-[var(--color-muted)]">{model.provider}</div>
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

          <div className="mt-5 grid gap-3 lg:grid-cols-3">
            <div className="card-lift rounded-[22px] border border-[var(--color-line)] bg-[var(--color-panel)] px-4 py-4 shadow-[var(--shadow-card)]">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-muted)]">先看能力</p>
              <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">用排行榜判断大方向，不要把单个低价站误当成模型能力本身。</p>
            </div>
            <div className="card-lift rounded-[22px] border border-[var(--color-line)] bg-[var(--color-panel)] px-4 py-4 shadow-[var(--shadow-card)]">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-muted)]">再看口径</p>
              <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">同一站里 GPT、Claude、Grok 的计费可能完全不是一套口径。</p>
            </div>
            <div className="card-lift rounded-[22px] border border-[var(--color-line)] bg-[var(--color-panel)] px-4 py-4 shadow-[var(--shadow-card)]">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-muted)]">最后看入口</p>
              <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">优先从可试用、注册送额、社区反馈多的站点开始验证。</p>
            </div>
          </div>
        </div>

        <div data-reveal className="surface-in rounded-[36px] border border-[var(--color-line)] bg-[var(--color-panel)] p-7 shadow-[var(--shadow-card)] backdrop-blur">
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
            <div className="hidden md:grid grid-cols-[0.8fr_0.9fr_0.9fr_1.1fr_1.2fr] bg-[var(--color-soft)] px-5 py-4 text-sm font-bold text-[var(--color-muted)]">
              <span>排序</span>
              <span>模型家族</span>
              <span>适用场景</span>
              <span>为什么会选它</span>
              <span>和中转站页怎么联动</span>
            </div>
            {modelPreviewRows.map((row, index) => (
              <article
                key={row.rank}
                className={`grid grid-cols-[auto_1fr] md:grid-cols-[0.8fr_0.9fr_0.9fr_1.1fr_1.2fr] items-start md:items-center gap-2 md:gap-0 px-5 py-5 ${
                  index % 2 === 0 ? "bg-[var(--color-panel)]" : "bg-[var(--color-row-alt)]"
                }`}
              >
                <div className="font-black">{row.rank}</div>
                <div className="md:hidden">
                  <p className="font-bold">{row.family}</p>
                  <p className="text-xs text-[var(--color-muted)]">{row.scene}</p>
                  <p className="mt-1 text-sm leading-6 text-[var(--color-muted)]">{row.focus}</p>
                  <p className="mt-1 text-xs text-[var(--color-brand-deep)]">{row.stationHint}</p>
                </div>
                <div className="hidden md:block font-bold">{row.family}</div>
                <div className="hidden md:block font-bold">{row.scene}</div>
                <div className="hidden md:block text-sm leading-6 text-[var(--color-muted)]">
                  {row.focus}
                </div>
                <div className="hidden md:block text-sm leading-6 text-[var(--color-muted)]">
                  {row.stationHint}
                </div>
              </article>
            ))}
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {modelGuideNotes.map((item) => (
              <article
                key={item.title}
                className="stagger-in card-lift rounded-[26px] border border-[var(--color-line)] bg-[var(--color-soft)] px-5 py-5"
              >
                <h2 className="text-xl font-bold">{item.title}</h2>
                <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">
                  {item.description}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-8 rounded-[28px] border border-[var(--color-line)] bg-[var(--color-panel-strong)] px-5 py-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-muted)]">
                  下一步
                </p>
                <h2 className="mt-2 text-2xl font-black tracking-tight">
                  模型方向已经定下来，就回榜单页看真实成本。
                </h2>
                <p className="mt-2 text-sm leading-7 text-[var(--color-muted)]">
                  这页负责帮你定模型，榜单页负责比倍率、价格、入口和社区口径。两页分工清楚，判断会稳很多。
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  className="rounded-full bg-[var(--color-brand)] px-5 py-3 text-sm font-bold text-[var(--color-on-brand)] shadow-[0_12px_24px_var(--color-panel-glow)]"
                  href="/stations"
                >
                  回榜单页比价
                </Link>
                <Link
                  className="rounded-full border border-[var(--color-line)] bg-[var(--color-panel)] px-5 py-3 text-sm font-bold text-[var(--color-ink)] transition hover:border-[var(--color-brand)] hover:text-[var(--color-brand-deep)]"
                  href="/guides"
                >
                  看使用指南
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
