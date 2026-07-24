"use client";

interface SFSymbolProps {
  name: string;
  className?: string;
  size?: number;
}

/**
 * Renders inline SVG icons in Apple SF Symbols style.
 * Monochrome, clean, 24x24 viewBox.
 */
export default function SFSymbol({ name, className = "", size = 20 }: SFSymbolProps) {
  const icon = iconMap[name] ?? iconMap["doc.text"];

  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {icon}
    </svg>
  );
}

const iconMap: Record<string, React.ReactNode> = {
  "house": (
    <>
      <path d="M3 10.5L12 3l9 7.5" />
      <path d="M5 9v9a2 2 0 002 2h10a2 2 0 002-2V9" />
      <path d="M9 21V13h6v8" />
    </>
  ),
  "book.closed": (
    <>
      <path d="M4 4h16v16H4z" />
      <path d="M4 4h16v4H4z" />
      <path d="M12 8v12" />
    </>
  ),
  "doc.text": (
    <>
      <path d="M6 3h8l6 6v12H6z" />
      <path d="M14 3v6h6" />
      <path d="M9 13h6" />
      <path d="M9 17h6" />
    </>
  ),
  "hand.raised": (
    <>
      <path d="M11 3a2 2 0 00-2 2v6l-2-1a2 2 0 00-2.5 3l4.5 5.5A4 4 0 0012 21h4a4 4 0 004-4V9a2 2 0 00-2-2h-1a2 2 0 00-2 2v1" />
      <path d="M11 3v5" />
    </>
  ),
  "antenna.radiowaves.left.and.right": (
    <>
      <path d="M7 5a7 7 0 000 10" />
      <path d="M17 5a7 7 0 010 10" />
      <path d="M10 8a4 4 0 000 6" />
      <path d="M14 8a4 4 0 010 6" />
      <circle cx="12" cy="12" r="1.5" />
    </>
  ),
  "timer": (
    <>
      <circle cx="12" cy="13" r="8" />
      <path d="M12 9v4l2.5 1.5" />
      <path d="M9 2h6" />
      <path d="M12 2v2" />
    </>
  ),
  "target": (
    <>
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </>
  ),
  "dice": (
    <>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <circle cx="8.5" cy="8.5" r="1" />
      <circle cx="15.5" cy="8.5" r="1" />
      <circle cx="8.5" cy="15.5" r="1" />
      <circle cx="15.5" cy="15.5" r="1" />
    </>
  ),
  "wrench": (
    <>
      <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.8-3.8a1 1 0 00-1.4-1.4l-3.8 3.8" />
      <path d="M9.5 14.5L3 21" />
      <path d="M14.7 6.3a5 5 0 00-7.07 7.07l6.36 6.36a5 5 0 007.07-7.07" />
    </>
  ),
  "chart.bar": (
    <>
      <path d="M4 20h16" />
      <path d="M6 16V10" />
      <path d="M10 16V6" />
      <path d="M14 16V8" />
      <path d="M18 16V12" />
    </>
  ),
  "text.bubble": (
    <>
      <path d="M21 12a9 9 0 01-9 9H4l3-3a9 9 0 1114-6z" />
    </>
  ),
  "doc.plaintext": (
    <>
      <path d="M6 3h8l6 6v12H6z" />
      <path d="M14 3v6h6" />
      <path d="M9 13h6" />
      <path d="M9 17h6" />
      <path d="M9 9h1" />
    </>
  ),
  "list.bullet": (
    <>
      <path d="M8 6h13" />
      <path d="M8 12h13" />
      <path d="M8 18h13" />
      <circle cx="3" cy="6" r="0.5" fill="currentColor" />
      <circle cx="3" cy="12" r="0.5" fill="currentColor" />
      <circle cx="3" cy="18" r="0.5" fill="currentColor" />
    </>
  ),
  "heart.text": (
    <>
      <path d="M12 21l-1.5-1.4C5.4 15.4 2 12.3 2 8.5 2 5.4 4.4 3 7.5 3c1.7 0 3.3.8 4.5 2.1A5.5 5.5 0 0116.5 3C19.6 3 22 5.4 22 8.5c0 3.8-3.4 6.9-8.5 11.1L12 21z" />
    </>
  ),
  "quote.bubble": (
    <>
      <path d="M21 12a9 9 0 01-9 9H4l3-3a9 9 0 1114-6z" />
      <path d="M9 10a1 1 0 011-1h1a1 1 0 011 1v2a1 1 0 01-1 1h-1" />
      <path d="M13 10a1 1 0 011-1h1a1 1 0 011 1v2a1 1 0 01-1 1h-1" />
    </>
  ),
  "exclamationmark.triangle": (
    <>
      <path d="M12 3L2 21h20L12 3z" />
      <path d="M12 9v4" />
      <path d="M12 17h0" />
    </>
  ),
  "hand.thumbsdown": (
    <>
      <path d="M10 15v4a3 3 0 003 3l4-9V3H5.72a2 2 0 00-2 1.7l-1.38 9A2 2 0 004.34 16H10z" />
      <path d="M17 3h3a1 1 0 011 1v8a1 1 0 01-1 1h-3" />
    </>
  ),
  "exclamationmark.circle": (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 8v4" />
      <path d="M12 16h0" />
    </>
  ),
  "eye.slash": (
    <>
      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
      <path d="M1 1l22 22" />
      <path d="M9 9a3 3 0 014.24 4.24" />
    </>
  ),
  "shield": (
    <>
      <path d="M12 2l7 3v7a7 7 0 01-7 7 7 7 0 01-7-7V5l7-3z" />
    </>
  ),
  "message": (
    <>
      <path d="M21 12a9 9 0 01-9 9H4l3-3a9 9 0 1114-6z" />
    </>
  ),
  "figure.wave": (
    <>
      <circle cx="12" cy="5" r="2" />
      <path d="M8 21v-5l-2-3 2-4" />
      <path d="M16 21v-5l2-3-2-4" />
      <path d="M12 21v-8l-2-3h4l2 3" />
    </>
  ),
  "robot": (
    <>
      <rect x="5" y="8" width="14" height="12" rx="2" />
      <rect x="8" y="11" width="8" height="6" rx="1" />
      <circle cx="9" cy="14" r="0.5" fill="currentColor" />
      <circle cx="15" cy="14" r="0.5" fill="currentColor" />
      <path d="M12 2v3" />
      <path d="M9 5h6" />
      <path d="M5 8l-2 3" />
      <path d="M19 8l2 3" />
    </>
  ),
  "chevron.down": (
    <path d="M6 9l6 6 6-6" />
  ),
  "magnifyingglass": (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="M16.5 16.5L21 21" />
    </>
  ),
  "gearshape": (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    </>
  ),
  "sparkles": (
    <>
      <path d="M12 2l1.5 4.5L18 8l-4.5 1.5L12 14l-1.5-4.5L6 8l4.5-1.5L12 2z" />
      <path d="M6 16l1 2.5L9.5 19l-2.5 1L6 22l-1-2.5L2.5 19l2.5-1L6 16z" />
      <path d="M16 14l.5 1.5L18 16l-1.5.5L16 18l-.5-1.5L14 16l1.5-.5L16 14z" />
    </>
  ),
  "moon.stars": (
    <>
      <path d="M12 3a9 9 0 109 9 7 7 0 01-9-9z" />
      <path d="M17 3l.5 1.5L19 5l-1.5.5L17 7l-.5-1.5L15 5l1.5-.5L17 3z" />
      <path d="M20 9l.3.7L21 10l-.7.3L20 11l-.3-.7L19 10l.7-.3L20 9z" />
    </>
  ),
  "applelogo": (
    <>
      <path d="M17.05 12.45c0-2.97 1.62-4.45 3.15-5.37-1.17-1.53-2.97-1.73-3.6-1.75-1.5-.15-2.95.88-3.7.88-.77 0-1.93-.86-3.18-.84-1.64.03-3.15.95-3.99 2.42-1.7 2.95-.44 7.32 1.22 9.72.81 1.17 1.78 2.48 3.05 2.43 1.22-.05 1.68-.79 3.16-.79s1.9.79 3.18.76c1.32-.02 2.15-1.19 2.95-2.37.93-1.36 1.31-2.68 1.33-2.75-.03-.01-2.56-1-2.57-3.96z" />
      <path d="M14.25 4.5c.67-.81 1.12-1.94 1-3.06-.96.04-2.13.64-2.82 1.44-.62.72-1.16 1.87-1.01 2.97 1.07.08 2.16-.55 2.83-1.35z" />
    </>
  ),
  "music.note": (
    <>
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </>
  ),
  "chevron.right": (
    <>
      <path d="M9 18l6-6-6-6" />
    </>
  ),
  "key.fill": (
    <>
      <circle cx="6" cy="9" r="3" fill="none" />
      <path d="M8.5 10.5L19 21M15 17h2M17 15v2" />
    </>
  ),
  "building.2": (
    <>
      <rect x="3" y="3" width="7" height="18" />
      <rect x="14" y="8" width="7" height="13" />
      <path d="M6 7h1M6 11h1M6 15h1M17 12h1M17 16h1" />
    </>
  ),
  "envelope.fill": (
    <>
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <path d="M2 7l10 7 10-7" />
    </>
  ),
  "person.crop.circle": (
    <>
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="10" r="3" />
      <path d="M6.5 18.5a6 6 0 0111 0" />
    </>
  ),
  "gearshape.fill": (
    <>
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="3" />
      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    </>
  ),
  "square.stack.3d.up": (
    <>
      <rect x="4" y="10" width="16" height="10" rx="1" />
      <path d="M6 10V8a1 1 0 011-1h10a1 1 0 011 1v2" />
      <path d="M8 7V5a1 1 0 011-1h6a1 1 0 011 1v2" />
    </>
  ),
  "puzzlepiece.extension": (
    <>
      <path d="M3 8h3a2 2 0 012 2v0a2 2 0 002 2h0a2 2 0 002-2v0a2 2 0 012-2h3v5h-3a2 2 0 00-2 2v0a2 2 0 01-2 2h0a2 2 0 01-2-2v0a2 2 0 00-2-2H3V8z" />
      <path d="M8 3v2a2 2 0 01-2 2H3v3h3a2 2 0 002 2h0" />
    </>
  ),
  "desktopcomputer": (
    <>
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8" />
      <path d="M12 17v4" />
    </>
  ),
};
