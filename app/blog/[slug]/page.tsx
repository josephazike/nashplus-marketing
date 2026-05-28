import type { Metadata } from 'next'
import { notFound }     from 'next/navigation'
import Link             from 'next/link'
import { MDXRemote }    from 'next-mdx-remote/rsc'
import remarkGfm        from 'remark-gfm'
import rehypeSlug       from 'rehype-slug'
import { getPost, getAllSlugs, formatDate, CATEGORY_LABELS } from '@/lib/blog'
import type { Category } from '@/lib/blog'
import { ContentCTA }   from '@/components/ContentCTA'
import {
  Callout,
  ComparisonTable,
  ProcessTimeline,
  Checklist,
  DecisionTree,
} from '@/components/mdx'

// Redesign colors for original 4; new additions for extended taxonomy.
const CATEGORY_COLORS: Record<Category, string> = {
  'law-explained':     'var(--green-600)',
  'how-it-works':      '#4a7c5e',
  'step-by-step':      '#3d6a8a',
  'glossary':          '#7a5a8a',
  'court-process':     '#3d7a8a',
  'parenting':         '#5a7a3d',
  'legal-aid':         '#4a7c5e',
  'emotional-support': '#7a5a7a',
  'tools-and-apps':    '#3d6a7a',
  'srl-strategy':      '#7a6a3d',
}

export async function generateStaticParams() {
  return getAllSlugs().map(slug => ({ slug }))
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return {}
  return {
    title:       `${post.title} — NashPlus`,
    description: post.description,
    openGraph: {
      title:         post.title,
      description:   post.description,
      url:           `https://nashplus.dev/blog/${post.slug}`,
      siteName:      'Nash+',
      type:          'article',
      publishedTime: post.date,
    },
    twitter: {
      card:        'summary_large_image',
      title:       post.title,
      description: post.description,
    },
  }
}

const mdxComponents = {
  // ── Reusable article components ────────────────────────────────────────────
  Callout,
  ComparisonTable,
  ProcessTimeline,
  Checklist,
  DecisionTree,
  // ── Prose element overrides ────────────────────────────────────────────────
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 style={{
      fontFamily:    'var(--font-display)',
      fontSize:      'clamp(1.5rem, 3vw, 2.1rem)',
      fontWeight:    600,
      fontStyle:     'italic',
      color:         'var(--ink)',
      letterSpacing: '-0.015em',
      lineHeight:    1.2,
      margin:        '3rem 0 1rem',
      paddingTop:    '0.25rem',
      borderTop:     '1px solid var(--border)',
    }} {...props} />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 style={{
      fontFamily:    'var(--font-display)',
      fontSize:      'clamp(1.2rem, 2.5vw, 1.55rem)',
      fontWeight:    600,
      fontStyle:     'italic',
      color:         'var(--ink)',
      letterSpacing: '-0.01em',
      lineHeight:    1.3,
      margin:        '2.25rem 0 0.75rem',
    }} {...props} />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p style={{
      fontFamily: 'var(--font-body)',
      fontSize:   'clamp(1rem, 1.8vw, 1.125rem)',
      fontWeight: 400,
      color:      'var(--ink)',
      lineHeight: 1.82,
      margin:     '0 0 1.5rem',
    }} {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul style={{
      fontFamily:  'var(--font-body)',
      fontSize:    'clamp(1rem, 1.8vw, 1.125rem)',
      fontWeight:  400,
      color:       'var(--ink)',
      lineHeight:  1.82,
      margin:      '0 0 1.5rem',
      paddingLeft: '1.5rem',
    }} {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol style={{
      fontFamily:  'var(--font-body)',
      fontSize:    'clamp(1rem, 1.8vw, 1.125rem)',
      fontWeight:  400,
      color:       'var(--ink)',
      lineHeight:  1.82,
      margin:      '0 0 1.5rem',
      paddingLeft: '1.5rem',
    }} {...props} />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li style={{ marginBottom: '0.45rem' }} {...props} />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote style={{
      borderLeft:  '3px solid var(--green-600)',
      paddingLeft: '1.5rem',
      margin:      '2rem 0',
      fontStyle:   'italic',
      color:       'var(--ink-muted)',
    }} {...props} />
  ),
  hr: () => (
    <hr style={{
      border:    'none',
      borderTop: '1px solid var(--border)',
      margin:    '2.5rem 0',
    }} />
  ),
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong style={{ fontWeight: 700, color: 'var(--ink)' }} {...props} />
  ),
  em: (props: React.HTMLAttributes<HTMLElement>) => (
    <em style={{ fontStyle: 'italic', color: 'var(--ink-muted)' }} {...props} />
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <code style={{
      fontFamily:      'var(--font-mono)',
      fontSize:        '0.85em',
      backgroundColor: 'var(--surface-alt)',
      color:           'var(--green-700)',
      padding:         '0.1em 0.35em',
      borderRadius:    '2px',
    }} {...props} />
  ),
}

