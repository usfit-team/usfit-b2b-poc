import { useState } from 'react'
import { motion } from 'motion/react'
import ChevronRight from 'lucide-react/dist/esm/icons/chevron-right'
import ChevronLeft from 'lucide-react/dist/esm/icons/chevron-left'
import Send from 'lucide-react/dist/esm/icons/send'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { ProgressBar } from '@/components/ui/ProgressBar'

// ---------------------------------------------------------------------------
// Section config
// ---------------------------------------------------------------------------

const sections = [
  'Rotina & Sono',
  'Preferências Alimentares',
  'Histórico Médico',
  'Experiência com Exercício',
  'Objetivos',
]

const stressOptions = [
  { label: 'Baixo', value: 'low' },
  { label: 'Moderado', value: 'moderate' },
  { label: 'Alto', value: 'high' },
  { label: 'Muito Alto', value: 'very_high' },
]

const frequencyOptions = [
  { label: 'Sedentário (nunca)', value: 'sedentary' },
  { label: '1-2 vezes por semana', value: '1-2' },
  { label: '3-4 vezes por semana', value: '3-4' },
  { label: '5+ vezes por semana', value: '5+' },
]

const exerciseTypeOptions = [
  { label: 'Musculação', value: 'strength' },
  { label: 'Corrida / Cardio', value: 'cardio' },
  { label: 'Funcional', value: 'functional' },
  { label: 'Esportes', value: 'sports' },
  { label: 'Yoga / Pilates', value: 'yoga' },
]

const goalOptions = [
  { label: 'Emagrecimento', value: 'weight_loss' },
  { label: 'Hipertrofia', value: 'hypertrophy' },
  { label: 'Condicionamento Físico', value: 'conditioning' },
  { label: 'Qualidade de Vida', value: 'wellness' },
  { label: 'Performance Esportiva', value: 'performance' },
]

const timelineOptions = [
  { label: '1-3 meses', value: '1-3' },
  { label: '3-6 meses', value: '3-6' },
  { label: '6-12 meses', value: '6-12' },
  { label: 'Longo prazo (12+ meses)', value: '12+' },
]

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

