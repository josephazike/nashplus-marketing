'use client'

import { useState, useEffect, useRef } from 'react'
import { SIGNUP_URL } from '@/lib/config'

export function NavMenu() {
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    if (open) {
      document.addEventListener('keydown', handleKey)
      document.addEventListener('mousedown', handleClick)
    }
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.removeEventListener('mousedown', handleClick)
    }
  }, [open])

  return (
    <div ref={menuRef} style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>

      {/* Desktop nav links */}
      <a
        href="/blog"
        style={{
          fontFamily:     'var(--font-mono)',
          fontSize:       '0.6rem',
          letterSpacing:  '0.3em',
          textTransform:  'uppercase',
          color:          'var(--ink-muted)',
          textDecoration: 'none',
          transition:     'color 200ms',
          display:        'none',
        }}
        className="nav-desktop-link"
      >
        Resources
      </a>
      <a
        href={SIGNUP_URL}
        style={{
          fontFamily:      'var(--font-mono)',
          fontSize:        '0.6rem',
          letterSpacing:   '0.26em',
          textTransform:   'uppercase',
          color:           '#ffffff',
          backgroundColor: 'var(--green-600)',
          textDecoration:  'none',
          padding:         '0.65rem 1.25rem',
          transition:      'background-color 200ms',
          minHeight:       '44px',
          display:         'none',
          alignItems:      'center',
        }}
        className="nav-desktop-cta"
      >
        Get started
      </a>

      {/* Hamburger button — mobile only */}
      <button
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        onClick={() => setOpen(v => !v)}
        style={{
          display:         'flex',
          flexDirection:   'column',
          justifyContent:  'center',
          gap:             '5px',
          background:      'none',
          border:          'none',
          cursor:          'pointer',
          padding:         '10px',
          width:           '44px',
          height:          '44px',
          alignItems:      'center',
        }}
        className="nav-hamburger"
      >
        <span style={{
          display:         'block',
          width:           '22px',
          height:          '2px',
          backgroundColor: 'var(--ink)',
          transition:      'transform 200ms, opacity 200ms',
          transform:       open ? 'translateY(7px) rotate(45deg)' : 'none',
        }} />
        <span style={{
          display:         'block',
          width:           '22px',
          height:          '2px',
          backgroundColor: 'var(--ink)',
          transition:      'opacity 200ms',
          opacity:         open ? 0 : 1,
        }} />
        <span style={{
          display:         'block',
          width:           '22px',
          height:          '2px',
          backgroundColor: 'var(--ink)',
          transition:      'transform 200ms, opacity 200ms',
          transform:       open ? 'translateY(-7px) rotate(-45deg)' : 'none',
        }} />
      </button>

      {/* Mobile dropdown panel */}
      {open && (
        <div style={{
          position:        'fixed',
          top:             '3.75rem',
          left:            0,
          right:           0,
          background:      'rgba(196,189,176,0.97)',
          backdropFilter:  'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom:    '1px solid var(--border)',
          zIndex:          99,
          padding:         '1rem var(--gutter)',
          display:         'flex',
          flexDirection:   'column',
          gap:             '0',
        }}>
          <a
            href="/blog"
            onClick={() => setOpen(false)}
            style={{
              fontFamily:     'var(--font-mono)',
              fontSize:       '0.7rem',
              letterSpacing:  '0.3em',
              textTransform:  'uppercase',
              color:          'var(--ink-muted)',
              textDecoration: 'none',
              padding:        '1rem 0',
              borderBottom:   '1px solid var(--border-light)',
              minHeight:      '44px',
              display:        'flex',
              alignItems:     'center',
            }}
          >
            Resources
          </a>
          <a
            href={SIGNUP_URL}
            onClick={() => setOpen(false)}
            style={{
              fontFamily:     'var(--font-mono)',
              fontSize:       '0.7rem',
              letterSpacing:  '0.26em',
              textTransform:  'uppercase',
              color:          '#ffffff',
              backgroundColor:'var(--green-600)',
              textDecoration: 'none',
              padding:        '1rem',
              marginTop:      '1rem',
              minHeight:      '44px',
              display:        'flex',
              alignItems:     'center',
              justifyContent: 'center',
            }}
          >
            Get started
          </a>
        </div>
      )}

      <style>{`
        @media (min-width: 640px) {
          .nav-desktop-link { display: block !important; }
          .nav-desktop-cta  { display: flex !important; }
          .nav-hamburger    { display: none !important; }
        }
        @media (max-width: 639px) {
          .nav-desktop-link { display: none !important; }
          .nav-desktop-cta  { display: none !important; }
          .nav-hamburger    { display: flex !important; }
        }
      `}</style>
    </div>
  )
}
