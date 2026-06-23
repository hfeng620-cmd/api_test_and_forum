"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const ENABLED_PATHS = new Set(["/", "/stations", "/community", "/guides", "/models"]);

export function MouseGlowLayer() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const enabled = ENABLED_PATHS.has(pathname);

    if (!enabled) {
      root.dataset.mouseGlow = "off";
      root.style.setProperty("--mouse-glow-opacity", "0");
      return;
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(pointer: fine)");

    let rafId = 0;
    let currentX = window.innerWidth * 0.62;
    let currentY = 220;
    let targetX = currentX;
    let targetY = currentY;

    function render() {
      currentX += (targetX - currentX) * 0.12;
      currentY += (targetY - currentY) * 0.12;

      root.style.setProperty("--mouse-x", `${currentX}px`);
      root.style.setProperty("--mouse-y", `${currentY}px`);

      if (Math.abs(targetX - currentX) > 0.4 || Math.abs(targetY - currentY) > 0.4) {
        rafId = window.requestAnimationFrame(render);
      } else {
        rafId = 0;
      }
    }

    function queueRender() {
      if (rafId === 0) {
        rafId = window.requestAnimationFrame(render);
      }
    }

    function handlePointerMove(event: PointerEvent) {
      if (reducedMotion.matches || !finePointer.matches) {
        return;
      }

      root.dataset.mouseGlow = "on";
      root.style.setProperty("--mouse-glow-opacity", "1");
      targetX = event.clientX;
      targetY = event.clientY;
      queueRender();
    }

    function handlePointerLeave() {
      root.style.setProperty("--mouse-glow-opacity", "0.42");
      targetX = window.innerWidth * 0.62;
      targetY = 220;
      queueRender();
    }

    const active = !reducedMotion.matches && finePointer.matches;
    root.dataset.mouseGlow = active ? "on" : "off";
    root.style.setProperty("--mouse-glow-opacity", active ? "0.58" : "0");
    root.style.setProperty("--mouse-x", `${currentX}px`);
    root.style.setProperty("--mouse-y", `${currentY}px`);

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      root.dataset.mouseGlow = "off";
      root.style.setProperty("--mouse-glow-opacity", "0");
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);

      if (rafId !== 0) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, [pathname]);

  return <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0" data-selection-comments="off" />;
}
