import { useState } from 'react'
import type { FormEvent } from 'react'
import { motion } from 'motion/react'
import ArrowRight from 'lucide-react/dist/esm/icons/arrow-right'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import { Select } from '@/components/ui/Select'
import { useAuth, MOCK_USER } from '@/contexts/AuthContext'

const specialtyOptions = [
  { label: 'Nutricionista', value: 'nutritionist' },
  { label: 'Personal Trainer', value: 'trainer' },
  { label: 'Ambos', value: 'both' },
]

const studentsCountOptions = [
  { label: '1 - 10 alunos', value: '1-10' },
  { label: '11 - 30 alunos', value: '11-30' },
  { label: '31 - 60 alunos', value: '31-60' },
  { label: '61 - 100 alunos', value: '61-100' },
  { label: 'Mais de 100 alunos', value: '100+' },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
}

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
}

export function SetupProfilePage() {
  const { login } = useAuth()
  const [specialty, setSpecialty] = useState('')
  const [registrationNumber, setRegistrationNumber] = useState('')
  const [studentsCount, setStudentsCount] = useState('')
  const [companyName, setCompanyName] = useState('')

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    login(MOCK_USER)
  }

  return (
    <motion.div variants={container} initial="hidden" animate="show">
      {/* Mobile logo */}
      <motion.div variants={item} className="mb-8 flex items-center gap-3 md:hidden">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-usfit-gradient font-display text-lg font-bold italic text-white shadow-lg shadow-cyan-500/30">
          US
        </div>
        <span className="font-display text-2xl font-bold tracking-tight text-gray-900">
          USFITB2B
        </span>
      </motion.div>

      {/* Heading */}
      <motion.div variants={item} className="mb-8">
        <h1 className="font-display text-2xl font-bold text-gray-900">
          Configure seu perfil
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          Nos conte um pouco sobre sua atua&ccedil;&atilde;o profissional.
        </p>
      </motion.div>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <motion.div variants={item} className="mb-4">
          <Label htmlFor="specialty">Especialidade</Label>
          <Select
            id="specialty"
            options={specialtyOptions}
            placeholder="Selecione sua especialidade"
            value={specialty}
            onChange={(e) => setSpecialty(e.target.value)}
          />
        </motion.div>

        <motion.div variants={item} className="mb-4">
          <Label htmlFor="registration-number">CREF / CRN</Label>
          <Input
            id="registration-number"
            type="text"
            placeholder="Ex: 012345-G/SP"
            value={registrationNumber}
            onChange={(e) => setRegistrationNumber(e.target.value)}
          />
        </motion.div>

        <motion.div variants={item} className="mb-4">
          <Label htmlFor="students-count">N&uacute;mero de alunos</Label>
          <Select
            id="students-count"
            options={studentsCountOptions}
            placeholder="Quantos alunos voc&ecirc; atende?"
            value={studentsCount}
            onChange={(e) => setStudentsCount(e.target.value)}
          />
        </motion.div>

        <motion.div variants={item} className="mb-8">
          <Label htmlFor="company-name">Nome da empresa (opcional)</Label>
          <Input
            id="company-name"
            type="text"
            placeholder="Ex: Studio Fitness"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
        </motion.div>

        <motion.div variants={item}>
          <Button
            type="submit"
            size="lg"
            className="w-full"
            iconRight={<ArrowRight className="h-4 w-4" />}
          >
            Come&ccedil;ar a usar
          </Button>
        </motion.div>
      </form>
    </motion.div>
  )
}

export default SetupProfilePage
