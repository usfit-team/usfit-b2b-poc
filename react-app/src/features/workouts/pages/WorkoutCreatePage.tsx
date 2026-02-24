import { useState } from 'react'
import type { FormEvent } from 'react'
import { motion } from 'motion/react'
import Plus from 'lucide-react/dist/esm/icons/plus'
import Trash2 from 'lucide-react/dist/esm/icons/trash-2'
import GripVertical from 'lucide-react/dist/esm/icons/grip-vertical'
import ChevronDown from 'lucide-react/dist/esm/icons/chevron-down'
import ChevronUp from 'lucide-react/dist/esm/icons/chevron-up'
import Save from 'lucide-react/dist/esm/icons/save'
import type { WorkoutDay, WorkoutGroup, Exercise, ExerciseSet } from '@/types/workout'
import { cn } from '@/lib/utils'
import { BackButton } from '@/components/shared/BackButton'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardContent } from '@/components/ui/Card'

function makeId(): string {
  return Math.random().toString(36).slice(2, 10)
}

function createExercise(name: string, sets: ExerciseSet[]): Exercise {
  return {
    id: makeId(),
    name,
    category: '',
    muscleGroup: '',
    equipment: '',
    sets,
  }
}

function createSet(reps: string, load: string, rest: string): ExerciseSet {
  return { reps, load, rest }
}

function createGroup(name: string, exercises: Exercise[]): WorkoutGroup {
  return { id: makeId(), name, exercises }
}

function createDay(name: string, groups: WorkoutGroup[]): WorkoutDay {
  return { id: makeId(), name, groups }
}

const initialDays: WorkoutDay[] = [
  createDay('Treino A - Superiores', [
    createGroup('Aquecimento', [
      createExercise('Esteira Leve', [createSet('10 min', '-', '-')]),
      createExercise('Rotação de Ombros', [createSet('15', '-', '30s')]),
    ]),
    createGroup('Principal', [
      createExercise('Supino Reto', [
        createSet('12', '60kg', '90s'),
        createSet('10', '70kg', '90s'),
        createSet('8', '80kg', '120s'),
      ]),
      createExercise('Desenvolvimento com Halteres', [
        createSet('12', '16kg', '60s'),
        createSet('10', '18kg', '60s'),
        createSet('10', '20kg', '90s'),
      ]),
      createExercise('Tríceps Pulley', [
        createSet('12', '25kg', '60s'),
        createSet('12', '30kg', '60s'),
        createSet('10', '35kg', '60s'),
      ]),
    ]),
  ]),
  createDay('Treino B - Inferiores', [
    createGroup('Aquecimento', [
      createExercise('Bicicleta Ergométrica', [createSet('10 min', '-', '-')]),
      createExercise('Alongamento Dinâmico', [createSet('10', '-', '30s')]),
    ]),
    createGroup('Principal', [
      createExercise('Agachamento Livre', [
        createSet('12', '60kg', '90s'),
        createSet('10', '80kg', '120s'),
        createSet('8', '100kg', '120s'),
      ]),
      createExercise('Leg Press 45°', [
        createSet('12', '120kg', '90s'),
        createSet('10', '160kg', '90s'),
        createSet('10', '180kg', '120s'),
      ]),
      createExercise('Cadeira Extensora', [
        createSet('12', '40kg', '60s'),
        createSet('12', '45kg', '60s'),
        createSet('10', '50kg', '60s'),
      ]),
      createExercise('Panturrilha no Smith', [
        createSet('15', '40kg', '45s'),
        createSet('15', '50kg', '45s'),
        createSet('15', '50kg', '45s'),
      ]),
    ]),
  ]),
]

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
}

