"use client";

import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import {
  createSelectionComment,
  loadSelectionComments,
  removeSelectionComment,
  type SelectionComment,
  type SelectionCommentSide,
} from "@/lib/selection-comments";

type DraftSelection = {
  quote: string;
  top: number;
  left: number;
  side: SelectionCommentSide;
  anchorTop: number;
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("zh-CN", {
    month: "numeric",
    day: "numeric",
  });
}

const ENABLED_PATHS = new Set(["/", "/stations"]);

const BLOCKED_SELECTOR = [
  "a",
  "button",
  "input",
  "textarea",
  "select",
  "option",
  "label",
  "nav",
  "form",
  "[contenteditable='true']",
  "[data-selection-comments='off']",
].join(", ");

export function SelectionCommentLayer() {
  const pathname = usePathname();
  const commentsEnabled = ENABLED_PATHS.has(pathname);
  const [comments, setComments] = useState<SelectionComment[]>(() => loadSelectionComments());
  const [draft, setDraft] = useState<DraftSelection | null>(null);
  const [commentText, setCommentText] = useState("");
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    function handleScroll() {
      setScrollY(window.scrollY);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!commentsEnabled) {
      return;
    }

    function handleMouseUp() {
      const selection = window.getSelection();
      if (!selection || selection.rangeCount === 0 || selection.isCollapsed) {
        return;
      }

      const text = selection.toString().trim().replace(/\s+/g, " ");
      if (!text || text.length < 2) {
        return;
      }

      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      if (!rect.width && !rect.height) {
        return;
      }

      const anchorNode =
        range.commonAncestorContainer.nodeType === Node.ELEMENT_NODE
          ? (range.commonAncestorContainer as Element)
          : range.commonAncestorContainer.parentElement;
      if (!anchorNode) {
        return;
      }

      if (!anchorNode.closest("main")) {
        return;
      }

      if (anchorNode.closest(BLOCKED_SELECTOR)) {
        return;
      }

      const activeElement = document.activeElement;
      if (
        activeElement instanceof HTMLElement &&
        activeElement.closest(".selection-comment-pop")
      ) {
        return;
      }

      const side: SelectionCommentSide =
        rect.left + rect.width / 2 > window.innerWidth / 2 ? "left" : "right";

      const panelWidth = 320;
      const margin = 20;
      const top = Math.min(
        window.innerHeight - 240,
        Math.max(96, rect.top + rect.height / 2 - 56),
      );
      const left =
        side === "right"
          ? Math.min(window.innerWidth - panelWidth - margin, rect.right + 18)
          : Math.max(margin, rect.left - panelWidth - 18);

      setCommentText("");
      setDraft({
        quote: text,
        top,
        left,
        side,
        anchorTop: window.scrollY + rect.top,
      });
    }

    document.addEventListener("mouseup", handleMouseUp);
    return () => document.removeEventListener("mouseup", handleMouseUp);
  }, [commentsEnabled]);

  const pageComments = useMemo(
    () =>
      comments
        .filter((item) => item.pathname === pathname)
        .sort((a, b) => a.anchorTop - b.anchorTop),
    [comments, pathname],
  );

  const leftComments = pageComments.filter((item) => item.side === "left");
  const rightComments = pageComments.filter((item) => item.side === "right");

  function handleSaveComment() {
    if (!draft || !commentText.trim()) {
      return;
    }

    const created = createSelectionComment({
      pathname,
      quote: draft.quote,
      body: commentText.trim(),
      side: draft.side,
      anchorTop: draft.anchorTop,
    });

    setComments((current) => [...current, created]);
    setCommentText("");
    setDraft(null);
    window.getSelection()?.removeAllRanges();
  }

  function handleDeleteComment(id: string) {
    const updated = removeSelectionComment(id);
    setComments(updated);
  }

  return (
    <>
      <div className="pointer-events-none fixed inset-y-0 left-0 z-40 hidden w-[270px] xl:block">
        <div className="relative h-full">
          {leftComments.map((item) => (
            <article
              key={item.id}
              className="pointer-events-auto absolute left-4 w-[240px] rounded-[20px] border border-[var(--color-line)] bg-white/95 p-4 shadow-[0_18px_50px_rgba(15,23,42,0.12)] backdrop-blur"
              style={{ top: Math.max(120, item.anchorTop - scrollY) }}
            >
              <div className="flex items-center justify-between gap-3">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-muted)]">
                  评论
                </span>
                <button
                  className="text-xs font-semibold text-[var(--color-muted)] transition hover:text-[var(--color-ink)]"
                  onClick={() => handleDeleteComment(item.id)}
                  type="button"
                >
                  删除
                </button>
              </div>
              <p className="mt-3 text-xs leading-5 text-[var(--color-muted)]">“{item.quote}”</p>
              <p className="mt-3 text-sm leading-6 text-[var(--color-ink)]">{item.body}</p>
              <p className="mt-3 text-xs text-[var(--color-muted)]">{formatDate(item.createdAt)}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="pointer-events-none fixed inset-y-0 right-0 z-40 hidden w-[270px] xl:block">
        <div className="relative h-full">
          {rightComments.map((item) => (
            <article
              key={item.id}
              className="pointer-events-auto absolute right-4 w-[240px] rounded-[20px] border border-[var(--color-line)] bg-white/95 p-4 shadow-[0_18px_50px_rgba(15,23,42,0.12)] backdrop-blur"
              style={{ top: Math.max(120, item.anchorTop - scrollY) }}
            >
              <div className="flex items-center justify-between gap-3">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-muted)]">
                  评论
                </span>
                <button
                  className="text-xs font-semibold text-[var(--color-muted)] transition hover:text-[var(--color-ink)]"
                  onClick={() => handleDeleteComment(item.id)}
                  type="button"
                >
                  删除
                </button>
              </div>
              <p className="mt-3 text-xs leading-5 text-[var(--color-muted)]">“{item.quote}”</p>
              <p className="mt-3 text-sm leading-6 text-[var(--color-ink)]">{item.body}</p>
              <p className="mt-3 text-xs text-[var(--color-muted)]">{formatDate(item.createdAt)}</p>
            </article>
          ))}
        </div>
      </div>

      {commentsEnabled && draft ? (
        <div
          className="selection-comment-pop pointer-events-auto fixed z-50 w-[320px] rounded-[24px] border border-[var(--color-line)] bg-white/96 p-4 shadow-[0_24px_70px_rgba(15,23,42,0.18)] backdrop-blur"
          style={{ top: draft.top, left: draft.left }}
        >
          <div className="flex items-center justify-between gap-4">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-muted)]">
              划词评论
            </span>
            <button
              className="text-xs font-semibold text-[var(--color-muted)] transition hover:text-[var(--color-ink)]"
              onClick={() => {
                setDraft(null);
                setCommentText("");
                window.getSelection()?.removeAllRanges();
              }}
              type="button"
            >
              关闭
            </button>
          </div>
          <p className="mt-3 rounded-2xl bg-[var(--color-soft)] px-3 py-3 text-sm leading-6 text-[var(--color-muted)]">
            “{draft.quote}”
          </p>
          <textarea
            className="mt-3 min-h-24 w-full rounded-2xl border border-[var(--color-line)] bg-white px-3 py-3 text-sm leading-6 outline-none transition focus:border-[var(--color-brand)]"
            onChange={(event) => setCommentText(event.target.value)}
            placeholder="像 Notion 那样，给这段话单独留个评论。"
            value={commentText}
          />
          <div className="mt-3 flex items-center justify-between gap-4">
            <span className="text-xs text-[var(--color-muted)]">
              保存后会自动挂到{draft.side === "left" ? "左侧" : "右侧"}评论栏
            </span>
            <button
              className="rounded-full bg-[var(--color-brand)] px-4 py-2 text-sm font-bold text-white transition hover:bg-[var(--color-brand-deep)]"
              onClick={handleSaveComment}
              type="button"
            >
              发布评论
            </button>
          </div>
        </div>
      ) : null}

      {commentsEnabled && pageComments.length > 0 ? (
        <div className="fixed right-4 bottom-4 z-30 xl:hidden">
          <div className="rounded-full border border-[var(--color-line)] bg-white/95 px-4 py-2 text-sm font-semibold shadow-[0_10px_30px_rgba(15,23,42,0.12)] backdrop-blur">
            本页评论 {pageComments.length}
          </div>
        </div>
      ) : null}
    </>
  );
}
