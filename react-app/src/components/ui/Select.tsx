import { forwardRef } from 'react'
import type { SelectHTMLAttributes } from 'react'
import ChevronDown from 'lucide-react/dist/esm/icons/chevron-down'
import { cn } from '@/lib/utils'

interface SelectOption {
  label: string
  value: string
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: SelectOption[]
  label?: string
  placeholder?: string
  error?: string
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ options, label, placeholder, error, className, id, disabled, ...props }, ref) => {
    const selectId = id ?? label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className="w-full">
        {label ? (
          <label
            htmlFor={selectId}
            className="mb-1.5 block text-sm font-medium text-gray-600"
          >
            {label}
          </label>
        ) : null}

        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            disabled={disabled}
            className={cn(
              'w-full appearance-none rounded-lg border bg-gray-50 px-3 py-2.5 pr-10 text-sm',
              'border-gray-200 text-gray-900',
              'outline-none transition-all duration-200',
              'focus:border-usfit-cyan focus:ring-2 focus:ring-usfit-cyan/20',
              'disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400',
              error ? 'border-red-400 focus:border-red-500 focus:ring-red-500/20' : '',
              className,
            )}
            {...props}
          >
            {placeholder ? (
              <option value="" disabled>
                {placeholder}
              </option>
            ) : null}
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        </div>

        {error ? (
          <p className="mt-1 text-xs text-red-500">{error}</p>
        ) : null}
      </div>
    )
  },
)

Select.displayName = 'Select'

export { Select }
export type { SelectProps, SelectOption }
