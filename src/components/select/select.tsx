'use client'
import type React from 'react'

import { ChevronDown } from 'lucide-react'
import {
  type ForwardedRef,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from 'react'
import type { ComponentProps } from 'react'
import type { FieldError } from 'react-hook-form'

interface SelectOption {
  value: string
  label: string
}

interface SelectProps extends Omit<ComponentProps<'button'>, 'onChange'> {
  error?: FieldError
  icon?: React.ReactNode
  label?: string
  options: SelectOption[]
  value?: string
  onChange?: (value: string) => void
  name?: string
}

export const Select = forwardRef(
  (
    {
      error,
      icon,
      label,
      options,
      value,
      onChange,
      name,
      ...props
    }: SelectProps,
    ref: ForwardedRef<HTMLButtonElement>
  ) => {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedValue, setSelectedValue] = useState(value || '')
    const dropdownRef = useRef<HTMLDivElement>(null)

    // Find the selected option label
    const selectedOption = options.find(
      option => option.value === selectedValue
    )

    useEffect(() => {
      if (value !== undefined) {
        setSelectedValue(value)
      }
    }, [value])

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false)
        }
      }

      document.addEventListener('mousedown', handleClickOutside)
      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }, [])

    const handleSelect = (option: SelectOption) => {
      setSelectedValue(option.value)
      setIsOpen(false)
      if (onChange) {
        onChange(option.value)
      }
    }

    return (
      <div className="relative">
        <p className="text-gray-100 m-1">{label}</p>
        <div ref={dropdownRef} data-error={error} className="relative">
          <button
            type="button"
            ref={ref}
            className="flex items-center justify-between w-full px-4 py-2 h-12 bg-gray-800 border border-gray-600 rounded-xl focus:border-gray-100 data-[error]:border-danger text-left"
            onClick={() => setIsOpen(!isOpen)}
            {...props}
          >
            <div className="flex items-center gap-2 w-full">
              <span className="text-gray-400 group-focus-within:text-gray-100">
                {icon}
              </span>
              <span
                className={`flex-1 ${selectedValue ? 'text-gray-100' : 'text-gray-400'}`}
              >
                {selectedOption?.label || 'Selecione uma opção'}
              </span>
            </div>
            <ChevronDown
              size={18}
              className={`text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            />
          </button>

          {/* Hidden input for form submission */}
          <input type="hidden" name={name} value={selectedValue} />

          {isOpen && (
            <div className="absolute z-10 w-full mt-1 bg-gray-800 border border-gray-00 rounded-lg shadow-lg max-h-35 overflow-auto">
              {options.map(option => (

                <div
                  key={option.value}
                  className={`px-4 py-2 cursor-pointer hover:bg-gray-700 ${option.value === selectedValue ? 'bg-gray-700' : ''
                    }`}
                  onClick={() => handleSelect(option)}
                >
                  {option.label}
                </div>

              ))}
            </div>
          )}
        </div>
      </div>
    )
  }
)
