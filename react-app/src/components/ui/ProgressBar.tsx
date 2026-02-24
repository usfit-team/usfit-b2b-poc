import { cn } from '@/lib/utils'

type ProgressColor = 'green' | 'red' | 'gradient'

const colorStyles: Record<ProgressColor, string> = {
  green: 'bg-green-500',
  red: 'bg-red-500',
  gradient: 'bg-usfit-gradient',
}

interface ProgressBarProps {
  value: number
  max?: number
  color?: ProgressColor
  showLabel?: boolean
  label?: string
  size?: 'sm' | 'md'
  className?: string
}

function ProgressBar({
  value,
  max = 100,
  color = 'gradient',
  showLabel = false,
  label,
  size = 'md',
  className,
}: ProgressBarProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100)

  return (
    <div className={cn('w-full', className)}>
      {showLabel || label ? (
        <div className="mb-1.5 flex items-center justify-between text-xs">
          {label ? (
            <span className="font-medium text-gray-600">{label}</span>
          ) : (
            <span />
          )}
          {showLabel ? (
            <span className="font-semibold text-gray-700">
              {Math.round(percentage)}%
            </span>
          ) : null}
        </div>
      ) : null}

      <div
        className={cn(
          'w-full overflow-hidden rounded-full bg-gray-200',
          size === 'sm' ? 'h-1.5' : 'h-2.5',
        )}
      >
        <div
          className={cn(
            'h-full rounded-full transition-all duration-300 ease-out',
            colorStyles[color],
          )}
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
        />
      </div>
    </div>
  )
}

export { ProgressBar }
export type { ProgressBarProps, ProgressColor }
