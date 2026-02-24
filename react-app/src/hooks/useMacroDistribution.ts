import { useMemo } from 'react'
import type { MacroDistribution, MacroResult } from '@/types/nutrition'

export function useMacroDistribution(
  macros: MacroDistribution,
  weight: number,
  targetVet: number,
): MacroResult {
  return useMemo(() => {
    const proteinGrams = Math.round(macros.proteinPerKg * weight)
    const carbGrams = Math.round(macros.carbPerKg * weight)
    const fatGrams = Math.round(macros.fatPerKg * weight)

    const proteinKcal = proteinGrams * 4
    const carbKcal = carbGrams * 4
    const fatKcal = fatGrams * 9
    const totalKcal = proteinKcal + carbKcal + fatKcal

    const percentage = targetVet > 0 ? Math.min((totalKcal / targetVet) * 100, 100) : 0

    const diff = Math.abs(totalKcal - targetVet)
    let barColor: MacroResult['barColor'] = 'gradient'
    if (diff < 50) {
      barColor = 'green'
    } else if (totalKcal > targetVet) {
      barColor = 'red'
    }

    return {
      proteinGrams,
      carbGrams,
      fatGrams,
      proteinKcal,
      carbKcal,
      fatKcal,
      totalKcal,
      percentage,
      barColor,
    }
  }, [macros, weight, targetVet])
}
