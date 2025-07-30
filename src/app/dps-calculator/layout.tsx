import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'OSRS DPS Calculator | Damage Per Second Calculator & Combat Simulator',
  description: 'Calculate your DPS (damage per second) in Old School RuneScape. Advanced combat calculator with equipment, monster analysis, hit distributions, and TTK comparisons.',
  keywords: [
    'OSRS DPS calculator',
    'RuneScape damage per second calculator',
    'Old School RuneScape combat calculator',
    'OSRS combat simulator',
    'DPS meter OSRS',
    'RuneScape TTK calculator',
    'OSRS gear comparison',
    'combat effectiveness calculator',
    'monster weakness calculator OSRS',
    'OSRS accuracy calculator',
    'damage calculator RuneScape',
    'combat stats calculator OSRS'
  ],
  openGraph: {
    title: 'OSRS DPS Calculator | Advanced Combat Damage Calculator',
    description: 'Calculate your damage per second in OSRS with advanced combat simulation. Compare gear setups, analyze monster weaknesses, and optimize your DPS.',
    type: 'website',
    url: '/dps-calculator',
    images: [
      {
        url: '/images/dps-calculator-og.png',
        width: 1200,
        height: 630,
        alt: 'OSRS DPS Calculator Screenshot',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OSRS DPS Calculator | Advanced Combat Damage Calculator',
    description: 'Calculate your damage per second in OSRS with gear comparison and monster analysis.',
    images: ['/images/dps-calculator-og.png'],
  },
  alternates: {
    canonical: '/dps-calculator',
  },
};

export default function DPSCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 