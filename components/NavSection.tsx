"use client";

import { useState, useEffect } from "react";
import type { NavSection as NavSectionType } from "@/lib/navigation";
import NavItem from "./NavItem";
import { Icon } from "./Icon";

interface NavSectionProps {
  section: NavSectionType;
  defaultExpanded?: boolean;
  onNavigate?: () => void;
}

const STORAGE_KEY = "hl-nav-expanded";

function loadExpandedState(sectionTitle: string): boolean {
  if (typeof window === "undefined") return true;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Default to expanded if not explicitly set to false
      return parsed[sectionTitle] !== false;
    }
  } catch {}
  return true;
}

function saveExpandedState(sectionTitle: string, expanded: boolean) {
  if (typeof window === "undefined") return;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    const parsed = stored ? JSON.parse(stored) : {};
    parsed[sectionTitle] = expanded;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
  } catch {}
}

export default function NavSection({
  section,
  defaultExpanded = true,
  onNavigate,
}: NavSectionProps) {
  const [isExpanded, setIsExpanded] = useState(() => {
    return loadExpandedState(section.title);
  });

  // Persist state changes
  useEffect(() => {
    saveExpandedState(section.title, isExpanded);
  }, [section.title, isExpanded]);

  return (
    <div>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex w-full items-center gap-2 px-3 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-text-muted transition-colors hover:text-text-secondary"
        aria-expanded={isExpanded}
      >
        <Icon name={section.icon} size={12} className="shrink-0" />
        <span className="flex-1 text-left">{section.title}</span>
        <svg
          className={`h-3 w-3 transition-transform duration-200 ${
            isExpanded ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
        </svg>
      </button>

      <div
        className={`overflow-hidden transition-all duration-200 ease-out ${
          isExpanded ? "max-h-[1200px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="space-y-0.5 px-2 pb-2">
          {section.items.map((item) => (
            <NavItem key={item.href} item={item} onNavigate={onNavigate} />
          ))}
        </div>
      </div>
    </div>
  );
}
