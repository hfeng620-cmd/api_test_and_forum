"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

const ENABLED_PATHS = new Set(["/", "/stations", "/community", "/guides", "/models"]);

interface Particle {
  x: number;
  y: number;
  ox: number; // random offset X for organic feel
  oy: number; // random offset Y for organic feel
  createdAt: number;
}

type RgbTuple = [number, number, number];

const MAX_PARTICLES = 16;
const PARTICLE_LIFETIME_MS = 800;
const PARTICLE_RADIUS = 3.5;
const PARTICLE_MAX_OPACITY = 0.5;
const MAX_CANVAS_PIXELS = 1_200_000;
const FALLBACK_GLOW_RGB: RgbTuple = [37, 99, 235];
const FALLBACK_SECONDARY_RGB: RgbTuple = [56, 189, 248];

function clampChannel(value: number) {
  return Math.min(Math.max(Math.round(value), 0), 255);
}

function parseRgb(value: string): RgbTuple | null {
  const raw = value.trim();
  if (!raw) return null;

  const hex = raw.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);
  if (hex) {
    const fullHex =
      hex[1].length === 3
        ? hex[1]
            .split("")
            .map((part) => `${part}${part}`)
            .join("")
        : hex[1];

    return [
      Number.parseInt(fullHex.slice(0, 2), 16),
      Number.parseInt(fullHex.slice(2, 4), 16),
      Number.parseInt(fullHex.slice(4, 6), 16),
    ];
  }

  const match = raw.match(/(\d+(?:\.\d+)?)[,\s]+(\d+(?:\.\d+)?)[,\s]+(\d+(?:\.\d+)?)/);
  if (!match) return null;

  return [clampChannel(Number(match[1])), clampChannel(Number(match[2])), clampChannel(Number(match[3]))];
}

/**
 * Reads a CSS custom property from the document root and extracts
 * R, G, B channel values as numbers 0-255.
 */
function getThemeRgb(): { glow: RgbTuple; secondary: RgbTuple } {
  const styles = getComputedStyle(document.documentElement);

  return {
    glow:
      parseRgb(styles.getPropertyValue("--theme-glow-rgb")) ??
      parseRgb(styles.getPropertyValue("--color-brand")) ??
      FALLBACK_GLOW_RGB,
    secondary: parseRgb(styles.getPropertyValue("--theme-secondary-rgb")) ?? FALLBACK_SECONDARY_RGB,
  };
}

