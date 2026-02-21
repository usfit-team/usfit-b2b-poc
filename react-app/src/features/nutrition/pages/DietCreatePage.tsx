import { useState, useMemo, useCallback } from 'react'
import type { ChangeEvent } from 'react'
import { motion } from 'motion/react'
import Calculator from 'lucide-react/dist/esm/icons/calculator'
import PieChart from 'lucide-react/dist/esm/icons/pie-chart'
import UtensilsCrossed from 'lucide-react/dist/esm/icons/utensils-crossed'
import Pill from 'lucide-react/dist/esm/icons/pill'
import Plus from 'lucide-react/dist/esm/icons/plus'
import Trash2 from 'lucide-react/dist/esm/icons/trash-2'
import Save from 'lucide-react/dist/esm/icons/save'
import type {
  MetabolicCalcParams,
  MacroDistribution,
  FormulaType,
  GoalType,
  ActivityLevel,
  Food,
  Meal,
} from '@/types/nutrition'
import { useMetabolicCalculator } from '@/hooks/useMetabolicCalculator'
import { useMacroDistribution } from '@/hooks/useMacroDistribution'
import { useSupplements } from '@/hooks/useSupplements'
import { ACTIVITY_FACTORS, FORMULA_OPTIONS, GOAL_OPTIONS } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { Card, CardHeader, CardContent } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Slider } from '@/components/ui/Slider'
import { Button } from '@/components/ui/Button'
import { BackButton } from '@/components/shared/BackButton'
import { MacroFooter } from '@/components/shared/MacroFooter'
import { SubstitutionPanel } from '@/components/shared/SubstitutionPanel'

// ── Mock Data ──────────────────────────────────────────────

const MOCK_FOODS: Food[] = [
  { id: '1', name: 'Arroz Branco', category: 'Cereais', calories: 130, protein: 2.7, carbs: 28, fat: 0.3, fiber: 0.4, portion: '100g' },
  { id: '2', name: 'Frango Grelhado', category: 'Proteínas', calories: 165, protein: 31, carbs: 0, fat: 3.6, fiber: 0, portion: '100g' },
  { id: '3', name: 'Batata Doce', category: 'Tubérculos', calories: 86, protein: 1.6, carbs: 20, fat: 0.1, fiber: 3, portion: '100g' },
  { id: '4', name: 'Ovo Inteiro', category: 'Proteínas', calories: 155, protein: 13, carbs: 1.1, fat: 11, fiber: 0, portion: '100g' },
  { id: '5', name: 'Aveia', category: 'Cereais', calories: 389, protein: 16.9, carbs: 66, fat: 6.9, fiber: 10.6, portion: '100g' },
  { id: '6', name: 'Banana', category: 'Frutas', calories: 89, protein: 1.1, carbs: 23, fat: 0.3, fiber: 2.6, portion: '100g' },
  { id: '7', name: 'Feijão Carioca', category: 'Leguminosas', calories: 76, protein: 4.8, carbs: 13.6, fat: 0.5, fiber: 8.5, portion: '100g' },
  { id: '8', name: 'Azeite de Oliva', category: 'Óleos', calories: 884, protein: 0, carbs: 0, fat: 100, fiber: 0, portion: '100ml' },
]

const MOCK_MEALS: Meal[] = [
  {
    id: 'm1',
    name: 'Café da Manhã',
    time: '07:00',
    foods: [
      { food: MOCK_FOODS[4], quantity: 50 },
      { food: MOCK_FOODS[5], quantity: 120 },
      { food: MOCK_FOODS[3], quantity: 100 },
    ],
  },
  {
    id: 'm2',
    name: 'Lanche Manhã',
    time: '10:00',
    foods: [
      { food: MOCK_FOODS[2], quantity: 150 },
      { food: MOCK_FOODS[1], quantity: 100 },
    ],
  },
  {
    id: 'm3',
    name: 'Almoço',
    time: '12:30',
    foods: [
      { food: MOCK_FOODS[0], quantity: 150 },
      { food: MOCK_FOODS[6], quantity: 100 },
      { food: MOCK_FOODS[1], quantity: 150 },
      { food: MOCK_FOODS[7], quantity: 10 },
    ],
  },
  {
    id: 'm4',
    name: 'Lanche Tarde',
    time: '16:00',
    foods: [
      { food: MOCK_FOODS[2], quantity: 200 },
      { food: MOCK_FOODS[1], quantity: 120 },
    ],
  },
  {
    id: 'm5',
    name: 'Jantar',
    time: '19:30',
    foods: [
      { food: MOCK_FOODS[0], quantity: 100 },
      { food: MOCK_FOODS[1], quantity: 150 },
      { food: MOCK_FOODS[7], quantity: 10 },
    ],
  },
]

