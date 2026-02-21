import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { BackButton } from '@/components/shared/BackButton'

// ---------------------------------------------------------------------------
// Options
// ---------------------------------------------------------------------------

const studentOptions = [
  { label: 'Lucas Oliveira', value: 's1' },
  { label: 'Mariana Santos', value: 's2' },
  { label: 'Rafael Costa', value: 's3' },
  { label: 'Camila Ferreira', value: 's4' },
  { label: 'Thiago Almeida', value: 's5' },
  { label: 'Beatriz Nascimento', value: 's6' },
]

const serviceOptions = [
  { label: 'Nutrição', value: 'nutrition' },
  { label: 'Personal Trainer', value: 'trainer' },
  { label: 'Completo (Nutrição + Personal)', value: 'complete' },
]

const frequencyOptions = [
  { label: 'Mensal', value: 'monthly' },
  { label: 'Trimestral', value: 'quarterly' },
  { label: 'Anual', value: 'annual' },
]

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

function ContractCreatePage() {
  const navigate = useNavigate()
  const [studentId, setStudentId] = useState('')
  const [service, setService] = useState('')
  const [frequency, setFrequency] = useState('')
  const [value, setValue] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

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
        <h1 className="font-display text-2xl font-bold text-gray-900">Novo Contrato</h1>
        <p className="mt-1 text-sm text-gray-500">Preencha os dados para criar um novo contrato.</p>
      </motion.div>

      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.1 }}
        className="space-y-6"
      >
        {/* Aluno e Serviço */}
        <Card>
          <CardHeader title="Dados do Contrato" />
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Select
                label="Aluno"
                placeholder="Selecione o aluno"
                options={studentOptions}
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
              />
              <Select
                label="Serviço"
                placeholder="Selecione o serviço"
                options={serviceOptions}
                value={service}
                onChange={(e) => setService(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <Select
                label="Frequência"
                placeholder="Selecione"
                options={frequencyOptions}
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
              />
              <Input
                label="Valor (R$)"
                type="number"
                placeholder="0,00"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Input
                label="Data de Início"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              <Input
                label="Data de Fim"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Submit */}
        <div className="flex justify-end">
          <Button type="submit" variant="primary">
            Criar Contrato
          </Button>
        </div>
      </motion.form>
    </div>
  )
}

export { ContractCreatePage }
export default ContractCreatePage
