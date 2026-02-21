import { useState, useMemo } from 'react'
import { motion } from 'motion/react'
import Save from 'lucide-react/dist/esm/icons/save'
import ClipboardList from 'lucide-react/dist/esm/icons/clipboard-list'
import UserCheck from 'lucide-react/dist/esm/icons/user-check'
import AlertTriangle from 'lucide-react/dist/esm/icons/alert-triangle'
import Heart from 'lucide-react/dist/esm/icons/heart'
import Check from 'lucide-react/dist/esm/icons/check'
import { cn } from '@/lib/utils'
import { Card, CardHeader, CardContent } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { BackButton } from '@/components/shared/BackButton'

// ── Mock Data ──────────────────────────────────────────────

const MOCK_STUDENTS = [
  { id: 's1', name: 'Carlos Almeida' },
  { id: 's2', name: 'Ana Paula Souza' },
  { id: 's3', name: 'Roberto Lima' },
  { id: 's4', name: 'Fernanda Costa' },
  { id: 's5', name: 'Marcos Oliveira' },
]

const MEAL_FREQUENCY_OPTIONS = [
  { label: '2-3 refeicoes/dia', value: '2-3' },
  { label: '4-5 refeicoes/dia', value: '4-5' },
  { label: '6+ refeicoes/dia', value: '6+' },
]

const WATER_INTAKE_OPTIONS = [
  { label: 'Menos de 1L', value: '<1' },
  { label: '1-2L', value: '1-2' },
  { label: '2-3L', value: '2-3' },
  { label: 'Mais de 3L', value: '3+' },
]

const COMMON_ALLERGIES = [
  'Gluten',
  'Lactose',
  'Ovo',
  'Amendoim',
  'Soja',
  'Frutos do Mar',
  'Nozes',
  'Trigo',
]

const COMMON_RESTRICTIONS = [
  'Vegetariano',
  'Vegano',
  'Sem Gluten',
  'Sem Lactose',
  'Low Carb',
  'Kosher',
  'Halal',
]

// ── Component ──────────────────────────────────────────────

