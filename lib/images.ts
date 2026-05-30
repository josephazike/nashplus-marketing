import type { Cluster } from '@/lib/blog-display'

interface PexelsPhoto {
  id:  number
  alt: string
}

// Curated Pexels photo IDs mapped to content clusters.
// License: Pexels Free License — free for commercial use, no attribution required.
// https://www.pexels.com/license/
//
// Hard rules: NO gavels / suited-lawyer stock / AI families / posed corporate portraits / US currency.
// Tone: warm, human, quiet-determination.
//
// Pool sizes (article counts as of 2026-05-30):
//   self-representation: 12 articles → 14 photos
//   support:             12 articles → 14 photos
//   parenting:            9 articles → 11 photos
//   procedure-and-fears:  8 articles → 10 photos
//   glossary:             5 articles →  7 photos
//   concepts:             5 articles →  7 photos
//   tools:                4 articles →  6 photos
//   forms:                3 articles →  7 photos
//
// Assignment: getPostImage(slug, cluster, index) → pool[index % poolSize].
// Because poolSize >= articleCount, index 0…(articleCount-1) map to DISTINCT entries.
// Add entries to the pool whenever a cluster grows past its current pool size.
const CLUSTER_PHOTOS: Record<Cluster, PexelsPhoto[]> = {

  // ── Representing Yourself (12 articles → 14 photos) ─────────────────────
  // Person studying at home, reading, taking notes, laptop research
  'self-representation': [
    { id: 4050310, alt: 'Person thoughtfully reading information on a laptop at home' },
    { id: 5538323, alt: 'Person studying legal information on a laptop at a desk' },
    { id: 4050444, alt: 'Person working through forms on a laptop in a home kitchen' },
    { id: 8085932, alt: 'Person reading and reviewing a printed document at a desk' },
    { id: 4144923, alt: 'Person writing notes in a notebook while studying at home' },
    { id: 6929223, alt: 'Student reviewing a textbook and writing notes at a table' },
    { id: 4240497, alt: 'Person writing carefully in a notebook at a desk' },
    { id: 6958506, alt: 'Hands typing on a laptop surrounded by study materials' },
    { id: 6549598, alt: 'Person taking notes from a book under a desk lamp' },
    { id: 6929190, alt: 'Person writing focused notes in a notebook' },
    { id: 7063767, alt: 'Person writing notes in a notebook at a home office desk' },
    { id: 6238011, alt: 'Person writing carefully in a workbook while studying' },
    { id: 5793952, alt: 'Person sitting quietly in a living room with natural light' },
    { id: 7034451, alt: 'Person studying at a table with papers and books spread out' },
  ],

  // ── Forms (3 articles → 7 photos) ───────────────────────────────────────
  // Paperwork, documents on desk, completing and signing forms — no posed lawyers
  'forms': [
    { id: 7821708,  alt: 'Financial forms and documents spread carefully across a desk' },
    { id: 7821541,  alt: 'Person reviewing paperwork and documents at a table' },
    { id: 4476375,  alt: 'Person writing notes while working with a calculator' },
    { id: 4386335,  alt: 'Notebook open beside financial documents and a calculator' },
    { id: 30268252, alt: 'Hand signing a legal document on a wooden table with a pen' },
    { id: 8730987,  alt: 'Close-up of a hand signing a document with a fountain pen' },
    { id: 8730374,  alt: 'Person carefully completing a written document at a desk' },
  ],

  // ── Law Explained (5 articles → 7 photos) ───────────────────────────────
  // Reading, books, study materials, comprehension — no dollar bills
  'concepts': [
    { id: 2380263, alt: 'Person carefully reading and reviewing a printed document' },
    { id: 8962448, alt: 'Documents and information organized on a flat surface' },
    { id: 336407,  alt: 'Reading glasses resting on an open book at a desk' },
    { id: 8605038, alt: 'Reading glasses on top of an open book in natural light' },
    { id: 6549352, alt: 'Person holding a pen and studying from an open book' },
    { id: 3109168, alt: 'Magnifying glass and reading glasses resting on an open book' },
    { id: 6929223, alt: 'Person reviewing a textbook with notes beside them' },
  ],

  // ── Court Process (8 articles → 10 photos) ───────────────────────────────
  // Courthouse exteriors, formal buildings, filing documents
  'procedure-and-fears': [
    { id: 14212986, alt: 'Courthouse entrance with formal stone columns' },
    { id: 15452104, alt: 'Government courthouse facade and front steps' },
    { id: 5326972,  alt: 'Formal government building exterior with stone columns' },
    { id: 11169862, alt: 'Wide stone steps leading up to an institutional building' },
    { id: 15939941, alt: 'Supreme court building under open sky' },
    { id: 6610670,  alt: 'Supreme court building facade with columns and steps' },
    { id: 8730987,  alt: 'Close-up of a hand signing a formal court document' },
    { id: 8730374,  alt: 'Person completing a written document at a desk' },
    { id: 8085932,  alt: 'Person reading through court papers carefully at a desk' },
    { id: 4240497,  alt: 'Person writing notes carefully in a notebook' },
  ],

  // ── Parenting (9 articles → 11 photos) ───────────────────────────────────
  // Parent-child connection, children at play — NO posed portraits, NO baby-feet shots
  'parenting': [
    { id: 1250452,  alt: "Child's small hand resting gently in a parent's hand" },
    { id: 9506920,  alt: 'Parent and child holding hands together outdoors' },
    { id: 14937141, alt: 'Close-up of parent and children hands held together' },
    { id: 33593549, alt: 'Parent and child walking hand in hand in an autumn park' },
    { id: 236164,   alt: 'Child holding a parent\'s hand while walking' },
    { id: 8765841,  alt: 'Mother and child holding hands walking along a forest path' },
    { id: 2253879,  alt: 'Family walking together on a sunny outdoor path' },
    { id: 3661351,  alt: 'Young child in dungarees playing with colourful blocks' },
    { id: 3661342,  alt: 'Toddler in teal dungarees building with colourful blocks' },
    { id: 7269573,  alt: 'Young child playing with wooden educational toys indoors' },
    { id: 3661339,  alt: 'Child building with colourful blocks on the floor' },
  ],

  // ── Support & Legal Aid (12 articles → 14 photos) ────────────────────────
  // Budget/financial planning (no US cash), thoughtful person, getting help.
  // Covers both legal-aid and emotional-support category articles.
  'support': [
    { id: 8927463,  alt: 'Person reviewing financial planning documents at a desk with a laptop' },
    { id: 11350076, alt: 'Hand pressing keys on a calculator while working through figures' },
    { id: 4386335,  alt: 'Open notebook and calculator on a desk with financial documents' },
    { id: 7054399,  alt: 'Minimalist desk with budget planning documents and coloured pens' },
    { id: 6694866,  alt: 'Hand of a person using a calculator for financial planning' },
    { id: 6863260,  alt: 'Smartphone placed on top of organized documents on a desk' },
    { id: 4476375,  alt: 'Person writing notes while using a calculator at a desk' },
    { id: 9159661,  alt: 'Person holding a pen and a notebook beside a bright window' },
    { id: 2437901,  alt: 'Person sitting quietly by a window in calm natural light' },
    { id: 5793952,  alt: 'Person sitting in a living room in soft natural light' },
    { id: 6929190,  alt: 'Person writing focused notes in a notebook at a desk' },
    { id: 4240497,  alt: 'Person writing carefully in a notebook' },
    { id: 7504780,  alt: 'Close-up of a hand signing a form with a pen' },
    { id: 8730374,  alt: 'Person carefully completing a written document at a desk' },
  ],

  // ── Tools & Apps (4 articles → 6 photos) ─────────────────────────────────
  // Organized desk, laptop research, productivity
  'tools': [
    { id: 6801652,  alt: 'Clean home desk with laptop, phone, and neatly organized papers' },
    { id: 6958506,  alt: 'Top-down view of hands typing on a laptop with study materials' },
    { id: 4050310,  alt: 'Person researching and reading information on a laptop at home' },
    { id: 4240497,  alt: 'Person writing in a notebook at a tidy desk' },
    { id: 5538323,  alt: 'Person working through information on a laptop with documents nearby' },
    { id: 9159661,  alt: 'Person with pen and notebook, organized and focused at a desk' },
  ],

  // ── Glossary (5 articles → 7 photos) ─────────────────────────────────────
  // Books, reading glasses, reference material — dictionary/definition theme
  'glossary': [
    { id: 336407,   alt: 'Reading glasses resting on the pages of an open book' },
    { id: 8605038,  alt: 'Reading glasses placed on an open book in soft light' },
    { id: 6549352,  alt: 'Person holding a pen while reading closely from an open book' },
    { id: 3109168,  alt: 'Magnifying glass and eyeglasses resting on an open reference book' },
    { id: 29596616, alt: 'Cosy reading setup with an open book, glasses, and a journal' },
    { id: 4240497,  alt: 'Person writing notes from a reference document in a notebook' },
    { id: 8085932,  alt: 'Person reading through a document carefully at a desk' },
  ],
}

