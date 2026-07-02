# Stage 1: Initialization & Architecture

## Overview
Create a Next.js project with TypeScript, Tailwind CSS, dark theme, and the core layout structure (header + sidebar navigation + main content area).

## Tech Stack
- **Framework:** Next.js 14+ (App Router) with TypeScript
- **Styling:** Tailwind CSS with dark theme
- **CMS (later):** Sanity
- **Search (later):** Algolia
- **Hosting:** Vercel

## Architecture Diagram

```mermaid
flowchart TD
    A[Next.js App Router] --> B[Root Layout layout.tsx]
    B --> C[Header Component]
    B --> D[Sidebar Component]
    B --> E[Main Content Area]
    
    C --> C1[Logo / Site Name]
    C --> C2[Search Bar Placeholder]
    
    D --> D1[Tree Navigation]
    D1 --> D2[Mobile: Hamburger Menu]
    D1 --> D3[Desktop: Fixed Sidebar 280px]
    
    E --> F[Dynamic Route: /[slug]/[subslug]]
    F --> G[Static Page Generation]
    
    subgraph "Content Structure"
        H[Section 1: Getting Started]
        H --> H1[dictionary]
        H --> H2[site-rules]
        H --> H3[negotiation-rules]
        
        I[Section 2: Broadcasting]
        I --> I1[first-20-seconds]
        I --> I2[goals]
        I --> I3[roulettes]
        I --> I4[tech-tips]
        
        J[Section 3: Scripts & Dialogues]
        J --> J1[general-script]
        J --> J2[light-step-script]
        J --> J3[sexting-questions]
        J --> J4[phrase-templates]
        
        K[Section 4: Situation Handling]
        K --> K1[objections]
        K --> K2[top-3-grievances]
        K --> K3[private-mistakes]
        
        L[Section 5: General Rules]
        L --> L1[communication-rules]
        L --> L2[post-show-support]
        L --> L3[dont-be-a-bot]
    end
```

## Route Structure

```
/                                    → Redirect to /getting-started/dictionary
/getting-started/dictionary          → Словарь терминов
/getting-started/site-rules          → Правила сайтов
/getting-started/negotiation-rules   → Железные правила переговоров
/broadcasting/first-20-seconds       → Первые 20 секунд
/broadcasting/goals                  → Цели (goals)
/broadcasting/roulettes              → Рулетки
/broadcasting/tech-tips              → Технические фишки
/scripts-and-dialogues/general-script         → Общий скрипт общения
/scripts-and-dialogues/light-step-script      → Лёгкий скрипт по шагам
/scripts-and-dialogues/sexting-questions      → Сексинг-вопросы
/scripts-and-dialogues/phrase-templates       → Заготовки фраз
/situation-handling/objections                → Возражения
/situation-handling/top-3-grievances          → Топ-3 обидки
/situation-handling/private-mistakes          → Ошибки в привате
/general-rules/communication-rules            → Правила общения
/general-rules/post-show-support              → Сопровождение после шоу
/general-rules/dont-be-a-bot                  → Не быть ботом
```

## Component Tree

```
RootLayout (app/layout.tsx)
├── <html data-theme="dark">
│   ├── <body>
│   │   ├── <Header>
│   │   │   ├── Logo / Site Name
│   │   │   ├── Mobile Menu Button (hamburger)
│   │   │   └── SearchBar (placeholder)
│   │   │
│   │   ├── <Sidebar>
│   │   │   ├── <SidebarToggle> (mobile only)
│   │   │   └── <TreeNavigation>
│   │   │       ├── <NavSection title="Начало работы">
│   │   │       │   ├── <NavItem href="/getting-started/dictionary" />
│   │   │       │   ├── <NavItem href="/getting-started/site-rules" />
│   │   │       │   └── <NavItem href="/getting-started/negotiation-rules" />
│   │   │       ├── <NavSection title="Трансляция">
│   │   │       │   └── ...
│   │   │       └── ...
│   │   │
│   │   └── <main> (flex-1, overflow-y-auto)
│   │       └── {children} (page content via App Router)
```

## File Structure to Create

