'use client'
import { useRef, forwardRef, type ForwardedRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { FieldError } from 'react-hook-form'
import type { TimeSlot } from '@http/api'

interface TimeCarouselProps {
  label?: string
  error?: FieldError
  times: TimeSlot[]
  name?: string
  onBlur?: () => void
  onChange?: (value: string) => void
  value?: string
}

export const TimeCarousel = forwardRef(
  (
    {
      label,
      error,
      times,
      name,
      onBlur,
      onChange,
      value,
      ...props
    }: TimeCarouselProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null)

    const scroll = (direction: 'left' | 'right') => {
      if (scrollContainerRef.current) {
        const { current } = scrollContainerRef
        const scrollAmount = 200 // Adjust as needed

        if (direction === 'left') {
          current.scrollBy({ left: -scrollAmount, behavior: 'smooth' })
        } else {
          current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
        }
      }
    }

    const handleTimeSelect = (time: string) => {
      if (onChange) {
        onChange(time)
      }
    }

    return (
      <div className="w-full">
        <p className="text-gray-100 font-semibold m-1">{label}</p>

        <div className="relative">
          <div
            data-error={error}
            className="relative border border-gray-600 rounded-xl focus-within:border-gray-100 data-[error]:border-danger bg-gray-800 p-2"
          >
            {/* Hidden input for react-hook-form */}
            <input
              type="radio"
              className="sr-only"
              name={name}
              ref={ref}
              onBlur={onBlur}
              value={value}
              {...props}
            />

            <div className="flex items-center">
              <button
                type="button"
                onClick={() => scroll('left')}
                className="flex-shrink-0 p-1 rounded-full bg-gray-700 text-gray-300 hover:bg-gray-600 focus:outline-none"
              >
                <ChevronLeft size={20} />
              </button>

              <div
                ref={scrollContainerRef}
                className="flex overflow-x-auto scrollbar-hide space-x-2 px-2 py-1 flex-grow"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {times.map(time => (
                  <button
                    key={`${time.day}-${time.hours}`}
                    type="button"
                    onClick={() => handleTimeSelect(time.hours ?? '')}
                    className={`flex-shrink-0 px-4 py-2 rounded-lg focus:outline-none transition-colors ${value === time.hours
                      ? 'bg-gray-700 text-gray-100 border border-gray-500'
                      : 'bg-gray-800 text-gray-300 border border-gray-700 hover:bg-gray-700'
                      }`}
                  >
                    {time.hours}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => scroll('right')}
                className="flex-shrink-0 p-1 rounded-full bg-gray-700 text-gray-300 hover:bg-gray-600 focus:outline-none"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
)
