'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { PostMeta, Cluster } from '@/lib/blog-display'
import { CATEGORY_LABELS, CLUSTER_LABELS, formatDate } from '@/lib/blog-display'

const COLLAPSED_COUNT = 3

interface ClusterSectionProps {
  cluster:         Cluster
  posts:           PostMeta[]
  defaultExpanded: boolean
}

export function ClusterSection({ cluster, posts, defaultExpanded }: ClusterSectionProps) {
  const [expanded, setExpanded] = useState(defaultExpanded)

  const visible   = expanded ? posts : posts.slice(0, COLLAPSED_COUNT)
  const remaining = posts.length - COLLAPSED_COUNT

  return (
    <section
      id={`cluster-${cluster}`}
      style={{ padding: '0 var(--gutter)', marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}
    >
      {/* Cluster header — Fraunces display, --ink, fontOpticalSizing auto */}
      <div style={{
        borderTop:    '1px solid var(--border)',
        paddingTop:   'clamp(1.75rem, 3.5vw, 2.75rem)',
        marginBottom: 'clamp(1.25rem, 2.5vw, 2rem)',
        display:      'flex',
        alignItems:   'baseline',
        gap:          '1rem',
        flexWrap:     'wrap',
      }}>
        <h2 style={{
          fontFamily:        'var(--font-display)',
          fontSize:          'var(--text-cluster)',
          fontWeight:        600,
          fontStyle:         'normal',
          fontOpticalSizing: 'auto',
          color:             'var(--ink)',
          margin:            0,
          letterSpacing:     '-0.02em',
          lineHeight:        'var(--lh-heading)',
        } as React.CSSProperties}>
          {CLUSTER_LABELS[cluster]}
        </h2>
        <span style={{
          fontFamily:    'var(--font-mono)',
          fontSize:      'var(--text-meta)',
          letterSpacing: '0.15em',
          color:         'var(--ink-secondary)',
        }}>
          {posts.length} {posts.length === 1 ? 'article' : 'articles'}
        </span>
      </div>

      {/* Article grid — responsive columns */}
      <div className="cluster-grid">
        {visible.map((post) => (
          <ArticleCard key={post.slug} post={post} />
        ))}
      </div>

      {/* Expand / collapse */}
      {posts.length > COLLAPSED_COUNT && (
        <div style={{ marginTop: '1.25rem' }}>
          <button
            onClick={() => setExpanded(v => !v)}
            className="btn-ghost"
            style={{
              background:   'none',
              border:       'none',
              cursor:       'pointer',
              padding:      0,
              minHeight:    '44px',
            }}
          >
            {expanded
              ? `Show fewer`
              : `Show all ${posts.length} in ${CLUSTER_LABELS[cluster]} (${remaining} more) →`
            }
          </button>
        </div>
      )}

      <style>{`
        .cluster-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
        }
        @media (max-width: 1023px) {
          .cluster-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 639px) {
          .cluster-grid { grid-template-columns: 1fr; }
        }
        .article-card {
          transition: box-shadow 200ms ease, transform 200ms ease;
        }
        .article-card:hover {
          box-shadow: 0 4px 16px rgba(28, 28, 25, 0.08);
          transform:  translateY(-2px);
        }
      `}</style>
    </section>
  )
}

function ArticleCard({ post }: { post: PostMeta }) {
  return (
    <Link href={`/blog/${post.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
      <article
        className="article-card"
        style={{
          padding:      'clamp(1.25rem, 2.5vw, 1.75rem)',
          paddingLeft:  0,
          paddingRight: 'clamp(0.75rem, 2.5vw, 2rem)',
          borderBottom: '1px solid var(--border-light)',
          cursor:       'pointer',
        }}
      >
        {/* Category tag — Geist Mono, --green-700 (9:1 on #fafaf8, AAA) */}
        <span style={{
          fontFamily:    'var(--font-mono)',
          fontSize:      'var(--text-meta)',
          letterSpacing: '0.24em',
          textTransform: 'uppercase',
          color:         'var(--green-700)',
          display:       'block',
          marginBottom:  '0.5rem',
        }}>
          {CATEGORY_LABELS[post.category]}
        </span>

        {/* Card title — Fraunces 600 roman, opsz auto */}
        <h3 style={{
          fontFamily:        'var(--font-display)',
          fontSize:          'var(--text-h2)',
          fontWeight:        600,
          fontStyle:         'normal',
          fontOpticalSizing: 'auto',
          color:             'var(--ink)',
          lineHeight:        'var(--lh-heading)',
          margin:            '0 0 0.5rem',
          letterSpacing:     '-0.02em',
        } as React.CSSProperties}>
          {post.title}
        </h3>

        {/* Description — Inter 400, 2-line clamp, --ink-secondary (5.88:1 on #fafaf8) */}
        <p style={{
          fontFamily:       'var(--font-body)',
          fontSize:         '0.9375rem',
          fontStyle:        'normal',
          color:            'var(--ink-secondary)',
          lineHeight:       'var(--lh-body)',
          margin:           '0 0 0.75rem',
          display:          '-webkit-box',
          WebkitLineClamp:  2,
          WebkitBoxOrient:  'vertical',
          overflow:         'hidden',
        } as React.CSSProperties}>
          {post.summary || post.description}
        </p>

        {/* Metadata */}
        <span style={{
          fontFamily:    'var(--font-mono)',
          fontSize:      'var(--text-meta)',
          letterSpacing: '0.14em',
          color:         'var(--ink-faint)',
        }}>
          {post.readingTime} min &middot; {formatDate(post.date)}
        </span>
      </article>
    </Link>
  )
}
