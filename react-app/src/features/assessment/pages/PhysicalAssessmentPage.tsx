import { useState } from 'react'
import { motion } from 'motion/react'
import Activity from 'lucide-react/dist/esm/icons/activity'
import Info from 'lucide-react/dist/esm/icons/info'
import type { Protocol, Gender, SkinFolds, BodyCompositionInput } from '@/types/assessment'
import { POLLOCK_PROTOCOLS } from '@/types/assessment'
import { FOLD_LABELS } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { useBodyComposition } from '@/hooks/useBodyComposition'
import { BackButton } from '@/components/shared/BackButton'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'

const protocolOptions = [
  { label: 'Manual', value: 'manual' },
  { label: 'Pollock 3 Dobras', value: 'pollock3' },
  { label: 'Pollock 7 Dobras', value: 'pollock7' },
]

const genderOptions = [
  { label: 'Masculino', value: 'male' },
  { label: 'Feminino', value: 'female' },
]

const protocolDescriptions: Record<Protocol, string> = {
  manual: 'Insira o percentual de gordura corporal manualmente. As dobras cutâneas ficam desabilitadas.',
  pollock3: 'Protocolo de 3 dobras cutâneas de Jackson & Pollock. As dobras ativas dependem do gênero selecionado.',
  pollock7: 'Protocolo de 7 dobras cutâneas de Jackson & Pollock. Todas as 7 dobras devem ser medidas.',
}

const FOLD_KEYS: (keyof SkinFolds)[] = [
  'chest',
  'abdominal',
  'thigh',
  'triceps',
  'subscapular',
  'suprailiac',
  'midaxillary',
]

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
}

function getActiveFolds(protocol: Protocol, gender: Gender): Set<keyof SkinFolds> {
  if (protocol === 'manual') return new Set()
  if (protocol === 'pollock7') return new Set(POLLOCK_PROTOCOLS.pollock7.all)
  const folds = gender === 'male'
    ? POLLOCK_PROTOCOLS.pollock3.male
    : POLLOCK_PROTOCOLS.pollock3.female
  return new Set(folds as unknown as (keyof SkinFolds)[])
}

function PhysicalAssessmentPage() {
  const [input, setInput] = useState<BodyCompositionInput>({
    protocol: 'pollock3',
    gender: 'male',
    age: 30,
    weight: 80,
    manualBf: 0,
    folds: {
      chest: 0,
      abdominal: 0,
      thigh: 0,
      triceps: 0,
      subscapular: 0,
      suprailiac: 0,
      midaxillary: 0,
    },
  })

  const [height, setHeight] = useState(175)

  const result = useBodyComposition(input)

  const activeFolds = getActiveFolds(input.protocol, input.gender)

  function updateField<K extends keyof BodyCompositionInput>(key: K, value: BodyCompositionInput[K]) {
    setInput((prev) => ({ ...prev, [key]: value }))
  }

  function updateFold(foldKey: keyof SkinFolds, value: number) {
    setInput((prev) => ({
      ...prev,
      folds: { ...prev.folds, [foldKey]: value },
    }))
  }

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <motion.div variants={item}>
        <BackButton />
      </motion.div>

      <motion.div variants={item} className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-100">
          <Activity className="h-5 w-5 text-cyan-600" />
        </div>
        <div>
          <h1 className="font-display text-2xl font-bold text-gray-900">
            Avaliação Física
          </h1>
          <p className="mt-0.5 text-sm text-gray-500">
            Calcule a composição corporal usando protocolos de dobras cutâneas.
          </p>
        </div>
      </motion.div>

      {/* Section 1: Patient Data */}
      <motion.div variants={item}>
        <Card>
          <CardHeader title="Dados do Paciente" />
          <CardContent className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              <Select
                label="Gênero"
                options={genderOptions}
                value={input.gender}
                onChange={(e) => updateField('gender', e.target.value as Gender)}
              />
              <Input
                label="Idade"
                type="number"
                value={input.age}
                onChange={(e) => updateField('age', Number(e.target.value))}
                min={1}
                max={120}
              />
              <Input
                label="Peso (kg)"
                type="number"
                value={input.weight}
                onChange={(e) => updateField('weight', Number(e.target.value))}
                min={1}
                step={0.1}
              />
              <Input
                label="Altura (cm)"
                type="number"
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
                min={1}
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <Select
                label="Protocolo"
                options={protocolOptions}
                value={input.protocol}
                onChange={(e) => updateField('protocol', e.target.value as Protocol)}
              />
              <div>
                <Input
                  label="% Gordura"
                  type="number"
                  value={input.protocol === 'manual' ? (input.manualBf ?? 0) : result.bodyFatPercentage}
                  onChange={(e) => updateField('manualBf', Number(e.target.value))}
                  disabled={input.protocol !== 'manual'}
                  variant={input.protocol === 'manual' ? 'default' : 'result'}
                  readOnly={input.protocol !== 'manual'}
                  min={0}
                  max={60}
                  step={0.1}
                />
              </div>
            </div>

            <div className="flex items-start gap-2 rounded-lg bg-blue-50 px-4 py-3">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-blue-500" />
              <p className="text-sm text-blue-700">
                {protocolDescriptions[input.protocol]}
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Section 2: Skin Folds */}
      <motion.div variants={item}>
        <Card>
          <CardHeader title="Dobras Cutâneas" />
          <CardContent>
            {input.protocol === 'manual' ? (
              <div className="relative rounded-xl border-2 border-dashed border-gray-200 bg-gray-50/50 px-6 py-10 text-center">
                <p className="text-sm font-medium text-gray-400">
                  Dobras cutâneas desabilitadas no modo manual.
                </p>
                <p className="mt-1 text-xs text-gray-400">
                  Selecione Pollock 3 ou Pollock 7 para medir as dobras.
                </p>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {FOLD_KEYS.map((foldKey) => {
                  const isActive = activeFolds.has(foldKey)

                  return (
                    <Input
                      key={foldKey}
                      label={FOLD_LABELS[foldKey] ?? foldKey}
                      type="number"
                      value={input.folds[foldKey]}
                      onChange={(e) => updateFold(foldKey, Number(e.target.value))}
                      disabled={!isActive}
                      variant={isActive ? 'active' : 'disabled'}
                      min={0}
                      max={100}
                      step={0.1}
                      placeholder={isActive ? 'mm' : '-'}
                    />
                  )
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Section 3: Results */}
      <motion.div variants={item}>
        <Card>
          <CardHeader title="Resultados" />
          <CardContent>
            <div className="grid gap-5 sm:grid-cols-3">
              <Input
                label="% Gordura Corporal"
                type="number"
                value={result.bodyFatPercentage}
                readOnly
                variant="result"
              />
              <Input
                label="Massa Gorda (kg)"
                type="number"
                value={result.fatMass}
                readOnly
                variant="result"
              />
              <Input
                label="Massa Magra (kg)"
                type="number"
                value={result.leanMass}
                readOnly
                variant="result"
              />
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}

export default PhysicalAssessmentPage
