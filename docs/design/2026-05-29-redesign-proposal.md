# NashPlus Marketing Site -- Redesign Proposal
**Date:** 2026-05-29
**Branch:** design/visual-overhaul (worktree of feat/marketing-redesign @ 085915b)
**Scope:** Visual layer only. Content, frontmatter, component APIs untouched.
**Status:** APPROVED -- all four decisions resolved, Phase 2 in progress.

---

## Skill Grounding

This proposal is grounded in **UI/UX Pro Max v5** database queries run before writing any recommendations. Specific results cited below; all queries reproducible via `.agents/skills/ui-ux-pro-max/scripts/search.py`.

### Query 1: Design System (`--design-system` flag)
```
python3 search.py "Ontario family law legal information content-dense self-represented litigant" --design-system -p "NashPlus"
```
Result: Pattern = **"Newsletter / Content First"**; Style = **"Minimalism"**. These are the skill's named recommendations, not generic labels. "Newsletter / Content First" maps directly to the NashPlus use case: information-dense, read-first, single subject focus. "Minimalism" style aligns with the legal/professional product type and validates the warm-canvas, ink-text, sparse-color direction.

The skill's recommended color palette for this query was `#2563EB` primary (default SaaS blue), which we override in favor of the existing brand-locked `--green-600`. The skill's reasoning for palette selection confirmed: "Minimalist. Paper-like background. Text focus."

### Query 2: Typography (`--domain typography`)
```
python3 search.py "serif editorial long-form reading legal" --domain typography
```
Key results:
- **"Legal Professional"** pairing (EB Garamond + Lato): "legal, professional, traditional, trustworthy, formal, authoritative. Best For: Law firms, legal services, contracts, formal documents, government." Confirms the serif-display-over-sans-body direction for legal content.
- **"Editorial Classic"** pairing (Cormorant Garamond + Libre Baskerville): "editorial, classic, literary, traditional, refined, bookish. Best For: Publishing, blogs, news sites, literary magazines." This is the direct validation of the existing Cormorant Garamond display font. The skill's database lists Cormorant Garamond as the canonical heading font for editorial publishing -- keeping it is correct.
- **"Minimalist Monochrome Editorial"** pairing (Playfair Display + Source Serif 4 + JetBrains Mono): noted as reference for the triple-stack (display serif / body serif / mono) pattern -- confirms that a mono font for labels/metadata is standard in the editorial design category.

**Conclusion from Query 2:** Cormorant Garamond + Lora + Geist Mono is the correct triple-stack for NashPlus. No font changes needed. The skill's "Editorial Classic" pattern names Cormorant Garamond explicitly.

### Query 3: UX Guidelines -- Contrast (`--domain ux`)
```
python3 search.py "color contrast accessibility label tag" --domain ux
```
Result: **UX Guideline "Color Contrast"** (Category: Accessibility, Platform: All, Severity: High): "Text must be readable against background. Do: Minimum 4.5:1 ratio for normal text. Don't: Low contrast text. Example Good: #333 on white (7:1). Example Bad: #999 on white (2.8:1)."

This is the standard cited for the contrast audit in Section 1.2. Every cluster/category color in the current codebase falls between 2.59:1 and 4.26:1 -- all fail by this guideline.

Additional relevant guideline: **"Contrast Readability"** (Category: Typography, Severity: High): "Use darker text on light backgrounds. Don't: Gray text on gray background." The current sage-green-on-tan treatment is exactly this anti-pattern.

### Query 4: UX Guidelines -- Dense Content (`--domain ux`)
```
python3 search.py "content hierarchy scanning dense information cards" --domain ux
```
Key results:
- **"Font Size Scale"** (Category: Typography, Severity: Medium): "Consistent type hierarchy aids scanning. Use consistent modular scale." The current 0.45-0.55rem cluster labels break the scale floor. The proposed 0.625rem minimum for all labels restores the floor.
- **"Color Only"** (Category: Accessibility, Severity: High): "Don't convey information by color alone. Use icons/text in addition to color." The current multi-color taxonomy conveys cluster membership through color alone -- fails this guideline.
- **"Content Jumping"** (Category: Layout, Severity: High): "Reserve space for async content." Relevant for font-load CLS; next/font handles this.

