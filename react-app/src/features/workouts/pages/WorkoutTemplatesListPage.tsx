import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import Plus from 'lucide-react/dist/esm/icons/plus'
import Dumbbell from 'lucide-react/dist/esm/icons/dumbbell'
import ClipboardCopy from 'lucide-react/dist/esm/icons/clipboard-copy'
import Users from 'lucide-react/dist/esm/icons/users'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'

interface WorkoutTemplate {
  id: string
  name: string
  description: string
  exerciseCount: number
  daysCount: number
  assignedCount: number
  category: string
}

const mockTemplates: WorkoutTemplate[] = [
  {
    id: '1',
    name: 'Hipertrofia Iniciante',
    description: 'Plano de 3 dias para alunos iniciantes focado em ganho de massa muscular com exercícios compostos.',
    exerciseCount: 18,
    daysCount: 3,
    assignedCount: 12,
    category: 'Hipertrofia',
  },
  {
    id: '2',
    name: 'Emagrecimento HIIT',
    description: 'Circuito de alta intensidade com intervalos para maximizar a queima calórica e condicionamento.',
    exerciseCount: 24,
    daysCount: 4,
    assignedCount: 8,
    category: 'Emagrecimento',
  },
  {
    id: '3',
    name: 'Força - Powerlifting',
    description: 'Programa de periodização focado nos três levantamentos básicos: agachamento, supino e terra.',
    exerciseCount: 15,
    daysCount: 4,
    assignedCount: 5,
    category: 'Força',
  },
  {
    id: '4',
    name: 'Reabilitação Geral',
    description: 'Exercícios de baixo impacto para recuperação de lesões e fortalecimento postural progressivo.',
    exerciseCount: 12,
    daysCount: 3,
    assignedCount: 3,
    category: 'Reabilitação',
  },
]

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
}

function WorkoutTemplatesListPage() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')

  const filtered = mockTemplates.filter((t) =>
    search.trim() === ''
      ? true
      : t.name.toLowerCase().includes(search.toLowerCase()) ||
        t.description.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      {/* Header */}
      <motion.div variants={item} className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-gray-900">
            Templates de Treino
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Templates reutilizáveis para criar treinos rapidamente.
          </p>
        </div>
        <Button iconLeft={<Plus className="h-4 w-4" />}>
          Novo Template
        </Button>
      </motion.div>

      {/* Search */}
      <motion.div variants={item} className="max-w-sm">
        <Input
          variant="search"
          placeholder="Buscar template..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </motion.div>

      {/* Cards Grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((template) => (
          <motion.div key={template.id} variants={item}>
            <Card hover className="flex h-full flex-col">
              <CardContent className="flex flex-1 flex-col">
                <div className="mb-3 flex items-start justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100">
                    <Dumbbell className="h-5 w-5 text-blue-600" />
                  </div>
                  <Badge variant="info">{template.category}</Badge>
                </div>

                <h3 className="font-display text-base font-semibold text-gray-900">
                  {template.name}
                </h3>
                <p className="mt-1.5 flex-1 text-sm leading-relaxed text-gray-500">
                  {template.description}
                </p>

                <div className="mt-4 flex items-center gap-4 border-t border-gray-100 pt-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1.5">
                    <Dumbbell className="h-3.5 w-3.5" />
                    {template.exerciseCount} exercícios
                  </span>
                  <span className="flex items-center gap-1.5">
                    <ClipboardCopy className="h-3.5 w-3.5" />
                    {template.daysCount} dias
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Users className="h-3.5 w-3.5" />
                    {template.assignedCount} atribuídos
                  </span>
                </div>

                <div className="mt-4 flex gap-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    className="flex-1"
                    onClick={() => navigate(`/workouts/templates/${template.id}/assign`)}
                  >
                    Atribuir
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                  >
                    Editar
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default WorkoutTemplatesListPage