export default async function BlogPost(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()

  const canonicalUrl = `https://nashplus.dev/blog/${post.slug}`
  const nashplusOrg = { '@type': 'Organization', name: 'NashPlus', url: 'https://nashplus.dev' }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type':            'BlogPosting',
        headline:           post.title,
        description:        post.description,
        datePublished:      post.date,
        dateModified:       post.last_reviewed,
        inLanguage:         'en-CA',
        mainEntityOfPage:   canonicalUrl,
        author:             post.author === 'Nash+'
          ? nashplusOrg
          : { '@type': 'Person', name: post.author },
        publisher: {
          '@type': 'Organization',
          name:    'NashPlus',
          url:     'https://nashplus.dev',
          logo:    { '@type': 'ImageObject', url: 'https://nashplus.dev/og-logo.png' },
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home',      item: 'https://nashplus.dev' },
          { '@type': 'ListItem', position: 2, name: 'Resources', item: 'https://nashplus.dev/blog' },
          { '@type': 'ListItem', position: 3, name: post.title,  item: canonicalUrl },
        ],
      },
    ],
  }

  return (
    <div style={{ minHeight: '100vh', paddingBottom: '6rem' }}>

      {/* ── JSON-LD ───────────────────────────────────────────── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── Back link ──────────────────────────────────────────── */}
      <div style={{ padding: 'clamp(2rem, 5vw, 3.5rem) var(--gutter) 0' }}>
        <Link href="/blog" style={{
          fontFamily:     'var(--font-mono)',
          fontSize:       '0.55rem',
          letterSpacing:  '0.3em',
          textTransform:  'uppercase',
          color:          'var(--ink-muted)',
          textDecoration: 'none',
          transition:     'color 200ms',
        }}>
          ← Resources
        </Link>
      </div>

      {/* ── Article header ─────────────────────────────────────── */}
      <header style={{ padding: 'clamp(2.5rem, 5vw, 4rem) var(--gutter) 0' }}>
        <div style={{ maxWidth: '740px' }}>
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
            <span style={{
              fontFamily:    'var(--font-mono)',
              fontSize:      '0.55rem',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color:         CATEGORY_COLORS[post.category],
            }}>
              {CATEGORY_LABELS[post.category]}
            </span>
            <span style={{
              fontFamily:    'var(--font-mono)',
              fontSize:      '0.55rem',
              letterSpacing: '0.2em',
              color:         'var(--ink-faint)',
            }}>
              {formatDate(post.date)}
            </span>
            <span style={{
              fontFamily:    'var(--font-mono)',
              fontSize:      '0.55rem',
              letterSpacing: '0.2em',
              color:         'var(--ink-faint)',
            }}>
              {post.readingTime} min read
            </span>
            <span style={{
              fontFamily:    'var(--font-mono)',
              fontSize:      '0.55rem',
              letterSpacing: '0.2em',
              color:         'var(--ink-faint)',
            }}>
              {post.author}
            </span>
          </div>
          <h1 style={{
            fontFamily:    'var(--font-display)',
            fontSize:      'clamp(2.25rem, 5.5vw, 4.25rem)',
            fontWeight:    600,
            fontStyle:     'italic',
            color:         'var(--ink)',
            lineHeight:    1.06,
            letterSpacing: '-0.02em',
            margin:        '0 0 1.5rem',
          }}>
            {post.title}
          </h1>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize:   'clamp(1.05rem, 2vw, 1.25rem)',
            fontWeight: 400,
            fontStyle:  'italic',
            color:      'var(--ink-muted)',
            lineHeight: 1.65,
            margin:     0,
          }}>
            {post.description}
          </p>
          <div style={{
            width:           '48px',
            height:          '3px',
            backgroundColor: 'var(--green-600)',
            margin:          '2rem 0 0',
          }} />
        </div>
      </header>

      {/* ── Article body ───────────────────────────────────────── */}
      <article style={{
        padding:  'clamp(2.5rem, 5vw, 4rem) var(--gutter)',
        maxWidth: 'calc(740px + var(--gutter) * 2)',
      }}>
        <div style={{ maxWidth: '740px' }}>
          <MDXRemote
            source={post.content}
            components={mdxComponents}
            options={{
              blockJS: false,
              mdxOptions: {
                remarkPlugins: [remarkGfm],
                rehypePlugins: [rehypeSlug],
              },
            }}
          />
          <ContentCTA style={{ marginTop: 'clamp(2.5rem, 5vw, 4rem)' }} />
        </div>
      </article>

      {/* ── Footer disclaimer ──────────────────────────────────── */}
      <footer style={{
        margin:     '0 var(--gutter)',
        paddingTop: '2rem',
        borderTop:  '1px solid var(--border-light)',
        maxWidth:   '740px',
      }}>
        <p style={{
          fontFamily:    'var(--font-mono)',
          fontSize:      '0.5rem',
          letterSpacing: '0.15em',
          color:         'var(--ink-muted)',
          lineHeight:    1.85,
        }}>
          NashPlus provides legal information and document automation. It is not a law firm
          and does not provide legal advice. It is not a substitute for advice from a licensed
          Ontario lawyer.
        </p>
      </footer>

    </div>
  )
}
