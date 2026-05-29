import Link from 'next/link'
import { LegalDisclaimer } from '@/components/LegalDisclaimer'

interface SiteFooterProps {
  style?: React.CSSProperties
}

export function SiteFooter({ style }: SiteFooterProps) {
  return (
    <footer
      style={{
        padding:        'clamp(3rem, 6vw, 4.5rem) var(--gutter)',
        borderTop:      '1px solid var(--border-light)',
        display:        'flex',
        justifyContent: 'space-between',
        alignItems:     'flex-start',
        flexWrap:       'wrap',
        gap:            '2rem',
        ...style,
      }}
    >
      <div style={{ maxWidth: '600px' }}>
        <LegalDisclaimer />
        <p style={{
          fontFamily:    'var(--font-mono)',
          fontSize:      '0.5rem',
          letterSpacing: '0.15em',
          color:         'var(--ink-muted)',
          lineHeight:    1.85,
          margin:        '0.75rem 0 0',
        }}>
          Information, not legal advice. Consult a licensed Ontario lawyer.
        </p>
      </div>
      <div style={{
        display:       'flex',
        flexDirection: 'column',
        alignItems:    'flex-end',
        gap:           '0.75rem',
        flexShrink:    0,
      }}>
        <Link
          href="/blog"
          style={{
            fontFamily:     'var(--font-mono)',
            fontSize:       '0.5rem',
            letterSpacing:  '0.2em',
            textTransform:  'uppercase',
            color:          'var(--ink-muted)',
            textDecoration: 'none',
            transition:     'color 200ms',
          }}
        >
          All resources →
        </Link>
        <p style={{
          fontFamily:    'var(--font-mono)',
          fontSize:      '0.5rem',
          letterSpacing: '0.15em',
          color:         'var(--ink-faint)',
          margin:        0,
        }}>
          2026 NashPlus
        </p>
      </div>
    </footer>
  )
}
