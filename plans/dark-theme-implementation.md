# Dark Theme Implementation Plan

## Overview

Add a comprehensive dark theme to the existing Apple-style and Retro themes. The current system has two themes (`apple` and `retro`) that are both light-colored. We need to add a `dark` variant for each, toggled via the existing `ThemeSwitcher` component.

## Architecture

### 1. Theme ID Expansion

**File: `lib/themes.ts`**

Add two new theme IDs:
- `"apple-dark"` — Dark variant of Apple iOS/macOS style
- `"retro-dark"` — Dark variant of Retro 80/90 style

Update `ThemeId` type and `themes` array with new entries. Each gets its own icon and gradient.

### 2. CSS Custom Properties — Dark Theme Blocks

**File: `app/globals.css`**

Add two new `[data-theme="..."]` blocks:

#### `[data-theme="apple-dark"]`
```css
--color-bg-primary: #1C1C1E;        // iOS dark system background
--color-bg-surface: rgba(44,44,46,0.85);  // iOS dark secondary bg
--color-bg-surface-hover: rgba(58,58,60,0.9);
--color-bg-sidebar: rgba(28,28,30,0.85);
--color-accent: #0A84FF;            // iOS dark blue accent
--color-accent-hover: #409CFF;
--color-accent-muted: rgba(10,132,255,0.15);
--color-text-primary: #F5F5F7;      // Light text on dark
--color-text-secondary: #98989D;    // iOS dark secondary label
--color-text-muted: #636366;        // iOS dark tertiary label
--color-border: rgba(255,255,255,0.08);
--color-border-light: rgba(255,255,255,0.04);
--color-success: #30D158;
--color-warning: #FF9F0A;
--color-error: #FF453A;
```

Also override `.apple-glass`, `.apple-glass-strong`, `.apple-card`, `.apple-cell`, `.apple-shadow-*`, `body`, `::selection`, `::-webkit-scrollbar`, and `*:focus-visible` for this theme.

#### `[data-theme="retro-dark"]`
```css
--color-bg-primary: #1A1510;        // Dark sepia/warm
--color-bg-surface: rgba(30,25,18,0.85);
--color-bg-surface-hover: rgba(40,33,24,0.9);
--color-bg-sidebar: rgba(20,16,10,0.85);
--color-accent: #F59E0B;            // Amber
--color-accent-hover: #FBBF24;
--color-accent-muted: rgba(245,158,11,0.15);
--color-text-primary: #F5E6C8;      // Warm light
--color-text-secondary: #A6926E;
--color-text-muted: #7D6B4A;
--color-border: rgba(245,230,200,0.08);
--color-border-light: rgba(245,230,200,0.04);
--color-success: #65A30D;
--color-warning: #D97706;
--color-error: #DC2626;
```

Override `.apple-glass`, `.apple-card`, `.apple-cell`, `body`, `::selection`, scrollbar, and focus-ring for this theme.

### 3. Glassmorphism Overrides for Dark Themes

Each dark theme block must override these utility classes to use dark-appropriate glass:

| Class | apple-dark | retro-dark |
|-------|-----------|------------|
| `.apple-glass` | `rgba(44,44,46,0.65)` bg, `rgba(255,255,255,0.06)` border | `rgba(30,25,18,0.65)` bg, `rgba(245,230,200,0.06)` border |
| `.apple-glass-strong` | `rgba(44,44,46,0.78)` bg | `rgba(30,25,18,0.78)` bg |
| `.apple-card` | `rgba(44,44,46,0.75)` bg, `24px` radius | `rgba(30,25,18,0.75)` bg |
| `.apple-cell` | `rgba(58,58,60,0.5)` bg | `rgba(40,33,24,0.5)` bg |
| `.apple-shadow-*` | Darker shadows (black at 0.2-0.4) | Same approach |

### 4. Body Background Overrides

For `apple-dark`:
```css
background-image:
  radial-gradient(ellipse 100% 50% at 50% 0%, rgba(10,132,255,0.03) 0%, transparent 60%),
  radial-gradient(ellipse 80% 40% at 80% 100%, rgba(10,132,255,0.02) 0%, transparent 50%);
```

For `retro-dark`:
```css
background-image:
  repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(245,230,200,0.015) 2px, rgba(245,230,200,0.015) 4px),
  radial-gradient(ellipse 80% 50% at 50% 0%, rgba(245,158,11,0.03) 0%, transparent 60%);
```

### 5. Cursor Trail Adaptation

**File: `components/CursorTrail.tsx`**

