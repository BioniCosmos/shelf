import { range } from '@/lib/utils'
import { Star } from 'lucide-react'

export function Stars({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-1">
      {range(count).map((i) => (
        <Star key={i} className="w-4 h-4 fill-current" />
      ))}
    </div>
  )
}
