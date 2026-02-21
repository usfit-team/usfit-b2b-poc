import { Outlet } from 'react-router-dom'
import { motion } from 'motion/react'

export function AuthLayout() {
  return (
    <div className="h-screen flex overflow-hidden bg-white">
      {/* ---- Left Dark Panel ---- */}
      <div className="hidden md:flex md:w-1/2 lg:w-5/12 bg-usfit-darker relative flex-col justify-between p-12 overflow-hidden noise-overlay">
        {/* Animated gradient blobs */}
        <motion.div
          className="absolute top-0 right-0 w-[500px] h-[500px] bg-usfit-cyan rounded-full mix-blend-multiply filter blur-[120px] opacity-20 -translate-y-1/2 translate-x-1/2"
          animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.3, 0.2] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-usfit-blue rounded-full mix-blend-multiply filter blur-[120px] opacity-20 translate-y-1/2 -translate-x-1/2"
          animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.25, 0.2] }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        />

        {/* Logo */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-usfit-gradient flex items-center justify-center font-bold text-white italic text-lg shadow-lg shadow-cyan-500/30 font-display">
            US
          </div>
          <span className="text-2xl font-bold tracking-tight text-white font-display">
            USFITB2B
          </span>
        </div>

        {/* Hero text */}
        <div className="relative z-10 max-w-md">
          <h2 className="text-4xl font-bold text-white mb-6 leading-tight font-display">
            Potencialize sua consultoria de saúde.
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            A plataforma completa para Nutricionistas e Personal Trainers.
            Gerencie alunos, dietas e treinos em um único lugar com
            inteligência e eficiência.
          </p>
        </div>

        {/* Copyright footer */}
        <div className="relative z-10 text-sm text-gray-500">
          &copy; {new Date().getFullYear()} USFIT Tecnologia. Todos os direitos
          reservados.
        </div>
      </div>

      {/* ---- Right Panel (Form) ---- */}
      <div className="w-full md:w-1/2 lg:w-7/12 flex items-center justify-center p-8 bg-white relative">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="w-full max-w-sm"
        >
          <Outlet />
        </motion.div>
      </div>
    </div>
  )
}
