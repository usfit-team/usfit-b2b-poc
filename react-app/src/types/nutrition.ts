export type FormulaType = 'cunningham' | 'tinsley' | 'harris' | 'mifflin'
export type GoalType = 'maintenance' | 'deficit' | 'surplus'
export type ActivityLevel = 1.2 | 1.375 | 1.55 | 1.725 | 1.9

export interface MetabolicCalcParams {
  weight: number
  height: number
  age: number
  bodyFat: number
  formula: FormulaType
  activityLevel: ActivityLevel
  goal: GoalType
  gap: number
}

export interface MetabolicResult {
  lbm: number
  bmr: number
  tdee: number
  vet: number
}

export interface MacroDistribution {
  proteinPerKg: number
  carbPerKg: number
  fatPerKg: number
}

export interface MacroResult {
  proteinGrams: number
  carbGrams: number
  fatGrams: number
  proteinKcal: number
  carbKcal: number
  fatKcal: number
  totalKcal: number
  percentage: number
  barColor: 'green' | 'red' | 'gradient'
}

export interface Food {
  id: string
  name: string
  category: string
  calories: number
  protein: number
  carbs: number
  fat: number
  fiber: number
  portion: string
}

export interface Meal {
  id: string
  name: string
  time: string
  foods: Array<{ food: Food; quantity: number }>
}

export interface Diet {
  id: string
  name: string
  studentName: string
  status: 'active' | 'draft' | 'expired'
  createdAt: string
  vet: number
  meals: Meal[]
}

export interface Supplement {
  id: string
  name: string
  dose: string
  frequency: string
}
