import Link from 'next/link'
import { getAllPostMeta, formatDate, CATEGORY_LABELS } from '@/lib/blog'

const PRODUCT_URL = 'https://web-taupe-omega-74.vercel.app/signup'

const VALUE_PROPS = [
  {
    num:   '01',
    title: 'Guided forms, done right.',
    body:  'NashPlus walks you through every field in Form 13 and Form 13.1. It knows what Ontario courts require — so you don\'t have to guess.',
  },
  {
    num:   '02',
    title: 'Clear language, real answers.',
    body:  'Our resources explain equalization, financial disclosure, and family court procedure in plain English. No legal training required.',
  },
  {
    num:   '03',
    title: 'Built for Ontario family court.',
    body:  'Every form, every field, every rule is specific to Ontario. Not generic legal templates — the real thing, completed correctly.',
  },
]

export default function Home() {
  const posts = getAllPostMeta().slice(0, 3)

  return (
    <main>

      {/* ── HERO ──────────────────────────────────────────────── */}
      <section
        style={{
          minHeight:      'calc(100vh - 3.75rem)',
          display:        'flex',
          flexDirection:  'column',
          justifyContent: 'center',
          padding:        `clamp(5rem, 12vw, 9rem) var(--gutter) clamp(4rem, 8vw, 6rem)`,
          position:       'relative',
        }}
      >
        {/* Subtle decorative background circle */}
        <div
          aria-hidden
          style={{
            position:        'absolute',
            top:             '-10%',
            right:           '-8%',
            width:           'clamp(280px, 45vw, 640px)',
            height:          'clamp(280px, 45vw, 640px)',
            borderRadius:    '50%',
            backgroundColor: 'var(--green-50)',
            opacity:         0.55,
            pointerEvents:   'none',
            zIndex:          0,
          }}
        />

        <div style={{ position: 'relative', zIndex: 1 }}>
          {/* Eyebrow label */}
          <p
            className="fade-up"
            style={{
              fontFamily:     'var(--font-mono)',
              fontSize:       '0.625rem',
              letterSpacing:  '0.36em',
              textTransform:  'uppercase',
              color:          'var(--green-600)',
              margin:         '0 0 2.25rem',
              animationDelay: '0ms',
            }}
          >
            Nash+ / Ontario Family Law
          </p>

          {/* Main heading */}
          <h1
            className="fade-up"
            style={{
              fontFamily:     'var(--font-display)',
              fontSize:       'clamp(3.75rem, 9.5vw, 9rem)',
              fontWeight:     300,
              fontStyle:      'italic',
              letterSpacing:  '-0.025em',
              lineHeight:     0.97,
              color:          'var(--ink)',
              margin:         '0 0 0',
              maxWidth:       '15ch',
              animationDelay: '100ms',
            }}
          >
            Ontario family law,{' '}
            <span
              style={{
                fontStyle:  'normal',
                fontWeight: 600,
                color:      'var(--green-600)',
              }}
            >
              made accessible.
            </span>
          </h1>

          {/* Green accent rule */}
          <div
            className="line-grow"
            style={{
              width:           '72px',
              height:          '3px',
              backgroundColor: 'var(--green-600)',
              margin:          '2.75rem 0',
              animationDelay:  '340ms',
            }}
          />

          {/* Subheading */}
          <p
            className="fade-up"
            style={{
              fontFamily:     'var(--font-body)',
              fontSize:       'clamp(1rem, 2vw, 1.2rem)',
              fontWeight:     400,
              color:          'var(--ink-muted)',
              lineHeight:     1.75,
              maxWidth:       '44ch',
              margin:         '0 0 3rem',
              animationDelay: '420ms',
            }}
          >
            NashPlus guides you through Form 13 and financial disclosure — step
            by step, in plain language. No prior legal knowledge required.
          </p>

          {/* CTA row */}
          <div
            className="fade-up"
            style={{
              display:        'flex',
              gap:            '2.25rem',
              alignItems:     'center',
              flexWrap:       'wrap',
              animationDelay: '560ms',
            }}
          >
            <a href={PRODUCT_URL} className="btn-primary">
              Start with NashPlus
            </a>
            <Link href="/blog" className="btn-ghost">
              Read our guides <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── VALUE PROPS ───────────────────────────────────────── */}
      <section
        style={{
          padding: `0 var(--gutter) var(--section-gap)`,
        }}
      >
        <div
          style={{
            borderTop:  '1px solid var(--border)',
            paddingTop: 'clamp(3rem, 6vw, 5rem)',
          }}
        >
          <p
            className="reveal"
            style={{
              fontFamily:    'var(--font-mono)',
              fontSize:      '0.6rem',
              letterSpacing: '0.36em',
              textTransform: 'uppercase',
              color:         'var(--green-600)',
              margin:        '0 0 clamp(2.5rem, 5vw, 4rem)',
            }}
          >
            How it works
          </p>

          <div
            style={{
              display:             'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
              gap:                 'clamp(2.5rem, 5vw, 4rem) clamp(3rem, 6vw, 5rem)',
            }}
          >
            {VALUE_PROPS.map((item, i) => (
              <div
                key={i}
                className="reveal"
                style={{ '--reveal-delay': `${i * 120}ms` } as React.CSSProperties}
              >
                <p
                  style={{
                    fontFamily:    'var(--font-mono)',
                    fontSize:      '0.575rem',
                    letterSpacing: '0.3em',
                    color:         'var(--green-400)',
                    margin:        '0 0 1.25rem',
                  }}
                >
                  {item.num}
                </p>
                <h3
                  style={{
                    fontFamily:    'var(--font-display)',
                    fontSize:      'clamp(1.5rem, 2.8vw, 2rem)',
                    fontWeight:    600,
                    fontStyle:     'italic',
                    color:         'var(--ink)',
                    lineHeight:    1.15,
                    letterSpacing: '-0.015em',
                    margin:        '0 0 1rem',
                  }}
                >
                  {item.title}
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize:   '0.9375rem',
                    color:      'var(--ink-muted)',
                    lineHeight: 1.8,
                    margin:     0,
                  }}
                >
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RESOURCES ─────────────────────────────────────────── */}
      {posts.length > 0 && (
        <section
          style={{
            padding: `0 var(--gutter) var(--section-gap)`,
          }}
        >
          <div
            style={{
              borderTop:  '1px solid var(--border)',
              paddingTop: 'clamp(3rem, 6vw, 5rem)',
            }}
          >
            <div
              className="reveal"
              style={{
                display:        'flex',
                justifyContent: 'space-between',
                alignItems:     'baseline',
                marginBottom:   'clamp(2rem, 4vw, 3rem)',
                flexWrap:       'wrap',
                gap:            '1rem',
              }}
            >
              <p
                style={{
                  fontFamily:    'var(--font-mono)',
                  fontSize:      '0.6rem',
                  letterSpacing: '0.36em',
                  textTransform: 'uppercase',
                  color:         'var(--green-600)',
                  margin:        0,
                }}
              >
                From our resources
              </p>
              <Link
                href="/blog"
                style={{
                  fontFamily:     'var(--font-mono)',
                  fontSize:       '0.55rem',
                  letterSpacing:  '0.26em',
                  textTransform:  'uppercase',
                  color:          'var(--ink-faint)',
                  textDecoration: 'none',
                  transition:     'color 200ms',
                }}
              >
                View all →
              </Link>
            </div>

            <div
              style={{
                display:             'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))',
                gap:                 0,
              }}
            >
              {posts.map((post, i) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  style={{ textDecoration: 'none' }}
                >
                  <article
                    className="reveal hover-lift"
                    style={{
                      padding:      'clamp(1.75rem, 3vw, 2.25rem) 0',
                      paddingRight: 'clamp(0rem, 4vw, 3.5rem)',
                      borderBottom: '1px solid var(--border-light)',
                      cursor:       'pointer',
                      '--reveal-delay': `${i * 100}ms`,
                    } as React.CSSProperties}
                  >
                    <span
                      style={{
                        fontFamily:    'var(--font-mono)',
                        fontSize:      '0.55rem',
                        letterSpacing: '0.3em',
                        textTransform: 'uppercase',
                        color:         'var(--green-600)',
                        display:       'block',
                        marginBottom:  '0.75rem',
                      }}
                    >
                      {CATEGORY_LABELS[post.category]}
                    </span>
                    <h3
                      style={{
                        fontFamily:    'var(--font-display)',
                        fontSize:      'clamp(1.3rem, 2.4vw, 1.7rem)',
                        fontWeight:    600,
                        color:         'var(--ink)',
                        lineHeight:    1.2,
                        margin:        '0 0 0.65rem',
                        letterSpacing: '-0.01em',
                      }}
                    >
                      {post.title}
                    </h3>
                    <p
                      style={{
                        fontFamily:       'var(--font-body)',
                        fontSize:         '0.875rem',
                        fontStyle:        'italic',
                        color:            'var(--ink-muted)',
                        lineHeight:       1.65,
                        margin:           '0 0 1.1rem',
                        display:          '-webkit-box',
                        WebkitLineClamp:  2,
                        WebkitBoxOrient:  'vertical',
                        overflow:         'hidden',
                      } as React.CSSProperties}
                    >
                      {post.description}
                    </p>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                      <span
                        style={{
                          fontFamily:    'var(--font-mono)',
                          fontSize:      '0.5rem',
                          letterSpacing: '0.2em',
                          color:         'var(--ink-faint)',
                        }}
                      >
                        {post.readingTime} min read
                      </span>
                      <span
                        style={{
                          fontFamily:    'var(--font-mono)',
                          fontSize:      '0.5rem',
                          letterSpacing: '0.2em',
                          color:         'var(--ink-faint)',
                        }}
                      >
                        {formatDate(post.date)}
                      </span>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA STRIP ─────────────────────────────────────────── */}
      <section
        style={{
          backgroundColor: 'var(--green-600)',
          padding:         'clamp(4rem, 8vw, 7rem) var(--gutter)',
          position:        'relative',
          overflow:        'hidden',
        }}
      >
        {/* Decorative background arc */}
        <div
          aria-hidden
          style={{
            position:        'absolute',
            bottom:          '-30%',
            right:           '-10%',
            width:           'clamp(300px, 55vw, 700px)',
            height:          'clamp(300px, 55vw, 700px)',
            borderRadius:    '50%',
            border:          '1px solid rgba(255,255,255,0.08)',
            pointerEvents:   'none',
          }}
        />
        <div
          aria-hidden
          style={{
            position:      'absolute',
            bottom:        '-15%',
            right:         '5%',
            width:         'clamp(180px, 35vw, 440px)',
            height:        'clamp(180px, 35vw, 440px)',
            borderRadius:  '50%',
            border:        '1px solid rgba(255,255,255,0.06)',
            pointerEvents: 'none',
          }}
        />

        <div className="reveal" style={{ maxWidth: '600px', position: 'relative', zIndex: 1 }}>
          <p
            style={{
              fontFamily:    'var(--font-mono)',
              fontSize:      '0.575rem',
              letterSpacing: '0.36em',
              textTransform: 'uppercase',
              color:         'rgba(255,255,255,0.45)',
              margin:        '0 0 1.5rem',
            }}
          >
            Nash+ / Get started
          </p>
          <h2
            style={{
              fontFamily:    'var(--font-display)',
              fontSize:      'clamp(2.25rem, 5vw, 4rem)',
              fontWeight:    300,
              fontStyle:     'italic',
              color:         'var(--canvas)',
              lineHeight:    1.1,
              letterSpacing: '-0.015em',
              margin:        '0 0 1.5rem',
            }}
          >
            You don't have to navigate
            this alone.
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize:   'clamp(0.95rem, 1.8vw, 1.1rem)',
              color:      'rgba(255,255,255,0.7)',
              lineHeight: 1.75,
              margin:     '0 0 2.75rem',
            }}
          >
            NashPlus walks you through Form 13 and financial disclosure, step by
            step, with clear guidance at every field.
          </p>
          <a
            href={PRODUCT_URL}
            style={{
              display:         'inline-block',
              fontFamily:      'var(--font-mono)',
              fontSize:        '0.65rem',
              letterSpacing:   '0.26em',
              textTransform:   'uppercase',
              color:           'var(--green-600)',
              backgroundColor: 'var(--canvas)',
              padding:         '0.9rem 2.25rem',
              textDecoration:  'none',
              transition:      'background-color 220ms, transform 220ms',
            }}
          >
            Start with NashPlus
          </a>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────── */}
      <footer
        style={{
          padding:         'clamp(3rem, 6vw, 4.5rem) var(--gutter)',
          borderTop:       '1px solid var(--border-light)',
          display:         'flex',
          justifyContent:  'space-between',
          alignItems:      'flex-start',
          flexWrap:        'wrap',
          gap:             '2rem',
        }}
      >
        <p
          style={{
            fontFamily:    'var(--font-mono)',
            fontSize:      '0.5rem',
            letterSpacing: '0.15em',
            color:         'var(--ink-muted)',
            lineHeight:    1.85,
            maxWidth:      '600px',
            margin:        0,
          }}
        >
          NashPlus provides legal information and document automation. It is not a law
          firm and does not provide legal advice. It is not a substitute for advice
          from a licensed Ontario lawyer.
        </p>
        <p
          style={{
            fontFamily:    'var(--font-mono)',
            fontSize:      '0.5rem',
            letterSpacing: '0.15em',
            color:         'var(--ink-faint)',
            margin:        0,
            flexShrink:    0,
          }}
        >
          2025 NashPlus
        </p>
      </footer>

    </main>
  )
}
