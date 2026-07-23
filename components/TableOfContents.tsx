"use client";

import { useEffect, useState, useRef } from "react";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  contentRef?: React.RefObject<HTMLDivElement | null>;
}

export default function TableOfContents({ contentRef }: TableOfContentsProps) {
  const [toc, setToc] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [isVisible, setIsVisible] = useState(false);

  // Build TOC from content headings
  useEffect(() => {
    const container = contentRef?.current;
    const root = container ?? document;

    const headings = root.querySelectorAll("h2, h3");
    const items: TocItem[] = [];

    headings.forEach((heading, index) => {
      if (!heading.id) {
        heading.id = `heading-${index}`;
      }
      items.push({
        id: heading.id,
        text: heading.textContent ?? "",
        level: heading.tagName === "H2" ? 2 : 3,
      });
    });

    setToc(items);
  }, [contentRef]);

  // IntersectionObserver for active heading tracking
  useEffect(() => {
    if (toc.length === 0) return;

    const container = contentRef?.current;
    const root = container ?? document;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-80px 0px -80% 0px",
        threshold: 0,
      }
    );

    toc.forEach((item) => {
      const el = ('getElementById' in root ? root.getElementById(item.id) : null) ?? document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [toc, contentRef]);

  const handleClick = (id: string) => {
    const container = contentRef?.current;
    const root = container ?? document;
    const el = ('getElementById' in root ? root.getElementById(id) : null) ?? document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Only show on xl screens
  useEffect(() => {
    const check = () => setIsVisible(window.innerWidth >= 1280);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  if (toc.length === 0 || !isVisible) return null;

  return (
    <aside className="hidden xl:block w-[200px] shrink-0" aria-label="Table of contents">
      <div className="sticky top-[80px] h-[calc(100vh-100px)] overflow-y-auto">
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.08em] text-text-muted">
          On this page
        </p>
        <nav>
          <ul className="space-y-1">
            {toc.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleClick(item.id)}
                  className={`block w-full text-left text-sm transition-colors py-0.5 ${
                    item.level === 3 ? "pl-4" : "pl-0"
                  } ${
                    activeId === item.id
                      ? "text-accent font-medium"
                      : "text-text-muted hover:text-text-secondary"
                  }`}
                >
                  {item.text}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
}
