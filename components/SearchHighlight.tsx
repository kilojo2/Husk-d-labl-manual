"use client";

import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";

/**
 * SearchHighlight — reads the `?q=` URL parameter, finds matching text nodes
 * inside the article content area, wraps them in <mark> tags, and scrolls
 * to the first match.
 *
 * Must be rendered inside a Suspense boundary (because it uses useSearchParams).
 */
export default function SearchHighlight() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const appliedRef = useRef(false);

  useEffect(() => {
    if (!query || query.trim().length === 0) {
      appliedRef.current = false;
      return;
    }

    // Prevent re-applying on re-renders
    if (appliedRef.current) return;
    appliedRef.current = true;

    // Small delay to ensure the DOM is fully rendered
    const timer = setTimeout(() => {
      highlightInArticle(query.trim());
    }, 100);

    return () => {
      clearTimeout(timer);
      appliedRef.current = false;
    };
  }, [query]);

  // This component renders nothing
  return null;
}

/**
 * Walk text nodes inside the article content area and wrap matches in <mark>.
 * Then scroll to the first match.
 */
function highlightInArticle(query: string) {
  // Find the article content container
  const article = document.querySelector("article");
  if (!article) return;

  // Find the content card inside the article
  const contentCard = article.querySelector('[class*="apple-card"]');
  if (!contentCard) return;

  const words = query
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));

  if (words.length === 0) return;

  const pattern = new RegExp(words.join("|"), "gi");

  // Walk all text nodes inside the content card
  const textNodes: Text[] = [];
  const walker = document.createTreeWalker(contentCard, NodeFilter.SHOW_TEXT, {
    acceptNode: (node) => {
      // Skip script and style tags
      if (
        node.parentElement &&
        ["SCRIPT", "STYLE", "MARK"].includes(node.parentElement.tagName)
      ) {
        return NodeFilter.FILTER_REJECT;
      }
      return NodeFilter.FILTER_ACCEPT;
    },
  });

  let node: Text | null;
  while ((node = walker.nextNode() as Text | null)) {
    textNodes.push(node);
  }

  if (textNodes.length === 0) return;

  let firstMatch: HTMLElement | null = null;

  for (const textNode of textNodes) {
    const text = textNode.textContent || "";
    if (!pattern.test(text)) continue;

    // Reset lastIndex
    pattern.lastIndex = 0;

    const parent = textNode.parentElement;
    if (!parent) continue;

    // Split the text node into parts around matches and wrap matches in <mark>
    const parts: (string | { match: string })[] = [];
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = pattern.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.slice(lastIndex, match.index));
      }
      parts.push({ match: match[0] });
      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex));
    }

    if (parts.length <= 1) continue;

    // Replace the text node with highlighted fragments
    const fragment = document.createDocumentFragment();
    for (const part of parts) {
      if (typeof part === "string") {
        fragment.appendChild(document.createTextNode(part));
      } else {
        const mark = document.createElement("mark");
        mark.className =
          "rounded-sm bg-accent/30 px-0.5 text-text-primary search-highlight";
        mark.textContent = part.match;
        fragment.appendChild(mark);

        if (!firstMatch) {
          firstMatch = mark;
        }
      }
    }

    parent.replaceChild(fragment, textNode);
  }

  // Scroll to the first match
  if (firstMatch) {
    // Add a small offset for the sticky header
    const headerOffset = 100;
    const top = firstMatch.getBoundingClientRect().top + window.scrollY - headerOffset;

    window.scrollTo({
      top,
      behavior: "smooth",
    });

    // Brief pulse animation on the first match
    firstMatch.classList.add("animate-pulse-once");
  }
}