function WorkoutCreatePage() {
  const [workoutName, setWorkoutName] = useState('')
  const [days, setDays] = useState<WorkoutDay[]>(initialDays)
  const [collapsedDays, setCollapsedDays] = useState<Set<string>>(new Set())

  function toggleDay(dayId: string) {
    setCollapsedDays((prev) => {
      const next = new Set(prev)
      if (next.has(dayId)) {
        next.delete(dayId)
      } else {
        next.add(dayId)
      }
      return next
    })
  }

  function addDay() {
    setDays((prev) => [
      ...prev,
      createDay(`Treino ${String.fromCharCode(65 + prev.length)}`, [
        createGroup('Principal', []),
      ]),
    ])
  }

  function removeDay(dayId: string) {
    setDays((prev) => prev.filter((d) => d.id !== dayId))
  }

  function addGroup(dayId: string) {
    setDays((prev) =>
      prev.map((d) =>
        d.id === dayId
          ? { ...d, groups: [...d.groups, createGroup('Novo Grupo', [])] }
          : d,
      ),
    )
  }

  function removeGroup(dayId: string, groupId: string) {
    setDays((prev) =>
      prev.map((d) =>
        d.id === dayId
          ? { ...d, groups: d.groups.filter((g) => g.id !== groupId) }
          : d,
      ),
    )
  }

  function addExercise(dayId: string, groupId: string) {
    setDays((prev) =>
      prev.map((d) =>
        d.id === dayId
          ? {
              ...d,
              groups: d.groups.map((g) =>
                g.id === groupId
                  ? {
                      ...g,
                      exercises: [
                        ...g.exercises,
                        createExercise('Novo Exercício', [createSet('12', '-', '60s')]),
                      ],
                    }
                  : g,
              ),
            }
          : d,
      ),
    )
  }

  function removeExercise(dayId: string, groupId: string, exerciseId: string) {
    setDays((prev) =>
      prev.map((d) =>
        d.id === dayId
          ? {
              ...d,
              groups: d.groups.map((g) =>
                g.id === groupId
                  ? {
                      ...g,
                      exercises: g.exercises.filter((ex) => ex.id !== exerciseId),
                    }
                  : g,
              ),
            }
          : d,
      ),
    )
  }

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
          Novo Plano de Treino
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Monte a estrutura completa do treino do aluno.
        </p>
      </motion.div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Workout Name */}
        <motion.div variants={item} className="max-w-md">
          <Input
            label="Nome do Treino"
            placeholder="Ex: Hipertrofia Avançado - João"
            value={workoutName}
            onChange={(e) => setWorkoutName(e.target.value)}
          />
        </motion.div>

        {/* Training Days */}
        {days.map((day, dayIndex) => {
          const isCollapsed = collapsedDays.has(day.id)

          return (
            <motion.div key={day.id} variants={item}>
              <Card>
                {/* Day Header */}
                <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
                  <button
                    type="button"
                    onClick={() => toggleDay(day.id)}
                    className="flex items-center gap-3 text-left"
                  >
                    <GripVertical className="h-4 w-4 text-gray-300" />
                    <div>
                      <h3 className="font-display text-base font-semibold text-gray-900">
                        {day.name}
                      </h3>
                      <span className="text-xs text-gray-400">
                        {day.groups.reduce((acc, g) => acc + g.exercises.length, 0)} exercícios
                      </span>
                    </div>
                    {isCollapsed ? (
                      <ChevronDown className="h-4 w-4 text-gray-400" />
                    ) : (
                      <ChevronUp className="h-4 w-4 text-gray-400" />
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => removeDay(day.id)}
                    className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                {/* Day Content */}
                {!isCollapsed ? (
                  <CardContent className="space-y-5">
                    {day.groups.map((group) => (
                      <div key={group.id} className="space-y-3">
                        {/* Group Header */}
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
                            {group.name}
                          </h4>
                          <button
                            type="button"
                            onClick={() => removeGroup(day.id, group.id)}
                            className="text-xs font-medium text-red-400 transition-colors hover:text-red-600"
                          >
                            Remover grupo
                          </button>
                        </div>

                        {/* Exercise Table Header */}
                        <div className="grid grid-cols-12 gap-2 px-2 text-[11px] font-semibold uppercase tracking-wide text-gray-400">
                          <div className="col-span-4">Exercício</div>
                          <div className="col-span-2 text-center">Séries x Reps</div>
                          <div className="col-span-2 text-center">Carga</div>
                          <div className="col-span-2 text-center">Descanso</div>
                          <div className="col-span-2" />
                        </div>

                        {/* Exercise Rows */}
                        {group.exercises.map((exercise) => (
                          <div
                            key={exercise.id}
                            className="rounded-xl border border-gray-100 bg-gray-50/50 p-3"
                          >
                            <div className="grid grid-cols-12 items-center gap-2">
                              <div className="col-span-4">
                                <span className="text-sm font-medium text-gray-900">
                                  {exercise.name}
                                </span>
                              </div>
                              <div className="col-span-2 text-center text-sm text-gray-600">
                                {exercise.sets.length} x {exercise.sets[0]?.reps ?? '-'}
                              </div>
                              <div className="col-span-2 text-center text-sm text-gray-600">
                                {exercise.sets[0]?.load ?? '-'}
                              </div>
                              <div className="col-span-2 text-center text-sm text-gray-600">
                                {exercise.sets[0]?.rest ?? '-'}
                              </div>
                              <div className="col-span-2 flex justify-end">
                                <button
                                  type="button"
                                  onClick={() => removeExercise(day.id, group.id, exercise.id)}
                                  className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </button>
                              </div>
                            </div>

                            {/* Individual Sets (if more than 1) */}
                            {exercise.sets.length > 1 ? (
                              <div className="mt-2 space-y-1 border-t border-gray-100 pt-2">
                                {exercise.sets.map((set, si) => (
                                  <div
                                    key={si}
                                    className="grid grid-cols-12 items-center gap-2 text-xs text-gray-500"
                                  >
                                    <div className="col-span-4 pl-2">
                                      Série {si + 1}
                                    </div>
                                    <div className="col-span-2 text-center">
                                      {set.reps}
                                    </div>
                                    <div className="col-span-2 text-center">
                                      {set.load}
                                    </div>
                                    <div className="col-span-2 text-center">
                                      {set.rest}
                                    </div>
                                    <div className="col-span-2" />
                                  </div>
                                ))}
                              </div>
                            ) : null}
                          </div>
                        ))}

                        {/* Add Exercise Button */}
                        <button
                          type="button"
                          onClick={() => addExercise(day.id, group.id)}
                          className={cn(
                            'flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-200',
                            'py-3 text-sm font-medium text-gray-400 transition-colors',
                            'hover:border-blue-300 hover:text-blue-500',
                          )}
                        >
                          <Plus className="h-4 w-4" />
                          Adicionar Exercício
                        </button>
                      </div>
                    ))}

                    {/* Add Group Button */}
                    <button
                      type="button"
                      onClick={() => addGroup(day.id)}
                      className={cn(
                        'flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-blue-200',
                        'bg-blue-50/50 py-3 text-sm font-medium text-blue-500 transition-colors',
                        'hover:border-blue-400 hover:bg-blue-50',
                      )}
                    >
                      <Plus className="h-4 w-4" />
                      Adicionar Grupo
                    </button>
                  </CardContent>
                ) : null}
              </Card>
            </motion.div>
          )
        })}

        {/* Add Day */}
        <motion.div variants={item}>
          <button
            type="button"
            onClick={addDay}
            className={cn(
              'flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-gray-300',
              'py-5 text-sm font-semibold text-gray-500 transition-colors',
              'hover:border-blue-400 hover:text-blue-500',
            )}
          >
            <Plus className="h-5 w-5" />
            Adicionar Dia de Treino
          </button>
        </motion.div>

        {/* Submit */}
        <motion.div variants={item} className="flex justify-end pt-4">
          <Button
            type="submit"
            size="lg"
            iconLeft={<Save className="h-4 w-4" />}
          >
            Salvar Treino
          </Button>
        </motion.div>
      </form>
    </motion.div>
  )
}

export default WorkoutCreatePage
