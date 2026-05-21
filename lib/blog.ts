import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export type Category = 'law-explained' | 'how-it-works' | 'step-by-step' | 'glossary'

export interface PostMeta {
  slug: string
  title: string
  description: string
  date: string
  category: Category
  featured: boolean
  readingTime: number
}

export interface Post extends PostMeta {
  content: string
}

export const CATEGORY_LABELS: Record<Category, string> = {
  'law-explained': 'Law Explained',
  'how-it-works':  'How It Works',
  'step-by-step':  'Step by Step',
  'glossary':      'Glossary',
}

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog')

function readingTime(content: string): number {
  return Math.max(1, Math.ceil(content.trim().split(/\s+/).length / 220))
}

export function getAllPostMeta(): PostMeta[] {
  const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.mdx'))
  return files
    .map(filename => {
      const slug = filename.replace(/\.mdx$/, '')
      const raw  = fs.readFileSync(path.join(BLOG_DIR, filename), 'utf-8')
      const { data, content } = matter(raw)
      return {
        slug,
        title:       data.title       as string,
        description: data.description as string,
        date:        data.date        as string,
        category:    data.category    as Category,
        featured:    (data.featured   as boolean | undefined) ?? false,
        readingTime: readingTime(content),
      } satisfies PostMeta
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPost(slug: string): Post | null {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null
  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)
  return {
    slug,
    title:       data.title       as string,
    description: data.description as string,
    date:        data.date        as string,
    category:    data.category    as Category,
    featured:    (data.featured   as boolean | undefined) ?? false,
    readingTime: readingTime(content),
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
