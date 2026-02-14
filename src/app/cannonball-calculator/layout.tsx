import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'OSRS Cannonball Calculator - Profit & Production Calculator | OSRS Skills',
  description: 'Calculate profit and production rates for making OSRS cannonballs. Find out GP per hour and how many cannonballs to make for maximum profit.',
  keywords: 'OSRS cannonball calculator, cannonball profit, OSRS smithing profit, cannonball production, OSRS smithing guide',
  openGraph: {
    title: 'OSRS Cannonball Calculator - Profit & Production Calculator',
    description: 'Calculate profit and production rates for making OSRS cannonballs. Find out GP per hour and how many cannonballs to make.',
    url: 'https://www.osrscalculators.com/cannonball-calculator',
    type: 'website',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'OSRS Cannonball Calculator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OSRS Cannonball Calculator - Profit & Production Calculator',
    description: 'Calculate profit and production rates for making OSRS cannonballs.',
    images: ['/images/og-image.png'],
  },
  alternates: {
    canonical: '/cannonball-calculator',
  },
};

export default function CannonballCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 