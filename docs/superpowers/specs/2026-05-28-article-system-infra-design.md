# Nash+ Article System Infrastructure -- Phase 1 Design

**Date:** 2026-05-28
**Branch:** worktree-article-system-infra (from feat/marketing-redesign)
**Status:** Approved by founder

---

## Scope

One-time infrastructure pass. All future articles inherit these capabilities without further configuration. Touches: `lib/blog.ts`, `app/blog/[slug]/page.tsx`, `app/blog/page.tsx`, `app/layout.tsx`, `app/blog/[slug]/opengraph-image.tsx` (new), `content/README.md` (new). No new routes. No content changes.

---

## 1. Byline / Author Support

### Schema change (`lib/blog.ts`)
Add `author: string` to both `PostMeta` and `Post` interfaces. Default: `"Nash+"`.

```typescript
// In PostMeta / Post
author: string  // defaults to "Nash+" when absent from frontmatter
```

### Render (`app/blog/[slug]/page.tsx`)
Add a fourth `<span>` to the existing metadata flex row (category | date | readingTime):

```
| CATEGORY | DATE | N min read | Nash+ |
```

Style: same Geist Mono uppercase label at `var(--ink-faint)`, matching the date/readingTime spans exactly. No photo, no bio, no link.

---

## 2. Category Taxonomy Extension

### Extended Category enum

```typescript
export type Category =
  | 'law-explained'     // existing
  | 'how-it-works'      // existing
  | 'step-by-step'      // existing
  | 'glossary'          // existing
  | 'court-process'     // new
  | 'parenting'         // new
  | 'legal-aid'         // new
  | 'emotional-support' // new
  | 'tools-and-apps'    // new
```

### Cluster mapping

```
// Category -> Cluster mapping
//
// Cluster intent:
//   forms              -- "fill out this form" articles (step-by-step)
//   concepts           -- legal concepts explained (law-explained)
//   procedure-and-fears -- what happens in court / how the process works (how-it-works, court-process)
//   parenting          -- children, custody, co-parenting articles
//   support            -- emotional support and legal aid resources
//   tools              -- apps, calculators, automation tools
//   glossary           -- definitions
//
// Display order: forms | concepts | procedure-and-fears | parenting | support | tools | glossary

law-explained     -> concepts
how-it-works      -> procedure-and-fears
step-by-step      -> forms
glossary          -> glossary
court-process     -> procedure-and-fears
parenting         -> parenting
legal-aid         -> support
emotional-support -> support
tools-and-apps    -> tools
```

### Cluster labels

```typescript
export const CLUSTER_LABELS: Record<Cluster, string> = {
  'forms':               'Forms',
  'concepts':            'Concepts',
  'procedure-and-fears': 'Procedure & Fears',
  'parenting':           'Parenting',
  'support':             'Support & Legal Aid',
  'tools':               'Tools & Apps',
  'glossary':            'Glossary',
}
```

### `groupByCluster()` order

Updated to include 7 clusters; empty clusters are filtered before render in the blog index (no empty headings).

### `CATEGORY_COLORS` extension (`app/blog/[slug]/page.tsx`)

5 new entries added with palette-consistent colors:
- `court-process`: `#3d6a8a` (matches step-by-step cool tone)
- `parenting`: `#7a8a3d` (warm olive)
- `legal-aid`: `#2d5a3d` (brand green, same as law-explained)
- `emotional-support`: `#8a5a7a` (soft plum)
- `tools-and-apps`: `#3d5a8a` (slate blue)

---

## 3. Article JSON-LD

### BlogPosting (`app/blog/[slug]/page.tsx`)

Rendered as an inline `<script type="application/ld+json">` in the page JSX, after the article header. Schema: `https://schema.org/BlogPosting`.

