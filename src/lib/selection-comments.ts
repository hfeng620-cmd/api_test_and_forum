"use client";

export type SelectionCommentSide = "left" | "right";

export type SelectionComment = {
  id: string;
  pathname: string;
  quote: string;
  body: string;
  side: SelectionCommentSide;
  anchorTop: number;
  createdAt: string;
};

const STORAGE_KEY = "timin-selection-comments";

export function loadSelectionComments(): SelectionComment[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw) as SelectionComment[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveSelectionComments(comments: SelectionComment[]) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(comments));
}

export function createSelectionComment(
  input: Omit<SelectionComment, "id" | "createdAt">,
) {
  const next: SelectionComment = {
    ...input,
    id: `${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
    createdAt: new Date().toISOString(),
  };

  const current = loadSelectionComments();
  const updated = [...current, next];
  saveSelectionComments(updated);
  return next;
}

export function removeSelectionComment(id: string) {
  const current = loadSelectionComments();
  const updated = current.filter((item) => item.id !== id);
  saveSelectionComments(updated);
  return updated;
}
