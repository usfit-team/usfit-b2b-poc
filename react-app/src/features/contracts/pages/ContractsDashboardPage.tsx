import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import Plus from 'lucide-react/dist/esm/icons/plus'
import FileText from 'lucide-react/dist/esm/icons/file-text'
import CheckCircle from 'lucide-react/dist/esm/icons/check-circle'
import AlertTriangle from 'lucide-react/dist/esm/icons/alert-triangle'
import XCircle from 'lucide-react/dist/esm/icons/x-circle'
import Eye from 'lucide-react/dist/esm/icons/eye'
import type { Contract, ContractStatus } from '@/types/contract'
import { cn, formatCurrency, formatDate } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { FilterTabs } from '@/components/ui/FilterTabs'
import { Pagination } from '@/components/ui/Pagination'
import { KpiCard } from '@/features/dashboard/components/KpiCard'

// ---------------------------------------------------------------------------
// Mock data
// ---------------------------------------------------------------------------

const mockContracts: Contract[] = [
  {
    id: '1',
    studentName: 'Lucas Oliveira',
    studentId: 's1',
    service: 'Personal Trainer',
    status: 'active',
    startDate: '2025-08-01',
    endDate: '2026-08-01',
    value: 450,
    paymentFrequency: 'monthly',
  },
  {
    id: '2',
    studentName: 'Mariana Santos',
    studentId: 's2',
    service: 'Nutrição',
    status: 'active',
    startDate: '2025-09-15',
    endDate: '2026-09-15',
    value: 350,
    paymentFrequency: 'monthly',
  },
  {
    id: '3',
    studentName: 'Rafael Costa',
    studentId: 's3',
    service: 'Completo',
    status: 'expiring',
    startDate: '2025-06-01',
    endDate: '2026-03-01',
    value: 1800,
    paymentFrequency: 'quarterly',
    daysRemaining: 8,
  },
  {
    id: '4',
    studentName: 'Camila Ferreira',
    studentId: 's4',
    service: 'Personal Trainer',
    status: 'expired',
    startDate: '2025-01-10',
    endDate: '2026-01-10',
    value: 400,
    paymentFrequency: 'monthly',
  },
  {
    id: '5',
    studentName: 'Thiago Almeida',
    studentId: 's5',
    service: 'Nutrição',
    status: 'active',
    startDate: '2025-11-01',
    endDate: '2026-11-01',
    value: 3600,
    paymentFrequency: 'annual',
  },
  {
    id: '6',
    studentName: 'Beatriz Nascimento',
    studentId: 's6',
    service: 'Completo',
    status: 'expiring',
    startDate: '2025-05-20',
    endDate: '2026-02-28',
    value: 600,
    paymentFrequency: 'monthly',
    daysRemaining: 7,
  },
]

const statusConfig: Record<ContractStatus, { label: string; variant: 'success' | 'warning' | 'danger' | 'neutral' }> = {
  active: { label: 'Ativo', variant: 'success' },
  expiring: { label: 'Vencendo', variant: 'warning' },
  expired: { label: 'Vencido', variant: 'danger' },
  cancelled: { label: 'Cancelado', variant: 'neutral' },
}

const frequencyLabels: Record<string, string> = {
  monthly: 'Mensal',
  quarterly: 'Trimestral',
  annual: 'Anual',
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

function ContractsDashboardPage() {
  const navigate = useNavigate()
  const [activeFilter, setActiveFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)

  const activeCount = mockContracts.filter((c) => c.status === 'active').length
  const expiringCount = mockContracts.filter((c) => c.status === 'expiring').length
  const expiredCount = mockContracts.filter((c) => c.status === 'expired').length

  const filterTabs = [
    { label: 'Todos', value: 'all', count: mockContracts.length },
    { label: 'Ativos', value: 'active', count: activeCount },
    { label: 'Vencendo', value: 'expiring', count: expiringCount },
    { label: 'Vencidos', value: 'expired', count: expiredCount },
  ]

  const filtered = mockContracts.filter((c) =>
    activeFilter === 'all' ? true : c.status === activeFilter,
  )

  return (
    <div className="space-y-6">
      {/* Stats row */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          title="Total Contratos"
          value={String(mockContracts.length)}
          icon={FileText}
          color="blue"
          subtitle="contratos cadastrados"
        />
        <KpiCard
          title="Ativos"
          value={String(activeCount)}
          icon={CheckCircle}
          color="green"
          subtitle="em vigência"
        />
        <KpiCard
          title="Vencendo"
          value={String(expiringCount)}
          icon={AlertTriangle}
          color="yellow"
          subtitle="próximos 30 dias"
        />
        <KpiCard
          title="Vencidos"
          value={String(expiredCount)}
          icon={XCircle}
          color="purple"
          subtitle="necessitam renovação"
        />
      </div>

      {/* Actions bar */}
      <div className="flex items-center justify-between">
        <FilterTabs
          tabs={filterTabs}
          activeTab={activeFilter}
          onTabChange={setActiveFilter}
        />
        <Button
          variant="primary"
          size="sm"
          iconLeft={<Plus className="h-4 w-4" />}
          onClick={() => navigate('/contracts/new')}
        >
          Novo Contrato
        </Button>
      </div>

      {/* Table */}
      <Card>
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Aluno</th>
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Serviço</th>
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Status</th>
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Início</th>
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Fim</th>
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Valor</th>
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500 text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-sm text-gray-400">
                    Nenhum contrato encontrado.
                  </td>
                </tr>
              ) : (
                filtered.map((contract, index) => {
                  const status = statusConfig[contract.status]
                  return (
                    <motion.tr
                      key={contract.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25, delay: index * 0.05 }}
                      onClick={() => navigate(`/contracts/${contract.id}`)}
                      className={cn(
                        'border-b border-gray-50 transition-colors duration-150',
                        'hover:bg-gray-50/80 cursor-pointer',
                      )}
                    >
                      <td className="px-4 py-3 font-medium text-gray-900">{contract.studentName}</td>
                      <td className="px-4 py-3 text-gray-700">{contract.service}</td>
                      <td className="px-4 py-3">
                        <Badge variant={status.variant}>{status.label}</Badge>
                      </td>
                      <td className="px-4 py-3 text-gray-500">{formatDate(contract.startDate)}</td>
                      <td className="px-4 py-3 text-gray-500">{formatDate(contract.endDate)}</td>
                      <td className="px-4 py-3 font-medium text-gray-900">
                        {formatCurrency(contract.value)}
                        <span className="text-xs text-gray-400 ml-1">/{frequencyLabels[contract.paymentFrequency]?.toLowerCase()}</span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation()
                            navigate(`/contracts/${contract.id}`)
                          }}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors cursor-pointer"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                      </td>
                    </motion.tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={2}
        totalResults={filtered.length}
        onPageChange={setCurrentPage}
      />
    </div>
  )
}

export { ContractsDashboardPage }
export default ContractsDashboardPage
