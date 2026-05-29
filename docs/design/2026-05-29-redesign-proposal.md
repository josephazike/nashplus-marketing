# NashPlus Marketing Site -- Redesign Proposal
**Date:** 2026-05-29
**Branch:** design/visual-overhaul (worktree of feat/marketing-redesign @ 085915b)
**Scope:** Visual layer only. Content, frontmatter, component APIs untouched.

---

## Executive Summary

The current design was built before articles existed. At 62-article density across 8 clusters, three problems dominate: (1) every cluster and category color fails WCAG AA contrast on the canvas background (empirically verified), (2) article cards have equal visual weight so 58 items become a wall with no anchor points, and (3) italic Cormorant Garamond -- evocative for a hero -- makes dense legal subheadings harder to parse. This proposal fixes all three without changing fonts, tokens, or content.

**Skill grounding:** Recommendations are anchored in the UI/UX Pro Max design system (v5), which independently validates Cormorant Garamond as an "Editorial Classic" pairing, confirms the 4.5:1 WCAG AA requirement for normal text, and recommends Minimalism style for content-dense legal platforms. All contrast ratios below are computed against WCAG 2.1 sRGB luminance formula.

---

## 1. Current State

### 1.1 Homepage (`app/page.tsx`)
- Hero is `min-height: 100vh` with a sparse headline + subhead + 2 CTAs. Reads as mostly empty space on desktop.
- Value props section ("Guided forms," "Clear language," "Built for Ontario") is generic and not differentiated.
- Resources section shows latest 3 articles -- not cluster-contextualized, hard to understand scope.
- CTA Strip (green background) and footer: functional, no major issues.

