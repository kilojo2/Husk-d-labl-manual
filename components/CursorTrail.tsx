"use client";

import { useEffect, useRef, useCallback } from "react";

interface Sparkle {
  el: HTMLDivElement;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
}

const SPAWN_INTERVAL = 28; // ms between spawn batches
const SPARKLES_PER_SPAWN = 2; // particles per batch
const MAX_SPARKLES = 40;
const MIN_LIFE = 350; // ms
const MAX_LIFE = 700; // ms
const MIN_SPEED = 0.4; // px/frame
const MAX_SPEED = 2.2; // px/frame
const MIN_SIZE = 2; // px
const MAX_SIZE = 5; // px

export default function CursorTrail() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sparklesRef = useRef<Sparkle[]>([]);
  const rafRef = useRef<number | null>(null);
  const spawnTimerRef = useRef<number>(0);
  const mouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const hasMouseRef = useRef(false);
  const lastSpawnRef = useRef<number>(0);

  const spawnSparkle = useCallback(() => {
    const container = containerRef.current;
    if (!container || !hasMouseRef.current) return;

    const { x, y } = mouseRef.current;
    const angle = Math.random() * Math.PI * 2;
    const speed = MIN_SPEED + Math.random() * (MAX_SPEED - MIN_SPEED);
    const life = MIN_LIFE + Math.random() * (MAX_LIFE - MIN_LIFE);
    const size = MIN_SIZE + Math.random() * (MAX_SIZE - MIN_SIZE);

    const el = document.createElement("div");
    el.className = "sparkle-particle";
    el.style.cssText = `
      position: fixed;
      pointer-events: none;
      z-index: 9999;
      left: ${x}px;
      top: ${y}px;
      width: ${size}px;
      height: ${size}px;
      border-radius: 50%;
      background: var(--color-accent, #007AFF);
      box-shadow: 0 0 ${size * 2}px var(--color-accent, #007AFF);
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
      will-change: transform, opacity;
    `;

    container.appendChild(el);

    const sparkle: Sparkle = {
      el,
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life,
      maxLife: life,
      size,
    };

    sparklesRef.current.push(sparkle);

    // Cleanup if too many
    while (sparklesRef.current.length > MAX_SPARKLES) {
      const old = sparklesRef.current.shift();
      if (old) {
        old.el.remove();
      }
    }
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let prevTime = performance.now();

    const animate = (now: number) => {
      const dt = now - prevTime;
      prevTime = now;

      // Spawn sparkles
      spawnTimerRef.current += dt;
      while (spawnTimerRef.current >= SPAWN_INTERVAL && hasMouseRef.current) {
        spawnTimerRef.current -= SPAWN_INTERVAL;
        for (let i = 0; i < SPARKLES_PER_SPAWN; i++) {
          spawnSparkle();
        }
      }

      // Update existing sparkles
      const sparkles = sparklesRef.current;
      for (let i = sparkles.length - 1; i >= 0; i--) {
        const s = sparkles[i];
        s.life -= dt;
        s.x += s.vx;
        s.y += s.vy;

        const progress = 1 - Math.max(0, s.life / s.maxLife); // 0→1
        const opacity = 1 - progress; // 1→0
        const scale = 1 + progress * 0.5; // 1→1.5

        s.el.style.left = `${s.x}px`;
        s.el.style.top = `${s.y}px`;
        s.el.style.opacity = String(Math.max(0, opacity));
        s.el.style.transform = `translate(-50%, -50%) scale(${scale})`;

        if (s.life <= 0) {
          s.el.remove();
          sparkles.splice(i, 1);
        }
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      hasMouseRef.current = true;
    };

    const handleMouseLeave = () => {
      hasMouseRef.current = false;
    };

    document.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      for (const s of sparklesRef.current) {
        s.el.remove();
      }
    };
  }, [spawnSparkle]);

  return <div ref={containerRef} className="fixed inset-0 pointer-events-none z-[9999]" />;
}