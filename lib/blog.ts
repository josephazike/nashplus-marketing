import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

// ── Category taxonomy ─────────────────────────────────────────────────────────
// Ordered by expected corpus size (original 4 first for backwards compat).
export type Category =
  | 'law-explained'     // legal concepts and statutes explained in plain language
  | 'how-it-works'      // process explanations (not step-by-step instructions)
  | 'step-by-step'      // form-completion and procedural walkthroughs
  | 'glossary'          // term definitions
  | 'court-process'     // what happens inside court — hearings, conferences, motions
  | 'parenting'         // custody, access, parenting plans, child support
  | 'legal-aid'         // duty counsel, LAO certificates, free legal resources
  | 'emotional-support' // navigating stress, co-parenting dynamics, mental health
  | 'tools-and-apps'    // calculators, apps, automation tools
  | 'srl-strategy'      // self-represented litigant strategy and advocacy skills

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

// ── Content clusters ──────────────────────────────────────────────────────────
// Clusters organize the library by reader intent — broad sections of the
// resource centre. Each article belongs to exactly one cluster, derived
// from its category unless overridden in frontmatter.
//
// Category -> Cluster mapping:
//   law-explained     -> concepts          (understanding the law)
//   how-it-works      -> procedure-and-fears (what happens in the process)
//   step-by-step      -> forms             (fill out this form / do this task)
//   glossary          -> glossary          (look up a term)
//   court-process     -> procedure-and-fears (inside the courtroom)
//   parenting         -> parenting         (children and parenting arrangements)
//   legal-aid         -> support           (finding help)
//   emotional-support -> support           (coping and co-parenting dynamics)
//   tools-and-apps    -> tools             (software and calculators)
//   srl-strategy      -> self-representation (advocacy skills for SRLs)
//
// Display order: forms | concepts | procedure-and-fears | self-representation
//                | parenting | support | tools | glossary

export type Cluster =
  | 'forms'
  | 'concepts'
  | 'procedure-and-fears'
  | 'self-representation'
  | 'parenting'
  | 'support'
  | 'tools'
  | 'glossary'

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

// Canonical display order — exported so blog index and groupByCluster stay in sync.
export const CLUSTER_ORDER: Cluster[] = [
  'forms',
  'concepts',
  'procedure-and-fears',
  'self-representation',
  'parenting',
  'support',
  'tools',
  'glossary',
]

const CATEGORY_TO_CLUSTER: Record<Category, Cluster> = {
  'law-explained':     'concepts',
  'how-it-works':      'procedure-and-fears',
  'step-by-step':      'forms',
  'glossary':          'glossary',
  'court-process':     'procedure-and-fears',
  'parenting':         'parenting',
  'legal-aid':         'support',
  'emotional-support': 'support',
  'tools-and-apps':    'tools',
  'srl-strategy':      'self-representation',
}

// ── Jurisdiction ──────────────────────────────────────────────────────────────
// Every article declares a jurisdiction. Currently always 'ontario'.
// To add a new province:
//   1. Write articles with `jurisdiction: 'bc'` in frontmatter.
//   2. Add IP-detection logic in middleware (e.g., read Vercel x-vercel-ip-country
//      header, resolve to province, set a cookie or header).
//   3. In the blog index server component, read that header/cookie and call
//      `getAllPostMeta().filter(p => p.jurisdiction === detectedJurisdiction)`.
//   No component rewrites required — components render whatever content provides.

export type Jurisdiction = string // 'ontario' | 'bc' | 'ab' | ...

// ── PostMeta ──────────────────────────────────────────────────────────────────
export interface PostMeta {
  slug:          string
  title:         string
  description:   string
  summary:       string      // short card summary; falls back to description
  date:          string      // ISO date (YYYY-MM-DD)
  last_reviewed: string      // ISO date; falls back to date; used in JSON-LD dateModified
  author:        string      // byline; defaults to "Nash+"
  category:      Category
  cluster:       Cluster     // derived from category if not in frontmatter
  jurisdiction:  Jurisdiction
  tags:          string[]    // searchable keywords
  sources:       string[]    // authoritative citations (statute name, rule number, etc.)
  featured:      boolean
  draft:         boolean     // true = excluded from index, sitemap, and static params
  readingTime:   number
}

export interface Post extends PostMeta {
  content: string
}

// ── Helpers ───────────────────────────────────────────────────────────────────

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog')

function readingTime(content: string): number {
  return Math.max(1, Math.ceil(content.trim().split(/\s+/).length / 220))
}

function resolveCluster(data: Record<string, unknown>): Cluster {
  if (data.cluster) return data.cluster as Cluster
  const cat = (data.category as Category | undefined) ?? 'law-explained'
  return CATEGORY_TO_CLUSTER[cat] ?? 'concepts'
}

// ── Public API ────────────────────────────────────────────────────────────────

function parseMeta(filename: string): PostMeta {
  const slug = filename.replace(/\.mdx$/, '')
  const raw  = fs.readFileSync(path.join(BLOG_DIR, filename), 'utf-8')
  const { data, content } = matter(raw)
  const category = (data.category as Category | undefined) ?? 'law-explained'
  return {
    slug,
    title:         data.title       as string,
    description:   data.description as string,
    summary:       (data.summary    as string | undefined) ?? (data.description as string),
    date:          data.date        as string,
    last_reviewed: (data.last_reviewed as string | undefined) ?? (data.date as string),
    author:        (data.author     as string | undefined) ?? 'Nash+',
    category,
    cluster:       resolveCluster(data),
    jurisdiction:  (data.jurisdiction as string | undefined) ?? 'ontario',
    tags:          (data.tags       as string[] | undefined) ?? [],
    sources:       (data.sources    as string[] | undefined) ?? [],
    featured:      (data.featured   as boolean | undefined) ?? false,
    draft:         (data.draft      as boolean | undefined) ?? false,
    readingTime:   readingTime(content),
  } satisfies PostMeta
}

export function getAllPostMeta(): PostMeta[] {
  return fs.readdirSync(BLOG_DIR)
    .filter(f => f.endsWith('.mdx'))
    .map(parseMeta)
    .filter(p => !p.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

// Returns the post including draft posts (accessible by direct URL for preview).
export function getPost(slug: string): Post | null {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null
  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)
  const meta = parseMeta(`${slug}.mdx`)
  return { ...meta, content }
}

// Returns only non-draft slugs (used for static param generation and sitemap).
export function getAllSlugs(): string[] {
  return fs.readdirSync(BLOG_DIR)
    .filter(f => f.endsWith('.mdx'))
    .map(parseMeta)
    .filter(p => !p.draft)
    .map(p => p.slug)
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-CA', {
    year: 'numeric', month: 'long', day: 'numeric',
  })
}

// Returns posts grouped by cluster in CLUSTER_ORDER, preserving sort order within each group.
export function groupByCluster(posts: PostMeta[]): Map<Cluster, PostMeta[]> {
  const map = new Map<Cluster, PostMeta[]>()
  for (const cluster of CLUSTER_ORDER) map.set(cluster, [])
  for (const post of posts) {
    const bucket = map.get(post.cluster)
    if (bucket) bucket.push(post)
  }
  return map
}
