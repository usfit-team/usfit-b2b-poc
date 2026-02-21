import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import Plus from 'lucide-react/dist/esm/icons/plus'
import Apple from 'lucide-react/dist/esm/icons/apple'
import type { Food } from '@/types/nutrition'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardContent } from '@/components/ui/Card'
import { DataTable } from '@/components/ui/DataTable'
import type { Column } from '@/components/ui/DataTable'
import { Pagination } from '@/components/ui/Pagination'
import { FilterTabs } from '@/components/ui/FilterTabs'
import { Badge } from '@/components/ui/Badge'

// ── Mock Data ──────────────────────────────────────────────

const MOCK_FOODS: Food[] = [
  { id: '1', name: 'Arroz Branco Cozido', category: 'Cereais', calories: 130, protein: 2.7, carbs: 28, fat: 0.3, fiber: 0.4, portion: '100g' },
  { id: '2', name: 'Feijao Carioca Cozido', category: 'Leguminosas', calories: 76, protein: 4.8, carbs: 13.6, fat: 0.5, fiber: 8.5, portion: '100g' },
  { id: '3', name: 'Frango Grelhado (Peito)', category: 'Proteinas', calories: 165, protein: 31, carbs: 0, fat: 3.6, fiber: 0, portion: '100g' },
  { id: '4', name: 'Batata Doce Cozida', category: 'Tuberculos', calories: 86, protein: 1.6, carbs: 20, fat: 0.1, fiber: 3, portion: '100g' },
  { id: '5', name: 'Ovo Inteiro Cozido', category: 'Proteinas', calories: 155, protein: 13, carbs: 1.1, fat: 11, fiber: 0, portion: '100g' },
  { id: '6', name: 'Banana Prata', category: 'Frutas', calories: 89, protein: 1.1, carbs: 23, fat: 0.3, fiber: 2.6, portion: '100g' },
  { id: '7', name: 'Aveia em Flocos', category: 'Cereais', calories: 389, protein: 16.9, carbs: 66, fat: 6.9, fiber: 10.6, portion: '100g' },
  { id: '8', name: 'Azeite de Oliva', category: 'Oleos', calories: 884, protein: 0, carbs: 0, fat: 100, fiber: 0, portion: '100ml' },
]

const CATEGORY_TABS = [
  { label: 'Todos', value: 'all', count: 8 },
  { label: 'Proteinas', value: 'Proteinas', count: 2 },
  { label: 'Cereais', value: 'Cereais', count: 2 },
  { label: 'Frutas', value: 'Frutas', count: 1 },
  { label: 'Leguminosas', value: 'Leguminosas', count: 1 },
  { label: 'Tuberculos', value: 'Tuberculos', count: 1 },
  { label: 'Oleos', value: 'Oleos', count: 1 },
]

const CATEGORY_BADGE_MAP: Record<string, 'success' | 'info' | 'warning' | 'danger' | 'neutral'> = {
  Proteinas: 'danger',
  Cereais: 'warning',
  Frutas: 'success',
  Leguminosas: 'info',
  Tuberculos: 'neutral',
  Oleos: 'warning',
}

// ── Component ──────────────────────────────────────────────

export default function FoodsListPage() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [activeTab, setActiveTab] = useState('all')
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => {
    return MOCK_FOODS.filter((food) => {
      const matchSearch = food.name.toLowerCase().includes(search.toLowerCase())
      const matchTab = activeTab === 'all' ? true : food.category === activeTab
      return matchSearch && matchTab
    })
  }, [search, activeTab])

  const columns: Column<Food>[] = [
    {
      key: 'name',
      header: 'Alimento',
      render: (row) => (
        <div className="flex items-center gap-2">
          <Apple className="h-4 w-4 text-green-500" />
          <span className="font-medium text-gray-900">{row.name}</span>
        </div>
      ),
    },
    {
      key: 'category',
      header: 'Categoria',
      render: (row) => (
        <Badge variant={CATEGORY_BADGE_MAP[row.category] ?? 'neutral'}>
          {row.category}
        </Badge>
      ),
    },
    {
      key: 'calories',
      header: 'Calorias',
      render: (row) => (
        <span className="font-semibold text-gray-900">{row.calories} kcal</span>
      ),
    },
    {
      key: 'protein',
      header: 'Proteina',
      render: (row) => (
        <span className="text-gray-700">{row.protein}g</span>
      ),
    },
    {
      key: 'carbs',
      header: 'Carboidrato',
      render: (row) => (
        <span className="text-gray-700">{row.carbs}g</span>
      ),
    },
    {
      key: 'fat',
      header: 'Gordura',
      render: (row) => (
        <span className="text-gray-700">{row.fat}g</span>
      ),
    },
    {
      key: 'portion',
      header: 'Porcao',
      render: (row) => (
        <span className="text-gray-500">{row.portion}</span>
      ),
    },
  ]

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
            Banco de Alimentos
          </h1>
          <p className="text-sm text-gray-500">
            Consulte e gerencie o banco de dados de alimentos
          </p>
        </div>
        <Button
          iconLeft={<Plus className="h-4 w-4" />}
          onClick={() => navigate('/nutrition/foods/create')}
        >
          Novo Alimento
        </Button>
      </div>

      {/* Content */}
      <Card>
        <CardContent className="space-y-4">
          {/* Search */}
          <div className="max-w-sm">
            <Input
              variant="search"
              placeholder="Buscar alimento..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Category Filter */}
          <FilterTabs
            tabs={CATEGORY_TABS}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />

          {/* Table */}
          <DataTable
            columns={columns}
            data={filtered}
            keyExtractor={(row) => row.id}
          />

          {/* Pagination */}
          <Pagination
            currentPage={page}
            totalPages={1}
            totalResults={filtered.length}
            onPageChange={setPage}
          />
        </CardContent>
      </Card>
    </motion.div>
  )
}
