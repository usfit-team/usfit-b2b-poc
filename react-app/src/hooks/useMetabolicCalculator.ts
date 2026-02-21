import { useMemo } from 'react'
import type { MetabolicCalcParams, MetabolicResult } from '@/types/nutrition'

function calculateBMR(params: MetabolicCalcParams, lbm: number): number {
  switch (params.formula) {
    case 'cunningham':
      return 500 + 22 * lbm
    case 'tinsley':
      return 25.9 * lbm + 284
    case 'harris':
      return 66.5 + 13.75 * params.weight + 5.003 * params.height - 6.75 * params.age
    case 'mifflin':
      return 10 * params.weight + 6.25 * params.height - 5 * params.age + 5
  }
}

function calculateVET(tdee: number, goal: MetabolicCalcParams['goal'], gap: number): number {
  if (goal === 'deficit') return tdee - gap
  if (goal === 'surplus') return tdee + gap
  return tdee
}

export function useMetabolicCalculator(params: MetabolicCalcParams): MetabolicResult {
  return useMemo(() => {
    const lbm = params.weight * (1 - params.bodyFat / 100)
    const bmr = calculateBMR(params, lbm)
    const tdee = bmr * params.activityLevel
    const vet = calculateVET(tdee, params.goal, params.gap)

    return {
      lbm: Math.round(lbm * 10) / 10,
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      vet: Math.round(vet),
    }
  }, [params])
}
