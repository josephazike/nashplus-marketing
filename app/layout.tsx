import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Mono } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["300", "400"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nashplus.dev"),
  title: "NashPlus",
  description: "Ontario family law made accessible.",
  robots: { index: true, follow: true },
  openGraph: {
    title: "NashPlus",
    description: "Ontario family law made accessible.",
    type: "website",
    url: "https://nashplus.dev",
    siteName: "NashPlus",
  },
  twitter: {
    card: "summary",
    title: "NashPlus",
    description: "Ontario family law made accessible.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmMono.variable}`}>
      <body>
        <nav style={{
          position:       'fixed',
          top:            0,
          left:           0,
          right:          0,
          zIndex:         100,
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'space-between',
          padding:        '1.25rem clamp(1.5rem, 6vw, 5rem)',
          borderBottom:   '1px solid rgba(242,237,230,0.06)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          backgroundColor: 'rgba(13,11,9,0.7)',
        }}>
          <a href="/" style={{
            fontFamily:    'var(--font-dm-mono)',
            fontSize:      '0.6rem',
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            color:         'var(--cream)',
            textDecoration: 'none',
          }}>
            NashPlus
          </a>
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            <a href="/blog" style={{
              fontFamily:    'var(--font-dm-mono)',
              fontSize:      '0.55rem',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color:         'var(--muted)',
              textDecoration: 'none',
            }}>
              Resources
            </a>
          </div>
        </nav>
        <div style={{ paddingTop: '3.5rem' }}>
          {children}
        </div>
      </body>
    </html>
  );
}
