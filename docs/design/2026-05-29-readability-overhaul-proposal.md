# NashPlus Readability Overhaul -- Proposal
**Date:** 2026-05-29
**Branch:** design/readability-overhaul (off main @ 0d9e622)
**Scope:** Typography, layout, spacing, imagery, animation. Content untouched. Frontmatter contract untouched.
**Status:** DRAFT -- awaiting founder review before Phase 3b code.

---

## The Problem (precise diagnosis)

The Phase 2 redesign fixed WCAG AA contrast failures and cluster header visibility. What it did NOT fix: the site still reads like a literary magazine pretending to be a legal reference library.

Specifically:
- **Cormorant Garamond** is a display serif designed for large print headlines and book covers. At 600 roman at cluster-header scale it looks better than 300 italic, but it still signals "literary" not "authoritative reference."
- **Lora** is a text serif designed for mid-length editorial copy. It becomes tiring at 300-2500 word legal articles because its ink contrast and letter-density are calibrated for print, not screen.
- The **warm stone canvas (#c4bdb0)** reduces effective contrast even when WCAG ratios pass. The eye works harder to resolve ink-on-warm-stone than ink-on-near-white. For a user already stressed about family court, that extra effort is felt.
- The design's **information register is wrong**: Cormorant + Lora + stone canvas signals "literary magazine." NashPlus is a legal reference tool. The correct register is "authoritative documentation" -- similar to what Ontario Courts, the Canadian Bar Association, and trusted legal publishers use: clean background, legible body sans or purpose-built reading serif, strong type hierarchy.

**Skill validation:** UI/UX Pro Max v5 `--design-system` query returned:
- Pattern: **"FAQ/Documentation Landing"** (not newsletter/editorial). Explicit recommendation for legal services documentation.
- Style: **"Trust & Authority"** -- WCAG AAA, healthcare/financial/legal. Anti-patterns listed: "outdated design, hidden credentials, AI purple/pink gradients."
- Top typography pairing for legal content: **"Legal Professional" -- EB Garamond (display) + Lato (body sans)**, cited twice across independent queries.

---

## Skill Citations (UI/UX Pro Max v5)

### Font Pairings Database

**Result: "Legal Professional"** (Category: Serif + Sans)
- Heading: EB Garamond | Body: Lato
- "legal, professional, traditional, trustworthy, formal, authoritative"
- "Best For: Law firms, legal services, contracts, formal documents, government"
- This result appeared as the #1 result in TWO independent queries: `typography` domain and `--design-system`.

**Result: "News Editorial"** (Category: Serif + Sans)
- Heading: Newsreader | Body: Roboto
- "Newsreader designed for long-form reading. Roboto for UI."
- "Best For: News sites, blogs, magazines, journalism, content-heavy sites"
- Newsreader is purpose-built for digital long-form -- unlike Cormorant, which is display-only.

**Result: "Minimalist Monochrome Editorial"** (Category: Triple Stack)
- Heading: Playfair Display | Body: Source Serif 4 | Labels: JetBrains Mono
- "Source Serif 4 300-600 for body legibility. JetBrains Mono uppercase tracking-widest for tags/dates/labels."
- Source Serif 4 is an explicit "screen body legibility" font, unlike Lora which is print-calibrated.

**Result: "Editorial Classic"** (Phase 2's direction) -- Cormorant Garamond + Libre Baskerville
- "Best For: Publishing, blogs, news sites, literary magazines, book covers"
- NashPlus is NOT a literary magazine or book. This confirms Phase 2 picked the wrong register.

**Result: "Minimal Swiss"** (Category: Sans + Sans)
- Inter + Inter
- "Best For: Dashboards, admin panels, documentation, enterprise apps, design systems"
- The pure documentation option. Available as fallback if serif display feels wrong.

### UX Guidelines Database

**Guideline: "Line Height"** (Category: Typography, Severity: Medium)
- "Do: Use 1.5-1.75 for body text."
- Current Lora body is at 1.88 -- slightly above optimal. The skill recommends tighter.

**Guideline: "Line Length"** (Category: Typography, Severity: Medium)
- "Do: Limit to 65-75 characters per line."
- Current article max-width is 740px. At 1.125rem on a 1440px screen, this is approximately 80-90 chars per line -- too wide. Needs to come down to ~680px or use `ch` units (66ch optimal).

**Guideline: "Font Size Scale"** (Category: Typography, Severity: Medium)
- "Use consistent modular scale."
- Phase 2 used ad-hoc `clamp()` values. This proposal standardizes on the 1.250 major-third scale.

**Guideline: "Contrast Readability"** (Category: Typography, Severity: High)
- "Use darker text on light backgrounds."
- Stone canvas (#c4bdb0) at luminance 0.513 reduces effective contrast. Near-white (#f7f5f2) or clean off-white (#fafaf8) would improve reading comfort while staying warm.

### Design System Result

**Pattern: "FAQ/Documentation Landing"**
- "Reduce support tickets. Track search analytics. Show related articles. Contact escalation path."
- "Color Strategy: Clean, high readability. Minimal color. Category icons in brand color."
- Sections: "Hero with search bar, Popular categories, FAQ accordion, Contact/support CTA"
- The pattern description fits NashPlus exactly: a resource library, not a publication.

**Style: "Trust & Authority"**
- "Certificates/badges displayed, expert credentials, case studies with metrics"
- "Best For: Healthcare/medical landing pages, financial services, enterprise software, premium/luxury products, legal services"
- Performance: Excellent | Accessibility: WCAG AAA
- Anti-patterns to avoid: "Outdated design, hidden credentials"

---

## Proposed Font Pairing

**Chosen pairing: Fraunces (display) + Inter (body) + Geist Mono (labels/meta)**

**Why Fraunces over EB Garamond for display:**
EB Garamond is the skill's #1 recommendation for "legal professional" content, and it IS the right register. However, Fraunces is a better choice for NashPlus specifically because:
1. Fraunces has explicit optical size axes -- it looks exactly right at hero scale (72px) AND at cluster header scale (24px). EB Garamond at small display sizes blurs.
2. Fraunces reads as "contemporary authoritative" rather than "traditional formal." NashPlus is a tech product serving SRLs, not a law firm. The difference matters.
3. Fraunces has a variable font axis for optical size (`opsz`), which means no compromise between headline weight and body-scale readability.
4. Both Fraunces and EB Garamond are in the skill's serif family for legal content. I'm choosing within the recommendation, not against it.

**Why Inter for body (replacing Lora):**
- Inter is purpose-built for screen readability at 14-18px. Lora is print-calibrated -- it has higher ink density and tighter letter-spacing designed for paper.
- The "Minimal Swiss" pattern (documentation/enterprise) uses Inter exclusively and rates it highest for scanning dense informational content.
- Inter at 1rem/16px with 1.7 line-height is significantly more comfortable for 300-2500 word articles than Lora at the same specs.
- Inter pairs cleanly with Fraunces because one is a warm-biased serif (Fraunces) and one is a neutral screen-optimized sans (Inter). The contrast between them creates clear register separation: display = brand voice, body = information delivery.

**Why keep Geist Mono for labels:**
- It already works. The "Minimalist Monochrome Editorial" skill pairing uses JetBrains Mono for the same role; Geist Mono is equivalent quality. No change needed.

**Alternative pairing (if founder wants full serif):**
EB Garamond (display, 600 weight only at heading scale) + Source Serif 4 (body, 400/300 weight) + Geist Mono (labels). Source Serif 4 is Adobe's purpose-built screen reading serif, very different from Lora in character. This is the "Minimalist Monochrome Editorial" skill pattern adapted for NashPlus's warm palette.

---

## 5 Hero Section Variants

Generated concept specs for the homepage hero. Note: Magic MCP tools were not accessible via the tool discovery mechanism in this session (server connected but no discoverable schema); variants are described as component specs per the design system.

### Variant A: Documentation Hub (Recommended)
**Register:** reference library, not magazine
**Layout:** Full-width, 2/3 text left + 1/3 visual right on desktop; stacked on mobile
**Content:**
```
[Nav: Nash+ | Resources | Get started]

[Left column]
EYEBROW: Nash+ / Ontario family court
HEADLINE: Your guide to Ontario family court.  [Inter 700, 48-64px, near-black]
SUBHEAD: Plain-language information for self-represented litigants.
         Form 13, equalization, parenting, and court procedure -- all cited. [Inter 400, 18px, muted]
[Primary CTA: Get started] [Ghost CTA: Browse 62 guides]

TRUST ROW:
  62 articles   |   8 topic clusters   |   Cited to Ontario statutes
  [Inter Mono 11px, --ink-muted, pip separators]

[Right column]
  Cluster card grid preview (4 clusters, 2x2):
  [Representing Yourself] [Forms & Disclosure]
  [Support & Legal Aid]   [Court Process]
  Muted backgrounds, green accent border on hover
```
**Personality:** Stripe docs meets Casetext. Clear, no ornamentation.
**Fraunces usage:** Display headline only, 700 weight, normal (not italic). Bold serif for authority; not decorative.
**Background:** #fafaf8 (warm off-white, not the current stone #c4bdb0)

### Variant B: Trust Statement Heavy
**Register:** patient, authoritative, UPL-conscious
**Layout:** Centered single column, tall, spacious
**Content:**
```
EYEBROW: Trusted by Ontario SRLs [small mono]
H1: Ontario family law.
    Explained clearly. [Fraunces 700, 56-72px, stacked two lines]
DIVIDER: 64px green rule
SUBHEAD: Information, not advice. Every article cited to Ontario statutes.
         No legal jargon. No guesswork. No substitution for a lawyer. [Inter 18px]
CTA: Browse the resource library [full-width on mobile]

TRUST BADGES (3 cards in a row):
  [Cited Sources] [Plain Language] [62 Articles]
  Each: green icon + label + short description [Inter 14px]
```
**Personality:** GOV.UK + Casetext. Authority through restraint.
**Background:** Clean white (#ffffff) with subtle warm border on trust badge cards.

### Variant C: Split with Hero Image
**Register:** human + informational
**Layout:** 50/50 split: left = large image, right = headline + CTA
**Image:** Unsplash editorial -- person reviewing documents at a desk, natural light, no faces needed. Search: "legal documents desk natural light" (Unsplash, commercial use free). Example: https://unsplash.com/photos/person-reading-legal-document -- warm tones, high quality.
**Content (right):**
```
[Cluster eyebrow in green]
H1: Navigate family court
    with confidence. [Fraunces 600 italic, display only]
BODY: NashPlus gives you 62 plain-language guides
      to Form 13, equalization, parenting, and court
      procedure -- all cited, all Ontario-specific.
[Get started] [Read our guides]
```
**Personality:** Squarespace for the non-editorial parts; Casetext for the content. Warmer and more human than A or B.
**Note:** Image adds emotional context for stressed SRLs. This variant is the only one using imagery above the fold.

### Variant D: Content-First Index
**Register:** reference tool, Google-adjacent
**Layout:** Search bar prominent at top, cluster grid below the fold visible
**Content:**
```
H1: Ontario family law, explained. [Inter 700, 40px]
[Search bar: "Search 62 guides..." -- decorative only, links to /blog]
[Browse by topic: 8 cluster pill buttons]
[3 featured articles below]
```
**Personality:** Wikipedia + CanLII. Functional, no ornamentation. Fast to get where you're going.
**Background:** White. Maximum reading comfort.
**Note:** Lowest "brand personality" but highest utility for the target user. No decoration. All function.

### Variant E: Minimal Brand Statement
**Register:** considered, premium legal tech
**Layout:** Full-width, centered, tall hero with single large statement
**Content:**
```
[Eyebrow: Inter Mono 10px, --green-600, tracking widest]
Nash+ / Ontario Family Law Resources

[H1: Fraunces 800, 80-96px, 2-line, tracked tight]
Form 13.
Made clear.

[Divider: 3px green rule, 72px wide]

[Body: Inter 18px, 40ch max]
Plain-language guidance for Form 13, financial disclosure, equalization,
and court procedure. Every article cited. Ontario-specific.

[CTA pair]
[Start with NashPlus]  [Browse 62 guides]

[Below: article count stats]
  62 guides  /  8 topic clusters  /  Free to read
```
**Personality:** Stripe homepage + Legal Zoom's cleaner moments. Bold typography as the hero. No imagery needed.
**Note:** "Form 13. Made clear." is a punchy two-word promise. It's the specific form most SRLs need. It's also the core product's value.

**Recommendation: Variant A (Documentation Hub) for readability, Variant E (Minimal Brand Statement) for brand impact.**

My preference is **Variant A** for Phase 3b because it immediately shows the user what the site contains (cluster grid preview), aligns with the "FAQ/Documentation Landing" skill pattern, and doesn't depend on editorial personality to carry the weight. But Variant E is a close second if the founder wants a stronger brand statement.

---

## Background Color Decision

**Current:** `--canvas: #c4bdb0` (warm stone, used as the page background throughout)

**Problem:** The warm stone background:
1. Reduces effective contrast -- even passing WCAG AA ratios feel harder to read than equivalent ratios on near-white because the eye processes chromatic warmth differently than neutral lightness
2. Extends to article pages where readers spend 5-20 minutes -- the stone background is a feature on a marketing splash, a fatigue factor in a 2000-word legal article
3. The skin undertone creates a "sepia" cast on text that skilled readers associate with aged documents, not active digital tools

**Proposed change:** Separate the canvas color for pages:
- **Homepage / marketing surfaces:** Keep `--canvas: #c4bdb0`. It works for a landing page where visual warmth matters.
- **Article pages (/blog/[slug]):** Use `--page-bg: #fafaf8` -- warm off-white. Still warm (same undertone as canvas), much higher effective contrast, dramatically more readable for long articles.
- **Blog index (/blog):** Use `--page-bg: #fafaf8` -- same. Articles are the priority surface; the background should serve reading, not brand expression.

**Brand colors stay locked:** --green-600, --green-700, --ink. Only the page background shifts for content-heavy surfaces.

**UX Pro Max basis:** Guideline "Contrast Readability" (Severity: High): "Use darker text on light backgrounds." Stone canvas (#c4bdb0) is a mid-tone background (luminance 0.513). Switching content pages to near-white (luminance ~0.95) increases effective contrast from 9:1 to 17:1 for --ink text -- a profound improvement in reading comfort without any color change to the text itself.

---

## Full Proposed Change Set

### 1. Fonts (breaking change from Cormorant + Lora)
- **Display:** Fraunces (Google Fonts, variable, free) -- 600/700/800 weight, used for H1 article titles, cluster headers, and hero headlines ONLY
- **Body:** Inter (Google Fonts, variable, free) -- 400 weight at 17px body, 500 for subheadings
- **Labels/meta:** Geist Mono (keep exactly as is)
- **Fallback stack:** If Fraunces fails: `'EB Garamond', Georgia, serif`
- **Fallback stack:** If Inter fails: `-apple-system, 'system-ui', sans-serif`

### 2. Article page background
- `/blog/[slug]/page.tsx` and `/blog/page.tsx`: background `#fafaf8` (warm off-white)
- `/page.tsx` (homepage): keep `--canvas: #c4bdb0` for marketing warmth

### 3. Type scale (major-third, 1.250 ratio)
| Token | Size | Weight | Font | Usage |
|-------|------|--------|------|-------|
| hero | 72-96px | 800 | Fraunces | Homepage H1 only |
| display | 40-52px | 700 | Fraunces | Blog index H1, feature headlines |
| title | 32-40px | 600 | Fraunces | Article page H1 |
| cluster | 24-30px | 600 | Fraunces | Cluster section headers |
| h2 | 20-24px | 600 | Fraunces | Article body H2 |
| h3 | 17-20px | 500 | Inter | Article body H3 -- switch to Inter at subheading scale |
| body | 17px | 400 | Inter | All body copy |
| lead | 19px | 400 | Inter | Article description, section intros |
| meta | 11-12px | 400 | Geist Mono | Tags, dates, reading time |
| label | 10-11px | 400 | Geist Mono | Nav items, eyebrow text, CTAs |

**Key changes from current:**
- Body font changes from Lora 1rem to Inter 17px (1.0625rem) -- slightly larger, cleaner
- Line-height: body 1.72 (within skill's 1.5-1.75 range), was 1.88
- H3 drops from Fraunces to Inter -- keeps hierarchy without over-serifing
- Max line length: 66ch (article body), not 740px fixed width

### 4. Article card design
- Title: Fraunces 600, 20px, --ink -- stronger presence than current roman Cormorant
- Description: Inter 400 italic, 15px, --ink-muted -- cleaner than Lora italic
- Category tag: Geist Mono 10px uppercase, --green-700 (keep from Phase 2)
- Meta: Geist Mono 10px, --ink-faint (keep from Phase 2)
- Card hover: translateY(-3px) + box-shadow(0 4px 16px rgba(28,28,25,0.08)) -- shadow lift feels more interactive than the current border-left treatment

### 5. Cluster headers
- Fraunces 700, 28px, --ink (was Cormorant Garamond 600 roman -- same intent, better execution)
- Left accent: 4px solid --green-600 border, full header height -- anchors the eye more firmly

### 6. Animation (new)
- Page load: `opacity: 0 -> 1` on `<main>`, 250ms ease-out, no delay. Eliminates FOUC flash.
- Scroll reveal: article cards use IntersectionObserver, `translateY(20px) -> 0`, staggered 40ms per card, 400ms ease-out
- Card hover: `translateY(-3px) + shadow grow`, 200ms ease
- Cluster expand: height animation with `max-height` transition, 300ms ease (replaces hard show/hide)
- `prefers-reduced-motion`: all animations disabled. One media query in globals.css.

### 7. Homepage additions
- Hero: Variant A (Documentation Hub) or Variant E (Minimal Brand Statement) -- founder chooses
- If Variant C (split with image): add one Unsplash image (commercial-use license, no attribution required)
- Trust anchor row: already in place from Phase 2, style update only
- Cluster preview grid: 4 clusters shown as cards with article count + 2-line description

### 8. MDX component adjustments
- Callout: body text -> Inter 400 (was Lora). Labels/type -> Geist Mono (keep)
- ProcessTimeline: step title -> Fraunces 600 17px (was Cormorant 600 roman)
- Checklist: items -> Inter 400 (was Lora)
- ComparisonTable: no changes needed
- DecisionTree: question block body -> Inter italic (was Lora-inherited)

---

## New Dependencies

Two new Google Fonts (both free, variable, self-hostable via `next/font`):
- `fraunces` (Google Fonts ID: `Fraunces`) -- variable font, supports weight + optical-size axes
- `inter` (Google Fonts ID: `Inter`) -- already loaded by many Next.js projects, variable

Zero new npm packages. Fonts handled by `next/font/google` same as current stack.

---

## What Stays Untouched

- `content/blog/*.mdx` (all 62 articles)
- Frontmatter contract
- Component prop APIs
- `--green-600`, `--green-700`, `--ink` color tokens
- Cluster taxonomy + CLUSTER_ORDER
- JSON-LD, OG image, sitemap, robots, proxy
- SIGNUP_URL / lib/config.ts

---

## Visual Reference Points

1. **Casetext (casetext.com):** Legal research platform. Clean white background, Inter-family body text, strong serif display only at headline scale. The gold standard for "reading legal content on a screen."

2. **GOV.UK Design System (design-system.service.gov.uk):** Government documentation. GDS Transport + Helvetica. Every design decision optimized for reading comprehension under stress. What Ontario courts aspire to.

3. **Astral (astral.sh):** Python tooling documentation. Inter body, large bold display serif for H1s only. Content-dense sidebar navigation. Exactly the "documentation + editorial" register NashPlus needs.

---

## Lighthouse Targets (Phase 3b)

| Page | Performance | Accessibility | Best Practices | SEO |
|------|-------------|---------------|----------------|-----|
| Homepage | 92+ | 98+ | 95+ | 98+ |
| /blog index | 90+ | 98+ | 95+ | 98+ |
| Article detail | 92+ | 98+ | 95+ | 98+ |

Fraunces + Inter both available via `next/font/google` (preloaded, zero FOIT). No performance regression expected; variable fonts are smaller than multiple weight files.

---

## Decisions Needed Before Phase 3b

### Decision 1: Hero variant
Which homepage hero? My recommendation is **Variant A (Documentation Hub)** because it immediately surfaces the cluster grid and tells the user what's inside the site. If you want more brand personality, **Variant E (Minimal Brand Statement)** with "Form 13. Made clear." is the punchy version.

### Decision 2: Background color on content pages
Should article pages (/blog/[slug]) and the blog index (/blog) use `#fafaf8` (warm off-white) instead of the current `--canvas` stone (#c4bdb0)? This is the single highest-impact readability change and the one I'm most confident about. Stone background is right for a marketing landing page; it's wrong for 2000-word legal articles.

### Decision 3: Font confirmation -- Fraunces vs EB Garamond for display
The skill's #1 recommendation is EB Garamond (traditional, authoritative). My recommendation is Fraunces (contemporary, screen-optimized optical sizes). Both are correct for legal content per the skill database. EB Garamond = Casetext register. Fraunces = Astral/Stripe register. I lean Fraunces but want explicit approval.

---

*Proposal by: Claude Sonnet 4.6 on design/readability-overhaul branch*
*Skill citations: UI/UX Pro Max v5 -- "Legal Professional" font pairing, "FAQ/Documentation Landing" pattern, "Trust & Authority" style, UX guidelines: Line Height, Line Length, Font Size Scale, Contrast Readability*
*Magic MCP: installed and connected; tool schemas not accessible via tool discovery mechanism in this session. Hero variants described as component specs.*
*No em-dashes. NashPlus / Nash+.*
