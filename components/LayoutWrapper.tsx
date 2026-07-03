"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import FooterCredit from "@/components/FooterCredit";
import CursorTrail from "@/components/CursorTrail";
import BackgroundOrbs from "@/components/BackgroundOrbs";
import { type ThemeId } from "@/lib/themes";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [theme, setTheme] = useState<ThemeId>("default");

  // Load theme from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("hl-theme") as ThemeId | null;
    if (saved && ["default", "galaxy", "apple", "retro"].includes(saved)) {
      setTheme(saved);
    }
  }, []);

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
      <Header onMenuToggle={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      <div className="flex flex-1 px-0 md:px-0">
        <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
        <main
          id="main-content"
          className="flex-1 overflow-y-auto px-4 py-6 md:pl-10 md:pr-6 md:py-10"
        >
          {children}
        </main>
      </div>
      <FooterCredit />
      <ThemeSwitcher currentTheme={theme} onThemeChange={setTheme} />
    </>
  );
}