The cursor trail currently uses hardcoded `rgba(0,0,0,0.045)` for the dimple gradient. On dark backgrounds this is invisible. Change to use CSS custom properties or detect the theme:

Option A (recommended): Use CSS `var()` in the inline style:
```ts
el.style.background = `radial-gradient(circle at 50% 50%, var(--cursor-dimple-color, rgba(0,0,0,0.045)) 0%, transparent 70%)`;
```

Then define `--cursor-dimple-color` in each theme:
- apple: `rgba(0,0,0,0.045)`
- apple-dark: `rgba(255,255,255,0.08)`
- retro: `rgba(0,0,0,0.045)`
- retro-dark: `rgba(255,255,255,0.08)`

### 6. BackgroundOrbs Adaptation

**File: `components/BackgroundOrbs.tsx`**

The orb colors are hardcoded to light-theme blues/greens. On dark themes they should be more vibrant. Two approaches:

Option A (recommended): Use CSS custom properties for orb colors. Define `--orb-color-1` through `--orb-color-4` in each theme block, and read them in the component via `getComputedStyle`.

Option B: Add a `data-theme` listener in the component and switch color arrays. Simpler but less elegant.

**Recommended: Option A** — Add to globals.css:
```css
:root, [data-theme="apple"] {
  --orb-1: rgba(0, 122, 255, 0.08);
  --orb-2: rgba(88, 86, 214, 0.06);
  --orb-3: rgba(90, 200, 250, 0.07);
  --orb-4: rgba(52, 199, 89, 0.05);
}
[data-theme="apple-dark"] {
  --orb-1: rgba(10, 132, 255, 0.12);
  --orb-2: rgba(94, 92, 230, 0.10);
  --orb-3: rgba(100, 210, 255, 0.10);
  --orb-4: rgba(48, 209, 88, 0.08);
}
[data-theme="retro"] {
  --orb-1: rgba(217, 119, 6, 0.08);
  --orb-2: rgba(180, 83, 9, 0.06);
  --orb-3: rgba(245, 158, 11, 0.07);
  --orb-4: rgba(101, 163, 13, 0.05);
}
[data-theme="retro-dark"] {
  --orb-1: rgba(245, 158, 11, 0.12);
  --orb-2: rgba(217, 119, 6, 0.10);
  --orb-3: rgba(251, 191, 36, 0.10);
  --orb-4: rgba(101, 163, 13, 0.08);
}
```

Then update `BackgroundOrbs.tsx` to read from CSS variables instead of hardcoded array.

### 7. CookieConsent Adaptation

**File: `components/CookieConsent.tsx`**

Currently uses hardcoded dark colors (`rgba(30,30,32,0.95)` bg). This works on both light and dark themes since it's always dark. However, the "Accept" button uses hardcoded `#007AFF`. Change to use `var(--color-accent)` via inline style or a CSS class.

### 8. ThemeSwitcher Updates

**File: `components/ThemeSwitcher.tsx`**

The tooltip uses hardcoded `bg-white` and `text-[#1D1D1F]`. Change to use theme-aware classes:
- `bg-white` → `bg-bg-surface`
- `text-[#1D1D1F]` → `text-text-primary`
- The tooltip arrow div also needs `bg-white` → `bg-bg-surface`

The menu buttons use `bg-white/90` for inactive state. Change to `bg-bg-surface/90`.

### 9. LayoutWrapper Updates

**File: `components/LayoutWrapper.tsx`**

Update the theme validation in `useEffect` to include the new dark theme IDs:
```ts
if (saved && ["apple", "apple-dark", "retro", "retro-dark"].includes(saved)) {
```

### 10. NavSection Bronze/Silver/Gold Colors

**File: `components/NavSection.tsx`**

The bronze/silver/gold colors are hardcoded hex values. On dark themes they need to be lighter/brightened. Two approaches:

Option A: Use CSS custom properties for nav colors:
```css
[data-theme="apple-dark"] {
  --nav-bronze: #C28B6E;  // lighter bronze
  --nav-silver: #8A9BA8;  // lighter silver
  --nav-gold: #E8B84B;    // lighter gold
}
```

Then update `NavSection.tsx` to use `var(--nav-bronze)` etc. via CSS classes instead of hardcoded hex.

Option B: Keep hardcoded but add `[data-theme="apple-dark"]` overrides in globals.css for `.nav-bronze .nav-header`, `.nav-silver .nav-header`, `.nav-gold .nav-header`.

**Recommended: Option A** — Add CSS variables to each theme block and update the component.

### 11. Smooth Transitions

