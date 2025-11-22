import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/api/', // Disallow API routes from crawling
    },
    sitemap: 'https://www.osrscalculators.com/sitemap.xml',
  };
}

