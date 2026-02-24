import { Outlet, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import { Sidebar } from '@/components/layout/Sidebar'
import { Header } from '@/components/layout/Header'

const PAGE_TITLES: Record<string, { title: string; subtitle?: string }> = {
  '/dashboard': {
    title: 'Bom dia, Dr. Silva! 👋',
    subtitle: 'Aqui está o resumo da sua consultoria hoje.',
  },
  '/students': {
    title: 'Alunos',
    subtitle: 'Gerencie seus alunos e acompanhamentos.',
  },
  '/nutrition': {
    title: 'Nutrição',
    subtitle: 'Planos alimentares e dietas.',
  },
  '/workouts': {
    title: 'Treinos',
    subtitle: 'Programas de treinamento.',
  },
  '/contracts': {
    title: 'Contratos',
    subtitle: 'Gestão de contratos e assinaturas.',
  },
  '/team': {
    title: 'Profissionais',
    subtitle: 'Equipe de profissionais.',
  },
  '/financial': {
    title: 'Financeiro',
    subtitle: 'Receitas, despesas e relatórios.',
  },
  '/settings': {
    title: 'Configurações',
    subtitle: 'Preferências da conta.',
  },
  '/assessment': {
    title: 'Avaliação Física',
    subtitle: 'Composição corporal e medidas.',
  },
}

function getPageMeta(pathname: string) {
  // Exact match first
  if (PAGE_TITLES[pathname]) return PAGE_TITLES[pathname]

  // Prefix match (e.g. /nutrition/diets -> /nutrition)
  const prefix = Object.keys(PAGE_TITLES).find((key) =>
    pathname.startsWith(key),
  )
  return prefix
    ? PAGE_TITLES[prefix]
    : { title: 'USFIT B2B', subtitle: undefined }
}

export function AppLayout() {
  const location = useLocation()
  const { title, subtitle } = getPageMeta(location.pathname)

  return (
    <div className="h-screen flex overflow-hidden bg-usfit-gray">
      {/* Sidebar - hidden on mobile */}
      <div className="hidden md:flex">
        <Sidebar />
      </div>

      {/* Main area */}
      <div className="flex-1 flex flex-col h-full min-w-0">
        <Header title={title} subtitle={subtitle} />

        <main className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="p-8"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  )
}
