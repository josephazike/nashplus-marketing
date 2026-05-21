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
      <body>{children}</body>
    </html>
  );
}
