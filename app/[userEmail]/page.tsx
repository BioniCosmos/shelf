import prisma from '@/lib/db'
import { classifyAndSort } from '@/lib/utils'
import { notFound } from 'next/navigation'
import WorkCard from './WorkCard'

export default async function Page({
  params,
}: {
  params: { userEmail: string }
}) {
  const works = await prisma.work.findMany({
    where: { userEmail: decodeURIComponent(params.userEmail) },
  })
  if (works.length === 0) {
    return notFound()
  }

  const categories = classifyAndSort(works, ({ name }) => name)
  return categories.map(({ letter, items }) => {
    if (items.length === 0) {
      return null
    }

    return (
      <div className="p-4" key={letter}>
        <h2 className="text-3xl font-bold mb-4">{letter}</h2>
        <div className="grid grid-col-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4">
          {items.map((item) => (
            <WorkCard key={item.id} work={item} />
          ))}
        </div>
      </div>
    )
  })
}
