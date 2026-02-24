import { useState } from 'react'
import { motion } from 'motion/react'
import DollarSign from 'lucide-react/dist/esm/icons/dollar-sign'
import Clock from 'lucide-react/dist/esm/icons/clock'
import AlertCircle from 'lucide-react/dist/esm/icons/alert-circle'
import Eye from 'lucide-react/dist/esm/icons/eye'
import Send from 'lucide-react/dist/esm/icons/send'
import type { Invoice, InvoiceStatus } from '@/types/financial'
import { cn, formatCurrency, formatDate } from '@/lib/utils'
import { Badge } from '@/components/ui/Badge'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { Toggle } from '@/components/ui/Toggle'
import { KpiCard } from '@/features/dashboard/components/KpiCard'

// ---------------------------------------------------------------------------
// Mock data
// ---------------------------------------------------------------------------

const mockInvoices: Invoice[] = [
  {
    id: 'inv1',
    studentName: 'Lucas Oliveira',
    description: 'Personal Trainer - Fevereiro',
    value: 450,
    dueDate: '2026-02-10',
    status: 'paid',
    paidAt: '2026-02-08',
  },
  {
    id: 'inv2',
    studentName: 'Mariana Santos',
    description: 'Nutrição - Fevereiro',
    value: 350,
    dueDate: '2026-02-15',
    status: 'paid',
    paidAt: '2026-02-14',
  },
  {
    id: 'inv3',
    studentName: 'Rafael Costa',
    description: 'Completo - Trimestral',
    value: 1800,
    dueDate: '2026-02-20',
    status: 'pending',
  },
  {
    id: 'inv4',
    studentName: 'Camila Ferreira',
    description: 'Personal Trainer - Fevereiro',
    value: 400,
    dueDate: '2026-01-10',
    status: 'overdue',
  },
  {
    id: 'inv5',
    studentName: 'Thiago Almeida',
    description: 'Nutrição - Anual',
    value: 3600,
    dueDate: '2026-02-25',
    status: 'pending',
  },
  {
    id: 'inv6',
    studentName: 'Beatriz Nascimento',
    description: 'Completo - Fevereiro',
    value: 600,
    dueDate: '2026-02-05',
    status: 'paid',
    paidAt: '2026-02-05',
  },
  {
    id: 'inv7',
    studentName: 'Pedro Henrique',
    description: 'Personal Trainer - Janeiro',
    value: 450,
    dueDate: '2026-01-15',
    status: 'overdue',
  },
  {
    id: 'inv8',
    studentName: 'Julia Rodrigues',
    description: 'Nutrição - Fevereiro',
    value: 350,
    dueDate: '2026-02-18',
    status: 'paid',
    paidAt: '2026-02-17',
  },
]

const statusConfig: Record<InvoiceStatus, { label: string; variant: 'paid' | 'pending' | 'overdue' }> = {
  paid: { label: 'Pago', variant: 'paid' },
  pending: { label: 'Pendente', variant: 'pending' },
  overdue: { label: 'Atrasado', variant: 'overdue' },
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

function FinancialDashboardPage() {
  const [isConsultoria, setIsConsultoria] = useState(false)

  const totalRevenue = mockInvoices
    .filter((inv) => inv.status === 'paid')
    .reduce((sum, inv) => sum + inv.value, 0)

  const pendingAmount = mockInvoices
    .filter((inv) => inv.status === 'pending')
    .reduce((sum, inv) => sum + inv.value, 0)

  const overdueAmount = mockInvoices
    .filter((inv) => inv.status === 'overdue')
    .reduce((sum, inv) => sum + inv.value, 0)

  const monthlyRevenue = [
    { month: 'Set', value: 4200 },
    { month: 'Out', value: 5100 },
    { month: 'Nov', value: 4800 },
    { month: 'Dez', value: 5600 },
    { month: 'Jan', value: 5200 },
    { month: 'Fev', value: totalRevenue },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-gray-900">Financeiro</h1>
          <p className="mt-1 text-sm text-gray-500">Gerencie receitas, cobranças e faturas.</p>
        </div>
        <div className="flex items-center gap-3">
          <span className={cn('text-sm font-medium', isConsultoria ? 'text-gray-400' : 'text-gray-900')}>
            Autônomo
          </span>
          <Toggle checked={isConsultoria} onChange={setIsConsultoria} />
          <span className={cn('text-sm font-medium', isConsultoria ? 'text-gray-900' : 'text-gray-400')}>
            Consultoria
          </span>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <KpiCard
          title="Receita Total"
          value={formatCurrency(totalRevenue)}
          icon={DollarSign}
          color="green"
          subtitle="mês atual"
        />
        <KpiCard
          title="Pendente"
          value={formatCurrency(pendingAmount)}
          icon={Clock}
          color="yellow"
          subtitle="a receber"
        />
        <KpiCard
          title="Vencido"
          value={formatCurrency(overdueAmount)}
          icon={AlertCircle}
          color="purple"
          subtitle="em atraso"
        />
      </div>

      {/* Monthly revenue summary */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.1 }}
      >
        <Card>
          <CardHeader title="Receita Mensal" />
          <CardContent>
            <div className="flex items-end gap-3">
              {monthlyRevenue.map((item) => {
                const maxVal = Math.max(...monthlyRevenue.map((m) => m.value))
                const heightPct = (item.value / maxVal) * 100
                return (
                  <div key={item.month} className="flex flex-1 flex-col items-center gap-2">
                    <span className="text-xs font-semibold text-gray-700">
                      {formatCurrency(item.value)}
                    </span>
                    <div
                      className="w-full rounded-t-lg bg-usfit-gradient transition-all duration-500"
                      style={{ height: `${Math.max(heightPct, 10)}px`, minHeight: '10px', maxHeight: '120px' }}
                    />
                    <span className="text-xs text-gray-500">{item.month}</span>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Invoice table */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.2 }}
      >
        <Card>
          <CardHeader title="Faturas" />
          <div className="w-full overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Aluno</th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Descrição</th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Valor</th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Vencimento</th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Status</th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500 text-right">Ações</th>
                </tr>
              </thead>
              <tbody>
                {mockInvoices.map((invoice, index) => {
                  const status = statusConfig[invoice.status]
                  return (
                    <motion.tr
                      key={invoice.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25, delay: index * 0.04 }}
                      className="border-b border-gray-50 transition-colors duration-150 hover:bg-gray-50/80"
                    >
                      <td className="px-4 py-3 font-medium text-gray-900">{invoice.studentName}</td>
                      <td className="px-4 py-3 text-gray-700">{invoice.description}</td>
                      <td className="px-4 py-3 font-medium text-gray-900">{formatCurrency(invoice.value)}</td>
                      <td className="px-4 py-3 text-gray-500">{formatDate(invoice.dueDate)}</td>
                      <td className="px-4 py-3">
                        <Badge variant={status.variant}>{status.label}</Badge>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            type="button"
                            className="inline-flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors cursor-pointer"
                            title="Ver detalhes"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          {invoice.status !== 'paid' ? (
                            <button
                              type="button"
                              className="inline-flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-blue-50 hover:text-blue-600 transition-colors cursor-pointer"
                              title="Enviar cobrança"
                            >
                              <Send className="h-4 w-4" />
                            </button>
                          ) : null}
                        </div>
                      </td>
                    </motion.tr>
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

export { FinancialDashboardPage }
export default FinancialDashboardPage
