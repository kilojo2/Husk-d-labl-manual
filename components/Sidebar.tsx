"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import TreeNavigation from "./TreeNavigation";
import SFSymbol from "./SFSymbol";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

function getSectionMeta(title: string): { emoji: string } {
  switch (title) {
    case "Начало работы": return { emoji: "🚀" };
    case "Середина работы": return { emoji: "⚡" };
    case "Профессиональный режим": return { emoji: "🔥" };
    default: return { emoji: "" };
  }
}

interface CollapsedItem {
  href: string;
  icon: string;
  title: string;
  emoji?: string;
  action?: string;
}

const COLLAPSED_ITEMS: CollapsedItem[] = [
  { href: "/", icon: "house.fill", title: "Главная" },
  { href: "/chaturbate-guide", icon: "sparkles", title: "Начало работы", emoji: "🚀" },
  { href: "/broadcasting/first-20-seconds", icon: "antenna.radiowaves.left.and.right", title: "Середина работы", emoji: "⚡" },
  { href: "/situation-handling/objections", icon: "shield", title: "Профессиональный режим", emoji: "🔥" },
  { href: "#search", icon: "magnifyingglass", title: "Поиск", action: "search" },
  { href: "#theme", icon: "gearshape.fill", title: "Настройки", action: "theme" },
];

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [collapsed, setCollapsed] = useState(false);

  // Close sidebar on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent body scroll when mobile sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleNavigate = () => {
    if (window.innerWidth < 768) onClose();
  };

  const handleCollapsedAction = (item: CollapsedItem) => {
    if (item.action === "search") {
      // Dispatch custom event for LayoutWrapper to handle
      window.dispatchEvent(new CustomEvent("open-search"));
    } else if (item.action === "theme") {
      window.dispatchEvent(new CustomEvent("open-theme"));
    }
  };

  return (
    <>
      {/* Mobile overlay backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Mobile sidebar — fixed overlay */}
      <aside
        ref={sidebarRef}
        className={`
          fixed left-4 top-[4.25rem] z-40 h-[calc(100vh-6rem)] w-[280px] shrink-0
          overflow-y-auto rounded-[22px] apple-glass apple-shadow-lg
          md:hidden
          ${isOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"}
          transition-all duration-300 ease-out
        `}
        aria-label="Mobile sidebar navigation"
      >
        <TreeNavigation onNavigate={handleNavigate} />
      </aside>

      {/* Desktop sidebar */}
      <aside
        className={`hidden md:block shrink-0 relative z-10 transition-all duration-200 ease-out ${
          collapsed ? "w-[64px]" : "w-[260px]"
        }`}
        aria-label="Sidebar navigation"
      >
        <div className="ml-4 mt-4 h-[calc(100vh-11rem)] overflow-hidden rounded-2xl border border-border/40 bg-bg-surface/70 backdrop-blur-xl shadow-sm">
          {/* Toggle button */}
          <div className={`flex items-center px-3 pt-3 pb-1 ${collapsed ? "justify-center" : "justify-between"}`}>
            {!collapsed && (
              <span className="text-[10px] font-semibold uppercase tracking-[0.08em] text-text-muted/50 pl-2">
                Навигация
              </span>
            )}
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="p-1.5 rounded-lg text-text-muted/60 hover:text-text-secondary hover:bg-bg-surface-hover transition-colors"
              title={collapsed ? "Развернуть меню" : "Свернуть меню"}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                {collapsed ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                )}
              </svg>
            </button>
          </div>

          {/* ═══ EXPANDED: tree navigation ═══ */}
          {!collapsed && (
            <TreeNavigation onNavigate={handleNavigate} />
          )}

          {/* ═══ COLLAPSED: icon-only quick nav ═══ */}
          {collapsed && (
            <nav className="flex flex-col items-center gap-1 px-2 py-2" aria-label="Collapsed navigation">
              {COLLAPSED_ITEMS.map((item) => (
                <div key={item.title} className="relative group">
                  {item.action ? (
                    <button
                      onClick={() => handleCollapsedAction(item)}
                      className="flex items-center justify-center w-10 h-10 rounded-xl text-text-muted/70 hover:text-accent hover:bg-accent/8 transition-all duration-150"
                      title={item.title}
                    >
                      {item.emoji ? (
                        <span className="text-lg">{item.emoji}</span>
                      ) : (
                        <SFSymbol name={item.icon} size={18} />
                      )}
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      className="flex items-center justify-center w-10 h-10 rounded-xl text-text-muted/70 hover:text-accent hover:bg-accent/8 transition-all duration-150"
                      title={item.title}
                    >
                      {item.emoji ? (
                        <span className="text-lg">{item.emoji}</span>
                      ) : (
                        <SFSymbol name={item.icon} size={18} />
                      )}
                    </Link>
                  )}

                  {/* Tooltip */}
                  <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg bg-bg-surface border border-border/60 shadow-lg
                                  text-xs font-medium text-text-primary whitespace-nowrap
                                  opacity-0 invisible group-hover:opacity-100 group-hover:visible
                                  transition-all duration-150 pointer-events-none z-50">
                    {item.title}
                    <div className="absolute right-full top-1/2 -translate-y-1/2 w-0 h-0
                                    border-r-[6px] border-r-bg-surface border-y-[5px] border-y-transparent" />
                  </div>
                </div>
              ))}
            </nav>
          )}
        </div>
      </aside>
    </>
  );
}