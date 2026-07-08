import { MetadataRoute } from 'next';
import { SITE_CONFIG } from '@/constants/site';
import { ASSETS } from '@/constants/assets';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_CONFIG.name,
    short_name: 'Tornitech',
    description: 'Tornillería y Fijación Industrial',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#052042',
    icons: [
      {
        src: ASSETS.isotipo.color,
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: ASSETS.isotipo.positivo,
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
