import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import UserPlus from 'lucide-react/dist/esm/icons/user-plus'
import Link2 from 'lucide-react/dist/esm/icons/link-2'
import Check from 'lucide-react/dist/esm/icons/check'
import MoreHorizontal from 'lucide-react/dist/esm/icons/more-horizontal'
import type { Student, StudentStatus } from '@/types/student'
import { cn, formatDate } from '@/lib/utils'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { Avatar } from '@/components/ui/Avatar'
import { FilterTabs } from '@/components/ui/FilterTabs'
import { Pagination } from '@/components/ui/Pagination'
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard'

// ---------------------------------------------------------------------------
// Mock data
// ---------------------------------------------------------------------------

const mockStudents: Student[] = [
  {
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
  {
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
  {
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
  {
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
  {
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
  {
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
]

const statusConfig: Record<StudentStatus, { label: string; variant: 'success' | 'danger' | 'warning' }> = {
  active: { label: 'Ativo', variant: 'success' },
  inactive: { label: 'Inativo', variant: 'danger' },
  pending: { label: 'Pendente', variant: 'warning' },
}

const filterTabs = [
  { label: 'Todos', value: 'all', count: 6 },
  { label: 'Ativos', value: 'active', count: 4 },
  { label: 'Inativos', value: 'inactive', count: 1 },
  { label: 'Pendentes', value: 'pending', count: 1 },
]

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

function StudentsListPage() {
  const navigate = useNavigate()
  const { copied, copy } = useCopyToClipboard()
  const [search, setSearch] = useState('')
  const [activeFilter, setActiveFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)

  const filtered = mockStudents.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase())
    const matchesFilter = activeFilter === 'all' ? true : s.status === activeFilter
    return matchesSearch && matchesFilter
  })

  const handleCopyLink = () => {
    void copy('https://app.usfit.com.br/anamnesis/abc123')
  }

  return (
    <div className="space-y-6">
      {/* Actions bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="w-full max-w-sm">
          <Input
            variant="search"
            placeholder="Buscar aluno..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            size="sm"
            iconLeft={copied ? <Check className="h-4 w-4" /> : <Link2 className="h-4 w-4" />}
            onClick={handleCopyLink}
          >
            {copied ? 'Link Copiado!' : 'Copiar Link Anamnese'}
          </Button>
          <Button
            variant="primary"
            size="sm"
            iconLeft={<UserPlus className="h-4 w-4" />}
            onClick={() => navigate('/students/new')}
          >
            Novo Aluno
          </Button>
        </div>
      </div>

      {/* Filter tabs */}
      <FilterTabs
        tabs={filterTabs}
        activeTab={activeFilter}
        onTabChange={setActiveFilter}
      />

      {/* Table */}
      <Card>
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Aluno
                </th>
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Status
                </th>
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Contrato
                </th>
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Último Acesso
                </th>
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500 text-right">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-8 text-center text-sm text-gray-400"
                  >
                    Nenhum aluno encontrado.
                  </td>
                </tr>
              ) : (
                filtered.map((student, index) => {
                  const status = statusConfig[student.status]
                  return (
                    <motion.tr
                      key={student.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25, delay: index * 0.05 }}
                      onClick={() => navigate(`/students/${student.id}/overview`)}
                      className={cn(
                        'border-b border-gray-50 transition-colors duration-150',
                        'hover:bg-gray-50/80 cursor-pointer',
                      )}
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <Avatar
                            src={student.avatar}
                            name={student.name}
                            size="sm"
                            status={student.status === 'active' ? 'online' : 'offline'}
                          />
                          <div>
                            <p className="font-medium text-gray-900">{student.name}</p>
                            <p className="text-xs text-gray-500">{student.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <Badge variant={status.variant}>{status.label}</Badge>
                      </td>
                      <td className="px-4 py-3 text-gray-700">{student.contractType}</td>
                      <td className="px-4 py-3 text-gray-500">{formatDate(student.lastAccess)}</td>
                      <td className="px-4 py-3 text-right">
                        <button
                          type="button"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors cursor-pointer"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </button>
                      </td>
                    </motion.tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={3}
        totalResults={filtered.length}
        onPageChange={setCurrentPage}
      />
    </div>
  )
}

export { StudentsListPage }
export default StudentsListPage