function AnamnasisPage() {
  const [currentSection, setCurrentSection] = useState(0)

  // Section 1 - Rotina & Sono
  const [wakeTime, setWakeTime] = useState('')
  const [sleepTime, setSleepTime] = useState('')
  const [workHours, setWorkHours] = useState('')
  const [stressLevel, setStressLevel] = useState('')

  // Section 2 - Preferências Alimentares
  const [restrictions, setRestrictions] = useState('')
  const [allergies, setAllergies] = useState('')
  const [favorites, setFavorites] = useState('')
  const [intolerances, setIntolerances] = useState('')

  // Section 3 - Histórico Médico
  const [conditions, setConditions] = useState('')
  const [medications, setMedications] = useState('')
  const [surgeries, setSurgeries] = useState('')

  // Section 4 - Experiência com Exercício
  const [frequency, setFrequency] = useState('')
  const [exerciseTypes, setExerciseTypes] = useState('')
  const [limitations, setLimitations] = useState('')

  // Section 5 - Objetivos
  const [primaryGoal, setPrimaryGoal] = useState('')
  const [timeline, setTimeline] = useState('')

  const progress = ((currentSection + 1) / sections.length) * 100

  const handleNext = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1)
    }
  }

  const handlePrev = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1)
    }
  }

  const handleSubmit = () => {
    // Submit logic
  }

  const renderSection = () => {
    switch (currentSection) {
      case 0:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Input
                label="Horário que Acorda"
                type="time"
                value={wakeTime}
                onChange={(e) => setWakeTime(e.target.value)}
              />
              <Input
                label="Horário que Dorme"
                type="time"
                value={sleepTime}
                onChange={(e) => setSleepTime(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Input
                label="Horas de Trabalho por Dia"
                type="number"
                placeholder="Ex: 8"
                value={workHours}
                onChange={(e) => setWorkHours(e.target.value)}
              />
              <Select
                label="Nível de Estresse"
                placeholder="Selecione"
                options={stressOptions}
                value={stressLevel}
                onChange={(e) => setStressLevel(e.target.value)}
              />
            </div>
          </div>
        )

      case 1:
        return (
          <div className="space-y-4">
            <Input
              label="Restrições Alimentares"
              placeholder="Ex: Vegetariano, vegano, sem glúten..."
              value={restrictions}
              onChange={(e) => setRestrictions(e.target.value)}
            />
            <Input
              label="Alergias"
              placeholder="Ex: Amendoim, frutos do mar..."
              value={allergies}
              onChange={(e) => setAllergies(e.target.value)}
            />
            <Input
              label="Alimentos Favoritos"
              placeholder="Ex: Frango, arroz, batata doce..."
              value={favorites}
              onChange={(e) => setFavorites(e.target.value)}
            />
            <Input
              label="Intolerâncias"
              placeholder="Ex: Lactose, frutose..."
              value={intolerances}
              onChange={(e) => setIntolerances(e.target.value)}
            />
          </div>
        )

      case 2:
        return (
          <div className="space-y-4">
            <Input
              label="Condições Médicas"
              placeholder="Ex: Diabetes, hipertensão..."
              value={conditions}
              onChange={(e) => setConditions(e.target.value)}
              hint="Liste quaisquer condições médicas diagnosticadas"
            />
            <Input
              label="Medicamentos em Uso"
              placeholder="Ex: Metformina, losartana..."
              value={medications}
              onChange={(e) => setMedications(e.target.value)}
            />
            <Input
              label="Cirurgias Anteriores"
              placeholder="Ex: Apendicectomia (2020)..."
              value={surgeries}
              onChange={(e) => setSurgeries(e.target.value)}
            />
          </div>
        )

      case 3:
        return (
          <div className="space-y-4">
            <Select
              label="Frequência de Exercício"
              placeholder="Selecione"
              options={frequencyOptions}
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
            />
            <Select
              label="Tipo de Exercício Preferido"
              placeholder="Selecione"
              options={exerciseTypeOptions}
              value={exerciseTypes}
              onChange={(e) => setExerciseTypes(e.target.value)}
            />
            <Input
              label="Limitações Físicas"
              placeholder="Ex: Dor no joelho, hérnia de disco..."
              value={limitations}
              onChange={(e) => setLimitations(e.target.value)}
            />
          </div>
        )

      case 4:
        return (
          <div className="space-y-4">
            <Select
              label="Objetivo Principal"
              placeholder="Selecione seu objetivo"
              options={goalOptions}
              value={primaryGoal}
              onChange={(e) => setPrimaryGoal(e.target.value)}
            />
            <Select
              label="Prazo Desejado"
              placeholder="Selecione o prazo"
              options={timelineOptions}
              value={timeline}
              onChange={(e) => setTimeline(e.target.value)}
            />
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      {/* Progress */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <h1 className="font-display text-2xl font-bold text-gray-900">Anamnese</h1>
        <p className="mt-1 text-sm text-gray-500">
          Preencha o formulário para que possamos montar o melhor plano para você.
        </p>

        <div className="mt-4">
          <ProgressBar
            value={currentSection + 1}
            max={sections.length}
            showLabel
            label={`Seção ${currentSection + 1} de ${sections.length}`}
          />
        </div>
      </motion.div>

      {/* Section indicators */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {sections.map((section, idx) => (
          <button
            key={section}
            type="button"
            onClick={() => setCurrentSection(idx)}
            className={cn(
              'whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium transition-all cursor-pointer',
              idx === currentSection
                ? 'bg-usfit-gradient text-white shadow-sm'
                : idx < currentSection
                  ? 'bg-green-100 text-green-700'
                  : 'bg-gray-100 text-gray-500',
            )}
          >
            {section}
          </button>
        ))}
      </div>

      {/* Form section */}
      <motion.div
        key={currentSection}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card>
          <CardHeader title={sections[currentSection]} />
          <CardContent>{renderSection()}</CardContent>
        </Card>
      </motion.div>

      {/* Navigation buttons */}
      <div className="flex items-center justify-between">
        <div>
          {currentSection > 0 ? (
            <Button
              variant="outline"
              iconLeft={<ChevronLeft className="h-4 w-4" />}
              onClick={handlePrev}
            >
              Anterior
            </Button>
          ) : null}
        </div>
        <div>
          {currentSection < sections.length - 1 ? (
            <Button
              variant="primary"
              iconRight={<ChevronRight className="h-4 w-4" />}
              onClick={handleNext}
            >
              Próximo
            </Button>
          ) : (
            <Button
              variant="primary"
              iconLeft={<Send className="h-4 w-4" />}
              onClick={handleSubmit}
            >
              Enviar Anamnese
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export { AnamnasisPage }
export default AnamnasisPage
