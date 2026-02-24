import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import Plus from 'lucide-react/dist/esm/icons/plus'
import Eye from 'lucide-react/dist/esm/icons/eye'
import Pencil from 'lucide-react/dist/esm/icons/pencil'
import Copy from 'lucide-react/dist/esm/icons/copy'
import type { Diet } from '@/types/nutrition'
import { cn, formatDate } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'
import { Card, CardContent } from '@/components/ui/Card'
import { DataTable } from '@/components/ui/DataTable'
import type { Column } from '@/components/ui/DataTable'
import { Pagination } from '@/components/ui/Pagination'
import { FilterTabs } from '@/components/ui/FilterTabs'

// ── Mock Data ──────────────────────────────────────────────

const MOCK_DIETS: Diet[] = [
  {
    id: '1',
    name: 'Plano Hipertrofia',
    studentName: 'Carlos Almeida',
    status: 'active',
    createdAt: '2026-02-10',
    vet: 3200,
    meals: [],
  },
  {
    id: '2',
    name: 'Plano Cutting',
    studentName: 'Ana Paula Souza',
    status: 'active',
    createdAt: '2026-02-08',
    vet: 1800,
    meals: [],
  },
  {
    id: '3',
    name: 'Plano Manutenção',
    studentName: 'Roberto Lima',
    status: 'draft',
    createdAt: '2026-02-15',
    vet: 2500,
    meals: [],
  },
  {
    id: '4',
    name: 'Plano Bulking',
    studentName: 'Fernanda Costa',
    status: 'active',
    createdAt: '2026-01-20',
    vet: 3500,
    meals: [],
  },
  {
    id: '5',
    name: 'Plano Emagrecimento',
    studentName: 'Marcos Oliveira',
    status: 'expired',
    createdAt: '2025-12-10',
    vet: 1600,
    meals: [],
  },
]

const STATUS_MAP = {
  active: { label: 'Ativo', variant: 'success' as const },
  draft: { label: 'Rascunho', variant: 'warning' as const },
  expired: { label: 'Expirado', variant: 'neutral' as const },
}

const FILTER_TABS = [
  { label: 'Todos', value: 'all', count: 5 },
  { label: 'Ativos', value: 'active', count: 3 },
  { label: 'Rascunho', value: 'draft', count: 1 },
  { label: 'Expirados', value: 'expired', count: 1 },
]

// ── Component ──────────────────────────────────────────────

export default function DietsListPage() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [activeTab, setActiveTab] = useState('all')
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => {
    return MOCK_DIETS.filter((diet) => {
      const matchSearch =
        diet.name.toLowerCase().includes(search.toLowerCase()) ||
        diet.studentName.toLowerCase().includes(search.toLowerCase())
      const matchTab = activeTab === 'all' ? true : diet.status === activeTab
      return matchSearch && matchTab
    })
  }, [search, activeTab])

  const columns: Column<Diet>[] = [
    {
      key: 'name',
      header: 'Plano',
      render: (row) => (
        <span className="font-medium text-gray-900">{row.name}</span>
      ),
    },
    {
      key: 'studentName',
      header: 'Aluno',
      render: (row) => (
        <span className="text-gray-700">{row.studentName}</span>
      ),
    },
    {
      key: 'vet',
      header: 'VET',
      render: (row) => (
        <span className="font-semibold text-gray-900">{row.vet} kcal</span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (row) => {
        const status = STATUS_MAP[row.status]
        return <Badge variant={status.variant}>{status.label}</Badge>
      },
    },
    {
      key: 'createdAt',
      header: 'Data',
      render: (row) => (
        <span className="text-gray-500">{formatDate(row.createdAt)}</span>
      ),
    },
    {
      key: 'actions',
      header: 'Ações',
      render: () => (
        <div className="flex items-center gap-1">
          <button
            type="button"
            className="rounded-full p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-usfit-blue"
            title="Visualizar"
          >
            <Eye className="h-4 w-4" />
          </button>
          <button
            type="button"
            className="rounded-full p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-usfit-blue"
            title="Editar"
          >
            <Pencil className="h-4 w-4" />
          </button>
          <button
            type="button"
            className="rounded-full p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-usfit-blue"
            title="Duplicar"
          >
            <Copy className="h-4 w-4" />
          </button>
        </div>
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
            Planos Nutricionais
          </h1>
          <p className="text-sm text-gray-500">
            Gerencie os planos alimentares dos seus alunos
          </p>
        </div>
        <Button
          iconLeft={<Plus className="h-4 w-4" />}
          onClick={() => navigate('/nutrition/diets/create')}
        >
          Novo Plano
        </Button>
      </div>

      {/* Search + Filters */}
      <Card>
        <CardContent className="space-y-4">
          <div className="max-w-sm">
            <Input
              variant="search"
              placeholder="Buscar plano ou aluno..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <FilterTabs
            tabs={FILTER_TABS}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />

          <DataTable
            columns={columns}
            data={filtered}
            keyExtractor={(row) => row.id}
          />

          <Pagination
            currentPage={page}
            totalPages={2}
            totalResults={filtered.length}
            onPageChange={setPage}
          />
        </CardContent>
      </Card>
    </motion.div>
  )
}
