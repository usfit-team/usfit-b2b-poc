import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import Plus from 'lucide-react/dist/esm/icons/plus'
import FileText from 'lucide-react/dist/esm/icons/file-text'
import Users from 'lucide-react/dist/esm/icons/users'
import Zap from 'lucide-react/dist/esm/icons/zap'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'

// ── Types ──────────────────────────────────────────────────

interface DietTemplate {
  id: string
  name: string
  description: string
  vet: number
  protein: number
  carbs: number
  fat: number
  mealsCount: number
  timesUsed: number
  category: string
}

// ── Mock Data ──────────────────────────────────────────────

const MOCK_TEMPLATES: DietTemplate[] = [
  {
    id: 't1',
    name: 'Hipertrofia Iniciante',
    description: 'Plano para ganho de massa muscular com superávit calórico moderado. Ideal para alunos iniciantes.',
    vet: 3000,
    protein: 160,
    carbs: 350,
    fat: 80,
    mealsCount: 6,
    timesUsed: 12,
    category: 'Hipertrofia',
  },
  {
    id: 't2',
    name: 'Cutting Avançado',
    description: 'Plano de déficit calórico para alunos avançados com alto percentual de proteína para preservação muscular.',
    vet: 1800,
    protein: 180,
    carbs: 120,
    fat: 55,
    mealsCount: 5,
    timesUsed: 8,
    category: 'Cutting',
  },
  {
    id: 't3',
    name: 'Manutenção Saudável',
    description: 'Plano equilibrado para manutenção de peso corporal com distribuição balanceada de macronutrientes.',
    vet: 2400,
    protein: 140,
    carbs: 280,
    fat: 70,
    mealsCount: 5,
    timesUsed: 15,
    category: 'Manutenção',
  },
  {
    id: 't4',
    name: 'Low Carb Feminino',
    description: 'Plano com restricao moderada de carboidratos voltado para emagrecimento feminino saudavel.',
    vet: 1600,
    protein: 120,
    carbs: 100,
    fat: 75,
    mealsCount: 5,
    timesUsed: 6,
    category: 'Low Carb',
  },
]

const CATEGORY_COLORS: Record<string, string> = {
  Hipertrofia: 'bg-blue-100 text-blue-700',
  Cutting: 'bg-red-100 text-red-700',
  Manutencao: 'bg-green-100 text-green-700',
  'Low Carb': 'bg-purple-100 text-purple-700',
}

// ── Component ──────────────────────────────────────────────

export default function DietTemplatesListPage() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    if (!search) return MOCK_TEMPLATES
    const lc = search.toLowerCase()
    return MOCK_TEMPLATES.filter(
      (t) =>
        t.name.toLowerCase().includes(lc) ||
        t.description.toLowerCase().includes(lc) ||
        t.category.toLowerCase().includes(lc),
    )
  }, [search])

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
          <h1 className="font-display text-2xl font-bold text-gray-900">
            Templates de Dieta
          </h1>
          <p className="text-sm text-gray-500">
            Modelos reutilizaveis para agilizar a prescricao
          </p>
        </div>
        <Button iconLeft={<Plus className="h-4 w-4" />}>
          Novo Template
        </Button>
      </div>

      {/* Search */}
      <div className="max-w-sm">
        <Input
          variant="search"
          placeholder="Buscar template..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((template, idx) => (
          <motion.div
            key={template.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: idx * 0.05 }}
          >
            <Card hover className="flex h-full flex-col">
              <CardContent className="flex flex-1 flex-col gap-4">
                {/* Category Badge */}
                <div className="flex items-center justify-between">
                  <span
                    className={cn(
                      'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
                      CATEGORY_COLORS[template.category] ?? 'bg-gray-100 text-gray-600',
                    )}
                  >
                    {template.category}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-gray-400">
                    <Users className="h-3 w-3" />
                    <span>{template.timesUsed}x</span>
                  </div>
                </div>

                {/* Name & Description */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">
                    {template.name}
                  </h3>
                  <p className="mt-1 text-xs text-gray-500 line-clamp-2">
                    {template.description}
                  </p>
                </div>

                {/* VET */}
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-usfit-cyan" />
                  <span className="text-sm font-bold text-gray-900">
                    {template.vet} kcal
                  </span>
                </div>

                {/* Macro Summary */}
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <span>
                    P: <strong className="text-gray-700">{template.protein}g</strong>
                  </span>
                  <span>
                    C: <strong className="text-gray-700">{template.carbs}g</strong>
                  </span>
                  <span>
                    G: <strong className="text-gray-700">{template.fat}g</strong>
                  </span>
                </div>

                {/* Meals Count */}
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <FileText className="h-3.5 w-3.5" />
                  <span>{template.mealsCount} refeicoes</span>
                </div>

                {/* Actions */}
                <div className="mt-auto flex gap-2 pt-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    className="flex-1"
                    onClick={() => navigate(`/nutrition/templates/${template.id}/assign`)}
                  >
                    Atribuir
                  </Button>
                  <Button variant="ghost" size="sm" className="flex-1">
                    Editar
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filtered.length === 0 ? (
        <div className="py-12 text-center">
          <FileText className="mx-auto h-12 w-12 text-gray-300" />
          <p className="mt-2 text-sm text-gray-500">
            Nenhum template encontrado
          </p>
        </div>
      ) : null}
    </motion.div>
  )
}
