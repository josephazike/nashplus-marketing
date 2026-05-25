import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllPostMeta, CATEGORY_LABELS, CLUSTER_LABELS, groupByCluster, formatDate } from '@/lib/blog'
import type { Category, Cluster } from '@/lib/blog'
import { LegalDisclaimer } from '@/components/LegalDisclaimer'

export const metadata: Metadata = {
  title:       'Resources — NashPlus',
  description: 'Plain-language guides to Ontario family law: Form 13, equalization, financial disclosure, and navigating family court as a self-represented litigant.',
  openGraph: {
    title:       'Resources — NashPlus',
    description: 'Plain-language guides to Ontario family law.',
    url:         'https://nashplus.dev/blog',
    siteName:    'NashPlus',
    type:        'website',
  },
}

const CATEGORY_COLORS: Record<Category, string> = {
  'law-explained': 'var(--green-600)',
  'how-it-works':  '#4a7c5e',
  'step-by-step':  '#3d6a8a',
  'glossary':      '#7a5a8a',
}

const CLUSTER_COLORS: Record<Cluster, string> = {
  'forms':               '#3d6a8a',
  'concepts':            'var(--green-600)',
  'procedure-and-fears': '#4a7c5e',
  'glossary':            '#7a5a8a',
}

export default function BlogIndex() {
  const posts    = getAllPostMeta()
  const featured = posts.find(p => p.featured)
  const rest     = posts.filter(p => !p.featured)

  const byCluster = groupByCluster(rest)
  const activeClusters = (['forms', 'concepts', 'procedure-and-fears', 'glossary'] as Cluster[])
    .filter(c => (byCluster.get(c) ?? []).length > 0)

  return (
    <div style={{ minHeight: '100vh', paddingBottom: '6rem' }}>

      {/* ── Header ─────────────────────────────────────────────── */}
      <header style={{ padding: 'clamp(4rem, 10vw, 8rem) var(--gutter) 0' }}>
        <p style={{
          fontFamily:    'var(--font-mono)',
          fontSize:      '0.6rem',
          letterSpacing: '0.36em',
          textTransform: 'uppercase',
          color:         'var(--green-600)',
          margin:        '0 0 1.25rem',
        }}>
          NashPlus / Resources
        </p>
        <h1 style={{
          fontFamily:    'var(--font-display)',
          fontSize:      'clamp(3rem, 7vw, 6rem)',
          fontWeight:    600,
          fontStyle:     'italic',
          letterSpacing: '-0.02em',
          color:         'var(--ink)',
          lineHeight:    1.0,
          margin:        0,
        }}>
          Law, Explained.
        </h1>
        <div style={{
          width:           '48px',
          height:          '3px',
          backgroundColor: 'var(--green-600)',
          margin:          '2rem 0',
        }} />
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize:   'clamp(1.05rem, 2vw, 1.2rem)',
          fontStyle:  'italic',
          fontWeight: 400,
          color:      'var(--ink-muted)',
          maxWidth:   '520px',
          lineHeight: 1.65,
          margin:     0,
        }}>
          Plain-language guides to Ontario family law — Form 13, equalization,
          financial disclosure, and what self-represented litigants need to know.
        </p>

        {/* Cluster navigation */}
        {activeClusters.length > 1 && (
          <nav
            aria-label="Content clusters"
            style={{
              display:   'flex',
              flexWrap:  'wrap',
              gap:       '0.75rem',
              marginTop: '2.5rem',
            }}
          >
            {activeClusters.map(cluster => (
              <a
                key={cluster}
                href={`#cluster-${cluster}`}
                style={{
                  fontFamily:     'var(--font-mono)',
                  fontSize:       '0.5rem',
                  letterSpacing:  '0.28em',
                  textTransform:  'uppercase',
                  color:          CLUSTER_COLORS[cluster],
                  textDecoration: 'none',
                  border:         `1px solid ${CLUSTER_COLORS[cluster]}`,
                  padding:        '0.35rem 0.75rem',
                  opacity:        0.8,
                  transition:     'opacity 200ms',
                }}
              >
                {CLUSTER_LABELS[cluster]}
              </a>
            ))}
          </nav>
        )}
      </header>

      {/* ── Featured post ─────────────────────────────────────── */}
      {featured && (
        <section style={{ padding: 'clamp(2.5rem, 6vw, 5rem) var(--gutter)' }}>
          <Link href={`/blog/${featured.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
            <article className="hover-dim" style={{
              borderTop:  '1px solid var(--border)',
              paddingTop: '2.5rem',
              display:    'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
              gap:        '2rem 4rem',
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
                  <span style={{
                    fontFamily:    'var(--font-mono)',
                    fontSize:      '0.55rem',
                    letterSpacing: '0.3em',
                    textTransform: 'uppercase',
                    color:         CATEGORY_COLORS[featured.category],
                  }}>
                    {CATEGORY_LABELS[featured.category]}
                  </span>
                  <span style={{
                    fontFamily:    'var(--font-mono)',
                    fontSize:      '0.55rem',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color:         'var(--ink-faint)',
                  }}>
                    Featured
                  </span>
                </div>
                <h2 style={{
                  fontFamily:    'var(--font-display)',
                  fontSize:      'clamp(2rem, 4vw, 3.25rem)',
                  fontWeight:    600,
                  fontStyle:     'italic',
                  color:         'var(--ink)',
                  lineHeight:    1.1,
                  margin:        0,
                  letterSpacing: '-0.015em',
                }}>
                  {featured.title}
                </h2>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: '1rem' }}>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize:   '1.05rem',
                  fontWeight: 400,
                  fontStyle:  'italic',
                  color:      'var(--ink-muted)',
                  lineHeight: 1.65,
                  margin:     0,
                }}>
                  {featured.description}
                </p>
                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                  <span style={{
                    fontFamily:    'var(--font-mono)',
                    fontSize:      '0.5rem',
                    letterSpacing: '0.2em',
                    color:         'var(--ink-faint)',
                  }}>
                    {formatDate(featured.date)}
                  </span>
                  <span style={{
                    fontFamily:    'var(--font-mono)',
                    fontSize:      '0.5rem',
                    letterSpacing: '0.2em',
                    color:         'var(--ink-faint)',
                  }}>
                    {featured.readingTime} min read
                  </span>
                  <span style={{
                    fontFamily:    'var(--font-mono)',
                    fontSize:      '0.5rem',
                    letterSpacing: '0.2em',
                    color:         'var(--green-600)',
                  }}>
                    Read →
                  </span>
                </div>
              </div>
            </article>
          </Link>
        </section>
      )}

      {/* ── Cluster sections ──────────────────────────────────── */}
      {activeClusters.map(cluster => {
        const clusterPosts = byCluster.get(cluster) ?? []
        return (
          <section
            key={cluster}
            id={`cluster-${cluster}`}
            style={{ padding: '0 var(--gutter)', marginBottom: '3rem' }}
          >
            <div style={{
              display:      'flex',
              alignItems:   'baseline',
              gap:          '1rem',
              borderTop:    '1px solid var(--border-light)',
              paddingTop:   '2rem',
              marginBottom: '0',
            }}>
              <h2 style={{
                fontFamily:    'var(--font-mono)',
                fontSize:      '0.55rem',
                letterSpacing: '0.35em',
                textTransform: 'uppercase',
                color:         CLUSTER_COLORS[cluster],
                margin:        0,
              }}>
                {CLUSTER_LABELS[cluster]}
              </h2>
              <span style={{
                fontFamily:    'var(--font-mono)',
                fontSize:      '0.45rem',
                letterSpacing: '0.2em',
                color:         'var(--ink-faint)',
              }}>
                {clusterPosts.length} {clusterPosts.length === 1 ? 'article' : 'articles'}
              </span>
            </div>

            <div style={{
              display:             'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))',
              gap:                 '0',
            }}>
              {clusterPosts.map((post, i) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  style={{ textDecoration: 'none' }}
                >
                  <article className="hover-dim" style={{
                    padding:      '2rem 0',
                    paddingRight: i % 3 !== 2 ? '3rem' : 0,
                    borderBottom: '1px solid var(--border-light)',
                    cursor:       'pointer',
                  }}>
                    <span style={{
                      fontFamily:    'var(--font-mono)',
                      fontSize:      '0.55rem',
                      letterSpacing: '0.3em',
                      textTransform: 'uppercase',
                      color:         CATEGORY_COLORS[post.category],
                      display:       'block',
                      marginBottom:  '0.75rem',
                    }}>
                      {CATEGORY_LABELS[post.category]}
                    </span>
                    <h3 style={{
                      fontFamily:    'var(--font-display)',
                      fontSize:      'clamp(1.35rem, 2.5vw, 1.75rem)',
                      fontWeight:    600,
                      fontStyle:     'italic',
                      color:         'var(--ink)',
                      lineHeight:    1.2,
                      margin:        '0 0 0.75rem',
                      letterSpacing: '-0.01em',
                    }}>
                      {post.title}
                    </h3>
                    <p style={{
                      fontFamily:       'var(--font-body)',
                      fontSize:         '0.9375rem',
                      fontStyle:        'italic',
                      color:            'var(--ink-muted)',
                      lineHeight:       1.65,
                      margin:           '0 0 1.25rem',
                      display:          '-webkit-box',
                      WebkitLineClamp:  3,
                      WebkitBoxOrient:  'vertical',
                      overflow:         'hidden',
                    } as React.CSSProperties}>
                      {post.description}
                    </p>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                      <span style={{
                        fontFamily:    'var(--font-mono)',
                        fontSize:      '0.5rem',
                        letterSpacing: '0.2em',
                        color:         'var(--ink-faint)',
                      }}>
                        {post.readingTime} min
                      </span>
                      <span style={{
                        fontFamily:    'var(--font-mono)',
                        fontSize:      '0.5rem',
                        letterSpacing: '0.2em',
                        color:         'var(--ink-faint)',
                      }}>
                        {formatDate(post.date)}
                      </span>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </section>
        )
      })}

      {/* ── Disclaimer ────────────────────────────────────────── */}
      <footer style={{
        margin:     'clamp(3rem, 6vw, 5rem) var(--gutter) 0',
        paddingTop: '2rem',
        borderTop:  '1px solid var(--border-light)',
      }}>
        <LegalDisclaimer />
      </footer>

    </div>
  )
}
