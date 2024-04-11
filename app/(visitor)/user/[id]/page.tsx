import prisma from '@/lib/db'
import { openGraph } from '@/lib/metadata'
import { classifyAndSort } from '@/lib/utils'
import { BookDashed } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export const metadata: Metadata = { openGraph }

export default async function Page({ params }: { params: { id: string } }) {
  const user = await prisma.user.findUnique({
    where: { id: params.id },
    include: { works: true },
  })
  if (user === null) {
    notFound()
  }

  metadata.title = user.name
  metadata.openGraph!.title = user.name

  const { works } = user
  if (works.length === 0) {
    return (
      <div className="text-muted-foreground flex gap-2 items-center justify-center h-[calc(100dvh_-_76px)]">
        <BookDashed />
        This is an empty shelf.
      </div>
    )
  }

  const categories = classifyAndSort(works, ({ name }) => name)
  return categories.map(({ letter, items }) => {
    if (items.length === 0) {
      return null
    }
    return (
      <div className="py-2" key={letter}>
        <h2 className="text-3xl font-bold mb-4">{letter}</h2>
        <div className="grid grid-col-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4">
          {items.map((work) => (
            <Link href={`/work/${work.id}`} key={work.id}>
              <picture>
                <source
                  srcSet={`${work.cover}?format=avif`}
                  type="image/avif"
                />
                <source
                  srcSet={`${work.cover}?format=webp`}
                  type="image/webp"
                />
                <img
                  src={work.cover}
                  alt={work.name}
                  className="w-full aspect-[3_/_4] object-cover"
                />
              </picture>
              <h1 className="text-center font-bold text-lg pt-2 pb-3">
                {work.name}
              </h1>
            </Link>
          ))}
        </div>
      </div>
    )
  })
}
