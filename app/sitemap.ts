import type { MetadataRoute } from 'next'
import { getAllPostMeta } from '@/lib/blog'

const BASE = 'https://nashplus.dev'

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPostMeta()

  const postEntries: MetadataRoute.Sitemap = posts.map(post => ({
    url:              `${BASE}/blog/${post.slug}`,
    lastModified:     new Date(post.date),
    changeFrequency:  'monthly',
    priority:         0.8,
  }))

  return [
    { url: BASE,              lastModified: new Date(), changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${BASE}/blog`,    lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.9 },
    ...postEntries,
  ]
}
