import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'OSRS Blog | Old School RuneScape Guides & Strategies',
    template: '%s | OSRS Blog',
  },
  description: 'Latest OSRS guides, strategies, and calculator updates. Stay informed with expert tips for Old School RuneScape.',
  keywords: ['OSRS blog', 'RuneScape guides', 'OSRS strategies', 'Old School RuneScape tips', 'OSRS calculator updates'],
  openGraph: {
    title: 'OSRS Blog | Old School RuneScape Guides & Strategies',
    description: 'Latest OSRS guides, strategies, and calculator updates. Stay informed with expert tips for Old School RuneScape.',
    type: 'website',
    url: '/blog',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OSRS Blog | Old School RuneScape Guides & Strategies',
    description: 'Latest OSRS guides, strategies, and calculator updates. Stay informed with expert tips for Old School RuneScape.',
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 