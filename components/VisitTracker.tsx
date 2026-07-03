"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/**
 * VisitTracker — Client component that fires a POST /api/track
 * request whenever the page path changes.
 *
 * Primary: fetch with keepalive
 * Fallback: Image beacon (works when fetch is blocked by Brave/ETP)
 *
 * Renders nothing (returns null).
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

    // Primary: fetch with keepalive
    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(() => {
      // Fallback: Image beacon (works even when fetch is blocked)
      try {
        const img = new Image();
        img.src = `/api/track/beacon?d=${btoa(JSON.stringify(payload))}`;
        img.style.display = "none";
        document.body.appendChild(img);
        setTimeout(() => {
          if (document.body.contains(img)) {
            document.body.removeChild(img);
          }
        }, 1000);
      } catch {
        // Silently fail — tracking should never break the user experience
      }
    });
  }, [pathname]);

  return null;
}
