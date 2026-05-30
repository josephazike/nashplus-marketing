import type { Metadata } from 'next'
import { getAllPostMeta, CLUSTER_LABELS, CLUSTER_ORDER, groupByCluster } from '@/lib/blog'
import type { Cluster } from '@/lib/blog'
import { ClusterSection } from '@/components/ClusterSection'
import { SiteFooter }     from '@/components/SiteFooter'

export const metadata: Metadata = {
  title:       'Guides — NashPlus',
  description: 'Plain-language guides to Ontario family law: Form 13, equalization, financial disclosure, and navigating family court as a self-represented litigant.',
  openGraph: {
    title:       'Guides — NashPlus',
    description: 'Plain-language guides to Ontario family law.',
    url:         'https://nashplus.dev/blog',
    siteName:    'NashPlus',
    type:        'website',
  },
}

// Human-readable cluster labels for the filter nav
const CLUSTER_NAV_LABELS: Record<Cluster, string> = {
  'self-representation': 'Representing Yourself',
  'support':             'Support & Legal Aid',
  'parenting':           'Parenting',
  'forms':               'Forms',
  'concepts':            'Law Explained',
  'procedure-and-fears': 'Court Process',
  'tools':               'Tools & Apps',
  'glossary':            'Glossary',
}

export default function BlogIndex() {
  const posts          = getAllPostMeta()
  const byCluster      = groupByCluster(posts)
  const activeClusters = CLUSTER_ORDER.filter(c => (byCluster.get(c) ?? []).length > 0)

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#fafaf8', paddingBottom: '4rem' }}>

      {/* ── Page header ──────────────────────────────────────── */}
      <header className="blog-header">
        <p className="blog-eyebrow">Nash+ &middot; Guides</p>
        <h1 className="blog-title">62 plain-language guides.</h1>
        <p className="blog-lead">
          Ontario family law explained clearly — Form 13, financial disclosure,
          equalization, and what self-represented litigants need to know. Every
          article cited.
        </p>

        {/* ── Cluster filter nav ──────────────────────────── */}
        {activeClusters.length > 1 && (
          <nav
            aria-label="Browse by topic"
            className="cluster-filter-nav"
          >
            {activeClusters.map(cluster => (
              <a
                key={cluster}
                href={`#cluster-${cluster}`}
                className="cluster-filter-pill"
              >
                {CLUSTER_NAV_LABELS[cluster]}
                <span className="cluster-filter-count">
                  {byCluster.get(cluster)?.length ?? 0}
                </span>
              </a>
            ))}
          </nav>
        )}
      </header>

      {/* ── Cluster image-card sections ──────────────────────── */}
      <div style={{ marginTop: 'clamp(3rem, 6vw, 5rem)' }}>
        {activeClusters.map(cluster => (
          <ClusterSection
            key={cluster}
            cluster={cluster}
            posts={byCluster.get(cluster) ?? []}
          />
        ))}
      </div>

      <SiteFooter style={{ margin: '0', marginTop: 'clamp(2rem, 4vw, 3rem)' }} />

      <style>{`
        /* ── Blog header ─────────────────────────────────── */
        .blog-header {
          padding:    clamp(4rem, 10vw, 7rem) var(--gutter) 0;
          background: #fafaf8;
        }
        .blog-eyebrow {
          font-family:    var(--font-mono);
          font-size:      var(--text-meta);
          letter-spacing: 0.34em;
          text-transform: uppercase;
          color:          var(--green-600);
          margin:         0 0 1rem;
        }
        .blog-title {
          font-family:    var(--font-display);
          font-size:      var(--text-display);
          font-weight:    700;
          font-style:     normal;
          font-optical-sizing: auto;
          letter-spacing: -0.03em;
          color:          var(--ink);
          line-height:    1.05;
          margin:         0 0 1.25rem;
        }
        .blog-lead {
          font-family: var(--font-body);
          font-size:   var(--text-lead);
          color:       var(--ink-secondary);
          max-width:   52ch;
          line-height: var(--lh-body);
          margin:      0;
        }

        /* ── Cluster filter pills ────────────────────────── */
        .cluster-filter-nav {
          display:    flex;
          flex-wrap:  wrap;
          gap:        0.5rem;
          margin-top: 2.25rem;
          padding-bottom: clamp(2rem, 4vw, 3rem);
          border-bottom: 1px solid var(--border);
        }
        .cluster-filter-pill {
          font-family:     var(--font-body);
          font-size:       0.875rem;
          font-weight:     500;
          color:           var(--ink);
          text-decoration: none;
          border:          1.5px solid var(--border);
          border-radius:   100px;
          padding:         0.4rem 0.875rem;
          display:         inline-flex;
          align-items:     center;
          gap:             0.5rem;
          transition:      background 160ms, border-color 160ms, color 160ms;
          min-height:      36px;
        }
        .cluster-filter-pill:hover {
          background:    var(--green-50);
          border-color:  var(--green-400);
          color:         var(--green-700);
        }
        .cluster-filter-count {
          font-family:    var(--font-mono);
          font-size:      0.75rem;
          letter-spacing: 0.06em;
          color:          var(--ink-secondary);
          background:     rgba(28,28,25,0.07);
          border-radius:  100px;
          padding:        0.15rem 0.5rem;
        }
      `}</style>
    </div>
  )
}
