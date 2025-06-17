import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'OSRS Total Level Calculator | Calculate Your Account Progress',
  description: 'Calculate your total level across all 23 OSRS skills. Track account progression, import player stats, and see how close you are to maxing. Free OSRS total level calculator.',
  keywords: [
    'OSRS total level calculator',
    'RuneScape total level',
    'Old School RuneScape calculator',
    'OSRS account progress',
    'total level tracker',
    'OSRS skills calculator',
    'RuneScape max level',
    'OSRS progress tracker'
  ],
  openGraph: {
    title: 'OSRS Total Level Calculator | Calculate Your Account Progress',
    description: 'Calculate your total level across all 23 OSRS skills. Track account progression, import player stats, and see how close you are to maxing.',
    type: 'website',
    url: '/total-level-calculator',
    images: [
      {
        url: '/images/total-level-calculator-og.png',
        width: 1200,
        height: 630,
        alt: 'OSRS Total Level Calculator Screenshot',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OSRS Total Level Calculator | Calculate Your Account Progress',
    description: 'Calculate your total level across all 23 OSRS skills. Track account progression and see how close you are to maxing.',
    images: ['/images/total-level-calculator-og.png'],
  },
  alternates: {
    canonical: '/total-level-calculator',
  },
};

export default function TotalLevelCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 