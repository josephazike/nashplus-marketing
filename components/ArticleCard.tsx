import Link      from 'next/link'
import Image     from 'next/image'
import type { PostMeta }       from '@/lib/blog-display'
import { CATEGORY_LABELS, formatDate } from '@/lib/blog-display'
import { getPostImage }        from '@/lib/images'

interface ArticleCardProps {
  post:   PostMeta
  sizes?: string
  priority?: boolean
}

export function ArticleCard({ post, sizes, priority = false }: ArticleCardProps) {
  const image   = getPostImage(post.slug, post.cluster)
  const excerpt = post.summary || post.description

  return (
    <Link href={`/blog/${post.slug}`} className="article-card-link" style={{ textDecoration: 'none', display: 'block' }}>
      <article className="article-card">

        {/* ── Photo ─────────────────────────────────────────────── */}
        <div className="article-card-image-wrap">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes={sizes ?? '(max-width: 767px) 100vw, (max-width: 1199px) 50vw, 33vw'}
            style={{ objectFit: 'cover' }}
            className="article-card-image"
            priority={priority}
          />
          {/* Category tag overlaid on photo */}
          <span className="article-card-tag">
            {CATEGORY_LABELS[post.category]}
          </span>
        </div>

        {/* ── Text body ──────────────────────────────────────────── */}
        <div className="article-card-body">
          <h3 className="article-card-title">{post.title}</h3>
          <p  className="article-card-excerpt">{excerpt}</p>
          <span className="article-card-meta">
            {post.readingTime}&thinsp;min &middot;&thinsp;{formatDate(post.date)}
          </span>
        </div>

      </article>

      <style>{`
        .article-card-link { color: inherit; }
        .article-card {
          background:    #fafaf8;
          border-radius: 6px;
          overflow:      hidden;
          box-shadow:    0 1px 4px rgba(28,28,25,0.07);
          transition:
            box-shadow 220ms ease,
            transform  220ms ease;
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        .article-card:hover {
          box-shadow: 0 8px 28px rgba(28,28,25,0.14);
          transform:  translateY(-3px);
        }
        .article-card:hover .article-card-image {
          transform: scale(1.04);
        }

        /* ── Photo container ─────────────────────────────── */
        .article-card-image-wrap {
          position:     relative;
          aspect-ratio: 3 / 2;
          overflow:     hidden;
          flex-shrink:  0;
        }
        .article-card-image {
          transition: transform 400ms ease;
        }

        /* ── Category tag ────────────────────────────────── */
        .article-card-tag {
          position:       absolute;
          top:            0.75rem;
          left:           0.75rem;
          font-family:    var(--font-mono);
          font-size:      0.625rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color:          #ffffff;
          background:     rgba(28, 28, 25, 0.58);
          backdrop-filter: blur(6px);
          padding:        0.3rem 0.65rem;
          border-radius:  3px;
          white-space:    nowrap;
        }

        /* ── Text body ───────────────────────────────────── */
        .article-card-body {
          padding:        1.25rem 1.375rem 1.375rem;
          display:        flex;
          flex-direction: column;
          gap:            0.5rem;
          flex:           1;
        }
        .article-card-title {
          font-family:   var(--font-display);
          font-size:     clamp(1.0625rem, 2vw, 1.25rem);
          font-weight:   600;
          font-style:    normal;
          font-optical-sizing: auto;
          color:         var(--ink);
          line-height:   1.25;
          letter-spacing: -0.02em;
          margin:        0;
        }
        .article-card-excerpt {
          font-family:       var(--font-body);
          font-size:         0.9375rem;
          color:             var(--ink-secondary);
          line-height:       1.55;
          margin:            0;
          display:           -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow:          hidden;
          flex:              1;
        }
        .article-card-meta {
          font-family:    var(--font-mono);
          font-size:      0.625rem;
          letter-spacing: 0.16em;
          color:          var(--ink-faint);
          margin-top:     0.25rem;
        }

        @media (prefers-reduced-motion: reduce) {
          .article-card { transition: none; }
          .article-card:hover .article-card-image { transform: none; }
        }
      `}</style>
    </Link>
  )
}
