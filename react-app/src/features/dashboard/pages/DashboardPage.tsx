import { Suspense, lazy } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import DollarSign from 'lucide-react/dist/esm/icons/dollar-sign'
import Users from 'lucide-react/dist/esm/icons/users'
import Activity from 'lucide-react/dist/esm/icons/activity'
import AlertCircle from 'lucide-react/dist/esm/icons/alert-circle'
import Dumbbell from 'lucide-react/dist/esm/icons/dumbbell'
import Apple from 'lucide-react/dist/esm/icons/apple'
import Scale from 'lucide-react/dist/esm/icons/scale'
import Trophy from 'lucide-react/dist/esm/icons/trophy'
import Zap from 'lucide-react/dist/esm/icons/zap'
import RefreshCw from 'lucide-react/dist/esm/icons/refresh-cw'
import FileText from 'lucide-react/dist/esm/icons/file-text'
import TrendingUp from 'lucide-react/dist/esm/icons/trending-up'
import { Card, CardHeader, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { KpiCard } from '@/features/dashboard/components/KpiCard'
import { cn } from '@/lib/utils'

const GrowthChart = lazy(() => import('@/features/dashboard/components/GrowthChart'))

// ---------------------------------------------------------------------------
// KPI data
// ---------------------------------------------------------------------------

const kpis = [
  {
    title: 'Recorrência Mensal',
    value: 'R$ 14.250',
    icon: DollarSign,
    color: 'green',
    subtitle: 'vs mês anterior',
    trend: '+5%',
  },
  {
    title: 'Alunos Ativos',
    value: '85',
    icon: Users,
    color: 'blue',
    subtitle: '3 novos esta semana',
  },
  {
    title: 'Adesão Global',
    value: '78%',
    icon: Activity,
    color: 'purple',
    subtitle: 'Frequência média',
  },
  {
    title: 'Ações Pendentes',
    value: '8',
    icon: AlertCircle,
    color: 'yellow',
    subtitle: '3 dietas, 5 treinos',
  },
] as const

// ---------------------------------------------------------------------------
// Feed data
// ---------------------------------------------------------------------------

interface FeedItem {
  id: string
  type: 'workout' | 'nutrition' | 'weight'
  name: string
  action: string
  detail: string
  time: string
  highlight?: string
}

const feedItems: FeedItem[] = [
  {
    id: '1',
    type: 'workout',
    name: 'Ana Beatriz',
    action: 'finalizou',
    detail: 'Treino de Superiores',
    time: '10 min',
    highlight: 'Novo recorde no Supino!',
  },
  {
    id: '2',
    type: 'nutrition',
    name: 'João Silva',
    action: 'registrou',
    detail: 'Almoço',
    time: '32 min',
    highlight: '520 kcal • Dentro da meta',
  },
  {
    id: '3',
    type: 'weight',
    name: 'Carlos Júnior',
    action: 'atualizou',
    detail: 'Peso Corporal',
    time: '1h',
    highlight: 'Atual: 88.5kg (-1.2kg)',
  },
  {
    id: '4',
    type: 'workout',
    name: 'Mariana Santos',
    action: 'finalizou',
    detail: 'Treino de Pernas',
    time: '2h',
  },
  {
    id: '5',
    type: 'nutrition',
    name: 'Pedro Oliveira',
    action: 'registrou',
    detail: 'Café da Manhã',
    time: '3h',
  },
]

const feedIconMap = {
  workout: { icon: Dumbbell, bg: 'bg-blue-100', text: 'text-usfit-blue' },
  nutrition: { icon: Apple, bg: 'bg-green-100', text: 'text-green-600' },
  weight: { icon: Scale, bg: 'bg-purple-100', text: 'text-purple-600' },
} as const

// ---------------------------------------------------------------------------
// Contract expiry data
// ---------------------------------------------------------------------------

interface ExpiryItem {
  id: string
  name: string
  daysLeft: number
}

const expiryItems: ExpiryItem[] = [
  { id: '1', name: 'Carlos Eduardo', daysLeft: 3 },
  { id: '2', name: 'Mariana Santos', daysLeft: 5 },
  { id: '3', name: 'Fernanda Lima', daysLeft: 12 },
]

// ---------------------------------------------------------------------------
// Animation variants
// ---------------------------------------------------------------------------

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
}

