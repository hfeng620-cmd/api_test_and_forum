"use client";

import { useEffect, useRef } from "react";

type RelayNode = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  pulse: number;
  depth: number;
};

type AtmosphereParticle = {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  pulse: number;
  depth: number;
};

type RelayNetworkCanvasProps = {
  className?: string;
};

const NODE_COUNT = 22;
const PARTICLE_COUNT = 18;
const BASE_CONNECTION_DISTANCE = 148;

function createNodes(width: number, height: number): RelayNode[] {
  return Array.from({ length: NODE_COUNT }, () => {
    const depth = 0.25 + Math.random() * 0.95;
    const speed = 0.08 + depth * 0.22;

    return {
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * speed,
      vy: (Math.random() - 0.5) * speed * 0.85,
      radius: 1.4 + depth * 2.1,
      pulse: Math.random() * Math.PI * 2,
      depth,
    };
  });
}

function createParticles(width: number, height: number): AtmosphereParticle[] {
  return Array.from({ length: PARTICLE_COUNT }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    radius: 18 + Math.random() * 34,
    alpha: 0.04 + Math.random() * 0.08,
    pulse: Math.random() * Math.PI * 2,
    depth: 0.2 + Math.random() * 0.9,
  }));
}

export function RelayNetworkCanvas({ className }: RelayNetworkCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = canvas?.parentElement;
    if (!canvas || !container) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointer = { x: 0, y: 0, active: false };
    let reduceMotion = mediaQuery.matches;
    let width = 0;
    let height = 0;
    let frameId = 0;
    let isVisible = document.visibilityState === "visible";
    let nodes: RelayNode[] = [];
    let particles: AtmosphereParticle[] = [];

    const resizeCanvas = () => {
      width = Math.max(container.clientWidth, 1);
      height = Math.max(container.clientHeight, 1);

      const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      nodes = createNodes(width, height);
      particles = createParticles(width, height);
      drawFrame(performance.now(), true);
    };

    const drawFrame = (time: number, skipMotion = false) => {
      context.clearRect(0, 0, width, height);

      const centerX = width * 0.5;
      const centerY = height * 0.52;
      const idleTiltX = Math.sin(time * 0.00018) * 0.22;
      const idleTiltY = Math.cos(time * 0.00014) * 0.18;
      const pointerTiltX = pointer.active ? (pointer.x / width - 0.5) * 0.85 : idleTiltX;
      const pointerTiltY = pointer.active ? (pointer.y / height - 0.5) * 0.72 : idleTiltY;
      const tiltX = reduceMotion ? 0 : pointerTiltX;
      const tiltY = reduceMotion ? 0 : pointerTiltY;

      const ambientGlow = context.createRadialGradient(
        width * 0.72,
        height * 0.2,
        0,
        width * 0.72,
        height * 0.2,
        Math.max(width, height) * 0.55,
      );
      ambientGlow.addColorStop(0, "rgba(37, 99, 235, 0.22)");
      ambientGlow.addColorStop(0.4, "rgba(56, 189, 248, 0.10)");
      ambientGlow.addColorStop(1, "rgba(255, 255, 255, 0)");
      context.fillStyle = ambientGlow;
      context.fillRect(0, 0, width, height);

      const horizonGlow = context.createLinearGradient(0, height * 0.18, 0, height);
      horizonGlow.addColorStop(0, "rgba(255, 255, 255, 0)");
      horizonGlow.addColorStop(0.58, "rgba(148, 163, 184, 0.04)");
      horizonGlow.addColorStop(1, "rgba(15, 23, 42, 0.07)");
      context.fillStyle = horizonGlow;
      context.fillRect(0, 0, width, height);

      const pointerGlow = context.createRadialGradient(
        pointer.active ? pointer.x : width * 0.28,
        pointer.active ? pointer.y : height * 0.62,
        0,
        pointer.active ? pointer.x : width * 0.28,
        pointer.active ? pointer.y : height * 0.62,
        Math.min(width, height) * 0.42,
      );
      pointerGlow.addColorStop(0, "rgba(125, 211, 252, 0.16)");
      pointerGlow.addColorStop(1, "rgba(125, 211, 252, 0)");
      context.fillStyle = pointerGlow;
      context.fillRect(0, 0, width, height);

      context.save();
      context.strokeStyle = "rgba(37, 99, 235, 0.08)";
      context.lineWidth = 1;
      context.beginPath();
      context.ellipse(
        centerX + tiltX * 18,
        height * 0.72 + tiltY * 12,
        width * 0.34,
        Math.max(height * 0.08, 24),
        -0.08,
        0,
        Math.PI * 2,
      );
      context.stroke();
      context.strokeStyle = "rgba(125, 211, 252, 0.05)";
      context.beginPath();
      context.ellipse(
        centerX - tiltX * 12,
        height * 0.72 + tiltY * 8,
        width * 0.24,
        Math.max(height * 0.05, 16),
        -0.08,
        0,
        Math.PI * 2,
      );
      context.stroke();
      context.restore();

      if (!reduceMotion && !skipMotion) {
        for (const node of nodes) {
          node.x += node.vx;
          node.y += node.vy;
          node.pulse += 0.012;

          if (node.x <= 0 || node.x >= width) node.vx *= -1;
          if (node.y <= 0 || node.y >= height) node.vy *= -1;

          node.x = Math.min(Math.max(node.x, 0), width);
          node.y = Math.min(Math.max(node.y, 0), height);
        }
      }

      const projectedParticles = particles.map((particle) => {
        const pulse = 0.8 + Math.sin(particle.pulse + time * 0.00025) * 0.2;
        const scale = 0.82 + particle.depth * 0.55;

        return {
          x:
            centerX +
            (particle.x - centerX) * scale +
            tiltX * particle.depth * 18 +
            Math.sin(time * 0.0001 + particle.pulse) * particle.depth * (reduceMotion ? 0 : 4),
          y:
            centerY +
            (particle.y - centerY) * scale * 0.92 +
            tiltY * particle.depth * 14 +
            Math.cos(time * 0.00012 + particle.pulse) * particle.depth * (reduceMotion ? 0 : 3),
          radius: particle.radius * (0.9 + particle.depth * 0.25),
          alpha: particle.alpha * pulse,
        };
      });

      for (const particle of projectedParticles) {
        const haze = context.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          particle.radius,
        );
        haze.addColorStop(0, `rgba(191, 219, 254, ${particle.alpha})`);
        haze.addColorStop(1, "rgba(191, 219, 254, 0)");
        context.fillStyle = haze;
        context.beginPath();
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        context.fill();
      }

      const projectedNodes = nodes.map((node) => {
        const scale = 0.72 + node.depth * 0.62;
        const floatX = Math.sin(time * 0.0002 + node.pulse * 1.1) * node.depth * (reduceMotion ? 0 : 6);
        const floatY = Math.cos(time * 0.00017 + node.pulse * 0.9) * node.depth * (reduceMotion ? 0 : 5);

        return {
          ...node,
          drawX: centerX + (node.x - centerX) * scale + tiltX * (10 + node.depth * 22) + floatX,
          drawY: centerY + (node.y - centerY) * (0.82 + node.depth * 0.48) + tiltY * (8 + node.depth * 18) + floatY,
          drawRadius: node.radius * (0.82 + node.depth * 0.45),
        };
      });

      const connectionDistance = Math.min(BASE_CONNECTION_DISTANCE, width * 0.22);
      for (let index = 0; index < projectedNodes.length; index += 1) {
        const node = projectedNodes[index];

        for (let innerIndex = index + 1; innerIndex < projectedNodes.length; innerIndex += 1) {
          const target = projectedNodes[innerIndex];
          const dx = target.drawX - node.drawX;
          const dy = target.drawY - node.drawY;
          const distance = Math.hypot(dx, dy);
          const depthBoost = 0.84 + (node.depth + target.depth) * 0.22;

          if (distance > connectionDistance * depthBoost) continue;

          const alpha = 1 - distance / (connectionDistance * depthBoost);
          context.strokeStyle = `rgba(59, 130, 246, ${0.06 + alpha * 0.16 + (node.depth + target.depth) * 0.03})`;
          context.lineWidth = 0.5 + (node.depth + target.depth) * 0.22;
          context.beginPath();
          context.moveTo(node.drawX, node.drawY);
          context.lineTo(target.drawX, target.drawY);
          context.stroke();
        }

        if (pointer.active) {
          const dx = pointer.x - node.drawX;
          const dy = pointer.y - node.drawY;
          const pointerDistance = Math.hypot(dx, dy);
          const pointerReach = Math.min(180, width * 0.28);

          if (pointerDistance < pointerReach) {
            const alpha = 1 - pointerDistance / pointerReach;
            context.strokeStyle = `rgba(125, 211, 252, ${0.05 + alpha * 0.16 + node.depth * 0.04})`;
            context.lineWidth = 0.8 + node.depth * 0.25;
            context.beginPath();
            context.moveTo(node.drawX, node.drawY);
            context.lineTo(pointer.x, pointer.y);
            context.stroke();
          }
        }
      }

      for (const node of projectedNodes) {
        const pulse = 0.75 + Math.sin(node.pulse + time * 0.0005) * 0.25;
        context.fillStyle = `rgba(255, 255, 255, ${0.72 + pulse * 0.16})`;
        context.beginPath();
        context.arc(node.drawX, node.drawY, node.drawRadius + pulse * 0.45, 0, Math.PI * 2);
        context.fill();

        context.fillStyle = `rgba(37, 99, 235, ${0.1 + node.depth * 0.08 + pulse * 0.08})`;
        context.beginPath();
        context.arc(node.drawX, node.drawY, node.drawRadius * (2.6 + node.depth * 1.1), 0, Math.PI * 2);
        context.fill();
      }
    };

    const stopAnimation = () => {
      if (frameId) {
        window.cancelAnimationFrame(frameId);
        frameId = 0;
      }
    };

    const animate = (time: number) => {
      frameId = 0;
      drawFrame(time);
      if (!reduceMotion && isVisible) {
        frameId = window.requestAnimationFrame(animate);
      }
    };

    const requestDraw = () => {
      if (reduceMotion) {
        drawFrame(performance.now(), true);
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      const bounds = canvas.getBoundingClientRect();
      pointer.x = event.clientX - bounds.left;
      pointer.y = event.clientY - bounds.top;
      pointer.active =
        pointer.x >= 0 &&
        pointer.x <= bounds.width &&
        pointer.y >= 0 &&
        pointer.y <= bounds.height;
      requestDraw();
    };

    const handlePointerLeave = () => {
      pointer.active = false;
      requestDraw();
    };

    const handleMotionChange = (event: MediaQueryListEvent) => {
      reduceMotion = event.matches;
      stopAnimation();
      drawFrame(performance.now(), true);
      if (!reduceMotion && isVisible) {
        frameId = window.requestAnimationFrame(animate);
      }
    };

    const handleVisibilityChange = () => {
      isVisible = document.visibilityState === "visible";
      if (!isVisible) {
        stopAnimation();
        return;
      }

      drawFrame(performance.now(), true);
      if (!reduceMotion && !frameId) {
        frameId = window.requestAnimationFrame(animate);
      }
    };

    const resizeObserver = new ResizeObserver(() => {
      resizeCanvas();
    });

    resizeCanvas();
    if (!reduceMotion) {
      frameId = window.requestAnimationFrame(animate);
    }

    resizeObserver.observe(container);
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    mediaQuery.addEventListener("change", handleMotionChange);

    return () => {
      stopAnimation();
      resizeObserver.disconnect();
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      mediaQuery.removeEventListener("change", handleMotionChange);
    };
  }, []);

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ""}`}>
      <canvas ref={canvasRef} aria-hidden="true" className="h-full w-full" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.26),transparent_42%)]" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-[linear-gradient(180deg,rgba(244,247,251,0),rgba(244,247,251,0.82))]" />
    </div>
  );
}
