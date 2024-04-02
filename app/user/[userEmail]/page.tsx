import prisma from '@/lib/db'
import { classifyAndSort } from '@/lib/utils'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export default async function Page({
  params,
}: {
  params: { userEmail: string }
}) {
  const works = await prisma.work.findMany({
    where: { userEmail: decodeURIComponent(params.userEmail) },
  })
  if (works.length === 0) {
    notFound()
  }

  const categories = classifyAndSort(works, ({ name }) => name)
  return (
    <div className="p-4">
      {categories.map(({ letter, items }) => {
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
      })}
    </div>
  )
}
