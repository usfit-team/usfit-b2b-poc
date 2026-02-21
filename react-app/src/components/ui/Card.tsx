import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean
}

function Card({ hover = false, className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-gray-100 bg-white shadow-sm',
        hover ? 'transition-shadow duration-200 hover:shadow-md' : '',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  title: string
  action?: ReactNode
}

function CardHeader({ title, action, className, ...props }: CardHeaderProps) {
  return (
    <div
      className={cn(
        'flex items-center justify-between border-b border-gray-100 px-6 py-4',
        className,
      )}
      {...props}
    >
      <h3 className="font-display text-base font-semibold text-gray-900">
        {title}
      </h3>
      {action ? <div>{action}</div> : null}
    </div>
  )
}

interface CardContentProps extends HTMLAttributes<HTMLDivElement> {}

function CardContent({ className, children, ...props }: CardContentProps) {
  return (
    <div className={cn('p-6', className)} {...props}>
      {children}
    </div>
  )
}

export { Card, CardHeader, CardContent }
export type { CardProps, CardHeaderProps, CardContentProps }
