import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { motion } from 'motion/react'
import { formatCurrency, formatDate } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Badge } from '@/components/ui/Badge'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { BackButton } from '@/components/shared/BackButton'

// ---------------------------------------------------------------------------
// Mock current contract
// ---------------------------------------------------------------------------

const currentContract = {
  id: '1',
  studentName: 'Lucas Oliveira',
  service: 'Personal Trainer',
  status: 'active' as const,
  startDate: '2025-08-01',
  endDate: '2026-08-01',
  value: 450,
  paymentFrequency: 'monthly',
}

const frequencyOptions = [
  { label: 'Mensal', value: 'monthly' },
  { label: 'Trimestral', value: 'quarterly' },
  { label: 'Anual', value: 'annual' },
]

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

function ContractRenewalPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [newEndDate, setNewEndDate] = useState('')
  const [newValue, setNewValue] = useState(String(currentContract.value))
  const [newFrequency, setNewFrequency] = useState(currentContract.paymentFrequency)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    navigate('/contracts/success')
  }

  return (
    <div className="space-y-6">
      <BackButton />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <h1 className="font-display text-2xl font-bold text-gray-900">Renovar Contrato</h1>
        <p className="mt-1 text-sm text-gray-500">
          Renovação do contrato #{id} - {currentContract.studentName}
        </p>
      </motion.div>

      {/* Current contract summary */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.1 }}
      >
        <Card>
          <CardHeader title="Contrato Atual" />
          <CardContent>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">Aluno</p>
                <p className="mt-1 text-sm font-semibold text-gray-900">{currentContract.studentName}</p>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">Serviço</p>
                <p className="mt-1 text-sm text-gray-700">{currentContract.service}</p>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">Vigência</p>
                <p className="mt-1 text-sm text-gray-700">
                  {formatDate(currentContract.startDate)} - {formatDate(currentContract.endDate)}
                </p>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">Valor Atual</p>
                <p className="mt-1 text-sm font-semibold text-gray-900">
                  {formatCurrency(currentContract.value)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* New terms form */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.2 }}
      >
        <Card>
          <CardHeader title="Novos Termos" />
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <Input
                label="Nova Data de Fim"
                type="date"
                value={newEndDate}
                onChange={(e) => setNewEndDate(e.target.value)}
              />
              <Input
                label="Novo Valor (R$)"
                type="number"
                placeholder="0,00"
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
              />
              <Select
                label="Frequência de Pagamento"
                options={frequencyOptions}
                value={newFrequency}
                onChange={(e) => setNewFrequency(e.target.value)}
              />
            </div>

            <div className="flex justify-end pt-4">
              <Button type="submit" variant="primary">
                Confirmar Renovação
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.form>
    </div>
  )
}

export { ContractRenewalPage }
export default ContractRenewalPage
