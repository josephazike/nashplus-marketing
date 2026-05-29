import type { Metadata } from 'next'
import { getAllPostMeta, CLUSTER_LABELS, CLUSTER_ORDER, groupByCluster } from '@/lib/blog'
import type { Cluster } from '@/lib/blog'
import { ClusterSection } from '@/components/ClusterSection'
import { SiteFooter }     from '@/components/SiteFooter'

// Decision 2: #fafaf8 reading surface (--ink contrast: 14.7:1 AAA).
// Documentation Hub treatment (Variant A): cluster grid signals "reference library."
// Skill basis: UI/UX Pro Max v5 "FAQ/Documentation Landing" pattern.

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

const DEFAULT_EXPANDED: Cluster = 'self-representation'

export default function BlogIndex() {
  const posts          = getAllPostMeta()
  const byCluster      = groupByCluster(posts)
  const activeClusters = CLUSTER_ORDER.filter(c => (byCluster.get(c) ?? []).length > 0)

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#fafaf8', paddingBottom: '4rem' }}>

      {/* ── Page header ──────────────────────────────────────── */}
      <header style={{ padding: 'clamp(4rem, 10vw, 8rem) var(--gutter) 0' }}>
        <p style={{
          fontFamily:    'var(--font-mono)',
          fontSize:      'var(--text-meta)',
          letterSpacing: '0.36em',
          textTransform: 'uppercase',
          color:         'var(--green-600)',
          margin:        '0 0 1.25rem',
        }}>
          Nash+ / Resources
        </p>
        <h1 style={{
          fontFamily:        'var(--font-display)',
          fontSize:          'var(--text-display)',
          fontWeight:        700,
          fontStyle:         'normal',
          fontOpticalSizing: 'auto',
          letterSpacing:     '-0.03em',
          color:             'var(--ink)',
          lineHeight:        'var(--lh-tight)',
          margin:            0,
        } as React.CSSProperties}>
          Law, Explained.
        </h1>
        <div style={{
          width:           '48px',
          height:          '3px',
          backgroundColor: 'var(--green-600)',
          margin:          '1.75rem 0',
        }} />
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize:   'var(--text-lead)',
          fontWeight: 400,
          color:      'var(--ink-secondary)',
          maxWidth:   '52ch',
          lineHeight: 'var(--lh-body)',
          margin:     0,
        }}>
          Plain-language guides to Ontario family law. Form 13, equalization,
          financial disclosure, and what self-represented litigants need to know.
          Every article cited.
        </p>

        {/* Cluster navigation pills */}
        {activeClusters.length > 1 && (
          <nav
            aria-label="Browse by topic"
            style={{
              display:   'flex',
              flexWrap:  'wrap',
              gap:       '0.5rem',
              marginTop: '2rem',
            }}
          >
            {activeClusters.map(cluster => (
              <a
                key={cluster}
                href={`#cluster-${cluster}`}
                style={{
                  fontFamily:     'var(--font-mono)',
                  fontSize:       'var(--text-meta)',
                  letterSpacing:  '0.2em',
                  textTransform:  'uppercase',
                  color:          'var(--ink)',
                  textDecoration: 'none',
                  border:         '1px solid var(--border)',
                  borderRadius:   '2px',
                  padding:        '0.4rem 0.85rem',
                  transition:     'background 180ms, border-color 180ms',
                  minHeight:      '36px',
                  display:        'inline-flex',
                  alignItems:     'center',
                  backgroundColor: 'transparent',
                }}
                className="cluster-pill"
              >
                {CLUSTER_LABELS[cluster]}
              </a>
            ))}
          </nav>
        )}
      </header>

      {/* ── Cluster sections ─────────────────────────────────── */}
      <div style={{ marginTop: 'clamp(3rem, 6vw, 5rem)' }}>
        {activeClusters.map(cluster => (
          <ClusterSection
            key={cluster}
            cluster={cluster}
            posts={byCluster.get(cluster) ?? []}
            defaultExpanded={cluster === DEFAULT_EXPANDED}
          />
        ))}
      </div>

      {/* ── Footer ───────────────────────────────────────────── */}
      <SiteFooter style={{ margin: '0', marginTop: 'clamp(2rem, 4vw, 3rem)' }} />

      <style>{`
        .cluster-pill:hover {
          background:    var(--surface);
          border-color:  var(--ink-secondary);
        }
      `}</style>
    </div>
  )
}
