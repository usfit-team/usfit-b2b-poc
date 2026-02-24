import { NavLink } from 'react-router-dom'
import { cn } from '@/lib/utils'

interface Tab {
  label: string
  href: string
}

interface TabNavigationProps {
  tabs: Tab[]
}

export function TabNavigation({ tabs }: TabNavigationProps) {
  return (
    <div className="flex gap-6 border-b border-gray-200">
      {tabs.map((tab) => (
        <NavLink
          key={tab.href}
          to={tab.href}
          end
          className={({ isActive }) =>
            cn(
              'pb-3 text-sm font-medium border-b-2 transition-all',
              isActive
                ? 'text-usfit-cyan border-usfit-cyan'
                : 'text-gray-500 border-transparent hover:text-gray-900',
            )
          }
        >
          {tab.label}
        </NavLink>
      ))}
    </div>
  )
}
