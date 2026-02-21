import { useMemo } from 'react'
import type { BodyCompositionInput, BodyCompositionResult } from '@/types/assessment'

function calculatePollock3Male(chest: number, abdominal: number, thigh: number, age: number): number {
  const sum = chest + abdominal + thigh
  if (sum <= 0) return 0
  return 1.10938 - 0.0008267 * sum + 0.0000016 * sum * sum - 0.0002574 * age
}

function calculatePollock3Female(triceps: number, suprailiac: number, thigh: number, age: number): number {
  const sum = triceps + suprailiac + thigh
  if (sum <= 0) return 0
  return 1.0994921 - 0.0009929 * sum + 0.0000023 * sum * sum - 0.0001392 * age
}

function calculatePollock7Male(sum: number, age: number): number {
  if (sum <= 0) return 0
  return 1.112 - 0.00043499 * sum + 0.00000055 * sum * sum - 0.00028826 * age
}

function calculatePollock7Female(sum: number, age: number): number {
  if (sum <= 0) return 0
  return 1.097 - 0.00046971 * sum + 0.00000056 * sum * sum - 0.00012828 * age
}

function siriEquation(bodyDensity: number): number {
  if (bodyDensity <= 0) return 0
  return (495 / bodyDensity) - 450
}

export function useBodyComposition(input: BodyCompositionInput): BodyCompositionResult {
  return useMemo(() => {
    let bf = 0
    let bodyDensity = 0

    if (input.protocol === 'manual') {
      bf = input.manualBf ?? 0
    } else {
      const { folds, gender, age } = input

      if (input.protocol === 'pollock3') {
        bodyDensity = gender === 'male'
          ? calculatePollock3Male(folds.chest, folds.abdominal, folds.thigh, age)
          : calculatePollock3Female(folds.triceps, folds.suprailiac, folds.thigh, age)
      } else {
        const sum = folds.chest + folds.abdominal + folds.thigh + folds.triceps +
          folds.subscapular + folds.suprailiac + folds.midaxillary

        bodyDensity = gender === 'male'
          ? calculatePollock7Male(sum, age)
          : calculatePollock7Female(sum, age)
      }

      if (bodyDensity > 0) {
        bf = siriEquation(bodyDensity)
      }
    }

    if (bf < 0) bf = 0
    if (bf > 60) bf = 60

    const fatMass = input.weight * (bf / 100)
    const leanMass = input.weight - fatMass

    return {
      bodyFatPercentage: Math.round(bf * 10) / 10,
      fatMass: Math.round(fatMass * 10) / 10,
      leanMass: Math.round(leanMass * 10) / 10,
      bodyDensity: Math.round(bodyDensity * 10000) / 10000,
    }
  }, [input])
}
