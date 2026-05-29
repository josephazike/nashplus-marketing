interface ChecklistProps {
  items:    string[]
  heading?: string   // optional label above the list
}

// Static visual checklist -- no interactivity, no browser storage.
// Checkboxes are decorative SVG marks; the list is a plain <ul> for accessibility.
export function Checklist({ items, heading }: ChecklistProps) {
  return (
    <div
      style={{
        background:  'rgba(45, 90, 61, 0.05)',
        borderLeft:  '3px solid var(--green-600)',
        borderRadius:'2px',
        padding:     'clamp(1rem, 3vw, 1.5rem)',
        margin:      '2rem 0',
      }}
    >
      {heading && (
        <p style={{
          fontFamily:    'var(--font-mono)',
          fontSize:      '0.55rem',
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          color:         'var(--green-600)',
          margin:        '0 0 1rem',
          fontWeight:    600,
        }}>
          {heading}
        </p>
      )}

      <ul
        aria-label={heading ?? 'Checklist'}
        style={{ listStyle: 'none', padding: 0, margin: 0 }}
      >
        {items.map((item, i) => (
          <li
            key={i}
            style={{
              display:       'flex',
              alignItems:    'flex-start',
              gap:           '0.75rem',
              paddingTop:    i === 0 ? 0 : '0.65rem',
              paddingBottom: i === items.length - 1 ? 0 : '0.65rem',
              borderBottom:  i < items.length - 1 ? '1px solid rgba(45, 90, 61, 0.12)' : 'none',
            }}
          >
            {/* Outline-only checkbox -- signals instructional intent, not completed state */}
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              aria-hidden="true"
              style={{ flexShrink: 0, marginTop: '2px' }}
            >
              <rect x="1" y="1" width="16" height="16" rx="3" stroke="var(--green-700)" strokeWidth="1.5" />
            </svg>

            <span style={{
              fontFamily: 'var(--font-body)',
              fontSize:   'clamp(0.9375rem, 1.6vw, 1rem)',
              color:      'var(--ink)',
              lineHeight: 1.72,
              flex:       1,
            }}>
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
