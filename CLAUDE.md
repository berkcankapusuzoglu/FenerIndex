# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev        # Start dev server (localhost:3000, Turbopack)
npm run build      # Production build — run this to check for TypeScript/compile errors
npm run lint       # ESLint with Next.js Core Web Vitals + TypeScript rules
npm start          # Start production server from build output
```

No test framework is configured.

## Environment Variables

```
NEXT_PUBLIC_SUPABASE_URL=<project_url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon_key>
ADMIN_PASSWORD=<your_admin_password>
```

When Supabase vars are missing or contain placeholder values, the app runs in **demo mode** — all data comes from `src/lib/demo-data.ts` and votes are client-side only. The `isDemoMode()` function in that file is the single source of truth for this check.

`ADMIN_PASSWORD` protects the `/admin` panel (simple cookie-based auth).

## Architecture

**Stack**: Next.js 16.2.0 (App Router, Turbopack), React 19, TypeScript 5, Tailwind CSS 4, Supabase, shadcn/ui (base-nova style)

**Deployed at**: https://fenerindex.vercel.app

### Pages

- `/` — Landing page with trending rumors, hot takes preview, stats
- `/rumors` — Rumor Radar with voting, filters, sort, realtime updates
- `/rumors/[id]` — Individual rumor detail with full voting UI and share buttons
- `/hot-takes` — Hot Takes with agree/disagree voting, filters, sort
- `/admin` — Admin panel with CRUD for rumors (protected by `ADMIN_PASSWORD`)

### Data Flow

- **Server Components** (`src/app/rumors/page.tsx`, `src/app/rumors/[id]/page.tsx`, `src/app/hot-takes/page.tsx`) fetch data from Supabase or fall back to demo data
- **Client Components** (`src/components/rumors/rumor-card.tsx`, `src/components/hot-takes/hot-take-card.tsx`) handle voting with optimistic updates via `useState`
- **Server Action** (`src/app/rumors/actions.ts`) — `castVote()` persists votes to Supabase via RPC, uses cookie-based anonymous user ID (`fener_uid`)
- **Realtime** — `rumor-list.tsx` subscribes to Supabase `postgres_changes` on the `rumors` table for live vote count updates (skipped in demo mode)
- **Demo data** — `src/lib/demo-data.ts` (10 rumors) and `src/lib/demo-hot-takes.ts` (10 hot takes)

### Supabase Integration

- Browser client: `src/lib/supabase/client.ts` (singleton via `createBrowserClient`)
- Server client: `src/lib/supabase/server.ts` (per-request via `createServerClient` with async `cookies()`)
- Auth refresh: `src/proxy.ts` — Next.js 16 proxy (replaces middleware.ts), skips Supabase entirely in demo mode
- Database types: `src/lib/supabase/types.ts` — manually defined `Rumor`, `Vote`, `VoteType`, `Database` interfaces
- Schema + RPC: `supabase/migrations/001_initial_schema.sql` — includes `cast_vote` function, RLS policies, realtime publication

### OG Image Generation

- `src/app/opengraph-image.tsx` — Site-wide OG image (FenerIndex branding)
- `src/app/rumors/[id]/opengraph-image.tsx` — Per-rumor OG image with vote stats
- `src/app/api/share-card/route.ts` — Programmatic share card via `?rumorId=xxx`
- Shared renderer: `src/lib/share-card-renderer.tsx`

All use `next/og` `ImageResponse` with Satori. Renderers use **inline flex styles only** (no CSS classes — Satori limitation).

### SEO & PWA

- `src/app/sitemap.ts` — Dynamic sitemap with all routes + individual rumors
- `src/app/robots.ts` — Blocks `/admin` and `/api/` from crawlers
- `src/app/manifest.ts` — PWA manifest for "add to home screen"
- `src/app/icon.tsx` + `src/app/apple-icon.tsx` — Dynamic favicon and Apple touch icon

### Theming

Fenerbahce colors in OKLch (defined in `src/app/globals.css`):
- Primary = yellow/gold, Secondary = navy blue
- Dark mode is the default (via `next-themes`)
- Custom CSS variable `--fb-navy-light` for the cap side of sentiment bars

### Key Component Patterns

- **Voting**: `rumor-card.tsx` does optimistic state updates, then fires the server action in a try/catch (silently fails in demo mode)
- **Credibility labels**: Computed from believe percentage — LEGIT (≥90%), LIKELY (≥70%), 50/50 (≥40%), DOUBTFUL (≥20%), CAP (<20%)
- **Filters/Sort**: Client-side in `rumor-list.tsx` — category badges and sort buttons operate on the initial server-fetched array
- **Share buttons**: X (Twitter intent URL), WhatsApp (`wa.me`), and clipboard copy

### Title Convention

The root layout uses `title.template: "%s | FenerIndex"`. Child pages should set `title` as just the page name (e.g. `"Rumor Radar"`, `rumor.title`) — do NOT append "| FenerIndex" manually or it will duplicate.
