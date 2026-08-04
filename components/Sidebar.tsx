"use client";

import { useEffect, useRef, useState } from "react";
import TreeNavigation from "./TreeNavigation";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

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
    if (window.innerWidth < 768) {
      onClose();
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
        <TreeNavigation onNavigate={handleNavigate} collapsed={false} />
      </aside>

      {/* Desktop sidebar — compact, collapsible */}
      <aside
        className={`hidden md:block shrink-0 relative z-10 transition-all duration-300 ease-out ${
          collapsed ? "w-[60px]" : "w-[240px]"
        }`}
        aria-label="Sidebar navigation"
      >
        <div className="ml-4 mt-4 h-[calc(100vh-11rem)] overflow-y-auto rounded-[22px] apple-glass apple-shadow-lg">
          <div className="flex items-center justify-between px-3 pt-3 pb-1">
            {!collapsed && (
              <span className="text-[10px] font-semibold uppercase tracking-[0.08em] text-text-muted/60 pl-1">
                Навигация
              </span>
            )}
            <button
              onClick={() => setCollapsed(!collapsed)}
              className={`p-1.5 rounded-lg text-text-muted hover:text-text-secondary hover:bg-bg-surface-hover transition-colors ${
                collapsed ? "mx-auto" : "ml-auto"
              }`}
              title={collapsed ? "Развернуть" : "Свернуть"}
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
          <TreeNavigation onNavigate={handleNavigate} collapsed={collapsed} />
        </div>
      </aside>
    </>
  );
}