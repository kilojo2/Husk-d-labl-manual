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

function getSectionStyles(title: string) {
  switch (title) {
    case "Начало работы":
      return {
        bg: "bg-blue-500/10",
        hoverBg: "hover:bg-blue-500/15",
        text: "text-blue-400",
        iconColor: "text-blue-400",
        border: "border-blue-400/20",
      };
    case "Середина работы":
      return {
        bg: "bg-purple-500/10",
        hoverBg: "hover:bg-purple-500/15",
        text: "text-purple-400",
        iconColor: "text-purple-400",
        border: "border-purple-400/20",
      };
    case "Профессиональный режим":
      return {
        bg: "bg-orange-500/10",
        hoverBg: "hover:bg-orange-500/15",
        text: "text-orange-400",
        iconColor: "text-orange-400",
        border: "border-orange-400/20",
      };
    default:
      return {
        bg: "bg-bg-surface-hover",
        hoverBg: "hover:bg-bg-surface-hover",
        text: "text-text-secondary",
        iconColor: "text-text-muted",
        border: "border-border",
      };
  }
}

export default function NavSection({
  section,
  defaultExpanded = true,
  onNavigate,
}: NavSectionProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const styles = getSectionStyles(section.title);

  return (
    <div>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`flex w-full items-center gap-2.5 rounded-xl border px-3 py-2.5 text-xs font-semibold uppercase tracking-widest transition-all duration-200 ${styles.bg} ${styles.hoverBg} ${styles.text} ${styles.border}`}
        aria-expanded={isExpanded}
      >
        <SFSymbol name={section.icon} size={14} className={styles.iconColor} />
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
