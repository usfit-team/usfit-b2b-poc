import { useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import Plus from 'lucide-react/dist/esm/icons/plus'
import Weight from 'lucide-react/dist/esm/icons/weight'
import TrendingDown from 'lucide-react/dist/esm/icons/trending-down'
import TrendingUp from 'lucide-react/dist/esm/icons/trending-up'
import Minus from 'lucide-react/dist/esm/icons/minus'
import Calendar from 'lucide-react/dist/esm/icons/calendar'
import Percent from 'lucide-react/dist/esm/icons/percent'
import { Card, CardHeader, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { cn } from '@/lib/utils'

// ---------------------------------------------------------------------------
// Mock data
// ---------------------------------------------------------------------------

const bodyComposition = {
  bodyFat: 16.0,
  leanMass: 68.9,
  fatMass: 13.1,
  bmi: 25.9,
  visceralFat: 8,
  date: '15/02/2026',
}

const weightHistory = [
  { date: '15/02/2026', weight: 82.0, delta: -0.5 },
  { date: '01/02/2026', weight: 82.5, delta: -0.8 },
  { date: '15/01/2026', weight: 83.3, delta: -0.4 },
  { date: '01/01/2026', weight: 83.7, delta: 0.2 },
  { date: '15/12/2025', weight: 83.5, delta: -1.0 },
  { date: '01/12/2025', weight: 84.5, delta: -0.5 },
  { date: '15/11/2025', weight: 85.0, delta: -0.3 },
  { date: '01/11/2025', weight: 85.3, delta: 0.0 },
]

const compositionCards = [
  {
    label: '% Gordura',
    value: `${bodyComposition.bodyFat}%`,
    icon: Percent,
    color: 'text-red-500',
    bg: 'bg-red-50',
  },
  {
    label: 'Massa Magra',
    value: `${bodyComposition.leanMass} kg`,
    icon: TrendingUp,
    color: 'text-blue-500',
    bg: 'bg-blue-50',
  },
  {
    label: 'Massa Gorda',
    value: `${bodyComposition.fatMass} kg`,
    icon: TrendingDown,
    color: 'text-orange-500',
    bg: 'bg-orange-50',
  },
  {
    label: 'IMC',
    value: bodyComposition.bmi.toFixed(1),
    icon: Weight,
    color: 'text-purple-500',
    bg: 'bg-purple-50',
  },
]

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

function BiometricsTab() {
  const navigate = useNavigate()

  return (
    <div className="space-y-6">
      {/* Body composition cards */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card>
          <CardHeader
            title="Composição Corporal"
            action={
              <span className="text-xs text-gray-400">
                Última avaliação: {bodyComposition.date}
              </span>
            }
          />
          <CardContent>
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              {compositionCards.map((card) => {
                const Icon = card.icon
                return (
                  <div
                    key={card.label}
                    className="flex items-center gap-3 rounded-xl border border-gray-100 p-3"
                  >
                    <div className={cn('flex h-10 w-10 items-center justify-center rounded-xl', card.bg)}>
                      <Icon className={cn('h-5 w-5', card.color)} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">{card.label}</p>
                      <p className={cn('font-display text-lg font-bold', card.color)}>
                        {card.value}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Visceral fat */}
            <div className="mt-4 flex items-center gap-2 rounded-xl bg-gray-50 px-4 py-3">
              <span className="text-xs text-gray-500">Gordura Visceral:</span>
              <span className="font-display text-sm font-bold text-gray-900">
                {bodyComposition.visceralFat}
              </span>
              <Badge variant="success" className="ml-1">Normal</Badge>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* New assessment button */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <Button
          variant="primary"
          iconLeft={<Plus className="h-4 w-4" />}
          onClick={() => navigate('/assessment/physical')}
        >
          Nova Avaliação
        </Button>
      </motion.div>

      {/* Weight evolution */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.15 }}
      >
        <Card>
          <CardHeader title="Evolução de Peso" />
          <CardContent className="divide-y divide-gray-50">
            {weightHistory.map((entry) => {
              const isPositive = entry.delta > 0
              const isNeutral = entry.delta === 0
              return (
                <div
                  key={entry.date}
                  className="flex items-center gap-3 py-3 first:pt-0 last:pb-0"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-400">
                    <Calendar className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">
                      {entry.weight.toFixed(1)} kg
                    </p>
                    <p className="text-xs text-gray-500">{entry.date}</p>
                  </div>
                  <div
                    className={cn(
                      'flex items-center gap-1 text-sm font-medium',
                      isNeutral
                        ? 'text-gray-400'
                        : isPositive
                          ? 'text-red-500'
                          : 'text-green-500',
                    )}
                  >
                    {isNeutral ? (
                      <Minus className="h-3.5 w-3.5" />
                    ) : isPositive ? (
                      <TrendingUp className="h-3.5 w-3.5" />
                    ) : (
                      <TrendingDown className="h-3.5 w-3.5" />
                    )}
                    <span>
                      {isPositive ? '+' : ''}
                      {entry.delta.toFixed(1)} kg
                    </span>
                  </div>
                </div>
              )
            })}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

export { BiometricsTab }
export default BiometricsTab
