import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'OSRS Magic Max Hit Calculator | Spell Damage & Magic Boost Calculator',
  description: 'Calculate your maximum magic hit in Old School RuneScape. Accurate magic damage calculator with all spells, magic gear, staves, and magic boost options.',
  keywords: [
    'OSRS magic max hit calculator',
    'RuneScape magic calculator',
    'Old School RuneScape magic damage',
    'magic max hit formula',
    'OSRS spell calculator',
    'magic DPS calculator OSRS',
    'RuneScape magic gear calculator',
    'OSRS staff calculator',
    'magic damage calculator',
    'magic training calculator OSRS'
  ],
  openGraph: {
    title: 'OSRS Magic Max Hit Calculator | Spell Damage & Magic Boost Calculator',
    description: 'Calculate your maximum magic hit in Old School RuneScape. Includes all spells, magic gear, staves, and boost options.',
    type: 'website',
    url: '/magic-max-hit-calculator',
    images: [
      {
        url: '/images/magic-max-hit-calculator-og.png',
        width: 1200,
        height: 630,
        alt: 'OSRS Magic Max Hit Calculator Screenshot',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OSRS Magic Max Hit Calculator | Spell Damage & Magic Boost Calculator',
    description: 'Calculate your maximum magic hit in OSRS with all spells and magic gear.',
    images: ['/images/magic-max-hit-calculator-og.png'],
  },
  alternates: {
    canonical: '/magic-max-hit-calculator',
  },
};

export default function MagicMaxHitCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 