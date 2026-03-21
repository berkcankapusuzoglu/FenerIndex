# Revenue & Monetization Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add passive revenue streams — Google AdSense infrastructure, rich blog content (to pass AdSense "thin content" review), and a Buy Me a Coffee tip jar.

**Architecture:** Three independent workstreams: (1) AdSense ad component + slot placements across all pages, (2) `/news` blog section with rich AI-generated articles for each rumor to solve thin content, (3) Buy Me a Coffee floating widget. All are additive — no existing code is modified beyond inserting ad/content slots.

**Tech Stack:** Next.js App Router, React 19, Tailwind CSS 4, existing shadcn/ui components

---

### Task 1: AdSense Infrastructure — Ad Component + Script

**Files:**
- Create: `src/components/ads/ad-unit.tsx`
- Create: `src/components/ads/ad-config.ts`
- Modify: `src/app/layout.tsx`

**Step 1: Create ad config**

Create `src/components/ads/ad-config.ts` with AdSense publisher ID (env var) and ad slot definitions:

```ts
export const ADSENSE_PUB_ID = process.env.NEXT_PUBLIC_ADSENSE_PUB_ID ?? "";

export const AD_SLOTS = {
  RUMORS_FEED_INLINE: "rumors-feed-inline",
  SIDEBAR: "sidebar",
  ARTICLE_BOTTOM: "article-bottom",
  HEADER_BANNER: "header-banner",
} as const;

export function isAdsEnabled(): boolean {
  return ADSENSE_PUB_ID.length > 0 && ADSENSE_PUB_ID.startsWith("ca-pub-");
}
```

**Step 2: Create AdUnit client component**

Create `src/components/ads/ad-unit.tsx` — a reusable client component that renders a Google AdSense `<ins>` tag and calls `adsbygoogle.push()` on mount. Accepts `slot`, `format`, and `className` props. Shows nothing when `isAdsEnabled()` is false.

**Step 3: Add AdSense script to layout**

Modify `src/app/layout.tsx` to conditionally include the AdSense `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js">` tag in `<head>` when `NEXT_PUBLIC_ADSENSE_PUB_ID` is set.

**Step 4: Verify build passes**

Run: `npm run build`

**Step 5: Commit**

```
feat: add AdSense infrastructure with reusable AdUnit component
```

---

### Task 2: Place Ad Slots Across Pages

**Files:**
- Modify: `src/components/rumors/rumor-list.tsx` (inline ad every 4th rumor)
- Modify: `src/app/rumors/[id]/page.tsx` (ad below rumor detail)
- Modify: `src/app/hot-takes/page.tsx` (ad at bottom)
- Modify: `src/app/page.tsx` (ad between sections)

**Step 1: Add inline ad in rumor list**

In `rumor-list.tsx`, after every 4th rumor card in the grid, insert an `<AdUnit slot="rumors-feed-inline" format="fluid" />`. Use the sorted array index to determine placement.

**Step 2: Add ad on rumor detail page**

In `src/app/rumors/[id]/page.tsx`, add an `<AdUnit>` below the rumor card and above any related content.

**Step 3: Add ad on hot takes page**

Bottom of the hot takes page, before footer.

**Step 4: Add ad between landing page sections**

Between "Trending Right Now" and "Hot Takes" sections on the home page.

**Step 5: Verify build**

Run: `npm run build`

**Step 6: Commit**

```
feat: place AdSense ad slots across all pages
```

---

### Task 3: Blog/News Section — Routes & Data

**Files:**
- Create: `src/lib/demo-news.ts`
- Create: `src/app/news/page.tsx`
- Create: `src/app/news/[slug]/page.tsx`
- Create: `src/app/news/loading.tsx`
- Create: `src/app/news/error.tsx`

**Step 1: Create demo news data**

