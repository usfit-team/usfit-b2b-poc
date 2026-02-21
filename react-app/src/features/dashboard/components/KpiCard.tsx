import type { ComponentType, SVGProps } from 'react'
import TrendingUp from 'lucide-react/dist/esm/icons/trending-up'
import { cn } from '@/lib/utils'

type LucideIcon = ComponentType<SVGProps<SVGSVGElement> & { size?: number | string }>

interface KpiCardProps {
  title: string
  value: string
  icon: LucideIcon
  color: string
  subtitle: string
  trend?: string
}

const colorMap: Record<string, { bg: string; text: string; glow: string; iconBg: string }> = {
  green: {
    bg: 'bg-green-50',
    text: 'text-green-600',
    glow: 'shadow-green-200/60',
    iconBg: 'bg-gradient-to-br from-green-400 to-emerald-500',
  },
  blue: {
    bg: 'bg-blue-50',
    text: 'text-blue-600',
    glow: 'shadow-blue-200/60',
    iconBg: 'bg-gradient-to-br from-blue-400 to-blue-600',
  },
  purple: {
    bg: 'bg-purple-50',
    text: 'text-purple-600',
    glow: 'shadow-purple-200/60',
    iconBg: 'bg-gradient-to-br from-purple-400 to-purple-600',
  },
  yellow: {
    bg: 'bg-amber-50',
    text: 'text-amber-600',
    glow: 'shadow-amber-200/60',
    iconBg: 'bg-gradient-to-br from-amber-400 to-orange-500',
  },
}

export function KpiCard({ title, value, icon: Icon, color, subtitle, trend }: KpiCardProps) {
  const colors = colorMap[color] ?? {
    bg: 'bg-gray-50',
    text: 'text-gray-600',
    glow: 'shadow-gray-200/60',
    iconBg: 'bg-gray-400',
  }

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:border-gray-200">
      {/* Subtle glow on hover */}
      <div
        className={cn(
          'absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-30',
          colors.iconBg,
        )}
      />

      <div className="relative z-10">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className={cn(
                'flex h-9 w-9 items-center justify-center rounded-xl shadow-sm',
                colors.iconBg,
              )}
            >
              <Icon className="h-4.5 w-4.5 text-white" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
              {title}
            </span>
          </div>
        </div>

        <p className="font-display text-3xl font-bold text-gray-900">{value}</p>

        <div className="mt-2 flex items-center gap-1.5">
          {trend ? (
            <span className={cn('flex items-center gap-0.5 text-xs font-semibold', colors.text)}>
              <TrendingUp className="h-3 w-3" />
              {trend}
            </span>
          ) : null}
          <span className="text-xs text-gray-400">{subtitle}</span>
        </div>
      </div>
    </div>
  )
}

export default KpiCard
