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

export default function NavSection({
  section,
  defaultExpanded = true,
  onNavigate,
}: NavSectionProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <div>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-xs font-semibold uppercase tracking-widest text-text-muted transition-all duration-200 hover:bg-bg-surface-hover hover:text-text-secondary"
        aria-expanded={isExpanded}
      >
        <SFSymbol name={section.icon} size={14} className="opacity-60" />
        <span className="flex-1 text-left">{section.title}</span>
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

      <div
        className={`overflow-hidden transition-all duration-300 ease-out ${
          isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="mt-1 space-y-0.5 px-1">
          {section.items.map((item) => (
            <NavItem key={item.href} item={item} onNavigate={onNavigate} />
          ))}
        </div>
      </div>
    </div>
  );
}
