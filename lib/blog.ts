import fs   from 'fs'
import path from 'path'
import matter from 'gray-matter'

// ── Re-export client-safe types and display utilities ─────────────────────────
// Types, labels, and formatDate live in blog-display.ts (no fs/path imports)
// so they can be safely imported by client components.
// Server-side consumers can import from either file; blog.ts re-exports all.
export type {
  Category,
  Cluster,
  Jurisdiction,
  PostMeta,
} from '@/lib/blog-display'
export {
  CATEGORY_LABELS,
  CLUSTER_LABELS,
  formatDate,
} from '@/lib/blog-display'

import type { Category, Cluster, PostMeta } from '@/lib/blog-display'

// ── Content clusters ──────────────────────────────────────────────────────────
// Category -> Cluster mapping:
//   law-explained     -> concepts
//   how-it-works      -> procedure-and-fears
//   step-by-step      -> forms
//   glossary          -> glossary
//   court-process     -> procedure-and-fears
//   parenting         -> parenting
//   legal-aid         -> support
//   emotional-support -> support
//   tools-and-apps    -> tools
//   srl-strategy      -> self-representation
//
// Display order: SRL Playbook first (differentiator), Support, Parenting, then rest.

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

// Canonical display order -- exported so blog index and groupByCluster stay in sync.
// SRL Playbook (self-representation) leads as the product differentiator.
// Support & Legal Aid second; Parenting third. Remaining clusters follow.
export const CLUSTER_ORDER: Cluster[] = [
  'self-representation',
  'support',
  'parenting',
  'forms',
  'concepts',
  'procedure-and-fears',
  'tools',
  'glossary',
]

// ── Post interface (server-only: includes MDX content string) ─────────────────
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
  const meta = parseMeta(`${slug}.mdx`)
  const { content } = matter(raw)
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
