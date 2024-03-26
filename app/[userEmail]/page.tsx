import prisma from '@/lib/db'
import { notFound } from 'next/navigation'
import DisplayShelf from './DisplayShelf'

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

  return <DisplayShelf works={works} />
}
