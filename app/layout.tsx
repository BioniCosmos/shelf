import { openGraph } from '@/lib/metadata'
import type { Metadata } from 'next'
import { ThemeProvider } from 'next-themes'
import './globals.css'

export const metadata: Metadata = {
  title: { template: '%s | Shelf', default: 'Shelf' },
  description: 'Keep your favourites on Shelf',
  openGraph: {
    title: { template: '%s | Shelf', default: 'Shelf' },
    ...openGraph,
  },
  robots: 'none',
  metadataBase:
    process.env.BASE_URL !== undefined ? new URL(process.env.BASE_URL) : null,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
