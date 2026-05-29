interface Step {
  title:       string
  description: string
  aside?:      string  // optional callout text (e.g. a rule citation, a timeline note)
}

interface ProcessTimelineProps {
  steps:   Step[]
  heading?: string   // optional section label above the timeline
}

export function ProcessTimeline({ steps, heading }: ProcessTimelineProps) {
  return (
    <div style={{ margin: '2rem 0' }}>
      {heading && (
        <p style={{
          fontFamily:    'var(--font-mono)',
          fontSize:      '0.55rem',
          letterSpacing: '0.28em',
          textTransform: 'uppercase',
          color:         'var(--green-600)',
          margin:        '0 0 1.5rem',
        }}>
          {heading}
        </p>
      )}

      <ol style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {steps.map((step, i) => {
          const isLast = i === steps.length - 1
          return (
            <li
              key={i}
              style={{
                display:  'grid',
                gridTemplateColumns: '2.25rem 1fr',
                gap:      '0 1rem',
                position: 'relative',
              }}
            >
              {/* Step number + vertical rail */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {/* Number bubble */}
                <div
                  aria-hidden="true"
                  style={{
                    width:           '2.25rem',
                    height:          '2.25rem',
                    borderRadius:    '50%',
                    background:      'var(--green-600)',
                    color:           'var(--canvas)',
                    display:         'flex',
                    alignItems:      'center',
                    justifyContent:  'center',
                    fontFamily:      'var(--font-mono)',
                    fontSize:        '0.65rem',
                    letterSpacing:   '0.05em',
                    fontWeight:      600,
                    flexShrink:      0,
                    zIndex:          1,
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </div>
                {/* Connector rail */}
                {!isLast && (
                  <div style={{
                    width:      '1px',
                    flex:       '1 0 1.5rem',
                    background: 'var(--border)',
                    margin:     '0.2rem 0',
                  }} />
                )}
              </div>

              {/* Step content */}
              <div style={{ paddingBottom: isLast ? 0 : '2rem', paddingTop: '0.25rem' }}>
                <p style={{
                  fontFamily:        'var(--font-display)',
                  fontSize:          'var(--text-h3)',
                  fontWeight:        600,
                  fontStyle:         'normal',
                  fontOpticalSizing: 'auto',
                  color:             'var(--ink)',
                  margin:            '0 0 0.45rem',
                  lineHeight:        'var(--lh-heading)',
                  letterSpacing:     '-0.01em',
                } as React.CSSProperties}>
                  {step.title}
                </p>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize:   'var(--text-body)',
                  color:      'var(--ink)',
                  lineHeight: 'var(--lh-body)',
                  margin:     0,
                }}>
                  {step.description}
                </p>
                {step.aside && (
                  <p style={{
                    fontFamily:    'var(--font-mono)',
                    fontSize:      'var(--text-meta)',
                    letterSpacing: '0.12em',
                    color:         'var(--ink-secondary)',
                    margin:        '0.5rem 0 0',
                    lineHeight:    1.6,
                  }}>
                    {step.aside}
                  </p>
                )}
              </div>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
