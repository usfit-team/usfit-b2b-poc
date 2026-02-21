import { useNavigate, useParams } from 'react-router-dom'
import { motion } from 'motion/react'
import RefreshCw from 'lucide-react/dist/esm/icons/refresh-cw'
import XCircle from 'lucide-react/dist/esm/icons/x-circle'
import type { Contract, ContractStatus } from '@/types/contract'
import { formatCurrency, formatDate } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { BackButton } from '@/components/shared/BackButton'

// ---------------------------------------------------------------------------
// Mock data
// ---------------------------------------------------------------------------

const mockContract: Contract = {
  id: '1',
  studentName: 'Lucas Oliveira',
  studentId: 's1',
  service: 'Personal Trainer',
  status: 'active',
  startDate: '2025-08-01',
  endDate: '2026-08-01',
  value: 450,
  paymentFrequency: 'monthly',
}

interface Payment {
  id: string
  date: string
  value: number
  status: 'paid' | 'pending' | 'overdue'
}

const mockPayments: Payment[] = [
  { id: 'p1', date: '2026-02-01', value: 450, status: 'paid' },
  { id: 'p2', date: '2026-01-01', value: 450, status: 'paid' },
  { id: 'p3', date: '2025-12-01', value: 450, status: 'paid' },
  { id: 'p4', date: '2025-11-01', value: 450, status: 'paid' },
  { id: 'p5', date: '2025-10-01', value: 450, status: 'paid' },
]

const statusConfig: Record<ContractStatus, { label: string; variant: 'success' | 'warning' | 'danger' | 'neutral' }> = {
  active: { label: 'Ativo', variant: 'success' },
  expiring: { label: 'Vencendo', variant: 'warning' },
  expired: { label: 'Vencido', variant: 'danger' },
  cancelled: { label: 'Cancelado', variant: 'neutral' },
}

const paymentStatusConfig: Record<string, { label: string; variant: 'paid' | 'pending' | 'overdue' }> = {
  paid: { label: 'Pago', variant: 'paid' },
  pending: { label: 'Pendente', variant: 'pending' },
  overdue: { label: 'Atrasado', variant: 'overdue' },
}

const frequencyLabels: Record<string, string> = {
  monthly: 'Mensal',
  quarterly: 'Trimestral',
  annual: 'Anual',
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

function ContractDetailsPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const contract = mockContract
  const status = statusConfig[contract.status]

  return (
    <div className="space-y-6">
      <BackButton />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <h1 className="font-display text-2xl font-bold text-gray-900">
            Contrato #{id}
          </h1>
          <p className="mt-1 text-sm text-gray-500">Detalhes e histórico de pagamentos</p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="primary"
            size="sm"
            iconLeft={<RefreshCw className="h-4 w-4" />}
            onClick={() => navigate(`/contracts/${id}/renew`)}
          >
            Renovar
          </Button>
          <Button
            variant="danger"
            size="sm"
            iconLeft={<XCircle className="h-4 w-4" />}
          >
            Cancelar
          </Button>
        </div>
      </motion.div>

      {/* Contract info */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.1 }}
      >
        <Card>
          <CardHeader title="Informações do Contrato" />
          <CardContent>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">Aluno</p>
                <p className="mt-1 text-sm font-semibold text-gray-900">{contract.studentName}</p>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">Serviço</p>
                <p className="mt-1 text-sm font-semibold text-gray-900">{contract.service}</p>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">Status</p>
                <div className="mt-1">
                  <Badge variant={status.variant}>{status.label}</Badge>
                </div>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">Início</p>
                <p className="mt-1 text-sm text-gray-700">{formatDate(contract.startDate)}</p>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">Fim</p>
                <p className="mt-1 text-sm text-gray-700">{formatDate(contract.endDate)}</p>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">Valor</p>
                <p className="mt-1 text-sm font-semibold text-gray-900">
                  {formatCurrency(contract.value)}/{frequencyLabels[contract.paymentFrequency]?.toLowerCase()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Payment history */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.2 }}
      >
        <Card>
          <CardHeader title="Histórico de Pagamentos" />
          <div className="w-full overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Data</th>
                  <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Valor</th>
                  <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Status</th>
                </tr>
              </thead>
              <tbody>
                {mockPayments.map((payment) => {
                  const pStatus = paymentStatusConfig[payment.status]
                  return (
                    <tr
                      key={payment.id}
                      className="border-b border-gray-50 transition-colors duration-150 hover:bg-gray-50/80"
                    >
                      <td className="px-6 py-3 text-gray-700">{formatDate(payment.date)}</td>
                      <td className="px-6 py-3 font-medium text-gray-900">{formatCurrency(payment.value)}</td>
                      <td className="px-6 py-3">
                        <Badge variant={pStatus.variant}>{pStatus.label}</Badge>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}

export { ContractDetailsPage }
export default ContractDetailsPage