const cardVariant = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* KPI grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4"
      >
        {kpis.map((kpi) => (
          <motion.div key={kpi.title} variants={cardVariant}>
            <KpiCard
              title={kpi.title}
              value={kpi.value}
              icon={kpi.icon}
              color={kpi.color}
              subtitle={kpi.subtitle}
              trend={kpi.trend}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Content grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Feed em Tempo Real */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="lg:col-span-2"
        >
          <Card className="overflow-hidden">
            <CardHeader
              title="Feed em Tempo Real"
              action={
                <button className="flex items-center gap-1.5 text-xs font-bold text-usfit-blue hover:underline">
                  <RefreshCw className="h-3.5 w-3.5" />
                  Atualizar
                </button>
              }
              className="bg-gray-50/50"
            />
            <div className="divide-y divide-gray-50">
              {feedItems.map((feedItem) => {
                const feedIcon = feedIconMap[feedItem.type]
                const IconComponent = feedIcon.icon
                return (
                  <div
                    key={feedItem.id}
                    className="flex items-start gap-4 px-6 py-4 hover:bg-gray-50/50 transition-colors"
                  >
                    <div
                      className={cn(
                        'flex h-10 w-10 shrink-0 items-center justify-center rounded-full',
                        feedIcon.bg,
                      )}
                    >
                      <IconComponent className={cn('h-5 w-5', feedIcon.text)} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between">
                        <p className="text-sm text-gray-800">
                          <span className="font-bold">{feedItem.name}</span>{' '}
                          <span className="text-gray-500">{feedItem.action}</span>{' '}
                          {feedItem.detail}
                        </p>
                        <span className="ml-3 shrink-0 text-xs text-gray-400">
                          {feedItem.time}
                        </span>
                      </div>
                      {feedItem.highlight ? (
                        <p className="mt-0.5 flex items-center gap-1 text-xs text-blue-600">
                          {feedItem.type === 'workout' ? (
                            <Trophy className="h-3 w-3" />
                          ) : null}
                          {feedItem.highlight}
                        </p>
                      ) : null}
                    </div>
                  </div>
                )
              })}
            </div>
          </Card>
        </motion.div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Vencimentos */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            <Card>
              <CardHeader
                title="Vencimentos"
                action={
                  <Link to="/contracts" className="text-xs text-usfit-blue hover:underline">
                    Ver todos
                  </Link>
                }
              />
              <CardContent className="space-y-3">
                {expiryItems.map((expiry) => {
                  const isUrgent = expiry.daysLeft <= 5
                  return (
                    <div
                      key={expiry.id}
                      className={cn(
                        'flex items-center justify-between rounded-xl border p-3',
                        isUrgent
                          ? 'border-yellow-100 bg-yellow-50'
                          : 'border-gray-100 bg-gray-50',
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={cn(
                            'rounded-lg bg-white p-1.5',
                            isUrgent ? 'text-yellow-500' : 'text-gray-500',
                          )}
                        >
                          <FileText className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-gray-900">{expiry.name}</p>
                          <p
                            className={cn(
                              'text-[10px]',
                              isUrgent ? 'text-yellow-600' : 'text-gray-500',
                            )}
                          >
                            {expiry.daysLeft} dias restantes
                          </p>
                        </div>
                      </div>
                      <Link
                        to={isUrgent ? '/contracts/1/renew' : '/contracts/1'}
                        className="rounded border border-gray-200 bg-white px-2 py-1 text-xs font-bold text-gray-600 hover:bg-gray-100"
                      >
                        {isUrgent ? 'Renovar' : 'Ver'}
                      </Link>
                    </div>
                  )
                })}
              </CardContent>
            </Card>
          </motion.div>

          {/* Novos Alunos chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
          >
            <Card>
              <CardHeader
                title="Novos Alunos (6 meses)"
                action={
                  <span className="flex items-center gap-1 text-xs font-semibold text-green-600">
                    <TrendingUp className="h-3 w-3" />
                    +30%
                  </span>
                }
              />
              <CardContent>
                <Suspense
                  fallback={
                    <div className="flex h-[180px] items-center justify-center">
                      <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-200 border-t-blue-600" />
                    </div>
                  }
                >
                  <GrowthChart />
                </Suspense>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
