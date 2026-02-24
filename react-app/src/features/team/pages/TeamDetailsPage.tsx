import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import Mail from 'lucide-react/dist/esm/icons/mail'
import Phone from 'lucide-react/dist/esm/icons/phone'
import Award from 'lucide-react/dist/esm/icons/award'
import Users from 'lucide-react/dist/esm/icons/users'
import TrendingUp from 'lucide-react/dist/esm/icons/trending-up'
import Star from 'lucide-react/dist/esm/icons/star'
import type { TeamRole } from '@/types/team'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/Badge'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { Avatar } from '@/components/ui/Avatar'
import { BackButton } from '@/components/shared/BackButton'

// ---------------------------------------------------------------------------
// Mock data
// ---------------------------------------------------------------------------

const mockMember = {
  id: '1',
  name: 'Dr. Ana Beatriz Lima',
  email: 'ana.lima@usfit.com',
  phone: '(11) 99876-1234',
  role: 'nutritionist' as TeamRole,
  specialization: 'Nutrição Esportiva',
  registration: 'CRN-3 12345',
  activeStudents: 24,
  status: 'active' as const,
}

const roleConfig: Record<TeamRole, { label: string; variant: 'info' | 'success' | 'warning' | 'neutral' }> = {
  nutritionist: { label: 'Nutricionista', variant: 'info' },
  trainer: { label: 'Personal Trainer', variant: 'success' },
  physiotherapist: { label: 'Fisioterapeuta', variant: 'warning' },
  admin: { label: 'Administrador', variant: 'neutral' },
}

const mockStudents = [
  { id: 's1', name: 'Lucas Oliveira', goal: 'Hipertrofia' },
  { id: 's2', name: 'Mariana Santos', goal: 'Emagrecimento' },
  { id: 's3', name: 'Camila Ferreira', goal: 'Hipertrofia' },
  { id: 's4', name: 'Thiago Almeida', goal: 'Emagrecimento' },
  { id: 's5', name: 'Beatriz Nascimento', goal: 'Qualidade de Vida' },
]

const performanceStats = [
  { label: 'Alunos Ativos', value: '24', icon: Users, color: 'blue' },
  { label: 'Taxa de Retenção', value: '92%', icon: TrendingUp, color: 'green' },
  { label: 'Avaliação Média', value: '4.8', icon: Star, color: 'yellow' },
]

const colorMap: Record<string, { bg: string; text: string }> = {
  blue: { bg: 'bg-blue-100', text: 'text-blue-600' },
  green: { bg: 'bg-green-100', text: 'text-green-600' },
  yellow: { bg: 'bg-yellow-100', text: 'text-yellow-600' },
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

function TeamDetailsPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const member = mockMember
  const role = roleConfig[member.role]

  return (
    <div className="space-y-6">
      <BackButton />

      {/* Profile card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <Card>
          <CardContent className="flex flex-col items-center text-center sm:flex-row sm:items-start sm:text-left sm:gap-6">
            <Avatar name={member.name} size="xl" />
            <div className="mt-4 sm:mt-0">
              <h1 className="font-display text-xl font-bold text-gray-900">{member.name}</h1>
              <div className="mt-2">
                <Badge variant={role.variant} role_badge>{role.label}</Badge>
              </div>

              <div className="mt-4 space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <span>{member.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <span>{member.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-gray-400" />
                  <span>{member.specialization} - {member.registration}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Performance stats */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.1 }}
        className="grid grid-cols-1 gap-4 sm:grid-cols-3"
      >
        {performanceStats.map((stat) => {
          const colors = colorMap[stat.color]
          return (
            <Card key={stat.label}>
              <CardContent className="flex items-center gap-4">
                <div className={cn('flex h-10 w-10 items-center justify-center rounded-xl', colors.bg)}>
                  <stat.icon className={cn('h-5 w-5', colors.text)} />
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500">{stat.label}</p>
                  <p className="font-display text-lg font-bold text-gray-900">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </motion.div>

      {/* Active students */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.2 }}
      >
        <Card>
          <CardHeader title="Alunos Ativos" />
          <div className="w-full overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Aluno</th>
                  <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Objetivo</th>
                </tr>
              </thead>
              <tbody>
                {mockStudents.map((student) => (
                  <tr
                    key={student.id}
                    onClick={() => navigate(`/students/${student.id}/overview`)}
                    className="border-b border-gray-50 transition-colors duration-150 hover:bg-gray-50/80 cursor-pointer"
                  >
                    <td className="px-6 py-3">
                      <div className="flex items-center gap-3">
                        <Avatar name={student.name} size="sm" />
                        <span className="font-medium text-gray-900">{student.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-3 text-gray-500">{student.goal}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}

export { TeamDetailsPage }
export default TeamDetailsPage
