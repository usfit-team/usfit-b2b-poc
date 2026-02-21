import { useState } from 'react'
import type { FormEvent } from 'react'
import { motion } from 'motion/react'
import Dumbbell from 'lucide-react/dist/esm/icons/dumbbell'
import Users from 'lucide-react/dist/esm/icons/users'
import ClipboardCopy from 'lucide-react/dist/esm/icons/clipboard-copy'
import Check from 'lucide-react/dist/esm/icons/check'
import Send from 'lucide-react/dist/esm/icons/send'
import { cn } from '@/lib/utils'
import { BackButton } from '@/components/shared/BackButton'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Input } from '@/components/ui/Input'

interface Student {
  id: string
  name: string
  email: string
  plan: string
}

const mockStudents: Student[] = [
  { id: '1', name: 'João Silva', email: 'joao@email.com', plan: 'Premium' },
  { id: '2', name: 'Maria Santos', email: 'maria@email.com', plan: 'Basic' },
  { id: '3', name: 'Pedro Costa', email: 'pedro@email.com', plan: 'Premium' },
  { id: '4', name: 'Ana Oliveira', email: 'ana@email.com', plan: 'Basic' },
  { id: '5', name: 'Lucas Mendes', email: 'lucas@email.com', plan: 'Premium' },
  { id: '6', name: 'Carla Ferreira', email: 'carla@email.com', plan: 'Basic' },
]

const templateSummary = {
  name: 'Hipertrofia Iniciante',
  description: 'Plano de 3 dias para alunos iniciantes focado em ganho de massa muscular com exercícios compostos.',
  exerciseCount: 18,
  daysCount: 3,
  category: 'Hipertrofia',
  days: ['Treino A - Peito/Tríceps', 'Treino B - Costas/Bíceps', 'Treino C - Pernas/Ombros'],
}

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
}

function WorkoutTemplateAssignPage() {
  const [selectedStudents, setSelectedStudents] = useState<Set<string>>(new Set())
  const [search, setSearch] = useState('')

  function toggleStudent(studentId: string) {
    setSelectedStudents((prev) => {
      const next = new Set(prev)
      if (next.has(studentId)) {
        next.delete(studentId)
      } else {
        next.add(studentId)
      }
      return next
    })
  }

  const filteredStudents = mockStudents.filter((s) =>
    search.trim() === ''
      ? true
      : s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.email.toLowerCase().includes(search.toLowerCase()),
  )

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
  }

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <motion.div variants={item}>
        <BackButton />
      </motion.div>

      <motion.div variants={item}>
        <h1 className="font-display text-2xl font-bold text-gray-900">
          Atribuir Template
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Selecione os alunos que receberão este plano de treino.
        </p>
      </motion.div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Template Summary */}
        <motion.div variants={item}>
          <Card>
            <CardHeader title="Resumo do Template" />
            <CardContent>
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-100">
                  <Dumbbell className="h-6 w-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="font-display text-lg font-semibold text-gray-900">
                      {templateSummary.name}
                    </h3>
                    <Badge variant="info">{templateSummary.category}</Badge>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">
                    {templateSummary.description}
                  </p>
                  <div className="mt-3 flex items-center gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1.5">
                      <Dumbbell className="h-3.5 w-3.5" />
                      {templateSummary.exerciseCount} exercícios
                    </span>
                    <span className="flex items-center gap-1.5">
                      <ClipboardCopy className="h-3.5 w-3.5" />
                      {templateSummary.daysCount} dias
                    </span>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {templateSummary.days.map((day) => (
                      <Badge key={day} variant="neutral">{day}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Student Selection */}
        <motion.div variants={item}>
          <Card>
            <CardHeader
              title="Selecionar Alunos"
              action={
                <span className="text-sm text-gray-500">
                  {selectedStudents.size} selecionado{selectedStudents.size !== 1 ? 's' : ''}
                </span>
              }
            />
            <CardContent className="space-y-4">
              <div className="max-w-sm">
                <Input
                  variant="search"
                  placeholder="Buscar aluno..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                {filteredStudents.map((student) => {
                  const isSelected = selectedStudents.has(student.id)

                  return (
                    <button
                      key={student.id}
                      type="button"
                      onClick={() => toggleStudent(student.id)}
                      className={cn(
                        'flex w-full items-center gap-4 rounded-xl border p-4 text-left transition-all',
                        isSelected
                          ? 'border-blue-300 bg-blue-50/50'
                          : 'border-gray-100 bg-white hover:border-gray-200 hover:bg-gray-50/50',
                      )}
                    >
                      <div
                        className={cn(
                          'flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition-colors',
                          isSelected
                            ? 'border-blue-500 bg-blue-500'
                            : 'border-gray-300',
                        )}
                      >
                        {isSelected ? (
                          <Check className="h-3 w-3 text-white" />
                        ) : null}
                      </div>

                      <div className="flex flex-1 items-center justify-between">
                        <div>
                          <span className="block text-sm font-medium text-gray-900">
                            {student.name}
                          </span>
                          <span className="text-xs text-gray-500">
                            {student.email}
                          </span>
                        </div>
                        <Badge variant={student.plan === 'Premium' ? 'info' : 'neutral'}>
                          {student.plan}
                        </Badge>
                      </div>
                    </button>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Submit */}
        <motion.div variants={item} className="flex justify-end">
          <Button
            type="submit"
            size="lg"
            disabled={selectedStudents.size === 0}
            iconLeft={<Send className="h-4 w-4" />}
          >
            Atribuir Template
          </Button>
        </motion.div>
      </form>
    </motion.div>
  )
}

export default WorkoutTemplateAssignPage
