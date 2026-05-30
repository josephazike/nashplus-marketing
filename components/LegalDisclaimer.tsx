// Canonical "information not advice" disclaimer block.
// Include at the bottom of every article page and the blog index.
// Do NOT inline the disclaimer text elsewhere — import this component instead.

interface LegalDisclaimerProps {
  style?: React.CSSProperties
}

export function LegalDisclaimer({ style }: LegalDisclaimerProps) {
  return (
    <p
      style={{
        fontFamily:    'var(--font-mono)',
        fontSize:      '0.875rem',
        letterSpacing: '0.04em',
        color:         'var(--ink-secondary)',
        lineHeight:    1.7,
        maxWidth:      '680px',
        margin:        0,
        ...style,
      }}
    >
      NashPlus provides legal information and document automation. It is not a law firm
      and does not provide legal advice. It is not a substitute for advice from a licensed
      Ontario lawyer.
    </p>
  )
}
