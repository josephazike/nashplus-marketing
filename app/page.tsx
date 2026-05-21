export default function Home() {
  return (
    <main
      style={{
        minHeight:      'calc(100vh - 3.5rem)',
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
        padding:        '2rem',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <h1
          className="fade-up"
          style={{
            fontFamily:    'var(--font-playfair)',
            fontSize:      'clamp(3.5rem, 10vw, 8rem)',
            fontWeight:    700,
            letterSpacing: '0.04em',
            color:         'var(--forest)',
            lineHeight:    1,
            margin:        0,
            animationDelay: '0ms',
          }}
        >
          Nash+
        </h1>

        <div
          className="fade-up"
          style={{
            width:           '56px',
            height:          '1px',
            backgroundColor: 'var(--gold)',
            margin:          '2.25rem auto',
            animationDelay:  '180ms',
          }}
        />

        <p
          className="fade-up"
          style={{
            fontFamily:    'var(--font-geist-mono)',
            fontSize:      '0.55rem',
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            color:         'var(--muted)',
            margin:        0,
            animationDelay: '320ms',
          }}
        >
          Coming soon
        </p>

        <p
          className="fade-up"
          style={{
            fontFamily:    'var(--font-serif)',
            fontSize:      'clamp(1rem, 2.5vw, 1.25rem)',
            fontStyle:     'italic',
            fontWeight:    300,
            color:         'var(--muted)',
            letterSpacing: '0.01em',
            marginTop:     '2rem',
            animationDelay: '480ms',
          }}
        >
          Ontario family law made accessible.
        </p>
      </div>
    </main>
  );
}
