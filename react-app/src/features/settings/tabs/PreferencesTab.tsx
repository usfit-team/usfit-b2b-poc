import { useState } from 'react'
import { motion } from 'motion/react'
import { Button } from '@/components/ui/Button'
import { Select } from '@/components/ui/Select'
import { Toggle } from '@/components/ui/Toggle'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'

// ---------------------------------------------------------------------------
// Options
// ---------------------------------------------------------------------------

const languageOptions = [
  { label: 'Português (BR)', value: 'pt-BR' },
  { label: 'English', value: 'en' },
  { label: 'Español', value: 'es' },
]

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

function PreferencesTab() {
  const [darkMode, setDarkMode] = useState(false)
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(true)
  const [weeklyReport, setWeeklyReport] = useState(false)
  const [language, setLanguage] = useState('pt-BR')

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
      {/* Theme */}
      <Card>
        <CardHeader title="Aparência" />
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">Modo Escuro</p>
              <p className="text-xs text-gray-500">Ativar tema escuro na interface</p>
            </div>
            <Toggle checked={darkMode} onChange={setDarkMode} />
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader title="Notificações" />
        <CardContent className="space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">Notificações por E-mail</p>
              <p className="text-xs text-gray-500">Receber atualizações e lembretes por e-mail</p>
            </div>
            <Toggle checked={emailNotifications} onChange={setEmailNotifications} />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">Notificações Push</p>
              <p className="text-xs text-gray-500">Receber notificações no navegador</p>
            </div>
            <Toggle checked={pushNotifications} onChange={setPushNotifications} />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">Relatório Semanal</p>
              <p className="text-xs text-gray-500">Resumo semanal de atividades</p>
            </div>
            <Toggle checked={weeklyReport} onChange={setWeeklyReport} />
          </div>
        </CardContent>
      </Card>

      {/* Language */}
      <Card>
        <CardHeader title="Idioma" />
        <CardContent>
          <div className="max-w-xs">
            <Select
              label="Idioma da Interface"
              options={languageOptions}
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button type="submit" variant="primary">
          Salvar
        </Button>
      </div>
    </motion.form>
  )
}

export { PreferencesTab }
export default PreferencesTab
