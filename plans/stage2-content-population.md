# Stage 2: Content Population from manual.txt

## Overview
Populate all 16 article pages with actual content from `manual.txt`. Create a reusable `MarkdownContent` component for formatted text rendering. Add the missing "Token Counter" page.

## Changes Required

### 1. New Component: `components/MarkdownContent.tsx`
A React component that renders structured content with proper formatting:
- `<h2>`, `<h3>` for section headings
- `<ul>`/`<ol>` for lists
- `<hr>` for separators
- `<p>` for paragraphs
- `<blockquote>` for important notes
- Support for emoji and special characters
- Dark-theme compatible styling

### 2. Navigation Update: `lib/navigation.ts`
Add "Бот на чатуре (Token Counter)" to the "Трансляция" section:
```typescript
{ title: "Бот на чатуре (Token Counter)", href: "/broadcasting/token-counter", slug: "token-counter" }
```

### 3. New Page: `app/broadcasting/token-counter/page.tsx`
Create page for the Token Counter bot section from manual.txt.

### 4. Content Pages to Update (16 existing + 1 new = 17 total)

| # | Slug | Title | Content Source (manual.txt lines) |
|---|------|-------|----------------------------------|
| 1 | `goals` | Цели для трансляции (Goals) | Lines 1-60 |
| 2 | `roulettes` | Рулетки | Lines 62-148 |
| 3 | `general-script` | Скрипт диалога с мембером | Lines 149-186 |
| 4 | `communication-rules` | Общие правила общения | Lines 188-213 |
| 5 | `tech-tips` | Технические моменты и фишки | Lines 215-231 |
| 6 | `private-mistakes` | Топ ошибок в привате | Lines 233-244 |
| 7 | `sexting-questions` | Сексинг-вопросы для мембера | Lines 246-275 |
| 8 | `light-step-script` | Лёгкий скрипт общения (по шагам) | Lines 277-305 |
| 9 | `dictionary` | Словарь терминов | Lines 307-331 |
| 10 | `objections` | Обработка возражений | Lines 333-342 |
| 11 | `site-rules` | Правила сайтов | Lines 344-378 |
| 12 | `first-20-seconds` | Первые 20 секунд | Lines 380-416 |
| 13 | `token-counter` | Бот на чатуре (Token Counter) | Lines 418-427 |
| 14 | `top-3-grievances` | Топ-3 обидки от мемберов | Lines 429-463 |
| 15 | `phrase-templates` | Мои заготовки (фразы) | Lines 465-507 |
| 16 | `negotiation-rules` | Железные правила переговоров | Lines 509-544 |
| 17 | `post-show-support` | Сопровождение после шоу | Extract from general-script (lines 179-185) |
| 18 | `dont-be-a-bot` | Не быть ботом | Extract from negotiation-rules (lines 527-531) |

### 5. Content Mapping Details

#### Content Extraction Rules
- **Section headers** (e.g., "1.1. Общие принципы") → `<h2>` or `<h3>`
- **Bullet points** (lines starting with `-` or `❌`) → `<ul><li>`
- **Numbered items** (e.g., "3️⃣", "2️⃣", "1️⃣") → `<ol><li>` with emoji
- **Separator lines** (`▬▬▬...`) → `<hr />`
- **Author timestamps** (e.g., "ДЖИБУР — 15.06.2026 23:02") → skip (metadata only)
- **Bold markers** (`**text**`) → `<strong>`
- **Emoji** → keep as-is
- **Links** (e.g., `https://...`) → `<a>` with target="_blank"

#### Special Cases
- **"Сопровождение после шоу"**: Extract lines 179-185 from general-script section. These are the post-show support guidelines currently embedded in the general script.
- **"Не быть ботом"**: Extract the "НЕ БУДЬ БОТОМ!" section (lines 527-531) and the "Третье правило – СМАЙЛИКИ" section (lines 530-531) from negotiation-rules. Add the communication rules about not being a bot from lines 188-213.

## Implementation Order
1. Create `MarkdownContent` component
2. Update `lib/navigation.ts` — add Token Counter
3. Create `app/broadcasting/token-counter/page.tsx`
4. Update all existing page files with content
5. Build and verify

## MarkdownContent Component API
```tsx
interface MarkdownContentProps {
  content: ContentBlock[];
}

interface ContentBlock {
  type: 'heading' | 'subheading' | 'paragraph' | 'list' | 'ordered-list' | 'divider' | 'note' | 'link-block';
  text?: string;
  items?: string[];
  emoji?: string;
}
```
