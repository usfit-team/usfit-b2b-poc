import { useState } from 'react'
import { motion } from 'motion/react'
import Check from 'lucide-react/dist/esm/icons/check'
import CreditCard from 'lucide-react/dist/esm/icons/credit-card'
import Landmark from 'lucide-react/dist/esm/icons/landmark'
import QrCode from 'lucide-react/dist/esm/icons/qr-code'
import { cn, formatCurrency } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'

// ---------------------------------------------------------------------------
// Plans
// ---------------------------------------------------------------------------

const plans = [
  {
    id: 'starter',
    name: 'Starter',
    price: 49,
    features: ['Até 10 alunos', 'Módulo de Nutrição', 'Suporte por e-mail'],
  },
  {
    id: 'pro',
    name: 'PRO',
    price: 149,
    features: ['Até 50 alunos', 'Todos os módulos', 'Relatórios avançados', 'Suporte prioritário'],
    popular: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 399,
    features: ['Alunos ilimitados', 'Todos os módulos', 'API personalizada', 'Gerente dedicado'],
  },
]

const paymentMethods = [
  { id: 'card', label: 'Cartão de Crédito', icon: CreditCard },
  { id: 'boleto', label: 'Boleto', icon: Landmark },
  { id: 'pix', label: 'PIX', icon: QrCode },
]

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

function PublicCheckoutPage() {
  const [selectedPlan, setSelectedPlan] = useState('pro')
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const currentPlan = plans.find((p) => p.id === selectedPlan)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  }

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <h1 className="font-display text-2xl font-bold text-gray-900">Escolha seu Plano</h1>
        <p className="mt-1 text-sm text-gray-500">Selecione o plano ideal para sua necessidade.</p>
      </motion.div>

      {/* Plan selection */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.1 }}
        className="grid grid-cols-1 gap-4 md:grid-cols-3"
      >
        {plans.map((plan) => (
          <button
            key={plan.id}
            type="button"
            onClick={() => setSelectedPlan(plan.id)}
            className={cn(
              'relative rounded-2xl border p-5 text-left transition-all cursor-pointer',
              selectedPlan === plan.id
                ? 'border-usfit-cyan bg-cyan-50/30 shadow-md ring-2 ring-usfit-cyan/20'
                : 'border-gray-200 hover:border-gray-300 hover:shadow-sm',
            )}
          >
            {plan.popular ? (
              <span className="absolute -top-2.5 right-4 rounded-full bg-usfit-gradient px-3 py-0.5 text-xs font-semibold text-white">
                Popular
              </span>
            ) : null}
            <h3 className="font-display text-base font-bold text-gray-900">{plan.name}</h3>
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
          </button>
        ))}
      </motion.div>

      {/* Account info form */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.2 }}
        className="space-y-6"
      >
        <Card>
          <CardHeader title="Dados da Conta" />
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Input
                label="Nome Completo"
                placeholder="Seu nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                label="E-mail"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Payment method tabs */}
        <Card>
          <CardHeader title="Método de Pagamento" />
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              {paymentMethods.map((method) => (
                <button
                  key={method.id}
                  type="button"
                  onClick={() => setPaymentMethod(method.id)}
                  className={cn(
                    'flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition-all cursor-pointer',
                    paymentMethod === method.id
                      ? 'border-usfit-cyan bg-cyan-50 text-usfit-blue'
                      : 'border-gray-200 text-gray-600 hover:border-gray-300',
                  )}
                >
                  <method.icon className="h-4 w-4" />
                  {method.label}
                </button>
              ))}
            </div>

            {paymentMethod === 'card' ? (
              <div className="space-y-4 pt-2">
                <Input label="Número do Cartão" placeholder="0000 0000 0000 0000" />
                <div className="grid grid-cols-2 gap-4">
                  <Input label="Validade" placeholder="MM/AA" />
                  <Input label="CVV" placeholder="000" />
                </div>
              </div>
            ) : paymentMethod === 'boleto' ? (
              <p className="pt-2 text-sm text-gray-500">
                O boleto será gerado após a confirmação e enviado para seu e-mail.
              </p>
            ) : (
              <p className="pt-2 text-sm text-gray-500">
                O QR Code PIX será gerado após a confirmação do pedido.
              </p>
            )}
          </CardContent>
        </Card>

        {/* Submit */}
        <div className="flex items-center justify-between rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div>
            <p className="text-sm text-gray-500">Total mensal</p>
            <p className="font-display text-2xl font-bold text-gray-900">
              {formatCurrency(currentPlan?.price ?? 0)}
            </p>
          </div>
          <Button type="submit" variant="primary" size="lg">
            Finalizar
          </Button>
        </div>
      </motion.form>
    </div>
  )
}

export { PublicCheckoutPage }
export default PublicCheckoutPage
