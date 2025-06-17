import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'OSRS Melee Max Hit Calculator | Strength & Attack Damage Calculator',
  description: 'Calculate your maximum melee hit in Old School RuneScape. Accurate melee damage calculator with all weapons, gear, potions, and strength bonuses. Plan your melee builds.',
  keywords: [
    'OSRS melee max hit calculator',
    'RuneScape melee calculator',
    'Old School RuneScape melee damage',
    'melee max hit formula',
    'OSRS strength calculator',
    'melee DPS calculator OSRS',
    'RuneScape attack calculator',
    'OSRS melee gear calculator',
    'strength bonus calculator',
    'melee training calculator OSRS'
  ],
  openGraph: {
    title: 'OSRS Melee Max Hit Calculator | Strength & Attack Damage Calculator',
    description: 'Calculate your maximum melee hit in Old School RuneScape. Includes all weapons, gear, potions, and strength bonuses.',
    type: 'website',
    url: '/melee-max-hit-calculator',
    images: [
      {
        url: '/images/melee-max-hit-calculator-og.png',
        width: 1200,
        height: 630,
        alt: 'OSRS Melee Max Hit Calculator Screenshot',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OSRS Melee Max Hit Calculator | Strength & Attack Damage Calculator',
    description: 'Calculate your maximum melee hit in OSRS with all gear and boost options.',
    images: ['/images/melee-max-hit-calculator-og.png'],
  },
  alternates: {
    canonical: '/melee-max-hit-calculator',
  },
};

export default function MeleeMaxHitCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 