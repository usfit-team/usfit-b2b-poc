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

const roleOptions = [
  { label: 'Nutricionista', value: 'nutritionist' },
  { label: 'Personal Trainer', value: 'trainer' },
  { label: 'Fisioterapeuta', value: 'physiotherapist' },
  { label: 'Administrador', value: 'admin' },
]

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

function TeamCreatePage() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [role, setRole] = useState('')
  const [specialization, setSpecialization] = useState('')
  const [registration, setRegistration] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    navigate('/team/success')
  }

  return (
    <div className="space-y-6">
      <BackButton />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <h1 className="font-display text-2xl font-bold text-gray-900">Novo Profissional</h1>
        <p className="mt-1 text-sm text-gray-500">Cadastre um novo membro da equipe.</p>
      </motion.div>

      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.1 }}
      >
        <Card>
          <CardHeader title="Dados do Profissional" />
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Input
                label="Nome Completo"
                placeholder="Nome do profissional"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                label="E-mail"
                type="email"
                placeholder="email@exemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Input
                label="Telefone"
                placeholder="(00) 00000-0000"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <Select
                label="Cargo"
                placeholder="Selecione o cargo"
                options={roleOptions}
                value={role}
                onChange={(e) => setRole(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Input
                label="Especialização"
                placeholder="Ex: Nutrição Esportiva"
                value={specialization}
                onChange={(e) => setSpecialization(e.target.value)}
              />
              <Input
                label="CREF/CRN"
                placeholder="Registro profissional"
                value={registration}
                onChange={(e) => setRegistration(e.target.value)}
              />
            </div>

            <div className="flex justify-end pt-4">
              <Button type="submit" variant="primary">
                Cadastrar Profissional
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.form>
    </div>
  )
}

export { TeamCreatePage }
export default TeamCreatePage
