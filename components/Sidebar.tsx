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
          className="fixed inset-0 z-20 bg-black/50 md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Mobile sidebar — drawer overlay */}
      <aside
        ref={sidebarRef}
        className={`
          fixed left-0 top-[52px] z-20 h-[calc(100vh-52px)] w-[280px] shrink-0
          overflow-y-auto bg-sidebar-bg border-r border-border
          md:hidden
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          transition-transform duration-300 ease-out
        `}
        aria-label="Mobile sidebar navigation"
      >
        <TreeNavigation onNavigate={handleNavigate} />
      </aside>

      {/* Desktop sidebar — fixed left panel */}
      <aside
        className="hidden md:block w-[240px] shrink-0 border-r border-border bg-sidebar-bg"
        aria-label="Sidebar navigation"
      >
        <div className="h-[calc(100vh-52px)] overflow-y-auto sticky top-[52px]">
          <TreeNavigation onNavigate={handleNavigate} />
        </div>
      </aside>
    </>
  );
}
