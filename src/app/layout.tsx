import type { Metadata, Viewport } from "next";
import { Providers } from "@/app/providers";
import "./globals.css";
import "./styles.css";

export const metadata: Metadata = {
  title: "OSRS Calculators | Old School RuneScape Skill Calculators",
  description: "Mobile-first OSRS skill calculators with accurate XP data and live Grand Exchange prices",
  keywords: "osrs, old school runescape, skill calculators, grand exchange, xp calculator, osrscalculators",
  authors: [{ name: "OSRSCalculators.com" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#35281e" },
    { media: "(prefers-color-scheme: light)", color: "#0d0c0b" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Roboto+Slab:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="osrs-background">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
