import type { Metadata } from 'next'
import { notFound }     from 'next/navigation'
import Link             from 'next/link'
import { MDXRemote }    from 'next-mdx-remote/rsc'
import remarkGfm        from 'remark-gfm'
import rehypeSlug       from 'rehype-slug'
import { getPost, getAllSlugs, formatDate, CATEGORY_LABELS } from '@/lib/blog'
import type { Category } from '@/lib/blog'

const CATEGORY_COLORS: Record<Category, string> = {
  'law-explained': 'var(--amber)',
  'how-it-works':  '#8fbc8f',
  'step-by-step':  '#7eb8d4',
  'glossary':      '#b89bd4',
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
      title:       post.title,
      description: post.description,
      url:         `https://nashplus.dev/blog/${post.slug}`,
      siteName:    'NashPlus',
      type:        'article',
      publishedTime: post.date,
    },
  }
}

const mdxComponents = {
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 style={{
      fontFamily:    'var(--font-cormorant)',
      fontSize:      'clamp(1.5rem, 3vw, 2rem)',
      fontWeight:    600,
      color:         'var(--cream)',
      letterSpacing: '-0.01em',
      lineHeight:    1.2,
      margin:        '3rem 0 1rem',
      paddingTop:    '0.25rem',
      borderTop:     '1px solid rgba(242,237,230,0.1)',
    }} {...props} />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 style={{
      fontFamily:    'var(--font-cormorant)',
      fontSize:      'clamp(1.2rem, 2.5vw, 1.5rem)',
      fontWeight:    600,
      color:         'var(--cream)',
      letterSpacing: '-0.005em',
      lineHeight:    1.3,
      margin:        '2.25rem 0 0.75rem',
    }} {...props} />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p style={{
      fontFamily: 'var(--font-cormorant)',
      fontSize:   'clamp(1rem, 1.8vw, 1.125rem)',
      fontWeight: 300,
      color:      'var(--cream)',
      lineHeight: 1.8,
      margin:     '0 0 1.4rem',
    }} {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul style={{
      fontFamily:  'var(--font-cormorant)',
      fontSize:    'clamp(1rem, 1.8vw, 1.125rem)',
      fontWeight:  300,
      color:       'var(--cream)',
      lineHeight:  1.8,
      margin:      '0 0 1.4rem',
      paddingLeft: '1.5rem',
    }} {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol style={{
      fontFamily:  'var(--font-cormorant)',
      fontSize:    'clamp(1rem, 1.8vw, 1.125rem)',
      fontWeight:  300,
      color:       'var(--cream)',
      lineHeight:  1.8,
      margin:      '0 0 1.4rem',
      paddingLeft: '1.5rem',
    }} {...props} />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li style={{ marginBottom: '0.4rem' }} {...props} />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote style={{
      borderLeft:  '2px solid var(--amber)',
      paddingLeft: '1.5rem',
      margin:      '2rem 0',
      fontStyle:   'italic',
      color:       'var(--muted)',
    }} {...props} />
  ),
  hr: () => (
    <hr style={{
      border:    'none',
      borderTop: '1px solid rgba(242,237,230,0.1)',
      margin:    '2.5rem 0',
    }} />
  ),
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong style={{ fontWeight: 600, color: 'var(--cream)' }} {...props} />
  ),
  em: (props: React.HTMLAttributes<HTMLElement>) => (
    <em style={{ fontStyle: 'italic', color: 'var(--muted)' }} {...props} />
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <code style={{
      fontFamily:      'var(--font-dm-mono)',
      fontSize:        '0.85em',
      backgroundColor: 'rgba(201,169,110,0.1)',
      color:           'var(--amber)',
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

  return (
    <div style={{ minHeight: '100vh', paddingBottom: '6rem' }}>

      {/* ── Back link ──────────────────────────────────────── */}
      <div style={{ padding: 'clamp(2rem, 5vw, 3.5rem) clamp(1.5rem, 6vw, 5rem) 0' }}>
        <Link href="/blog" style={{
          fontFamily:    'var(--font-dm-mono)',
          fontSize:      '0.55rem',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          color:         'var(--muted)',
          textDecoration: 'none',
        }}>
          ← Resources
        </Link>
      </div>

      {/* ── Article header ─────────────────────────────────── */}
      <header style={{ padding: 'clamp(2.5rem, 5vw, 4rem) clamp(1.5rem, 6vw, 5rem) 0' }}>
        <div style={{ maxWidth: '740px' }}>
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', marginBottom: '1.5rem' }}>
            <span style={{
              fontFamily:    'var(--font-dm-mono)',
              fontSize:      '0.55rem',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color:         CATEGORY_COLORS[post.category],
            }}>
              {CATEGORY_LABELS[post.category]}
            </span>
            <span style={{
              fontFamily:    'var(--font-dm-mono)',
              fontSize:      '0.55rem',
              letterSpacing: '0.2em',
              color:         'var(--muted)',
            }}>
              {formatDate(post.date)}
            </span>
            <span style={{
              fontFamily:    'var(--font-dm-mono)',
              fontSize:      '0.55rem',
              letterSpacing: '0.2em',
              color:         'var(--muted)',
            }}>
              {post.readingTime} min read
            </span>
          </div>
          <h1 style={{
            fontFamily:    'var(--font-cormorant)',
            fontSize:      'clamp(2.25rem, 5vw, 4rem)',
            fontWeight:    600,
            color:         'var(--cream)',
            lineHeight:    1.05,
            letterSpacing: '-0.02em',
            margin:        '0 0 1.5rem',
          }}>
            {post.title}
          </h1>
          <p style={{
            fontFamily: 'var(--font-cormorant)',
            fontSize:   'clamp(1.05rem, 2vw, 1.25rem)',
            fontWeight: 300,
            fontStyle:  'italic',
            color:      'var(--muted)',
            lineHeight: 1.65,
            margin:     0,
          }}>
            {post.description}
          </p>
          <div style={{
            width:           '48px',
            height:          '1px',
            backgroundColor: 'var(--amber)',
            margin:          '2rem 0 0',
          }} />
        </div>
      </header>

      {/* ── Article body ───────────────────────────────────── */}
      <article style={{
        padding: 'clamp(2.5rem, 5vw, 4rem) clamp(1.5rem, 6vw, 5rem)',
        maxWidth: 'calc(740px + clamp(3rem, 12vw, 10rem))',
      }}>
        <div style={{ maxWidth: '740px' }}>
          <MDXRemote
            source={post.content}
            components={mdxComponents}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
                rehypePlugins: [rehypeSlug],
              },
            }}
          />
        </div>
      </article>

      {/* ── Footer disclaimer ──────────────────────────────── */}
      <footer style={{
        margin:    '0 clamp(1.5rem, 6vw, 5rem)',
        paddingTop: '2rem',
        borderTop:  '1px solid rgba(242,237,230,0.08)',
        maxWidth:   '740px',
      }}>
        <p style={{
          fontFamily:    'var(--font-dm-mono)',
          fontSize:      '0.5rem',
          letterSpacing: '0.15em',
          color:         'var(--muted)',
          lineHeight:    1.8,
        }}>
          NashPlus provides legal information and document automation. It is not a law firm
          and does not provide legal advice. It is not a substitute for advice from a licensed
          Ontario lawyer.
        </p>
      </footer>

    </div>
  )
}
