import type { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://www.beurl.cc',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.00,
    },
    {
      url: 'https://www.beurl.cc/url',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.00,
    },
    {
        url: 'https://www.beurl.cc/image',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.00,
    },
    {
        url: 'https://www.beurl.cc/media',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.00,
    },
    {
        url: 'https://www.beurl.cc/policy/privacy',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.00,
    },
    {
        url: 'https://www.beurl.cc/policy/disclaimer',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.00,
    },
    {
        url: 'https://www.beurl.cc/policy/termsOfService',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.00,
    },
  ]
}