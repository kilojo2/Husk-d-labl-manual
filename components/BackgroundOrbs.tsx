"use client";

import { useEffect, useRef } from "react";

/**
 * BackgroundOrbs — renders a set of floating gradient orbs that drift
 * slowly across the background, creating subtle ambient motion.
 *
 * Each orb is a fixed-position div with a radial-gradient, animated
 * via CSS keyframes with randomised duration, delay, and offset to
 * ensure they never move in lockstep.
 *
 * Orb colors are read from CSS custom properties (--orb-1 through --orb-4)
 * defined per-theme in globals.css, so they adapt automatically to the
 * active theme.
 */
const ORB_COUNT = 4;

function getOrbColor(index: number): string {
  if (typeof document === "undefined") return "rgba(0,122,255,0.08)";
  const val = getComputedStyle(document.documentElement)
    .getPropertyValue(`--orb-${index + 1}`)
    .trim();
  return val || "rgba(0,122,255,0.08)";
}

export default function BackgroundOrbs() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const orbs = container.querySelectorAll<HTMLDivElement>(".bg-orb");
    orbs.forEach((orb, i) => {
      // Randomise starting position so orbs are spread across the viewport
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const size = 300 + Math.random() * 400; // 300–700px
      const duration = 20 + Math.random() * 25; // 20–45s
      const delay = Math.random() * -30; // negative so they start mid-animation

      orb.style.left = `${x}%`;
      orb.style.top = `${y}%`;
      orb.style.width = `${size}px`;
      orb.style.height = `${size}px`;
      orb.style.animationDuration = `${duration}s`;
      orb.style.animationDelay = `${delay}s`;

      // Read color from CSS variable for theme awareness
      const color = getOrbColor(i);
      orb.style.background = `radial-gradient(circle at 30% 30%, ${color} 0%, transparent 70%)`;
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      {Array.from({ length: ORB_COUNT }).map((_, i) => (
        <div
          key={i}
          className="bg-orb"
          style={{
            background: `radial-gradient(circle at 30% 30%, var(--orb-${i + 1}, rgba(0,122,255,0.08)) 0%, transparent 70%)`,
          }}
        />
      ))}
    </div>
  );
}
