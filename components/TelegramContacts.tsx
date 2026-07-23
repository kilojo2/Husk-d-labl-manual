"use client";

import { useState, useRef, useEffect } from "react";
import { Icon } from "./Icon";

interface Contact {
  role: string;
  username: string;
  url: string;
}

const contacts: Contact[] = [
  { role: "Тимлид DJIBUR", username: "@sytener1488", url: "https://t.me/sytener1488" },
  { role: "1 коуч", username: "@scallenvoy", url: "https://t.me/scallenvoy" },
  { role: "2 коуч", username: "@tmestalkers", url: "https://t.me/tmestalkers" },
  { role: "3 коуч", username: "@us_karen", url: "https://t.me/us_karen" },
];

export default function TelegramContacts() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close on click outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div ref={menuRef} className="fixed bottom-6 left-6 z-50">
      {/* Popover menu — opens above the button */}
      {isOpen && (
        <div className="absolute bottom-full left-0 mb-4 min-w-[220px]">
          <div className="rounded-lg border border-border bg-sidebar-bg shadow-lg backdrop-blur-xl">
            <div className="px-2 py-2">
              {contacts.map((contact, i) => (
                <a
                  key={i}
                  href={contact.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors duration-150 hover:bg-accent/10"
                  onClick={() => setIsOpen(false)}
                >
                  {/* Telegram icon using Lucide Send */}
                  <span className="shrink-0 text-[#0088CC]">
                    <Icon name="send" size={16} />
                  </span>

                  <div className="flex flex-col">
                    <span className="text-text-primary font-medium leading-tight">
                      {contact.role}
                    </span>
                    <span className="text-text-muted text-[11px] leading-tight">
                      {contact.username}
                    </span>
                  </div>

                  {/* External link arrow */}
                  <span className="ml-auto shrink-0 text-text-muted/60">
                    <Icon name="external-link" size={14} />
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Arrow pointing down to the button */}
          <div className="ml-6 h-2 w-2 rotate-45 bg-sidebar-bg border-r border-b border-border absolute -bottom-1 left-0" />
        </div>
      )}

      {/* Floating Telegram button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0088CC] text-white shadow-md transition-all duration-200 hover:scale-105 hover:shadow-lg active:scale-95"
        aria-label="Telegram контакты"
        aria-expanded={isOpen}
        aria-haspopup="dialog"
      >
        <Icon name="send" size={18} />
      </button>
    </div>
  );
}
