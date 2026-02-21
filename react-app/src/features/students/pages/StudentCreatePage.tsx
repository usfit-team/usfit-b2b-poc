import { useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Button } from '@/components/ui/Button'
import { BackButton } from '@/components/shared/BackButton'

// ---------------------------------------------------------------------------
// Options
// ---------------------------------------------------------------------------

const genderOptions = [
  { label: 'Masculino', value: 'male' },
  { label: 'Feminino', value: 'female' },
]

const goalOptions = [
  { label: 'Hipertrofia', value: 'hipertrofia' },
  { label: 'Emagrecimento', value: 'emagrecimento' },
  { label: 'Condicionamento', value: 'condicionamento' },
  { label: 'Qualidade de Vida', value: 'qualidade-de-vida' },
  { label: 'Reabilitação', value: 'reabilitacao' },
]

const contractOptions = [
  { label: 'Mensal', value: 'mensal' },
  { label: 'Trimestral', value: 'trimestral' },
  { label: 'Semestral', value: 'semestral' },
  { label: 'Anual', value: 'anual' },
]

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

function StudentCreatePage() {
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      navigate('/students')
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <BackButton />

      <div className="mx-auto max-w-2xl">
        <h1 className="font-display text-2xl font-bold text-gray-900 mb-6">
          Cadastrar Novo Aluno
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Dados Pessoais */}
          <Card>
            <CardHeader title="Dados Pessoais" />
            <CardContent className="space-y-4">
              <Input
                label="Nome completo"
                placeholder="Ex: João Silva"
                required
              />
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Input
                  label="E-mail"
                  type="email"
                  placeholder="joao@email.com"
                  required
                />
                <Input
                  label="Telefone"
                  type="tel"
                  placeholder="(11) 99999-9999"
                  required
                />
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Input
                  label="Data de Nascimento"
                  type="date"
                  required
                />
                <Select
                  label="Gênero"
                  options={genderOptions}
                  placeholder="Selecione"
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Dados Físicos */}
          <Card>
            <CardHeader title="Dados Físicos" />
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Input
                  label="Peso (kg)"
                  type="number"
                  placeholder="80"
                  min={30}
                  max={300}
                  required
                />
                <Input
                  label="Altura (cm)"
                  type="number"
                  placeholder="175"
                  min={100}
                  max={250}
                  required
                />
              </div>
              <Select
                label="Objetivo"
                options={goalOptions}
                placeholder="Selecione o objetivo"
                required
              />
            </CardContent>
          </Card>

          {/* Contrato */}
          <Card>
            <CardHeader title="Contrato" />
            <CardContent>
              <Select
                label="Tipo de contrato"
                options={contractOptions}
                placeholder="Selecione o tipo"
                required
              />
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3">
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate('/students')}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="primary"
              isLoading={isSubmitting}
            >
              Cadastrar Aluno
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export { StudentCreatePage }
export default StudentCreatePage
