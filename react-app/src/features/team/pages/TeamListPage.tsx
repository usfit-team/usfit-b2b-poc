import { useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import UserPlus from 'lucide-react/dist/esm/icons/user-plus'
import Users from 'lucide-react/dist/esm/icons/users'
import type { TeamMember, TeamRole } from '@/types/team'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Card, CardContent } from '@/components/ui/Card'
import { Avatar } from '@/components/ui/Avatar'

// ---------------------------------------------------------------------------
// Mock data
// ---------------------------------------------------------------------------

const mockTeam: TeamMember[] = [
  {
    id: '1',
    name: 'Dr. Ana Beatriz Lima',
    email: 'ana.lima@usfit.com',
    phone: '(11) 99876-1234',
    role: 'nutritionist',
    initials: 'AL',
    specialization: 'Nutrição Esportiva',
    activeStudents: 24,
    status: 'active',
    registeredAt: '2024-03-15',
  },
  {
    id: '2',
    name: 'Carlos Eduardo Silva',
    email: 'carlos.silva@usfit.com',
    phone: '(11) 98765-4321',
    role: 'trainer',
    initials: 'CS',
    specialization: 'Musculação e Funcional',
    activeStudents: 18,
    status: 'active',
    registeredAt: '2024-05-20',
  },
  {
    id: '3',
    name: 'Fernanda Oliveira',
    email: 'fernanda.oliveira@usfit.com',
    phone: '(21) 97654-3210',
    role: 'trainer',
    initials: 'FO',
    specialization: 'Pilates e Reabilitação',
    activeStudents: 15,
    status: 'active',
    registeredAt: '2024-08-10',
  },
  {
    id: '4',
    name: 'Marcos Henrique',
    email: 'marcos@usfit.com',
    phone: '(11) 96543-2109',
    role: 'admin',
    initials: 'MH',
    specialization: 'Gestão e Operações',
    activeStudents: 0,
    status: 'active',
    registeredAt: '2024-01-01',
  },
]

const roleConfig: Record<TeamRole, { label: string; variant: 'info' | 'success' | 'warning' | 'neutral' }> = {
  nutritionist: { label: 'Nutricionista', variant: 'info' },
  trainer: { label: 'Personal Trainer', variant: 'success' },
  physiotherapist: { label: 'Fisioterapeuta', variant: 'warning' },
  admin: { label: 'Administrador', variant: 'neutral' },
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

function TeamListPage() {
  const navigate = useNavigate()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-gray-900">Equipe</h1>
          <p className="mt-1 text-sm text-gray-500">{mockTeam.length} profissionais cadastrados</p>
        </div>
        <Button
          variant="primary"
          size="sm"
          iconLeft={<UserPlus className="h-4 w-4" />}
          onClick={() => navigate('/team/new')}
        >
          Novo Profissional
        </Button>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {mockTeam.map((member, index) => {
          const role = roleConfig[member.role]
          return (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.08 }}
            >
              <Card
                hover
                className="cursor-pointer"
                onClick={() => navigate(`/team/${member.id}`)}
              >
                <CardContent className="flex flex-col items-center text-center">
                  <Avatar name={member.name} size="xl" />
                  <h3 className="mt-4 font-display text-base font-semibold text-gray-900">
                    {member.name}
                  </h3>
                  <div className="mt-2">
                    <Badge variant={role.variant} role_badge>{role.label}</Badge>
                  </div>
                  <p className="mt-2 text-sm text-gray-500">{member.specialization}</p>
                  <div className="mt-4 flex items-center gap-1.5 text-sm text-gray-500">
                    <Users className="h-4 w-4" />
                    <span>{member.activeStudents} alunos ativos</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

export { TeamListPage }
export default TeamListPage
