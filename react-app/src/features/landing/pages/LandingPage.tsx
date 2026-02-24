import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import Check from 'lucide-react/dist/esm/icons/check'
import Dumbbell from 'lucide-react/dist/esm/icons/dumbbell'
import Apple from 'lucide-react/dist/esm/icons/apple'
import BarChart3 from 'lucide-react/dist/esm/icons/bar-chart-3'
import Users from 'lucide-react/dist/esm/icons/users'
import ClipboardList from 'lucide-react/dist/esm/icons/clipboard-list'
import DollarSign from 'lucide-react/dist/esm/icons/dollar-sign'
import ArrowRight from 'lucide-react/dist/esm/icons/arrow-right'
import Menu from 'lucide-react/dist/esm/icons/menu'
import X from 'lucide-react/dist/esm/icons/x'
import { cn, formatCurrency } from '@/lib/utils'
import { Button } from '@/components/ui/Button'

// ---------------------------------------------------------------------------
// Content per audience
// ---------------------------------------------------------------------------

type Audience = 'b2c' | 'b2b'

const heroContent: Record<Audience, { headline: string; subheadline: string; cta: string }> = {
  b2c: {
    headline: 'Transforme seu corpo com acompanhamento profissional',
    subheadline: 'Planos de treino e nutrição personalizados, tudo em um só lugar. Alcance seus objetivos com o suporte dos melhores profissionais.',
    cta: 'Comece Agora',
  },
  b2b: {
    headline: 'Gerencie sua prática fitness de forma inteligente',
    subheadline: 'Plataforma completa para nutricionistas e personal trainers. Controle alunos, planos alimentares, treinos e cobranças em um só lugar.',
    cta: 'Experimente Grátis',
  },
}

const featuresContent: Record<Audience, Array<{ icon: typeof Dumbbell; title: string; description: string }>> = {
  b2c: [
    {
      icon: Dumbbell,
      title: 'Treinos Personalizados',
      description: 'Planos de treino criados por profissionais certificados, adaptados aos seus objetivos e nível de condicionamento.',
    },
    {
      icon: Apple,
      title: 'Nutrição Inteligente',
      description: 'Dietas calculadas com precisão para seus macros e preferências alimentares, com substituições automáticas.',
    },
    {
      icon: BarChart3,
      title: 'Acompanhamento de Progresso',
      description: 'Monitore sua evolução com métricas detalhadas de composição corporal, força e desempenho.',
    },
  ],
  b2b: [
    {
      icon: Users,
      title: 'Gestão de Alunos',
      description: 'Dashboard completo para gerenciar todos os seus alunos, contratos, pagamentos e evolução em tempo real.',
    },
    {
      icon: ClipboardList,
      title: 'Planos e Templates',
      description: 'Crie e reutilize templates de dietas e treinos. Atribua planos personalizados com poucos cliques.',
    },
    {
      icon: DollarSign,
      title: 'Controle Financeiro',
      description: 'Gerencie contratos, faturas e cobranças automaticamente. Visualize receita e inadimplência.',
    },
  ],
}

