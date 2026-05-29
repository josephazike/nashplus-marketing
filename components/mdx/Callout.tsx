import type { ReactNode, ReactElement, CSSProperties } from 'react'

type CalloutType = 'note' | 'tip' | 'warning' | 'legal'

interface CalloutProps {
  type?:     CalloutType
  title?:    string
  children:  ReactNode
}

const DEFAULTS: Record<CalloutType, string> = {
  note:    'Note',
  tip:     'Tip',
  warning: 'Important',
  legal:   'Legal information',
}

// Inline SVG markers -- no icon library dependency.
function NoteIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ flexShrink: 0, marginTop: '1px' }}>
      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
      <rect x="7.25" y="6.5" width="1.5" height="5" rx="0.75" fill="currentColor" />
      <rect x="7.25" y="4.25" width="1.5" height="1.5" rx="0.75" fill="currentColor" />
    </svg>
  )
}

function TipIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ flexShrink: 0, marginTop: '1px' }}>
      <path d="M8 1.5C5.515 1.5 3.5 3.515 3.5 6c0 1.57.77 2.96 1.95 3.82V11a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-1.18C11.73 8.96 12.5 7.57 12.5 6c0-2.485-2.015-4.5-4.5-4.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M5.75 13h4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M6.5 14.5h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function WarningIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ flexShrink: 0, marginTop: '1px' }}>
      <path d="M7.13 2.4 1.37 12.4A1 1 0 0 0 2.24 14h11.52a1 1 0 0 0 .87-1.6L8.87 2.4a1 1 0 0 0-1.74 0Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <rect x="7.25" y="7" width="1.5" height="3.5" rx="0.75" fill="currentColor" />
      <rect x="7.25" y="11.5" width="1.5" height="1.5" rx="0.75" fill="currentColor" />
    </svg>
  )
}

function LegalIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ flexShrink: 0, marginTop: '1px' }}>
      <path d="M8 2v12M4 2h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M4 14h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M2 6l2.5 4.5L7 6" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 6l2.5 4.5L14 6" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2 6h5M9 6h5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  )
}

const ICONS: Record<CalloutType, () => ReactElement> = {
  note:    NoteIcon,
  tip:     TipIcon,
  warning: WarningIcon,
  legal:   LegalIcon,
}

const STYLES: Record<CalloutType, CSSProperties> = {
  note: {
    background:  'rgba(45, 90, 61, 0.09)',
    borderLeft:  '3px solid var(--green-600)',
    color:       'var(--green-700)',
  },
  tip: {
    background:  'rgba(45, 90, 61, 0.05)',
    borderLeft:  '3px solid #4a7c5e',
    color:       '#2a5c3e',
  },
  warning: {
    background:  'rgba(168, 90, 12, 0.08)',
    borderLeft:  '3px solid #a05a0a',
    color:       '#7a420a',
  },
  legal: {
    background:  'rgba(28, 28, 25, 0.04)',
    border:      '1px solid var(--border)',
    borderLeft:  '3px solid var(--ink-muted)',
    color:       'var(--ink-muted)',
  },
}

export function Callout({ type = 'note', title, children }: CalloutProps) {
  const Icon  = ICONS[type]
  const label = title ?? DEFAULTS[type]

  return (
    <aside
      role="note"
      style={{
        ...STYLES[type],
        borderRadius: 0,
        padding:      'clamp(1.25rem, 3vw, 1.5rem) clamp(1rem, 3vw, 1.5rem)',
        margin:       '2rem 0',
      }}
    >
      <div style={{ display: 'flex', gap: '0.65rem', alignItems: 'flex-start' }}>
        <Icon />
        <div style={{ minWidth: 0 }}>
          <p style={{
            fontFamily:    'var(--font-mono)',
            fontSize:      '0.625rem',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color:         'inherit',
            margin:        '0 0 0.45rem',
            fontWeight:    600,
            lineHeight:    1,
          }}>
            {label}
          </p>
          <div style={{
            fontFamily: 'var(--font-body)',
            fontSize:   'var(--text-body)',
            lineHeight: 'var(--lh-body)',
            color:      'var(--ink)',
          }}>
            {children}
          </div>
        </div>
      </div>
    </aside>
  )
}
