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
          group relative flex items-center gap-3 rounded-r-lg px-4 py-3 text-sm transition-all duration-200
          ${depth > 0 ? 'ml-5' : ''}
          ${
            isActive
              ? "border-l-[3px] border-[#4DA6FF] bg-[rgba(77,166,255,0.08)] font-semibold text-text-primary"
              : "border-l-[3px] border-transparent text-text-muted hover:bg-bg-surface-hover hover:text-text-primary hover:translate-x-[3px]"
          }
        `}
        aria-current={isActive ? "page" : undefined}
      >
        <span className={`flex items-center justify-center transition-colors duration-200 ${
          isActive ? "text-[#4DA6FF]" : "text-text-muted group-hover:text-[#4DA6FF]"
        }`}>
          <SFSymbol name={item.icon} size={16} />
        </span>
        <span className="flex-1">{item.title}</span>
        {hasChildren && (
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
        )}
      </Link>

      {hasChildren && (
        <div
          className={`overflow-hidden transition-all duration-300 ease-out ${
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
