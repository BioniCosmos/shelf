import { cn, range } from '@/lib/utils'
import { Star } from 'lucide-react'

export function Stars({ count, size }: { count: number; size?: 'small' }) {
  return (
    <div className="flex items-center gap-1">
      {range(count).map((i) => (
        <Star
          key={i}
          className={cn('fill-current', { 'size-4': size === 'small' })}
        />
      ))}
    </div>
  )
}
