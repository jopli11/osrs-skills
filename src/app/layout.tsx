import type { Metadata, Viewport } from "next";
import { Providers } from "@/app/providers";
import "./globals.css";
import "./styles.css";
import { Inter, Roboto_Slab } from 'next/font/google';

// Load fonts with next/font
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  weight: ['400', '500', '600', '700'],
});

const robotoSlab = Roboto_Slab({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-slab',
  weight: ['400', '500', '600', '700'],
});

// <<< Define metadataBase >>>
const siteUrl = 'https://www.osrscalculators.com'; // <<< --- UPDATE THIS WITH YOUR ACTUAL DOMAIN --- >>>

export const metadata: Metadata = {
  // <<< Add metadataBase >>>
  metadataBase: new URL(siteUrl),
  // <<< Add title template >>>
  title: {
    default: "OSRS Calculators | Old School RuneScape Skill Calculators",
    template: `%s | OSRS Calculators`,
  },
  description: "Mobile-first OSRS skill calculators with accurate XP data and live Grand Exchange prices",
  // keywords: "...", // <<< Remove keywords >>>
  authors: [{ name: "OSRSCalculators.com", url: siteUrl }], // Add URL
  // <<< Add Open Graph Metadata >>>
  openGraph: {
    title: "OSRS Calculators | Old School RuneScape Skill Calculators",
    description: "Mobile-first OSRS skill calculators with accurate XP data and live Grand Exchange prices",
    url: siteUrl,
    siteName: 'OSRS Calculators',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/images/og-image.png', // <<< --- UPDATE OR CREATE THIS IMAGE --- >>>
        width: 1200,
        height: 630,
        alt: 'OSRS Calculators Logo',
      },
    ],
  },
  // <<< Add Twitter Card Metadata >>>
  twitter: {
    card: 'summary_large_image',
    title: "OSRS Calculators | Old School RuneScape Skill Calculators",
    description: "Mobile-first OSRS skill calculators with accurate XP data and live Grand Exchange prices",
    // Add creator handle if you have one
    // creator: '@yourTwitterHandle',
    images: ['/images/og-image.png'], // <<< --- Needs the same image as og:image --- >>>
  },
  // Add robots tag for indexing control (optional, complements robots.txt)
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  // Add icons (favicon, apple-touch-icon)
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
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
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${robotoSlab.variable}`}>
      <head>
        <link
          rel="preload"
          href="/images/optimized/bg-texture-placeholder.webp"
          as="image"
          type="image/webp"
        />
        <link
          rel="preload"
          href="/images/optimized/bg-texture-mobile.webp"
          as="image"
          type="image/webp"
          media="(max-width: 768px)"
        />
        <link
          rel="preload"
          href="/images/optimized/bg-texture-tablet.webp"
          as="image"
          type="image/webp"
          media="(min-width: 769px) and (max-width: 1600px)"
        />
        <link
          rel="preload"
          href="/images/optimized/bg-texture.webp"
          as="image"
          type="image/webp"
          media="(min-width: 1601px)"
        />
        
        <link rel="preload" href="/icons/skills/attack.png" as="image" />
        <link rel="preload" href="/icons/skills/strength.png" as="image" />
        <link rel="preload" href="/icons/skills/defence.png" as="image" />
        <link rel="preload" href="/icons/skills/ranged.png" as="image" />
        <link rel="preload" href="/icons/skills/prayer.png" as="image" />
        <link rel="preload" href="/icons/skills/magic.png" as="image" />
        
        <link rel="dns-prefetch" href="https://oldschool.runescape.wiki" />
        <link rel="preconnect" href="https://oldschool.runescape.wiki" crossOrigin="anonymous" />
        
        <script dangerouslySetInnerHTML={{
          __html: `
            // Simple client-side performance tracking
            window.addEventListener('load', () => {
              // Report performance metrics
              if (window.performance) {
                const perfData = window.performance.timing;
                const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
                console.log('Page load time:', pageLoadTime, 'ms');
                
                // Collect LCP timing once available
                if (PerformanceObserver) {
                  const observer = new PerformanceObserver((list) => {
                    const entries = list.getEntries();
                    if (entries.length > 0) {
                      const lcpEntry = entries[entries.length - 1];
                      console.log('LCP:', lcpEntry.startTime, 'ms');
                    }
                    observer.disconnect();
                  });
                  observer.observe({type: 'largest-contentful-paint', buffered: true});
                }
              }
            });
          `
        }} />
      </head>
      <body className="osrs-background" suppressHydrationWarning>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
