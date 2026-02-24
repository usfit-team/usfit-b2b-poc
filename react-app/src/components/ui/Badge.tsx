import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

const variantStyles = {
  success: 'bg-green-100 text-green-700',
  warning: 'bg-yellow-100 text-yellow-700',
  danger: 'bg-red-100 text-red-700',
  info: 'bg-blue-100 text-blue-700',
  neutral: 'bg-gray-100 text-gray-600',
  paid: 'bg-[#dcfce7] text-[#166534]',
  pending: 'bg-[#fef9c3] text-[#854d0e]',
  overdue: 'bg-[#fee2e2] text-[#991b1b]',
} as const

type BadgeVariant = keyof typeof variantStyles

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
  role_badge?: boolean
}

function Badge({
  variant = 'neutral',
  role_badge = false,
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        variantStyles[variant],
        role_badge ? 'uppercase tracking-wide text-[10px] font-semibold' : '',
        className,
      )}
      {...props}
    >
      {children}
    </span>
  )
}

export { Badge }
export type { BadgeProps, BadgeVariant }
