import type { NavItem } from '@/types/common'
import type { ActivityLevel } from '@/types/nutrition'

export const NAV_ITEMS: NavItem[] = [
  { label: 'Visão Geral', href: '/dashboard', iconName: 'layout-dashboard' },
  { label: 'Alunos', href: '/students', iconName: 'users' },
  { label: 'Nutrição', href: '/nutrition/diets', iconName: 'utensils' },
  { label: 'Treinos', href: '/workouts', iconName: 'dumbbell' },
  { label: 'Contratos', href: '/contracts', iconName: 'file-text' },
  { label: 'Profissionais', href: '/team', iconName: 'briefcase' },
  { label: 'Financeiro', href: '/financial', iconName: 'wallet' },
]

export const ACTIVITY_FACTORS: Array<{ label: string; value: ActivityLevel }> = [
  { label: 'Sedentário (1.2)', value: 1.2 },
  { label: 'Levemente Ativo (1.375)', value: 1.375 },
  { label: 'Moderadamente Ativo (1.55)', value: 1.55 },
  { label: 'Muito Ativo (1.725)', value: 1.725 },
  { label: 'Extremamente Ativo (1.9)', value: 1.9 },
]

export const FORMULA_OPTIONS = [
  { label: 'Cunningham', value: 'cunningham' as const, description: 'Requer % gordura' },
  { label: 'Tinsley', value: 'tinsley' as const, description: 'Requer % gordura' },
  { label: 'Harris-Benedict', value: 'harris' as const, description: 'Peso, Altura, Idade' },
  { label: 'Mifflin-St Jeor', value: 'mifflin' as const, description: 'Peso, Altura, Idade' },
]

export const GOAL_OPTIONS = [
  { label: 'Manutenção', value: 'maintenance' as const },
  { label: 'Déficit Calórico', value: 'deficit' as const },
  { label: 'Superávit Calórico', value: 'surplus' as const },
]

export const FOLD_LABELS: Record<string, string> = {
  chest: 'Peitoral',
  abdominal: 'Abdomen',
  thigh: 'Coxa',
  triceps: 'Tríceps',
  subscapular: 'Subescapular',
  suprailiac: 'Supra-ilíaca',
  midaxillary: 'Axilar Média',
}

export const MOCK_USER = {
  id: '1',
  name: 'Dr. Silva',
  email: 'dr.silva@usfit.com',
  initials: 'DS',
  plan: 'pro' as const,
  role: 'owner' as const,
}
