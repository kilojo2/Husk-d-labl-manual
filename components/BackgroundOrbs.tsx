"use client";

import { useEffect, useRef } from "react";

/**
 * BackgroundOrbs — renders a set of floating gradient orbs that drift
 * slowly across the background, creating subtle ambient motion.
 *
 * Each orb is a fixed-position div with a radial-gradient, animated
 * via CSS keyframes with randomised duration, delay, and offset to
 * ensure they never move in lockstep.
 */
const ORB_COUNT = 4;

const ORB_COLORS = [
  "rgba(0, 122, 255, 0.08)",
  "rgba(88, 86, 214, 0.06)",
  "rgba(90, 200, 250, 0.07)",
  "rgba(52, 199, 89, 0.05)",
];

export default function BackgroundOrbs() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const orbs = container.querySelectorAll<HTMLDivElement>(".bg-orb");
    orbs.forEach((orb) => {
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
            background: `radial-gradient(circle at 30% 30%, ${ORB_COLORS[i]} 0%, transparent 70%)`,
          }}
        />
      ))}

      {/* Background logo watermark — large, faint, centered */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: "min(80vw, 600px)",
          height: "min(80vw, 600px)",
          opacity: 0.04,
          pointerEvents: "none",
        }}
      >
        <img
          src="/logo-purple.svg"
          alt=""
          className="h-full w-full"
          style={{ filter: "grayscale(1) contrast(0.5)" }}
        />
      </div>
    </div>
  );
}
