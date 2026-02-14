import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'OSRS Blast Furnace Calculator - Profit & XP Calculator | OSRS Skills',
  description: 'Calculate profit, XP rates, and efficiency for OSRS Blast Furnace smithing. Compare different ores and find the most profitable methods.',
  keywords: 'OSRS blast furnace calculator, OSRS smithing calculator, blast furnace profit, OSRS smithing XP, blast furnace guide',
  openGraph: {
    title: 'OSRS Blast Furnace Calculator - Profit & XP Calculator',
    description: 'Calculate profit, XP rates, and efficiency for OSRS Blast Furnace smithing. Compare different ores and find the most profitable methods.',
    url: 'https://www.osrscalculators.com/blast-furnace-calculator',
    type: 'website',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'OSRS Blast Furnace Calculator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OSRS Blast Furnace Calculator - Profit & XP Calculator',
    description: 'Calculate profit, XP rates, and efficiency for OSRS Blast Furnace smithing.',
    images: ['/images/og-image.png'],
  },
  alternates: {
    canonical: '/blast-furnace-calculator',
  },
};

export default function BlastFurnaceCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 