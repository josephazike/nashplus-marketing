'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { PostMeta, Cluster, Category } from '@/lib/blog-display'
import { CATEGORY_LABELS, CLUSTER_LABELS, formatDate } from '@/lib/blog-display'

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
      style={{ padding: '0 var(--gutter)', marginBottom: 'clamp(3rem, 6vw, 4.5rem)' }}
    >
      {/* Cluster header */}
      <div style={{
        borderTop:    '1px solid var(--border)',
        paddingTop:   'clamp(2rem, 4vw, 3rem)',
        marginBottom: 'clamp(1.5rem, 3vw, 2.5rem)',
        display:      'flex',
        alignItems:   'baseline',
        gap:          '1.25rem',
        flexWrap:     'wrap',
      }}>
        <h2 style={{
          fontFamily:    'var(--font-display)',
          fontSize:      'clamp(1.5rem, 3vw, 2.25rem)',
          fontWeight:    600,
          fontStyle:     'normal',
          color:         'var(--ink)',
          margin:        0,
          letterSpacing: '-0.02em',
          lineHeight:    1.1,
        }}>
          {CLUSTER_LABELS[cluster]}
        </h2>
        <span style={{
          fontFamily:    'var(--font-mono)',
          fontSize:      '0.6rem',
          letterSpacing: '0.2em',
          color:         'var(--ink-muted)',
        }}>
          {posts.length} {posts.length === 1 ? 'article' : 'articles'}
        </span>
      </div>

      {/* Article grid */}
      <div style={{
        display:             'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap:                 '0',
      }}
        className="cluster-grid"
      >
        {visible.map((post) => (
          <ArticleCard key={post.slug} post={post} />
        ))}
      </div>

      {/* Expand / collapse toggle */}
      {posts.length > COLLAPSED_COUNT && (
        <div style={{ marginTop: '1.5rem' }}>
          <button
            onClick={() => setExpanded(v => !v)}
            style={{
              background:     'none',
              border:         'none',
              cursor:         'pointer',
              display:        'inline-flex',
              alignItems:     'center',
              gap:            '0.45rem',
              fontFamily:     'var(--font-mono)',
              fontSize:       '0.6rem',
              letterSpacing:  '0.28em',
              textTransform:  'uppercase',
              color:          'var(--ink-muted)',
              padding:        0,
              transition:     'color 220ms, gap 220ms',
            }}
            className="btn-ghost"
          >
            {expanded
              ? `Collapse ${CLUSTER_LABELS[cluster]}`
              : `Show all ${posts.length} in ${CLUSTER_LABELS[cluster]} (${remaining} more)`
            }
            <span aria-hidden style={{
              display:    'inline-block',
              transition: 'transform 220ms',
              transform:  expanded ? 'rotate(90deg)' : 'rotate(0deg)',
            }}>→</span>
          </button>
        </div>
      )}

      <style>{`
        @media (max-width: 1023px) {
          .cluster-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 639px) {
          .cluster-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}

function ArticleCard({ post }: { post: PostMeta }) {
  return (
    <Link href={`/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
      <article
        style={{
          padding:      'clamp(1.5rem, 3vw, 2rem)',
          paddingLeft:  0,
          paddingRight: 'clamp(1rem, 3vw, 2.5rem)',
          borderBottom: '1px solid var(--border-light)',
          cursor:       'pointer',
          transition:   'background 200ms, transform 200ms',
          borderLeft:   '2px solid transparent',
        }}
        className="article-card"
      >
        {/* Category tag */}
        <span style={{
          fontFamily:    'var(--font-mono)',
          fontSize:      '0.625rem',
          letterSpacing: '0.28em',
          textTransform: 'uppercase',
          color:         CATEGORY_COLORS[post.category],
          display:       'block',
          marginBottom:  '0.65rem',
        }}>
          {CATEGORY_LABELS[post.category]}
        </span>

        {/* Title -- roman, not italic */}
        <h3 style={{
          fontFamily:    'var(--font-display)',
          fontSize:      'clamp(1.15rem, 2.2vw, 1.5rem)',
          fontWeight:    600,
          fontStyle:     'normal',
          color:         'var(--ink)',
          lineHeight:    1.2,
          margin:        '0 0 0.6rem',
          letterSpacing: '-0.01em',
        }}>
          {post.title}
        </h3>

        {/* Description -- 2-line clamp */}
        <p style={{
          fontFamily:       'var(--font-body)',
          fontSize:         '0.875rem',
          fontStyle:        'italic',
          color:            'var(--ink-muted)',
          lineHeight:       1.65,
          margin:           '0 0 0.9rem',
          display:          '-webkit-box',
          WebkitLineClamp:  2,
          WebkitBoxOrient:  'vertical',
          overflow:         'hidden',
        } as React.CSSProperties}>
          {post.summary || post.description}
        </p>

        {/* Metadata -- single line, demoted */}
        <span style={{
          fontFamily:    'var(--font-mono)',
          fontSize:      '0.5rem',
          letterSpacing: '0.18em',
          color:         'var(--ink-faint)',
          display:       'block',
        }}>
          {post.readingTime} min &middot; {formatDate(post.date)}
        </span>
      </article>
      <style>{`
        .article-card:hover {
          background: var(--surface);
          transform: translateY(-2px);
          border-left-color: var(--green-600);
        }
      `}</style>
    </Link>
  )
}
