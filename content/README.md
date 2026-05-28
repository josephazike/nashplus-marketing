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

## Logo note (for founder)

`public/og-logo.png` is currently a 1x1 transparent placeholder used in JSON-LD structured data. Replace it with the real Nash+ wordmark before launch. The brand mark is forest green `#13342A` with the `+` as the brand symbol.
