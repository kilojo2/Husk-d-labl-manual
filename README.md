# Husk'd Labl Manuals

**База знаний для операторов вебкам-моделей** — справочный сайт с документацией, гайдами, скриптами и правилами работы.

## 🚀 Tech Stack

| Technology | Purpose |
|---|---|
| **Next.js 16.2.10** (App Router) | React framework with static generation (SSG) |
| **React 19.2.4** | UI library |
| **TypeScript 5** | Type safety |
| **Tailwind CSS v4** | Utility-first styling with dark theme |
| **sql.js** | Pure JavaScript SQLite for visit tracking |
| **Vercel / Railway** | Deployment platform |

## 📁 Project Structure

```
├── app/                          # Next.js App Router pages
│   ├── admin/                    # Admin dashboard (token-protected)
│   │   ├── layout.tsx            # Standalone admin layout
│   │   └── page.tsx              # Stats, visits, security dashboard
│   ├── api/
│   │   ├── honeypot/route.ts     # Bot detection honeypot endpoint
│   │   ├── privacy/route.ts      # GDPR data access/deletion
│   │   ├── stats/
│   │   │   ├── route.ts          # Aggregated stats (token-protected)
│   │   │   └── decrypt/route.ts  # IP decryption endpoint
│   │   └── track/
│   │       ├── route.ts          # Visit recording endpoint
│   │       └── beacon/route.ts   # Image beacon fallback (Brave/ETP)
│   ├── broadcasting/             # Broadcasting section (5 articles)
│   ├── general-rules/            # General rules section (3 articles)
│   ├── getting-started/          # Getting started section (3 articles)
│   ├── obs-guide/                # OBS setup guide page
│   ├── scripts-and-dialogues/    # Scripts section (4 articles)
│   ├── situation-handling/       # Situation handling section (3 articles)
│   ├── globals.css               # Global styles + 4 themes
│   ├── layout.tsx                # Root layout with CSP
│   └── page.tsx                  # Homepage (redirects to OBS Guide)
├── components/                   # React components
│   ├── ArticlePage.tsx           # Article layout wrapper
│   ├── BackgroundOrbs.tsx        # Animated background orbs
│   ├── CookieConsent.tsx         # GDPR consent banner
│   ├── CursorTrail.tsx           # Mouse cursor trail effect
│   ├── FooterCredit.tsx          # "Husk'd Labl Manuals by DJIBUR WORKTEAM"
│   ├── Header.tsx                # Sticky header with logo, search, menu
│   ├── LayoutWrapper.tsx         # Client layout with theme/sidebar state
│   ├── MarkdownContent.tsx       # Content block renderer
│   ├── NavItem.tsx               # Sidebar navigation item
│   ├── NavSection.tsx            # Sidebar section with bronze/silver/gold
│   ├── SearchBar.tsx             # Search input with debounce
│   ├── SearchHighlight.tsx       # In-page text highlighting from search
│   ├── SearchResultsDropdown.tsx # Search results dropdown
│   ├── SFSymbol.tsx              # 24+ SF Symbols-style SVG icons
│   ├── Sidebar.tsx               # Responsive sidebar navigation
│   ├── TelegramContacts.tsx      # Floating Telegram contact button
│   ├── ThemeSwitcher.tsx         # Theme picker floating button
│   ├── TreeNavigation.tsx        # Navigation tree renderer
│   └── VisitTracker.tsx          # Client-side visit tracking
├── lib/                          # Server-side libraries
│   ├── anomaly-monitor.ts        # Anomaly detection (proxy chains, scanning)
│   ├── cleanup.ts                # Auto-deletion of old records
│   ├── crypto.ts                 # AES-256-GCM IP encryption
│   ├── db.ts                     # SQLite connection + schema
│   ├── dedup.ts                  # In-memory visit deduplication
│   ├── differential-privacy.ts   # Laplace noise for privacy
│   ├── extract-ip.ts             # IP extraction from headers
│   ├── fail2ban.ts               # Application-level IP banning
│   ├── log-rotation.ts           # Database rotation at 100MB
│   ├── navigation.ts             # Navigation structure + helpers
│   ├── rate-limit.ts             # 3-tier rate limiting
│   ├── sanitize.ts               # XSS sanitization utilities
│   ├── search-index.ts           # Full-text search index (19 articles)
│   ├── sql.js.d.ts               # TypeScript declarations for sql.js
│   ├── themes.ts                 # Theme definitions (4 themes)
│   └── tracker.ts                # Visit recording logic
├── middleware.ts                 # Edge middleware (rate limit, ban check)
├── next.config.ts                # Next.js config + security headers
├── public/
│   ├── logo-purple.svg           # Brand logo
│   ├── robots.txt                # Decoy paths for scrapers
│   └── obs-screens/              # OBS guide screenshots (6 images)
└── plans/                        # Architecture plans
```

## 🎨 Themes

The site features 4 visual themes accessible via a floating button in the bottom-right corner:

| Theme | Description | Icon |
|---|---|---|
| **Apple Style** | Light iOS/macOS minimalism | 🍎 |
| **Apple Dark** | Dark iOS/macOS theme | 🌙 |
| **Retro 80/90** | Warm nostalgic retro | 🎵 |
| **Retro Dark** | Dark retro theme | ✨ |

Themes are persisted in `localStorage` and respect `prefers-color-scheme: dark` on first visit.

