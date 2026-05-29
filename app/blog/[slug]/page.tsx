import type { Metadata } from 'next'
import { notFound }     from 'next/navigation'
import Link             from 'next/link'
import { MDXRemote }    from 'next-mdx-remote/rsc'
import remarkGfm        from 'remark-gfm'
import rehypeSlug       from 'rehype-slug'
import { getPost, getAllSlugs, formatDate, CATEGORY_LABELS } from '@/lib/blog'
import type { Category } from '@/lib/blog'

// Escape <, >, & so JSON-LD strings cannot break out of the script tag.
function safeJsonLd(obj: unknown): string {
  return JSON.stringify(obj)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026')
}
import { ContentCTA }   from '@/components/ContentCTA'
import { SiteFooter }   from '@/components/SiteFooter'
import {
  Callout,
  ComparisonTable,
  ProcessTimeline,
  Checklist,
  DecisionTree,
} from '@/components/mdx'

const CATEGORY_COLORS: Record<Category, string> = {
  'law-explained':     'var(--green-700)',
  'how-it-works':      'var(--green-700)',
  'step-by-step':      'var(--green-700)',
  'glossary':          'var(--green-700)',
  'court-process':     'var(--green-700)',
  'parenting':         'var(--green-700)',
  'legal-aid':         'var(--green-700)',
  'emotional-support': 'var(--green-700)',
  'tools-and-apps':    'var(--green-700)',
  'srl-strategy':      'var(--green-700)',
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
  Callout,
  ComparisonTable,
  ProcessTimeline,
  Checklist,
  DecisionTree,
  // ── Prose overrides ────────────────────────────────────────────────────────
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 style={{
      fontFamily:    'var(--font-display)',
      fontSize:      'clamp(1.5rem, 3vw, 2.1rem)',
      fontWeight:    600,
      fontStyle:     'normal',  // roman -- not italic (Decision 2)
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
      fontStyle:     'normal',  // roman -- not italic (Decision 2)
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
      lineHeight: 1.88,  // increased from 1.82 for long-form legal text
      margin:     '0 0 1.5rem',
    }} {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul style={{
      fontFamily:  'var(--font-body)',
      fontSize:    'clamp(1rem, 1.8vw, 1.125rem)',
      fontWeight:  400,
      color:       'var(--ink)',
      lineHeight:  1.88,
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
      lineHeight:  1.88,
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
  // Internal link treatment: green-700 underline, subtle decoration
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a style={{
      color:                  'var(--green-700)',
      textDecoration:         'underline',
      textUnderlineOffset:    '3px',
      textDecorationColor:    'var(--green-200)',
      transition:             'text-decoration-color 200ms',
    }}
    className="prose-link"
    {...props} />
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
    <div style={{ minHeight: '100vh', paddingBottom: '4rem' }}>

      {/* ── JSON-LD ───────────────────────────────────────────── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }}
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
          &#8592; Resources
        </Link>
      </div>

      {/* ── Article header ─────────────────────────────────────── */}
      {/* Order: H1 title first, then description lede, then divider, then metadata. */}
      {/* Rationale: heading-hierarchy guideline -- metadata should not precede H1. */}
      <header style={{ padding: 'clamp(2rem, 4vw, 3rem) var(--gutter) 0' }}>
        <div style={{ maxWidth: '740px' }}>

          {/* H1 title -- italic Cormorant (article title is a display moment) */}
          <h1 style={{
            fontFamily:    'var(--font-display)',
            fontSize:      'clamp(2.25rem, 5.5vw, 4.25rem)',
            fontWeight:    600,
            fontStyle:     'italic',
            color:         'var(--ink)',
            lineHeight:    1.06,
            letterSpacing: '-0.02em',
            margin:        '0 0 1.25rem',
          }}>
            {post.title}
          </h1>

          {/* Description lede */}
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize:   'clamp(1.05rem, 2vw, 1.25rem)',
            fontWeight: 400,
            fontStyle:  'italic',
            color:      'var(--ink-muted)',
            lineHeight: 1.65,
            margin:     '0 0 1.75rem',
          }}>
            {post.description}
          </p>

          {/* Green rule divider */}
          <div style={{
            width:           '48px',
            height:          '3px',
            backgroundColor: 'var(--green-600)',
            margin:          '0 0 1.5rem',
          }} />

          {/* Metadata row -- below H1, secondary weight */}
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <span style={{
              fontFamily:    'var(--font-mono)',
              fontSize:      '0.625rem',
              letterSpacing: '0.28em',
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
              {post.readingTime} min read
            </span>
            <span style={{
              fontFamily:    'var(--font-mono)',
              fontSize:      '0.55rem',
              letterSpacing: '0.2em',
              color:         'var(--ink-faint)',
            }}>
              {formatDate(post.date)}
            </span>
            {post.author !== 'Nash+' && (
              <span style={{
                fontFamily:    'var(--font-mono)',
                fontSize:      '0.55rem',
                letterSpacing: '0.2em',
                color:         'var(--ink-faint)',
              }}>
                {post.author}
              </span>
            )}
          </div>
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

      {/* ── Footer ─────────────────────────────────────────────── */}
      <div style={{ maxWidth: 'calc(740px + var(--gutter) * 2)', padding: '0 var(--gutter)' }}>
        <SiteFooter style={{ padding: '2rem 0 0', borderTop: '1px solid var(--border-light)', margin: 0 }} />
      </div>

      <style>{`
        .prose-link:hover { text-decoration-color: var(--green-600); }
      `}</style>
    </div>
  )
}
