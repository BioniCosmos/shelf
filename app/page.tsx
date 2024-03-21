import prisma from '@/lib/db'
import DisplayShelf from './DisplayShelf'

export default async function Page() {
  const works = await prisma.work.findMany()
  return <DisplayShelf works={works} />
}
