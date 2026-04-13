import type { MetadataRoute } from 'next';
import { SITE_METADATA } from '@/lib/constants';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_METADATA.title,
    short_name: 'Future Emkan',
    description: SITE_METADATA.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#F7F4EE',
    theme_color: '#3B2C59',
    orientation: 'portrait',
    lang: 'ar',
    dir: 'rtl',
    categories: ['health', 'medical', 'education'],
    icons: [
      {
        src: '/icon.jpg',
        sizes: '250x258',
        type: 'image/jpeg',
      },
      {
        src: '/apple-icon.jpg',
        sizes: '250x258',
        type: 'image/jpeg',
        purpose: 'any',
      },
    ],
  };
}