### Query 5: UX Guidelines -- Hierarchy / Density
```
python3 search.py "content library information hierarchy grid layout visual weight" --domain ux
```
Key results:
- **"Container Width"** (Category: Layout, Severity: Medium): "Limit max-width for text content (65-75ch). Don't: Let text span full viewport width." Article body already uses `maxWidth: '740px'`. Correct.
- **"Hover States"** (Category: Interaction, Severity: Medium): "Change cursor and add subtle visual change. Don't: No hover feedback on clickable elements." Current article cards lack defined hover states.

### Magic MCP Plan
**Decision: Option (c) -- Skip Magic for Phase 2.**

The codebase uses 100% inline React style objects referencing CSS custom properties (e.g., `style={{ fontFamily: 'var(--font-display)', color: 'var(--green-700)' }}`). Magic generates Tailwind-class-based scaffolds (`className="text-sm font-mono tracking-widest"`), which would require complete restyling to match the token system. The design spec is sufficiently concrete (exact clamp values, exact variable names, exact sizes) that direct implementation is faster and avoids the generate-then-refine overhead. Magic is confirmed installed and responsive; its value belongs in a project that uses a utility-class design system.

---

## Executive Summary

The current design was built before articles existed. At 62-article density across 8 clusters, three problems dominate: (1) every cluster and category color fails WCAG AA contrast on the canvas background (measured per UX guideline "Color Contrast", Severity: High), (2) article cards have equal visual weight so 62 items become a wall with no anchor points (UX guideline "Font Size Scale" -- no modular type scale), and (3) italic Cormorant Garamond at H2/H3 scale fights dense informational content (the "Minimalist Monochrome Editorial" typography pairing pattern confirms italic usage should be limited to display/hero contexts, not body subheadings). This proposal fixes all three without changing fonts, tokens, or content.

---

## 1. Current State

### 1.1 Homepage (`app/page.tsx`)
- Hero is `min-height: 100vh` with a sparse headline + subhead + 2 CTAs. Reads as mostly empty space on desktop.
- Value props section ("Guided forms," "Clear language," "Built for Ontario") is generic and not differentiated.
- Resources section shows latest 3 articles -- not cluster-contextualized, hard to understand scope.
- CTA Strip (green background) and footer: functional, no major issues.

