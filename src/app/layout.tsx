import type { Metadata, Viewport } from "next";
import { Providers } from "@/app/providers";
import "./styles.css";

export const metadata: Metadata = {
  title: "Probemas | OSRS Skill Calculators",
  description: "Mobile-first OSRS skill calculators with accurate XP data and live Grand Exchange prices",
  keywords: "osrs, old school runescape, skill calculators, grand exchange, xp calculator",
  authors: [{ name: "Probemas" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#1a1e2c" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
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
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="base-styles">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
