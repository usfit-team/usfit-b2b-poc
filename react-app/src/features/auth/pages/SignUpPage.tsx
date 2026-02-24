import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import User from 'lucide-react/dist/esm/icons/user'
import Mail from 'lucide-react/dist/esm/icons/mail'
import Lock from 'lucide-react/dist/esm/icons/lock'
import ArrowRight from 'lucide-react/dist/esm/icons/arrow-right'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'

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

export function SignUpPage() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [termsAccepted, setTermsAccepted] = useState(false)

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    navigate('/setup-profile')
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
          Crie sua conta
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          Preencha os dados abaixo para come&ccedil;ar a usar a plataforma.
        </p>
      </motion.div>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <motion.div variants={item} className="mb-4">
          <Label htmlFor="name">Nome completo</Label>
          <div className="relative">
            <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              id="name"
              type="text"
              placeholder="Seu nome completo"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="pl-10"
            />
          </div>
        </motion.div>

        <motion.div variants={item} className="mb-4">
          <Label htmlFor="signup-email">E-mail</Label>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              id="signup-email"
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10"
            />
          </div>
        </motion.div>

        <motion.div variants={item} className="mb-4">
          <Label htmlFor="signup-password">Senha</Label>
          <div className="relative">
            <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              id="signup-password"
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-10"
            />
          </div>
        </motion.div>

        <motion.div variants={item} className="mb-4">
          <Label htmlFor="confirm-password">Confirmar senha</Label>
          <div className="relative">
            <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              id="confirm-password"
              type="password"
              placeholder="********"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="pl-10"
            />
          </div>
        </motion.div>

        <motion.div variants={item} className="mb-6">
          <label className="flex items-start gap-2 text-sm text-gray-600">
            <input
              type="checkbox"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              className="mt-0.5 h-4 w-4 rounded border-gray-300 text-usfit-blue focus:ring-usfit-cyan"
            />
            <span>
              Eu aceito os{' '}
              <Link to="#" className="font-medium text-usfit-blue hover:underline">
                Termos de Uso
              </Link>{' '}
              e a{' '}
              <Link to="#" className="font-medium text-usfit-blue hover:underline">
                Pol&iacute;tica de Privacidade
              </Link>
            </span>
          </label>
        </motion.div>

        <motion.div variants={item}>
          <Button
            type="submit"
            size="lg"
            className="w-full"
            iconRight={<ArrowRight className="h-4 w-4" />}
          >
            Criar conta
          </Button>
        </motion.div>
      </form>

      {/* Bottom link */}
      <motion.p
        variants={item}
        className="mt-8 text-center text-sm text-gray-500"
      >
        J&aacute; tem uma conta?{' '}
        <Link
          to="/"
          className="font-semibold text-usfit-blue hover:underline"
        >
          Fa&ccedil;a login
        </Link>
      </motion.p>
    </motion.div>
  )
}

export default SignUpPage
