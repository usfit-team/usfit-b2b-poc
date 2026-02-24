import { motion } from 'motion/react'
import Check from 'lucide-react/dist/esm/icons/check'
import CreditCard from 'lucide-react/dist/esm/icons/credit-card'
import { cn, formatCurrency, formatDate } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'

// ---------------------------------------------------------------------------
// Mock data
// ---------------------------------------------------------------------------

const plans = [
  {
    name: 'Starter',
    price: 49,
    features: ['Até 10 alunos', '1 profissional', 'Módulo de Nutrição', 'Suporte por e-mail'],
    current: false,
  },
  {
    name: 'PRO',
    price: 149,
    features: ['Até 50 alunos', '5 profissionais', 'Todos os módulos', 'Relatórios avançados', 'Suporte prioritário'],
    current: true,
  },
  {
    name: 'Enterprise',
    price: 399,
    features: ['Alunos ilimitados', 'Profissionais ilimitados', 'Todos os módulos', 'API personalizada', 'Gerente de conta dedicado'],
    current: false,
  },
]

const invoiceHistory = [
  { id: 'b1', date: '2026-02-01', value: 149, status: 'paid' as const },
  { id: 'b2', date: '2026-01-01', value: 149, status: 'paid' as const },
  { id: 'b3', date: '2025-12-01', value: 149, status: 'paid' as const },
  { id: 'b4', date: '2025-11-01', value: 149, status: 'paid' as const },
]

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

function BillingTab() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Current plan */}
      <Card>
        <CardHeader title="Plano Atual" />
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display text-lg font-bold text-gray-900">Plano PRO</h3>
                <Badge variant="success">Ativo</Badge>
              </div>
              <p className="mt-1 text-sm text-gray-500">
                {formatCurrency(149)}/mês - Renovação em 01/03/2026
              </p>
            </div>
            <Button variant="outline" size="sm">Alterar Plano</Button>
          </div>
        </CardContent>
      </Card>

      {/* Plan comparison */}
      <Card>
        <CardHeader title="Comparação de Planos" />
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={cn(
                  'rounded-xl border p-5 transition-all',
                  plan.current
                    ? 'border-usfit-cyan bg-cyan-50/30 shadow-sm'
                    : 'border-gray-200 hover:border-gray-300',
                )}
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-display text-base font-bold text-gray-900">{plan.name}</h4>
                  {plan.current ? (
                    <Badge variant="info">Atual</Badge>
                  ) : null}
                </div>
                <p className="mt-2">
                  <span className="font-display text-2xl font-bold text-gray-900">
                    {formatCurrency(plan.price)}
                  </span>
                  <span className="text-sm text-gray-500">/mês</span>
                </p>
                <ul className="mt-4 space-y-2">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-gray-600">
                      <Check className="h-4 w-4 text-green-500 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                {!plan.current ? (
                  <Button variant="outline" size="sm" className="mt-4 w-full">
                    Selecionar
                  </Button>
                ) : null}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Payment method */}
      <Card>
        <CardHeader title="Método de Pagamento" />
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
                <CreditCard className="h-5 w-5 text-gray-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Visa terminando em 4242</p>
                <p className="text-xs text-gray-500">Expira em 12/2027</p>
              </div>
            </div>
            <Button variant="ghost" size="sm">Alterar</Button>
          </div>
        </CardContent>
      </Card>

      {/* Invoice history */}
      <Card>
        <CardHeader title="Histórico de Faturas" />
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
              {invoiceHistory.map((inv) => (
                <tr key={inv.id} className="border-b border-gray-50">
                  <td className="px-6 py-3 text-gray-700">{formatDate(inv.date)}</td>
                  <td className="px-6 py-3 font-medium text-gray-900">{formatCurrency(inv.value)}</td>
                  <td className="px-6 py-3">
                    <Badge variant="paid">Pago</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </motion.div>
  )
}

export { BillingTab }
export default BillingTab
