import Link from "next/link";

import { ThemeToggle } from "@/components/theme-toggle";
import { faqEntries, guideCards, resourceLinks } from "@/lib/site-data";

export default function GuidesPage() {
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
              <p className="text-sm text-[var(--color-muted)]">常见问题与更多指南</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <nav className="hidden items-center gap-2 rounded-full border border-[var(--color-line)] bg-white p-1 md:flex">
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
              <span className="rounded-full bg-[var(--color-brand)] px-4 py-2 text-sm font-semibold text-white shadow-[0_10px_24px_var(--color-panel-glow)]">
                更多指南
              </span>
            </nav>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
        <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-6">
            <div className="rounded-[32px] border border-[var(--color-line)] bg-white p-6 shadow-[0_18px_60px_rgba(13,25,48,0.07)]">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-muted)]">
                先看这几个
              </p>
              <h1 className="mt-2 text-4xl font-black tracking-tight">
                先把新手最容易踩坑的点集中讲清楚
              </h1>
              <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">
                首页只放一两个问题，这里把试用顺序、多倍率理解、免费入口风险和第一次怎么验证这些事情单独展开。
              </p>
            </div>

            <div className="rounded-[32px] border border-[var(--color-line)] bg-white p-6 shadow-[0_18px_60px_rgba(13,25,48,0.07)]">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-muted)]">
                新手指南
              </p>
              <div className="mt-5 grid gap-4">
                {guideCards.map((card) => (
                  <article
                    key={card.title}
                    className="rounded-[26px] border border-[var(--color-line)] bg-[var(--color-soft)] p-5"
                  >
                    <h2 className="text-xl font-bold">{card.title}</h2>
                    <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">
                      {card.description}
                    </p>
                  </article>
                ))}
              </div>
            </div>

            <div className="rounded-[32px] border border-[var(--color-line)] bg-[var(--color-soft)] p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-muted)]">
                试用入口
              </p>
              <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">
                这几条入口更适合先试水，再结合群友反馈判断要不要长期用。
              </p>
              <div className="mt-4 grid gap-3">
                {resourceLinks.map((item) => (
                  <a
                    key={item.title}
                    className="rounded-2xl border border-[var(--color-line)] bg-white px-4 py-4 transition hover:border-[var(--color-brand)]"
                    href={item.href}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <p className="font-bold text-[var(--color-brand-deep)]">
                      {item.title}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">
                      {item.note}
                    </p>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-[32px] border border-[var(--color-line)] bg-white p-6 shadow-[0_18px_60px_rgba(13,25,48,0.07)]">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-muted)]">
              常见问题
            </p>
            <div className="mt-5 space-y-4">
              {faqEntries.map((item) => (
                <article
                  key={item.question}
                  className="rounded-[26px] border border-[var(--color-line)] bg-[var(--color-soft)] p-5"
                >
                  <h2 className="text-lg font-bold">{item.question}</h2>
                  <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">
                    {item.answer}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
