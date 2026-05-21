import type { Metadata } from "next";
import {
  Playfair_Display,
  Merriweather,
  Source_Sans_3,
  Geist_Mono,
} from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

const merriweather = Merriweather({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const sourceSans = Source_Sans_3({
  variable: "--font-sans-body",
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nashplus.dev"),
  title: "Nash+",
  description: "Ontario family law made accessible.",
  robots: { index: true, follow: true },
  openGraph: {
    title: "Nash+",
    description: "Ontario family law made accessible.",
    type: "website",
    url: "https://nashplus.dev",
    siteName: "Nash+",
  },
  twitter: {
    card: "summary",
    title: "Nash+",
    description: "Ontario family law made accessible.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${merriweather.variable} ${sourceSans.variable} ${geistMono.variable}`}
    >
      <body>
        <nav style={{
          position:        'fixed',
          top:             0,
          left:            0,
          right:           0,
          zIndex:          100,
          display:         'flex',
          alignItems:      'center',
          justifyContent:  'space-between',
          padding:         '1.25rem clamp(1.5rem, 6vw, 5rem)',
          borderBottom:    '1px solid rgba(19,52,42,0.08)',
          backdropFilter:  'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          backgroundColor: 'rgba(250,248,243,0.88)',
        }}>
          <a href="/" style={{
            fontFamily:    'var(--font-playfair)',
            fontSize:      '1.05rem',
            fontWeight:    700,
            letterSpacing: '0.01em',
            color:         'var(--forest)',
            textDecoration: 'none',
          }}>
            Nash+
          </a>
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            <a href="/blog" style={{
              fontFamily:    'var(--font-geist-mono)',
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
