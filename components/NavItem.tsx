"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavItem as NavItemType } from "@/lib/navigation";
import SFSymbol from "./SFSymbol";

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
          group relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all duration-150
          ${depth > 0 ? 'ml-4' : ''}
          ${
            isActive
              ? "bg-accent/8 font-medium text-text-primary border-l-[3px] border-accent"
              : "border-l-[3px] border-transparent text-text-muted/80 hover:bg-bg-surface-hover hover:text-text-primary"
          }
        `}
        aria-current={isActive ? "page" : undefined}
      >
        <span className={`flex items-center justify-center transition-colors duration-150 ${
          isActive ? "text-accent" : "text-text-muted/60 group-hover:text-accent"
        }`}>
          <SFSymbol name={item.icon} size={16} />
        </span>
        <span className="flex-1 flex items-center gap-2">
          {item.title}
          {item.isNew && (
            <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-bold leading-none bg-accent/12 text-accent">
              New!
            </span>
          )}
        </span>
        {hasChildren && (
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
        )}
      </Link>

      {hasChildren && (
        <div
          className={`overflow-hidden transition-all duration-200 ease-out ${
            isExpanded ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="mt-0.5 space-y-0.5">
            {item.children!.map((child) => (
              <NavItem key={child.href} item={child} onNavigate={onNavigate} depth={depth + 1} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}