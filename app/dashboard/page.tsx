import { auth } from '@/lib/auth'
import prisma from '@/lib/db'
import DataTable from './DataTable'
import UserNav from './UserNav'
import { columns } from './columns'

export type User = Awaited<ReturnType<typeof getUser>>

export default async function Page() {
  const works = await prisma.work.findMany({ orderBy: { createdAt: 'desc' } })
  const user = await getUser()
  return (
    <div className="h-full flex-1 flex-col space-y-8 p-8 flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Hi, {getFirstName(user.name)}!
          </h2>
          <p className="text-zinc-500">everyday sentences</p>
        </div>
        <div className="flex items-center space-x-2">
          <UserNav user={user} />
        </div>
      </div>
      <DataTable columns={columns} data={works} />
    </div>
  )
}

async function getUser() {
  const session = await auth()
  const user = session?.user
  return {
    name: user?.name ?? '',
    email: user?.email ?? '',
    image: user?.image ?? '',
  }
}

const getFirstName = (fullName: string) => fullName.split(' ')[0]
