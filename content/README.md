# Nash+ Content Frontmatter Contract

Every `.mdx` file in `content/blog/` must begin with a YAML frontmatter block. This table is the spec for content production. All fields marked **required** will cause a build error or missing metadata if absent.

## Field reference

| Field | Type | Required | Default | Notes |
|---|---|---|---|---|
| `title` | string | Yes | -- | Plain text. Used in page `<title>`, OG, JSON-LD. No HTML. |
| `description` | string | Yes | -- | 1-2 sentences. Used in meta description, OG, JSON-LD, article lede. |
| `summary` | string | No | `description` | Shorter card blurb for the blog index grid. |
| `date` | YYYY-MM-DD | Yes | -- | Publication date. |
| `last_reviewed` | YYYY-MM-DD | No | `date` | Date content was last verified for accuracy. Used in JSON-LD `dateModified`. |
| `author` | string | No | `"Nash+"` | Byline text. Appears in article header. Use `"Nash+"` for all editorial content. |
| `category` | enum | Yes | `law-explained` | See category enum below. |
| `cluster` | enum | No | derived | Override the auto-derived cluster if needed. See cluster enum below. |
| `jurisdiction` | string | No | `"ontario"` | Currently always `"ontario"`. Reserved for future multi-province expansion. |
| `tags` | string[] | No | `[]` | Searchable keywords. Lower-case, hyphenated (e.g. `["form-13", "financial-disclosure"]`). |
| `sources` | string[] | No | `[]` | Authoritative citations: statute names, rule numbers, court rule references. Not URLs. |
| `featured` | boolean | No | `false` | One article at a time. Featured article appears at the top of the blog index. |
| `draft` | boolean | No | `false` | `true` = excluded from index, sitemap, and static generation. Accessible by direct URL for preview. |

## Category enum (10 values)

| Value | Cluster | Use when... |
|---|---|---|
| `law-explained` | Concepts | Explaining a legal concept, statute, or right in plain language |
| `how-it-works` | Procedure & Fears | Explaining how a process works without step-by-step instructions |
| `step-by-step` | Forms | Walkthrough for completing a form or procedural task |
| `glossary` | Glossary | Defining a legal term |
| `court-process` | Procedure & Fears | What happens at a hearing, conference, or motion |
| `parenting` | Parenting | Custody, access, parenting plans, child support |
| `legal-aid` | Support & Legal Aid | Duty counsel, LAO certificates, free legal resources |
| `emotional-support` | Support & Legal Aid | Co-parenting dynamics, stress, mental health during proceedings |
| `tools-and-apps` | Tools & Apps | Calculators, apps, automation tools |
| `srl-strategy` | Representing Yourself | Self-represented litigant strategy and advocacy skills |

## Cluster enum (8 values -- auto-derived, rarely set manually)

`forms` | `concepts` | `procedure-and-fears` | `self-representation` | `parenting` | `support` | `tools` | `glossary`

## Example frontmatter

```yaml
---
title: "How to Complete Form 13 Section 3: Assets"
description: "Section 3 of Form 13 requires you to list all assets you owned on the valuation date. This guide walks through each line with plain-language explanations."
summary: "A line-by-line walkthrough for Section 3 of Form 13."
date: 2026-06-01
last_reviewed: 2026-06-01
author: "Nash+"
category: step-by-step
jurisdiction: ontario
tags: ["form-13", "assets", "valuation-date"]
sources: ["Family Law Rules, O. Reg. 114/99", "Family Law Act, R.S.O. 1990, c. F.3"]
featured: false
---
```

---

## MDX visual components

Five reusable components are registered in the MDX components map and available in any `.mdx` article by tag -- no per-article import required. All components use the Nash+ design tokens and are mobile-responsive.

Live preview: `/blog/_component-showcase` (draft, not in public index).

---

### `<Callout>`

A styled emphasis box for notes, tips, warnings, and legal-information reminders.

**Props**

| Prop | Type | Required | Default |
|---|---|---|---|
| `type` | `'note' \| 'tip' \| 'warning' \| 'legal'` | No | `'note'` |
| `title` | string | No | Type-derived (`Note`, `Tip`, `Important`, `Legal information`) |
| `children` | ReactNode | Yes | -- |

**Visual styles**
- `note` -- green-tinted box, green-600 left border, info icon
- `tip` -- lighter green tint, mid-green border, bulb icon
- `warning` -- amber-tinted box, amber border, warning icon
- `legal` -- neutral bordered box, muted border, scales icon

**Usage**