// Pexels CDN URL — next/image handles optimization and resizing on delivery.
export function pexelsUrl(id: number, w = 1200): string {
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`
}

export interface PostImage {
  src:      string
  alt:      string
  pexelsId: number
}

// Index-based unique assignment. `index` is the article's 0-based position
// within its cluster grid. pool[index % poolSize] is unique for every index
// in 0…(articleCount-1) because poolSize >= articleCount.
export function getPostImage(slug: string, cluster: Cluster, index: number): PostImage {
  const pool  = CLUSTER_PHOTOS[cluster] ?? CLUSTER_PHOTOS.concepts
  const photo = pool[index % pool.length]
  return { src: pexelsUrl(photo.id), alt: photo.alt, pexelsId: photo.id }
}

// Hero: warm, welcoming — person at laptop at home.
export function getHeroImage(): PostImage {
  const photo = CLUSTER_PHOTOS['self-representation'][0]
  return {
    src:      pexelsUrl(photo.id, 1600),
    alt:      'Person thoughtfully studying Ontario family law guidance on a laptop at home',
    pexelsId: photo.id,
  }
}

// Slug-based hash for callers without an index (OG images, etc.).
// Repeats are acceptable there since each OG image is for one article only.
function djb2(s: string): number {
  let h = 5381
  for (let i = 0; i < s.length; i++) h = ((h << 5) + h) ^ s.charCodeAt(i)
  return Math.abs(h)
}
export function getPostImageBySlug(slug: string, cluster: Cluster): PostImage {
  const pool  = CLUSTER_PHOTOS[cluster] ?? CLUSTER_PHOTOS.concepts
  const photo = pool[djb2(slug) % pool.length]
  return { src: pexelsUrl(photo.id), alt: photo.alt, pexelsId: photo.id }
}
