import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import Check from 'lucide-react/dist/esm/icons/check'
import ArrowLeft from 'lucide-react/dist/esm/icons/arrow-left'
import CreditCard from 'lucide-react/dist/esm/icons/credit-card'
import Landmark from 'lucide-react/dist/esm/icons/landmark'
import QrCode from 'lucide-react/dist/esm/icons/qr-code'
import Shield from 'lucide-react/dist/esm/icons/shield'
import { cn, formatCurrency } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'

// ---------------------------------------------------------------------------
// Plans
// ---------------------------------------------------------------------------

const plans = [
  { id: 'starter', name: 'Starter', price: 49 },
  { id: 'pro', name: 'PRO', price: 149, popular: true },
  { id: 'enterprise', name: 'Enterprise', price: 399 },
]

const paymentMethods = [
  { id: 'card', label: 'Cartão', icon: CreditCard },
  { id: 'boleto', label: 'Boleto', icon: Landmark },
  { id: 'pix', label: 'PIX', icon: QrCode },
]

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

function LandingCheckoutPage() {
  const [selectedPlan, setSelectedPlan] = useState('pro')
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

  const currentPlan = plans.find((p) => p.id === selectedPlan)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b border-gray-100 bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/lp" className="flex items-center gap-2">
            <div className="w-8 h-8">
              <img
                src="/logo.png"
                alt="USFIT logo"
                className="w-full h-full object-contain"
              />
            </div>
            <span className="font-display text-lg font-bold text-gray-900">USFIT</span>
          </Link>
          <Link
            to="/lp"
            className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <h1 className="font-display text-2xl font-bold text-gray-900">Assinar Plano</h1>
          <p className="mt-1 text-sm text-gray-500">Complete seus dados para ativar sua conta.</p>
        </motion.div>

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Form area */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.1 }}
            className="space-y-6 lg:col-span-2"
          >
            {/* Plan selection */}
            <Card>
              <CardHeader title="Selecione o Plano" />
              <CardContent>
                <div className="grid grid-cols-3 gap-3">
                  {plans.map((plan) => (
                    <button
                      key={plan.id}
                      type="button"
                      onClick={() => setSelectedPlan(plan.id)}
                      className={cn(
                        'relative rounded-xl border p-4 text-center transition-all cursor-pointer',
                        selectedPlan === plan.id
                          ? 'border-usfit-cyan bg-cyan-50/40 ring-2 ring-usfit-cyan/20'
                          : 'border-gray-200 hover:border-gray-300',
                      )}
                    >
                      {plan.popular ? (
                        <span className="absolute -top-2 left-1/2 -translate-x-1/2 rounded-full bg-usfit-gradient px-2 py-0.5 text-[10px] font-semibold text-white">
                          Popular
                        </span>
                      ) : null}
                      <p className="text-sm font-bold text-gray-900">{plan.name}</p>
                      <p className="mt-1 font-display text-lg font-bold text-gray-900">
                        {formatCurrency(plan.price)}
                        <span className="text-xs text-gray-500 font-normal">/mês</span>
                      </p>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Account data */}
            <Card>
              <CardHeader title="Dados da Conta" />
              <CardContent className="space-y-4">
                <Input
                  label="Nome Completo"
                  placeholder="Seu nome"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <Input
                    label="E-mail"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Input
                    label="Telefone"
                    placeholder="(00) 00000-0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Payment method */}
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
                    <Input label="Nome no Cartão" placeholder="Como aparece no cartão" />
                  </div>
                ) : paymentMethod === 'boleto' ? (
                  <p className="pt-2 text-sm text-gray-500">
                    O boleto será gerado após a confirmação. Prazo de compensação de até 3 dias úteis.
                  </p>
                ) : (
                  <p className="pt-2 text-sm text-gray-500">
                    O QR Code PIX será gerado imediatamente após a confirmação.
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Submit button (mobile) */}
            <div className="lg:hidden">
              <Button type="submit" variant="primary" size="lg" className="w-full">
                Assinar Plano
              </Button>
            </div>
          </motion.form>

          {/* Order summary sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="sticky top-24">
              <Card>
                <CardHeader title="Resumo do Pedido" />
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Plano</span>
                    <span className="text-sm font-semibold text-gray-900">{currentPlan?.name}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Cobrança</span>
                    <span className="text-sm text-gray-700">Mensal</span>
                  </div>
                  <div className="border-t border-gray-100 pt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900">Total/mês</span>
                      <span className="font-display text-xl font-bold text-gray-900">
                        {formatCurrency(currentPlan?.price ?? 0)}
                      </span>
                    </div>
                  </div>

                  {/* Submit button (desktop) */}
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="hidden w-full lg:flex"
                    onClick={handleSubmit}
                  >
                    Assinar Plano
                  </Button>

                  <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
                    <Shield className="h-3.5 w-3.5" />
                    <span>Pagamento seguro e criptografado</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  )
}

export { LandingCheckoutPage }
export default LandingCheckoutPage
