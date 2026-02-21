import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { NAV_ITEMS, MOCK_USER } from '@/lib/constants'
import { useChat } from '@/contexts/ChatContext'
import { SidebarNavItem } from '@/components/layout/SidebarNavItem'
import Send from 'lucide-react/dist/esm/icons/send'
import LogOut from 'lucide-react/dist/esm/icons/log-out'

export function Sidebar() {
  const { toggleChat } = useChat()

  return (
    <aside className="w-64 bg-usfit-dark text-white flex flex-col flex-shrink-0 relative noise-overlay">
      {/* ---- Logo ---- */}
      <div className="h-20 flex items-center justify-center border-b border-gray-800 bg-usfit-darker">
        <Link to="/dashboard" className="flex items-center gap-2">
          <div className="w-8 h-8">
            <img
              src="/logo.png"
              alt="USFIT logo"
              className="w-full h-full object-contain"
            />
          </div>
          <span className="font-semibold tracking-tight">
            <b className="text-white text-xl font-bold font-display">USFIT</b>
            <span className="text-usfit-gradient font-display">B2B</span>
          </span>
        </Link>
      </div>

      {/* ---- Navigation ---- */}
      <nav className="flex-1 px-3 py-6 space-y-2 overflow-y-auto">
        {NAV_ITEMS.map((item) => (
          <SidebarNavItem key={item.href} item={item} />
        ))}
      </nav>

      {/* ---- FitBot Card ---- */}
      <div className="mt-auto pt-6 px-4 pb-4">
        <button
          type="button"
          onClick={toggleChat}
          className={cn(
            'w-full bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-4',
            'relative border border-gray-700 overflow-hidden group',
            'cursor-pointer hover:border-usfit-cyan transition-colors text-left',
          )}
        >
          {/* Glow */}
          <div className="absolute top-0 right-0 -mr-4 -mt-4 w-20 h-20 bg-usfit-cyan blur-3xl opacity-20 group-hover:opacity-40 transition-opacity" />

          <div className="relative z-10 flex flex-col items-center text-center">
            {/* Mascot */}
            <div className="w-16 h-16 mb-3 relative">
              <img
                src="/avatar.png"
                alt="Mascote USFIT"
                className="w-full h-full object-contain drop-shadow-lg transform group-hover:scale-110 transition-transform duration-300"
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-gray-800 rounded-full" />
            </div>

            <h4 className="text-white font-bold text-sm mb-1 font-display">
              Precisa de algo?
            </h4>
            <p className="text-xs text-gray-400 mb-3">
              Peça ao <span className="text-usfit-cyan font-bold">FitBot</span>{' '}
              agora!
            </p>

            <span
              className={cn(
                'w-full py-1.5 bg-usfit-cyan text-usfit-dark rounded-lg text-xs font-bold',
                'hover:bg-white transition-colors shadow-lg shadow-cyan-900/50',
                'flex items-center justify-center gap-1.5',
              )}
            >
              <Send className="w-3.5 h-3.5" />
              Iniciar Chat
            </span>
          </div>
        </button>
      </div>

      {/* ---- User Profile Footer ---- */}
      <div className="p-4 bg-usfit-darker border-t border-gray-800">
        <div className="flex items-center justify-between">
          <Link
            to="/settings"
            className="flex items-center gap-3 group hover:opacity-80 transition-opacity"
          >
            <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center border-2 border-gray-600 group-hover:border-usfit-cyan transition-colors">
              <span className="font-bold text-sm font-display">
                {MOCK_USER.initials}
              </span>
            </div>
            <div className="text-sm">
              <p className="font-semibold text-white font-display">
                {MOCK_USER.name}
              </p>
              <p className="text-xs text-usfit-cyan uppercase tracking-wide">
                Plano {MOCK_USER.plan.toUpperCase()}
              </p>
            </div>
          </Link>

          <Link
            to="/"
            className="p-2 text-gray-400 hover:text-white hover:bg-red-500/20 rounded-lg transition-colors"
            title="Sair"
          >
            <LogOut className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </aside>
  )
}
