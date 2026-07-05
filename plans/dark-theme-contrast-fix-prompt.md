# Prompt: Fix Text Contrast in Dark Themes

## Context

The application has 4 visual themes: `apple` (light), `apple-dark`, `retro` (light), `retro-dark`. The dark themes (`apple-dark` and `retro-dark`) use dark backgrounds (#1C1C1E and #1A1510 respectively) with light text colors. However, some text elements have insufficient contrast against the dark glass surfaces, making them hard to read.

## What Needs to Be Done

Audit and fix text colors across all components to ensure WCAG AA compliance (contrast ratio ≥ 4.5:1 for normal text, ≥ 3:1 for large text) against the dark backgrounds used in `apple-dark` and `retro-dark` themes.

## Files to Modify

### 1. [`app/globals.css`](../app/globals.css)

**Problem**: The CSS variable system is mostly correct, but some hardcoded color values in utility classes and theme overrides may have insufficient contrast.

**What to check and fix**:

- **`[data-theme="apple-dark"]` block (line 260)**:
  - `--color-text-secondary: #98989D` — contrast against `--color-bg-surface: rgba(44,44,46,0.85)` (which sits on `--color-bg-primary: #1C1C1E`). Calculate actual contrast. If < 4.5:1, darken to ~#AEAEB2 or lighten the surface.
  - `--color-text-muted: #636366` — contrast against dark glass surfaces. If < 3:1 for large text or < 4.5:1 for small text, adjust.

- **`[data-theme="retro-dark"]` block (line 424)**:
  - `--color-text-secondary: #A6926E` — contrast against `--color-bg-surface: rgba(30,25,18,0.85)` on `--color-bg-primary: #1A1510`. If < 4.5:1, adjust.
  - `--color-text-muted: #7D6B4A` — same check.

- **`.apple-glass` / `.apple-glass-strong` / `.apple-card` / `.apple-cell` overrides** (lines 296–330, 466–500):
  - The glass backgrounds use `rgba(44,44,46,0.65)` etc. These are translucent and sit on top of `--color-bg-primary`. The effective background color is a blend. Verify that `--color-text-primary` (#F5F5F7 for apple-dark, #F5E6C8 for retro-dark) has sufficient contrast against the blended background.
  - If contrast is insufficient, either:
    - Darken the glass background (increase opacity or use darker RGB values)
    - Lighten the text color
    - Add a subtle text-shadow to improve readability on glass

### 2. [`components/Header.tsx`](../components/Header.tsx)

**Problem**: The header uses `apple-glass-strong` class which becomes a dark translucent panel in dark themes. Text inside may lack contrast.

**What to check and fix**:

- **Line 17**: Menu button uses `text-text-secondary` and `hover:text-text-primary`. In dark themes, `text-text-secondary` (#98989D for apple-dark) on the dark glass header may be too dim. Consider using `text-text-muted` for the idle state and `text-text-primary` for hover.
- **Line 35**: Logo link uses `text-text-primary` — should be fine, but verify against the dark glass header background.
- **Line 40**: "Husk'd Labl Manuals" text — same check.

### 3. [`components/SearchBar.tsx`](../components/SearchBar.tsx)

**Problem**: The search input has placeholder text and icon that may be too dim in dark themes.

**What to check and fix**:

- **Line 122**: Search icon uses `text-text-muted`. In apple-dark, `--color-text-muted: #636366` on the dark glass header may be very hard to see. Consider using `text-text-secondary` instead.
- **Line 134**: Placeholder uses `placeholder-text-muted` — Tailwind maps this to `--color-text-muted`. Same issue. Consider a lighter muted color for dark themes.
- **Line 135**: Input text uses `text-text-primary` — should be fine. Border uses `border-border` — in dark themes `--color-border: rgba(255,255,255,0.08)` may be nearly invisible. Consider increasing opacity to `rgba(255,255,255,0.15)` for dark themes.

### 4. [`components/SearchResultsDropdown.tsx`](../components/SearchResultsDropdown.tsx)

**Problem**: The dropdown appears over dark glass surfaces and some text may be hard to read.

**What to check and fix**:

- **Line 65**: Dropdown container uses `bg-bg-surface/90` — in dark themes this is `rgba(44,44,46,0.85)` at 90% opacity. Text contrast should be verified.
- **Line 74–78**: "Ничего не найдено" text uses `text-text-muted` — may be too dim on dark surface.
- **Line 100**: Result title uses `text-text-primary` — should be fine.
- **Line 105**: Snippet uses `text-text-muted` — may be too dim.
- **Line 111**: Arrow icon uses `text-text-muted/40` — at 40% opacity this will be nearly invisible in dark themes. Consider `text-text-muted/60` or `text-text-secondary/30`.
- **Line 122**: Footer hint uses `text-text-muted/40` — same issue.

### 5. [`components/SearchHighlight.tsx`](../components/SearchHighlight.tsx)

**Problem**: The `<mark>` highlight style may not be visible enough in dark themes.

**What to check and fix**:

- **Line 127**: Highlight uses `bg-accent/30` and `text-text-primary`. In apple-dark, `--color-accent: #0A84FF` at 30% opacity on dark background may not provide enough contrast for the highlighted text. Consider:
  - Increasing opacity to `bg-accent/40` or `bg-accent/50`
  - Adding a subtle border or underline to the highlight
  - Using a different highlight color for dark themes (e.g., a warm yellow tone)

### 6. [`components/NavItem.tsx`](../components/NavItem.tsx)

**Problem**: Inactive nav items may be hard to read against the dark sidebar.

**What to check and fix**:

- **Line 26**: Inactive items use `text-text-secondary` with `hover:text-text-primary`. In apple-dark sidebar (`--color-bg-sidebar: rgba(28,28,30,0.85)`), `--color-text-secondary: #98989D` may have low contrast. Consider:
  - Using a lighter secondary color for dark themes (e.g., `#AEAEB2`)
  - Or adding a hover state that's more distinct
- **Line 31**: Icon uses `text-text-muted` — in dark themes `#636366` on dark sidebar may be nearly invisible. Consider `text-text-secondary` for icons in dark themes.

### 7. [`components/NavSection.tsx`](../components/NavSection.tsx)

**Problem**: Section header colors (bronze/silver/gold) may not contrast well against dark sidebar backgrounds.

**What to check and fix**:

- **Lines 27–38**: `getIconColor()` returns `var(--nav-bronze)` etc. In dark themes, these are `#C28B6E` (bronze), `#8A9BA8` (silver), `#E8B84B` (gold). Verify contrast against the dark sidebar background.
  - Silver (`#8A9BA8`) on dark sidebar may be particularly low contrast.
  - Consider lightening the dark-theme nav colors if needed.

### 8. [`components/FooterCredit.tsx`](../components/FooterCredit.tsx)

**Problem**: The footer credit text may be hard to read in dark themes.

**What to check and fix**:

- **Line 13**: Text uses `text-text-secondary/70` — at 70% opacity of `--color-text-secondary`, this may be too dim on the dark glass background. Consider `text-text-secondary/90` or `text-text-primary/60` for dark themes.

### 9. [`components/MarkdownContent.tsx`](../components/MarkdownContent.tsx)

**Problem**: Content text colors are mostly using CSS variables correctly, but some elements may need adjustment.

**What to check and fix**:

- **Line 62**: Bullet points use `bg-accent/60` — in dark themes, verify this provides enough contrast against the dark card background.
- **Line 74**: Ordered list number circles use `bg-accent/10` with `text-accent` — verify contrast.
- **Line 92**: Note block uses `border-accent/15` and `bg-accent/5` — in dark themes, these subtle accents may be invisible. Consider increasing to `border-accent/25` and `bg-accent/10` for dark themes.

### 10. [`components/ArticlePage.tsx`](../components/ArticlePage.tsx)

**Problem**: The article card uses `apple-card` class which becomes dark glass in dark themes. Text contrast should be verified.

**What to check and fix**:

- **Line 12**: Title uses `text-text-primary` — should be fine.
- **Line 16**: Description uses `text-text-secondary` — verify contrast on dark card.
- **Line 27**: Empty state icon uses `text-text-muted` — may be too dim.

### 11. [`components/CookieConsent.tsx`](../components/CookieConsent.tsx)

**Problem**: The consent banner uses inline styles with CSS variables now, but some values may need adjustment.

**What to check and fix**:

- The banner background uses `var(--color-surface)` — in dark themes this is `rgba(44,44,46,0.85)`. Text uses `var(--color-text-secondary)`. Verify contrast.
- The "Reject" button border uses `var(--color-border)` — in dark themes this is `rgba(255,255,255,0.08)` which may be nearly invisible. Consider a more visible border.

### 12. [`components/ThemeSwitcher.tsx`](../components/ThemeSwitcher.tsx)

**Problem**: The tooltip and menu items may not adapt well to dark themes.

**What to check and fix**:

- **Line 36**: Tooltip uses hardcoded `bg-white` and `text-[#1D1D1F]` — these will be wrong in dark themes. Change to use CSS variables: `bg-[var(--color-surface)]` and `text-[var(--color-text-primary)]`.
- **Line 38**: Tooltip arrow uses hardcoded `bg-white` — same fix.
- **Line 68–72**: Menu item backgrounds use `bg-white/90` and `bg-accent` — the inactive state `bg-white/90` will be wrong in dark themes. It's already using `var(--color-surface)` from the previous update, but verify the contrast.

## How to Test

1. Switch to each dark theme (`apple-dark`, `retro-dark`) via the floating theme switcher
2. Visually inspect every component for readability
3. For precise measurements, use browser DevTools:
   - Inspect the element
   - Check the "Computed" tab for the actual rendered color
   - Use the color picker to see the effective background color (accounting for glass blur/opacity)
   - Calculate contrast ratio using a tool like WebAIM Contrast Checker
4. Target WCAG AA:
   - Normal text (< 18px or < 14px bold): contrast ≥ 4.5:1
   - Large text (≥ 18px or ≥ 14px bold): contrast ≥ 3:1
   - UI components and icons: contrast ≥ 3:1

## Implementation Approach

1. First, fix the CSS variable values in [`app/globals.css`](../app/globals.css) for `--color-text-secondary` and `--color-text-muted` in both dark themes if needed
2. Then, fix any hardcoded color values in individual components
3. For glass elements, consider adding `text-shadow` or increasing background opacity to improve effective contrast
4. For the search dropdown and other overlay elements, ensure sufficient contrast against whatever background they appear on
5. Build and verify (30 routes, 0 errors)
6. Push to GitHub
