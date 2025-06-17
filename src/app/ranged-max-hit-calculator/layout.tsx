import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'OSRS Ranged Max Hit Calculator | Bow & Crossbow Damage Calculator',
  description: 'Calculate your maximum ranged hit in Old School RuneScape. Accurate ranged damage calculator with all bows, crossbows, arrows, bolts, and ranged gear options.',
  keywords: [
    'OSRS ranged max hit calculator',
    'RuneScape ranged calculator',
    'Old School RuneScape ranged damage',
    'ranged max hit formula',
    'OSRS bow calculator',
    'crossbow damage calculator OSRS',
    'RuneScape archery calculator',
    'OSRS ranged gear calculator',
    'ranged strength calculator',
    'bow training calculator OSRS'
  ],
  openGraph: {
    title: 'OSRS Ranged Max Hit Calculator | Bow & Crossbow Damage Calculator',
    description: 'Calculate your maximum ranged hit in Old School RuneScape. Includes all bows, crossbows, arrows, bolts, and ranged gear.',
    type: 'website',
    url: '/ranged-max-hit-calculator',
    images: [
      {
        url: '/images/ranged-max-hit-calculator-og.png',
        width: 1200,
        height: 630,
        alt: 'OSRS Ranged Max Hit Calculator Screenshot',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OSRS Ranged Max Hit Calculator | Bow & Crossbow Damage Calculator',
    description: 'Calculate your maximum ranged hit in OSRS with all ranged weapons and gear.',
    images: ['/images/ranged-max-hit-calculator-og.png'],
  },
  alternates: {
    canonical: '/ranged-max-hit-calculator',
  },
};

export default function RangedMaxHitCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 