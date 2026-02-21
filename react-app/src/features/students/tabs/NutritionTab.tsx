import { useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import Plus from 'lucide-react/dist/esm/icons/plus'
import Utensils from 'lucide-react/dist/esm/icons/utensils'
import Flame from 'lucide-react/dist/esm/icons/flame'
import Calendar from 'lucide-react/dist/esm/icons/calendar'
import ChevronRight from 'lucide-react/dist/esm/icons/chevron-right'
import { Card, CardHeader, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { cn } from '@/lib/utils'

// ---------------------------------------------------------------------------
// Mock data
// ---------------------------------------------------------------------------

const currentDiet = {
  name: 'Dieta Hipertrofia - Fase 2',
  vet: 2850,
  protein: 200,
  carbs: 340,
  fat: 75,
  meals: 6,
  startDate: '2026-01-15',
  status: 'active' as const,
}

const macros = [
  { label: 'Proteína', value: `${currentDiet.protein}g`, pct: '28%', color: 'bg-red-400' },
  { label: 'Carboidrato', value: `${currentDiet.carbs}g`, pct: '48%', color: 'bg-yellow-400' },
  { label: 'Gordura', value: `${currentDiet.fat}g`, pct: '24%', color: 'bg-blue-400' },
]

const dietHistory = [
  {
    id: '1',
    name: 'Dieta Hipertrofia - Fase 1',
    period: '15/08/2025 - 14/01/2026',
    vet: 2600,
    status: 'completed' as const,
  },
  {
    id: '2',
    name: 'Dieta Cutting',
    period: '01/05/2025 - 14/08/2025',
    vet: 2200,
    status: 'completed' as const,
  },
  {
    id: '3',
    name: 'Dieta Base Inicial',
    period: '10/03/2025 - 30/04/2025',
    vet: 2400,
    status: 'completed' as const,
  },
]

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

function NutritionTab() {
  const navigate = useNavigate()

  return (
    <div className="space-y-6">
      {/* Current diet summary */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card>
          <CardHeader
            title="Dieta Atual"
            action={
              <Badge variant="success">Ativa</Badge>
            }
          />
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-500">
                  <Utensils className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-display font-semibold text-gray-900">
                    {currentDiet.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {currentDiet.meals} refeições/dia &middot; Início: {currentDiet.startDate}
                  </p>
                </div>
              </div>

              {/* VET */}
              <div className="flex items-center gap-2 rounded-xl bg-orange-50 px-4 py-3">
                <Flame className="h-5 w-5 text-orange-500" />
                <div>
                  <p className="text-xs text-orange-600">Valor Energético Total</p>
                  <p className="font-display text-xl font-bold text-orange-700">
                    {currentDiet.vet.toLocaleString('pt-BR')} kcal
                  </p>
                </div>
              </div>

              {/* Macro distribution */}
              <div>
                <p className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-500">
                  Distribuição de Macros
                </p>

                {/* Bar */}
                <div className="flex h-3 overflow-hidden rounded-full">
                  <div className="bg-red-400" style={{ width: '28%' }} />
                  <div className="bg-yellow-400" style={{ width: '48%' }} />
                  <div className="bg-blue-400" style={{ width: '24%' }} />
                </div>

                {/* Legend */}
                <div className="mt-3 grid grid-cols-3 gap-3">
                  {macros.map((macro) => (
                    <div key={macro.label} className="text-center">
                      <div className="flex items-center justify-center gap-1.5 text-xs text-gray-500">
                        <span className={cn('inline-block h-2 w-2 rounded-full', macro.color)} />
                        {macro.label}
                      </div>
                      <p className="font-display text-sm font-bold text-gray-900">
                        {macro.value}
                      </p>
                      <p className="text-[10px] text-gray-400">{macro.pct}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Create new diet */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <Button
          variant="primary"
          iconLeft={<Plus className="h-4 w-4" />}
          onClick={() => navigate('/nutrition/diets/new')}
        >
          Criar Nova Dieta
        </Button>
      </motion.div>

      {/* Diet history */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.15 }}
      >
        <Card>
          <CardHeader title="Histórico de Dietas" />
          <CardContent className="divide-y divide-gray-50">
            {dietHistory.map((diet) => (
              <div
                key={diet.id}
                className="flex items-center gap-3 py-3 first:pt-0 last:pb-0"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-400">
                  <Calendar className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{diet.name}</p>
                  <p className="text-xs text-gray-500">
                    {diet.period} &middot; {diet.vet.toLocaleString('pt-BR')} kcal
                  </p>
                </div>
                <Badge variant="neutral">Encerrada</Badge>
                <ChevronRight className="h-4 w-4 shrink-0 text-gray-300" />
              </div>
            ))}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

export { NutritionTab }
export default NutritionTab
