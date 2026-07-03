"use client";

import { useState, useEffect } from "react";

/**
 * CookieConsent — GDPR-compliant consent banner.
 *
 * Displays a bottom-center banner explaining cookie usage.
 * User can Accept or Reject. Choice is persisted in localStorage.
 *
 * The site uses cookies only for:
 * - Visitor identification (hl_visitor cookie)
 * - Security rate limiting (server-side, no cookie)
 * - Analytics (anonymized, no personal data shared)
 */
export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("hl_cookie_consent");
    if (!consent) {
      // Show after a short delay to avoid layout shift
      const timer = setTimeout(() => setVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("hl_cookie_consent", "accepted");
    setVisible(false);
  };

  const reject = () => {
    localStorage.setItem("hl_cookie_consent", "rejected");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 20,
        left: 20,
        right: 20,
        maxWidth: 400,
        margin: "0 auto",
        background: "rgba(30,30,32,0.95)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderRadius: 16,
        padding: 20,
        border: "1px solid rgba(255,255,255,0.1)",
        zIndex: 9999,
        fontSize: 13,
        color: "rgba(255,255,255,0.8)",
        lineHeight: 1.5,
        boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
      }}
    >
      <p style={{ margin: "0 0 12px 0" }}>
        This site uses cookies for security and analytics purposes.
        By continuing, you accept our use of cookies.
      </p>
      <div style={{ display: "flex", gap: 8 }}>
        <button
          onClick={reject}
          style={{
            flex: 1,
            padding: "8px 16px",
            borderRadius: 8,
            border: "1px solid rgba(255,255,255,0.2)",
            background: "transparent",
            color: "rgba(255,255,255,0.6)",
            cursor: "pointer",
            fontSize: 13,
          }}
        >
          Reject
        </button>
        <button
          onClick={accept}
          style={{
            flex: 1,
            padding: "8px 16px",
            borderRadius: 8,
            border: "none",
            background: "#007AFF",
            color: "#fff",
            cursor: "pointer",
            fontSize: 13,
            fontWeight: 600,
          }}
        >
          Accept
        </button>
      </div>
    </div>
  );
}
