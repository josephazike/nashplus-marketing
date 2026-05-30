'use client'

import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import Link        from 'next/link'
import { usePathname } from 'next/navigation'
import { SIGNUP_URL } from '@/lib/config'

const NAV_LINKS = [
  { label: 'Home',   href: '/' },
  { label: 'Guides', href: '/blog' },
]

const CLUSTER_LINKS = [
  { label: 'Representing Yourself', href: '/blog#cluster-self-representation' },
  { label: 'Parenting',             href: '/blog#cluster-parenting' },
  { label: 'Support & Legal Aid',   href: '/blog#cluster-support' },
  { label: 'Forms',                 href: '/blog#cluster-forms' },
  { label: 'Court Process',         href: '/blog#cluster-procedure-and-fears' },
  { label: 'Law Explained',         href: '/blog#cluster-concepts' },
]

export function NavMenu() {
  const [open, setOpen]   = useState(false)
  const [mounted, setMounted] = useState(false)
  const menuRef           = useRef<HTMLDivElement>(null)
  const pathname          = usePathname()

  useEffect(() => { setMounted(true) }, [])

  function isActive(href: string) {
    if (href === '/')     return pathname === '/'
    return pathname.startsWith('/blog')
  }

  useEffect(() => {
    function onKey(e: KeyboardEvent)   { if (e.key === 'Escape') setOpen(false) }
    function onDoc(e: MouseEvent)      { if (menuRef.current && !menuRef.current.contains(e.target as Node)) setOpen(false) }
    if (open) {
      document.addEventListener('keydown',    onKey)
      document.addEventListener('mousedown',  onDoc)
    }
    return () => {
      document.removeEventListener('keydown',   onKey)
      document.removeEventListener('mousedown', onDoc)
    }
  }, [open])

  // Close menu on route change
  useEffect(() => { setOpen(false) }, [pathname])

  return (
    <div ref={menuRef} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>

      {/* ── Desktop links ──────────────────────────────── */}
      {NAV_LINKS.map(({ label, href }) => (
        <Link
          key={href}
          href={href}
          className={`nav-link${isActive(href) ? ' nav-link-active' : ''}`}
        >
          {label}
        </Link>
      ))}

      {/* ── Get started — desktop only ─────────────────── */}
      <a href={SIGNUP_URL} className="nav-cta nav-desktop-only">
        Get started
      </a>

      {/* ── Hamburger — mobile only ────────────────────── */}
      <button
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen(v => !v)}
        className="nav-hamburger"
      >
        <span className={`ham-bar${open ? ' ham-bar-top-open' : ''}`}  />
        <span className={`ham-bar${open ? ' ham-bar-mid-open' : ''}`}  />
        <span className={`ham-bar${open ? ' ham-bar-bot-open' : ''}`}  />
      </button>

      {/* ── Mobile drawer — portal bypasses nav backdrop-filter stacking context ── */}
      {open && mounted && createPortal(
        <nav
          id="mobile-menu"
          aria-label="Site navigation"
          className="mobile-menu"
        >
          <div className="mobile-menu-inner">

            {/* Primary links */}
            {NAV_LINKS.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={`mobile-link${isActive(href) ? ' mobile-link-active' : ''}`}
              >
                {label}
              </Link>
            ))}

            {/* Cluster links with divider */}
            <div className="mobile-divider">
              <span className="mobile-divider-label">Browse by topic</span>
            </div>
            {CLUSTER_LINKS.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="mobile-cluster-link"
              >
                {label}
              </a>
            ))}

            {/* CTA */}
            <a
              href={SIGNUP_URL}
              onClick={() => setOpen(false)}
              className="mobile-cta"
            >
              Get started with NashPlus
            </a>
          </div>
        </nav>,
        document.body
      )}

      <style>{`
        /* ── Desktop nav links ─────────────────────────── */
        .nav-link {
          font-family:    var(--font-body);
          font-size:      0.9375rem;
          font-weight:    500;
          color:          var(--ink);
          text-decoration: none;
          padding:        0.5rem 0.75rem;
          border-radius:  4px;
          transition:     background 180ms, color 180ms;
          display:        none;
        }
        .nav-link:hover      { background: rgba(28,28,25,0.06); }
        .nav-link-active     { color: var(--green-700); font-weight: 600; }

        @media (min-width: 640px) {
          .nav-link { display: inline-flex; align-items: center; }
        }

        /* ── Desktop CTA ───────────────────────────────── */
        .nav-cta {
          font-family:     var(--font-body);
          font-size:       0.9375rem;
          font-weight:     600;
          color:           #ffffff;
          background:      var(--green-600);
          text-decoration: none;
          padding:         0.5rem 1.125rem;
          border-radius:   4px;
          transition:      background 180ms;
          min-height:      40px;
          display:         none;
          align-items:     center;
        }
        .nav-cta:hover { background: var(--green-700); }

        @media (min-width: 640px) {
          .nav-desktop-only { display: inline-flex !important; }
        }

        /* ── Hamburger ─────────────────────────────────── */
        .nav-hamburger {
          display:        none;
          flex-direction: column;
          justify-content: center;
          align-items:    center;
          gap:            5px;
          background:     none;
          border:         none;
          cursor:         pointer;
          padding:        10px;
          width:          44px;
          height:         44px;
        }
        @media (max-width: 639px) {
          .nav-hamburger { display: flex; }
        }

        .ham-bar {
          display:          block;
          width:            22px;
          height:           2px;
          background:       var(--ink);
          border-radius:    1px;
          transition:       transform 220ms ease, opacity 220ms ease;
        }
        .ham-bar-top-open { transform: translateY(7px) rotate(45deg); }
        .ham-bar-mid-open { opacity: 0; }
        .ham-bar-bot-open { transform: translateY(-7px) rotate(-45deg); }

        /* ── Mobile drawer ─────────────────────────────── */
        .mobile-menu {
          position:   fixed;
          top:        3.75rem;
          left:       0;
          right:      0;
          bottom:     0;
          background: #fafaf8;
          z-index:    99;
          overflow-y: auto;
        }
        .mobile-menu-inner {
          display:        flex;
          flex-direction: column;
          padding:        1rem var(--gutter) 3rem;
        }
        .mobile-link {
          font-family:    var(--font-body);
          font-size:      1.25rem;
          font-weight:    600;
          color:          var(--ink);
          text-decoration: none;
          padding:        1rem 0;
          border-bottom:  1px solid var(--border-light);
          min-height:     56px;
          display:        flex;
          align-items:    center;
          transition:     color 160ms;
        }
        .mobile-link:hover      { color: var(--green-600); }
        .mobile-link-active     { color: var(--green-700); }
        .mobile-divider {
          padding:        1.25rem 0 0.5rem;
        }
        .mobile-divider-label {
          font-family:    var(--font-mono);
          font-size:      0.625rem;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color:          var(--ink-faint);
        }
        .mobile-cluster-link {
          font-family:    var(--font-body);
          font-size:      1rem;
          font-weight:    400;
          color:          var(--ink-secondary);
          text-decoration: none;
          padding:        0.75rem 0;
          border-bottom:  1px solid var(--border-light);
          min-height:     48px;
          display:        flex;
          align-items:    center;
          transition:     color 160ms;
        }
        .mobile-cluster-link:hover { color: var(--green-600); }
        .mobile-cta {
          font-family:     var(--font-body);
          font-size:       1rem;
          font-weight:     600;
          color:           #ffffff;
          background:      var(--green-600);
          text-decoration: none;
          padding:         1rem;
          border-radius:   6px;
          margin-top:      1.5rem;
          text-align:      center;
          min-height:      52px;
          display:         flex;
          align-items:     center;
          justify-content: center;
          transition:      background 180ms;
        }
        .mobile-cta:hover { background: var(--green-700); }
      `}</style>
    </div>
  )
}
