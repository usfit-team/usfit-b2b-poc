import { useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import Plus from 'lucide-react/dist/esm/icons/plus'
import Dumbbell from 'lucide-react/dist/esm/icons/dumbbell'
import Calendar from 'lucide-react/dist/esm/icons/calendar'
import Clock from 'lucide-react/dist/esm/icons/clock'
import ChevronRight from 'lucide-react/dist/esm/icons/chevron-right'
import CheckCircle from 'lucide-react/dist/esm/icons/check-circle'
import { Card, CardHeader, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { cn } from '@/lib/utils'

// ---------------------------------------------------------------------------
// Mock data
// ---------------------------------------------------------------------------

const currentPlan = {
  name: 'Treino ABC - Hipertrofia',
  startDate: '2026-01-20',
  weeksTotal: 8,
  weeksCurrent: 5,
  frequency: '5x por semana',
  splits: [
    { day: 'A', focus: 'Peitoral + Triceps', exercises: 7 },
    { day: 'B', focus: 'Costas + Biceps', exercises: 7 },
    { day: 'C', focus: 'Pernas + Ombros', exercises: 8 },
  ],
  status: 'active' as const,
}

const workoutLog = [
  {
    id: '1',
    date: '21/02/2026',
    split: 'A',
    focus: 'Peitoral + Triceps',
    duration: '62 min',
    completed: true,
  },
  {
    id: '2',
    date: '20/02/2026',
    split: 'C',
    focus: 'Pernas + Ombros',
    duration: '55 min',
    completed: true,
  },
  {
    id: '3',
    date: '19/02/2026',
    split: 'B',
    focus: 'Costas + Biceps',
    duration: '58 min',
    completed: true,
  },
  {
    id: '4',
    date: '18/02/2026',
    split: 'A',
    focus: 'Peitoral + Triceps',
    duration: '60 min',
    completed: true,
  },
  {
    id: '5',
    date: '17/02/2026',
    split: 'C',
    focus: 'Pernas + Ombros',
    duration: '48 min',
    completed: false,
  },
]

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

function WorkoutTab() {
  const navigate = useNavigate()

  const progressPct = Math.round((currentPlan.weeksCurrent / currentPlan.weeksTotal) * 100)

  return (
    <div className="space-y-6">
      {/* Current plan */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card>
          <CardHeader
            title="Plano Atual"
            action={<Badge variant="success">Ativo</Badge>}
          />
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-500">
                <Dumbbell className="h-5 w-5" />
              </div>
              <div>
                <p className="font-display font-semibold text-gray-900">
                  {currentPlan.name}
                </p>
                <p className="text-xs text-gray-500">
                  {currentPlan.frequency} &middot; Início: {currentPlan.startDate}
                </p>
              </div>
            </div>

            {/* Progress bar */}
            <div>
              <div className="mb-1.5 flex items-center justify-between text-xs">
                <span className="text-gray-500">Progresso</span>
                <span className="font-medium text-gray-700">
                  Semana {currentPlan.weeksCurrent}/{currentPlan.weeksTotal}
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                <div
                  className="h-full rounded-full bg-usfit-gradient transition-all duration-500"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
            </div>

            {/* Splits */}
            <div>
              <p className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-500">
                Divisão de Treino
              </p>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                {currentPlan.splits.map((split) => (
                  <div
                    key={split.day}
                    className="flex items-center gap-3 rounded-xl border border-gray-100 p-3"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 font-display text-sm font-bold text-blue-700">
                      {split.day}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{split.focus}</p>
                      <p className="text-xs text-gray-400">{split.exercises} exercícios</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Create new workout */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <Button
          variant="primary"
          iconLeft={<Plus className="h-4 w-4" />}
          onClick={() => navigate('/workouts/new')}
        >
          Criar Novo Treino
        </Button>
      </motion.div>

      {/* Workout log */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.15 }}
      >
        <Card>
          <CardHeader title="Histórico de Treinos" />
          <CardContent className="divide-y divide-gray-50">
            {workoutLog.map((entry) => (
              <div
                key={entry.id}
                className="flex items-center gap-3 py-3 first:pt-0 last:pb-0"
              >
                <div
                  className={cn(
                    'flex h-9 w-9 shrink-0 items-center justify-center rounded-lg',
                    entry.completed ? 'bg-green-50 text-green-500' : 'bg-gray-100 text-gray-400',
                  )}
                >
                  {entry.completed ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    <Clock className="h-4 w-4" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">
                    Treino {entry.split} - {entry.focus}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Calendar className="h-3 w-3" />
                    <span>{entry.date}</span>
                    <span>&middot;</span>
                    <Clock className="h-3 w-3" />
                    <span>{entry.duration}</span>
                  </div>
                </div>
                {entry.completed ? (
                  <Badge variant="success">Completo</Badge>
                ) : (
                  <Badge variant="warning">Incompleto</Badge>
                )}
                <ChevronRight className="h-4 w-4 shrink-0 text-gray-300" />
              </div>
            ))}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

export { WorkoutTab }
export default WorkoutTab
