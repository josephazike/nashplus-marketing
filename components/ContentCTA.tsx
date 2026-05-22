// Reusable CTA component for the content library.
// Routes to the NashPlus product (signup) only.
// Never links to Legal Aid, the Law Society Referral Service, or any external service.
// UPL-safe: no banned phrases, no outcome predictions, no "guaranteed".

const PRODUCT_SIGNUP_URL = 'https://web-taupe-omega-74.vercel.app/signup'

interface ContentCTAProps {
  heading?: string
  body?:    string
  cta?:     string
  style?:   React.CSSProperties
}

export function ContentCTA({
  heading = 'Ready to start your financial statement?',
  body    = 'NashPlus walks you through Form 13 and Form 13.1 step by step, pre-fills what it can from your documents, and generates a court-ready file. No prior legal knowledge required.',
  cta     = 'Start with NashPlus',
  style,
}: ContentCTAProps) {
  return (
    <aside
      style={{
        borderTop:    '1px solid rgba(250,248,243,0.12)',
        borderBottom: '1px solid rgba(250,248,243,0.12)',
        padding:      'clamp(2rem, 4vw, 2.5rem) 0',
        margin:       'clamp(2.5rem, 5vw, 4rem) 0',
        ...style,
      }}
    >
      <p style={{
        fontFamily:    'var(--font-geist-mono)',
        fontSize:      '0.55rem',
        letterSpacing: '0.3em',
        textTransform: 'uppercase',
        color:         'var(--gold)',
        margin:        '0 0 1rem',
      }}>
        Nash+ / Get Started
      </p>

      <h3 style={{
        fontFamily:    'var(--font-playfair)',
        fontSize:      'clamp(1.35rem, 2.5vw, 1.75rem)',
        fontWeight:    600,
        color:         'var(--cream)',
        letterSpacing: '-0.01em',
        lineHeight:    1.2,
        margin:        '0 0 0.75rem',
      }}>
        {heading}
      </h3>

      <p style={{
        fontFamily: 'var(--font-playfair)',
        fontSize:   'clamp(0.95rem, 1.8vw, 1.05rem)',
        fontWeight: 300,
        fontStyle:  'italic',
        color:      'var(--muted)',
        lineHeight: 1.65,
        margin:     '0 0 1.5rem',
        maxWidth:   '520px',
      }}>
        {body}
      </p>

      <a
        href={PRODUCT_SIGNUP_URL}
        style={{
          display:         'inline-block',
          fontFamily:      'var(--font-geist-mono)',
          fontSize:        '0.55rem',
          letterSpacing:   '0.3em',
          textTransform:   'uppercase',
          color:           'var(--bg)',
          backgroundColor: 'var(--gold)',
          padding:         '0.75rem 1.5rem',
          textDecoration:  'none',
        }}
      >
        {cta} →
      </a>
    </aside>
  )
}
