"use client";

import { useEffect, useState } from "react";
import SFSymbol from "./SFSymbol";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  contentRef: React.RefObject<HTMLDivElement>;
}

export default function TableOfContents({ contentRef }: TableOfContentsProps) {
  const [toc, setToc] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  // Extract headings from content
  useEffect(() => {
    if (!contentRef.current) return;

    const headings = contentRef.current.querySelectorAll("h2, h3");
    const items: TocItem[] = [];

    headings.forEach((heading, index) => {
      const level = parseInt(heading.tagName[1]);
      const text = heading.textContent || "";
      let id = heading.id;

      // Generate ID if not present
      if (!id) {
        id = `heading-${index}`;
        heading.id = id;
      }

      items.push({ id, text, level });
    });

    setToc(items);
  }, [contentRef]);

  // Highlight active section on scroll
  useEffect(() => {
    if (toc.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0px -35% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    toc.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [toc]);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  if (toc.length === 0) return null;

  return (
    <aside
      className="hidden xl:block xl:w-[240px] xl:shrink-0"
      aria-label="Table of contents"
    >
      <div className="sticky top-24 h-[calc(100vh-11rem)] overflow-y-auto rounded-[22px] apple-glass apple-shadow-lg p-4">
        <div className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-text-muted">
          <SFSymbol name="list.bullet" size={14} />
          <span>Содержание</span>
        </div>

        <nav>
          <ul className="space-y-1">
            {toc.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleClick(item.id)}
                  className={`
                    w-full text-left text-sm transition-all duration-200 rounded-lg px-3 py-1.5
                    ${item.level === 3 ? 'ml-4' : ''}
                    ${
                      activeId === item.id
                        ? 'bg-accent/10 text-accent font-medium'
                        : 'text-text-muted hover:text-text-primary hover:bg-bg-surface-hover'
                    }
                  `}
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
