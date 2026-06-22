import Link from "next/link";

import { SubmissionPanel } from "@/components/submission-panel";
import { ThemeToggle } from "@/components/theme-toggle";
import { stationComparisonRows } from "@/lib/site-data";

const chargeModes = [
  "全部站点",
  "按倍率",
  "模型分档",
  "试用入口",
  "公益免费",
  "待补信息",
  "特殊入口",
];

const compareFocuses = [
  "新手先试",
  "价格更低",
  "收费清楚",
  "社区备注多",
  "先看风险",
];

export default function StationsPage() {
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
              <p className="text-sm text-[var(--color-muted)]">
                中转站价格、收费方式、入口与社区备注
              </p>
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
              <span className="rounded-full bg-[var(--color-ink)] px-4 py-2 text-sm font-semibold text-white">
                中转站榜单
              </span>
              <Link
                className="rounded-full px-4 py-2 text-sm font-semibold text-[var(--color-muted)] transition hover:bg-[var(--color-soft)] hover:text-[var(--color-ink)]"
                href="/community"
              >
                论坛入口
              </Link>
            </nav>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
        <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[32px] border border-[var(--color-line)] bg-white p-8 shadow-[var(--shadow-card)]">
            <span className="inline-flex rounded-full bg-[var(--color-brand-soft)] px-3 py-1 text-sm font-bold text-[var(--color-brand-deep)]">
              单一核心入口
            </span>
            <h1 className="mt-5 text-5xl font-black leading-[1.08] tracking-tight sm:text-6xl">
              先看价格口径，
              <br />
              再看社区备注
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-[var(--color-muted)]">
              这一页不强行把所有站压成一个统一分数，而是把地址、收费方式、倍率、试用入口和社区备注拆开摆给你看。适合真实世界这种收费方式很乱、口径也不完全统一的中转站集合。
            </p>

            <div className="mt-8 rounded-[28px] border border-[var(--color-line)] bg-[var(--color-soft)] p-5">
              <div className="grid gap-4 lg:grid-cols-[1.1fr_1fr_1fr_auto]">
                <label className="space-y-2">
                  <span className="text-sm font-semibold text-[var(--color-muted)]">
                    站点关键词
                  </span>
                  <input
                    className="w-full rounded-2xl border border-[var(--color-line)] bg-white px-4 py-3 outline-none transition focus:border-[var(--color-brand)]"
                    defaultValue="虎虎 / Aether / 杂货铺 / dasuAPI"
                  />
                </label>

                <label className="space-y-2">
                  <span className="text-sm font-semibold text-[var(--color-muted)]">
                    收费方式
                  </span>
                  <div className="rounded-2xl border border-[var(--color-line)] bg-white px-4 py-3 font-medium">
                    按倍率 / 模型分档 / 公益免费
                  </div>
                </label>

                <label className="space-y-2">
                  <span className="text-sm font-semibold text-[var(--color-muted)]">
                    比较侧重
                  </span>
                  <div className="rounded-2xl border border-[var(--color-line)] bg-white px-4 py-3 font-medium">
                    新手先试 + 收费清楚
                  </div>
                </label>

                <button
                  className="self-end rounded-full bg-[var(--color-brand)] px-7 py-3.5 text-base font-bold text-white transition hover:bg-[var(--color-brand-deep)]"
                  type="button"
                >
                  开始筛选
                </button>
              </div>

              <p className="mt-4 text-sm leading-6 text-[var(--color-muted)]">
                这里的“收费方式”就是把站点按怎么收费来分：有的是单倍率，有的是按模型分不同价格，有的是公益免费，还有一些目前信息不全。
              </p>

              <div className="mt-5 flex flex-wrap gap-3">
                {chargeModes.map((item, index) => (
                  <span
                    key={item}
                    className={`rounded-full px-4 py-2 text-sm font-semibold ${
                      index === 0
                        ? "bg-[var(--color-brand)] text-white"
                        : "bg-white text-[var(--color-muted)] ring-1 ring-[var(--color-line)]"
                    }`}
                  >
                    {item}
                  </span>
                ))}
              </div>

              <div className="mt-3 flex flex-wrap gap-3">
                {compareFocuses.map((item, index) => (
                  <span
                    key={item}
                    className={`rounded-full px-4 py-2 text-sm font-semibold ${
                      index === 0
                        ? "bg-[var(--color-ink)] text-white"
                        : "bg-white text-[var(--color-muted)] ring-1 ring-[var(--color-line)]"
                    }`}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <article className="rounded-[26px] border border-[var(--color-line)] bg-white p-5 shadow-[var(--shadow-card)]">
                <p className="text-sm text-[var(--color-muted)]">最低已知倍率</p>
                <p className="mt-2 text-4xl font-black">0.058x</p>
                <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">
                  当前来自杂货铺 GPT 模型口径，不能直接代表 Claude 组价格。
                </p>
              </article>

              <article className="rounded-[26px] border border-[var(--color-line)] bg-white p-5 shadow-[var(--shadow-card)]">
                <p className="text-sm text-[var(--color-muted)]">最适合先看</p>
                <p className="mt-2 text-4xl font-black">试用入口</p>
                <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">
                  新来的人先别急着充值，先试再决定长期用谁。
                </p>
              </article>
            </div>

            <Link
              href="/community"
              className="rounded-[30px] border border-[var(--color-line)] bg-[linear-gradient(135deg,#f8fbff,#e9f1ff)] p-6 shadow-[var(--shadow-card)] transition hover:translate-y-[-1px]"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-brand-deep)]">
                    论坛入口
                  </p>
                  <h2 className="mt-2 text-2xl font-black">报料、避坑、补实测都从这里进</h2>
                </div>
                <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-[var(--color-brand-deep)]">
                  直接可进
                </span>
              </div>
              <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">
                如果你用过其中某个站，或者看到价格变化、模型缩水、试用活动、免费入口，都可以直接进讨论区补一条。
              </p>
            </Link>

            <div className="rounded-[30px] border border-[var(--color-line)] bg-white p-6 shadow-[var(--shadow-card)]">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-muted)]">
                读表提醒
              </p>
              <div className="mt-4 space-y-3 text-sm leading-7 text-[var(--color-muted)]">
                <p>同一个域名也可能有不同模型不同价格，不要只看最低值。</p>
                <p>“免费” 和 “低倍率” 只是入口属性，不等于长期稳定。</p>
                <p>信息待补的站先保留入口，等群友继续补第一手实测。</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-14 lg:px-10">
        <div className="rounded-[32px] border border-[var(--color-line)] bg-white shadow-[var(--shadow-card)]">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--color-line)] px-6 py-5">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-muted)]">
                中转站总表
              </p>
              <h2 className="mt-2 text-3xl font-black">把地址、收费方式、价格和备注横向摆平</h2>
            </div>
            <Link
              href="/community"
              className="rounded-full bg-[var(--color-soft)] px-4 py-2 text-sm font-bold text-[var(--color-brand-deep)] transition hover:bg-[var(--color-brand-soft)]"
            >
              去论坛补反馈
            </Link>
          </div>

          <div className="overflow-x-auto">
            <div className="min-w-[1180px]">
              <div className="grid grid-cols-[1.05fr_1fr_0.92fr_0.9fr_0.8fr_1.3fr] bg-[var(--color-soft)] px-6 py-4 text-sm font-bold text-[var(--color-muted)]">
                <span>站点</span>
                <span>入口 / 地址</span>
                <span>收费方式</span>
                <span>标称价格</span>
                <span>倍率</span>
                <span>状态与社区备注</span>
              </div>

              {stationComparisonRows.map((row, index) => (
                <article
                  key={`${row.name}-${index}`}
                  className={`grid grid-cols-[1.05fr_1fr_0.92fr_0.9fr_0.8fr_1.3fr] items-start px-6 py-5 ${
                    index % 2 === 0 ? "bg-white" : "bg-[#f9fbfe]"
                  }`}
                >
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="font-bold">{row.name}</h3>
                      <span className="rounded-full bg-[var(--color-brand-soft)] px-2.5 py-1 text-xs font-bold text-[var(--color-brand-deep)]">
                        {row.badge}
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">
                      {row.group}
                    </p>
                  </div>

                  <div className="text-sm leading-6 text-[var(--color-muted)]">{row.entry}</div>

                  <div>
                    <p className="font-bold">{row.packageType}</p>
                    <p className="mt-1 text-sm leading-6 text-[var(--color-muted)]">
                      {row.models}
                    </p>
                  </div>

                  <div className="font-bold">{row.price}</div>

                  <div className="font-bold">{row.multiplier}</div>

                  <div>
                    <p className="font-bold">{row.status}</p>
                    <p className="mt-1 text-sm leading-6 text-[var(--color-muted)]">
                      {row.note}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-16 lg:px-10">
        <SubmissionPanel />
      </section>
    </main>
  );
}
