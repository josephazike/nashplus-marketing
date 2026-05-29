/**
 * Client-safe display utilities extracted from lib/blog.ts.
 * No Node.js imports (no fs, no path) -- safe to import in client components.
 * lib/blog.ts re-exports everything from here for server-side consumers.
 */

// ── Types (duplicated here so client components never import from blog.ts) ────

export type Category =
  | 'law-explained'
  | 'how-it-works'
  | 'step-by-step'
  | 'glossary'
  | 'court-process'
  | 'parenting'
  | 'legal-aid'
  | 'emotional-support'
  | 'tools-and-apps'
  | 'srl-strategy'

export type Cluster =
  | 'forms'
  | 'concepts'
  | 'procedure-and-fears'
  | 'self-representation'
  | 'parenting'
  | 'support'
  | 'tools'
  | 'glossary'

export type Jurisdiction = string

export interface PostMeta {
  slug:          string
  title:         string
  description:   string
  summary:       string
  date:          string
  last_reviewed: string
  author:        string
  category:      Category
  cluster:       Cluster
  jurisdiction:  Jurisdiction
  tags:          string[]
  sources:       string[]
  featured:      boolean
  draft:         boolean
  readingTime:   number
}

// ── Display constants ──────────────────────────────────────────────────────────

export const CATEGORY_LABELS: Record<Category, string> = {
  'law-explained':     'Law Explained',
  'how-it-works':      'How It Works',
  'step-by-step':      'Step by Step',
  'glossary':          'Glossary',
  'court-process':     'Court Process',
  'parenting':         'Parenting',
  'legal-aid':         'Legal Aid',
  'emotional-support': 'Emotional Support',
  'tools-and-apps':    'Tools & Apps',
  'srl-strategy':      'SRL Strategy',
}

export const CLUSTER_LABELS: Record<Cluster, string> = {
  'forms':               'Forms',
  'concepts':            'Concepts',
  'procedure-and-fears': 'Procedure & Fears',
  'self-representation': 'Representing Yourself',
  'parenting':           'Parenting',
  'support':             'Support & Legal Aid',
  'tools':               'Tools & Apps',
  'glossary':            'Glossary',
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-CA', {
    year: 'numeric', month: 'long', day: 'numeric',
  })
}
