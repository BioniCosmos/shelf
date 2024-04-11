import { alt, contentType, size } from '@/app/opengraph-image'
import type { Metadata } from 'next'

export const openGraph: Metadata['openGraph'] = {
  description: 'Keep your favourites on Shelf',
  siteName: 'Shelf',
  locale: 'en_US',
  images: {
    url: `${process.env.BASE_URL ?? ''}/opengraph-image`,
    alt,
    ...size,
    type: contentType,
  },
  url: process.env.BASE_URL,
  type: 'website',
}
