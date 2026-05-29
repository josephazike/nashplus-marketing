import type { Metadata } from 'next'
import { notFound }     from 'next/navigation'
import Link             from 'next/link'
import { MDXRemote }    from 'next-mdx-remote/rsc'
import remarkGfm        from 'remark-gfm'
import rehypeSlug       from 'rehype-slug'
import { getPost, getAllSlugs, formatDate, CATEGORY_LABELS } from '@/lib/blog'
import type { Category } from '@/lib/blog'
import { ContentCTA }   from '@/components/ContentCTA'
import { SiteFooter }   from '@/components/SiteFooter'
import {
  Callout,
  ComparisonTable,
  ProcessTimeline,
  Checklist,
  DecisionTree,
} from '@/components/mdx'

// Escape <, >, & so JSON-LD strings cannot break out of the script tag.
function safeJsonLd(obj: unknown): string {
  return JSON.stringify(obj)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026')
}

// Decision 2: #fafaf8 reading surface. --ink on #fafaf8 = 14.7:1 (AAA).
// Decision 1: Fraunces display + Inter body.
// Skill basis: UX guideline "Line Length" (65–75ch), "Line Height" (1.65),
//              "Font Size Scale" (Major Third modular scale).

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

// Article body: Inter for all prose, Fraunces for structural headings.
// Line height: 1.65 (skill guideline "Line Height" range: 1.5–1.75).
// Measure enforced at the container level (66ch).
const mdxComponents = {
  Callout,
  ComparisonTable,
  ProcessTimeline,
  Checklist,
  DecisionTree,
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 style={{
      fontFamily:        'var(--font-display)',
      fontSize:          'var(--text-h2)',
      fontWeight:        600,
      fontStyle:         'normal',
      fontOpticalSizing: 'auto',
      color:             'var(--ink)',
      letterSpacing:     '-0.02em',
      lineHeight:        'var(--lh-heading)',
      margin:            '2.75rem 0 0.875rem',
      paddingTop:        '0.25rem',
      borderTop:         '1px solid var(--border)',
    } as React.CSSProperties} {...props} />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 style={{
      fontFamily:  'var(--font-body)',
      fontSize:    'var(--text-h3)',
      fontWeight:  600,
      color:       'var(--ink)',
      letterSpacing: '-0.01em',
      lineHeight:  'var(--lh-heading)',
      margin:      '2rem 0 0.625rem',
    }} {...props} />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p style={{
      fontFamily: 'var(--font-body)',
      fontSize:   'var(--text-body)',
      fontWeight: 400,
      color:      'var(--ink)',
      lineHeight: 'var(--lh-body)',
      margin:     '0 0 1.375rem',
    }} {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul style={{
      fontFamily:  'var(--font-body)',
      fontSize:    'var(--text-body)',
      color:       'var(--ink)',
      lineHeight:  'var(--lh-body)',
      margin:      '0 0 1.375rem',
      paddingLeft: '1.5rem',
    }} {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol style={{
      fontFamily:  'var(--font-body)',
      fontSize:    'var(--text-body)',
      color:       'var(--ink)',
      lineHeight:  'var(--lh-body)',
      margin:      '0 0 1.375rem',
      paddingLeft: '1.5rem',
    }} {...props} />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li style={{ marginBottom: '0.4rem' }} {...props} />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote style={{
      borderLeft:  '3px solid var(--green-600)',
      paddingLeft: '1.5rem',
      margin:      '1.75rem 0',
      fontStyle:   'italic',
      color:       'var(--ink-secondary)',
    }} {...props} />
  ),
  hr: () => (
    <hr style={{
      border:    'none',
      borderTop: '1px solid var(--border)',
      margin:    '2.25rem 0',
    }} />
  ),
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong style={{ fontWeight: 700, color: 'var(--ink)' }} {...props} />
  ),
  em: (props: React.HTMLAttributes<HTMLElement>) => (
    <em style={{ fontStyle: 'italic', color: 'var(--ink-secondary)' }} {...props} />
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <code style={{
      fontFamily:      'var(--font-mono)',
      fontSize:        '0.875em',
      backgroundColor: 'rgba(28,28,25,0.06)',
      color:           'var(--green-700)',
      padding:         '0.1em 0.35em',
      borderRadius:    '2px',
    }} {...props} />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a style={{
      color:               'var(--green-700)',
      textDecoration:      'underline',
      textUnderlineOffset: '3px',
      textDecorationColor: 'var(--green-200)',
      transition:          'text-decoration-color 180ms',
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
  const nashplusOrg  = { '@type': 'Organization', name: 'NashPlus', url: 'https://nashplus.dev' }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type':          'BlogPosting',
        headline:         post.title,
        description:      post.description,
        datePublished:    post.date,
        dateModified:     post.last_reviewed,
        inLanguage:       'en-CA',
        mainEntityOfPage: canonicalUrl,
        author: post.author === 'Nash+'
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
    <div style={{ minHeight: '100vh', backgroundColor: '#fafaf8', paddingBottom: '4rem' }}>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }}
      />

      {/* Back link */}
      <div style={{ padding: 'clamp(2rem, 5vw, 3.5rem) var(--gutter) 0' }}>
        <Link href="/blog" style={{
          fontFamily:     'var(--font-mono)',
          fontSize:       'var(--text-meta)',
          letterSpacing:  '0.28em',
          textTransform:  'uppercase',
          color:          'var(--ink-secondary)',
          textDecoration: 'none',
          transition:     'color 180ms',
        }}>
          &#8592; Resources
        </Link>
      </div>

      {/* Article header — H1 first, metadata after */}
      <header style={{ padding: 'clamp(1.75rem, 3.5vw, 2.75rem) var(--gutter) 0' }}>
        <div style={{ maxWidth: '72ch' }}>

          {/* H1: Fraunces 600 italic — display moment for the article title */}
          <h1 style={{
            fontFamily:        'var(--font-display)',
            fontSize:          'var(--text-title)',
            fontWeight:        600,
            fontStyle:         'italic',
            fontOpticalSizing: 'auto',
            color:             'var(--ink)',
            lineHeight:        1.1,
            letterSpacing:     '-0.02em',
            margin:            '0 0 1.125rem',
          } as React.CSSProperties}>
            {post.title}
          </h1>

          {/* Description lede — Inter, slightly larger than body */}
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize:   'var(--text-lead)',
            fontWeight: 400,
            color:      'var(--ink-secondary)',
            lineHeight: 'var(--lh-lead)',
            margin:     '0 0 1.5rem',
          }}>
            {post.description}
          </p>

          {/* Green rule */}
          <div style={{
            width:           '48px',
            height:          '3px',
            backgroundColor: 'var(--green-600)',
            margin:          '0 0 1.25rem',
          }} />

          {/* Metadata row — below H1, secondary weight */}
          <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <span style={{
              fontFamily:    'var(--font-mono)',
              fontSize:      'var(--text-meta)',
              letterSpacing: '0.24em',
              textTransform: 'uppercase',
              color:         CATEGORY_COLORS[post.category],
            }}>
              {CATEGORY_LABELS[post.category]}
            </span>
            <span style={{
              fontFamily:    'var(--font-mono)',
              fontSize:      'var(--text-meta)',
              letterSpacing: '0.14em',
              color:         'var(--ink-faint)',
            }}>
              {post.readingTime} min
            </span>
            <span style={{
              fontFamily:    'var(--font-mono)',
              fontSize:      'var(--text-meta)',
              letterSpacing: '0.14em',
              color:         'var(--ink-faint)',
            }}>
              {formatDate(post.date)}
            </span>
            {post.author !== 'Nash+' && (
              <span style={{
                fontFamily:    'var(--font-mono)',
                fontSize:      'var(--text-meta)',
                letterSpacing: '0.14em',
                color:         'var(--ink-faint)',
              }}>
                {post.author}
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Article body — 66ch measure (UX guideline "Line Length": 65–75ch) */}
      <article style={{ padding: 'clamp(2.25rem, 4vw, 3.5rem) var(--gutter)' }}>
        <div style={{ maxWidth: '66ch' }}>
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

      {/* Article footer */}
      <div style={{ padding: '0 var(--gutter)', maxWidth: 'calc(66ch + var(--gutter) * 2)' }}>
        <SiteFooter style={{ padding: '2rem 0 0', borderTop: '1px solid var(--border)', margin: 0 }} />
      </div>

      <style>{`
        .prose-link:hover { text-decoration-color: var(--green-600); }
      `}</style>
    </div>
  )
}
