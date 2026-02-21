import { forwardRef } from 'react'
import type { InputHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface SliderProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'> {
  label?: string
  value: number
  min?: number
  max?: number
  step?: number
  unit?: string
  showValue?: boolean
  onChange: (value: number) => void
  className?: string
}

const Slider = forwardRef<HTMLInputElement, SliderProps>(
  (
    {
      label,
      value,
      min = 0,
      max = 100,
      step = 1,
      unit = '',
      showValue = true,
      onChange,
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <div className={cn('w-full', className)}>
        {label || showValue ? (
          <div className="mb-2 flex items-center justify-between">
            {label ? (
              <label className="text-sm font-medium text-gray-600">
                {label}
              </label>
            ) : (
              <span />
            )}
            {showValue ? (
              <span className="text-sm font-semibold text-gray-800">
                {value}
                {unit}
              </span>
            ) : null}
          </div>
        ) : null}

        <input
          ref={ref}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className={cn(
            'h-2 w-full cursor-pointer appearance-none rounded-full bg-gray-200 outline-none',
            'accent-usfit-cyan',
            '[&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4',
            '[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full',
            '[&::-webkit-slider-thumb]:bg-usfit-cyan [&::-webkit-slider-thumb]:shadow-md',
            '[&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:duration-150',
            '[&::-webkit-slider-thumb]:hover:scale-110',
            '[&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4',
            '[&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0',
            '[&::-moz-range-thumb]:bg-usfit-cyan [&::-moz-range-thumb]:shadow-md',
          )}
          {...props}
        />

        <div className="mt-1 flex justify-between text-[10px] text-gray-400">
          <span>
            {min}
            {unit}
          </span>
          <span>
            {max}
            {unit}
          </span>
        </div>
      </div>
    )
  },
)

Slider.displayName = 'Slider'

export { Slider }
export type { SliderProps }