Fields:
- `@context`: `https://schema.org`
- `@type`: `BlogPosting`
- `headline`: `post.title`
- `description`: `post.description`
- `datePublished`: `post.date`
- `dateModified`: `post.last_reviewed` (falls back to `post.date`)
- `author`: Organization `{name: "NashPlus", url: "https://nashplus.dev"}` when `post.author === "Nash+"`, else Person `{name: post.author}`
- `publisher`: Organization `{name: "NashPlus", url: "https://nashplus.dev", logo: {url: "https://nashplus.dev/og-logo.png"}}`
- `mainEntityOfPage`: `https://nashplus.dev/blog/${post.slug}`
- `inLanguage`: `"en-CA"`

### BreadcrumbList (nice-to-have, included)

```json
{
  "@type": "BreadcrumbList",
  "itemListElement": [
    {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://nashplus.dev"},
    {"@type": "ListItem", "position": 2, "name": "Blog", "item": "https://nashplus.dev/blog"},
    {"@type": "ListItem", "position": 3, "name": "{post.title}", "item": "https://nashplus.dev/blog/{slug}"}
  ]
}
```

Combined with BlogPosting as a `@graph` array in one `<script>` tag.

### Organization (`app/layout.tsx`)

One `<script type="application/ld+json">` added to the layout body (before `{children}`):

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "NashPlus",
  "url": "https://nashplus.dev",
  "logo": "https://nashplus.dev/og-logo.png"
}
```

**Logo placeholder:** `public/og-logo.png` added as a minimal 1x1 transparent PNG. Founder must replace with the real Nash+ logo before production. Noted in `content/README.md`.

---

## 4. Dynamic OG Image

**Approach:** `app/blog/[slug]/opengraph-image.tsx` using Next.js `ImageResponse`. Per-article image -- title on every social card.

**Dimensions:** 1200x630px (standard OG).

**Layout:**
- Background: `#1a3528` (sage-950 / dark green from current brand)
- Top-left: "Nash+" wordmark in Cormorant Garamond via fetched Google Fonts TTF, cream color (`#f5f0e8`)
- Center: article title, large, Cormorant Garamond italic, cream
- Bottom-right: `nashplus.dev`, Geist Mono uppercase, muted cream
- Green accent line: 4px horizontal bar above title, `#2d5a3d`

**Metadata wiring:**
- Next.js auto-discovers `opengraph-image.tsx` -- no manual `openGraph.images` in `generateMetadata`
- `generateMetadata` gains `twitter: { card: "summary_large_image" }` (currently `"summary"`)

---

## 5. Frontmatter Contract

Documented in `content/README.md`. Full schema:

```yaml
title: string           # required
description: string     # required; used in metadata and JSON-LD
summary: string         # optional; short card text; falls back to description
date: YYYY-MM-DD        # required; publication date
last_reviewed: YYYY-MM-DD  # optional; falls back to date; used in dateModified JSON-LD
author: string          # optional; defaults to "Nash+"
category:               # required; one of:
  # Original:
  #   law-explained | how-it-works | step-by-step | glossary
  # Extended:
  #   court-process | parenting | legal-aid | emotional-support | tools-and-apps
cluster: string         # optional; derived from category if absent
jurisdiction: string    # optional; defaults to "ontario"
tags: [string]          # optional; searchable keywords
sources: [string]       # optional; authoritative citations
featured: boolean       # optional; defaults to false
```

---

## Files Changed

| File | Change |
|---|---|
| `lib/blog.ts` | Add `author` field; extend Category/Cluster types; update CATEGORY_TO_CLUSTER; update groupByCluster order |
| `app/blog/[slug]/page.tsx` | Add byline span; extend CATEGORY_COLORS; add JSON-LD script; add twitter card |
| `app/blog/page.tsx` | Confirm new clusters render; filter empty clusters from index |
| `app/layout.tsx` | Add Organization JSON-LD script |
| `app/blog/[slug]/opengraph-image.tsx` | New: dynamic OG image via ImageResponse |
| `public/og-logo.png` | New: 1x1 placeholder; founder replaces with real logo |
| `content/README.md` | New: full frontmatter contract documentation |

---

## Out of Scope

- Writing article content
- /resources/* routes
- CMS / database
- Fixing the raw Vercel preview URL in ContentCTA/nav
- Touching ontario-srl-form13 repo
