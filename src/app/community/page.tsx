import Link from "next/link";

import { ThemeToggle } from "@/components/theme-toggle";
import {
  collaborationSteps,
  communityPosts,
  contributionTasks,
  forumHighlights,
} from "@/lib/site-data";

export default function CommunityPage() {
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
              <p className="text-sm text-[var(--color-muted)]">讨论区与共建入口</p>
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
              <span className="rounded-full bg-[var(--color-ink)] px-4 py-2 text-sm font-semibold text-white">
                论坛入口
              </span>
            </nav>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
        <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
          <div className="space-y-6">
            <div className="rounded-[32px] border border-[var(--color-line)] bg-[linear-gradient(135deg,#eff6ff,#dbeafe)] p-6 shadow-[0_18px_60px_rgba(37,99,235,0.10)]">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-brand-deep)]">
                小入口但要显眼
              </p>
              <h1 className="mt-2 text-4xl font-black tracking-tight">
                这里以后就是群友一起维护的讨论区入口
              </h1>
              <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">
                首页不把论坛做太重，但这个入口要能承接报料、避坑、价格变动、试用反馈和新站点收集。后面你可以接 GitHub Discussions、Issue 或外部论坛。
              </p>
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
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/stations"
                  className="rounded-full bg-[var(--color-brand)] px-5 py-3 text-sm font-bold text-white transition hover:bg-[var(--color-brand-deep)]"
                >
                  先回榜单看站点
                </Link>
                <Link
                  href="/guides"
                  className="rounded-full border border-[var(--color-line)] bg-white px-5 py-3 text-sm font-bold text-[var(--color-ink)] transition hover:bg-[var(--color-soft)]"
                >
                  查看更多指南
                </Link>
              </div>
            </div>

            <div className="rounded-[32px] border border-[var(--color-line)] bg-white p-6 shadow-[0_18px_60px_rgba(13,25,48,0.07)]">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-muted)]">
                怎么一起做
              </p>
              <div className="mt-5 space-y-3">
                {collaborationSteps.map((step) => (
                  <article
                    key={step.title}
                    className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-soft)] p-4"
                  >
                    <h2 className="font-bold">{step.title}</h2>
                    <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">
                      {step.description}
                    </p>
                  </article>
                ))}
              </div>
            </div>

            <div className="rounded-[32px] border border-[var(--color-line)] bg-white p-6 shadow-[0_18px_60px_rgba(13,25,48,0.07)]">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-muted)]">
                先从这些开始
              </p>
              <p className="mt-2 text-sm leading-7 text-[var(--color-muted)]">
                发给群友的时候，最容易参与的不是直接写代码，而是先补一条线索、一个截图、一次使用感受。
              </p>
              <div className="mt-5 grid gap-3">
                {contributionTasks.map((task) => (
                  <div
                    key={task}
                    className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-soft)] px-4 py-4 text-sm font-semibold"
                  >
                    {task}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-[32px] border border-[var(--color-line)] bg-white p-6 shadow-[0_18px_60px_rgba(13,25,48,0.07)]">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-muted)]">
              首页会露出的讨论样例
            </p>
            <div className="mt-5 grid gap-4">
              {communityPosts.map((post) => (
                <article
                  key={post.title}
                  className="rounded-[26px] border border-[var(--color-line)] bg-[var(--color-soft)] p-5"
                >
                  <div className="flex flex-wrap items-center gap-3 text-sm">
                    <span className="rounded-full bg-white px-3 py-1 font-semibold text-[var(--color-brand-deep)]">
                      {post.category}
                    </span>
                    <span className="text-[var(--color-muted)]">{post.meta}</span>
                  </div>
                  <h2 className="mt-4 text-xl font-bold">{post.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">
                    {post.summary}
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
