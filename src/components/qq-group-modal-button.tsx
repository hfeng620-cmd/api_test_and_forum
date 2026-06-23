"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export function QqGroupModalButton() {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="relative" ref={wrapperRef}>
      <button
        className="inline-flex items-center gap-2 rounded-full border border-[var(--color-line)] bg-white px-3.5 py-2 text-xs font-bold text-[var(--color-brand-deep)] shadow-[0_10px_24px_rgba(15,23,42,0.06)] transition hover:border-[var(--color-brand)] hover:bg-[var(--color-brand-soft)]"
        onClick={() => setOpen((current) => !current)}
        type="button"
      >
        <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[var(--color-brand-soft)] text-[10px] font-black text-[var(--color-brand-deep)]">
          Q
        </span>
        加入QQ群
      </button>

      {open ? (
        <div className="absolute left-0 top-[calc(100%+14px)] z-50 w-[340px] overflow-hidden rounded-[30px] border border-[var(--color-line)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(244,248,255,0.98))] p-5 shadow-[0_24px_80px_rgba(15,23,42,0.14)] backdrop-blur">
          <div className="flex items-start justify-between gap-4 border-b border-[var(--color-line)] pb-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-brand-deep)]">
                加入 QQ 群
              </p>
              <h2 className="mt-2 text-xl font-black tracking-tight">群号 602190132</h2>
              <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">
                扫码直接进群。后面补站点、报价格变化、同步试用线索和拉群友共建，都先从这里进。
              </p>
            </div>
            <button
              className="rounded-full px-2 py-1 text-xs font-semibold text-[var(--color-muted)] transition hover:bg-[var(--color-soft)] hover:text-[var(--color-ink)]"
              onClick={() => setOpen(false)}
              type="button"
            >
              关闭
            </button>
          </div>

          <div className="mt-5 rounded-[24px] bg-[var(--color-soft)] p-4">
            <div className="flex justify-center rounded-[20px] bg-white p-3 shadow-[inset_0_0_0_1px_var(--color-line)]">
              <Image
                src="/qq-group-qrcode.jpg"
                alt="Timin观察站 QQ群二维码"
                width={248}
                height={248}
                className="h-auto w-[248px] rounded-[18px]"
                priority
              />
            </div>
            <div className="mt-4 grid gap-2 text-center">
              <p className="text-sm font-bold text-[var(--color-ink)]">先扫码，再进群一起维护</p>
              <p className="text-xs leading-6 text-[var(--color-muted)]">
                微信里拍一下二维码也能进群。群里负责线索流，站里负责定稿流。
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
