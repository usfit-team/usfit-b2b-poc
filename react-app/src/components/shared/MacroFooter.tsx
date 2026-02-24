import type { MacroResult } from '@/types/nutrition'
import { cn } from '@/lib/utils'

interface MacroFooterProps {
  macros: MacroResult
  targetVet: number
}

const BAR_COLOR_MAP = {
  green: 'bg-green-500',
  red: 'bg-red-500',
  gradient: 'bg-usfit-gradient',
} as const

export function MacroFooter({ macros, targetVet }: MacroFooterProps) {
  return (
    <div className="macro-footer fixed bottom-0 left-64 right-0 bg-white border-t border-gray-200 px-8 py-4 z-30">
      <div className="flex items-center justify-between gap-8">
        <div className="flex items-center gap-6">
          <div className="text-center">
            <p className="text-xs text-gray-500">Proteína</p>
            <p className="text-sm font-bold text-gray-900">{macros.proteinGrams}g</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-500">Carboidrato</p>
            <p className="text-sm font-bold text-gray-900">{macros.carbGrams}g</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-500">Gordura</p>
            <p className="text-sm font-bold text-gray-900">{macros.fatGrams}g</p>
          </div>
        </div>

        <div className="flex-1 max-w-md">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>Progresso VET</span>
            <span>{macros.totalKcal} / {targetVet} kcal</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={cn('h-2 rounded-full transition-all duration-300', BAR_COLOR_MAP[macros.barColor])}
              style={{ width: `${macros.percentage}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
