"use client";

import { useEffect, useRef } from "react";

interface Point {
  x: number;
  y: number;
}

const TRAIL_COUNT = 6;
const LERP_ALPHA = 0.18;
const DIMPLE_SIZE = 32;

export default function CursorTrail() {
  const pointsRef = useRef<Point[]>([]);
  const rafRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<Point>({ x: 0, y: 0 });
  const hasMovedRef = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create dimple elements once
    const elements: HTMLDivElement[] = [];
    for (let i = 0; i < TRAIL_COUNT; i++) {
      const el = document.createElement("div");
      el.className = "cursor-dimple";
      const progress = i / (TRAIL_COUNT - 1);
      const size = DIMPLE_SIZE * (1 - progress * 0.35); // Smoother size decrease
      const baseOpacity = 0.6 - progress * 0.5; // Start at 0.6, end at 0.1
      
      el.style.width = `${size}px`;
      el.style.height = `${size}px`;
      el.style.transition = `opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1), transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)`;
      el.style.opacity = "0";
      el.style.filter = `blur(${2 + progress * 3}px)`; // Progressive blur 2-5px
      el.style.background = `radial-gradient(circle at 50% 50%, var(--cursor-gradient-start, rgba(0, 122, 255, 0.4)) 0%, var(--cursor-gradient-mid, rgba(90, 200, 250, 0.2)) 40%, var(--cursor-gradient-end, rgba(0, 0, 0, 0)) 80%)`;
      el.style.boxShadow = `0 0 ${8 + i * 2}px var(--cursor-glow-color, rgba(0, 122, 255, 0.3))`;
      container.appendChild(el);
      elements.push(el);
    }

    // Initialize points at center
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    pointsRef.current = Array(TRAIL_COUNT).fill(null).map(() => ({ x: cx, y: cy }));

    const animate = () => {
      const points = pointsRef.current;
      const target = targetRef.current;

      if (hasMovedRef.current) {
        // Each point follows the one before it with lerp
        points[0] = {
          x: points[0].x + (target.x - points[0].x) * LERP_ALPHA,
          y: points[0].y + (target.y - points[0].y) * LERP_ALPHA,
        };

        for (let i = 1; i < TRAIL_COUNT; i++) {
          points[i] = {
            x: points[i].x + (points[i - 1].x - points[i].x) * LERP_ALPHA,
            y: points[i].y + (points[i - 1].y - points[i].y) * LERP_ALPHA,
          };
        }

        // Update DOM
        for (let i = 0; i < TRAIL_COUNT; i++) {
          const el = elements[i];
          if (!el) break;
          const p = points[i];
          const progress = i / (TRAIL_COUNT - 1);
          const opacity = 0.6 - progress * 0.5; // 0.6 → 0.1
          const scale = 1 - progress * 0.3; // 1.0 → 0.7
          
          el.style.left = `${p.x}px`;
          el.style.top = `${p.y}px`;
          el.style.transform = `translate(-50%, -50%) scale(${scale})`;
          el.style.opacity = String(opacity);
        }
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
      if (!hasMovedRef.current) {
        hasMovedRef.current = true;
        // Snap first point immediately
        for (let i = 0; i < TRAIL_COUNT; i++) {
          pointsRef.current[i] = { x: e.clientX, y: e.clientY };
        }
      }
    };

    const handleMouseLeave = () => {
      hasMovedRef.current = false;
      for (const el of elements) {
        el.style.opacity = "0";
      }
    };

    const handleMouseEnter = () => {
      hasMovedRef.current = true;
    };

    document.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      for (const el of elements) el.remove();
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 pointer-events-none z-[9999]" />;
}
