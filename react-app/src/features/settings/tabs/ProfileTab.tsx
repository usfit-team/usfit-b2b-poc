import { useState } from 'react'
import { motion } from 'motion/react'
import Camera from 'lucide-react/dist/esm/icons/camera'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { Avatar } from '@/components/ui/Avatar'

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

function ProfileTab() {
  const [name, setName] = useState('Dr. Ana Beatriz Lima')
  const [email, setEmail] = useState('ana.lima@usfit.com')
  const [phone, setPhone] = useState('(11) 99876-1234')
  const [specialty, setSpecialty] = useState('Nutrição Esportiva')
  const [registration, setRegistration] = useState('CRN-3 12345')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Profile photo */}
      <Card>
        <CardHeader title="Foto de Perfil" />
        <CardContent>
          <div className="flex items-center gap-6">
            <div className="relative">
              <Avatar name={name} size="xl" />
              <button
                type="button"
                className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md border border-gray-200 text-gray-500 hover:text-usfit-blue transition-colors cursor-pointer"
              >
                <Camera className="h-4 w-4" />
              </button>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Alterar foto</p>
              <p className="text-xs text-gray-500">JPG, PNG ou GIF. Máximo 2MB.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Personal info */}
      <Card>
        <CardHeader title="Informações Pessoais" />
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Input
              label="Nome Completo"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              label="E-mail"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Input
              label="Telefone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <Input
              label="Especialidade"
              value={specialty}
              onChange={(e) => setSpecialty(e.target.value)}
            />
          </div>

          <Input
            label="CREF/CRN"
            value={registration}
            onChange={(e) => setRegistration(e.target.value)}
          />
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button type="submit" variant="primary">
          Salvar Alterações
        </Button>
      </div>
    </motion.form>
  )
}

export { ProfileTab }
export default ProfileTab
