import { forwardRef } from 'react'
import type { InputHTMLAttributes } from 'react'
import Search from 'lucide-react/dist/esm/icons/search'
import { cn } from '@/lib/utils'

const variantStyles = {
  default:
    'bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-usfit-cyan focus:ring-usfit-cyan/20',
  search:
    'bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-usfit-cyan focus:ring-usfit-cyan/20 rounded-full pl-10',
  active:
    'bg-[#eff6ff] border-blue-500 text-blue-900 font-bold focus:border-blue-600 focus:ring-blue-500/20',
  result:
    'bg-[#ecfeff] border-cyan-400 text-cyan-800 font-bold focus:border-cyan-500 focus:ring-cyan-400/20',
  disabled:
    'bg-gray-50 border-gray-200 text-gray-400 cursor-not-allowed',
} as const

type InputVariant = keyof typeof variantStyles

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: InputVariant
  label?: string
  error?: string
  hint?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      variant = 'default',
      label,
      error,
      hint,
      className,
      disabled,
      id,
      ...props
    },
    ref,
  ) => {
    const effectiveVariant = disabled ? 'disabled' : variant
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className="w-full">
        {label ? (
          <label
            htmlFor={inputId}
            className="mb-1.5 block text-sm font-medium text-gray-600"
          >
            {label}
          </label>
        ) : null}

        <div className="relative">
          {effectiveVariant === 'search' ? (
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          ) : null}

          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            className={cn(
              'w-full rounded-lg border px-3 py-2.5 text-sm',
              'outline-none transition-all duration-200',
              'focus:ring-2',
              '[appearance:textfield]',
              '[&::-webkit-inner-spin-button]:appearance-none',
              '[&::-webkit-outer-spin-button]:appearance-none',
              variantStyles[effectiveVariant],
              error ? 'border-red-400 focus:border-red-500 focus:ring-red-500/20' : '',
              className,
            )}
            {...props}
          />
        </div>

        {error ? (
          <p className="mt-1 text-xs text-red-500">{error}</p>
        ) : hint ? (
          <p className="mt-1 text-xs text-gray-400">{hint}</p>
        ) : null}
      </div>
    )
  },
)

Input.displayName = 'Input'

export { Input }
export type { InputProps, InputVariant }
