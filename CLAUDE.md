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

`ADMIN_PASSWORD` protects the `/admin` panel (simple cookie-based auth via `fener_admin_session` cookie).

## Architecture

**Stack**: Next.js 16.2.0 (App Router, Turbopack), React 19, TypeScript 5, Tailwind CSS 4, Supabase, shadcn/ui (base-nova style)

**Deployed at**: https://fenerindex.vercel.app

### Pages

- `/` — Landing page with trending rumors, hot takes preview, live stats, dual CTAs
- `/rumors` — Rumor Radar with voting, filters, sort, realtime updates
- `/rumors/[id]` — Individual rumor detail with full voting UI and share buttons
- `/hot-takes` — Hot Takes with agree/disagree voting, category filters, sort
- `/admin` — Admin panel with CRUD for rumors (protected by `ADMIN_PASSWORD`)

### Data Flow

- **Server Components** (`src/app/rumors/page.tsx`, `src/app/rumors/[id]/page.tsx`, `src/app/hot-takes/page.tsx`, `src/app/page.tsx`) fetch data from Supabase or fall back to demo data
- **Client Components** (`src/components/rumors/rumor-card.tsx`, `src/components/hot-takes/hot-take-card.tsx`) handle voting with optimistic updates via `useState`
- **Server Action** (`src/app/rumors/actions.ts`) — `castVote()` persists votes to Supabase via RPC, uses cookie-based anonymous user ID (`fener_uid`), with input validation and rate limiting (15 votes/min per user)
- **Admin Actions** (`src/app/admin/actions.ts`) — `loginAdmin`, `logoutAdmin`, `addRumor`, `updateRumor`, `deleteRumor`, `updateRumorStatus`
- **Realtime** — `rumor-list.tsx` subscribes to Supabase `postgres_changes` on the `rumors` table for live vote count updates (skipped in demo mode)
- **Demo data** — `src/lib/demo-data.ts` (10 rumors) and `src/lib/demo-hot-takes.ts` (10 hot takes)

### Error Handling

- `src/app/global-error.tsx` — catches uncaught errors across the entire app
- `src/app/rumors/error.tsx`, `src/app/rumors/[id]/error.tsx` — rumor page error boundaries
- `src/app/hot-takes/error.tsx` — hot takes error boundary
- `src/app/rumors/loading.tsx`, `src/app/rumors/[id]/loading.tsx`, `src/app/hot-takes/loading.tsx` — skeleton loading states

### Supabase Integration

- Browser client: `src/lib/supabase/client.ts` (singleton via `createBrowserClient`)
- Server client: `src/lib/supabase/server.ts` (per-request via `createServerClient` with async `cookies()`)
- Auth refresh: `src/proxy.ts` — Next.js 16 proxy (replaces middleware.ts), skips Supabase entirely in demo mode
- Database types: `src/lib/supabase/types.ts` — manually defined `Rumor`, `Vote`, `HotTake`, `VoteType`, `Database` interfaces
- Schema + RPC: `supabase/migrations/001_initial_schema.sql` — includes `cast_vote` function, RLS policies, realtime publication
- RLS hardening: `supabase/migrations/002_tighten_rls.sql` — removes public write access on rumors table
- Seed data: `supabase/seed.sql` — 10 rumors + 10 hot takes for production bootstrap

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
- JSON-LD structured data on layout (`WebSite` schema) and rumor detail pages (`DiscussionForumPosting`)

### Security

- Security headers via `next.config.ts`: X-Frame-Options DENY, X-Content-Type-Options nosniff, Referrer-Policy, Permissions-Policy
- Rate limiting on `castVote` server action (in-memory, 15 votes/min per user)
- Input validation on all server actions
- RLS policies tightened: rumors table read-only for anonymous users, writes via `security definer` functions or service role only

### Theming

Fenerbahce colors in OKLch (defined in `src/app/globals.css`):
- Primary = yellow/gold, Secondary = navy blue
- Dark mode is the default (via `next-themes`)
- Custom CSS variable `--fb-navy-light` for the cap side of sentiment bars

### Key Component Patterns

- **Results reveal**: Vote percentages hidden until user votes — shows "Vote to see results" placeholder
- **Post-vote share CTA**: Inline share prompt with percentage appears after voting
- **Credibility labels**: Computed from believe percentage (only shown after voting) — LEGIT (≥90%), LIKELY (≥70%), 50/50 (≥40%), DOUBTFUL (≥20%), CAP (<20%)
- **Voting**: `rumor-card.tsx` does optimistic state updates, then fires the server action in a try/catch (silently fails in demo mode)
- **Hot takes**: `hot-take-card.tsx` has agree/disagree buttons with split labels (CONSENSUS, SPLIT, REJECTED)
- **Filters/Sort**: Client-side in `rumor-list.tsx` and `hot-take-list.tsx` — category badges and sort buttons
- **Share buttons**: X (Twitter intent URL), WhatsApp (`wa.me`), and clipboard copy

### Title Convention

The root layout uses `title.template: "%s | FenerIndex"`. Child pages should set `title` as just the page name (e.g. `"Rumor Radar"`, `rumor.title`) — do NOT append "| FenerIndex" manually or it will duplicate.

### Supabase Production Setup

1. Create Supabase project at supabase.com
2. Run `supabase/migrations/001_initial_schema.sql` in SQL Editor
3. Run `supabase/migrations/002_tighten_rls.sql` in SQL Editor
4. Run `supabase/seed.sql` to populate initial data
5. Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` on Vercel
6. Redeploy
