import ThemeToggle from '@/components/ThemeToggle'
import { getUser } from '@/lib/auth'
import prisma from '@/lib/db'
import DataTable from './DataTable'
import UserNav from './UserNav'
import { columns } from './columns'

export default async function Page() {
  const user = await getUser()
  const works = await prisma.work.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: 'desc' },
  })
  const randomSentence = await (
    await fetch('https://international.v1.hitokoto.cn/?encode=text')
  ).text()
  return (
    <div className="h-full flex-1 flex-col space-y-8 p-8 flex">
      <div className="flex items-center justify-between space-y-2">
        <div className="space-y-px">
          <h2 className="text-2xl font-bold tracking-tight">
            Hi, {getFirstName(user.name)}!
          </h2>
          <p className="text-zinc-500">{randomSentence}</p>
        </div>
        <div className="flex items-center gap-3 space-x-2">
          <ThemeToggle />
          <UserNav user={user} />
        </div>
      </div>
      <DataTable columns={columns} data={works} />
    </div>
  )
}

const getFirstName = (fullName: string) => fullName.split(' ')[0]