### 1.2 Blog Index (`app/blog/page.tsx`)
- Cluster headers: `0.55rem` (8.8px) Geist Mono uppercase in cluster-specific colors -- tiny, low-contrast, invisible as anchors.
- Contrast audit (all measured against `--canvas` #c4bdb0, luminance 0.513):

  | Color | Role | Ratio | WCAG AA |
  |-------|------|-------|---------|
  | `--green-600` #2d5a3d | primary brand, cluster labels | 4.26:1 | FAIL (needs 4.5:1) |
  | `#4a7c5e` | procedure/how-it-works | 2.60:1 | FAIL |
  | `#3d6a8a` | forms/step-by-step | 3.10:1 | FAIL |
  | `#7a5a8a` | glossary | 3.08:1 | FAIL |
  | `#3d7a8a` | court-process | 2.59:1 | FAIL |
  | `#5a7a3d` | parenting | 2.63:1 | FAIL |
  | `#7a5a7a` | emotional-support | 3.15:1 | FAIL |
  | `#3d6a7a` | tools | 3.18:1 | FAIL |
  | `#7a6a3d` | srl-strategy | 2.84:1 | FAIL |
  | `--green-700` #224631 | (not currently used on labels) | 5.66:1 | PASS |
  | `--ink` #1c1c19 | body text | 9.15:1 | PASS AAA |

  Every color in use fails. The multi-color taxonomy also adds noise without earning it.

- Article cards: category tag + title + 3-line italic description + reading time + date have equal visual weight. Nothing pops. The 3-line description is italic Lora at muted color -- good for one card, oppressive for 58.
- Featured article slot: exists in code but only triggers if a post has `featured: true` in frontmatter -- currently no posts have this flag set.
- Cluster ordering (current): Forms, Concepts, Procedure & Fears, Representing Yourself, Parenting, Support & Legal Aid, Tools, Glossary.
- Cluster nav pills: same failing contrast, 0.5rem Geist Mono -- invisible at typical viewing distance.

### 1.3 Article Detail (`app/blog/[slug]/page.tsx`)
- Metadata row (category, date, reading time, author) appears ABOVE the H1 title. Date and author are co-equal with category -- all four in identical 0.55rem Geist Mono caps. Nothing signals "this is the headline."
- H2 subheadings: `fontStyle: 'italic'` Cormorant Garamond at 1.5-2.1rem. Italic at body scale fights readability for dense legal text (this is the founder's "italic display font fights informational content" observation).
- H3 subheadings: also italic.
- Body Lora: `lineHeight: 1.82` -- good. Font size `clamp(1rem, 1.8vw, 1.125rem)` -- good.
- Internal links: no visible styling (MDX anchor elements inherit default underline but no color treatment is defined).
- ContentCTA at end: styled with border-top/bottom separator, italic Lora body, btn-primary CTA. Feels competent but the italic body copy under the heading is harder to read.
- No breadcrumb navigation (article detail has `<-- Resources` back link, acceptable).

### 1.4 Navigation (`app/layout.tsx`)
- Desktop: Nash+ | Resources | Get started -- correct structure per requirements.
- Mobile: no hamburger menu. The nav items are inline-flex with `gap: 2rem`. On narrow screens (375px) the nav may overflow or crowd. No responsive collapse.
- "Get started" CTA: `0.6rem` text in the nav button -- minimum tap target concern (likely less than 44px tall with 0.5rem padding top/bottom).

### 1.5 Footer (`app/page.tsx` + `app/blog/page.tsx`)
- Homepage footer: legal disclaimer + "2025 NashPlus" year. No /blog link.
- Blog index footer: uses `<LegalDisclaimer />` component only. No /blog link, no copyright.
- Missing per requirements: explicit /blog link in footer, "Information, not legal advice. Consult a licensed Ontario lawyer." line (beyond the component's current text).

---

## 2. Proposed Changes

### 2.1 Homepage -- Hero and Anchor Points

**Current:** Full-screen hero (100vh) with headline + subhead + CTAs. Below fold: generic value props, 3 article cards, CTA strip.

**Proposed:**
- Hero height: reduce from `100vh` to `clamp(70vh, 80vh, 85vh)`. The page should show a hint of the next section above the fold on desktop, inviting scroll.
- Hero headline: keep Cormorant Garamond italic 300 for the display H1 ("Ontario family law, made accessible."). Italic is appropriate here -- it's a display title, not body content.
- After the CTA row, add a horizontal trust anchor row (3 short fact statements, separated by thin dividers). These sit between the CTA and the value props section:
  - "62 plain-language guides. Cited to Ontario statutes and court rules."
  - "Built for self-represented litigants in Ontario family court."
  - "Legal information. Not legal advice. Reviewed by the Nash+ team."
  - Typography: Geist Mono 0.625rem, letter-spacing 0.22em, --ink-muted, horizontal flex row, pipe `|` separators. On mobile: stack vertically.
- Value props section: make the three value prop titles roman (non-italic) Cormorant Garamond 600. The body text stays Lora. This distinguishes them from the hero's display italic.
- Resources section ("From our resources"): show 4 articles (not 3), from different clusters. Add a cluster label above each card so users see breadth of coverage.
- Footer on homepage: add a `/blog` link ("All resources →") and upgrade copyright year to 2026.

**Rationale (UX Pro Max guidelines):** `whitespace-balance` -- use whitespace intentionally; `content-priority` -- show core content first on mobile; `visual-hierarchy` -- establish hierarchy via size, spacing, contrast, not color alone.

---

### 2.2 Blog Index -- Contrast, Hierarchy, and Density

**Cluster headers (CRITICAL change):**
- Current: 0.55rem Geist Mono, cluster-specific color, upper-left placement, all-caps.
- Proposed: Two-level treatment:
  - Cluster name: Cormorant Garamond 600 roman (non-italic), `clamp(1.5rem, 3vw, 2.25rem)`, color `--ink` (9.15:1 contrast = WCAG AAA). This gives each cluster a real editorial anchor that the eye catches when scanning.
  - Cluster article count: Geist Mono 0.625rem, `--ink-muted`, positioned inline-right of the cluster name, lowercase ("12 articles").
  - A 2px `--green-700` left border (4px wide, 2rem tall) anchors the cluster header visually on desktop. On mobile it becomes a top border.
- This alone fixes the "washed out, hard to make sense of anything" problem: the cluster headers become the primary navigation landmarks on the page.

**Cluster ordering (change to lib/blog.ts `CLUSTER_ORDER`):**
```
['self-representation', 'support', 'parenting', 'forms', 'concepts', 'procedure-and-fears', 'tools', 'glossary']
```
SRL Playbook (self-representation, 12 articles) leads as the differentiator. Support & Legal Aid second. Parenting third. This surfaces the highest-value clusters first.

**Article cards -- introducing hierarchy:**
- Category tags: unify ALL category label colors to `--green-700` (#224631, 5.66:1 PASS AA). The current multi-color taxonomy fails contrast and adds noise. Within a cluster, category colors have no navigational utility -- they only add visual confusion.
- Tag font size: increase from 0.55rem to 0.625rem. Still Geist Mono uppercase. Still small, but readable.
- Title: Cormorant Garamond 600 roman (remove `fontStyle: 'italic'` from card titles). Italic was readable at 2-3 cards; at 62 cards, italic titles blur together. Roman 600 gives each title more presence and is faster to scan.
- Description: reduce from 3-line clamp to 2-line clamp. Keep Lora italic -- this is summary copy, not body. But reduce font size slightly to 0.875rem to de-emphasize relative to the title.
- Metadata row (reading time + date): merge into a single line, Geist Mono 0.5rem `--ink-faint`. De-emphasize further by placing it last.
- Hover state: `background-color: var(--surface)` (rgba(28,28,25,0.04)) + `translateY(-2px)` + `border-left: 2px solid var(--green-600)` on hover. Card feels interactive and anchored.
- Grid: change from `auto-fill minmax(300px, 1fr)` to explicit 3-column on desktop (1200px+), 2-column on tablet (768-1199px), 1-column on mobile. This controls density and prevents the "wall" effect from random column widths.

**Cluster nav pills (top of /blog):**
- Change color from cluster-specific failing colors to `--green-700` text + `1px solid var(--green-700)` border.
- Increase font size to 0.625rem (from 0.5rem).
- Add `hover: background var(--surface)` transition.
- On mobile: horizontal scroll (single row with `overflow-x: auto`, no wrap) for quick cluster jumping.

**Rationale (UX Pro Max):** `color-contrast` (4.5:1 minimum, all current labels fail), `weight-hierarchy` (font-weight to reinforce hierarchy), `visual-hierarchy` (hierarchy via size, spacing, contrast -- not color alone), `virtualize-lists` (62 items; grid with explicit columns prevents uncontrolled density), `type-scale` (consistent modular scale).

---

### 2.3 Article Detail -- Title Hierarchy and Subheading Weight

**Article header:**
- Move the metadata row (category, date, reading time, author) to BELOW the H1 title. Current order makes metadata feel like a title. Proposed order: back-link, then H1, then description/lede, then metadata row.
- H1 title: keep Cormorant Garamond italic 600 at clamp(2.25rem, 5.5vw, 4.25rem). Italic is appropriate for article titles -- it signals "reading mode." Keep as-is.
- Metadata row: reduce to two items visible upfront -- category tag and reading time. Date and author collapse into a secondary `<details>` disclosure, or are placed after the green rule divider. This prevents the "four equally-sized metadata chips" problem.

**Article body subheadings (H2, H3):**
- H2: remove `fontStyle: 'italic'`. Cormorant Garamond 600 roman at clamp(1.5rem, 2.8vw, 2.1rem). Keep the `borderTop: 1px solid var(--border)` as a section divider -- that's good editorial rhythm.
- H3: remove `fontStyle: 'italic'`. Cormorant Garamond 600 roman at clamp(1.2rem, 2.3vw, 1.55rem).
- Why: italic Cormorant at 1.5-2.1rem in the middle of dense legal text is the specific problem the founder named ("italic display font fights informational content"). Roman 600 Cormorant at the same sizes reads as editorial chapter headings -- authoritative, clear, non-decorative.

**Body text:**
- Increase `lineHeight` from 1.82 to `1.88` for Lora body paragraphs. Legal text at 300-2500 words benefits from the additional breathing room.
- Internal link styling: add to `mdxComponents.a` -- `color: var(--green-700)`, `textDecoration: underline`, `textUnderlineOffset: 3px`, `textDecorationColor: var(--green-200)` (subtle). On hover: `textDecorationColor: var(--green-600)`.

**ContentCTA:**
- Keep current structure. Restyle: remove italic from the body text (`fontStyle: 'italic'` on the body `p`). The CTA should feel clear and warm, not editorial-soft.

**Rationale:** `heading-hierarchy` (sequential, meaningful), `whitespace-balance`, `line-height` (1.5-1.75 for body; 1.88 is appropriate for legal long-form).

---

### 2.4 Navigation -- Mobile Hamburger

**Desktop:** No changes. Current structure ("Nash+" | "Resources" | "Get started") is correct.

**Mobile hamburger (new):**
- Breakpoint: below 640px.
- Hamburger button: 44x44px touch target (UX Pro Max `touch-target-size`), positioned right of the "Nash+" logo. Three horizontal bars, 2px stroke, `--ink` color.
- Expanded state: full-width panel sliding down from nav bar, `background: rgba(196,189,176,0.97)`, containing "Resources" and "Get started" stacked vertically with 3rem padding each (min 44px touch targets). Closes on outside click or `Escape` key.
- Implementation: React `useState` for open/close, no external library.

**Tap targets audit:**
- "Get started" CTA in nav: current padding is `0.5rem 1.1rem` at `0.6rem` (9.6px) text. Minimum vertical height = `0.5 * 2 + line-height * 0.6rem`. Should be bumped to `0.65rem 1.25rem` to ensure 44px minimum height.

---

### 2.5 Footer -- Links and Clarity

**All page footers:**
- Add `<Link href="/blog">All resources</Link>` in Geist Mono 0.55rem `--ink-muted`.
- Add "Information, not legal advice. Consult a licensed Ontario lawyer." as a separate line (this is stronger than the current paragraph form).
- Copyright: change "2025 NashPlus" to "2026 NashPlus."
- Structure: two-column on desktop (disclaimer left, links + copyright right). Single column stacked on mobile.
- Unify footer implementation: currently homepage has an inline footer, blog/article use `<LegalDisclaimer />`. Recommend a `<SiteFooter />` component that wraps both so they stay in sync.

---

## 3. Type Scale (explicit, for `globals.css` comments)

| Token | Font | Weight | Style | Size | Line-height | Usage |
|-------|------|--------|-------|------|-------------|-------|
| `--type-hero` | Cormorant Garamond | 300 | italic | clamp(3.75rem, 9.5vw, 9rem) | 0.97 | Homepage H1 only |
| `--type-display` | Cormorant Garamond | 600 | roman | clamp(2.5rem, 6vw, 5rem) | 1.0 | Blog index H1 |
| `--type-title` | Cormorant Garamond | 600 | italic | clamp(2.25rem, 5.5vw, 4.25rem) | 1.06 | Article page H1 |
| `--type-cluster` | Cormorant Garamond | 600 | roman | clamp(1.5rem, 3vw, 2.25rem) | 1.1 | Cluster section headers |
| `--type-h2` | Cormorant Garamond | 600 | roman | clamp(1.5rem, 2.8vw, 2.1rem) | 1.2 | Article body H2 |
| `--type-h3` | Cormorant Garamond | 600 | roman | clamp(1.2rem, 2.3vw, 1.55rem) | 1.3 | Article body H3 |
| `--type-body` | Lora | 400 | normal | clamp(1rem, 1.8vw, 1.125rem) | 1.88 | All body copy |
| `--type-meta` | Geist Mono | 400 | normal | 0.625rem | 1.5 | Tags, dates, reading time |
| `--type-label` | Geist Mono | 400 | normal | 0.55rem | 1.5 | Nav items, eyebrow text |
| `--type-cta` | Geist Mono | 400 | normal | 0.6875rem | 1 | Button labels |

**Key change from current:** H2 and H3 move from italic to roman. Everything else stays.

---

## 4. Color Usage (explicit)

| Token | Value | Contrast on --canvas | Usage |
|-------|-------|---------------------|-------|
| `--ink` | #1c1c19 | 9.15:1 (AAA) | Primary text, cluster headers |
| `--ink-muted` | rgba(28,28,25,0.52) | ~4.5:1 | Secondary text, descriptions |
| `--ink-faint` | rgba(28,28,25,0.30) | ~2.6:1 | Tertiary metadata only (date, reading time) |
| `--green-700` | #224631 | 5.66:1 (AA) | Cluster/category labels, internal links, hover borders |
| `--green-600` | #2d5a3d | 4.26:1 (FAIL) | CTAs, decorative accents, icons, CTA strip -- NOT for small text labels |
| `--green-200` | #9fc4ae | -- | Link underline decoration (subtle) |
| `--canvas` | #c4bdb0 | page background | stays |
| `--surface` | rgba(28,28,25,0.04) | -- | Card hover backgrounds |
| `--surface-alt` | rgba(28,28,25,0.08) | -- | Subtle panel backgrounds |
| `--border` | rgba(28,28,25,0.14) | -- | Section dividers |

**Critical rule:** `--green-600` must never appear as the sole color for text smaller than 18px bold (i.e., "large text" per WCAG 2.1 definition). Use `--green-700` or `--ink` for any label, tag, or nav item text.

**CTA button note:** `.btn-primary` uses `background: --green-600, color: --canvas` -- the canvas-on-green-600 ratio is 4.26:1, which also falls just below WCAG AA (4.5:1 required). See Decision 1 in Section 10 for the three options.

---

## 5. Spacing Scale

```css
--space-1:  0.25rem;   /* 4px  -- tight gaps */
--space-2:  0.5rem;    /* 8px  -- inline spacing */
--space-3:  0.75rem;   /* 12px -- tag padding */
--space-4:  1rem;      /* 16px -- base unit */
--space-6:  1.5rem;    /* 24px -- component padding */
--space-8:  2rem;      /* 32px -- card padding */
--space-12: 3rem;      /* 48px -- section gap, small */
--space-16: 4rem;      /* 64px -- section gap, medium */
--space-24: 6rem;      /* 96px -- section gap, large */
--gutter:   clamp(1.5rem, 6vw, 5rem);  /* existing, keep */
--section-gap: clamp(5rem, 10vw, 9rem); /* existing, keep */
```

---

## 6. Visual Reference Points

1. **The Atlantic (digital articles, 2023-present):** Editorial serif typography, cream/warm background, cluster-header anchors that dominate the page before the article grid. Dense but scannable because the section breaks are visually loud. We borrow: the "loud cluster header" treatment, the demoted metadata, the reading-first hierarchy.

2. **Stripe Docs:** Clean, dense, information-hierarchical. Sidebar navigation anchors the reader. Section headers are roman weight, not display -- they signal "this is a chapter," not "this is a poster." We borrow: roman subheadings for body content, the idea that informational content gets a different visual register than display marketing.

3. **The British Columbia Coroner's Service reports (plain-language government):** Not design, but content rhythm. Callouts that cite statutes, steps that build on each other, a clean visual distinction between "here is a rule" and "here is an explanation." We borrow: the restraint on color -- one accent color throughout, not a rainbow taxonomy.

---

## 7. Component Restyles (5 components, API unchanged)

### Callout
- Currently: rounded-2px, left border 3px, background tint. Functional.
- Proposed change: increase padding slightly to `clamp(1.25rem, 3vw, 1.5rem)`. Remove `borderRadius` entirely (sharp corners match the editorial aesthetic). Title font size from 0.58rem to 0.625rem.

### ComparisonTable
- Currently: horizontal scroll, striped rows, Geist Mono headers. Functional and well-built.
- Proposed change: none needed structurally. Increase row height via padding: 1rem (from 0.85rem). Make header row background `var(--surface-alt)` (from 0.03 opacity to 0.08 for more visual separation).

### ProcessTimeline
- Currently: circle step numbers (green-600 background, canvas text), vertical rail, Cormorant italic step titles.
- Proposed change: step titles from italic to roman Cormorant 600. This is the same H3 italic-to-roman change -- consistent application.

### Checklist
- Currently: static SVG checkbox, green-600 stroke, item text in Lora. Green-50 background, green-600 left border.
- Proposed change: make the SVG checkbox unfilled (outline-only, `var(--green-700)` stroke) to look more like an actual checklist and less like a completed state. This adds a subtle visual cue that the list is instructional, not confirmatory. Keep green-600 border (decorative, not text -- contrast rules don't apply).

### DecisionTree
- Currently: green-600 root question block (canvas text on green-600 = 4.26:1 -- borderline). Branch condition labels in gray border box. Outcome boxes with green tint + green-700 text.
- Proposed change: root question block: upgrade background to `var(--green-700)` (#224631). Canvas text on green-700 = 5.66:1 PASS AA. This is a slight darkening that also fixes the borderline contrast. No visible change to the user's eye -- both are deep forest green.

---

## 8. Mobile Responsiveness Targets

| Breakpoint | Key behaviors |
|------------|---------------|
| 375px | Single-column article cards. Cluster nav as horizontal scroll strip. Hamburger menu. Trust anchors stacked vertically. |
| 414px | Same as 375px. |
| 768px | 2-column article cards. Cluster nav pills wrap naturally. Hamburger or inline nav (decision point). |
| 1024px | 3-column article cards. Inline nav. Hero shows hint of content below fold. |
| 1440px | 3-column articles. Max-width container (1440px), centered. Hero balanced. |

Touch targets: all interactive elements minimum 44x44px.

---

## 9. Lighthouse Targets

| Page | Performance | Accessibility | Best Practices | SEO |
|------|-------------|---------------|----------------|-----|
| Homepage | 92+ | 95+ | 95+ | 98+ |
| /blog | 88+ | 98+ | 95+ | 98+ |
| Article detail | 90+ | 98+ | 95+ | 98+ |

Notes:
- Blog index will be slightly lower on Performance due to 62 articles loading; virtualize-lists guideline (UI Pro Max §3) recommends pagination or virtual scroll for 50+ items. Proposal does NOT add pagination (out of scope). If LH score falls below 88, we address in Phase 2b.
- Accessibility target of 98+ on /blog and articles is realistic once cluster labels move to passing colors.
- `next/font` handles font preloading and prevents FOIT; no action needed there.

---

## 10. Decisions for Founder Review Before Phase 2

### Decision 1: Primary button contrast
The `.btn-primary` class (`background: --green-600, color: --canvas`) has a 4.26:1 ratio -- it fails WCAG AA for normal text. Three options:
- **(A) Darken the button background to `--green-700`** (#224631). Passes at 5.66:1. Slightly deeper green, visually consistent with brand. (My recommendation.)
- **(B) Accept the 4.26:1 ratio** for CTAs only. Technically fails AA but exceeds 3:1 (large text threshold). The text is uppercase Geist Mono at ~11px -- not large text. Risky if accessibility matters for the LSO demo.
- **(C) Lighten the button text to white (#ffffff).** White on green-600 = 5.82:1 (PASS). But white does not match the warm canvas palette; it would look cold next to warm stone backgrounds.

### Decision 2: Italic vs roman for article H2/H3
The proposal removes italic from H2 and H3 inside article body (keeping italic for H1 article titles and hero H1). This is the core fix for "italic display font fights dense informational content."

If you want to keep the italic subheadings and instead address the problem through font weight or size changes alone, that is possible -- but less effective. Your call on whether you want to see italic-body-subheadings fully removed or just reduced.

### Decision 3: Cluster label color unification vs. retention of multi-color taxonomy
The proposal replaces all 9 cluster/category colors with `--green-700`. This eliminates the contrast failure and reduces visual noise.

Alternative: keep distinct colors but darken all of them to pass WCAG AA. The darkened versions would all look like variants of dark forest green anyway (every current color needs to drop about 40-60% in lightness to pass). The unification option is simpler and more coherent. But if you want to preserve the idea that "Forms articles look different from Parenting articles," the multi-color approach can be kept -- just with corrected, darker values.

---

## 11. What Stays Untouched (reconfirmed)

- `content/blog/*.mdx` -- all 62 articles, all slugs, all frontmatter.
- `lib/blog.ts` frontmatter contract (PostMeta interface, Category/Cluster types, CATEGORY_LABELS, CLUSTER_LABELS).
- The 5 MDX component prop APIs (Callout, ComparisonTable, ProcessTimeline, Checklist, DecisionTree).
- JSON-LD, OG image generation, robots.ts, sitemap.ts.
- `lib/config.ts` SIGNUP_URL.
- Marketplace placeholder pages.

**One lib/blog.ts change proposed:** CLUSTER_ORDER array only (display ordering, not part of the frontmatter contract). From `['forms','concepts','procedure-and-fears','self-representation','parenting','support','tools','glossary']` to `['self-representation','support','parenting','forms','concepts','procedure-and-fears','tools','glossary']`.

---

*Proposal by: Claude Sonnet 4.6 on design/visual-overhaul branch*
*Grounded in: UI/UX Pro Max v5 (typography validation, contrast audit, UX guidelines §1-§6)*
*No em-dashes used. NashPlus / Nash+.*
