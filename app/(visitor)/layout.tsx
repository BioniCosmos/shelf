import { Library } from 'lucide-react'
import type { ReactNode } from 'react'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="p-4 md:p-8">
      <div className="flex items-center text-lg font-medium gap-2 mb-4">
        <Library className="size-6" />
        Shelf
      </div>
      <div className="p-2">{children}</div>
    </div>
  )
}
