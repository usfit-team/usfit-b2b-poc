import { useState } from 'react'
import type { FormEvent } from 'react'
import { motion } from 'motion/react'
import Save from 'lucide-react/dist/esm/icons/save'
import { BackButton } from '@/components/shared/BackButton'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Label } from '@/components/ui/Label'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'

const muscleGroupOptions = [
  { label: 'Peitoral', value: 'peitoral' },
  { label: 'Dorsal', value: 'dorsal' },
  { label: 'Quadríceps', value: 'quadriceps' },
  { label: 'Posterior de Coxa', value: 'posterior' },
  { label: 'Deltóide', value: 'deltoide' },
  { label: 'Bíceps', value: 'biceps' },
  { label: 'Tríceps', value: 'triceps' },
  { label: 'Core', value: 'core' },
  { label: 'Glúteos', value: 'gluteos' },
  { label: 'Panturrilha', value: 'panturrilha' },
]

const equipmentOptions = [
  { label: 'Barra', value: 'barra' },
  { label: 'Halteres', value: 'halteres' },
  { label: 'Máquina', value: 'maquina' },
  { label: 'Cabo', value: 'cabo' },
  { label: 'Corporal', value: 'corporal' },
  { label: 'Kettlebell', value: 'kettlebell' },
  { label: 'Elástico', value: 'elastico' },
  { label: 'Smith', value: 'smith' },
]

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
}

function ExerciseCreatePage() {
  const [name, setName] = useState('')
  const [muscleGroup, setMuscleGroup] = useState('')
  const [equipment, setEquipment] = useState('')
  const [instructions, setInstructions] = useState('')

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
  }

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <motion.div variants={item}>
        <BackButton />
      </motion.div>

      <motion.div variants={item}>
        <h1 className="font-display text-2xl font-bold text-gray-900">
          Novo Exercício
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Cadastre um novo exercício na biblioteca.
        </p>
      </motion.div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <motion.div variants={item}>
          <Card>
            <CardHeader title="Informações do Exercício" />
            <CardContent className="space-y-5">
              <Input
                label="Nome"
                placeholder="Ex: Supino Reto com Barra"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <div className="grid gap-5 sm:grid-cols-2">
                <Select
                  label="Grupo Muscular"
                  placeholder="Selecione..."
                  options={muscleGroupOptions}
                  value={muscleGroup}
                  onChange={(e) => setMuscleGroup(e.target.value)}
                />

                <Select
                  label="Equipamento"
                  placeholder="Selecione..."
                  options={equipmentOptions}
                  value={equipment}
                  onChange={(e) => setEquipment(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="instructions">Instruções</Label>
                <textarea
                  id="instructions"
                  rows={5}
                  placeholder="Descreva a execução correta do exercício..."
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  className="mt-1.5 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-all duration-200 focus:border-usfit-cyan focus:ring-2 focus:ring-usfit-cyan/20"
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item} className="flex justify-end">
          <Button
            type="submit"
            size="lg"
            iconLeft={<Save className="h-4 w-4" />}
          >
            Salvar Exercício
          </Button>
        </motion.div>
      </form>
    </motion.div>
  )
}

export default ExerciseCreatePage
