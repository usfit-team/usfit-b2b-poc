export type Protocol = 'manual' | 'pollock3' | 'pollock7'
export type Gender = 'male' | 'female'

export interface SkinFolds {
  chest: number
  abdominal: number
  thigh: number
  triceps: number
  subscapular: number
  suprailiac: number
  midaxillary: number
}

export interface BodyCompositionInput {
  protocol: Protocol
  gender: Gender
  age: number
  weight: number
  manualBf?: number
  folds: SkinFolds
}

export interface BodyCompositionResult {
  bodyFatPercentage: number
  fatMass: number
  leanMass: number
  bodyDensity: number
}

export interface PhysicalAssessment {
  id: string
  studentId: string
  date: string
  weight: number
  height: number
  bodyComposition: BodyCompositionResult
  protocol: Protocol
}

export const POLLOCK_PROTOCOLS = {
  pollock3: {
    male: ['chest', 'abdominal', 'thigh'] as const,
    female: ['triceps', 'suprailiac', 'thigh'] as const,
  },
  pollock7: {
    all: ['chest', 'abdominal', 'thigh', 'triceps', 'subscapular', 'suprailiac', 'midaxillary'] as const,
  },
} as const