Create `src/lib/demo-news.ts` with 10 rich articles (300-500 words each) analyzing each demo rumor. Each article has: `id`, `slug`, `title`, `excerpt`, `content` (full markdown-style text), `category`, `rumorId`, `publishedAt`, `readingTime`. This is the key content that solves AdSense "thin content" rejection.

**Step 2: Create news listing page**

`src/app/news/page.tsx` — Server component that renders article cards in a list with excerpt, category badge, reading time, and date.

**Step 3: Create news article detail page**

`src/app/news/[slug]/page.tsx` — Full article page with rich text content, related rumor link with CTA to vote, and an ad unit at the bottom. Include proper metadata export for SEO (`generateMetadata`).

**Step 4: Create loading and error states**

Standard skeleton loading and error boundary.

**Step 5: Verify build**

Run: `npm run build`

**Step 6: Commit**

```
feat: add /news blog section with rich articles for AdSense approval
```

---

### Task 4: Navigation & SEO Updates

**Files:**
- Modify: `src/components/layout/header.tsx` (add News nav link)
- Modify: `src/components/layout/footer.tsx` (add News footer link)
- Modify: `src/app/page.tsx` (add News preview section)
- Modify: `src/app/sitemap.ts` (add news routes)
- Modify: `src/app/robots.ts` (ensure news is crawlable)

**Step 1: Add News to header nav**

Add "News" link between "Rumor Radar" and "Hot Takes" in header.

**Step 2: Add News to footer**

Add News link to footer nav.

**Step 3: Add Latest News preview to landing page**

Add a "Latest Analysis" section on the home page between Hot Takes and bottom CTA, showing 3 article excerpts.

**Step 4: Update sitemap**

Add `/news` and all `/news/[slug]` routes to sitemap.

**Step 5: Verify build**

Run: `npm run build`

**Step 6: Commit**

```
feat: add news to navigation, landing page, and sitemap
```

---

### Task 5: Buy Me a Coffee Tip Jar

**Files:**
- Create: `src/components/support/buy-me-coffee.tsx`
- Modify: `src/components/layout/footer.tsx`
- Modify: `src/app/page.tsx`

**Step 1: Create BuyMeCoffee component**

A small client component that renders a styled "Support FenerIndex" button linking to buymeacoffee.com/fenerindex (configurable via env var `NEXT_PUBLIC_BMC_USERNAME`). Uses a coffee cup icon and Fenerbahce yellow styling.

**Step 2: Add to footer**

Place the BMC button in the footer alongside existing links.

**Step 3: Add support CTA to landing page**

Add a subtle "Support the project" section in the bottom CTA area.

**Step 4: Verify build**

Run: `npm run build`

**Step 5: Commit**

```
feat: add Buy Me a Coffee tip jar widget
```

---

### Task 6: Privacy Policy & About Pages (AdSense requirement)

**Files:**
- Create: `src/app/privacy/page.tsx`
- Create: `src/app/about/page.tsx`
- Modify: `src/components/layout/footer.tsx`

**Step 1: Create privacy policy page**

Standard privacy policy mentioning Google AdSense, cookie usage, anonymous voting data. Required by AdSense.

**Step 2: Create about page**

About page explaining what FenerIndex is, how it works, who it's for. Adds substantial text content (another signal for AdSense approval).

**Step 3: Add footer links**

Add Privacy Policy and About links to footer.

**Step 4: Verify build**

Run: `npm run build`

**Step 5: Commit**

```
feat: add privacy policy and about pages for AdSense compliance
```

---

### Task 7: Final Build Verification & Environment Docs

**Step 1: Full build check**

Run: `npm run build` and `npm run lint`

**Step 2: Update CLAUDE.md**

Add new env vars (`NEXT_PUBLIC_ADSENSE_PUB_ID`, `NEXT_PUBLIC_BMC_USERNAME`), new pages (`/news`, `/news/[slug]`, `/privacy`, `/about`), and ad component docs.

**Step 3: Commit**

```
docs: update CLAUDE.md with monetization architecture
```
