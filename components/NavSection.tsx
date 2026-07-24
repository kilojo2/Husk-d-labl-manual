"use client";

import { useState } from "react";
import type { NavSection as NavSectionType } from "@/lib/navigation";
import NavItem from "./NavItem";
import SFSymbol from "./SFSymbol";

interface NavSectionProps {
  section: NavSectionType;
  defaultExpanded?: boolean;
  onNavigate?: () => void;
}

function getSectionMeta(title: string): { emoji: string; accentClass: string } {
  switch (title) {
    case "Начало работы":
      return { emoji: "🚀", accentClass: "text-[var(--nav-bronze,#965A38)]" };
    case "Середина работы":
      return { emoji: "⚡", accentClass: "text-[var(--nav-silver,#5B6770)]" };
    case "Профессиональный режим":
      return { emoji: "🔥", accentClass: "text-[var(--nav-gold,#B8860B)]" };
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
    <div className="mb-1">
      {/* Section header with emoji, title, chevron */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex w-full items-center gap-2 px-3 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-300"
        aria-expanded={isExpanded}
      >
        <span className="text-sm">{emoji}</span>
        <span className={`flex-1 text-left ${accentClass}`}>{section.title}</span>
        <svg
          className={`h-3.5 w-3.5 transition-transform duration-300 ${
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

      {/* Divider line */}
      {isExpanded && (
        <div className="mx-4 h-px bg-border opacity-50" />
      )}

      {/* Items */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-out ${
          isExpanded ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="mt-1 space-y-0.5">
          {section.items.map((item) => (
            <NavItem key={item.href} item={item} onNavigate={onNavigate} />
          ))}
        </div>
      </div>
    </div>
  );
}
