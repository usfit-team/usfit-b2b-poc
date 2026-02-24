import { cn } from '@/lib/utils'

interface FilterTab {
  label: string
  value: string
  count?: number
}

interface FilterTabsProps {
  tabs: FilterTab[]
  activeTab: string
  onTabChange: (value: string) => void
  className?: string
}

function FilterTabs({
  tabs,
  activeTab,
  onTabChange,
  className,
}: FilterTabsProps) {
  return (
    <div
      className={cn(
        'flex gap-1 border-b border-gray-200',
        className,
      )}
    >
      {tabs.map((tab) => (
        <button
          key={tab.value}
          type="button"
          onClick={() => onTabChange(tab.value)}
          className={cn(
            'relative px-4 py-2.5 text-sm font-medium',
            'transition-colors duration-200',
            'cursor-pointer',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-usfit-cyan focus-visible:ring-offset-2',
            activeTab === tab.value
              ? 'text-usfit-blue'
              : 'text-gray-500 hover:text-gray-700',
          )}
        >
          <span className="flex items-center gap-1.5">
            {tab.label}
            {tab.count !== undefined ? (
              <span
                className={cn(
                  'inline-flex items-center justify-center rounded-full px-1.5 py-0.5 text-[10px] font-semibold',
                  activeTab === tab.value
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-gray-100 text-gray-500',
                )}
              >
                {tab.count}
              </span>
            ) : null}
          </span>

          {activeTab === tab.value ? (
            <span className="absolute inset-x-0 -bottom-px h-0.5 bg-usfit-gradient" />
          ) : null}
        </button>
      ))}
    </div>
  )
}

export { FilterTabs }
export type { FilterTabsProps, FilterTab }
