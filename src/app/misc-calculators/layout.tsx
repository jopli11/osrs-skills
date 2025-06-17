import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'OSRS Misc Calculators | Utility Tools for RuneScape Planning',
  description: 'Collection of essential OSRS utility calculators. Total level tracker, XP calculator, high alchemy profit calculator, and more planning tools for Old School RuneScape.',
  keywords: [
    'OSRS calculators',
    'RuneScape utility tools',
    'Old School RuneScape calculators',
    'OSRS planning tools',
    'RuneScape skill calculators',
    'OSRS progress tracker',
    'RuneScape training tools',
    'OSRS helper tools'
  ],
  openGraph: {
    title: 'OSRS Misc Calculators | Utility Tools for RuneScape Planning',
    description: 'Collection of essential OSRS utility calculators including total level tracker, XP calculator, and high alchemy profit calculator.',
    type: 'website',
    url: '/misc-calculators',
    images: [
      {
        url: '/images/misc-calculators-og.png',
        width: 1200,
        height: 630,
        alt: 'OSRS Misc Calculators Collection',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OSRS Misc Calculators | Utility Tools for RuneScape Planning',
    description: 'Collection of essential OSRS utility calculators for skill planning and account progression.',
    images: ['/images/misc-calculators-og.png'],
  },
  alternates: {
    canonical: '/misc-calculators',
  },
};

export default function MiscCalculatorsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 