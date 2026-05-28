import { ImageResponse } from 'next/og'
import fs from 'fs'
import path from 'path'
import { getPost, getAllSlugs } from '@/lib/blog'

// Node.js runtime required for fs.readFileSync (font bundled locally).
export const runtime = 'nodejs'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export async function generateStaticParams() {
  return getAllSlugs().map(slug => ({ slug }))
}

export default async function Image(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const post = getPost(slug)
  const title = post?.title ?? 'Nash+'

  // Locally bundled static TTF -- no runtime network request, no variable font.
  // Buffer.slice extracts a clean ArrayBuffer without byteOffset issues.
  const raw = fs.readFileSync(
    path.join(process.cwd(), 'public/fonts/CormorantGaramond-SemiBoldItalic.ttf')
  )
  const fontData = raw.buffer.slice(raw.byteOffset, raw.byteOffset + raw.byteLength)

  return new ImageResponse(
    (
      <div
        style={{
          width:           '100%',
          height:          '100%',
          display:         'flex',
          flexDirection:   'column',
          justifyContent:  'space-between',
          backgroundColor: '#1a3528',
          padding:         '64px 80px',
          position:        'relative',
        }}
      >
        {/* Top: wordmark */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{
            fontFamily:    'CormorantGaramond',
            fontStyle:     'italic',
            fontSize:       38,
            fontWeight:    600,
            color:         '#faf8f3',
            letterSpacing: '0.01em',
          }}>
            Nash+
          </span>
        </div>

        {/* Center: article title */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{
            width:           '56px',
            height:          '3px',
            backgroundColor: '#c9a227',
          }} />
          <span style={{
            fontFamily:    'CormorantGaramond',
            fontStyle:     'italic',
            fontSize:       title.length > 60 ? 56 : 72,
            fontWeight:    600,
            color:         '#faf8f3',
            lineHeight:    1.1,
            letterSpacing: '-0.02em',
            maxWidth:      '960px',
          }}>
            {title}
          </span>
        </div>

        {/* Bottom: domain */}
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <span style={{
            fontFamily:    'CormorantGaramond',
            fontStyle:     'italic',
            fontSize:       22,
            color:         'rgba(250,248,243,0.45)',
            letterSpacing: '0.08em',
          }}>
            nashplus.dev
          </span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name:   'CormorantGaramond',
          data:   fontData,
          style:  'italic',
          weight: 600,
        },
      ],
    }
  )
}
