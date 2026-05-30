import Image   from 'next/image'
import Link    from 'next/link'
import { SIGNUP_URL as PRODUCT_URL } from '@/lib/config'
import { SiteFooter }  from '@/components/SiteFooter'
import { ArticleCard } from '@/components/ArticleCard'
import { getHeroImage } from '@/lib/images'
import { getAllPostMeta } from '@/lib/blog'

// Variant F: Image-forward. Warm, contextual Pexels photo in hero.
// Split layout desktop (prose left / image right), stacked mobile.
// Featured-articles strip below hero to make the content immediately browsable.

const VALUE_PROPS = [
  {
    num:   '01',
    title: 'Guided forms, done right.',
    body:  'NashPlus walks you through every field in Form 13 and Form 13.1. It knows what Ontario courts require — so you never have to guess.',
  },
  {
    num:   '02',
    title: 'Clear language, real answers.',
    body:  'Equalization, financial disclosure, family court procedure — all explained in plain English. No legal training required.',
  },
  {
    num:   '03',
    title: 'Built for Ontario family court.',
    body:  'Every form, every field, every rule is specific to Ontario. Not generic legal templates — the real thing, completed correctly.',
  },
]

export default function Home() {
  const heroImage    = getHeroImage()
  const allPosts     = getAllPostMeta()
  const featuredPosts = allPosts.filter(p => p.featured).slice(0, 3)
  const recentPosts   = featuredPosts.length >= 3 ? featuredPosts : allPosts.slice(0, 3)

  return (
    <main>

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="hero-section">
        <div className="hero-inner">

          {/* Left: text content */}
          <div className="hero-text fade-up" style={{ animationDelay: '0ms' }}>
            <p className="hero-eyebrow">Nash+ &middot; Ontario Family Law</p>

            <h1 className="hero-h1">
              Form&nbsp;13.<br />
              <span style={{ color: 'var(--green-600)' }}>Made clear.</span>
            </h1>

            <p className="hero-sub">
              Precise, plain-language guidance for Form 13, financial disclosure,
              equalization, and Ontario family court procedure. Every article cited.
              No guesswork.
            </p>

            <div className="hero-actions">
              <a href={PRODUCT_URL} className="btn-primary">
                Start with NashPlus
              </a>
              <Link href="/blog" className="btn-ghost">
                Browse 62 guides &rarr;
              </Link>
            </div>

            {/* Stats */}
            <div className="hero-stats fade-up" style={{ animationDelay: '300ms' }}>
              {[
                { value: '62', label: 'plain-language guides' },
                { value: '8',  label: 'topic clusters' },
                { value: '0',  label: 'legalese' },
              ].map((s, i) => (
                <div key={i} className="hero-stat">
                  <span className="hero-stat-value">{s.value}</span>
                  <span className="hero-stat-label">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: contextual photo */}
          <div className="hero-image-wrap fade-in" style={{ animationDelay: '150ms' }}>
            <Image
              src={heroImage.src}
              alt={heroImage.alt}
              fill
              sizes="(max-width: 767px) 100vw, 50vw"
              style={{ objectFit: 'cover' }}
              priority
            />
          </div>

        </div>
      </section>

      {/* ── FEATURED ARTICLES ────────────────────────────────────── */}
      <section className="featured-section">
        <div className="featured-header">
          <p className="featured-eyebrow">Start here</p>
          <h2 className="featured-title">Recent guides</h2>
          <Link href="/blog" className="featured-see-all">
            All 62 guides &rarr;
          </Link>
        </div>

        <div className="featured-grid">
          {recentPosts.map((post, i) => (
            <ArticleCard
              key={post.slug}
              post={post}
              index={i}
              priority={i === 0}
              sizes="(max-width: 767px) 100vw, (max-width: 1199px) 50vw, 33vw"
            />
          ))}
        </div>
      </section>

      {/* ── VALUE PROPS ──────────────────────────────────────────── */}
      <section className="value-section">
        <p className="reveal" style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-meta)', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--green-600)', margin: '0 0 clamp(2.5rem, 5vw, 4rem)' }}>
          How it works
        </p>
        <div className="value-grid">
          {VALUE_PROPS.map((item, i) => (
            <div
              key={i}
              className="reveal value-item"
              style={{ '--reveal-delay': `${i * 100}ms` } as React.CSSProperties}
            >
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-meta)', letterSpacing: '0.3em', color: 'var(--green-400)', margin: '0 0 0.875rem' }}>
                {item.num}
              </p>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-cluster)', fontWeight: 600, fontStyle: 'normal', fontOpticalSizing: 'auto', color: 'var(--ink)', lineHeight: 1.15, letterSpacing: '-0.02em', margin: '0 0 0.75rem' } as React.CSSProperties}>
                {item.title}
              </h3>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-body)', color: 'var(--ink-muted)', lineHeight: 'var(--lh-body)', margin: 0 }}>
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA STRIP ────────────────────────────────────────────── */}
      <section style={{ backgroundColor: 'var(--green-600)', padding: 'clamp(4rem, 8vw, 7rem) var(--gutter)', position: 'relative', overflow: 'hidden' }}>
        <div aria-hidden style={{ position: 'absolute', bottom: '-30%', right: '-10%', width: 'clamp(280px, 50vw, 640px)', height: 'clamp(280px, 50vw, 640px)', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.07)', pointerEvents: 'none' }} />
        <div className="reveal" style={{ maxWidth: '560px', position: 'relative', zIndex: 1 }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-display)', fontWeight: 600, fontStyle: 'italic', fontOpticalSizing: 'auto', color: 'var(--canvas)', lineHeight: 1.15, letterSpacing: '-0.02em', margin: '0 0 1.25rem' } as React.CSSProperties}>
            You don&apos;t have to navigate this alone.
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-body)', color: 'rgba(255,255,255,0.72)', lineHeight: 'var(--lh-body)', margin: '0 0 2.5rem' }}>
            NashPlus walks you through Form 13 and financial disclosure, step by step, with clear guidance at every field.
          </p>
          <a href={PRODUCT_URL} className="cta-strip-btn">
            Start with NashPlus
          </a>
        </div>
      </section>

      <SiteFooter />

      <style>{`
        /* ── Hero ─────────────────────────────────────────── */
        .hero-section {
          padding: clamp(4rem, 8vw, 7rem) var(--gutter) clamp(3rem, 6vw, 5rem);
        }
        .hero-inner {
          display: flex;
          gap:     clamp(2.5rem, 5vw, 5rem);
          align-items: center;
        }
        .hero-text {
          flex:     1 1 55%;
          min-width: 0;
        }
        .hero-image-wrap {
          flex:     1 1 45%;
          position: relative;
          aspect-ratio: 4 / 3;
          border-radius: 8px;
          overflow: hidden;
          flex-shrink: 0;
          min-height: 280px;
        }
        @media (max-width: 767px) {
          .hero-inner        { flex-direction: column; }
          .hero-image-wrap   {
            flex:  0 0 auto;
            width: 100%;
            aspect-ratio: 16 / 9;
            order: -1;
          }
        }

        .hero-eyebrow {
          font-family:    var(--font-mono);
          font-size:      var(--text-meta);
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color:          var(--green-600);
          margin:         0 0 1.5rem;
        }
        .hero-h1 {
          font-family:    var(--font-display);
          font-size:      var(--text-hero);
          font-weight:    800;
          font-style:     normal;
          font-optical-sizing: auto;
          letter-spacing: -0.03em;
          line-height:    1.05;
          color:          var(--ink);
          margin:         0 0 1.5rem;
          max-width:      14ch;
        }
        .hero-sub {
          font-family: var(--font-body);
          font-size:   var(--text-lead);
          color:       var(--ink-muted);
          line-height: var(--lh-body);
          max-width:   42ch;
          margin:      0 0 2rem;
        }
        .hero-actions {
          display:     flex;
          gap:         1.5rem;
          align-items: center;
          flex-wrap:   wrap;
          margin-bottom: 2.5rem;
        }
        .hero-stats {
          display:  flex;
          gap:      2.5rem;
          flex-wrap: wrap;
          padding-top: 0.5rem;
          border-top: 1px solid var(--border-light);
        }
        .hero-stat { display: flex; flex-direction: column; gap: 0.25rem; }
        .hero-stat-value {
          font-family: var(--font-display);
          font-weight: 700;
          font-size:   clamp(1.75rem, 3.5vw, 2.5rem);
          color:       var(--green-600);
          line-height: 1;
          font-optical-sizing: auto;
        }
        .hero-stat-label {
          font-family:    var(--font-mono);
          font-size:      var(--text-meta);
          letter-spacing: 0.14em;
          color:          var(--ink-muted);
          text-transform: uppercase;
        }

        /* ── Featured articles ────────────────────────────── */
        .featured-section {
          padding:          0 var(--gutter) clamp(4rem, 8vw, 7rem);
          background:       #fafaf8;
        }
        .featured-header {
          display:      flex;
          align-items:  baseline;
          gap:          1.25rem;
          flex-wrap:    wrap;
          padding-top:  clamp(3rem, 6vw, 5rem);
          padding-bottom: clamp(1.5rem, 3vw, 2.5rem);
          border-top:   2px solid var(--border);
        }
        .featured-eyebrow {
          font-family:    var(--font-mono);
          font-size:      var(--text-meta);
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color:          var(--green-600);
          margin:         0;
        }
        .featured-title {
          font-family:   var(--font-display);
          font-size:     clamp(1.375rem, 2.5vw, 1.75rem);
          font-weight:   700;
          font-style:    normal;
          color:         var(--ink);
          margin:        0;
          letter-spacing: -0.02em;
          flex:          1;
        }
        .featured-see-all {
          font-family:    var(--font-mono);
          font-size:      var(--text-meta);
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color:          var(--green-700);
          text-decoration: none;
          transition:     color 180ms;
          white-space:    nowrap;
        }
        .featured-see-all:hover { color: var(--green-600); }
        .featured-grid {
          display:               grid;
          grid-template-columns: repeat(3, 1fr);
          gap:                   1.5rem;
          align-items:           start;
        }
        @media (max-width: 1023px) {
          .featured-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 599px) {
          .featured-grid { grid-template-columns: 1fr; }
        }

        /* ── Value props ──────────────────────────────────── */
        .value-section {
          padding: clamp(4rem, 8vw, 7rem) var(--gutter);
        }
        .value-grid {
          display:               grid;
          grid-template-columns: repeat(auto-fit, minmax(min(100%, 240px), 1fr));
          gap:                   clamp(2.5rem, 5vw, 4rem) clamp(3rem, 6vw, 5rem);
        }
        .value-item {}

        /* ── CTA strip button ─────────────────────────────── */
        .cta-strip-btn {
          display:         inline-flex;
          align-items:     center;
          font-family:     var(--font-body);
          font-size:       1rem;
          font-weight:     600;
          color:           var(--green-700);
          background:      var(--canvas);
          text-decoration: none;
          padding:         0.875rem 2rem;
          border-radius:   4px;
          min-height:      48px;
          transition:      background 180ms;
        }
        .cta-strip-btn:hover { background: #ede7e0; }
      `}</style>
    </main>
  )
}
