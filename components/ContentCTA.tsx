// Reusable CTA component for the content library.
// Routes to the NashPlus product (signup) only.
// Never links to Legal Aid, the Law Society Referral Service, or any external service.
// UPL-safe: no banned phrases, no outcome predictions, no "guaranteed".

import { SIGNUP_URL as PRODUCT_SIGNUP_URL } from '@/lib/config'

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
        borderTop:    '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        padding:      'clamp(2rem, 4vw, 2.5rem) 0',
        margin:       'clamp(2.5rem, 5vw, 4rem) 0',
        ...style,
      }}
    >
      <p style={{
        fontFamily:    'var(--font-mono)',
        fontSize:      '0.55rem',
        letterSpacing: '0.3em',
        textTransform: 'uppercase',
        color:         'var(--green-600)',
        margin:        '0 0 1rem',
      }}>
        Nash+ / Get Started
      </p>

      <h3 style={{
        fontFamily:        'var(--font-display)',
        fontSize:          'var(--text-h2)',
        fontWeight:        600,
        fontStyle:         'normal',
        fontOpticalSizing: 'auto',
        color:             'var(--ink)',
        letterSpacing:     '-0.02em',
        lineHeight:        'var(--lh-heading)',
        margin:            '0 0 0.75rem',
      } as React.CSSProperties}>
        {heading}
      </h3>

      <p style={{
        fontFamily: 'var(--font-body)',
        fontSize:   'var(--text-body)',
        fontStyle:  'normal',
        color:      'var(--ink-secondary)',
        lineHeight: 'var(--lh-body)',
        margin:     '0 0 1.75rem',
        maxWidth:   '52ch',
      }}>
        {body}
      </p>

      <a
        href={PRODUCT_SIGNUP_URL}
        className="btn-primary"
      >
        {cta} →
      </a>
    </aside>
  )
}