export default function NutritionAssessmentPage() {
  const [selectedStudentId, setSelectedStudentId] = useState('')
  const [mealFrequency, setMealFrequency] = useState('')
  const [waterIntake, setWaterIntake] = useState('')
  const [breakfastHabit, setBreakfastHabit] = useState('')
  const [cookingFrequency, setCookingFrequency] = useState('')
  const [eatingOutFrequency, setEatingOutFrequency] = useState('')
  const [supplementsUsed, setSupplementsUsed] = useState('')
  const [selectedAllergies, setSelectedAllergies] = useState<string[]>([])
  const [otherAllergy, setOtherAllergy] = useState('')
  const [selectedRestrictions, setSelectedRestrictions] = useState<string[]>([])
  const [foodPreferences, setFoodPreferences] = useState('')
  const [foodDislikes, setFoodDislikes] = useState('')
  const [goals, setGoals] = useState('')
  const [observations, setObservations] = useState('')

  const toggleAllergy = (allergy: string) => {
    setSelectedAllergies((prev) =>
      prev.includes(allergy) ? prev.filter((a) => a !== allergy) : [...prev, allergy],
    )
  }

  const toggleRestriction = (restriction: string) => {
    setSelectedRestrictions((prev) =>
      prev.includes(restriction) ? prev.filter((r) => r !== restriction) : [...prev, restriction],
    )
  }

  const selectedStudent = useMemo(() => {
    return MOCK_STUDENTS.find((s) => s.id === selectedStudentId)
  }, [selectedStudentId])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <BackButton label="Voltar" />
          <h1 className="mt-2 font-display text-2xl font-bold text-gray-900">
            Avaliacao Nutricional
          </h1>
          <p className="text-sm text-gray-500">
            Registre as informacoes alimentares do paciente
          </p>
        </div>
        <Button
          iconLeft={<Save className="h-4 w-4" />}
          disabled={!selectedStudentId}
        >
          Salvar Avaliacao
        </Button>
      </div>

      {/* Patient Selection */}
      <Card>
        <CardHeader
          title="Paciente"
          action={<UserCheck className="h-5 w-5 text-usfit-cyan" />}
        />
        <CardContent>
          <div className="max-w-sm">
            <Select
              label="Selecione o Aluno"
              placeholder="Escolha um aluno"
              options={MOCK_STUDENTS.map((s) => ({
                label: s.name,
                value: s.id,
              }))}
              value={selectedStudentId}
              onChange={(e) => setSelectedStudentId(e.target.value)}
            />
          </div>
          {selectedStudent ? (
            <div className="mt-3">
              <Badge variant="success">
                {selectedStudent.name}
              </Badge>
            </div>
          ) : null}
        </CardContent>
      </Card>

      {/* Dietary Habits */}
      <Card>
        <CardHeader
          title="Habitos Alimentares"
          action={<ClipboardList className="h-5 w-5 text-usfit-cyan" />}
        />
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Select
              label="Frequencia de Refeicoes"
              placeholder="Selecione"
              options={MEAL_FREQUENCY_OPTIONS}
              value={mealFrequency}
              onChange={(e) => setMealFrequency(e.target.value)}
            />
            <Select
              label="Consumo de Agua"
              placeholder="Selecione"
              options={WATER_INTAKE_OPTIONS}
              value={waterIntake}
              onChange={(e) => setWaterIntake(e.target.value)}
            />
            <Select
              label="Cafe da Manha"
              placeholder="Selecione"
              options={[
                { label: 'Sempre toma', value: 'always' },
                { label: 'As vezes', value: 'sometimes' },
                { label: 'Raramente/Nunca', value: 'rarely' },
              ]}
              value={breakfastHabit}
              onChange={(e) => setBreakfastHabit(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Select
              label="Frequencia que Cozinha"
              placeholder="Selecione"
              options={[
                { label: 'Todos os dias', value: 'daily' },
                { label: 'Algumas vezes por semana', value: 'weekly' },
                { label: 'Raramente', value: 'rarely' },
                { label: 'Nunca', value: 'never' },
              ]}
              value={cookingFrequency}
              onChange={(e) => setCookingFrequency(e.target.value)}
            />
            <Select
              label="Come Fora de Casa"
              placeholder="Selecione"
              options={[
                { label: 'Raramente', value: 'rarely' },
                { label: '1-2x por semana', value: '1-2' },
                { label: '3-5x por semana', value: '3-5' },
                { label: 'Todos os dias', value: 'daily' },
              ]}
              value={eatingOutFrequency}
              onChange={(e) => setEatingOutFrequency(e.target.value)}
            />
            <Input
              label="Suplementos em Uso"
              placeholder="Ex: Whey, Creatina, Multivitaminico"
              value={supplementsUsed}
              onChange={(e) => setSupplementsUsed(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Allergies & Restrictions */}
      <Card>
        <CardHeader
          title="Alergias e Restricoes"
          action={<AlertTriangle className="h-5 w-5 text-yellow-500" />}
        />
        <CardContent className="space-y-6">
          {/* Allergies */}
          <div>
            <p className="text-sm font-medium text-gray-600 mb-3">
              Alergias Alimentares
            </p>
            <div className="flex flex-wrap gap-2">
              {COMMON_ALLERGIES.map((allergy) => (
                <button
                  key={allergy}
                  type="button"
                  onClick={() => toggleAllergy(allergy)}
                  className={cn(
                    'inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all',
                    'cursor-pointer',
                    selectedAllergies.includes(allergy)
                      ? 'bg-red-100 text-red-700 ring-1 ring-red-300'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
                  )}
                >
                  {selectedAllergies.includes(allergy) ? (
                    <Check className="h-3 w-3" />
                  ) : null}
                  {allergy}
                </button>
              ))}
            </div>
            <div className="mt-3 max-w-sm">
              <Input
                placeholder="Outra alergia..."
                value={otherAllergy}
                onChange={(e) => setOtherAllergy(e.target.value)}
              />
            </div>
          </div>

          {/* Restrictions */}
          <div>
            <p className="text-sm font-medium text-gray-600 mb-3">
              Restricoes Alimentares
            </p>
            <div className="flex flex-wrap gap-2">
              {COMMON_RESTRICTIONS.map((restriction) => (
                <button
                  key={restriction}
                  type="button"
                  onClick={() => toggleRestriction(restriction)}
                  className={cn(
                    'inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all',
                    'cursor-pointer',
                    selectedRestrictions.includes(restriction)
                      ? 'bg-blue-100 text-blue-700 ring-1 ring-blue-300'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
                  )}
                >
                  {selectedRestrictions.includes(restriction) ? (
                    <Check className="h-3 w-3" />
                  ) : null}
                  {restriction}
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Preferences */}
      <Card>
        <CardHeader
          title="Preferencias"
          action={<Heart className="h-5 w-5 text-pink-500" />}
        />
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-600">
                Alimentos Preferidos
              </label>
              <textarea
                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-900 outline-none transition-all duration-200 focus:border-usfit-cyan focus:ring-2 focus:ring-usfit-cyan/20"
                rows={3}
                placeholder="Liste os alimentos que o paciente mais gosta..."
                value={foodPreferences}
                onChange={(e) => setFoodPreferences(e.target.value)}
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-600">
                Alimentos que Nao Gosta
              </label>
              <textarea
                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-900 outline-none transition-all duration-200 focus:border-usfit-cyan focus:ring-2 focus:ring-usfit-cyan/20"
                rows={3}
                placeholder="Liste os alimentos que o paciente nao gosta..."
                value={foodDislikes}
                onChange={(e) => setFoodDislikes(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-600">
              Objetivos Nutricionais
            </label>
            <textarea
              className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-900 outline-none transition-all duration-200 focus:border-usfit-cyan focus:ring-2 focus:ring-usfit-cyan/20"
              rows={3}
              placeholder="Descreva os objetivos nutricionais do paciente..."
              value={goals}
              onChange={(e) => setGoals(e.target.value)}
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-600">
              Observacoes Gerais
            </label>
            <textarea
              className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-900 outline-none transition-all duration-200 focus:border-usfit-cyan focus:ring-2 focus:ring-usfit-cyan/20"
              rows={3}
              placeholder="Informacoes adicionais relevantes..."
              value={observations}
              onChange={(e) => setObservations(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Save Action */}
      <div className="flex justify-end">
        <Button
          iconLeft={<Save className="h-4 w-4" />}
          disabled={!selectedStudentId}
        >
          Salvar Avaliacao
        </Button>
      </div>
    </motion.div>
  )
}
