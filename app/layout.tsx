import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import LayoutWrapper from "@/components/LayoutWrapper";
import "./globals.css";
import fs from "fs";
import path from "path";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DJIBUR Manuals — Справочник оператора",
  description: "База знаний DJIBUR WORKTEAM для операторов вебкам-моделей",
};

function isMaintenanceMode(): boolean {
  if (process.env.MAINTENANCE_MODE === "true") return true;
  try {
    if (typeof window === "undefined") {
      const flagPath = path.join(process.cwd(), ".maintenance");
      if (fs.existsSync(flagPath)) return true;
    }
  } catch { /* Edge runtime — no fs */ }
  return false;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Dedicated /maintenance page always renders
  // (middleware redirects here when MAINTENANCE_MODE=true)

  if (isMaintenanceMode()) {
    return (
      <html lang="ru" className="h-full antialiased">
        <head>
          <meta httpEquiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'; form-action 'self'; base-uri 'self'" />
        </head>
        <body className="flex min-h-full flex-col" suppressHydrationWarning>
          <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg, #0a0a0f, #1a1a2e, #0a0a0f)", padding: "24px", fontFamily: "system-ui, -apple-system, sans-serif" }}>
            <div style={{ textAlign: "center", maxWidth: "480px" }}>
              <div style={{ fontSize: "clamp(80px, 20vw, 160px)", lineHeight: 1, marginBottom: "24px", filter: "drop-shadow(0 0 40px rgba(99, 102, 241, 0.3))" }}>😔</div>
              <h1 style={{ fontSize: "clamp(24px, 5vw, 36px)", fontWeight: 700, color: "#ffffff", margin: "0 0 12px", letterSpacing: "-0.02em" }}>Технические работы</h1>
              <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.5)", lineHeight: 1.6, margin: "0 0 32px" }}>Сайт временно недоступен. Мы проводим технические работы.<br />Скоро всё заработает.</p>
              <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "rgba(255,255,255,0.3)", margin: "0 auto", animation: "pulse 2s ease-in-out infinite" }} />
              <style>{`@keyframes pulse { 0%, 100% { opacity: 0.3; transform: scale(1); } 50% { opacity: 1; transform: scale(1.5); } }`}</style>
            </div>
          </div>
        </body>
      </html>
    );
  }

  return (
    <html
      lang="ru"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <meta
          httpEquiv="Content-Security-Policy"
          content="default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'; form-action 'self'; base-uri 'self'"
        />
      </head>
      <body
        className="flex min-h-full flex-col"
        suppressHydrationWarning
      >
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}