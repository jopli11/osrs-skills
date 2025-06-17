import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'OSRS Combat Calculator | Calculate Your Combat Level',
  description: 'Calculate your Old School RuneScape combat level with our accurate OSRS combat calculator. Track your progress and plan your training for optimal combat builds.',
  keywords: [
    'OSRS combat calculator',
    'RuneScape combat level',
    'Old School RuneScape combat',
    'combat level calculator',
    'OSRS combat training',
    'RuneScape combat builds',
    'OSRS pure builds',
    'combat level formula',
    'OSRS level calculator'
  ],
  openGraph: {
    title: 'OSRS Combat Calculator | Calculate Your Combat Level',
    description: 'Calculate your Old School RuneScape combat level with our accurate OSRS combat calculator. Track your progress and plan your training.',
    type: 'website',
    url: '/combat-calculator',
    images: [
      {
        url: '/images/combat-calculator-og.png',
        width: 1200,
        height: 630,
        alt: 'OSRS Combat Calculator Screenshot',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OSRS Combat Calculator | Calculate Your Combat Level',
    description: 'Calculate your Old School RuneScape combat level and plan optimal training paths.',
    images: ['/images/combat-calculator-og.png'],
  },
  alternates: {
    canonical: '/combat-calculator',
  },
};

export default function CombatCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 