"use client";

import { useState, useEffect, Suspense, useCallback } from "react";
import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import FooterCredit from "@/components/FooterCredit";
import CursorTrail from "@/components/CursorTrail";
import BackgroundOrbs from "@/components/BackgroundOrbs";
import VisitTracker from "@/components/VisitTracker";
import CookieConsent from "@/components/CookieConsent";
import SearchHighlight from "@/components/SearchHighlight";
import SearchCommand from "@/components/SearchCommand";
import TelegramContacts from "@/components/TelegramContacts";
import { type ThemeId } from "@/lib/themes";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  // Ctrl+K global search
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  // Initialize theme from localStorage or system preference (avoiding setState in useEffect)
  const [theme, setTheme] = useState<ThemeId>(() => {
    if (typeof window === "undefined") return "apple";
    
    const saved = localStorage.getItem("hl-theme") as ThemeId | null;
    const validThemes: ThemeId[] = ["apple", "apple-dark", "retro", "retro-dark"];
    
    if (saved && validThemes.includes(saved)) {
      return saved;
    }
    
    // No saved preference — check system dark mode
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    return prefersDark ? "apple-dark" : "apple";
  });

  // Persist theme to localStorage and update <html> data-theme attribute
  useEffect(() => {
    localStorage.setItem("hl-theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <>
      <BackgroundOrbs />
      <CursorTrail />
      <VisitTracker />
      <CookieConsent />
      <Suspense fallback={null}>
        <SearchHighlight />
      </Suspense>
      <Header onMenuToggle={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      <div className="flex flex-1 px-0 md:px-0">
        <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
        <main
          id="main-content"
          className={`flex-1 px-4 py-6 md:pl-0 md:pr-6 md:py-10 ${isHome ? "overflow-hidden" : "overflow-y-auto"}`}
        >
          {children}
        </main>
      </div>
      <FooterCredit />
      <TelegramContacts />
      <SearchCommand isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      <ThemeSwitcher currentTheme={theme} onThemeChange={setTheme} />
    </>
  );
}
