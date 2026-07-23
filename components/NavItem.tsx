"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavItem as NavItemType } from "@/lib/navigation";
import { Icon } from "./Icon";

interface NavItemProps {
  item: NavItemType;
  onNavigate?: () => void;
  depth?: number;
}

export default function NavItem({ item, onNavigate, depth = 0 }: NavItemProps) {
  const pathname = usePathname();
  const isActive = pathname === item.href;
  const hasChildren = item.children && item.children.length > 0;
  const [isExpanded, setIsExpanded] = useState(true);

  const handleClick = (e: React.MouseEvent) => {
    if (hasChildren) {
      e.preventDefault();
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <div>
      <Link
        href={item.href}
        onClick={(e) => {
          handleClick(e);
          if (!hasChildren && onNavigate) onNavigate();
        }}
        className={`
          group flex items-center gap-2 rounded-md px-3 text-sm transition-all duration-150
          ${depth > 0 ? "ml-6" : ""}
          ${isActive
            ? "bg-accent-subtle text-accent font-medium border-l-2 border-accent -ml-px pl-[11px]"
            : "text-text-muted hover:bg-surface-hover hover:text-text-secondary border-l-2 border-transparent pl-3"
          }
          ${hasChildren ? "" : ""}
          h-8
        `}
        aria-current={isActive ? "page" : undefined}
      >
        <span className="flex items-center justify-center shrink-0">
          <Icon name={item.icon} size={14} />
        </span>
        <span className="flex-1 truncate">{item.title}</span>
        {hasChildren && (
          <svg
            className={`h-3 w-3 shrink-0 transition-transform duration-200 ${
              isExpanded ? "rotate-180" : ""
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
          </svg>
        )}
      </Link>

      {hasChildren && (
        <div
          className={`overflow-hidden transition-all duration-200 ease-out ${
            isExpanded ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="space-y-0.5">
            {item.children!.map((child) => (
              <NavItem key={child.href} item={child} onNavigate={onNavigate} depth={depth + 1} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
