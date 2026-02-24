import { Outlet, useParams } from 'react-router-dom'
import { motion } from 'motion/react'
import type { Student } from '@/types/student'
import { Avatar } from '@/components/ui/Avatar'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { BackButton } from '@/components/shared/BackButton'
import { TabNavigation } from '@/components/shared/TabNavigation'
import Target from 'lucide-react/dist/esm/icons/target'
import Ruler from 'lucide-react/dist/esm/icons/ruler'
import Weight from 'lucide-react/dist/esm/icons/weight'
import Percent from 'lucide-react/dist/esm/icons/percent'

// ---------------------------------------------------------------------------
// Mock data map
// ---------------------------------------------------------------------------

const studentsMap: Record<string, Student> = {
  '1': {
    id: '1',
    name: 'Lucas Oliveira',
    email: 'lucas.oliveira@email.com',
    phone: '(11) 99876-5432',
    initials: 'LO',
    status: 'active',
    contractType: 'Mensal',
    lastAccess: '2026-02-20',
    registeredAt: '2025-08-10',
    goal: 'Hipertrofia',
    age: 28,
    gender: 'male',
    weight: 82,
    height: 178,
    bodyFat: 16,
  },
  '2': {
    id: '2',
    name: 'Mariana Santos',
    email: 'mariana.santos@email.com',
    phone: '(21) 98765-4321',
    initials: 'MS',
    status: 'active',
    contractType: 'Trimestral',
    lastAccess: '2026-02-19',
    registeredAt: '2025-06-15',
    goal: 'Emagrecimento',
    age: 34,
    gender: 'female',
    weight: 68,
    height: 165,
    bodyFat: 26,
  },
  '3': {
    id: '3',
    name: 'Rafael Costa',
    email: 'rafael.costa@email.com',
    phone: '(31) 97654-3210',
    initials: 'RC',
    status: 'inactive',
    contractType: 'Mensal',
    lastAccess: '2026-01-05',
    registeredAt: '2025-03-20',
    goal: 'Condicionamento',
    age: 42,
    gender: 'male',
    weight: 91,
    height: 182,
    bodyFat: 22,
  },
  '4': {
    id: '4',
    name: 'Camila Ferreira',
    email: 'camila.ferreira@email.com',
    phone: '(41) 96543-2109',
    initials: 'CF',
    status: 'active',
    contractType: 'Semestral',
    lastAccess: '2026-02-21',
    registeredAt: '2025-09-01',
    goal: 'Hipertrofia',
    age: 25,
    gender: 'female',
    weight: 58,
    height: 160,
    bodyFat: 20,
  },
  '5': {
    id: '5',
    name: 'Thiago Almeida',
    email: 'thiago.almeida@email.com',
    phone: '(51) 95432-1098',
    initials: 'TA',
    status: 'pending',
    contractType: 'Mensal',
    lastAccess: '2026-02-18',
    registeredAt: '2026-02-15',
    goal: 'Emagrecimento',
    age: 31,
    gender: 'male',
    weight: 95,
    height: 175,
    bodyFat: 28,
  },
  '6': {
    id: '6',
    name: 'Beatriz Nascimento',
    email: 'beatriz.nascimento@email.com',
    phone: '(61) 94321-0987',
    initials: 'BN',
    status: 'active',
    contractType: 'Anual',
    lastAccess: '2026-02-21',
    registeredAt: '2025-04-12',
    goal: 'Qualidade de Vida',
    age: 38,
    gender: 'female',
    weight: 63,
    height: 168,
    bodyFat: 23,
  },
}

const statusConfig = {
  active: { label: 'Ativo', variant: 'success' as const },
  inactive: { label: 'Inativo', variant: 'danger' as const },
  pending: { label: 'Pendente', variant: 'warning' as const },
}

// ---------------------------------------------------------------------------
// Quick stat card
// ---------------------------------------------------------------------------

interface QuickStatProps {
  icon: React.ReactNode
  label: string
  value: string
}

function QuickStat({ icon, label, value }: QuickStatProps) {
  return (
    <Card className="flex items-center gap-3 p-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-gray-500">
        {icon}
      </div>
      <div>
        <p className="text-xs text-gray-500">{label}</p>
        <p className="font-display text-lg font-bold text-gray-900">{value}</p>
      </div>
    </Card>
  )
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

function StudentDashboardPage() {
  const { id } = useParams<{ id: string }>()
  const student = studentsMap[id ?? ''] ?? studentsMap['1']
  const status = statusConfig[student.status]

  const tabs = [
    { label: 'Visão Geral', href: `/students/${student.id}/overview` },
    { label: 'Nutrição', href: `/students/${student.id}/nutrition` },
    { label: 'Treinos', href: `/students/${student.id}/workout` },
    { label: 'Biometria', href: `/students/${student.id}/biometrics` },
  ]

  return (
    <div className="space-y-6">
      <BackButton />

      {/* Student header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6"
      >
        <Avatar src={student.avatar} name={student.name} size="xl" />

        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="font-display text-2xl font-bold text-gray-900">
              {student.name}
            </h1>
            <Badge variant={status.variant}>{status.label}</Badge>
          </div>
          <p className="mt-0.5 text-sm text-gray-500">{student.email}</p>
          <p className="mt-0.5 text-xs text-gray-400">Contrato: {student.contractType}</p>
        </div>
      </motion.div>

      {/* Quick stats */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.1 }}
        className="grid grid-cols-2 gap-4 lg:grid-cols-4"
      >
        <QuickStat
          icon={<Weight className="h-5 w-5" />}
          label="Peso"
          value={`${student.weight} kg`}
        />
        <QuickStat
          icon={<Ruler className="h-5 w-5" />}
          label="Altura"
          value={`${student.height} cm`}
        />
        <QuickStat
          icon={<Percent className="h-5 w-5" />}
          label="% Gordura"
          value={student.bodyFat ? `${student.bodyFat}%` : '--'}
        />
        <QuickStat
          icon={<Target className="h-5 w-5" />}
          label="Objetivo"
          value={student.goal}
        />
      </motion.div>

      {/* Tab navigation */}
      <TabNavigation tabs={tabs} />

      {/* Tab content */}
      <Outlet />
    </div>
  )
}

export { StudentDashboardPage }
export default StudentDashboardPage
