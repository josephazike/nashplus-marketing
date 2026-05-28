interface ComparisonTableProps {
  // First element in columns is treated as the row-header column (left stub).
  // Leave it as an empty string '' for tables without a row-header label.
  columns: string[]
  rows:    string[][]
  caption?: string
}

export function ComparisonTable({ columns, rows, caption }: ComparisonTableProps) {
  return (
    <figure style={{ margin: '2rem 0' }}>
      {/* Horizontal scroll on narrow screens; shadow hints at overflow */}
      <div style={{
        overflowX:              'auto',
        WebkitOverflowScrolling: 'touch' as React.CSSProperties['WebkitOverflowScrolling'],
        borderRadius:           '2px',
        border:                 '1px solid var(--border)',
        // Fade shadow on the right edge to hint at scroll
        background:             'linear-gradient(to right, transparent 85%, rgba(28,28,25,0.06)) right center / 48px 100% no-repeat, var(--canvas)',
      }}>
        <table
          style={{
            width:           '100%',
            minWidth:        '480px',   // prevents columns collapsing on mobile; scroll kicks in instead
            borderCollapse:  'collapse',
            tableLayout:     'auto',
          }}
        >
          {/* Column headers */}
          <thead>
            <tr>
              {columns.map((col, i) => (
                <th
                  key={i}
                  scope="col"
                  style={{
                    fontFamily:    'var(--font-mono)',
                    fontSize:      '0.55rem',
                    letterSpacing: '0.25em',
                    textTransform: 'uppercase',
                    color:         i === 0 ? 'var(--ink-muted)' : 'var(--green-600)',
                    fontWeight:    600,
                    textAlign:     i === 0 ? 'left' : 'center',
                    padding:       '0.85rem 1.1rem',
                    borderBottom:  '1px solid var(--border)',
                    background:    'rgba(28, 28, 25, 0.03)',
                    whiteSpace:    'nowrap',
                  }}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {rows.map((row, ri) => (
              <tr key={ri} style={{ background: ri % 2 === 0 ? 'transparent' : 'rgba(28, 28, 25, 0.025)' }}>
                {row.map((cell, ci) => {
                  const isRowHeader = ci === 0
                  if (isRowHeader) {
                    return (
                      <th
                        key={ci}
                        scope="row"
                        style={{
                          fontFamily:    'var(--font-mono)',
                          fontSize:      '0.6rem',
                          letterSpacing: '0.12em',
                          textTransform: 'uppercase',
                          color:         'var(--ink-muted)',
                          fontWeight:    500,
                          textAlign:     'left',
                          padding:       '0.85rem 1.1rem',
                          borderBottom:  ri < rows.length - 1 ? '1px solid var(--border-light)' : 'none',
                          whiteSpace:    'nowrap',
                          verticalAlign: 'middle',
                        }}
                      >
                        {cell}
                      </th>
                    )
                  }
                  return (
                    <td
                      key={ci}
                      style={{
                        fontFamily:    'var(--font-body)',
                        fontSize:      'clamp(0.875rem, 1.5vw, 0.9375rem)',
                        color:         'var(--ink)',
                        lineHeight:    1.65,
                        textAlign:     'center',
                        padding:       '0.85rem 1.1rem',
                        borderBottom:  ri < rows.length - 1 ? '1px solid var(--border-light)' : 'none',
                        verticalAlign: 'middle',
                      }}
                    >
                      {cell}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {caption && (
        <figcaption style={{
          fontFamily:    'var(--font-mono)',
          fontSize:      '0.5rem',
          letterSpacing: '0.15em',
          color:         'var(--ink-faint)',
          marginTop:     '0.65rem',
          textAlign:     'center',
        }}>
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
