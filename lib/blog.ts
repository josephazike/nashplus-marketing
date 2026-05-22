import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

// ── Legacy category type (used by existing 4 posts) ───────────────────────────
export type Category = 'law-explained' | 'how-it-works' | 'step-by-step' | 'glossary'

export const CATEGORY_LABELS: Record<Category, string> = {
  'law-explained': 'Law Explained',
  'how-it-works':  'How It Works',
  'step-by-step':  'Step by Step',
  'glossary':      'Glossary',
}

// ── Content clusters ──────────────────────────────────────────────────────────
// Four clusters that organize the library by reader intent.
// jurisdiction-specific facts (form numbers, rule citations, dollar thresholds)
// live in article frontmatter / body — never hardcoded in cluster definitions.

export type Cluster = 'forms' | 'concepts' | 'procedure-and-fears' | 'glossary'

export const CLUSTER_LABELS: Record<Cluster, string> = {
  'forms':               'Forms',
  'concepts':            'Concepts',
  'procedure-and-fears': 'Procedure & Fears',
  'glossary':            'Glossary',
}

// Maps the legacy Category values to Clusters so existing posts are grouped
// without any frontmatter changes.
const CATEGORY_TO_CLUSTER: Record<Category, Cluster> = {
  'law-explained': 'concepts',
  'how-it-works':  'procedure-and-fears',
  'step-by-step':  'forms',
  'glossary':      'glossary',
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
  date:          string
  last_reviewed: string      // ISO date; falls back to date
  category:      Category
  cluster:       Cluster     // derived from category if not in frontmatter
  jurisdiction:  Jurisdiction
  tags:          string[]    // searchable keywords
  sources:       string[]    // authoritative citations (statute name, rule number, etc.)
  featured:      boolean
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
  return CATEGORY_TO_CLUSTER[cat]
}

// ── Public API ────────────────────────────────────────────────────────────────

export function getAllPostMeta(): PostMeta[] {
  const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.mdx'))
  return files
    .map(filename => {
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
        category,
        cluster:       resolveCluster(data),
        jurisdiction:  (data.jurisdiction as string | undefined) ?? 'ontario',
        tags:          (data.tags       as string[] | undefined) ?? [],
        sources:       (data.sources    as string[] | undefined) ?? [],
        featured:      (data.featured   as boolean | undefined) ?? false,
        readingTime:   readingTime(content),
      } satisfies PostMeta
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPost(slug: string): Post | null {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null
  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)
  const category = (data.category as Category | undefined) ?? 'law-explained'
  return {
    slug,
    title:         data.title       as string,
    description:   data.description as string,
    summary:       (data.summary    as string | undefined) ?? (data.description as string),
    date:          data.date        as string,
    last_reviewed: (data.last_reviewed as string | undefined) ?? (data.date as string),
    category,
    cluster:       resolveCluster(data),
    jurisdiction:  (data.jurisdiction as string | undefined) ?? 'ontario',
    tags:          (data.tags       as string[] | undefined) ?? [],
    sources:       (data.sources    as string[] | undefined) ?? [],
    featured:      (data.featured   as boolean | undefined) ?? false,
    readingTime:   readingTime(content),
    content,
  }
}

export function getAllSlugs(): string[] {
  return fs.readdirSync(BLOG_DIR)
    .filter(f => f.endsWith('.mdx'))
    .map(f => f.replace(/\.mdx$/, ''))
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-CA', {
    year: 'numeric', month: 'long', day: 'numeric',
  })
}

// Returns posts grouped by cluster, preserving sort order within each group.
export function groupByCluster(posts: PostMeta[]): Map<Cluster, PostMeta[]> {
  const order: Cluster[] = ['forms', 'concepts', 'procedure-and-fears', 'glossary']
  const map = new Map<Cluster, PostMeta[]>()
  for (const cluster of order) map.set(cluster, [])
  for (const post of posts) {
    map.get(post.cluster)!.push(post)
  }
  return map
}
