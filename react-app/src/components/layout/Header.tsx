import Bell from 'lucide-react/dist/esm/icons/bell'

interface HeaderProps {
  title: string
  subtitle?: string
}

export function Header({ title, subtitle }: HeaderProps) {
  return (
    <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-8 flex-shrink-0 z-20 shadow-sm">
      <div>
        <h1 className="text-xl font-bold text-gray-800 font-display">
          {title}
        </h1>
        {subtitle ? (
          <p className="text-xs text-gray-500">{subtitle}</p>
        ) : null}
      </div>

      <div className="flex items-center gap-3">
        <div className="h-8 w-px bg-gray-200 mx-1" />
        <button
          type="button"
          className="p-2 text-gray-400 hover:bg-gray-100 rounded-full relative transition-colors"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white" />
        </button>
      </div>
    </header>
  )
}
