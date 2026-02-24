import type { LabelHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean
}

function Label({ className, children, required, ...props }: LabelProps) {
  return (
    <label
      className={cn('mb-1.5 block text-sm font-medium text-gray-600', className)}
      {...props}
    >
      {children}
      {required ? <span className="ml-0.5 text-red-400">*</span> : null}
    </label>
  )
}

export { Label }
export type { LabelProps }
