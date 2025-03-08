import type { ComponentProps } from 'react'
import type { FieldError } from 'react-hook-form'

interface InputProps extends ComponentProps<'input'> {
  error?: FieldError
  icon?: React.ReactNode
  children?: React.ReactNode
  label?: string
}

export function Input({ error, icon, children, label, ...props }: InputProps) {
  return (
    <div>
      <p className="text-gray-100 m-1">{label}</p>
      <div
        data-error={error}
        className="group flex items-center px-4 gap-2 h-12  bg-gray-800  border border-gray-600 rounded-xl  focus-within:border-gray-100 data-[error]:border-danger "
      >
        <span className="text-gray-400 group-focus-within:text-gray-100 group-[&:not(:has(input:placeholder-shown))]:text-gray-100 group-data-[error]:text-danger">
          {icon}
        </span>
        <input className="flex-1 outline-0 placeholder-gray-400 " {...props} />
        {children}
      </div>
    </div>
  )
}
