import { useState, useMemo } from 'react'
import { motion } from 'motion/react'
import Search from 'lucide-react/dist/esm/icons/search'
import UserCheck from 'lucide-react/dist/esm/icons/user-check'
import Zap from 'lucide-react/dist/esm/icons/zap'
import FileText from 'lucide-react/dist/esm/icons/file-text'
import Check from 'lucide-react/dist/esm/icons/check'
import { cn } from '@/lib/utils'
import { Card, CardHeader, CardContent } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { BackButton } from '@/components/shared/BackButton'

// ── Mock Data ──────────────────────────────────────────────

const MOCK_TEMPLATE = {
  id: 't1',
  name: 'Hipertrofia Iniciante',
  description: 'Plano para ganho de massa muscular com superavit calorico moderado. Ideal para alunos iniciantes.',
  vet: 3000,
  protein: 160,
  carbs: 350,
  fat: 80,
  mealsCount: 6,
}

const MOCK_STUDENTS = [
  { id: 's1', name: 'Carlos Almeida', email: 'carlos@email.com' },
  { id: 's2', name: 'Ana Paula Souza', email: 'ana@email.com' },
  { id: 's3', name: 'Roberto Lima', email: 'roberto@email.com' },
  { id: 's4', name: 'Fernanda Costa', email: 'fernanda@email.com' },
  { id: 's5', name: 'Marcos Oliveira', email: 'marcos@email.com' },
]

// ── Component ──────────────────────────────────────────────

export default function DietTemplateAssignPage() {
  const [studentSearch, setStudentSearch] = useState('')
  const [selectedStudentId, setSelectedStudentId] = useState('')
  const [startDate, setStartDate] = useState('')
  const [adjustVet, setAdjustVet] = useState(false)
  const [customVet, setCustomVet] = useState(MOCK_TEMPLATE.vet)

  const filteredStudents = useMemo(() => {
    if (!studentSearch) return MOCK_STUDENTS
    const lc = studentSearch.toLowerCase()
    return MOCK_STUDENTS.filter(
      (s) => s.name.toLowerCase().includes(lc) || s.email.toLowerCase().includes(lc),
    )
  }, [studentSearch])

  const selectedStudent = useMemo(() => {
    return MOCK_STUDENTS.find((s) => s.id === selectedStudentId)
  }, [selectedStudentId])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Header */}
      <div>
        <BackButton label="Voltar para Templates" />
        <h1 className="mt-2 font-display text-2xl font-bold text-gray-900">
          Atribuir Template
        </h1>
        <p className="text-sm text-gray-500">
          Aplique um template de dieta para um aluno
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Template Summary */}
        <Card>
          <CardHeader
            title="Template Selecionado"
            action={<FileText className="h-5 w-5 text-usfit-cyan" />}
          />
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {MOCK_TEMPLATE.name}
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                {MOCK_TEMPLATE.description}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-usfit-cyan" />
              <span className="text-base font-bold text-gray-900">
                {MOCK_TEMPLATE.vet} kcal
              </span>
              <Badge variant="info">{MOCK_TEMPLATE.mealsCount} refeicoes</Badge>
            </div>

            <div className="flex items-center gap-4 rounded-lg bg-gray-50 p-3 text-sm">
              <span className="text-gray-500">
                P: <strong className="text-gray-800">{MOCK_TEMPLATE.protein}g</strong>
              </span>
              <span className="text-gray-500">
                C: <strong className="text-gray-800">{MOCK_TEMPLATE.carbs}g</strong>
              </span>
              <span className="text-gray-500">
                G: <strong className="text-gray-800">{MOCK_TEMPLATE.fat}g</strong>
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Student Selection */}
        <Card>
          <CardHeader
            title="Selecionar Aluno"
            action={<UserCheck className="h-5 w-5 text-usfit-cyan" />}
          />
          <CardContent className="space-y-4">
            {/* Search */}
            <Input
              variant="search"
              placeholder="Buscar aluno por nome ou email..."
              value={studentSearch}
              onChange={(e) => setStudentSearch(e.target.value)}
            />

            {/* Student List */}
            <div className="max-h-48 space-y-1 overflow-y-auto">
              {filteredStudents.map((student) => (
                <button
                  key={student.id}
                  type="button"
                  onClick={() => setSelectedStudentId(student.id)}
                  className={cn(
                    'flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition-colors',
                    'cursor-pointer',
                    selectedStudentId === student.id
                      ? 'bg-blue-50 border border-blue-200 text-blue-900'
                      : 'hover:bg-gray-50 text-gray-700',
                  )}
                >
                  <div>
                    <p className="font-medium">{student.name}</p>
                    <p className="text-xs text-gray-400">{student.email}</p>
                  </div>
                  {selectedStudentId === student.id ? (
                    <Check className="h-4 w-4 text-blue-600" />
                  ) : null}
                </button>
              ))}
            </div>

            {/* Selected Student Badge */}
            {selectedStudent ? (
              <div className="rounded-lg bg-green-50 border border-green-200 p-3">
                <p className="text-xs text-green-600">Aluno selecionado</p>
                <p className="text-sm font-semibold text-green-800">
                  {selectedStudent.name}
                </p>
              </div>
            ) : null}
          </CardContent>
        </Card>
      </div>

      {/* Customization Options */}
      <Card>
        <CardHeader title="Opcoes de Personalizacao" />
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Input
              label="Data de Inicio"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <Select
              label="Duracao"
              options={[
                { label: '4 semanas', value: '4' },
                { label: '8 semanas', value: '8' },
                { label: '12 semanas', value: '12' },
                { label: 'Sem prazo', value: '0' },
              ]}
            />
            <Select
              label="Ajuste Automatico"
              options={[
                { label: 'Nenhum', value: 'none' },
                { label: 'Progressivo (+5%/semana)', value: 'progressive' },
                { label: 'Reverso (-5%/semana)', value: 'reverse' },
              ]}
            />
          </div>

          {/* VET Adjustment */}
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={adjustVet}
                onChange={(e) => setAdjustVet(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-usfit-cyan focus:ring-usfit-cyan"
              />
              <span className="text-gray-700">Ajustar VET para este aluno</span>
            </label>
          </div>

          {adjustVet ? (
            <div className="max-w-xs">
              <Input
                label="VET Personalizado (kcal)"
                type="number"
                value={customVet}
                onChange={(e) => setCustomVet(Number(e.target.value))}
                variant="active"
              />
            </div>
          ) : null}
        </CardContent>
      </Card>

      {/* Action */}
      <div className="flex justify-end">
        <Button
          iconLeft={<UserCheck className="h-4 w-4" />}
          disabled={!selectedStudentId}
        >
          Atribuir Template
        </Button>
      </div>
    </motion.div>
  )
}
