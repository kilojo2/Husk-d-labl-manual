# Sidebar Vertical Spacing Fix

## Problem

Текущий вертикальный отступ между [`Header`](../components/Header.tsx) и левым [`Sidebar`](../components/Sidebar.tsx:74) слишком большой, что создаёт избыточное пространство и нарушает визуальную связность интерфейса.

## Current Implementation

### Header (components/Header.tsx:13)
```tsx
<header className="sticky top-3 z-30 mx-4 flex h-12 items-center gap-4 rounded-2xl apple-glass-strong apple-shadow-md px-4 md:mx-6 md:px-5">
```
- **Position**: `top-3` (12px from viewport top)
- **Height**: `h-12` (48px)
- **Bottom edge**: ~60px from viewport top

### Desktop Sidebar (components/Sidebar.tsx:74)
```tsx
<div className="mt-14 h-[calc(100vh-11rem)] overflow-y-auto rounded-[22px] apple-glass apple-shadow-lg">
```
- **Margin-top**: `mt-14` (56px = 3.5rem)
- **Parent container**: No top padding in [`LayoutWrapper.tsx`](../components/LayoutWrapper.tsx:58-66)

## Issue

The sidebar starts **56px below its parent container**, which is already positioned below the header. This creates approximately **68-76px total vertical gap** between header and sidebar on desktop.

## Solution

Reduce desktop sidebar's `margin-top` from `mt-14` to a smaller value:

### Option 1: Minimal spacing (recommended)
```tsx
<div className="mt-4 h-[calc(100vh-11rem)] overflow-y-auto rounded-[22px] apple-glass apple-shadow-lg">
```
- `mt-4` = 16px spacing
- Total gap: ~28-36px (comfortable, visually connected)

### Option 2: Moderate spacing
```tsx
<div className="mt-6 h-[calc(100vh-11rem)] overflow-y-auto rounded-[22px] apple-glass apple-shadow-lg">
```
- `mt-6` = 24px spacing
- Total gap: ~36-44px (slightly more breathing room)

### Option 3: Tight spacing
```tsx
<div className="mt-2 h-[calc(100vh-11rem)] overflow-y-auto rounded-[22px] apple-glass apple-shadow-lg">
```
- `mt-2` = 8px spacing
- Total gap: ~20-28px (very tight, may feel cramped)

## Recommended Change

**Update [`components/Sidebar.tsx:74`](../components/Sidebar.tsx:74)**

Change:
```diff
- <div className="mt-14 h-[calc(100vh-11rem)] overflow-y-auto rounded-[22px] apple-glass apple-shadow-lg">
+ <div className="mt-4 h-[calc(100vh-11rem)] overflow-y-auto rounded-[22px] apple-glass apple-shadow-lg">
```

This reduces the margin from **56px → 16px**, creating a visually tighter connection between header and sidebar while maintaining sufficient whitespace.

## Visual Comparison

### Before (mt-14)
```
┌─────────────────────────┐
│ Header (sticky top-3)   │  ← 12px from top
└─────────────────────────┘
                             ← 48px header height
          ↓
       ~56px gap            ← EXCESSIVE SPACING
          ↓
┌─────────────────────────┐
│                         │
│ Sidebar starts here     │
│                         │
└─────────────────────────┘
```

### After (mt-4)
```
┌─────────────────────────┐
│ Header (sticky top-3)   │  ← 12px from top
└─────────────────────────┘
                             ← 48px header height
       ~16px gap            ← OPTIMAL SPACING
          ↓
┌─────────────────────────┐
│                         │
│ Sidebar starts here     │
│                         │
└─────────────────────────┘
```

## Testing Checklist

- [ ] Verify sidebar aligns properly on desktop (md+ breakpoint)
- [ ] Check mobile overlay is unaffected (uses `top-[4.25rem]`, separate from desktop)
- [ ] Test scrolling behavior with long navigation
- [ ] Confirm no overlap with sticky header
- [ ] Validate glassmorphism visual hierarchy

## Implementation Steps

1. Switch to Code mode
2. Update [`components/Sidebar.tsx`](../components/Sidebar.tsx:74) line 74
3. Run build to verify no layout breaks
4. Push to GitHub
5. Deploy to Railway
6. Visual QA on live site
