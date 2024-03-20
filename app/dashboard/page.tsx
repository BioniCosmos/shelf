import { works } from '../data'
import { columns } from './columns'
import DataTable from './DataTable'
import UserNav from './UserNav'

export default function Page() {
  return (
    <div className="h-full flex-1 flex-col space-y-8 p-8 flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Hi, user!</h2>
          <p className="text-zinc-500">everyday sentences</p>
        </div>
        <div className="flex items-center space-x-2">
          <UserNav />
        </div>
      </div>
      <DataTable columns={columns} data={works} />
    </div>
  )
}
