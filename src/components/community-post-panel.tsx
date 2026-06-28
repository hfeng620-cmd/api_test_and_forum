"use client";

import { useRef, useState, useEffect, useMemo } from "react";

import { createDiscussionPost, uploadForumImage, loadAllTags, loadDiscussionPosts } from "@/lib/discussion-storage";
import { useForumAuth } from "@/lib/forum-auth";
import { CATEGORIES, DEFAULT_CATEGORY, isCategoryTag, type CategoryInfo } from "@/lib/categories";
import { FORUM_IMAGE_ACCEPT } from "@/lib/forum-image-safety";

type CommunityPostPanelProps = {
  onPostCreated?: () => void;
};

export function CommunityPostPanel({ onPostCreated }: CommunityPostPanelProps) {
  const [open, setOpen] = useState(false);
  const [station, setStation] = useState("");
  const [body, setBody] = useState("");
  const [status, setStatus] = useState("发布后即显示在讨论区。");
  const [submitting, setSubmitting] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<CategoryInfo>(DEFAULT_CATEGORY);

  const { isConnected, displayName, showAuthModal } = useForumAuth();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [allTags, setAllTags] = useState<string[]>([]);

  // @mention autocomplete state
  const [recentAuthors, setRecentAuthors] = useState<string[]>([]);
  const [mentionIndex, setMentionIndex] = useState(0);

  useEffect(() => {
    let cancelled = false;
    loadAllTags().then((tags) => {
      if (!cancelled) setAllTags(tags);
    }).catch(() => {});
    return () => { cancelled = true; };
  }, []);

  // Load recent author names for @mention autocomplete
  useEffect(() => {
    let cancelled = false;
    loadDiscussionPosts().then((posts) => {
      if (!cancelled) {
        const names = new Set<string>();
        for (const p of posts) {
          if (p.author && p.author !== "噜噜") names.add(p.author);
        }
        setRecentAuthors(Array.from(names).sort((a, b) => a.localeCompare(b, "zh-CN")));
      }
    }).catch(() => {});
    return () => { cancelled = true; };
  }, []);

  const tagSuggestions = useMemo(() => {
    if (!station.trim()) return [];
    const segments = station.split(/[，,\s]+/);
    const lastSegment = segments[segments.length - 1]?.trim() ?? "";
    if (!lastSegment) return [];
    const lower = lastSegment.toLowerCase();
    return allTags
      .filter((t) => t.toLowerCase().includes(lower) && t !== lastSegment)
      .slice(0, 6);
  }, [station, allTags]);

  /* eslint-disable react-hooks/refs */
  // Detect @mention pattern in textarea (reads textarea ref for cursor position)
  const mentionState = useMemo(() => {
    if (!body) return { active: false, query: "", startIdx: -1 };
    const textarea = textareaRef.current;
    if (!textarea) return { active: false, query: "", startIdx: -1 };
    const cursor = textarea.selectionStart;
    if (cursor === null) return { active: false, query: "", startIdx: -1 };
    const textBefore = body.slice(0, cursor);
    const atMatch = textBefore.match(/(?:^|[^\w一-鿿])@([\w一-鿿]*)$/);
    if (!atMatch) return { active: false, query: "", startIdx: -1 };
    return {
      active: true,
      query: atMatch[1],
      startIdx: cursor - atMatch[1].length - 1,
    };
  }, [body]);
  /* eslint-enable react-hooks/refs */

  // Filtered mention suggestions
  const mentionSuggestions = useMemo(() => {
    if (!mentionState.active) return [];
    const q = mentionState.query.toLowerCase();
    return recentAuthors
      .filter((name) => name.toLowerCase().includes(q) && name !== mentionState.query)
      .slice(0, 6);
  }, [mentionState, recentAuthors]);

  function handleSelectMention(name: string) {
    if (!mentionState.active) return;

    const before = body.slice(0, mentionState.startIdx);
    const after = body.slice(textareaRef.current?.selectionStart ?? body.length);
    const newBody = `${before}@${name} ${after}`;
    setBody(newBody);
    setMentionIndex(0);

    // Move cursor after the inserted mention
    const cursorPos = mentionState.startIdx + name.length + 2; // @name + space
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.selectionStart = cursorPos;
        textareaRef.current.selectionEnd = cursorPos;
        textareaRef.current.focus();
      }
    }, 0);
  }

  // Keyboard navigation for mention popup
  function handleTextareaKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (!mentionState.active || mentionSuggestions.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setMentionIndex((prev) => (prev + 1) % mentionSuggestions.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setMentionIndex((prev) => (prev - 1 + mentionSuggestions.length) % mentionSuggestions.length);
    } else if (e.key === "Enter" || e.key === "Tab") {
      e.preventDefault();
      handleSelectMention(mentionSuggestions[mentionIndex]);
    } else if (e.key === "Escape") {
      // Close popup by blurring; the mention state will naturally clear
      e.preventDefault();
      textareaRef.current?.blur();
    }
  }

  function handleSelectSuggestion(tag: string) {
    const segments = station.split(/[，,\s]+/);
    segments[segments.length - 1] = tag;
    setStation(segments.join(" "));
  }

  async function handleSubmit() {
    if (!isConnected) {
      showAuthModal();
      return;
    }

    if (submitting) return;

    if (!body.trim()) {
      setStatus("先写一点正文，再发布。");
      return;
    }

    if (body.trim().length < 5) {
      setStatus("正文至少需要5个字符，再写详细一点吧。");
      return;
    }

    const tags = station
      .split(/[，,\s]+/)
      .map((item) => item.trim())
      .filter(Boolean)
      .filter((t) => !isCategoryTag(t));

    const allTags = [selectedCategory.tagValue, ...tags];

    setSubmitting(true);
    try {
      await createDiscussionPost({
        author: displayName || "噜噜",
        handle: "@forum",
        body: body.trim(),
        station: station.trim(),
        tags: allTags,
      });

      setBody("");
      setStation("");
      setOpen(false);
      setStatus("已发布。");
      onPostCreated?.();
    } catch (err) {
      setStatus(err instanceof Error ? err.message : "发布失败，请检查网络后重试。");
    } finally {
      setSubmitting(false);
    }
  }

  function handlePlaceholderClick() {
    if (!isConnected) {
      showAuthModal();
      return;
    }
    setOpen(true);
  }

  return (
    <div
      className="surface-in card-lift rounded-[22px] border border-[var(--color-line)] bg-[linear-gradient(180deg,var(--color-panel),color-mix(in_srgb,var(--color-panel)_82%,var(--color-soft)))] p-4 shadow-[var(--shadow-card)] backdrop-blur transition-all duration-300 sm:p-5"
      data-selection-comments="off"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--color-line)] pb-2.5">
        <div>
          <h2 className="mb-1 text-lg font-black tracking-tight">发帖子</h2>
          <p className="text-xs text-[var(--color-muted)]">价格、稳定性、模型口径都可以先发这里。</p>
        </div>
        <a
          className="rounded-full border border-[var(--color-line)] px-3 py-2 text-xs font-bold text-[var(--color-muted)] transition hover:border-[var(--color-brand)] hover:text-[var(--color-brand-deep)]"
          href="https://github.com/hfeng620-cmd/timin_api_test_and_forum/discussions"
          rel="noopener noreferrer"
          target="_blank"
        >
          GitHub Discussions
        </a>
      </div>

      {!open ? (
        <div className="mt-3 grid gap-2.5 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
          <button
            className="min-h-11 rounded-[14px] border border-[var(--color-line)] bg-[var(--color-input)] px-4 py-2.5 text-left text-sm text-[var(--color-muted)] transition hover:border-[var(--color-brand)] hover:text-[var(--color-ink)]"
            onClick={handlePlaceholderClick}
            type="button"
          >
            {isConnected
              ? "写站点反馈、试用活动、价格变化或避坑记录..."
              : "登录后发帖..."}
          </button>
          <div className="flex flex-col items-stretch gap-2.5 sm:flex-row sm:flex-wrap sm:items-center sm:justify-end">
            <button
              className="btn-press w-full rounded-full bg-[var(--color-brand)] px-5 py-2.5 text-sm font-bold text-[var(--color-on-brand)] shadow-[0_10px_22px_var(--color-panel-glow)] transition hover:bg-[var(--color-brand-deep)] sm:w-auto"
              onClick={handlePlaceholderClick}
              type="button"
            >
              发布帖子
            </button>
            <span className="text-xs text-[var(--color-muted)]">{status}</span>
          </div>
        </div>
      ) : (
        <div className="mt-4">
          <div className="relative">
            <input
              className="w-full rounded-[12px] border border-[var(--color-line)] bg-[var(--color-input)] px-4 py-3 text-sm outline-none transition focus:border-[var(--color-brand)]"
              onChange={(event) => setStation(event.target.value)}
              placeholder="关联站点或标签"
              value={station}
            />
            {tagSuggestions.length > 0 ? (
              <div className="absolute left-0 right-0 top-full z-20 mt-1 overflow-hidden rounded-[12px] border border-[var(--color-line)] bg-[var(--color-panel)] shadow-[var(--shadow-card)]">
                {tagSuggestions.map((tag) => (
                  <button
                    key={tag}
                    className="block w-full px-4 py-2.5 text-left text-sm font-semibold text-[var(--color-muted)] transition hover:bg-[var(--color-soft)] hover:text-[var(--color-ink)]"
                    onClick={() => handleSelectSuggestion(tag)}
                    type="button"
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            ) : null}
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-[var(--color-muted)]">分类</span>
            {CATEGORIES.map((cat) => {
              const active = selectedCategory.key === cat.key;
              return (
                <button
                  key={cat.key}
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold transition border ${
                    active
                      ? "border-current text-[var(--color-on-brand)] shadow-sm"
                      : "border-[var(--color-line)] bg-[var(--color-panel)] text-[var(--color-muted)] hover:border-[var(--color-brand)] hover:text-[var(--color-ink)]"
                  }`}
                  onClick={() => setSelectedCategory(cat)}
                  style={
                    active
                      ? { backgroundColor: cat.color, borderColor: cat.color }
                      : undefined
                  }
                  type="button"
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          <div className="relative mt-3">
            <textarea
              ref={textareaRef}
              className="min-h-36 w-full resize-none rounded-[12px] border border-[var(--color-line)] bg-[var(--color-input)] px-4 py-3 text-sm leading-7 outline-none transition focus:border-[var(--color-brand)]"
              onChange={(event) => {
                setBody(event.target.value);
                setMentionIndex(0);
              }}
              onKeyDown={handleTextareaKeyDown}
              onPaste={async (e) => {
                const items = e.clipboardData?.items;
                if (!items) return;
                for (const item of items) {
                  if (item.type.startsWith("image/")) {
                    e.preventDefault();
                    const file = item.getAsFile();
                    if (!file) return;
                    if (file.size > 5 * 1024 * 1024) { setStatus("图片不能超过 5MB。"); return; }
                    setUploadingImage(true);
                    setStatus("图片上传中...");
                    try {
                      const url = await uploadForumImage(file);
                      const ta = textareaRef.current;
                      const start = ta?.selectionStart ?? body.length;
                      const before = body.slice(0, start);
                      const after = body.slice(start);
                      setBody((before + `\n![图片](${url})\n` + after).trim());
                      setStatus("图片已插入。");
                    } catch { setStatus("图片上传失败，请稍后重试。"); }
                    finally { setUploadingImage(false); }
                    return;
                  }
                }
              }}
              placeholder="写价格变化、试用活动、模型口径或避坑记录。输入 @ 可以提及其他用户。"
              value={body}
            />

            {/* @mention autocomplete popup */}
            {mentionState.active && mentionSuggestions.length > 0 ? (
              <div className="absolute left-0 right-0 top-full z-20 mt-1 overflow-hidden rounded-[12px] border border-[var(--color-line)] bg-[var(--color-panel)] shadow-[var(--shadow-card)]">
                {mentionSuggestions.map((name, idx) => (
                  <button
                    key={name}
                    className={`block w-full px-4 py-2.5 text-left text-sm font-semibold transition ${
                      idx === mentionIndex
                        ? "bg-[var(--color-brand-soft)] text-[var(--color-brand)]"
                        : "text-[var(--color-muted)] hover:bg-[var(--color-soft)] hover:text-[var(--color-ink)]"
                    }`}
                    onClick={() => handleSelectMention(name)}
                    onMouseEnter={() => setMentionIndex(idx)}
                    type="button"
                  >
                    @{name}
                  </button>
                ))}
              </div>
            ) : null}
          </div>

          <div className="mt-2 flex items-center gap-3">
            <input
              accept={FORUM_IMAGE_ACCEPT}
              className="hidden"
              onChange={async (event) => {
                const file = event.target.files?.[0];
                if (!file) return;
                if (file.size > 5 * 1024 * 1024) { setStatus("图片不能超过 5MB。"); return; }
                setUploadingImage(true);
                setStatus("图片上传中...");
                try {
                  const url = await uploadForumImage(file);
                  setBody((prev) => (prev + `\n![图片](${url})`).trim());
                  setStatus("图片已插入。");
                } catch { setStatus("图片上传失败，请稍后重试。"); }
                finally { setUploadingImage(false); }
                if (fileInputRef.current) fileInputRef.current.value = "";
              }}
              ref={fileInputRef}
              type="file"
            />
            <button
              className="rounded-full border border-[var(--color-line)] bg-[var(--color-panel)] px-3 py-1.5 text-xs font-semibold text-[var(--color-muted)] transition hover:bg-[var(--color-soft)] hover:text-[var(--color-ink)] disabled:opacity-50"
              disabled={uploadingImage}
              onClick={() => fileInputRef.current?.click()}
              type="button"
            >
              {uploadingImage ? "上传中..." : "📷 插图"}
            </button>
            <span className="text-[11px] text-[var(--color-muted)]">支持粘贴图片 (Ctrl+V)</span>
          </div>

          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <button
              className="w-full rounded-full border border-[var(--color-line)] bg-[var(--color-panel)] px-4 py-3 text-sm font-semibold text-[var(--color-muted)] transition hover:bg-[var(--color-soft)] hover:text-[var(--color-ink)] sm:w-auto"
              onClick={() => setOpen(false)}
              type="button"
            >
              先收起
            </button>

            <button
              className="w-full rounded-full bg-[var(--color-brand)] px-5 py-3 text-sm font-bold text-[var(--color-on-brand)] transition hover:bg-[var(--color-brand-deep)] disabled:opacity-60 btn-press sm:w-auto"
              disabled={submitting}
              onClick={handleSubmit}
              type="button"
            >
              {submitting ? "发布中..." : "发布帖子"}
            </button>
          </div>

          <p className="mt-3 text-xs leading-6 text-[var(--color-muted)]">{status}</p>
        </div>
      )}

    </div>
  );
}
