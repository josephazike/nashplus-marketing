/**
 * NashPlus design token reference.
 *
 * CSS custom properties are defined in app/globals.css.
 * This file documents the type scale, color semantics, and spacing
 * scale for use in code review and component documentation.
 *
 * Source: docs/design/2026-05-29-redesign-proposal.md
 * Skill: UI/UX Pro Max v5 -- "Editorial Classic" typography,
 *        "Newsletter/Content First" pattern, "Minimalism" style.
 */

// ── Type scale ─────────────────────────────────────────────────────────────────
// All sizes are clamp values; see the CSS globals.css for the exact expressions.
export const TYPE_SCALE = {
  hero:    { font: 'Cormorant Garamond', weight: 300, style: 'italic',  usage: 'Homepage H1 only' },
  display: { font: 'Cormorant Garamond', weight: 600, style: 'normal',  usage: 'Blog index page H1' },
  title:   { font: 'Cormorant Garamond', weight: 600, style: 'italic',  usage: 'Article page H1' },
  cluster: { font: 'Cormorant Garamond', weight: 600, style: 'normal',  usage: 'Cluster section headers' },
  h2:      { font: 'Cormorant Garamond', weight: 600, style: 'normal',  usage: 'Article body H2 (roman, not italic)' },
  h3:      { font: 'Cormorant Garamond', weight: 600, style: 'normal',  usage: 'Article body H3 (roman, not italic)' },
  body:    { font: 'Lora',               weight: 400, style: 'normal',  usage: 'All body copy; line-height 1.88' },
  meta:    { font: 'Geist Mono',         weight: 400, style: 'normal',  usage: 'Tags, dates, reading time (0.625rem min)' },
  label:   { font: 'Geist Mono',         weight: 400, style: 'normal',  usage: 'Nav items, eyebrow text (0.55rem)' },
  cta:     { font: 'Geist Mono',         weight: 400, style: 'normal',  usage: 'Button labels (0.6875rem)' },
} as const

// ── Color semantics ───────────────────────────────────────────────────────────
// Contrast ratios against --canvas (#c4bdb0, luminance 0.513).
export const COLOR_SEMANTICS = {
  '--ink':           { hex: '#1c1c19', contrast: '9.15:1', wcag: 'AAA', usage: 'Primary text; cluster section headers; cluster nav pills' },
  '--ink-muted':     { hex: 'rgba(28,28,25,0.52)', contrast: '~4.5:1', wcag: 'AA',  usage: 'Secondary text; descriptions' },
  '--ink-faint':     { hex: 'rgba(28,28,25,0.30)', contrast: '~2.6:1', wcag: 'FAIL (decorative only)', usage: 'Tertiary metadata: date, reading time' },
  '--green-700':     { hex: '#224631', contrast: '5.66:1', wcag: 'AA',  usage: 'Category tags on cards; internal links; hover borders' },
  '--green-600':     { hex: '#2d5a3d', contrast: '4.26:1', wcag: 'FAIL as text', usage: 'CTA backgrounds (white text on top); decorative accents; CTA strip. NEVER as standalone text color.' },
  '--canvas':        { hex: '#c4bdb0', contrast: 'n/a', wcag: 'background', usage: 'Page background' },
  '--surface':       { hex: 'rgba(28,28,25,0.04)', contrast: 'n/a', wcag: 'n/a', usage: 'Card hover backgrounds' },
  '--border':        { hex: 'rgba(28,28,25,0.14)', contrast: 'n/a', wcag: 'n/a', usage: 'Section dividers' },
} as const

// ── Spacing scale ─────────────────────────────────────────────────────────────
// Defined as CSS custom properties in globals.css.
export const SPACING = {
  1:  '0.25rem',  //  4px -- tight gaps
  2:  '0.5rem',   //  8px -- inline spacing
  3:  '0.75rem',  // 12px -- tag padding
  4:  '1rem',     // 16px -- base unit
  6:  '1.5rem',   // 24px -- component padding
  8:  '2rem',     // 32px -- card padding
  12: '3rem',     // 48px -- small section gap
  16: '4rem',     // 64px -- medium section gap
  24: '6rem',     // 96px -- large section gap
} as const