const pricingContent: Record<Audience, Array<{ name: string; price: number; features: string[]; popular?: boolean }>> = {
  b2c: [
    {
      name: 'Básico',
      price: 49,
      features: ['Plano de treino semanal', 'Acompanhamento por chat', 'Relatórios mensais'],
    },
    {
      name: 'Completo',
      price: 149,
      features: ['Treino + Nutrição', 'Avaliação física mensal', 'Suporte prioritário', 'App exclusivo'],
      popular: true,
    },
    {
      name: 'Premium',
      price: 299,
      features: ['Tudo do Completo', 'Consultas presenciais', 'Suplementação orientada', 'Acompanhamento diário'],
    },
  ],
  b2b: [
    {
      name: 'Starter',
      price: 49,
      features: ['Até 10 alunos', '1 profissional', 'Módulo de Nutrição', 'Suporte por e-mail'],
    },
    {
      name: 'PRO',
      price: 149,
      features: ['Até 50 alunos', '5 profissionais', 'Todos os módulos', 'Relatórios avançados', 'Suporte prioritário'],
      popular: true,
    },
    {
      name: 'Enterprise',
      price: 399,
      features: ['Alunos ilimitados', 'Profissionais ilimitados', 'API personalizada', 'Gerente dedicado', 'SLA garantido'],
    },
  ],
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

function LandingPage() {
  const [audience, setAudience] = useState<Audience>('b2b')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const hero = heroContent[audience]
  const features = featuresContent[audience]
  const pricing = pricingContent[audience]

  const navLinks = [
    { label: 'Funcionalidades', href: '#features' },
    { label: 'Preços', href: '#pricing' },
    { label: 'Contato', href: '#footer' },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-white/80 backdrop-blur-lg">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/lp" className="flex items-center gap-2">
            <div className="w-8 h-8">
              <img
                src="/logo.png"
                alt="USFIT logo"
                className="w-full h-full object-contain"
              />
            </div>
            <span className="font-semibold tracking-tight">
              <b className="text-gray-900 text-lg font-bold font-display">USFIT</b>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <Link to="/">
              <Button variant="primary" size="sm">
                Entrar
              </Button>
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <button
            type="button"
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg text-gray-600 hover:bg-gray-100 cursor-pointer"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile nav */}
        {mobileMenuOpen ? (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="border-t border-gray-100 bg-white p-4 md:hidden"
          >
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-gray-600 py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <Link to="/">
                <Button variant="primary" size="sm" className="w-full">
                  Entrar
                </Button>
              </Link>
            </div>
          </motion.div>
        ) : null}
      </nav>

      {/* Hero section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-50/50 via-white to-blue-50/50" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="font-display text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              {hero.headline}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
              {hero.subheadline}
            </p>
            <div className="mt-10">
              <Link to={audience === 'b2b' ? '/signup' : '/checkout'}>
                <Button
                  variant="primary"
                  size="lg"
                  iconRight={<ArrowRight className="h-5 w-5" />}
                >
                  {hero.cta}
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Audience toggle */}
      <section className="py-12 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-medium text-gray-500 mb-4">Selecione seu perfil</p>
          <div className="relative inline-flex rounded-full bg-white p-1 shadow-sm border border-gray-200">
            <motion.div
              className="absolute inset-y-1 rounded-full bg-usfit-gradient shadow-sm"
              initial={false}
              animate={{
                x: audience === 'b2c' ? 0 : '100%',
                width: '50%',
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            />
            <button
              type="button"
              onClick={() => setAudience('b2c')}
              className={cn(
                'relative z-10 rounded-full px-6 py-2.5 text-sm font-semibold transition-colors cursor-pointer',
                audience === 'b2c' ? 'text-white' : 'text-gray-600 hover:text-gray-900',
              )}
            >
              Para Atletas
            </button>
            <button
              type="button"
              onClick={() => setAudience('b2b')}
              className={cn(
                'relative z-10 rounded-full px-6 py-2.5 text-sm font-semibold transition-colors cursor-pointer',
                audience === 'b2b' ? 'text-white' : 'text-gray-600 hover:text-gray-900',
              )}
            >
              Para Profissionais
            </button>
          </div>
        </div>
      </section>

      {/* Features section */}
      <section id="features" className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="font-display text-3xl font-bold text-gray-900 sm:text-4xl">
              {audience === 'b2c' ? 'Tudo o que você precisa' : 'Ferramentas para crescer'}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-gray-600">
              {audience === 'b2c'
                ? 'Recursos completos para atingir seus objetivos de saúde e fitness.'
                : 'Uma plataforma completa para gerenciar e escalar sua prática profissional.'}
            </p>
          </div>

          <motion.div
            key={audience}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3"
          >
            {features.map((feature, idx) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-usfit-gradient">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold text-gray-900">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Pricing section */}
      <section id="pricing" className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="font-display text-3xl font-bold text-gray-900 sm:text-4xl">
              Planos e Preços
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-gray-600">
              Escolha o plano ideal para suas necessidades.
            </p>
          </div>

          <motion.div
            key={`pricing-${audience}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3"
          >
            {pricing.map((plan, idx) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className={cn(
                  'relative rounded-2xl border bg-white p-8 shadow-sm',
                  plan.popular
                    ? 'border-usfit-cyan shadow-md ring-2 ring-usfit-cyan/20'
                    : 'border-gray-200',
                )}
              >
                {plan.popular ? (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-usfit-gradient px-4 py-1 text-xs font-semibold text-white">
                    Mais Popular
                  </span>
                ) : null}
                <h3 className="font-display text-lg font-bold text-gray-900">{plan.name}</h3>
                <p className="mt-4">
                  <span className="font-display text-4xl font-bold text-gray-900">
                    {formatCurrency(plan.price)}
                  </span>
                  <span className="text-gray-500">/mês</span>
                </p>
                <ul className="mt-8 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-sm text-gray-600">
                      <Check className="h-4 w-4 text-green-500 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link to={audience === 'b2b' ? '/lp/checkout' : '/checkout'}>
                  <Button
                    variant={plan.popular ? 'primary' : 'outline'}
                    className="mt-8 w-full"
                  >
                    {audience === 'b2b' ? 'Começar Teste Grátis' : 'Assinar Agora'}
                  </Button>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer id="footer" className="border-t border-gray-200 bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8">
                  <img
                    src="/logo.png"
                    alt="USFIT logo"
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="font-display text-lg font-bold text-gray-900">USFIT</span>
              </div>
              <p className="mt-3 text-sm text-gray-500">
                Plataforma completa para profissionais de saúde e fitness.
              </p>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-900">Produto</h4>
              <ul className="mt-3 space-y-2">
                <li><a href="#features" className="text-sm text-gray-500 hover:text-gray-700">Funcionalidades</a></li>
                <li><a href="#pricing" className="text-sm text-gray-500 hover:text-gray-700">Preços</a></li>
                <li><a href="#" className="text-sm text-gray-500 hover:text-gray-700">Integrações</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-900">Empresa</h4>
              <ul className="mt-3 space-y-2">
                <li><a href="#" className="text-sm text-gray-500 hover:text-gray-700">Sobre</a></li>
                <li><a href="#" className="text-sm text-gray-500 hover:text-gray-700">Blog</a></li>
                <li><a href="#" className="text-sm text-gray-500 hover:text-gray-700">Carreiras</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-900">Suporte</h4>
              <ul className="mt-3 space-y-2">
                <li><a href="#" className="text-sm text-gray-500 hover:text-gray-700">Central de Ajuda</a></li>
                <li><a href="#" className="text-sm text-gray-500 hover:text-gray-700">Contato</a></li>
                <li><a href="#" className="text-sm text-gray-500 hover:text-gray-700">Termos de Uso</a></li>
              </ul>
            </div>
          </div>

          <div className="mt-10 border-t border-gray-100 pt-6 text-center">
            <p className="text-sm text-gray-400">
              2026 USFIT. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export { LandingPage }
export default LandingPage
