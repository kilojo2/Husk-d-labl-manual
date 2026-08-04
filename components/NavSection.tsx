"use client";

import { useState } from "react";
import type { NavSection as NavSectionType } from "@/lib/navigation";
import NavItem from "./NavItem";

interface NavSectionProps {
  section: NavSectionType;
  defaultExpanded?: boolean;
  onNavigate?: () => void;
}

function getSectionMeta(title: string): { emoji: string; accentClass: string } {
  switch (title) {
    case "Начало работы":
      return { emoji: "🚀", accentClass: "text-accent" };
    case "Середина работы":
      return { emoji: "⚡", accentClass: "text-accent" };
    case "Профессиональный режим":
      return { emoji: "🔥", accentClass: "text-accent" };
    default:
      return { emoji: "", accentClass: "text-text-muted" };
  }
}

export default function NavSection({
  section,
  defaultExpanded = true,
  onNavigate,
}: NavSectionProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const { emoji, accentClass } = getSectionMeta(section.title);

  return (
    <div className="mb-0.5">
      {/* Section header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex w-full items-center gap-2.5 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.06em] text-text-muted/60 hover:text-text-muted transition-colors"
        aria-expanded={isExpanded}
      >
        <span className="text-sm leading-none">{emoji}</span>
        <span className={`flex-1 text-left ${accentClass}`}>{section.title}</span>
        <svg
          className={`h-3 w-3 shrink-0 transition-transform duration-200 ${
            isExpanded ? "rotate-180" : ""
          } text-text-muted/40`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {/* Items */}
      <div
        className={`overflow-hidden transition-all duration-200 ease-out ${
          isExpanded ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="mt-0.5 space-y-0.5">
          {section.items.map((item) => (
            <NavItem key={item.href} item={item} onNavigate={onNavigate} />
          ))}
        </div>
      </div>
    </div>
  );
}