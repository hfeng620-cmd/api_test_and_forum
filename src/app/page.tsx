import Link from "next/link";

import { FeaturedStationsPanel } from "@/components/featured-stations-panel";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  faqPreview,
  forumHighlights,
  homeFeaturedStations,
  resourceLinks,
  tickerItems,
} from "@/lib/site-data";

export default function Home() {
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
                先看中转站，再看讨论，再决定长期用谁。
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <nav className="hidden items-center gap-2 rounded-full border border-[var(--color-line)] bg-white p-1 lg:flex">
              <span className="rounded-full bg-[var(--color-ink)] px-4 py-2 text-sm font-semibold text-white">
                首页
              </span>
              <Link
                className="rounded-full px-4 py-2 text-sm font-semibold text-[var(--color-muted)] transition hover:bg-[var(--color-soft)] hover:text-[var(--color-ink)]"
                href="/stations"
              >
                中转站榜单
              </Link>
              <Link
                className="rounded-full px-4 py-2 text-sm font-semibold text-[var(--color-muted)] transition hover:bg-[var(--color-soft)] hover:text-[var(--color-ink)]"
                href="/community"
              >
                论坛入口
              </Link>
              <Link
                className="rounded-full px-4 py-2 text-sm font-semibold text-[var(--color-muted)] transition hover:bg-[var(--color-soft)] hover:text-[var(--color-ink)]"
                href="/guides"
              >
                更多指南
              </Link>
            </nav>
          </div>
        </div>

        <div className="border-t border-[var(--color-line)] bg-[var(--color-soft)]">
          <div className="mx-auto flex max-w-7xl items-center gap-5 overflow-x-auto px-6 py-3 text-sm whitespace-nowrap text-[var(--color-muted)] lg:px-10">
            <span className="font-semibold text-[var(--color-ink)]">站点速报</span>
            {tickerItems.map((item) => (
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

      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
        <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-[32px] border border-[var(--color-line)] bg-white p-8 shadow-[var(--shadow-card)]">
            <span className="inline-flex rounded-full bg-[var(--color-brand-soft)] px-3 py-1 text-sm font-bold text-[var(--color-brand-deep)]">
              单一核心入口
            </span>
            <h1 className="mt-5 max-w-4xl text-5xl font-black leading-[1.08] tracking-tight sm:text-6xl">
              先看价格口径，
              <br />
              再看社区备注
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-[var(--color-muted)]">
              首页只负责帮你快速进入中转站榜单、试用入口和讨论区。详细比较放在榜单页，讨论沉淀放在论坛入口，避免页面越做越乱。
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/stations"
                className="inline-flex items-center justify-center rounded-full bg-[var(--color-brand)] px-7 py-3.5 text-base font-bold text-white transition hover:bg-[var(--color-brand-deep)]"
              >
                进入中转站榜单
              </Link>
              <Link
                href="/community"
                className="inline-flex items-center justify-center rounded-full border border-[var(--color-line)] bg-white px-7 py-3.5 text-base font-bold text-[var(--color-ink)] transition hover:bg-[var(--color-soft)]"
              >
                进入论坛入口
              </Link>
            </div>
          </div>

          <div className="grid gap-5">
            <Link
              href="/community"
              className="rounded-[30px] border border-[var(--color-line)] bg-[linear-gradient(135deg,#f8fbff,#e9f1ff)] p-6 shadow-[var(--shadow-card)] transition hover:translate-y-[-1px]"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-brand-deep)]">
                    论坛入口
                  </p>
                  <h2 className="mt-2 text-2xl font-black">讨论、报料、避坑都从这里进</h2>
                </div>
                <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-[var(--color-brand-deep)]">
                  显眼入口
                </span>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {forumHighlights.map((item) => (
                  <span
                    key={item.title}
                    className="rounded-full bg-white px-3 py-2 text-sm font-semibold text-[var(--color-muted)] ring-1 ring-[var(--color-line)]"
                  >
                    {item.title}
                  </span>
                ))}
              </div>
            </Link>

            <div className="rounded-[30px] border border-[var(--color-line)] bg-white p-6 shadow-[var(--shadow-card)]">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-muted)]">
                先试再决定
              </p>
              <div className="mt-4 grid gap-3">
                {resourceLinks.slice(0, 2).map((link) => (
                  <a
                    key={link.title}
                    className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-soft)] px-4 py-4 transition hover:border-[var(--color-brand)]"
                    href={link.href}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <p className="font-bold text-[var(--color-brand-deep)]">{link.title}</p>
                    <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">
                      {link.note}
                    </p>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-10 lg:px-10">
        <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <FeaturedStationsPanel initialStations={homeFeaturedStations} />

          <div className="grid gap-6">
            <div className="rounded-[30px] border border-[var(--color-line)] bg-white p-6 shadow-[var(--shadow-card)]">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-muted)]">
                    常见问题
                  </p>
                  <h2 className="mt-2 text-2xl font-black">先把最容易问的两件事说清楚</h2>
                </div>
                <Link
                  href="/guides"
                  className="rounded-full bg-[var(--color-soft)] px-4 py-2 text-sm font-bold text-[var(--color-brand-deep)] transition hover:bg-[var(--color-brand-soft)]"
                >
                  更多指南
                </Link>
              </div>
              <div className="mt-5 space-y-3">
                {faqPreview.map((item) => (
                  <article
                    key={item.question}
                    className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-soft)] p-4"
                  >
                    <h3 className="font-bold">{item.question}</h3>
                    <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">
                      {item.answer}
                    </p>
                  </article>
                ))}
              </div>
            </div>

            <div className="rounded-[30px] border border-[var(--color-line)] bg-[var(--color-soft)] p-6 text-sm leading-7 text-[var(--color-muted)] shadow-[var(--shadow-card)]">
              真正要做成“指定管理员修改后，所有访问者都看到同一份内容”，下一步需要接后台。
              这版先把界面、信息结构和管理员交互定下来，后面再接数据库或管理 API。
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
