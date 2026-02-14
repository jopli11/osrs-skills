import type { Metadata, Viewport } from "next";
import { Providers } from "@/app/providers";
import "./globals.css";
import "./styles.css";
import { Inter, Roboto_Slab } from 'next/font/google';
import { Analytics } from "@vercel/analytics/next";
import { ColorModeScript } from '@chakra-ui/react';
import theme from '@/theme';
import dynamic from 'next/dynamic';
import ClientOnly from '@/components/ClientOnly';
import DeferredScripts from '@/components/DeferredScripts';

// Dynamically import Footer with ssr: false
const Footer = dynamic(() => import('@/components/Footer'), { ssr: false });

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
  // Add icons (favicon, apple-touch-icon) - Comprehensive favicon setup for SEO
  icons: {
    icon: [
      { url: '/images/favicon/favicon.ico', sizes: 'any' },
      { url: '/images/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/images/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/images/favicon/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/images/favicon/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: '/images/favicon/favicon.ico',
    apple: [
      { url: '/images/favicon/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/images/favicon/favicon.ico',
        color: '#35281e',
      },
    ],
  },
  manifest: '/images/favicon/site.webmanifest',
  verification: {
    google: '6v9I76yF7pTFwA7Gnv0HMlMQ6sD_Fb0yNl9zDp2ZvN0',
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
        
        <link rel="preload" href="/icons/skills/new/attack128.png" as="image" />
        <link rel="preload" href="/icons/skills/new/strength128.png" as="image" />
        <link rel="preload" href="/icons/skills/new/defence128.png" as="image" />
        <link rel="preload" href="/icons/skills/new/ranged128.png" as="image" />
        <link rel="preload" href="/icons/skills/new/prayer128.png" as="image" />
        <link rel="preload" href="/icons/skills/new/magic128.png" as="image" />
        
        <link rel="dns-prefetch" href="https://oldschool.runescape.wiki" />
        <link rel="preconnect" href="https://oldschool.runescape.wiki" crossOrigin="anonymous" />
        
        {/* Google Tag Manager - must be in <head> per GTM docs */}
        {/* eslint-disable-next-line @next/next/next-script-for-ga */}
        <script dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-NNZPR8WP');
          `
        }} />
        
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
        {/* Google Tag Manager (noscript) - fallback for non-JS browsers */}
        <noscript>
          <iframe 
            src="https://www.googletagmanager.com/ns.html?id=GTM-NNZPR8WP"
            height="0" 
            width="0" 
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <Providers>
          {children}
        </Providers>
        <DeferredScripts />
        <Analytics />
        <ClientOnly>
          <Footer />
        </ClientOnly>
      </body>
    </html>
  );
}
