import { useState, useRef, useCallback } from 'react'
import ChevronUp from 'lucide-react/dist/esm/icons/chevron-up'
import RefreshCw from 'lucide-react/dist/esm/icons/refresh-cw'

interface SubstitutionItem {
  name: string
  portion: string
  calories: number
}

interface SubstitutionPanelProps {
  items: SubstitutionItem[]
  count: number
}

export function SubstitutionPanel({ items, count }: SubstitutionPanelProps) {
  const [isOpen, setIsOpen] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)

  const toggle = useCallback(() => {
    const panel = panelRef.current
    if (!panel) return

    if (isOpen) {
      panel.style.maxHeight = '0px'
      panel.classList.remove('open')
    } else {
      panel.classList.remove('hidden')
      requestAnimationFrame(() => {
        panel.classList.add('open')
        panel.style.maxHeight = `${panel.scrollHeight}px`
      })
    }
    setIsOpen((prev) => !prev)
  }, [isOpen])

  return (
    <div className="group">
      <button
        onClick={toggle}
        className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded transition-colors ${
          isOpen ? 'bg-blue-100 text-usfit-blue' : 'text-gray-400 hover:text-usfit-blue'
        }`}
      >
        {isOpen ? (
          <>
            <ChevronUp className="w-3 h-3" /> Ocultar
          </>
        ) : (
          <>
            <RefreshCw className="w-3 h-3" /> {count} substituições
          </>
        )}
      </button>

      <div ref={panelRef} className="substitution-panel">
        <div className="pt-2 space-y-2">
          {items.map((item, i) => (
            <div key={i} className="flex items-center justify-between bg-gray-50 p-2 rounded-lg text-xs">
              <span className="font-medium text-gray-700">{item.name}</span>
              <span className="text-gray-500">{item.portion} • {item.calories} kcal</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
