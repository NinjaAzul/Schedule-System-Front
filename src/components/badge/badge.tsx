import { type VariantProps, cva } from 'class-variance-authority'
import type * as React from 'react'
import { twMerge } from 'tailwind-merge'

export interface BadgeProps
  extends React.ComponentProps<'div'>,
    VariantProps<typeof badgeVariants> {}

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-blue-dark text-gray-100 hover:bg-blue-dark/80',
        secondary:
          'border-transparent bg-gray-100 text-gray-900 hover:bg-gray-100/80',
        destructive:
          'border-transparent bg-red-500 text-gray-100 hover:bg-red-500/80',
        outline: 'border-gray-100 text-gray-100 hover:bg-blue-dark/80',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div
      className={twMerge(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
