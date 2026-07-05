"use client";

import { useEffect, useRef } from "react";
import TreeNavigation from "./TreeNavigation";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const sidebarRef = useRef<HTMLDivElement>(null);

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
          className="fixed inset-0 z-20 bg-black/20 backdrop-blur-sm md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Mobile sidebar — fixed overlay */}
      <aside
        ref={sidebarRef}
        className={`
          fixed left-4 top-[4.25rem] z-20 h-[calc(100vh-6rem)] w-[280px] shrink-0
          overflow-y-auto rounded-[22px] apple-glass apple-shadow-lg
          md:hidden
          ${isOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"}
          transition-all duration-300 ease-out
        `}
        aria-label="Mobile sidebar navigation"
      >
        <TreeNavigation onNavigate={handleNavigate} />
      </aside>

      {/* Desktop sidebar — static in flex flow */}
      <aside
        className="hidden md:block md:w-[220px] md:ml-6 md:mr-4 md:shrink-0"
        aria-label="Sidebar navigation"
      >
        <div className="mt-2 h-[calc(100vh-6rem)] overflow-y-auto rounded-[22px] apple-glass apple-shadow-lg">
          <TreeNavigation onNavigate={handleNavigate} />
        </div>
      </aside>
    </>
  );
}