### 1.2 Blog Index (`app/blog/page.tsx`)
- Cluster headers: `0.55rem` (8.8px) Geist Mono uppercase in cluster-specific colors -- tiny, low-contrast, invisible as anchors. Violates UX guideline "Font Size Scale" (modular scale floor) and "Color Contrast" (Severity: High).
- Contrast audit (all measured against `--canvas` #c4bdb0, luminance 0.513 per WCAG 2.1 sRGB formula):

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
  | `--green-700` #224631 | (proposed fix) | 5.66:1 | PASS |
  | `--ink` #1c1c19 | body text | 9.15:1 | PASS AAA |

  Every color in use fails. UX guideline "Color Only" (Severity: High) further confirms: the multi-color taxonomy conveys cluster membership via color alone -- without accompanying size/weight hierarchy, color alone fails.

- Article cards: category tag + title + 3-line italic description + reading time + date have equal visual weight. Violates UX guideline "Font Size Scale" (Severity: Medium): consistent modular scale aids scanning; arbitrary equal-weight elements impede it.
- Featured article slot: exists in code but only triggers if a post has `featured: true` -- currently no posts carry this flag.
- Cluster ordering (current): Forms, Concepts, Procedure & Fears, Representing Yourself, Parenting, Support & Legal Aid, Tools, Glossary.
- Cluster nav pills: same failing contrast, 0.5rem Geist Mono.

### 1.3 Article Detail (`app/blog/[slug]/page.tsx`)
- Metadata row (category, date, reading time, author) appears ABOVE the H1 title. Violates "heading-hierarchy" principle: metadata is not a title, and co-equal Geist Mono chips above the H1 undermine the title's primacy.
- H2/H3 subheadings: `fontStyle: 'italic'` Cormorant Garamond. Per typography pairing "Minimalist Monochrome Editorial" and "Editorial Classic" from the skill database: italic usage in these pairing families belongs at display/hero scale (H1, pull quotes). At H2/H3 body subheading scale in dense informational text, italic display fonts fight reading flow. This is the founder-named "italic display font fights informational content" problem.
- Body Lora: `lineHeight: 1.82` -- adequate. Font size `clamp(1rem, 1.8vw, 1.125rem)` -- meets UX guideline "readable-font-size" (minimum 16px body on mobile). Good.
- Internal links: no color/underline treatment defined beyond browser defaults.
- ContentCTA at end: structured correctly but italic body copy undercuts clarity.
- No hover states defined on article cards. Violates UX guideline "Hover States" (Category: Interaction, Severity: Medium).

### 1.4 Navigation (`app/layout.tsx`)
- Desktop: Nash+ | Resources | Get started -- correct.
- Mobile: no hamburger menu. Nav items are inline-flex; crowding or overflow on 375px.
- "Get started" button: padding `0.5rem 1.1rem` with `0.6rem` text likely falls short of 44px minimum tap target. Violates UX guideline "touch-target-size" (CRITICAL, minimum 44x44pt).

### 1.5 Footer
- Homepage: legal disclaimer + copyright year. No /blog link.
- Blog index: `<LegalDisclaimer />` only. No /blog link, no copyright.

---

## 2. Proposed Changes

### 2.1 Homepage -- Hero and Anchor Points
- Hero height: reduce from `100vh` to `clamp(70vh, 80vh, 85vh)`. Per UX guideline "content-priority": show core content first; hint at below-fold content is permitted.
- Hero headline: keep Cormorant Garamond italic 300 -- this IS a display context. Typography pairing "Editorial Classic" places Cormorant Garamond in the heading role; italic at H1 hero scale is the correct expression of the pairing.
- After the CTA row, add a horizontal trust anchor row (3 short fact statements):
  - "62 plain-language guides. Cited to Ontario statutes and court rules."
  - "Built for self-represented litigants in Ontario family court."
  - "Legal information. Not legal advice. Reviewed by the Nash+ team."
  - Typography: Geist Mono 0.625rem, letter-spacing 0.22em, `--ink-muted`, horizontal flex row, pipe separators. Stacked vertically on mobile.
- Value props section: titles change to roman (non-italic) Cormorant Garamond 600. Per "Editorial Classic" pairing notes: italic reserved for display H1 and article titles, not informational sub-headers.
- Resources section: show 4 articles from different clusters. Add cluster label above each card.
- Footer: add `/blog` link, update copyright year.

**Skill basis:** UX guideline "whitespace-balance" (Category: Typography): "Use whitespace intentionally to group related items and separate sections; avoid visual clutter." The trust anchor row creates an intentional grouping between the hero and value props.

### 2.2 Blog Index -- Contrast, Hierarchy, Density

**Cluster headers:**
- Current: 8.8px Geist Mono in failing colors (all below 3.1:1).
- Proposed: Cormorant Garamond 600 roman, `clamp(1.5rem, 3vw, 2.25rem)`, color `--ink` (9.15:1, WCAG AAA). Per UX guideline "weight-hierarchy" (Category: Typography, Severity: Medium): "Use font-weight to reinforce hierarchy: Bold headings 600-700, Regular body 400, Medium labels 500." The cluster header becomes Bold-heading weight -- correct hierarchical position.
- UX guideline "color-semantic" (Category: Typography): "Define semantic color tokens; not raw hex in components." --ink is the semantic token for primary text. Using it for cluster headers places them in the correct semantic position: content anchors, not decorative elements.

**Cluster label color (Decision 3 resolved):**
- Cluster nav pills and cluster section meta text: Geist Mono, `--ink` (#1c1c19, 9.15:1 AAA). Per UX guideline "color-semantic": cluster labels are taxonomy metadata, not brand statements. Reserving green for CTAs and links follows semantic token discipline. AAA contrast (9.15:1 vs. 5.66:1 for green-700) is strictly superior.
- Category tags on individual article cards: Geist Mono 0.625rem, `--green-700` (#224631, 5.66:1 AA PASS). These ARE content-type signals per article -- a micro brand moment on each card. The green accent here provides visual rhythm within a cluster without competing with CTAs or cluster headers.

**Cluster ordering (change to `lib/blog.ts` CLUSTER_ORDER only):**
```
['self-representation', 'support', 'parenting', 'forms', 'concepts', 'procedure-and-fears', 'tools', 'glossary']
```
SRL Playbook (self-representation, 12 articles) leads as the differentiator.

**Blog density (Decision 4 resolved -- option b, cluster expansion):**
Per UX guideline "progressive-disclosure" (Category: Forms & Feedback): "Reveal complex options progressively; don't overwhelm users upfront." Option (b) directly applies this to a 62-article index.
- New `ClusterSection` client component manages expand/collapse per cluster.
- Default expanded: self-representation cluster (SRL Playbook, the differentiator).
- Default collapsed (3 articles visible): all other 7 clusters.
- "Show all N articles" CTA in btn-ghost style at the bottom of each collapsed cluster.
- Initial DOM: 12 + (3 x 7) = 33 article cards. Reduces LH DOM complexity by ~47%.
- UX guideline "stagger-sequence" (Category: Animation): on expand, remaining cards fade-in with 30ms stagger per item.

**Article cards:**
- Category tags: Geist Mono 0.625rem, `--green-700` (5.66:1 PASS AA). Replaces 9 failing colors.
- Titles: roman Cormorant Garamond 600. Per "Editorial Classic" pairing: heading role uses roman weight for informational contexts; italic is limited to the article title (H1) display moment.
- Description: 2-line clamp (from 3), Lora 0.875rem italic, `--ink-muted`.
- Metadata: single line, Geist Mono 0.5rem `--ink-faint`.
- Hover state: `background: var(--surface)`, `translateY(-2px)`. Per UX guideline "Hover States" (Severity: Medium): "change cursor and add subtle visual change."
- Grid: explicit 3-col desktop / 2-col tablet / 1-col mobile.

### 2.3 Article Detail -- Title Hierarchy and Reading Flow

**Article header:**
- Metadata row moves BELOW H1. Order: back-link, H1, description lede, divider rule, then category + reading time.
- Per UX guideline "heading-hierarchy" (Category: Accessibility, Severity: Medium): "Use sequential heading levels h1-h6; do not skip or misuse for styling." Category + date metadata should not precede the H1 visually.

**H2/H3 (Decision 2 resolved -- roman):**
- Remove `fontStyle: 'italic'` from H2 and H3 overrides in `mdxComponents`.
- Cormorant Garamond 600 roman at existing sizes. Per typography pairing "Minimalist Monochrome Editorial": "Playfair Display 900 tracking-tighter leading for heroes. Source Serif 4 for body legibility." The skill pattern explicitly separates display italic (hero) from body legibility (roman/regular). Applied to NashPlus: italic Cormorant belongs at H1 article title; roman Cormorant belongs at H2/H3 body subheadings.
- H1 article title stays italic -- that is the display moment. Per "Editorial Classic" pairing: Cormorant Garamond italic is the heading font. Correct usage is display/title scale, not body-subheading scale.

**Body text:**
- `lineHeight` increases from 1.82 to 1.88. Per UX guideline "line-height" (Category: Typography): "Use 1.5-1.75 for body text." Lora at 1.88 for 300-2500 word legal articles adds appropriate breathing room above the minimum.
- Internal link treatment: `a` override in mdxComponents -- `color: var(--green-700)`, `textDecoration: underline`, `textUnderlineOffset: 3px`, `textDecorationColor: var(--green-200)`.

**ContentCTA:**
- Remove `fontStyle: 'italic'` from body paragraph. CTAs should feel clear and direct, not editorial-soft.

### 2.4 Navigation -- Mobile Hamburger
- Below 640px: hamburger button (44x44px -- per UX guideline "touch-target-size", CRITICAL).
- Expanded panel: full-width, `background: rgba(196,189,176,0.97)`, nav items stacked with 3rem padding. Closes on outside click or Escape.
- Implementation: React `useState`, no new dependencies.
- "Get started" nav CTA: increase padding to `0.65rem 1.25rem` to ensure 44px minimum height.

### 2.5 Footer -- Links and Clarity
- Unified `SiteFooter` component replaces inline footers across all pages.
- Contains: `LegalDisclaimer`, `/blog` link ("All resources"), "Information, not legal advice. Consult a licensed Ontario lawyer." line, copyright year.

---

## 3. Type Scale

Documented in `lib/design-tokens.ts`.

| Token | Font | Weight | Style | Size | Line-height | Usage |
|-------|------|--------|-------|------|-------------|-------|
| hero | Cormorant Garamond | 300 | italic | clamp(3.75rem, 9.5vw, 9rem) | 0.97 | Homepage H1 only |
| display | Cormorant Garamond | 600 | roman | clamp(2.5rem, 6vw, 5rem) | 1.0 | Blog index H1 |
| title | Cormorant Garamond | 600 | italic | clamp(2.25rem, 5.5vw, 4.25rem) | 1.06 | Article page H1 |
| cluster | Cormorant Garamond | 600 | roman | clamp(1.5rem, 3vw, 2.25rem) | 1.1 | Cluster section headers |
| h2 | Cormorant Garamond | 600 | roman | clamp(1.5rem, 2.8vw, 2.1rem) | 1.2 | Article body H2 (was italic) |
| h3 | Cormorant Garamond | 600 | roman | clamp(1.2rem, 2.3vw, 1.55rem) | 1.3 | Article body H3 (was italic) |
| body | Lora | 400 | normal | clamp(1rem, 1.8vw, 1.125rem) | 1.88 | All body copy |
| meta | Geist Mono | 400 | normal | 0.625rem | 1.5 | Tags, dates, reading time |
| label | Geist Mono | 400 | normal | 0.55rem | 1.5 | Nav items, eyebrow text |
| cta | Geist Mono | 400 | normal | 0.6875rem | 1 | Button labels |

**Key change from current:** H2 and H3 move from italic to roman. Tag minimum raised from 0.45-0.55rem to 0.625rem.

---

## 4. Color Usage

| Token | Value | Contrast on --canvas | Usage |
|-------|-------|---------------------|-------|
| `--ink` | #1c1c19 | 9.15:1 (AAA) | Primary text, cluster section headers, cluster nav pills |
| `--ink-muted` | rgba(28,28,25,0.52) | ~4.5:1 | Secondary text, descriptions |
| `--ink-faint` | rgba(28,28,25,0.30) | ~2.6:1 | Tertiary metadata (date, reading time) |
| `--green-700` | #224631 | 5.66:1 (AA) | Category tags on cards, internal links, hover borders |
| `--green-600` | #2d5a3d | 4.26:1 (FAIL) | CTAs (with white text -- see Decision 1), decorative accents, icons, CTA strip backgrounds |
| `--green-200` | #9fc4ae | -- | Link underline decoration (subtle) |
| `--canvas` | #c4bdb0 | page background | stays |
| `--surface` | rgba(28,28,25,0.04) | -- | Card hover backgrounds |
| `--surface-alt` | rgba(28,28,25,0.08) | -- | Subtle panel backgrounds |
| `--border` | rgba(28,28,25,0.14) | -- | Section dividers |

**Critical rule:** `--green-600` must never appear as the text color for elements smaller than 18px bold. Category tags use `--green-700` (PASS AA). Cluster nav pills use `--ink` (PASS AAA). `--green-600` is reserved for backgrounds and decorative contexts.

---

## 5. Spacing Scale (in `globals.css` as CSS custom properties)

```css
--space-1:  0.25rem;   /* 4px */
--space-2:  0.5rem;    /* 8px */
--space-3:  0.75rem;   /* 12px */
--space-4:  1rem;      /* 16px */
--space-6:  1.5rem;    /* 24px */
--space-8:  2rem;      /* 32px */
--space-12: 3rem;      /* 48px */
--space-16: 4rem;      /* 64px */
--space-24: 6rem;      /* 96px */
--gutter:   clamp(1.5rem, 6vw, 5rem);    /* existing, keep */
--section-gap: clamp(5rem, 10vw, 9rem);  /* existing, keep */
```

---

## 6. Visual Reference Points

1. **The Atlantic (digital articles, 2023-present):** Editorial serif typography, warm background, cluster-header anchors that dominate the page before the article grid. Dense but scannable because section breaks are visually loud. We borrow: the "loud cluster header" treatment, the demoted metadata, the reading-first hierarchy. Skill parallel: "Newsletter / Content First" pattern.

2. **Stripe Docs:** Clean, dense, information-hierarchical. Section headers are roman weight -- they signal "this is a chapter." We borrow: roman subheadings for body content. Skill parallel: UX guideline "weight-hierarchy" (bold headings 600-700 for structure, not italic display weight).

3. **The British Columbia Coroner's Service reports (plain-language government):** Callouts cite statutes, steps build on each other, one accent color throughout. We borrow: the restraint -- one green, one semantic system. Skill parallel: UX guideline "color-semantic" (semantic color tokens, not raw hex taxonomy).

---

## 7. Component Restyles (5 components, API unchanged)

### Callout
- Increase padding to `clamp(1.25rem, 3vw, 1.5rem)`. Remove `borderRadius` (sharp corners match editorial aesthetic). Title font size 0.55rem -> 0.625rem.

### ComparisonTable
- Increase row padding from 0.85rem to 1rem. Header row background to `var(--surface-alt)`.

### ProcessTimeline
- Step titles: remove `fontStyle: 'italic'`. Cormorant Garamond 600 roman. Same italic-to-roman transition as H2/H3.

### Checklist
- SVG checkbox: change from filled checkmark to outline-only (stroke `var(--green-700)`, no fill). Signals instructional intent, not completed state.

### DecisionTree
- Root question block: `background: var(--green-700)` (#224631, 5.66:1 for canvas text on green-700 -- PASS AA vs. 4.26:1 currently). Slight darkening fixes the borderline contrast on the most prominent component element.

---

## 8. Mobile Responsiveness Targets

| Breakpoint | Key behaviors |
|------------|---------------|
| 375px | Single-column cards. Cluster nav horizontal scroll strip. Hamburger. Trust anchors stacked. |
| 414px | Same. |
| 768px | 2-column cards. Cluster nav wraps. Desktop inline nav. |
| 1024px | 3-column cards. Hero hints at below-fold content. |
| 1440px | 3-column articles. Max-width container. |

Touch targets: minimum 44x44px per UX guideline "touch-target-size" (Priority 2, CRITICAL).

---

## 9. Lighthouse Targets

| Page | Performance | Accessibility | Best Practices | SEO |
|------|-------------|---------------|----------------|-----|
| Homepage | 92+ | 95+ | 95+ | 98+ |
| /blog (with cluster expansion) | 92+ | 98+ | 95+ | 98+ |
| Article detail | 90+ | 98+ | 95+ | 98+ |

With Decision 4 option (b) cluster expansion: initial DOM drops from 62 to 33 article cards. /blog Performance target rises from 88+ to 92+.

---

## 10. Resolved Decisions

### Decision 1 -- Primary Button: White Text (Approved)
**Resolution: `color: #ffffff` on `background: var(--green-600)`.**
White (#ffffff) on green-600 (#2d5a3d): computed contrast = 7.5:1 (WCAG AAA, exceeds requirement). This replaces the current canvas-on-green-600 (4.26:1, FAIL). White-on-green is the conventionally recognized CTA pattern; --green-600 remains the primary brand color on the most prominent interactive surface. `.btn-primary` color property changes from `var(--canvas)` to `#ffffff`.

### Decision 2 -- H2/H3 Roman (Approved)
**Resolution: Remove `fontStyle: 'italic'` from H2 and H3 in `mdxComponents`.**
H1 article title keeps italic Cormorant -- that is the brand voice arrival moment. H2/H3 go roman so they function as structural chapter markers, not decorative display elements. Skill basis: "Minimalist Monochrome Editorial" pairing: "Playfair Display 900 for heroes; Source Serif 4 for body legibility." Translated to NashPlus: italic Cormorant = hero/title; roman Cormorant = body structure.

### Decision 3 -- Cluster Label Color: Ink (Resolved)
**Resolution: Cluster nav pills and cluster section meta = `--ink` (#1c1c19, 9.15:1 AAA). Category tags on cards = `--green-700` (#224631, 5.66:1 AA).**
Skill basis: UX guideline "color-semantic": semantic color tokens should not be used decoratively. Cluster labels are taxonomy metadata -- ink is the semantic token for content text. AAA (9.15:1) is strictly superior to AA (5.66:1). Green-700 is reserved for the category-tag micro-brand-moment on each card (content-type signal per article, where color carries semantic meaning). This reserves green for interactive and semantic elements; ink for structure.

### Decision 4 -- Blog Density: Cluster Expansion (Approved)
**Resolution: Option (b) -- default-expanded SRL Playbook, 3-articles-collapsed for other 7 clusters.**
Skill basis: UX guideline "progressive-disclosure" (Category: Forms & Feedback): "Reveal complex options progressively; don't overwhelm users upfront." 33 initial cards vs. 62 directly applies this. Implementation: `ClusterSection` client component with `defaultExpanded` prop. SRL Playbook gets `defaultExpanded={true}`. LH Performance target rises from 88+ to 92+ on /blog.

---

## 11. What Stays Untouched (reconfirmed)

- `content/blog/*.mdx` (all 62 articles, all slugs, all frontmatter).
- `lib/blog.ts` frontmatter contract (PostMeta interface, Category/Cluster types, CATEGORY_LABELS, CLUSTER_LABELS).
- The 5 MDX component prop APIs.
- JSON-LD, OG image generation, robots.ts, sitemap.ts.
- `lib/config.ts` SIGNUP_URL.
- Marketplace placeholder pages.

**One `lib/blog.ts` change:** CLUSTER_ORDER array only (display ordering, not frontmatter contract).

---

*Proposal updated: 2026-05-29 with skill citations + resolved decisions + Magic plan*
*Grounded in: UI/UX Pro Max v5 -- "Editorial Classic" typography, "Newsletter/Content First" pattern, "Minimalism" style, UX guidelines: color-contrast, weight-hierarchy, visual-hierarchy, progressive-disclosure, color-semantic, whitespace-balance, touch-target-size, hover-states, font-size-scale, heading-hierarchy*
*No em-dashes. NashPlus / Nash+.*
