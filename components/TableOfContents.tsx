"use client";

import { useEffect, useState } from "react";

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

  // Build TOC from content headings — scan the contentRef container, or fallback to document
  useEffect(() => {
    const scanHeadings = () => {
      const container = contentRef?.current ?? document;
      const headings = container.querySelectorAll("h2, h3");
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
    };

    // Give the DOM a moment to render before scanning
    const timer = setTimeout(scanHeadings, 100);
    return () => clearTimeout(timer);
  }, [contentRef]);

  // IntersectionObserver for active heading tracking
  useEffect(() => {
    if (toc.length === 0) return;

    const container = contentRef?.current ?? document;

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the first heading that is intersecting
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => {
            const aTop = a.boundingClientRect.top;
            const bTop = b.boundingClientRect.top;
            return aTop - bTop;
          });

        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-80px 0px -80% 0px",
        threshold: 0,
      }
    );

    const observedElements: Element[] = [];
    toc.forEach((item) => {
      const el =
        container.querySelector(`#${CSS.escape(item.id)}`) ??
        document.getElementById(item.id);
      if (el) {
        observer.observe(el);
        observedElements.push(el);
      }
    });

    return () => {
      observedElements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, [toc, contentRef]);

  const handleClick = (id: string) => {
    const container = contentRef?.current ?? document;
    const el =
      container.querySelector(`#${CSS.escape(id)}`) ??
      document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Hide TOC if fewer than 3 headings (user requirement)
  if (toc.length < 3) return null;

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