```mdx
<Callout type="note">
  Form 13 is for support claims only. If property division is also at issue, use Form 13.1.
</Callout>

<Callout type="warning" title="Deadline">
  Financial statements must be served at least 30 days before a conference (Family Law Rules, Rule 13(6)).
</Callout>

<Callout type="legal">
  This article provides legal information, not legal advice. For advice specific to your situation, consult a licensed Ontario lawyer.
</Callout>
```

---

### `<ComparisonTable>`

A responsive comparison table with column headers and row headers. Scrolls horizontally on narrow screens.

**Props**

| Prop | Type | Required | Notes |
|---|---|---|---|
| `columns` | `string[]` | Yes | First element is the row-header column label. Use `''` (empty string) if no label is needed for the first column. |
| `rows` | `string[][]` | Yes | Each inner array is one row. First element is the row header (`<th scope="row">`). |
| `caption` | string | No | Displayed below the table as a citation or note. |

**Usage**

```mdx
<ComparisonTable
  columns={["", "Form 13", "Form 13.1"]}
  rows={[
    ["Used for", "Support claims only", "Property division + support"],
    ["Includes property section?", "No", "Yes"],
    ["Schedules required", "Schedule A, B", "Schedule A, B, C"],
  ]}
  caption="Family Law Rules, O. Reg. 114/99, Rule 13"
/>
```

---

### `<ProcessTimeline>`

A vertical numbered step sequence for procedural walkthroughs.

**Props**

| Prop | Type | Required | Notes |
|---|---|---|---|
| `steps` | `Step[]` | Yes | See step shape below. |
| `heading` | string | No | Optional label rendered above the timeline in mono uppercase. |

**Step shape**

```ts
{
  title:       string   // step heading (display italic)
  description: string   // one-paragraph explanation
  aside?:      string   // optional citation or note in mono below the description
}
```

**Usage**

```mdx
<ProcessTimeline
  heading="Stages of an Ontario family proceeding"
  steps={[
    {
      title: "File your application",
      description: "Complete Form 8A and file at the courthouse. Pay the filing fee.",
      aside: "Family Law Rules, Rule 8"
    },
    {
      title: "Serve the other party",
      description: "Serve the filed application within 30 days.",
      aside: "Family Law Rules, Rule 6"
    },
    {
      title: "Case conference",
      description: "The first court event. The judge helps identify issues and explore settlement.",
    },
  ]}
/>
```

---

### `<Checklist>`

A static visual reference checklist. Not interactive -- no browser state, no checkboxes that can be ticked.

**Props**

| Prop | Type | Required | Notes |
|---|---|---|---|
| `items` | `string[]` | Yes | Each string is one checklist item. |
| `heading` | string | No | Optional label above the list in mono uppercase. |

**Usage**

```mdx
<Checklist
  heading="Documents to gather"
  items={[
    "Income tax returns for the current year and the two preceding years",
    "Notices of Assessment for the same three years",
    "Most recent pay stub (within 12 months)",
    "Most recent bank and savings account statements",
    "Most recent credit card, line of credit, and loan statements",
  ]}
/>
```

---

### `<DecisionTree>`

A visual decision aid for branching "if this -- then that" logic. Renders a root question forking into 2-4 outcome branches.

**Props**

| Prop | Type | Required | Notes |
|---|---|---|---|
| `question` | string | Yes | The root decision question displayed at the top. |
| `branches` | `Branch[]` | Yes | 2-4 branches. See branch shape below. |
| `note` | string | No | Footnote below the tree, typically a lawyer-referral or caveat. |

**Branch shape**

```ts
{
  condition:    string   // the "if" label on this branch
  outcome:      string   // the result (displayed in green outcome box)
  outcomeMeta?: string   // optional citation or sub-note below the outcome
}
```

**Usage**

```mdx
<DecisionTree
  question="Which financial statement do I need to file?"
  branches={[
    {
      condition: "Support claims only (no property division)",
      outcome: "File Form 13 -- Financial Statement (Support Claims)",
      outcomeMeta: "Family Law Rules, Rule 13(3.1)(1)",
    },
    {
      condition: "Property division, or property plus support",
      outcome: "File Form 13.1 -- Financial Statement (Property and Support Claims)",
      outcomeMeta: "Family Law Rules, Rule 13(3.1)(2)",
    },
  ]}
  note="If unsure whether property is at issue, review your application or consult a family lawyer."
/>
```

---

## Logo note (for founder)

`public/og-logo.png` is currently a 1x1 transparent placeholder used in JSON-LD structured data. Replace it with the real Nash+ wordmark before launch. The brand mark is forest green `#13342A` with the `+` as the brand symbol.
