"use client";

let lockCount = 0;
let previousBodyOverflow = "";

export function lockBodyScroll() {
  if (typeof document === "undefined") {
    return () => {};
  }

  if (lockCount === 0) {
    previousBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
  }

  lockCount += 1;
  let released = false;

  return () => {
    if (released) return;
    released = true;
    lockCount = Math.max(lockCount - 1, 0);

    if (lockCount === 0) {
      document.body.style.overflow = previousBodyOverflow;
      previousBodyOverflow = "";
    }
  };
}
