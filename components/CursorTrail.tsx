"use client";

import { useEffect, useRef, useCallback } from "react";

interface Dimple {
  x: number;
  y: number;
  age: number;
}

const TRAIL_LENGTH = 6;
const SPACING_MS = 40;
const FADE_DURATION_MS = 600;
const DIMPLE_SIZE = 48;

export default function CursorTrail() {
  const dimplesRef = useRef<Dimple[]>([]);
  const rafRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const updateDimples = useCallback((time: number) => {
    const dimples = dimplesRef.current;
    const container = containerRef.current;
    if (!container) return;

    // Remove old dimples
    const alive = dimples.filter((d) => time - d.age < FADE_DURATION_MS);

    // Update positions and opacities
    const fragment = document.createDocumentFragment();
    const existing = container.querySelectorAll(".cursor-dimple");

    alive.forEach((dimple, i) => {
      const elapsed = time - dimple.age;
      const progress = elapsed / FADE_DURATION_MS;
      const opacity = 1 - progress;
      const scale = 1 - progress * 0.4;

      let el = existing[i] as HTMLElement | undefined;
      if (!el) {
        el = document.createElement("div");
        el.className = "cursor-dimple";
        container.appendChild(el);
      }
      el.style.left = `${dimple.x}px`;
      el.style.top = `${dimple.y}px`;
      el.style.width = `${DIMPLE_SIZE}px`;
      el.style.height = `${DIMPLE_SIZE}px`;
      el.style.opacity = String(opacity);
      el.style.transform = `translate(-50%, -50%) scale(${scale})`;
      el.style.background = `radial-gradient(circle at 50% 50%, rgba(0,0,0,0.04) 0%, rgba(0,0,0,0.02) 30%, transparent 70%)`;
    });

    // Remove excess elements
    for (let i = alive.length; i < existing.length; i++) {
      existing[i]?.remove();
    }

    dimplesRef.current = alive;
    rafRef.current = requestAnimationFrame(updateDimples);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const now = performance.now();
      if (now - lastTimeRef.current < SPACING_MS) return;
      lastTimeRef.current = now;

      dimplesRef.current.push({
        x: e.clientX,
        y: e.clientY,
        age: now,
      });

      // Keep only recent enough
      if (dimplesRef.current.length > TRAIL_LENGTH * 2) {
        dimplesRef.current = dimplesRef.current.slice(-TRAIL_LENGTH);
      }

      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(updateDimples);
      }
    };

    document.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [updateDimples]);

  return <div ref={containerRef} className="fixed inset-0 pointer-events-none z-[9999]" />;
}
