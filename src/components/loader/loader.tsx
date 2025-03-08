import { LoaderCircle } from 'lucide-react'
import { twMerge } from 'tailwind-merge'

export const Loader = ({ className }: { className?: string }) => {
  return (
    <div>
      <LoaderCircle
        className={twMerge('size-10 animate-spin  text-gray-100', className)}
      />
    </div>
  )
}
