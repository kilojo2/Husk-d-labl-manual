import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import LayoutWrapper from "@/components/LayoutWrapper";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "KILLASNAZZ Manuals — Справочник оператора",
  description: "База знаний KILLASNAZZ WORKTEAM для операторов вебкам-моделей",
};

// В dev-режиме React требует eval() для отладочных функций (см. ошибку
// "eval() is not supported" — CSP без 'unsafe-eval' ломает dev-оверлей).
// В production политика остаётся строгой.
const isDev = process.env.NODE_ENV === "development";
const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self'",
  "connect-src 'self'",
  "form-action 'self'",
  "base-uri 'self'",
].join("; ");

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      data-theme="apple"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <meta
          httpEquiv="Content-Security-Policy"
          content={contentSecurityPolicy}
        />
        {/* Применяет сохранённую тему до первой отрисовки (без вспышки),
            чтобы сервер и браузер совпадали на момент гидратации.
            Паттерн: next.js guide "preventing-flash-before-hydration" (Themes). */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("hl-theme");if(t!=="apple"&&t!=="apple-dark"&&t!=="retro"&&t!=="retro-dark"){t=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"apple-dark":"apple"}document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`,
          }}
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
