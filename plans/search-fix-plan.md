# Search Fix Plan

## Problem
The search bar in [`components/SearchBar.tsx`](components/SearchBar.tsx) is a UI shell with no functionality. `handleSubmit` contains only a `// TODO: Integrate Algolia search` comment. Users can type queries but nothing happens — no results, no filtering, no navigation.

## Solution: Client-Side Full-Text Search

Since the site is a static knowledge base with 19 articles, we implement **client-side search** that indexes all article content at build time and searches instantly in the browser. No backend, no API calls, zero latency.

### Architecture

```
SearchBar (input)
    │
    ├── on input change → filter searchIndex by query
    │       │
    │       └── SearchResultsDropdown (positioned below input)
    │               ├── matching article titles + snippets
    │               └── click → navigate to article
    │
    └── on submit → navigate to first result (if any)
```

### Files to Create/Modify

#### 1. [`lib/search-index.ts`](lib/search-index.ts) — NEW
- Define `SearchRecord` interface: `{ title, href, section, content }`
- Create `searchIndex: SearchRecord[]` with all 19 articles
- Each record contains: article title, href, section name, and **full text content** (imported from each page's content)
- Export `searchIndex` and a `search(query: string)` function that:
  - Lowercases both query and content
  - Splits query into words, matches all words (AND logic)
  - Ranks results: title match > section match > content match
  - Returns top 10 results with title, href, section, and a text snippet

#### 2. [`components/SearchResultsDropdown.tsx`](components/SearchResultsDropdown.tsx) — NEW
- Props: `query: string`, `results: SearchResult[]`, `onClose: () => void`, `onNavigate: () => void`
- Renders a floating dropdown panel below the search input
- Each result shows:
  - Article title (bold)
  - Section name (small, muted)
  - Text snippet with matched words highlighted
- Clicking a result navigates via `router.push(result.href)` and closes dropdown
- Clicking outside closes dropdown (via `useEffect` + `mousedown` listener)
- Pressing Escape closes dropdown
- Pressing ArrowDown/ArrowUp cycles through results
- Pressing Enter navigates to selected result

#### 3. [`components/SearchBar.tsx`](components/SearchBar.tsx) — MODIFY
- Import `search()` from `@/lib/search-index`
- Import `SearchResultsDropdown`
- Add state: `results`, `showDropdown`, `selectedIndex`
- On input change: call `search(sanitizedQuery)`, update results, show dropdown
- On submit: if results exist, navigate to first result
- Render `SearchResultsDropdown` below the input when `showDropdown && results.length > 0`

#### 4. Article Content — Add to Search Index

For the search to be useful, it needs to search **inside** article content, not just titles. Since all articles are static pages with content defined in their `page.tsx` files, we have two approaches:

**Approach A (Recommended): Manual content extraction**
- Create a content map in `lib/search-index.ts` that contains key terms and phrases from each article
- This is simpler, avoids parsing JSX, and gives us control over what's searchable
- Each article gets a `keywords` array and a `content` string with the most important text

**Approach B: Runtime content extraction**
- Use `document.body.textContent` on the article page
- More complex, requires the user to be on the page first (circular dependency)

**We'll use Approach A** — manually curated search content for each of the 19 articles. This ensures high-quality search results and avoids indexing irrelevant UI text.

### Search Index Content Structure

```typescript
interface SearchRecord {
  title: string;
  href: string;
  section: string;
  keywords: string[];      // important terms for this article
  content: string;         // 100-300 chars of key content
}
```

### Search Algorithm

```typescript
function search(query: string): SearchResult[] {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (words.length === 0) return [];

  return searchIndex
    .map(record => {
      let score = 0;
      const lowerTitle = record.title.toLowerCase();
      const lowerContent = record.content.toLowerCase();
      const lowerKeywords = record.keywords.map(k => k.toLowerCase());

      for (const word of words) {
        if (lowerTitle.includes(word)) score += 10;
        if (lowerKeywords.some(k => k.includes(word))) score += 5;
        if (lowerContent.includes(word)) score += 2;
      }

      // Generate snippet with matched words highlighted
      const snippet = generateSnippet(record.content, words);

      return { ...record, score, snippet };
    })
    .filter(r => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);
}
```

### UI Design

The search results dropdown will match the Apple Design System:
- Glassmorphism background (`.apple-glass-strong`)
- 16px border radius
- Max height: 400px with scroll
- Each result: 12px padding, hover highlight
- Snippet text: 12px, muted color
- Selected result: accent background
- Positioned absolutely below the search input, full width

### Implementation Steps

1. Create [`lib/search-index.ts`](lib/search-index.ts) with all 19 article records + search function
2. Create [`components/SearchResultsDropdown.tsx`](components/SearchResultsDropdown.tsx) with keyboard navigation
3. Update [`components/SearchBar.tsx`](components/SearchBar.tsx) to wire search + dropdown
4. Build & verify (30 routes, 0 errors)
5. Push to GitHub