Add to the `html` element (or `:root`):
```css
html {
  transition: background-color 0.3s ease, color 0.3s ease;
}
```

And to all themed elements via:
```css
*, *::before, *::after {
  transition-property: background-color, border-color, color, box-shadow;
  transition-duration: 0.3s;
  transition-timing-function: ease;
}
```

But be careful — this can cause unwanted transitions on page load. Better approach: add a class `html.transitioning` that gets removed after the first paint, or use a mutation observer. Simplest: add the transition only to specific elements via their CSS classes.

**Recommended:** Add `transition: background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease;` to the `.apple-glass`, `.apple-card`, `.apple-cell`, `body`, and `.nav-header` classes.

### 12. `prefers-color-scheme` Detection

**File: `components/LayoutWrapper.tsx`**

On initial mount, before reading localStorage, check `prefers-color-scheme`:
```ts
useEffect(() => {
  const saved = localStorage.getItem("hl-theme") as ThemeId | null;
  if (saved && ["apple", "apple-dark", "retro", "retro-dark"].includes(saved)) {
    setTheme(saved);
    return;
  }
  // Auto-detect system preference
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  if (prefersDark) {
    setTheme("apple-dark");
  }
}, []);
```

Also listen for changes:
```ts
useEffect(() => {
  const mq = window.matchMedia("(prefers-color-scheme: dark)");
  const handler = (e: MediaQueryListEvent) => {
    // Only auto-switch if user hasn't explicitly saved a preference
    const saved = localStorage.getItem("hl-theme");
    if (!saved) {
      setTheme(e.matches ? "apple-dark" : "apple");
    }
  };
  mq.addEventListener("change", handler);
  return () => mq.removeEventListener("change", handler);
}, []);
```

## Files to Modify

| File | Changes |
|------|---------|
| `lib/themes.ts` | Add `apple-dark` and `retro-dark` theme entries |
| `app/globals.css` | Add 2 new `[data-theme="..."]` blocks with all CSS vars + overrides; add CSS var orbs; add nav color vars; add transitions |
| `components/LayoutWrapper.tsx` | Update theme validation; add `prefers-color-scheme` detection |
| `components/ThemeSwitcher.tsx` | Use theme-aware classes instead of hardcoded white |
| `components/CursorTrail.tsx` | Use `var(--cursor-dimple-color)` for dimple gradient |
| `components/BackgroundOrbs.tsx` | Read orb colors from CSS vars instead of hardcoded array |
| `components/CookieConsent.tsx` | Use `var(--color-accent)` for Accept button |
| `components/NavSection.tsx` | Use CSS var-based nav colors |

## Files NOT Modified

- `components/Header.tsx` — Uses Tailwind classes that reference CSS vars; no changes needed
- `components/Sidebar.tsx` — Uses `.apple-glass` and Tailwind; adapts automatically
- `components/FooterCredit.tsx` — Uses `.apple-glass`; adapts automatically
- `components/SearchBar.tsx` — Uses Tailwind CSS var classes; adapts automatically
- `components/SearchResultsDropdown.tsx` — Uses `bg-bg-surface/90` etc.; adapts automatically
- `components/SearchHighlight.tsx` — Uses `bg-accent/30`; adapts automatically
- `components/VisitTracker.tsx` — Renders nothing; no changes needed
- `components/ArticlePage.tsx` — Uses `.apple-card`; adapts automatically
- `components/MarkdownContent.tsx` — Uses Tailwind CSS var classes; adapts automatically
- `components/NavItem.tsx` — Uses Tailwind; adapts automatically
- `components/TreeNavigation.tsx` — Uses Tailwind; adapts automatically
- `app/admin/page.tsx` — Uses inline styles; no changes needed
- `app/admin/layout.tsx` — Minimal wrapper; no changes needed

## Implementation Order

1. Update `lib/themes.ts` — add 2 new theme entries
2. Update `app/globals.css` — add 2 new theme blocks with all CSS vars, glass overrides, orb vars, nav color vars, transitions
3. Update `components/LayoutWrapper.tsx` — theme validation + prefers-color-scheme
4. Update `components/ThemeSwitcher.tsx` — theme-aware classes
5. Update `components/CursorTrail.tsx` — CSS var for dimple color
6. Update `components/BackgroundOrbs.tsx` — read orb colors from CSS vars
7. Update `components/CookieConsent.tsx` — use `var(--color-accent)`
8. Update `components/NavSection.tsx` — use CSS var-based nav colors
9. Build and verify (30 routes, 0 errors)
10. Push to GitHub