const SUBSTITUTION_ITEMS = [
  { name: 'Peito de Peru', portion: '100g', calories: 104 },
  { name: 'Tilápia Grelhada', portion: '120g', calories: 128 },
  { name: 'Patinho Moído', portion: '100g', calories: 137 },
]

// ── Component ──────────────────────────────────────────────

export default function DietCreatePage() {
  // ── Metabolic Calc State ─────────────────────────────────
  const [params, setParams] = useState<MetabolicCalcParams>({
    weight: 80,
    height: 175,
    age: 30,
    bodyFat: 15,
    formula: 'cunningham',
    activityLevel: 1.55,
    goal: 'maintenance',
    gap: 0,
  })

  // ── Macro Distribution State ─────────────────────────────
  const [macros, setMacros] = useState<MacroDistribution>({
    proteinPerKg: 2.0,
    carbPerKg: 4.0,
    fatPerKg: 0.8,
  })

  // ── Meals State ──────────────────────────────────────────
  const [meals, setMeals] = useState<Meal[]>(MOCK_MEALS)

  // ── Supplement State ─────────────────────────────────────
  const { supplements, addSupplement, removeSupplement } = useSupplements()
  const [suppName, setSuppName] = useState('')
  const [suppDose, setSuppDose] = useState('')
  const [suppFreq, setSuppFreq] = useState('')

  // ── Derived Calculations (no useEffect!) ─────────────────
  const metabolicResult = useMetabolicCalculator(params)
  const macroResult = useMacroDistribution(macros, params.weight, metabolicResult.vet)

  // ── Helpers ──────────────────────────────────────────────
  const updateParam = useCallback(
    <K extends keyof MetabolicCalcParams>(key: K, value: MetabolicCalcParams[K]) => {
      setParams((prev) => ({ ...prev, [key]: value }))
    },
    [],
  )

  const handleNumberParam = useCallback(
    (key: keyof MetabolicCalcParams) => (e: ChangeEvent<HTMLInputElement>) => {
      updateParam(key, Number(e.target.value))
    },
    [updateParam],
  )

  const gapPrefix = useMemo(() => {
    if (params.goal === 'surplus') return '+'
    if (params.goal === 'deficit') return '-'
    return ''
  }, [params.goal])

  const gapColor = useMemo(() => {
    if (params.goal === 'surplus') return 'text-green-600'
    if (params.goal === 'deficit') return 'text-red-600'
    return 'text-gray-600'
  }, [params.goal])

  const mealTotals = useMemo(() => {
    return meals.map((meal) => {
      const totals = meal.foods.reduce(
        (acc, { food, quantity }) => {
          const factor = quantity / 100
          return {
            calories: acc.calories + food.calories * factor,
            protein: acc.protein + food.protein * factor,
            carbs: acc.carbs + food.carbs * factor,
            fat: acc.fat + food.fat * factor,
          }
        },
        { calories: 0, protein: 0, carbs: 0, fat: 0 },
      )
      return { ...meal, totals }
    })
  }, [meals])

  const handleAddMeal = useCallback(() => {
    const newMeal: Meal = {
      id: crypto.randomUUID(),
      name: `Refeição ${meals.length + 1}`,
      time: '00:00',
      foods: [],
    }
    setMeals((prev) => [...prev, newMeal])
  }, [meals.length])

  const handleAddSupplement = useCallback(() => {
    addSupplement(suppName, suppDose, suppFreq)
    setSuppName('')
    setSuppDose('')
    setSuppFreq('')
  }, [addSupplement, suppName, suppDose, suppFreq])

  // ── Render ───────────────────────────────────────────────
  return (
    <div className="pb-24 space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <BackButton label="Voltar para Dietas" />
          <h1 className="mt-2 font-display text-2xl font-bold text-gray-900">
            Criar Plano Alimentar
          </h1>
          <p className="text-sm text-gray-500">
            Configure o plano nutricional completo do aluno
          </p>
        </div>
        <Button iconLeft={<Save className="h-4 w-4" />}>
          Salvar Plano
        </Button>
      </div>

      {/* ── Section 1: Calculadora Metabólica ─────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card>
          <CardHeader
            title="Calculadora Metabólica"
            action={<Calculator className="h-5 w-5 text-usfit-cyan" />}
          />
          <CardContent>
            {/* Patient Info Fields */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <Input
                label="Peso (kg)"
                type="number"
                value={params.weight}
                onChange={handleNumberParam('weight')}
                variant="active"
              />
              <Input
                label="Altura (cm)"
                type="number"
                value={params.height}
                onChange={handleNumberParam('height')}
                variant="active"
              />
              <Input
                label="Idade"
                type="number"
                value={params.age}
                onChange={handleNumberParam('age')}
                variant="active"
              />
              <Input
                label="% Gordura (BF)"
                type="number"
                value={params.bodyFat}
                onChange={handleNumberParam('bodyFat')}
                variant="active"
              />
            </div>

            {/* Formula, Activity, Goal */}
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <Select
                label="Fórmula"
                options={FORMULA_OPTIONS.map((f) => ({
                  label: `${f.label} - ${f.description}`,
                  value: f.value,
                }))}
                value={params.formula}
                onChange={(e) => updateParam('formula', e.target.value as FormulaType)}
              />
              <Select
                label="Nível de Atividade"
                options={ACTIVITY_FACTORS.map((a) => ({
                  label: a.label,
                  value: String(a.value),
                }))}
                value={String(params.activityLevel)}
                onChange={(e) => updateParam('activityLevel', Number(e.target.value) as ActivityLevel)}
              />
              <Select
                label="Objetivo"
                options={GOAL_OPTIONS.map((g) => ({
                  label: g.label,
                  value: g.value,
                }))}
                value={params.goal}
                onChange={(e) => updateParam('goal', e.target.value as GoalType)}
              />
            </div>

            {/* Gap Input */}
            {params.goal !== 'maintenance' ? (
              <div className="mt-4 max-w-xs">
                <div className="flex items-center gap-2">
                  <span className={cn('text-lg font-bold', gapColor)}>
                    {gapPrefix}
                  </span>
                  <Input
                    label="Gap Calórico (kcal)"
                    type="number"
                    value={params.gap}
                    onChange={handleNumberParam('gap')}
                    className={cn(
                      params.goal === 'surplus'
                        ? 'border-green-400 bg-green-50'
                        : 'border-red-400 bg-red-50',
                    )}
                  />
                </div>
              </div>
            ) : null}

            {/* Results */}
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div className="rounded-xl bg-gray-50 p-4 text-center">
                <p className="text-xs font-medium text-gray-500">LBM</p>
                <p className="mt-1 text-xl font-bold text-gray-900">
                  {metabolicResult.lbm} <span className="text-sm font-normal text-gray-500">kg</span>
                </p>
              </div>
              <div className="rounded-xl bg-gray-50 p-4 text-center">
                <p className="text-xs font-medium text-gray-500">TMB</p>
                <p className="mt-1 text-xl font-bold text-gray-900">
                  {metabolicResult.bmr} <span className="text-sm font-normal text-gray-500">kcal</span>
                </p>
              </div>
              <div className="rounded-xl bg-gray-50 p-4 text-center">
                <p className="text-xs font-medium text-gray-500">GET</p>
                <p className="mt-1 text-xl font-bold text-gray-900">
                  {metabolicResult.tdee} <span className="text-sm font-normal text-gray-500">kcal</span>
                </p>
              </div>
              <div className="rounded-xl bg-cyan-50 border border-cyan-200 p-4 text-center">
                <p className="text-xs font-medium text-usfit-cyan">VET Final</p>
                <p className="mt-1 text-xl font-bold text-usfit-blue">
                  {metabolicResult.vet} <span className="text-sm font-normal text-usfit-cyan">kcal</span>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* ── Section 2: Distribuição de Macros ─────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <Card>
          <CardHeader
            title="Distribuição de Macros"
            action={<PieChart className="h-5 w-5 text-usfit-cyan" />}
          />
          <CardContent>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
              {/* Protein Slider */}
              <div>
                <Slider
                  label="Proteína (g/kg)"
                  value={macros.proteinPerKg}
                  min={0.5}
                  max={4.0}
                  step={0.1}
                  unit=" g/kg"
                  onChange={(v) => setMacros((prev) => ({ ...prev, proteinPerKg: v }))}
                />
                <div className="mt-2 flex justify-between text-xs text-gray-500">
                  <span>Total: {macroResult.proteinGrams}g</span>
                  <span>{macroResult.proteinKcal} kcal</span>
                </div>
              </div>

              {/* Carb Slider */}
              <div>
                <Slider
                  label="Carboidrato (g/kg)"
                  value={macros.carbPerKg}
                  min={0.5}
                  max={8.0}
                  step={0.1}
                  unit=" g/kg"
                  onChange={(v) => setMacros((prev) => ({ ...prev, carbPerKg: v }))}
                />
                <div className="mt-2 flex justify-between text-xs text-gray-500">
                  <span>Total: {macroResult.carbGrams}g</span>
                  <span>{macroResult.carbKcal} kcal</span>
                </div>
              </div>

              {/* Fat Slider */}
              <div>
                <Slider
                  label="Gordura (g/kg)"
                  value={macros.fatPerKg}
                  min={0.3}
                  max={2.5}
                  step={0.1}
                  unit=" g/kg"
                  onChange={(v) => setMacros((prev) => ({ ...prev, fatPerKg: v }))}
                />
                <div className="mt-2 flex justify-between text-xs text-gray-500">
                  <span>Total: {macroResult.fatGrams}g</span>
                  <span>{macroResult.fatKcal} kcal</span>
                </div>
              </div>
            </div>

            {/* Macro Summary */}
            <div className="mt-6 flex items-center justify-center gap-8 rounded-xl bg-gray-50 p-4">
              <div className="text-center">
                <p className="text-xs text-gray-500">Total Macros</p>
                <p className="text-lg font-bold text-gray-900">{macroResult.totalKcal} kcal</p>
              </div>
              <div className="h-8 w-px bg-gray-200" />
              <div className="text-center">
                <p className="text-xs text-gray-500">VET Alvo</p>
                <p className="text-lg font-bold text-usfit-blue">{metabolicResult.vet} kcal</p>
              </div>
              <div className="h-8 w-px bg-gray-200" />
              <div className="text-center">
                <p className="text-xs text-gray-500">Diferença</p>
                <p
                  className={cn(
                    'text-lg font-bold',
                    Math.abs(macroResult.totalKcal - metabolicResult.vet) < 50
                      ? 'text-green-600'
                      : macroResult.totalKcal > metabolicResult.vet
                        ? 'text-red-600'
                        : 'text-yellow-600',
                  )}
                >
                  {macroResult.totalKcal - metabolicResult.vet > 0 ? '+' : ''}
                  {macroResult.totalKcal - metabolicResult.vet} kcal
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* ── Section 3: Montagem das Refeições ─────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <Card>
          <CardHeader
            title="Montagem das Refeições"
            action={
              <Button
                variant="secondary"
                size="sm"
                iconLeft={<Plus className="h-4 w-4" />}
                onClick={handleAddMeal}
              >
                Adicionar Refeição
              </Button>
            }
          />
          <CardContent className="space-y-6">
            {mealTotals.map((meal) => (
              <div
                key={meal.id}
                className="rounded-xl border border-gray-100 bg-gray-50/50 p-4"
              >
                {/* Meal Header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <UtensilsCrossed className="h-4 w-4 text-usfit-cyan" />
                    <h4 className="text-sm font-semibold text-gray-900">
                      {meal.name}
                    </h4>
                    <span className="text-xs text-gray-400">{meal.time}</span>
                  </div>
                  <span className="text-xs font-medium text-gray-500">
                    {Math.round(meal.totals.calories)} kcal
                  </span>
                </div>

                {/* Food Items */}
                <div className="space-y-2">
                  {meal.foods.map(({ food, quantity }, foodIdx) => (
                    <div
                      key={`${meal.id}-${food.id}-${foodIdx}`}
                      className="flex items-center justify-between rounded-lg bg-white p-3 shadow-sm"
                    >
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-800">
                          {food.name}
                        </p>
                        <p className="text-xs text-gray-400">
                          {quantity}g | P: {Math.round(food.protein * quantity / 100)}g
                          {' '}C: {Math.round(food.carbs * quantity / 100)}g
                          {' '}G: {Math.round(food.fat * quantity / 100)}g
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-semibold text-gray-700">
                          {Math.round(food.calories * quantity / 100)} kcal
                        </span>
                        <SubstitutionPanel
                          items={SUBSTITUTION_ITEMS}
                          count={SUBSTITUTION_ITEMS.length}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Meal Totals */}
                <div className="mt-3 flex items-center gap-4 text-xs text-gray-500 border-t border-gray-200 pt-2">
                  <span>
                    P: <strong className="text-gray-700">{Math.round(meal.totals.protein)}g</strong>
                  </span>
                  <span>
                    C: <strong className="text-gray-700">{Math.round(meal.totals.carbs)}g</strong>
                  </span>
                  <span>
                    G: <strong className="text-gray-700">{Math.round(meal.totals.fat)}g</strong>
                  </span>
                  <span className="ml-auto font-semibold text-gray-700">
                    {Math.round(meal.totals.calories)} kcal
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </motion.div>

      {/* ── Section 4: Suplementação ──────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        <Card>
          <CardHeader
            title="Suplementação"
            action={<Pill className="h-5 w-5 text-usfit-cyan" />}
          />
          <CardContent>
            {/* Add Supplement Form */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
              <Input
                label="Nome"
                placeholder="Ex: Whey Protein"
                value={suppName}
                onChange={(e) => setSuppName(e.target.value)}
              />
              <Input
                label="Dose"
                placeholder="Ex: 30g"
                value={suppDose}
                onChange={(e) => setSuppDose(e.target.value)}
              />
              <Input
                label="Frequência"
                placeholder="Ex: Pós-treino"
                value={suppFreq}
                onChange={(e) => setSuppFreq(e.target.value)}
              />
              <div className="flex items-end">
                <Button
                  variant="secondary"
                  iconLeft={<Plus className="h-4 w-4" />}
                  onClick={handleAddSupplement}
                  disabled={!suppName}
                >
                  Adicionar
                </Button>
              </div>
            </div>

            {/* Supplements List */}
            {supplements.length > 0 ? (
              <div className="mt-6 space-y-2">
                {supplements.map((supp) => (
                  <div
                    key={supp.id}
                    className="flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50 p-3"
                  >
                    <div>
                      <p className="text-sm font-medium text-gray-800">
                        {supp.name}
                      </p>
                      <p className="text-xs text-gray-400">
                        {supp.dose} - {supp.frequency}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeSupplement(supp.id)}
                      className="rounded-full p-1.5 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-4 text-center text-sm text-gray-400">
                Nenhum suplemento adicionado
              </p>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* ── Sticky Footer ─────────────────────────────────── */}
      <MacroFooter macros={macroResult} targetVet={metabolicResult.vet} />
    </div>
  )
}
