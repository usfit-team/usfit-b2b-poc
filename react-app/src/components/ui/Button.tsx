import { forwardRef } from 'react'
import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'

const variantStyles = {
  primary:
    'bg-usfit-gradient text-white shadow-md hover:shadow-lg hover:brightness-110',
  secondary:
    'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 hover:border-gray-300',
  outline:
    'bg-transparent text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-gray-400',
  ghost: 'bg-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-900',
  danger:
    'bg-red-500 text-white hover:bg-red-600 shadow-md hover:shadow-lg',
} as const

const sizeStyles = {
  sm: 'px-3.5 py-1.5 text-xs gap-1.5',
  md: 'px-5 py-2.5 text-sm gap-2',
  lg: 'px-7 py-3 text-base gap-2.5',
} as const

type ButtonVariant = keyof typeof variantStyles
type ButtonSize = keyof typeof sizeStyles

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  iconLeft?: ReactNode
  iconRight?: ReactNode
  isLoading?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      iconLeft,
      iconRight,
      isLoading = false,
      disabled,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const isDisabled = disabled || isLoading

    return (
      <motion.button
        ref={ref}
        whileTap={isDisabled ? undefined : { scale: 0.97 }}
        disabled={isDisabled}
        className={cn(
          'inline-flex items-center justify-center rounded-full font-medium',
          'transition-all duration-200 ease-out',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-usfit-cyan focus-visible:ring-offset-2',
          'disabled:opacity-50 disabled:pointer-events-none',
          'hover:scale-[1.02] active:scale-[0.98]',
          'cursor-pointer',
          variantStyles[variant],
          sizeStyles[size],
          className,
        )}
        {...props}
      >
        {isLoading ? (
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : (
          iconLeft
        )}
        {children}
        {!isLoading ? iconRight : null}
      </motion.button>
    )
  },
)

Button.displayName = 'Button'

export { Button }
export type { ButtonProps, ButtonVariant, ButtonSize }
