import Link          from 'next/link'
import type { PostMeta, Cluster } from '@/lib/blog-display'
import { CLUSTER_LABELS }         from '@/lib/blog-display'
import { ArticleCard }            from '@/components/ArticleCard'

interface ClusterSectionProps {
  cluster: Cluster
  posts:   PostMeta[]
}

export function ClusterSection({ cluster, posts }: ClusterSectionProps) {
  if (posts.length === 0) return null

  return (
    <section id={`cluster-${cluster}`} className="cluster-section">

      {/* ── Section header ─────────────────────────────────────── */}
      <div className="cluster-header">
        <div className="cluster-header-inner">
          <h2 className="cluster-title">{CLUSTER_LABELS[cluster]}</h2>
          <span className="cluster-count">
            {posts.length} {posts.length === 1 ? 'guide' : 'guides'}
          </span>
        </div>
      </div>

      {/* ── Image card grid — flat, no accordion ───────────────── */}
      <div className="cluster-grid">
        {posts.map((post, i) => (
          <ArticleCard
            key={post.slug}
            post={post}
            index={i}
            priority={i < 3}
            sizes="(max-width: 767px) 100vw, (max-width: 1199px) 50vw, 33vw"
          />
        ))}
      </div>

      <style>{`
        .cluster-section {
          padding:       0 var(--gutter);
          margin-bottom: clamp(3rem, 6vw, 5rem);
        }

        /* ── Header ───────────────────────────────────── */
        .cluster-header {
          border-top:    2px solid var(--border);
          padding-top:   clamp(1.5rem, 3vw, 2.5rem);
          margin-bottom: clamp(1.25rem, 2.5vw, 2rem);
        }
        .cluster-header-inner {
          display:     flex;
          align-items: baseline;
          gap:         0.875rem;
          flex-wrap:   wrap;
        }
        .cluster-title {
          font-family:    var(--font-display);
          font-size:      clamp(1.375rem, 2.75vw, 1.875rem);
          font-weight:    700;
          font-style:     normal;
          font-optical-sizing: auto;
          color:          var(--ink);
          margin:         0;
          letter-spacing: -0.02em;
          line-height:    1.1;
        }
        .cluster-count {
          font-family:    var(--font-mono);
          font-size:      0.625rem;
          letter-spacing: 0.18em;
          color:          var(--ink-secondary);
          text-transform: uppercase;
        }

        /* ── Card grid ────────────────────────────────── */
        .cluster-grid {
          display:               grid;
          grid-template-columns: repeat(3, 1fr);
          gap:                   1.5rem;
          align-items:           start;
        }

        @media (max-width: 1199px) {
          .cluster-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 639px) {
          .cluster-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  )
}
