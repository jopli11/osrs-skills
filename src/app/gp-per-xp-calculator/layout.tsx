import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'OSRS GP per XP Calculator - Cost Efficiency Calculator | OSRS Skills',
  description: 'Calculate the most cost-efficient training methods for OSRS buyable skills. Compare GP per XP rates across different training methods and items.',
  keywords: 'OSRS GP per XP calculator, OSRS cost efficiency, OSRS buyable skills, OSRS training cost, GP per experience',
  openGraph: {
    title: 'OSRS GP per XP Calculator - Cost Efficiency Calculator',
    description: 'Calculate the most cost-efficient training methods for OSRS buyable skills. Compare GP per XP rates across different training methods.',
    url: 'https://www.osrscalculators.com/gp-per-xp-calculator',
    type: 'website',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'OSRS GP per XP Calculator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OSRS GP per XP Calculator - Cost Efficiency Calculator',
    description: 'Calculate the most cost-efficient training methods for OSRS buyable skills.',
    images: ['/images/og-image.png'],
  },
  alternates: {
    canonical: '/gp-per-xp-calculator',
  },
};

export default function GpPerXpCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 