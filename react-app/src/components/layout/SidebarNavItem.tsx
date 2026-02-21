import { NavLink } from 'react-router-dom'
import { cn } from '@/lib/utils'
import type { NavItem } from '@/types/common'
import LayoutDashboard from 'lucide-react/dist/esm/icons/layout-dashboard'
import Users from 'lucide-react/dist/esm/icons/users'
import Utensils from 'lucide-react/dist/esm/icons/utensils'
import Dumbbell from 'lucide-react/dist/esm/icons/dumbbell'
import FileText from 'lucide-react/dist/esm/icons/file-text'
import Briefcase from 'lucide-react/dist/esm/icons/briefcase'
import Wallet from 'lucide-react/dist/esm/icons/wallet'

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  'layout-dashboard': LayoutDashboard,
  users: Users,
  utensils: Utensils,
  dumbbell: Dumbbell,
  'file-text': FileText,
  briefcase: Briefcase,
  wallet: Wallet,
}

interface SidebarNavItemProps {
  item: NavItem
}

export function SidebarNavItem({ item }: SidebarNavItemProps) {
  const Icon = ICON_MAP[item.iconName]

  return (
    <NavLink
      to={item.href}
      className={({ isActive }) =>
        cn(
          'relative flex items-center px-4 py-3 rounded-xl transition-colors group',
          isActive
            ? 'text-white bg-gray-800 shadow-lg shadow-cyan-900/20'
            : 'text-gray-400 hover:text-white hover:bg-gray-800',
        )
      }
    >
      {({ isActive }) => (
        <>
          {isActive ? (
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-usfit-gradient rounded-r-full" />
          ) : null}
          {Icon ? (
            <Icon
              className={cn(
                'w-5 h-5 mr-3 transition-colors',
                isActive ? 'text-usfit-cyan' : 'group-hover:text-usfit-cyan',
              )}
            />
          ) : null}
          <span className="font-medium font-display">{item.label}</span>
        </>
      )}
    </NavLink>
  )
}
