"use client";

import { useState, useEffect, useRef, Suspense } from "react";
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
  const [themeOpen, setThemeOpen] = useState(false);
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

  // Listen for custom events from collapsed sidebar buttons
  useEffect(() => {
    const handleOpenSearch = () => setSearchOpen(true);
    const handleOpenTheme = () => setThemeOpen(true);
    window.addEventListener("open-search", handleOpenSearch);
    window.addEventListener("open-theme", handleOpenTheme);
    return () => {
      window.removeEventListener("open-search", handleOpenSearch);
      window.removeEventListener("open-theme", handleOpenTheme);
    };
  }, []);

  // Детерминированный первый рендер (SSR и гидратация) — предотвращает
  // hydration mismatch. Сохранённая тема применяется до первой отрисовки
  // inline-скриптом в app/layout.tsx, а в состояние React синхронизируется
  // после гидратации (паттерн next.js "preventing-flash-before-hydration").
  const [theme, setTheme] = useState<ThemeId>("apple");

  useEffect(() => {
    let resolved: ThemeId = "apple";
    try {
      const saved = localStorage.getItem("hl-theme") as ThemeId | null;
      const validThemes: ThemeId[] = ["apple", "apple-dark", "retro", "retro-dark"];
      if (saved && validThemes.includes(saved)) {
        resolved = saved;
      } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        resolved = "apple-dark";
      }
    } catch {
      resolved = "apple";
    }
    // Разовая синхронизация с localStorage после гидратации (внешнее
    // хранилище — разрешённый кейс для setState в эффекте); правило
    // отключено точечно, т.к. альтернатива useSyncExternalStore здесь
    // избыточна для значения, читаемого один раз при монтировании.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTheme(resolved);
  }, []);

  // Persist theme to localStorage and update <html> data-theme attribute.
  // Первый запуск после гидратации пропускается: DOM (data-theme) и
  // localStorage уже корректны благодаря inline-скрипту в layout.tsx —
  // запись серверного дефолта в этот момент вызывала бы вспышку светлой темы.
  const skipFirstPersistRef = useRef(true);
  useEffect(() => {
    if (skipFirstPersistRef.current) {
      skipFirstPersistRef.current = false;
      return;
    }
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
      <ThemeSwitcher currentTheme={theme} onThemeChange={setTheme} isOpen={themeOpen} onOpenChange={setThemeOpen} />
    </>
  );
}