## 📚 Content Sections

### 🟤 Начало работы (Bronze)
1. **Гайд по настройке OBS** — Multi-streaming setup (Bonga, Chaturbate, Stripchat), Elecap, VB Cable, MultiRTMP
2. **Словарь терминов** — Glossary of webcam industry terms
3. **Правила сайтов** — Platform rules and guidelines
4. **Железные правила переговоров** — Negotiation fundamentals

### ⚪ Середина работы (Silver)
5. **Первые 20 секунд** — First impression techniques
6. **Цели (goals)** — Goal setting for broadcasts
7. **Рулетки** — Roulette strategies
8. **Технические фишки** — Technical tips and tricks
9. **Бот на чатуре (Token Counter)** — Token counting bot
10. **Общий скрипт общения** — General communication script
11. **Лёгкий скрипт по шагам** — Step-by-step light script
12. **Сексинг-вопросы** — Sexting question templates
13. **Заготовки фраз** — Phrase templates

### 🟡 Профессиональный режим (Gold)
14. **Возражения** — Handling objections
15. **Топ-3 обидки** — Top 3 grievances
16. **Ошибки в привате** — Private show mistakes
17. **Правила общения** — Communication rules
18. **Сопровождение после шоу** — Post-show support
19. **Не быть ботом** — Avoiding robotic behavior

## 🔍 Search

Full-text search across all 19 articles with:
- 150ms debounce for real-time results
- Keyboard navigation (Arrow Up/Down, Enter, Escape)
- Section badges and highlighted matches
- In-page text highlighting on result click (`?q=` URL parameter)
- XSS sanitization on all input

## 🛡️ Security Infrastructure

### IP Collection & Protection
- **Extraction**: Multi-header chain (CF-Connecting-IP → X-Real-IP → X-Forwarded-For → socket)
- **Masking**: Last octet zeroed for GDPR compliance
- **Hashing**: SHA-256 for deduplication
- **Encryption**: AES-256-GCM with 3-part key derivation
- **Proxy detection**: Identifies VPN/proxy traffic

### Rate Limiting (3-tier)
| Tier | Limit | Window |
|---|---|---|
| Global | 10,000 requests | 1 minute |
| Per-IP | 60 requests | 1 minute |
| Burst | 10 requests | 10 seconds |

### Application Firewall
- **fail2ban**: 10 violations → 1-hour IP ban
- **Honeypot**: Hidden endpoint for bot detection
- **Anomaly Monitor**: Detects proxy chains, path scanning, known bots
- **Edge Middleware**: Runs on all `/api/*` routes

### Security Headers
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Strict-Transport-Security` (2 years, preload)
- `Content-Security-Policy` (self + inline scripts)
- `Permissions-Policy` (no camera/mic/geo)
- `Referrer-Policy: strict-origin-when-cross-origin`

## 📊 Visit Tracking

Privacy-first analytics system:
- **SQLite** database (`data/visits.db`) — no third-party analytics
- **In-memory deduplication** — 5-minute window prevents duplicates
- **Differential privacy** — Laplace noise injection (ε=0.3)
- **Auto-cleanup** — Visits: 90 days, Stats: 365 days, Anomalies: 30 days
- **Log rotation** — Database archived at 100MB
- **Image beacon fallback** — Works in Brave/ETP strict mode
- **GDPR compliance** — `/api/privacy` endpoint for data access/deletion
- **Cookie consent** — Banner with Accept/Reject

### Admin Dashboard
Accessible at `/admin` with `ADMIN_TOKEN` authentication:
- Daily visit chart (bar + line)
- Popular pages ranking
- Recent visits with IP hashes
- IP decryption (with encryption key)
- Security section: blocked IPs, anomaly stats, anomaly timeline

## 🧩 Key Components

### UI Components
- **Apple Glassmorphism**: `backdrop-blur-2xl` with translucent backgrounds
- **SF Symbols**: 24+ custom SVG icons matching Apple's SF Symbols design
- **Cursor Trail**: 8-point lerp-interpolated dimple trail
- **Background Orbs**: 4 floating gradient orbs with CSS animations
- **Telegram Contacts**: Floating button with team contact popover
- **Footer Credit**: Glass pill with logo + "by DJIBUR WORKTEAM"

### Navigation
- **Responsive Sidebar**: Fixed overlay on mobile, static panel on desktop
- **Section Colors**: Bronze (#965A38), Silver (#5B6770), Gold (#B8860B) with hover animations
- **Mobile**: Hamburger menu with overlay + keyboard dismiss (Escape)

## 🚀 Deployment

### Environment Variables

| Variable | Required | Description |
|---|---|---|
| `ADMIN_TOKEN` | Yes | Authentication for `/admin` and `/api/stats` |
| `KEY_PART_1` | No* | AES key part 1 (or use `IP_ENCRYPTION_KEY`) |
| `KEY_PART_2` | No* | AES key part 2 |
| `KEY_PART_3` | No* | AES key part 3 |
| `DATABASE_PATH` | No | Custom SQLite path (default: `data/visits.db`) |

*\*At least one of `KEY_PART_1+2+3` or `IP_ENCRYPTION_KEY` must be set for IP encryption.*

### Build
```bash
npm run build    # 30 routes (22 static + 8 dynamic)
npm run dev      # Development server
npm start        # Production server
```

## 📄 License

Private project by DJIBUR WORKTEAM.
