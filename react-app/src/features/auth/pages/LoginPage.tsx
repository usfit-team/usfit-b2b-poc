import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import Mail from 'lucide-react/dist/esm/icons/mail'
import Lock from 'lucide-react/dist/esm/icons/lock'
import ArrowRight from 'lucide-react/dist/esm/icons/arrow-right'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import { useAuth, MOCK_USER } from '@/contexts/AuthContext'

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

export function LoginPage() {
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

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
          Bem-vindo de volta
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          Digite suas credenciais para acessar o painel.
        </p>
      </motion.div>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <motion.div variants={item} className="mb-4">
          <Label htmlFor="email">E-mail</Label>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              id="email"
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10"
            />
          </div>
        </motion.div>

        <motion.div variants={item} className="mb-2">
          <Label htmlFor="password">Senha</Label>
          <div className="relative">
            <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              id="password"
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-10"
            />
          </div>
        </motion.div>

        <motion.div variants={item} className="mb-6 flex justify-end">
          <Link
            to="#"
            className="text-xs font-medium text-usfit-blue hover:underline"
          >
            Esqueceu a senha?
          </Link>
        </motion.div>

        <motion.div variants={item}>
          <Button
            type="submit"
            size="lg"
            className="w-full"
            iconRight={<ArrowRight className="h-4 w-4" />}
          >
            Acessar Plataforma
          </Button>
        </motion.div>
      </form>

      {/* Bottom link */}
      <motion.p
        variants={item}
        className="mt-8 text-center text-sm text-gray-500"
      >
        Ainda não tem uma conta?{' '}
        <Link
          to="/signup"
          className="font-semibold text-usfit-blue hover:underline"
        >
          Cadastre-se gratuitamente
        </Link>
      </motion.p>
    </motion.div>
  )
}

export default LoginPage
