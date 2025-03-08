import { Loader } from '@components/loader'
import type { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

interface ButtonProps extends ComponentProps<'button'> {
  children?: React.ReactNode
  isLoading?: boolean
  variant?: 'primary' | 'outline' | 'badge'
  disabled?: boolean
  icon?: React.ReactNode
}

export function Button({
  children,
  className,
  isLoading,
  variant,
  disabled,
  icon,
  ...props
}: ButtonProps) {
  const baseClasses =
    'flex justify-between items-center px-5 h-12 font-semibold rounded-xl w-full cursor-pointer transition-colors duration-300'
  const variantClasses = {
    primary: 'bg-gray-500 text-blue hover:bg-blue hover:text-gray-900',
    outline:
      'bg-transparent border border-gray-500 text-gray-100 hover:bg-gray-500 hover:text-white',
    badge: 'bg-red-500 text-white hover:bg-red-700',
  }

  return (
    <button
      className={twMerge(
        baseClasses,
        variantClasses[variant || 'primary'],
        className,
        disabled && 'opacity-50 pointer-events-none cursor-not-allowed'
      )}
      {...props}
    >
      {isLoading ? <Loader className="size-4" /> : children}
      {icon && icon}
    </button>
  )
}
