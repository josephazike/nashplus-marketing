import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllPostMeta, CATEGORY_LABELS, CLUSTER_LABELS, groupByCluster, formatDate } from '@/lib/blog'
import type { Category, Cluster } from '@/lib/blog'
import { LegalDisclaimer } from '@/components/LegalDisclaimer'

export const metadata: Metadata = {
  title:       'Resources — Nash+',
  description: 'Plain-language guides to Ontario family law: Form 13, equalization, financial disclosure, and navigating family court as a self-represented litigant.',
  openGraph: {
    title:       'Resources — Nash+',
    description: 'Plain-language guides to Ontario family law.',
    url:         'https://nashplus.dev/blog',
    siteName:    'Nash+',
    type:        'website',
  },
}

const CATEGORY_COLORS: Record<Category, string> = {
  'law-explained': 'var(--gold)',
  'how-it-works':  '#8fbc8f',
  'step-by-step':  '#7eb8d4',
  'glossary':      '#b89bd4',
}

const CLUSTER_COLORS: Record<Cluster, string> = {
  'forms':               '#7eb8d4',
  'concepts':            'var(--gold)',
  'procedure-and-fears': '#8fbc8f',
  'glossary':            '#b89bd4',
}

export default function BlogIndex() {
  const posts    = getAllPostMeta()
  const featured = posts.find(p => p.featured)
  const rest     = posts.filter(p => !p.featured)

  // Group non-featured posts by cluster; omit empty clusters from render
  const byCluster = groupByCluster(rest)
  const activeClusters = (['forms', 'concepts', 'procedure-and-fears', 'glossary'] as Cluster[])
    .filter(c => (byCluster.get(c) ?? []).length > 0)

  return (
    <div style={{ minHeight: '100vh', paddingBottom: '6rem' }}>

      {/* ── Header ───────────────────────────────────────── */}
      <header style={{ padding: 'clamp(4rem, 10vw, 8rem) clamp(1.5rem, 6vw, 5rem) 0' }}>
        <p style={{
          fontFamily:    'var(--font-geist-mono)',
          fontSize:      '0.6rem',
          letterSpacing: '0.35em',
          textTransform: 'uppercase',
          color:         'var(--gold)',
          margin:        '0 0 1.25rem',
        }}>
          Nash+ / Resources
        </p>
        <h1 style={{
          fontFamily:    'var(--font-playfair)',
          fontSize:      'clamp(3rem, 7vw, 6rem)',
          fontWeight:    600,
          letterSpacing: '-0.01em',
          color:         'var(--cream)',
          lineHeight:    1.0,
          margin:        0,
        }}>
          Law, Explained.
        </h1>
        <div style={{
          width:           '48px',
          height:          '1px',
          backgroundColor: 'var(--gold)',
          margin:          '2rem 0',
        }} />
        <p style={{
          fontFamily: 'var(--font-playfair)',
          fontSize:   'clamp(1.05rem, 2vw, 1.2rem)',
          fontStyle:  'italic',
          fontWeight: 300,
          color:      'var(--muted)',
          maxWidth:   '520px',
          lineHeight: 1.6,
          margin:     0,
        }}>
          Plain-language guides to Ontario family law — Form 13, equalization,
          financial disclosure, and what self-represented litigants need to know.
        </p>

        {/* ── Cluster navigation ────────────────────────── */}
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
                  fontFamily:     'var(--font-geist-mono)',
                  fontSize:       '0.5rem',
                  letterSpacing:  '0.28em',
                  textTransform:  'uppercase',
                  color:          CLUSTER_COLORS[cluster],
                  textDecoration: 'none',
                  border:         `1px solid ${CLUSTER_COLORS[cluster]}`,
                  padding:        '0.35rem 0.75rem',
                  opacity:        0.8,
                }}
              >
                {CLUSTER_LABELS[cluster]}
              </a>
            ))}
          </nav>
        )}
      </header>

      {/* ── Featured post ────────────────────────────────── */}
      {featured && (
        <section style={{ padding: 'clamp(2.5rem, 6vw, 5rem) clamp(1.5rem, 6vw, 5rem)' }}>
          <Link href={`/blog/${featured.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
            <article className="hover-dim" style={{
              borderTop:  '1px solid rgba(250,248,243,0.1)',
              paddingTop: '2.5rem',
              display:    'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
              gap:        '2rem 4rem',
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
                  <span style={{
                    fontFamily:    'var(--font-geist-mono)',
                    fontSize:      '0.55rem',
                    letterSpacing: '0.3em',
                    textTransform: 'uppercase',
                    color:         CATEGORY_COLORS[featured.category],
                  }}>
                    {CATEGORY_LABELS[featured.category]}
                  </span>
                  <span style={{
                    fontFamily:    'var(--font-geist-mono)',
                    fontSize:      '0.55rem',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color:         'var(--muted)',
                  }}>
                    Featured
                  </span>
                </div>
                <h2 style={{
                  fontFamily:    'var(--font-playfair)',
                  fontSize:      'clamp(2rem, 4vw, 3.25rem)',
                  fontWeight:    600,
                  color:         'var(--cream)',
                  lineHeight:    1.1,
                  margin:        0,
                  letterSpacing: '-0.01em',
                }}>
                  {featured.title}
                </h2>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: '1rem' }}>
                <p style={{
                  fontFamily: 'var(--font-playfair)',
                  fontSize:   '1.05rem',
                  fontWeight: 300,
                  color:      'var(--muted)',
                  lineHeight: 1.65,
                  margin:     0,
                }}>
                  {featured.description}
                </p>
                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                  <span style={{
                    fontFamily:    'var(--font-geist-mono)',
                    fontSize:      '0.55rem',
                    letterSpacing: '0.2em',
                    color:         'var(--muted)',
                  }}>
                    {formatDate(featured.date)}
                  </span>
                  <span style={{
                    fontFamily:    'var(--font-geist-mono)',
                    fontSize:      '0.55rem',
                    letterSpacing: '0.2em',
                    color:         'var(--muted)',
                  }}>
                    {featured.readingTime} min read
                  </span>
                  <span style={{
                    fontFamily:    'var(--font-geist-mono)',
                    fontSize:      '0.55rem',
                    letterSpacing: '0.2em',
                    color:         'var(--gold)',
                  }}>
                    Read →
                  </span>
                </div>
              </div>
            </article>
          </Link>
        </section>
      )}

      {/* ── Cluster sections ─────────────────────────────── */}
      {activeClusters.map(cluster => {
        const clusterPosts = byCluster.get(cluster) ?? []
        return (
          <section
            key={cluster}
            id={`cluster-${cluster}`}
            style={{ padding: '0 clamp(1.5rem, 6vw, 5rem)', marginBottom: '3rem' }}
          >
            {/* Cluster heading */}
            <div style={{
              display:       'flex',
              alignItems:    'baseline',
              gap:           '1rem',
              borderTop:     '1px solid rgba(250,248,243,0.1)',
              paddingTop:    '2rem',
              marginBottom:  '0',
            }}>
              <h2 style={{
                fontFamily:    'var(--font-geist-mono)',
                fontSize:      '0.55rem',
                letterSpacing: '0.35em',
                textTransform: 'uppercase',
                color:         CLUSTER_COLORS[cluster],
                margin:        0,
              }}>
                {CLUSTER_LABELS[cluster]}
              </h2>
              <span style={{
                fontFamily:    'var(--font-geist-mono)',
                fontSize:      '0.45rem',
                letterSpacing: '0.2em',
                color:         'var(--muted)',
              }}>
                {clusterPosts.length} {clusterPosts.length === 1 ? 'article' : 'articles'}
              </span>
            </div>

            {/* Posts grid within cluster */}
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
                    borderBottom: '1px solid rgba(250,248,243,0.08)',
                    cursor:       'pointer',
                  }}>
                    <span style={{
                      fontFamily:    'var(--font-geist-mono)',
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
                      fontFamily:    'var(--font-playfair)',
                      fontSize:      'clamp(1.35rem, 2.5vw, 1.7rem)',
                      fontWeight:    600,
                      color:         'var(--cream)',
                      lineHeight:    1.2,
                      margin:        '0 0 0.75rem',
                      letterSpacing: '-0.01em',
                    }}>
                      {post.title}
                    </h3>
                    <p style={{
                      fontFamily: 'var(--font-playfair)',
                      fontSize:   '0.95rem',
                      fontWeight: 300,
                      fontStyle:  'italic',
                      color:      'var(--muted)',
                      lineHeight: 1.6,
                      margin:     '0 0 1.25rem',
                      display:    '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow:   'hidden',
                    } as React.CSSProperties}>
                      {post.description}
                    </p>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                      <span style={{
                        fontFamily:    'var(--font-geist-mono)',
                        fontSize:      '0.5rem',
                        letterSpacing: '0.2em',
                        color:         'var(--muted)',
                      }}>
                        {post.readingTime} min
                      </span>
                      <span style={{
                        fontFamily:    'var(--font-geist-mono)',
                        fontSize:      '0.5rem',
                        letterSpacing: '0.2em',
                        color:         'var(--muted)',
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

      {/* ── Disclaimer ───────────────────────────────────── */}
      <footer style={{
        margin:    'clamp(3rem, 6vw, 5rem) clamp(1.5rem, 6vw, 5rem) 0',
        paddingTop: '2rem',
        borderTop:  '1px solid rgba(250,248,243,0.08)',
      }}>
        <LegalDisclaimer />
      </footer>

    </div>
  )
}
