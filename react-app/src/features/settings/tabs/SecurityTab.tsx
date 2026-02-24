import { useState } from 'react'
import { motion } from 'motion/react'
import Shield from 'lucide-react/dist/esm/icons/shield'
import Smartphone from 'lucide-react/dist/esm/icons/smartphone'
import Monitor from 'lucide-react/dist/esm/icons/monitor'
import Laptop from 'lucide-react/dist/esm/icons/laptop'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Toggle } from '@/components/ui/Toggle'
import { Badge } from '@/components/ui/Badge'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'

// ---------------------------------------------------------------------------
// Mock data
// ---------------------------------------------------------------------------

const activeSessions = [
  {
    id: 's1',
    device: 'Chrome - macOS',
    icon: Monitor,
    location: 'São Paulo, BR',
    lastActive: 'Agora',
    current: true,
  },
  {
    id: 's2',
    device: 'Safari - iPhone',
    icon: Smartphone,
    location: 'São Paulo, BR',
    lastActive: 'Há 2 horas',
    current: false,
  },
  {
    id: 's3',
    device: 'Chrome - Windows',
    icon: Laptop,
    location: 'Rio de Janeiro, BR',
    lastActive: 'Há 3 dias',
    current: false,
  },
]

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

function SecurityTab() {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [twoFactor, setTwoFactor] = useState(false)

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Change password */}
      <Card>
        <CardHeader title="Alterar Senha" />
        <CardContent>
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <Input
              label="Senha Atual"
              type="password"
              placeholder="Digite sua senha atual"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Input
                label="Nova Senha"
                type="password"
                placeholder="Digite a nova senha"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <Input
                label="Confirmar Nova Senha"
                type="password"
                placeholder="Confirme a nova senha"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className="flex justify-end">
              <Button type="submit" variant="primary">
                Salvar
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Two-factor authentication */}
      <Card>
        <CardHeader title="Autenticação de Dois Fatores" />
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100">
                <Shield className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Verificação em duas etapas</p>
                <p className="text-xs text-gray-500">
                  Adicione uma camada extra de segurança à sua conta
                </p>
              </div>
            </div>
            <Toggle checked={twoFactor} onChange={setTwoFactor} />
          </div>
        </CardContent>
      </Card>

      {/* Active sessions */}
      <Card>
        <CardHeader title="Sessões Ativas" />
        <CardContent className="space-y-4">
          {activeSessions.map((session) => (
            <div
              key={session.id}
              className="flex items-center justify-between rounded-lg border border-gray-100 p-4"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
                  <session.icon className="h-5 w-5 text-gray-600" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-gray-900">{session.device}</p>
                    {session.current ? (
                      <Badge variant="success">Atual</Badge>
                    ) : null}
                  </div>
                  <p className="text-xs text-gray-500">
                    {session.location} - {session.lastActive}
                  </p>
                </div>
              </div>
              {!session.current ? (
                <Button variant="ghost" size="sm">
                  Encerrar
                </Button>
              ) : null}
            </div>
          ))}
        </CardContent>
      </Card>
    </motion.div>
  )
}

export { SecurityTab }
export default SecurityTab
