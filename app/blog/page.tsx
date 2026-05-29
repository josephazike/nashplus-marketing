import type { Metadata } from 'next'
import { getAllPostMeta, CLUSTER_LABELS, CLUSTER_ORDER, groupByCluster } from '@/lib/blog'
import type { Cluster } from '@/lib/blog'
import { ClusterSection } from '@/components/ClusterSection'
import { SiteFooter }    from '@/components/SiteFooter'

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

// SRL Playbook (self-representation) is the differentiator -- always fully expanded.
const DEFAULT_EXPANDED: Cluster = 'self-representation'

export default function BlogIndex() {
  const posts         = getAllPostMeta()
  const byCluster     = groupByCluster(posts)
  const activeClusters = CLUSTER_ORDER.filter(c => (byCluster.get(c) ?? []).length > 0)

  return (
    <div style={{ minHeight: '100vh', paddingBottom: '4rem' }}>

      {/* ── Page header ──────────────────────────────────────── */}
      <header style={{ padding: 'clamp(4rem, 10vw, 8rem) var(--gutter) 0' }}>
        <p style={{
          fontFamily:    'var(--font-mono)',
          fontSize:      '0.6rem',
          letterSpacing: '0.36em',
          textTransform: 'uppercase',
          color:         'var(--green-600)',
          margin:        '0 0 1.25rem',
        }}>
          Nash+ / Resources
        </p>
        <h1 style={{
          fontFamily:    'var(--font-display)',
          fontSize:      'clamp(3rem, 7vw, 6rem)',
          fontWeight:    600,
          fontStyle:     'normal',
          letterSpacing: '-0.025em',
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
          Plain-language guides to Ontario family law -- Form 13, equalization,
          financial disclosure, and what self-represented litigants need to know.
        </p>

        {/* Cluster navigation pills */}
        {activeClusters.length > 1 && (
          <nav
            aria-label="Content clusters"
            style={{
              display:   'flex',
              flexWrap:  'wrap',
              gap:       '0.6rem',
              marginTop: '2.5rem',
            }}
          >
            {activeClusters.map(cluster => (
              <a
                key={cluster}
                href={`#cluster-${cluster}`}
                style={{
                  fontFamily:     'var(--font-mono)',
                  fontSize:       '0.575rem',
                  letterSpacing:  '0.25em',
                  textTransform:  'uppercase',
                  color:          'var(--ink)',
                  textDecoration: 'none',
                  border:         '1px solid var(--border)',
                  padding:        '0.4rem 0.85rem',
                  transition:     'background 200ms, border-color 200ms',
                  minHeight:      '32px',
                  display:        'inline-flex',
                  alignItems:     'center',
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
          background: var(--surface);
          border-color: var(--ink-muted);
        }
      `}</style>
    </div>
  )
}
