import { MetadataRoute } from 'next';
import { safeFetch } from '../lib/sanity';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await safeFetch(`*[_type == "project"] { "slug": slug.current, _updatedAt }`, []);
  const baseUrl = 'https://www.shabouk-pro.com';

  const projectUrls = projects.map((project: any) => ({
    url: `${baseUrl}/project/${project.slug}`,
    lastModified: project._updatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/services`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/gallery`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    ...projectUrls,
  ];
}
