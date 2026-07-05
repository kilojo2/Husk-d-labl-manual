"use client";

import { useState, useRef, useEffect } from "react";

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
        <div className="absolute bottom-full left-0 mb-4 flex flex-col gap-1.5 min-w-[200px]">
          <div className="rounded-2xl border border-border/50 bg-bg-surface/90 px-2 py-2 backdrop-blur-2xl apple-shadow-lg">
            {contacts.map((contact, i) => (
              <a
                key={i}
                href={contact.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors duration-150 hover:bg-accent/10"
                onClick={() => setIsOpen(false)}
              >
                {/* Telegram paper-plane icon */}
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4 shrink-0 text-[#0088CC]"
                  fill="currentColor"
                >
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.127.087.497.087.497l-1.188 5.632s-.173.492-.74.492a.97.97 0 0 1-.57-.172c-.036-.03-3.583-2.309-3.583-2.309l-.236-.152a.526.526 0 0 1-.015-.345l2.43-2.777c.027-.03.056-.044.044-.015-.15.206-2.184 2.515-2.184 2.515s-.19.186-.44.186c-.057 0-.145-.015-.145-.015l-2.614-.875s-.366-.126-.4-.4c-.034-.273.314-.42.314-.42l6.47-2.997s.302-.135.568-.135z" />
                </svg>

                <div className="flex flex-col">
                  <span className="text-text-primary font-medium leading-tight">
                    {contact.role}
                  </span>
                  <span className="text-text-muted text-[11px] leading-tight">
                    {contact.username}
                  </span>
                </div>

                {/* External link arrow */}
                <svg
                  className="ml-auto h-3.5 w-3.5 shrink-0 text-text-muted/60"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            ))}
          </div>

          {/* Arrow pointing down to the button */}
          <div className="ml-6 h-2 w-2 rotate-45 bg-bg-surface/90 border-r border-b border-border/50" />
        </div>
      )}

      {/* Floating Telegram button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0088CC] text-white apple-shadow-md transition-all duration-300 hover:scale-110 hover:shadow-xl active:scale-95"
        aria-label="Telegram контакты"
        aria-expanded={isOpen}
        aria-haspopup="dialog"
      >
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5"
          fill="currentColor"
        >
          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.127.087.497.087.497l-1.188 5.632s-.173.492-.74.492a.97.97 0 0 1-.57-.172c-.036-.03-3.583-2.309-3.583-2.309l-.236-.152a.526.526 0 0 1-.015-.345l2.43-2.777c.027-.03.056-.044.044-.015-.15.206-2.184 2.515-2.184 2.515s-.19.186-.44.186c-.057 0-.145-.015-.145-.015l-2.614-.875s-.366-.126-.4-.4c-.034-.273.314-.42.314-.42l6.47-2.997s.302-.135.568-.135z" />
        </svg>
      </button>
    </div>
  );
}
