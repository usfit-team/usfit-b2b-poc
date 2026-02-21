import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import Plus from 'lucide-react/dist/esm/icons/plus'
import Eye from 'lucide-react/dist/esm/icons/eye'
import Pencil from 'lucide-react/dist/esm/icons/pencil'
import Trash2 from 'lucide-react/dist/esm/icons/trash-2'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { DataTable } from '@/components/ui/DataTable'
import { Pagination } from '@/components/ui/Pagination'
import { FilterTabs } from '@/components/ui/FilterTabs'
import type { Column } from '@/components/ui/DataTable'

interface ExerciseRow {
  id: string
  name: string
  muscleGroup: string
  equipment: string
  category: string
}

const mockExercises: ExerciseRow[] = [
  { id: '1', name: 'Supino Reto', muscleGroup: 'Peitoral', equipment: 'Barra', category: 'peito' },
  { id: '2', name: 'Supino Inclinado', muscleGroup: 'Peitoral Superior', equipment: 'Halteres', category: 'peito' },
  { id: '3', name: 'Agachamento Livre', muscleGroup: 'Quadríceps', equipment: 'Barra', category: 'pernas' },
  { id: '4', name: 'Leg Press 45°', muscleGroup: 'Quadríceps', equipment: 'Máquina', category: 'pernas' },
  { id: '5', name: 'Remada Curvada', muscleGroup: 'Dorsal', equipment: 'Barra', category: 'costas' },
  { id: '6', name: 'Puxada Frontal', muscleGroup: 'Dorsal', equipment: 'Cabo', category: 'costas' },
  { id: '7', name: 'Desenvolvimento Militar', muscleGroup: 'Deltóide', equipment: 'Barra', category: 'ombros' },
  { id: '8', name: 'Rosca Direta', muscleGroup: 'Bíceps', equipment: 'Barra', category: 'bracos' },
  { id: '9', name: 'Tríceps Pulley', muscleGroup: 'Tríceps', equipment: 'Cabo', category: 'bracos' },
  { id: '10', name: 'Prancha Abdominal', muscleGroup: 'Core', equipment: 'Corporal', category: 'core' },
]

const filterTabs = [
  { label: 'Todos', value: 'all', count: 10 },
  { label: 'Peito', value: 'peito', count: 2 },
  { label: 'Costas', value: 'costas', count: 2 },
  { label: 'Pernas', value: 'pernas', count: 2 },
  { label: 'Ombros', value: 'ombros', count: 1 },
  { label: 'Braços', value: 'bracos', count: 2 },
  { label: 'Core', value: 'core', count: 1 },
]

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
}

function ExercisesListPage() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [activeTab, setActiveTab] = useState('all')
  const [page, setPage] = useState(1)

  const filtered = mockExercises
    .filter((ex) => (activeTab === 'all' ? true : ex.category === activeTab))
    .filter((ex) =>
      search.trim() === ''
        ? true
        : ex.name.toLowerCase().includes(search.toLowerCase()) ||
          ex.muscleGroup.toLowerCase().includes(search.toLowerCase()),
    )

  const categoryVariant: Record<string, 'info' | 'success' | 'warning' | 'danger' | 'neutral'> = {
    peito: 'info',
    costas: 'success',
    pernas: 'warning',
    ombros: 'danger',
    bracos: 'info',
    core: 'neutral',
  }

  const columns: Column<ExerciseRow>[] = [
    {
      key: 'name',
      header: 'Exercício',
      render: (row) => (
        <span className="font-medium text-gray-900">{row.name}</span>
      ),
    },
    {
      key: 'muscleGroup',
      header: 'Grupo Muscular',
      render: (row) => (
        <Badge variant={categoryVariant[row.category] ?? 'neutral'}>
          {row.muscleGroup}
        </Badge>
      ),
    },
    {
      key: 'equipment',
      header: 'Equipamento',
    },
    {
      key: 'actions',
      header: 'Ações',
      render: () => (
        <div className="flex items-center gap-1">
          <button
            type="button"
            className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
          >
            <Eye className="h-4 w-4" />
          </button>
          <button
            type="button"
            className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
          >
            <Pencil className="h-4 w-4" />
          </button>
          <button
            type="button"
            className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ),
    },
  ]

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      {/* Header */}
      <motion.div variants={item} className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-gray-900">
            Banco de Exercícios
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Gerencie sua biblioteca de exercícios.
          </p>
        </div>
        <Button
          iconLeft={<Plus className="h-4 w-4" />}
          onClick={() => navigate('/workouts/exercises/create')}
        >
          Novo Exercício
        </Button>
      </motion.div>

      {/* Search + Filters */}
      <motion.div variants={item} className="space-y-4">
        <div className="max-w-sm">
          <Input
            variant="search"
            placeholder="Buscar exercício..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <FilterTabs tabs={filterTabs} activeTab={activeTab} onTabChange={setActiveTab} />
      </motion.div>

      {/* Table */}
      <motion.div variants={item} className="rounded-2xl border border-gray-100 bg-white shadow-sm">
        <DataTable
          columns={columns}
          data={filtered}
          keyExtractor={(row) => row.id}
        />
      </motion.div>

      {/* Pagination */}
      <motion.div variants={item}>
        <Pagination
          currentPage={page}
          totalPages={2}
          totalResults={filtered.length}
          onPageChange={setPage}
        />
      </motion.div>
    </motion.div>
  )
}

export default ExercisesListPage
