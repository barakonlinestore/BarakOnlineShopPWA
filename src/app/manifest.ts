import { type MetadataRoute } from 'next'

// Force static generation for static export
export const dynamic = 'force-static'
export const revalidate = 0

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Barak Online Shop',
    short_name: 'Barak Shop',
    description: 'An online store built with Next.js featuring AI search and offline capabilities.',
    start_url: '/',
    display: 'standalone',
    background_color: '#F0F0F0',
    theme_color: '#6699CC',
    icons: [
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
