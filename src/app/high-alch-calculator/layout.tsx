import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'OSRS High Alchemy Calculator | Profit Calculator & Magic XP',
  description: 'Calculate high alchemy profit/loss in OSRS. Find the best items to alch for Magic XP and GP. Real-time nature rune costs and alch values. Free high alch calculator.',
  keywords: [
    'OSRS high alchemy calculator',
    'RuneScape alch calculator',
    'high alch profit calculator',
    'OSRS magic calculator',
    'best items to alch OSRS',
    'nature rune cost calculator',
    'OSRS alchemy profit',
    'magic training calculator',
    'high alch guide OSRS'
  ],
  openGraph: {
    title: 'OSRS High Alchemy Calculator | Profit Calculator & Magic XP',
    description: 'Calculate high alchemy profit/loss in OSRS. Find the best items to alch for Magic XP and GP. Includes nature rune costs and profit analysis.',
    type: 'website',
    url: '/high-alch-calculator',
    images: [
      {
        url: '/images/high-alch-calculator-og.png',
        width: 1200,
        height: 630,
        alt: 'OSRS High Alchemy Calculator Screenshot',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OSRS High Alchemy Calculator | Profit Calculator & Magic XP',
    description: 'Calculate high alchemy profit/loss in OSRS. Find the best items to alch for Magic XP and GP.',
    images: ['/images/high-alch-calculator-og.png'],
  },
  alternates: {
    canonical: '/high-alch-calculator',
  },
};

export default function HighAlchCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 