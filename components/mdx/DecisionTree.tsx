interface Branch {
  condition:    string   // the "if" label on the branch
  outcome:      string   // the result at the end of this branch
  outcomeMeta?: string   // optional citation or sub-note below the outcome
}

interface DecisionTreeProps {
  question: string       // the root decision question
  branches: Branch[]     // 2-4 branches; renders as a visual fork
  note?:    string       // optional footnote below the whole tree
}

// Rendered as styled nested divs -- no graph library.
// A question block forks into branch rows, each leading to an outcome box.
// Connectors are CSS borders on positioned elements.
export function DecisionTree({ question, branches, note }: DecisionTreeProps) {
  return (
    <figure
      role="img"
      aria-label={`Decision guide: ${question}`}
      style={{ margin: '2rem 0' }}
    >
      {/* Root question -- green-700 background: canvas text on green-700 = 5.66:1 (PASS AA) */}
      <div style={{
        background:    'var(--green-700)',
        color:         'var(--canvas)',
        borderRadius:  '2px',
        padding:       'clamp(0.85rem, 2.5vw, 1.1rem) clamp(1rem, 3vw, 1.5rem)',
        marginBottom:  '0',
        position:      'relative',
      }}>
        <p style={{
          fontFamily:    'var(--font-display)',
          fontSize:      'clamp(1rem, 2vw, 1.2rem)',
          fontWeight:    600,
          fontStyle:     'italic',
          letterSpacing: '-0.01em',
          lineHeight:    1.3,
          margin:        0,
          color:         'inherit',
        }}>
          {question}
        </p>
      </div>

      {/* Trunk connector */}
      <div style={{
        display:        'flex',
        justifyContent: 'center',
        height:         '1.25rem',
      }}>
        <div style={{ width: '1px', background: 'var(--border)', height: '100%' }} />
      </div>

      {/* Branch row */}
      <div style={{
        display:             'grid',
        gridTemplateColumns: `repeat(${Math.min(branches.length, 2)}, 1fr)`,
        gap:                 '1rem',
        // Stack to single column below ~480px
        ...(branches.length > 2 ? {} : {}),
      }}>
        {branches.map((branch, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0' }}>

            {/* Condition label */}
            <div style={{
              background:    'rgba(28, 28, 25, 0.04)',
              border:        '1px solid var(--border)',
              borderRadius:  '2px',
              padding:       '0.55rem 0.85rem',
              width:         '100%',
              boxSizing:     'border-box',
            }}>
              <p style={{
                fontFamily:    'var(--font-mono)',
                fontSize:      '0.55rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color:         'var(--ink-muted)',
                margin:        '0 0 0.2rem',
                lineHeight:    1,
              }}>
                {i === 0 ? 'If' : 'If'}
              </p>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize:   'clamp(0.875rem, 1.5vw, 0.9375rem)',
                color:      'var(--ink)',
                lineHeight: 1.6,
                margin:     0,
                fontStyle:  'italic',
              }}>
                {branch.condition}
              </p>
            </div>

            {/* Arrow connector */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ width: '1px', height: '0.75rem', background: 'var(--border)' }} />
              {/* Arrow head */}
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true">
                <path d="M1 1l4 4 4-4" stroke="var(--ink-muted)" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            {/* Outcome box */}
            <div style={{
              background:    'rgba(45, 90, 61, 0.08)',
              borderLeft:    '3px solid var(--green-600)',
              borderRadius:  '2px',
              padding:       '0.7rem 0.9rem',
              width:         '100%',
              boxSizing:     'border-box',
            }}>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize:   'clamp(0.875rem, 1.5vw, 0.9375rem)',
                fontWeight: 600,
                color:      'var(--green-700)',
                lineHeight: 1.55,
                margin:     branch.outcomeMeta ? '0 0 0.35rem' : 0,
              }}>
                {branch.outcome}
              </p>
              {branch.outcomeMeta && (
                <p style={{
                  fontFamily:    'var(--font-mono)',
                  fontSize:      '0.5rem',
                  letterSpacing: '0.1em',
                  color:         'var(--ink-muted)',
                  lineHeight:    1.6,
                  margin:        0,
                }}>
                  {branch.outcomeMeta}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Overflow: if more than 2 branches, additional rows stack below */}
      {branches.length > 2 && (
        <p style={{
          fontFamily:    'var(--font-mono)',
          fontSize:      '0.5rem',
          letterSpacing: '0.12em',
          color:         'var(--ink-faint)',
          textAlign:     'center',
          marginTop:     '0.5rem',
        }}>
          See all {branches.length} paths above.
        </p>
      )}

      {note && (
        <figcaption style={{
          fontFamily:    'var(--font-mono)',
          fontSize:      '0.5rem',
          letterSpacing: '0.12em',
          color:         'var(--ink-muted)',
          marginTop:     '1rem',
          lineHeight:    1.7,
          borderTop:     '1px solid var(--border-light)',
          paddingTop:    '0.75rem',
        }}>
          {note}
        </figcaption>
      )}
    </figure>
  )
}
