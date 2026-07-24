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
const IDLE_TIMEOUT = 400; // ms — stop spawning if no movement for this duration

export default function CursorTrail() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sparklesRef = useRef<Sparkle[]>([]);
  const rafRef = useRef<number | null>(null);
  const spawnTimerRef = useRef<number>(0);
  const mouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const hasMouseRef = useRef(false);
  const lastMoveRef = useRef<number>(0);
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const spawnSparkle = useCallback(() => {
    const container = containerRef.current;
    if (!container || !hasMouseRef.current) return;

    // Idle check: don't spawn if pointer hasn't moved recently
    if (performance.now() - lastMoveRef.current > IDLE_TIMEOUT) {
      hasMouseRef.current = false;
      return;
    }

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

  const resetIdleTimer = useCallback(() => {
    lastMoveRef.current = performance.now();
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    idleTimerRef.current = setTimeout(() => {
      hasMouseRef.current = false;
    }, IDLE_TIMEOUT);
  }, []);

  const setPointerPosition = useCallback(
    (x: number, y: number) => {
      mouseRef.current = { x, y };
      hasMouseRef.current = true;
      resetIdleTimer();
    },
    [resetIdleTimer]
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let prevTime = performance.now();

    const animate = (now: number) => {
      const dt = now - prevTime;
      prevTime = now;

      // Idle check: stop spawning if pointer hasn't moved
      if (hasMouseRef.current && now - lastMoveRef.current > IDLE_TIMEOUT) {
        hasMouseRef.current = false;
      }

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

    // Mouse events (desktop)
    const handleMouseMove = (e: MouseEvent) => {
      setPointerPosition(e.clientX, e.clientY);
    };

    const handleMouseLeave = () => {
      hasMouseRef.current = false;
    };

    // Touch events (mobile) — FIX: properly handle touch lifecycle
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        setPointerPosition(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const handleTouchEnd = () => {
      hasMouseRef.current = false;
    };

    document.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("touchmove", handleTouchMove, { passive: true });
    document.addEventListener("touchend", handleTouchEnd);

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      for (const s of sparklesRef.current) {
        s.el.remove();
      }
    };
  }, [spawnSparkle, resetIdleTimer, setPointerPosition]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-[9999]"
    />
  );
}