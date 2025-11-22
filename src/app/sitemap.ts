import { MetadataRoute } from 'next';
import { ALL_SKILLS } from '@/lib/constants';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.osrscalculators.com';

  // Core pages
  const routes = [
    '',
    '/combat-calculator',
    '/dps-calculator',
    '/skills',
    '/blog',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  // Skill calculator pages
  const skillRoutes = ALL_SKILLS.map((skill) => ({
    url: `${baseUrl}/skills/${skill}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: skill === 'sailing' ? 0.9 : 0.7, // Boost priority for the new skill
  }));

  return [...routes, ...skillRoutes];
}

