import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'OSRS Max Hit Calculator | Melee, Ranged & Magic Damage Calculator',
  description: 'Calculate your maximum hit damage in Old School RuneScape. Accurate max hit calculators for Melee, Ranged, and Magic combat styles with all gear and boost options.',
  keywords: [
    'OSRS max hit calculator',
    'RuneScape max hit',
    'Old School RuneScape damage calculator',
    'OSRS DPS calculator',
    'max hit formula OSRS',
    'OSRS combat calculator',
    'RuneScape damage calculator',
    'melee max hit calculator',
    'ranged max hit calculator',
    'magic max hit calculator'
  ],
  openGraph: {
    title: 'OSRS Max Hit Calculator | Melee, Ranged & Magic Damage Calculator',
    description: 'Calculate your maximum hit damage in Old School RuneScape. Accurate calculators for all combat styles with gear and boost options.',
    type: 'website',
    url: '/max-hit-calculator',
    images: [
      {
        url: '/images/max-hit-calculator-og.png',
        width: 1200,
        height: 630,
        alt: 'OSRS Max Hit Calculator Screenshot',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OSRS Max Hit Calculator | Melee, Ranged & Magic Damage Calculator',
    description: 'Calculate your maximum hit damage in OSRS for all combat styles.',
    images: ['/images/max-hit-calculator-og.png'],
  },
  alternates: {
    canonical: '/max-hit-calculator',
  },
};

export default function MaxHitCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 