"use client";

import { xDiscussionSeed, type XDiscussionPost, type XDiscussionReply } from "@/lib/site-data";

const STORAGE_KEY = "timin-x-discussion-feed";

export type DiscussionPost = XDiscussionPost;
export type DiscussionReply = XDiscussionReply;

function cloneSeed() {
  return xDiscussionSeed.map((post) => ({
    ...post,
    tags: [...post.tags],
    stats: { ...post.stats },
    replies: post.replies ? post.replies.map((reply) => ({ ...reply })) : [],
  }));
}

export function loadDiscussionPosts(): DiscussionPost[] {
  if (typeof window === "undefined") {
    return cloneSeed();
  }

  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      const seeded = cloneSeed();
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded));
      return seeded;
    }

    const parsed = JSON.parse(saved) as DiscussionPost[];
    if (!Array.isArray(parsed) || parsed.length === 0) {
      const seeded = cloneSeed();
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded));
      return seeded;
    }

    return parsed;
  } catch {
    return cloneSeed();
  }
}

export function saveDiscussionPosts(posts: DiscussionPost[]) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
}

export function createDiscussionPost(input: {
  author?: string;
  handle?: string;
  body: string;
  station?: string;
  tags?: string[];
}) {
  const current = loadDiscussionPosts();
  const next: DiscussionPost = {
    id: `${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
    author: input.author?.trim() || "群友补充",
    handle: input.handle?.trim() || "@group_note",
    postedAt: "刚刚",
    body: input.body.trim(),
    station: input.station?.trim() || undefined,
    tags: input.tags?.filter(Boolean).map((tag) => tag.trim()).slice(0, 4) ?? [],
    stats: {
      replies: 0,
      likes: 0,
      bookmarks: 0,
    },
    replies: [],
  };

  const updated = [next, ...current];
  saveDiscussionPosts(updated);
  return updated;
}

export function likeDiscussionPost(id: string) {
  const updated = loadDiscussionPosts().map((post) =>
    post.id === id
      ? {
          ...post,
          stats: {
            ...post.stats,
            likes: post.stats.likes + 1,
          },
        }
      : post,
  );

  saveDiscussionPosts(updated);
  return updated;
}

export function bookmarkDiscussionPost(id: string) {
  const updated = loadDiscussionPosts().map((post) =>
    post.id === id
      ? {
          ...post,
          stats: {
            ...post.stats,
            bookmarks: post.stats.bookmarks + 1,
          },
        }
      : post,
  );

  saveDiscussionPosts(updated);
  return updated;
}

export function replyDiscussionPost(
  id: string,
  input: {
    author?: string;
    handle?: string;
    body: string;
  },
) {
  const reply: DiscussionReply = {
    author: input.author?.trim() || "群友回复",
    handle: input.handle?.trim() || "@relay_reply",
    postedAt: "刚刚",
    body: input.body.trim(),
  };

  const updated = loadDiscussionPosts().map((post) =>
    post.id === id
      ? {
          ...post,
          replies: [...(post.replies ?? []), reply],
          stats: {
            ...post.stats,
            replies: (post.replies?.length ?? 0) + 1,
          },
        }
      : post,
  );

  saveDiscussionPosts(updated);
  return updated;
}
