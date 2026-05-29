import type { Metadata } from "next";
import { Fraunces, Inter, Geist_Mono } from "next/font/google";
import { RevealObserver } from "@/components/RevealObserver";
import { NavMenu }        from "@/components/NavMenu";
import "./globals.css";

// Skill basis: UI/UX Pro Max v5 "Legal Professional" pairing + "FAQ/Documentation Landing" pattern.
// Fraunces: variable serif with opsz axis -- holds at 72px hero and 24px cluster header.
// Inter: purpose-built screen sans; "Minimal Swiss" (documentation/enterprise) top pick.
// Geist Mono: metadata/labels (unchanged from Phase 2).

function safeJsonLd(obj: unknown): string {
  return JSON.stringify(obj)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026')
}

const fraunces = Fraunces({
  variable: "--font-display",
  subsets:  ["latin"],
  axes:     ["opsz", "SOFT", "WONK"],
  style:    ["normal", "italic"],
  display:  "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets:  ["latin"],
  display:  "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets:  ["latin"],
  display:  "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nashplus.dev"),
  title: "NashPlus — Ontario family law made accessible.",
  description:
    "NashPlus guides you through Form 13 and financial disclosure step by step. Plain language. No prior legal knowledge required.",
  robots: { index: true, follow: true },
  openGraph: {
    title:       "NashPlus — Ontario family law made accessible.",
    description: "NashPlus guides you through Form 13 and financial disclosure step by step.",
    type:        "website",
    url:         "https://nashplus.dev",
    siteName:    "NashPlus",
  },
  twitter: {
    card:        "summary",
    title:       "NashPlus",
    description: "Ontario family law made accessible.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} ${geistMono.variable}`}
    >
      <body>
        <nav
          style={{
            position:             "fixed",
            top:                  0,
            left:                 0,
            right:                0,
            zIndex:               100,
            display:              "flex",
            alignItems:           "center",
            justifyContent:       "space-between",
            padding:              "1.25rem var(--gutter)",
            borderBottom:         "1px solid var(--border-light)",
            backdropFilter:       "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            backgroundColor:      "rgba(196, 189, 176, 0.88)",
          }}
        >
          <a
            href="/"
            style={{
              fontFamily:     "var(--font-display)",
              fontSize:       "1.2rem",
              fontWeight:     700,
              letterSpacing:  "-0.02em",
              color:          "var(--green-600)",
              textDecoration: "none",
              lineHeight:     1,
              fontOpticalSizing: "auto",
            } as React.CSSProperties}
          >
            Nash+
          </a>
          <NavMenu />
        </nav>
        <RevealObserver />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: safeJsonLd({
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