export function MouseGlowLayer() {
  const pathname = usePathname();
  const canvasRef = useRef<HTMLCanvasElement>(null);

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
    const hoverPointer = window.matchMedia("(hover: hover)");
    const compactViewport = window.matchMedia("(max-width: 720px)");
    let isDocumentVisible = document.visibilityState === "visible";
    let isActive = false;

    // ── CSS radial-glow (existing behaviour, fully preserved) ──────────
    let glowRafId = 0;
    let currentX = window.innerWidth * 0.62;
    let currentY = 220;
    let targetX = currentX;
    let targetY = currentY;

    function renderGlow() {
      currentX += (targetX - currentX) * 0.12;
      currentY += (targetY - currentY) * 0.12;

      root.style.setProperty("--mouse-x", `${currentX}px`);
      root.style.setProperty("--mouse-y", `${currentY}px`);

      if (Math.abs(targetX - currentX) > 0.4 || Math.abs(targetY - currentY) > 0.4) {
        glowRafId = window.requestAnimationFrame(renderGlow);
      } else {
        glowRafId = 0;
      }
    }

    function queueGlowRender() {
      if (glowRafId === 0) {
        glowRafId = window.requestAnimationFrame(renderGlow);
      }
    }

    root.dataset.mouseGlow = "off";
    root.style.setProperty("--mouse-glow-opacity", "0");
    root.style.setProperty("--mouse-x", `${currentX}px`);
    root.style.setProperty("--mouse-y", `${currentY}px`);

    // ── Canvas particle trail ───────────────────────────────────────────
    const canvas = canvasRef.current;
    if (!canvas) return;

    let particles: Particle[] = [];
    let canvasRafId = 0;
    let ctx: CanvasRenderingContext2D | null = null;
    let glowRgb = FALLBACK_GLOW_RGB;
    let secondaryRgb = FALLBACK_SECONDARY_RGB;

    function clearCanvas() {
      if (!ctx) return;
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    }

    function cancelCanvasLoop() {
      if (canvasRafId !== 0) {
        window.cancelAnimationFrame(canvasRafId);
        canvasRafId = 0;
      }
    }

    function refreshTheme() {
      const theme = getThemeRgb();
      glowRgb = theme.glow;
      secondaryRgb = theme.secondary;
    }

    function initCanvas() {
      if (!canvas) return;
      const maxDprByPixels = Math.sqrt(MAX_CANVAS_PIXELS / Math.max(window.innerWidth * window.innerHeight, 1));
      const dprCap = compactViewport.matches ? 1.1 : 1.45;
      const dpr = Math.max(1, Math.min(window.devicePixelRatio || 1, dprCap, maxDprByPixels));
      canvas.width = Math.round(window.innerWidth * dpr);
      canvas.height = Math.round(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }
      refreshTheme();
    }

    function drawParticles(now: number) {
      const c = canvas;
      if (!ctx || !c) return;
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      // Cull expired particles
      particles = particles.filter((p) => now - p.createdAt < PARTICLE_LIFETIME_MS);

      for (const p of particles) {
        const age = now - p.createdAt;
        const progress = age / PARTICLE_LIFETIME_MS; // 0 → 1
        const alpha = PARTICLE_MAX_OPACITY * (1 - progress);
        const radius = PARTICLE_RADIUS * (1 - progress * 0.5);

        ctx.beginPath();
        ctx.arc(p.x + p.ox, p.y + p.oy, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${glowRgb[0]},${glowRgb[1]},${glowRgb[2]},${alpha})`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(p.x + p.ox * 0.7, p.y + p.oy * 0.7, radius * 0.48, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${secondaryRgb[0]},${secondaryRgb[1]},${secondaryRgb[2]},${alpha * 0.46})`;
        ctx.fill();
      }
    }

    function shouldAnimate() {
      return isActive && particles.length > 0 && isDocumentVisible;
    }

    function runCanvasLoop(now: number) {
      drawParticles(now);
      if (shouldAnimate()) {
        canvasRafId = requestAnimationFrame(runCanvasLoop);
      } else {
        canvasRafId = 0;
      }
    }

    // Throttle particle spawn to ~30 Hz so the trail is sparse and subtle
    let lastSpawnedAt = 0;

    function spawnParticle(clientX: number, clientY: number) {
      const ox = (Math.random() - 0.5) * 6; // ±3 px jitter
      const oy = (Math.random() - 0.5) * 6;
      particles.push({ x: clientX, y: clientY, ox, oy, createdAt: performance.now() });

      // Cap total count
      if (particles.length > MAX_PARTICLES) {
        particles = particles.slice(particles.length - MAX_PARTICLES);
      }
    }

    function shouldUseGlow() {
      return (
        enabled &&
        isDocumentVisible &&
        !reducedMotion.matches &&
        finePointer.matches &&
        hoverPointer.matches &&
        !compactViewport.matches
      );
    }

    function deactivateGlow() {
      isActive = false;
      particles = [];
      root.dataset.mouseGlow = "off";
      root.style.setProperty("--mouse-glow-opacity", "0");
      cancelCanvasLoop();
      clearCanvas();
    }

    function syncActiveState() {
      const nextActive = shouldUseGlow();
      if (!nextActive) {
        deactivateGlow();
        return;
      }

      if (!isActive) {
        isActive = true;
        initCanvas();
      } else {
        refreshTheme();
      }

      root.dataset.mouseGlow = "on";
      root.style.setProperty("--mouse-glow-opacity", "var(--mouse-glow-idle-opacity)");
      queueGlowRender();
    }

    function startCanvasLoopIfNeeded() {
      if (canvasRafId === 0 && shouldAnimate()) {
        canvasRafId = requestAnimationFrame(runCanvasLoop);
      }
    }

    function handlePointerMove(event: PointerEvent) {
      if (!isActive) return;

      // ── CSS glow ──
      root.dataset.mouseGlow = "on";
      root.style.setProperty("--mouse-glow-opacity", "var(--mouse-glow-active-opacity)");
      targetX = event.clientX;
      targetY = event.clientY;
      queueGlowRender();

      // ── Particle trail ──
      const now = performance.now();
      if (now - lastSpawnedAt > 32) {
        spawnParticle(event.clientX, event.clientY);
        startCanvasLoopIfNeeded();
        lastSpawnedAt = now;
      }
    }

    function handlePointerLeave() {
      // CSS glow — drift back to hero position
      root.style.setProperty("--mouse-glow-opacity", isActive ? "var(--mouse-glow-rest-opacity)" : "0");
      targetX = window.innerWidth * 0.62;
      targetY = 220;
      queueGlowRender();

      // Canvas: let trailing particles fade out gracefully; no new spawns
    }

    function handleResize() {
      if (!isActive) {
        syncActiveState();
        return;
      }

      initCanvas();
      clearCanvas();
    }

    function handleVisibilityChange() {
      isDocumentVisible = document.visibilityState === "visible";
      syncActiveState();
    }

    function handleMediaChange() {
      syncActiveState();
    }

    const themeObserver = new MutationObserver(() => {
      refreshTheme();
      if (isActive) {
        clearCanvas();
      }
    });

    syncActiveState();
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave);
    window.addEventListener("resize", handleResize);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    reducedMotion.addEventListener("change", handleMediaChange);
    finePointer.addEventListener("change", handleMediaChange);
    hoverPointer.addEventListener("change", handleMediaChange);
    compactViewport.addEventListener("change", handleMediaChange);
    themeObserver.observe(root, { attributes: true, attributeFilter: ["data-theme", "data-theme-mode"] });

    return () => {
      deactivateGlow();
      themeObserver.disconnect();

      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      reducedMotion.removeEventListener("change", handleMediaChange);
      finePointer.removeEventListener("change", handleMediaChange);
      hoverPointer.removeEventListener("change", handleMediaChange);
      compactViewport.removeEventListener("change", handleMediaChange);

      if (glowRafId !== 0) {
        window.cancelAnimationFrame(glowRafId);
      }
    };
  }, [pathname]);

  return (
    <>
      {/* CSS radial-glow layer (existing) */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0"
        data-selection-comments="off"
      />
      {/* Canvas particle-trail layer */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="mouse-glow-canvas pointer-events-none fixed inset-0"
        style={{ zIndex: 1 }}
      />
    </>
  );
}
