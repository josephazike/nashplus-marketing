import type { Metadata } from "next";
import { Cormorant_Garamond, Lora, Geist_Mono } from "next/font/google";
import { RevealObserver } from "@/components/RevealObserver";
import { SIGNUP_URL } from "@/lib/config";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const lora = Lora({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nashplus.dev"),
  title: "NashPlus — Ontario family law made accessible.",
  description:
    "NashPlus guides you through Form 13 and financial disclosure step by step. Plain language. No prior legal knowledge required.",
  robots: { index: true, follow: true },
  openGraph: {
    title: "NashPlus — Ontario family law made accessible.",
    description:
      "NashPlus guides you through Form 13 and financial disclosure step by step.",
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
    <html
      lang="en"
      className={`${cormorant.variable} ${lora.variable} ${geistMono.variable}`}
    >
      <body>
        <nav
          style={{
            position:        "fixed",
            top:             0,
            left:            0,
            right:           0,
            zIndex:          100,
            display:         "flex",
            alignItems:      "center",
            justifyContent:  "space-between",
            padding:         "1.25rem var(--gutter)",
            borderBottom:    "1px solid var(--border-light)",
            backdropFilter:  "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            backgroundColor: "rgba(196, 189, 176, 0.88)",
          }}
        >
          <a
            href="/"
            style={{
              fontFamily:     "var(--font-display)",
              fontSize:       "1.15rem",
              fontWeight:     700,
              letterSpacing:  "0.01em",
              color:          "var(--green-600)",
              textDecoration: "none",
              lineHeight:     1,
            }}
          >
            Nash+
          </a>
          <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
            <a
              href="/blog"
              style={{
                fontFamily:     "var(--font-mono)",
                fontSize:       "0.6rem",
                letterSpacing:  "0.3em",
                textTransform:  "uppercase",
                color:          "var(--ink-muted)",
                textDecoration: "none",
                transition:     "color 200ms",
              }}
            >
              Resources
            </a>
            <a
              href={SIGNUP_URL}
              style={{
                fontFamily:      "var(--font-mono)",
                fontSize:        "0.6rem",
                letterSpacing:   "0.26em",
                textTransform:   "uppercase",
                color:           "var(--canvas)",
                backgroundColor: "var(--green-600)",
                textDecoration:  "none",
                padding:         "0.5rem 1.1rem",
                transition:      "background-color 200ms",
              }}
            >
              Get started
            </a>
          </div>
        </nav>
        <RevealObserver />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type':    'Organization',
              name:        'NashPlus',
              url:         'https://nashplus.dev',
              logo:        'https://nashplus.dev/og-logo.png',
            }),
          }}
        />
        <div style={{ paddingTop: "3.75rem" }}>{children}</div>
      </body>
    </html>
  );
}
