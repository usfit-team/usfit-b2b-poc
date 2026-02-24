import { Outlet } from 'react-router-dom'
import { motion } from 'motion/react'
import { TabNavigation } from '@/components/shared/TabNavigation'

// ---------------------------------------------------------------------------
// Tabs
// ---------------------------------------------------------------------------

const settingsTabs = [
  { label: 'Perfil', href: '/settings/profile' },
  { label: 'Preferências', href: '/settings/preferences' },
  { label: 'Cobrança', href: '/settings/billing' },
  { label: 'Segurança', href: '/settings/security' },
]

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

function SettingsPage() {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <h1 className="font-display text-2xl font-bold text-gray-900">Configurações</h1>
        <p className="mt-1 text-sm text-gray-500">Gerencie seu perfil, preferências e segurança.</p>
      </motion.div>

      <TabNavigation tabs={settingsTabs} />

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <Outlet />
      </motion.div>
    </div>
  )
}

export { SettingsPage }
export default SettingsPage
