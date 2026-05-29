import Link from 'next/link'
import { SIGNUP_URL as PRODUCT_URL } from '@/lib/config'
import { SiteFooter } from '@/components/SiteFooter'

// Variant E: Minimal brand statement — "Form 13. Made clear."
// Decision 3: homepage keeps stone canvas (--canvas), reading surfaces use #fafaf8.
// Fonts: Fraunces display (opsz auto), Inter body.

const STATS = [
  { value: '62', label: 'plain-language guides' },
  { value: '8',  label: 'topic clusters' },
  { value: '0',  label: 'legalese' },
]

const VALUE_PROPS = [
  {
    num:   '01',
    title: 'Guided forms, done right.',
    body:  'NashPlus walks you through every field in Form 13 and Form 13.1. It knows what Ontario courts require -- so you never have to guess.',
  },
  {
    num:   '02',
    title: 'Clear language, real answers.',
    body:  'Equalization, financial disclosure, family court procedure -- all explained in plain English. No legal training required.',
  },
  {
    num:   '03',
    title: 'Built for Ontario family court.',
    body:  'Every form, every field, every rule is specific to Ontario. Not generic legal templates -- the real thing, completed correctly.',
  },
]

export default function Home() {
  return (
    <main>

      {/* ── HERO -- Variant E: Minimal brand statement ─────── */}
      <section
        style={{
          minHeight:      'clamp(72vh, 82vh, 88vh)',
          display:        'flex',
          flexDirection:  'column',
          justifyContent: 'center',
          padding:        `clamp(5rem, 10vw, 8rem) var(--gutter) clamp(3rem, 6vw, 5rem)`,
          position:       'relative',
        }}
      >
        <div className="fade-up" style={{ animationDelay: '0ms' }}>
          {/* Eyebrow */}
          <p style={{
            fontFamily:    'var(--font-mono)',
            fontSize:      'var(--text-label)',
            letterSpacing: '0.36em',
            textTransform: 'uppercase',
            color:         'var(--green-600)',
            margin:        '0 0 2rem',
          }}>
            Nash+ / Ontario Family Law
          </p>

          {/* Hero headline: two punchy lines in one H1 */}
          <h1 style={{
            fontFamily:        'var(--font-display)',
            fontSize:          'var(--text-hero)',
            fontWeight:        800,
            fontStyle:         'normal',
            fontOpticalSizing: 'auto',
            letterSpacing:     '-0.03em',
            lineHeight:        'var(--lh-tight)',
            color:             'var(--ink)',
            margin:            '0',
            maxWidth:          '14ch',
          } as React.CSSProperties}>
            Form 13.
            <br />
            <span style={{ color: 'var(--green-600)' }}>Made clear.</span>
          </h1>
        </div>

        {/* Green accent rule */}
        <div
          className="line-grow"
          style={{
            width:           '64px',
            height:          '3px',
            backgroundColor: 'var(--green-600)',
            margin:          '2.5rem 0',
            animationDelay:  '200ms',
          }}
        />

        {/* Subhead + CTAs */}
        <div className="fade-up" style={{ animationDelay: '250ms' }}>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize:   'var(--text-lead)',
            fontWeight: 400,
            color:      'var(--ink-muted)',
            lineHeight: 'var(--lh-lead)',
            maxWidth:   '44ch',
            margin:     '0 0 2.5rem',
          }}>
            Precise, plain-language guidance for Form 13, financial disclosure,
            equalization, and Ontario family court procedure. Every article cited.
            No guesswork.
          </p>

          <div style={{
            display:    'flex',
            gap:        '2rem',
            alignItems: 'center',
            flexWrap:   'wrap',
          }}>
            <a href={PRODUCT_URL} className="btn-primary">
              Start with NashPlus
            </a>
            <Link href="/blog" className="btn-ghost">
              Browse 62 guides &#8594;
            </Link>
          </div>
        </div>

        {/* Stats row */}
        <div
          className="fade-up"
          style={{
            display:        'flex',
            gap:            '2.5rem',
            marginTop:      '3.5rem',
            flexWrap:       'wrap',
            animationDelay: '400ms',
          }}
        >
          {STATS.map((s, i) => (
            <div key={i}>
              <span style={{
                display:    'block',
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize:   'clamp(1.875rem, 3.5vw, 2.5rem)',
                color:      'var(--green-600)',
                lineHeight: 1,
                marginBottom: '0.25rem',
                fontOpticalSizing: 'auto',
              } as React.CSSProperties}>
                {s.value}
              </span>
              <span style={{
                fontFamily:    'var(--font-mono)',
                fontSize:      'var(--text-meta)',
                letterSpacing: '0.12em',
                color:         'var(--ink-muted)',
                textTransform: 'uppercase',
              }}>
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── VALUE PROPS ───────────────────────────────────────── */}
      <section style={{ padding: `0 var(--gutter) var(--section-gap)` }}>
        <div style={{
          borderTop:  '1px solid var(--border)',
          paddingTop: 'clamp(3rem, 6vw, 5rem)',
        }}>
          <p
            className="reveal"
            style={{
              fontFamily:    'var(--font-mono)',
              fontSize:      'var(--text-meta)',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color:         'var(--green-600)',
              margin:        '0 0 clamp(2.5rem, 5vw, 4rem)',
            }}
          >
            How it works
          </p>

          <div style={{
            display:             'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
            gap:                 'clamp(2.5rem, 5vw, 4rem) clamp(3rem, 6vw, 5rem)',
          }}>
            {VALUE_PROPS.map((item, i) => (
              <div
                key={i}
                className="reveal"
                style={{ '--reveal-delay': `${i * 100}ms` } as React.CSSProperties}
              >
                <p style={{
                  fontFamily:    'var(--font-mono)',
                  fontSize:      'var(--text-meta)',
                  letterSpacing: '0.3em',
                  color:         'var(--green-400)',
                  margin:        '0 0 1rem',
                }}>
                  {item.num}
                </p>
                <h3 style={{
                  fontFamily:        'var(--font-display)',
                  fontSize:          'var(--text-cluster)',
                  fontWeight:        600,
                  fontStyle:         'normal',
                  fontOpticalSizing: 'auto',
                  color:             'var(--ink)',
                  lineHeight:        'var(--lh-heading)',
                  letterSpacing:     '-0.02em',
                  margin:            '0 0 0.875rem',
                } as React.CSSProperties}>
                  {item.title}
                </h3>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize:   'var(--text-body)',
                  color:      'var(--ink-muted)',
                  lineHeight: 'var(--lh-body)',
                  margin:     0,
                }}>
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA STRIP ─────────────────────────────────────────── */}
      <section style={{
        backgroundColor: 'var(--green-600)',
        padding:         'clamp(4rem, 8vw, 7rem) var(--gutter)',
        position:        'relative',
        overflow:        'hidden',
      }}>
        <div aria-hidden style={{
          position:      'absolute',
          bottom:        '-30%',
          right:         '-10%',
          width:         'clamp(280px, 50vw, 640px)',
          height:        'clamp(280px, 50vw, 640px)',
          borderRadius:  '50%',
          border:        '1px solid rgba(255,255,255,0.07)',
          pointerEvents: 'none',
        }} />

        <div className="reveal" style={{ maxWidth: '560px', position: 'relative', zIndex: 1 }}>
          <p style={{
            fontFamily:    'var(--font-mono)',
            fontSize:      'var(--text-meta)',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color:         'rgba(255,255,255,0.45)',
            margin:        '0 0 1.5rem',
          }}>
            Nash+ / Get started
          </p>
          <h2 style={{
            fontFamily:        'var(--font-display)',
            fontSize:          'var(--text-display)',
            fontWeight:        600,
            fontStyle:         'italic',
            fontOpticalSizing: 'auto',
            color:             'var(--canvas)',
            lineHeight:        'var(--lh-heading)',
            letterSpacing:     '-0.02em',
            margin:            '0 0 1.25rem',
          } as React.CSSProperties}>
            You don&#8217;t have to navigate this alone.
          </h2>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize:   'var(--text-body)',
            color:      'rgba(255,255,255,0.72)',
            lineHeight: 'var(--lh-body)',
            margin:     '0 0 2.5rem',
          }}>
            NashPlus walks you through Form 13 and financial disclosure, step by
            step, with clear guidance at every field.
          </p>
          <a
            href={PRODUCT_URL}
            style={{
              display:         'inline-flex',
              alignItems:      'center',
              fontFamily:      'var(--font-mono)',
              fontSize:        'var(--text-label)',
              letterSpacing:   '0.26em',
              textTransform:   'uppercase',
              color:           'var(--green-700)',
              backgroundColor: 'var(--canvas)',
              textDecoration:  'none',
              padding:         '0.875rem 2.25rem',
              minHeight:       '44px',
              transition:      'background-color 200ms',
            }}
          >
            Start with NashPlus
          </a>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────── */}
      <SiteFooter />

    </main>
  )
}
