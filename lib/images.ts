import type { Cluster } from '@/lib/blog-display'

interface PexelsPhoto {
  id:  number
  alt: string
}

// Curated Pexels photo IDs mapped to content clusters.
// License: Pexels Free License — free for commercial use, no attribution required.
// https://www.pexels.com/license/
//
// Image selection rules:
//   - NO generic stock lawyers, gavels, scales, or AI families
//   - Warm, human, quiet-determination tone
//   - Contextual to Ontario family-court / self-represented-litigant themes
const CLUSTER_PHOTOS: Record<Cluster, PexelsPhoto[]> = {
  'self-representation': [
    { id: 4050310, alt: 'Person thoughtfully reading information on a laptop at home' },
    { id: 5538323, alt: 'Person studying documents on a laptop at a desk' },
    { id: 4050444, alt: 'Person working through forms on a laptop in a home kitchen' },
    { id: 7034451, alt: 'Person studying at a table with papers and books' },
  ],
  'forms': [
    { id: 7821708, alt: 'Financial documents and forms spread across a desk' },
    { id: 7821541, alt: 'Person carefully reviewing paperwork at a table' },
    { id: 4476375, alt: 'Person writing notes while using a calculator' },
    { id: 4386335, alt: 'Notebook and calculator beside financial documents' },
  ],
  'concepts': [
    { id: 2380263,  alt: 'Person reading carefully through a printed document' },
    { id: 8962448,  alt: 'Documents organized and reviewed on a table' },
    { id: 6693655,  alt: 'Laptop and papers on a wooden desk' },
    { id: 7034451,  alt: 'Person studying from books and notes at a table' },
  ],
  'procedure-and-fears': [
    { id: 14212986, alt: 'Courthouse entrance with stone columns' },
    { id: 15452104, alt: 'Government courthouse facade and front steps' },
    { id: 5326972,  alt: 'Formal government building exterior with columns' },
    { id: 11169862, alt: 'Steps leading up to a formal institutional building' },
  ],
  'parenting': [
    { id: 1250452,  alt: "Child's small hand resting gently in a parent's hand" },
    { id: 9506920,  alt: 'Parent and child holding hands outdoors' },
    { id: 14937141, alt: 'Close-up of parent and children hands together' },
    { id: 33593549, alt: 'Parent and child walking together in an autumn park' },
  ],
  'support': [
    { id: 8927463,  alt: 'Person reviewing budget and financial planning documents at a desk' },
    { id: 11350076, alt: 'Hand using a calculator to work through figures' },
    { id: 6694543,  alt: 'Budget worksheet and calculator on a table' },
    { id: 4386335,  alt: 'Organized financial documents beside a calculator' },
  ],
  'tools': [
    { id: 6801652,  alt: 'Clean home desk with laptop, phone, and organized papers' },
    { id: 4050310,  alt: 'Person using a laptop at home to research and complete forms' },
    { id: 5538323,  alt: 'Person working on a laptop with documents nearby' },
  ],
  'glossary': [
    { id: 2380263,  alt: 'Person carefully reading a printed document' },
    { id: 7034451,  alt: 'Open books and study materials spread on a table' },
    { id: 8962448,  alt: 'Documents laid out and organized on a flat surface' },
  ],
}

// Hero images — warm, welcoming, "you can figure this out" tone
const HERO_PHOTOS: PexelsPhoto[] = [
  { id: 4050310, alt: 'Person thoughtfully studying Ontario family law information on a laptop at home' },
]

// Pexels CDN URL builder.
// next/image rewrites src at request time, so we pass a clean medium-res src.
export function pexelsUrl(id: number, w = 1200): string {
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`
}

// Deterministic (not random) image per article — stable across SSR & client hydration.
function djb2(s: string): number {
  let h = 5381
  for (let i = 0; i < s.length; i++) h = ((h << 5) + h) ^ s.charCodeAt(i)
  return Math.abs(h)
}

export interface PostImage {
  src: string
  alt: string
  pexelsId: number
}

export function getPostImage(slug: string, cluster: Cluster): PostImage {
  const pool  = CLUSTER_PHOTOS[cluster] ?? CLUSTER_PHOTOS.concepts
  const photo = pool[djb2(slug) % pool.length]
  return { src: pexelsUrl(photo.id), alt: photo.alt, pexelsId: photo.id }
}

export function getHeroImage(): PostImage {
  const photo = HERO_PHOTOS[0]
  return { src: pexelsUrl(photo.id, 1600), alt: photo.alt, pexelsId: photo.id }
}
