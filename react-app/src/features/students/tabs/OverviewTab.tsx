import { useNavigate, useParams } from 'react-router-dom'
import { motion } from 'motion/react'
import Activity from 'lucide-react/dist/esm/icons/activity'
import Utensils from 'lucide-react/dist/esm/icons/utensils'
import Dumbbell from 'lucide-react/dist/esm/icons/dumbbell'
import ClipboardCheck from 'lucide-react/dist/esm/icons/clipboard-check'
import TrendingUp from 'lucide-react/dist/esm/icons/trending-up'
import Calendar from 'lucide-react/dist/esm/icons/calendar'
import CheckCircle from 'lucide-react/dist/esm/icons/check-circle'
import { Card, CardHeader, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { HeatMap } from '@/components/ui/HeatMap'
import type { HeatLevel } from '@/components/ui/HeatMap'
import { cn } from '@/lib/utils'

// ---------------------------------------------------------------------------
// Mock heat map data (12 weeks = 84 days)
// ---------------------------------------------------------------------------

function generateHeatData(): { date: string; level: HeatLevel }[] {
  const days: { date: string; level: HeatLevel }[] = []
  const today = new Date()

  for (let i = 83; i >= 0; i--) {
    const d = new Date(today)
    d.setDate(d.getDate() - i)
    const dateStr = d.toISOString().split('T')[0]
    const levels: HeatLevel[] = [0, 0, 1, 1, 2, 2, 3]
    const level = levels[Math.floor(Math.random() * levels.length)]
    days.push({ date: dateStr, level })
  }

  return days
}

const heatData = generateHeatData()

// ---------------------------------------------------------------------------
// Mock activity feed
// ---------------------------------------------------------------------------

const activityFeed = [
  {
    id: '1',
    icon: Dumbbell,
    text: 'Completou treino de Peitoral e Triceps',
    time: 'Hoje, 08:30',
    color: 'text-blue-500 bg-blue-50',
  },
  {
    id: '2',
    icon: Utensils,
    text: 'Registrou refeição: Almoço',
    time: 'Hoje, 12:15',
    color: 'text-green-500 bg-green-50',
  },
  {
    id: '3',
    icon: Activity,
    text: 'Atualizou peso: 82.0 kg',
    time: 'Ontem, 07:00',
    color: 'text-purple-500 bg-purple-50',
  },
  {
    id: '4',
    icon: Dumbbell,
    text: 'Completou treino de Costas e Biceps',
    time: '19/02, 09:00',
    color: 'text-blue-500 bg-blue-50',
  },
  {
    id: '5',
    icon: ClipboardCheck,
    text: 'Avaliação física realizada',
    time: '15/02, 10:30',
    color: 'text-orange-500 bg-orange-50',
  },
]

// ---------------------------------------------------------------------------
// Adherence stats
// ---------------------------------------------------------------------------

const adherenceStats = [
  { label: 'Aderência Treino', value: '87%', color: 'text-blue-600', bg: 'bg-blue-50' },
  { label: 'Aderência Dieta', value: '72%', color: 'text-green-600', bg: 'bg-green-50' },
  { label: 'Check-ins Semana', value: '5/7', color: 'text-purple-600', bg: 'bg-purple-50' },
  { label: 'Dias Consecutivos', value: '12', color: 'text-orange-600', bg: 'bg-orange-50' },
]

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

function OverviewTab() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()

  return (
    <div className="space-y-6">
      {/* Adherence stats */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="grid grid-cols-2 gap-4 lg:grid-cols-4"
      >
        {adherenceStats.map((stat) => (
          <Card key={stat.label} className="p-4">
            <div className="flex items-center gap-3">
              <div className={cn('flex h-10 w-10 items-center justify-center rounded-xl', stat.bg)}>
                <TrendingUp className={cn('h-5 w-5', stat.color)} />
              </div>
              <div>
                <p className="text-xs text-gray-500">{stat.label}</p>
                <p className={cn('font-display text-lg font-bold', stat.color)}>{stat.value}</p>
              </div>
            </div>
          </Card>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Activity HeatMap */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="lg:col-span-2"
        >
          <Card>
            <CardHeader
              title="Atividade"
              action={
                <div className="flex items-center gap-1.5 text-xs text-gray-400">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>Últimas 12 semanas</span>
                </div>
              }
            />
            <CardContent>
              <HeatMap data={heatData} columns={12} />
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick links */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.15 }}
        >
          <Card>
            <CardHeader title="Ações Rápidas" />
            <CardContent className="space-y-3">
              <Button
                variant="secondary"
                size="sm"
                className="w-full justify-start"
                iconLeft={<Utensils className="h-4 w-4 text-green-500" />}
                onClick={() => navigate(`/students/${id}/nutrition`)}
              >
                Ver Dieta
              </Button>
              <Button
                variant="secondary"
                size="sm"
                className="w-full justify-start"
                iconLeft={<Dumbbell className="h-4 w-4 text-blue-500" />}
                onClick={() => navigate(`/students/${id}/workout`)}
              >
                Ver Treino
              </Button>
              <Button
                variant="secondary"
                size="sm"
                className="w-full justify-start"
                iconLeft={<ClipboardCheck className="h-4 w-4 text-orange-500" />}
                onClick={() => navigate('/assessment/physical')}
              >
                Nova Avaliação
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Recent activity feed */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <Card>
          <CardHeader title="Atividade Recente" />
          <CardContent className="space-y-4">
            {activityFeed.map((item) => {
              const Icon = item.icon
              return (
                <div key={item.id} className="flex items-start gap-3">
                  <div className={cn('flex h-8 w-8 shrink-0 items-center justify-center rounded-lg', item.color)}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-700">{item.text}</p>
                    <p className="text-xs text-gray-400">{item.time}</p>
                  </div>
                  <CheckCircle className="h-4 w-4 shrink-0 text-green-400" />
                </div>
              )
            })}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

export { OverviewTab }
export default OverviewTab