```
anon-chat/
├── app/
│   ├── layout.tsx              # Root layout with header + sidebar + main
│   ├── page.tsx                # Root page (redirect to first article)
│   ├── globals.css             # Global styles with dark theme
│   ├── getting-started/
│   │   ├── dictionary/page.tsx
│   │   ├── site-rules/page.tsx
│   │   └── negotiation-rules/page.tsx
│   ├── broadcasting/
│   │   ├── first-20-seconds/page.tsx
│   │   ├── goals/page.tsx
│   │   ├── roulettes/page.tsx
│   │   └── tech-tips/page.tsx
│   ├── scripts-and-dialogues/
│   │   ├── general-script/page.tsx
│   │   ├── light-step-script/page.tsx
│   │   ├── sexting-questions/page.tsx
│   │   └── phrase-templates/page.tsx
│   ├── situation-handling/
│   │   ├── objections/page.tsx
│   │   ├── top-3-grievances/page.tsx
│   │   └── private-mistakes/page.tsx
│   └── general-rules/
│       ├── communication-rules/page.tsx
│       ├── post-show-support/page.tsx
│       └── dont-be-a-bot/page.tsx
├── components/
│   ├── Header.tsx
│   ├── Sidebar.tsx
│   ├── TreeNavigation.tsx
│   ├── NavSection.tsx
│   ├── NavItem.tsx
│   ├── SearchBar.tsx
│   └── MobileMenu.tsx
├── lib/
│   └── navigation.ts          # Navigation data (sections, items)
├── public/
│   └── (static assets)
├── tailwind.config.ts
├── tsconfig.json
├── next.config.js
└── package.json
```

## Color Palette

| Token | Value | Usage |
|-------|-------|-------|
| `--bg-primary` | `#0B0E14` | Main background |
| `--bg-surface` | `#1A1F2B` | Card/surface background |
| `--accent` | `#7C5CFC` | Accent/purple (links, active states) |
| `--text-primary` | `#E1E4ED` | Primary text |
| `--text-secondary` | `#8B8FA3` | Secondary/muted text |
| `--border` | `#2A2F3A` | Borders and dividers |

## Implementation Steps

### Step 1.1: Initialize Next.js Project
- Run `npx create-next-app@latest` with TypeScript, Tailwind CSS, App Router, no `src/` directory
- Install no additional dependencies yet

### Step 1.2: Configure Dark Theme
- Edit `tailwind.config.ts` to extend colors with the custom palette
- Set `darkMode: 'class'` (or use data-theme attribute)
- Edit `app/globals.css` with CSS custom properties for the dark theme
- Apply `dark` class to `<html>` element in `layout.tsx`

### Step 1.3: Create Layout (layout.tsx)
- Import Header and Sidebar components
- Structure: `<div class="flex h-screen">` with sidebar + main area
- Apply dark background to body

### Step 1.4: Build Navigation Data (lib/navigation.ts)
- Export typed array of sections with their items
- Each item: `{ title: string; href: string; slug: string }`
- Each section: `{ title: string; icon?: string; items: NavItem[] }`

### Step 1.5: Build Navigation Components
- `NavSection`: collapsible section header with title
- `NavItem`: clickable link with active state highlighting
- `TreeNavigation`: renders all sections
- `Sidebar`: wraps TreeNavigation with responsive behavior

### Step 1.6: Build Header Component
- Logo (site name) on the left
- Search bar placeholder in the center/right
- Mobile hamburger button

### Step 1.7: Mobile Responsiveness
- Sidebar hidden by default on mobile (`hidden md:block`)
- Hamburger toggles sidebar visibility via state
- Overlay backdrop on mobile when sidebar is open

### Step 1.8: Create Placeholder Pages
- Each page exports a simple component with the article title
- All pages use `generateStaticParams` for future SSG

## Design Notes
- **Typography:** Large, readable font sizes. Headings use bold weight with accent color.
- **Cards:** Content displayed in "knowledge cards" with `bg-surface` background, rounded corners, subtle border.
- **Copy Button:** Each code/phrase block gets a "Copy" button (to be implemented in later stage).
- **Spacing:** Generous padding and margins for readability.
- **Scrollbar:** Custom styled scrollbar matching dark theme.
