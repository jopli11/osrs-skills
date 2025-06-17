import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'OSRS XP Calculator | Calculate Experience to Level Goals',
  description: 'Calculate exact XP needed to reach your target OSRS levels. Plan skill training, import player stats, and see how many actions you need. Free OSRS experience calculator.',
  keywords: [
    'OSRS XP calculator',
    'RuneScape experience calculator',
    'Old School RuneScape XP',
    'OSRS skill calculator',
    'experience to level calculator',
    'OSRS training calculator',
    'RuneScape level calculator',
    'OSRS skill planning',
    'experience table OSRS'
  ],
  openGraph: {
    title: 'OSRS XP Calculator | Calculate Experience to Level Goals',
    description: 'Calculate exact XP needed to reach your target OSRS levels. Plan skill training, import player stats, and see how many actions you need.',
    type: 'website',
    url: '/xp-calculator',
    images: [
      {
        url: '/images/xp-calculator-og.png',
        width: 1200,
        height: 630,
        alt: 'OSRS XP Calculator Screenshot',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OSRS XP Calculator | Calculate Experience to Level Goals',
    description: 'Calculate exact XP needed to reach your target OSRS levels. Plan skill training and optimize your training methods.',
    images: ['/images/xp-calculator-og.png'],
  },
  alternates: {
    canonical: '/xp-calculator',
  },
};

export default function XpCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 