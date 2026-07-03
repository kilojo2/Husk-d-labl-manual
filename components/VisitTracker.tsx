"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/**
 * VisitTracker — Client component that fires a POST /api/track
 * request whenever the page path changes.
 *
 * Renders nothing (returns null). Must be placed inside a Client Component
 * that has access to the router context (e.g., LayoutWrapper).
 */
export default function VisitTracker() {
  const pathname = usePathname();
  const trackedPath = useRef<string | null>(null);

  useEffect(() => {
    // Skip if we've already tracked this path (prevents double-fire in dev)
    if (trackedPath.current === pathname) return;
    trackedPath.current = pathname;

    // Skip admin pages — we don't want to track our own visits
    if (pathname.startsWith("/admin")) return;

    // Gather data
    const payload = {
      pagePath: pathname,
      pageTitle: document.title,
      referrer: document.referrer || "",
      userAgent: navigator.userAgent,
      screenWidth: window.screen.width,
      screenHeight: window.screen.height,
    };

    // Fire and forget — use keepalive for reliability
    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(() => {
      // Silently fail — tracking should never break the user experience
    });
  }, [pathname]);

  return null;
}
