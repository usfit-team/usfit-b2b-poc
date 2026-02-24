import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import Plus from 'lucide-react/dist/esm/icons/plus'
import Eye from 'lucide-react/dist/esm/icons/eye'
import Pencil from 'lucide-react/dist/esm/icons/pencil'
import Trash2 from 'lucide-react/dist/esm/icons/trash-2'
import type { Workout } from '@/types/workout'
import { cn } from '@/lib/utils'
import { formatDate } from '@/lib/utils'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { DataTable } from '@/components/ui/DataTable'
import { Pagination } from '@/components/ui/Pagination'
import { FilterTabs } from '@/components/ui/FilterTabs'
import type { Column } from '@/components/ui/DataTable'
import type { BadgeVariant } from '@/components/ui/Badge'

const mockWorkouts: Workout[] = [
  {
    id: '1',
    name: 'Hipertrofia Avançado',
    studentName: 'João Silva',
    status: 'active',
    createdAt: '2026-01-15',
    days: [],
  },
  {
    id: '2',
    name: 'Emagrecimento Feminino',
    studentName: 'Maria Santos',
    status: 'active',
    createdAt: '2026-01-20',
    days: [],
  },
  {
    id: '3',
    name: 'Força e Potência',
    studentName: 'Pedro Costa',
    status: 'draft',
    createdAt: '2026-02-01',
    days: [],
  },
  {
    id: '4',
    name: 'Reabilitação Ombro',
    studentName: 'Ana Oliveira',
    status: 'expired',
    createdAt: '2025-10-10',
    days: [],
  },
  {
    id: '5',
    name: 'Condicionamento Geral',
    studentName: 'Lucas Mendes',
    status: 'active',
    createdAt: '2026-02-10',
    days: [],
  },
]

const statusConfig: Record<Workout['status'], { label: string; variant: BadgeVariant }> = {
  active: { label: 'Ativo', variant: 'success' },
  draft: { label: 'Rascunho', variant: 'warning' },
  expired: { label: 'Expirado', variant: 'danger' },
}

const filterTabs = [
  { label: 'Todos', value: 'all', count: 5 },
  { label: 'Ativos', value: 'active', count: 3 },
  { label: 'Rascunho', value: 'draft', count: 1 },
  { label: 'Expirados', value: 'expired', count: 1 },
]

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
}

function WorkoutsListPage() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [activeTab, setActiveTab] = useState('all')
  const [page, setPage] = useState(1)

  const filtered = mockWorkouts
    .filter((w) => (activeTab === 'all' ? true : w.status === activeTab))
    .filter((w) =>
      search.trim() === ''
        ? true
        : w.name.toLowerCase().includes(search.toLowerCase()) ||
          w.studentName.toLowerCase().includes(search.toLowerCase()),
    )

  const columns: Column<Workout>[] = [
    {
      key: 'name',
      header: 'Treino',
      render: (row) => (
        <span className="font-medium text-gray-900">{row.name}</span>
      ),
    },
    {
      key: 'studentName',
      header: 'Aluno',
    },
    {
      key: 'status',
      header: 'Status',
      render: (row) => {
        const cfg = statusConfig[row.status]
        return <Badge variant={cfg.variant}>{cfg.label}</Badge>
      },
    },
    {
      key: 'createdAt',
      header: 'Criado em',
      render: (row) => formatDate(row.createdAt),
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
          <h1 className="font-display text-2xl font-bold text-gray-900">Treinos</h1>
          <p className="mt-1 text-sm text-gray-500">Gerencie os planos de treino dos seus alunos.</p>
        </div>
        <Button
          iconLeft={<Plus className="h-4 w-4" />}
          onClick={() => navigate('/workouts/create')}
        >
          Novo Treino
        </Button>
      </motion.div>

      {/* Search + Filters */}
      <motion.div variants={item} className="space-y-4">
        <div className="max-w-sm">
          <Input
            variant="search"
            placeholder="Buscar treino ou aluno..."
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

export default WorkoutsListPage
