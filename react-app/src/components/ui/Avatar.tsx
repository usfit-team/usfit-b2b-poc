import { cn } from '@/lib/utils'
import { getInitials } from '@/lib/utils'

type AvatarSize = 'sm' | 'md' | 'lg' | 'xl'
type StatusIndicator = 'online' | 'offline' | 'busy' | 'away'

const sizeStyles: Record<AvatarSize, string> = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-12 w-12 text-base',
  xl: 'h-16 w-16 text-lg',
}

const statusDotSize: Record<AvatarSize, string> = {
  sm: 'h-2 w-2',
  md: 'h-2.5 w-2.5',
  lg: 'h-3 w-3',
  xl: 'h-3.5 w-3.5',
}

const statusColors: Record<StatusIndicator, string> = {
  online: 'bg-green-500',
  offline: 'bg-gray-400',
  busy: 'bg-red-500',
  away: 'bg-yellow-500',
}

interface AvatarProps {
  src?: string | null
  name: string
  size?: AvatarSize
  status?: StatusIndicator
  className?: string
}

function Avatar({
  src,
  name,
  size = 'md',
  status,
  className,
}: AvatarProps) {
  const initials = getInitials(name)

  return (
    <div className={cn('relative inline-flex shrink-0', className)}>
      {src ? (
        <img
          src={src}
          alt={name}
          className={cn(
            'rounded-full border-2 border-white object-cover shadow-sm',
            sizeStyles[size],
          )}
        />
      ) : (
        <div
          className={cn(
            'inline-flex items-center justify-center rounded-full border-2 border-white',
            'bg-usfit-gradient font-semibold text-white shadow-sm',
            sizeStyles[size],
          )}
          aria-label={name}
        >
          {initials}
        </div>
      )}

      {status ? (
        <span
          className={cn(
            'absolute bottom-0 right-0 rounded-full ring-2 ring-white',
            statusDotSize[size],
            statusColors[status],
          )}
        />
      ) : null}
    </div>
  )
}

export { Avatar }
export type { AvatarProps, AvatarSize, StatusIndicator }
