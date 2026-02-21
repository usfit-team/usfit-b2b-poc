export type TeamRole = 'nutritionist' | 'trainer' | 'physiotherapist' | 'admin'

export interface TeamMember {
  id: string
  name: string
  email: string
  phone: string
  role: TeamRole
  initials: string
  specialization: string
  activeStudents: number
  status: 'active' | 'inactive'
  registeredAt: string
}
