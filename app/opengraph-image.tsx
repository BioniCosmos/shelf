import LibraryIcon from '@/components/LibraryIcon'
import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'Keep your favourites on Shelf'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  const fontData = await fetch(
    new URL('./InterDisplay-Bold.otf', import.meta.url)
  ).then((res) => res.arrayBuffer())
  return new ImageResponse(image, {
    fonts: [
      { name: 'InterDisplay', data: fontData, style: 'normal', weight: 700 },
    ],
  })
}

const image = (
  <div
    style={{
      display: 'flex',
      width: '100%',
      height: '100%',
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '9rem',
      fontWeight: 700,
      gap: '1.5rem',
    }}
  >
    <LibraryIcon style={{ width: '8rem', height: '8rem' }} />
    <div>Shelf</div>
  </div>
)
