import { cn } from '@/lib/utils'

interface ToggleProps {
  checked: boolean
  onChange: (checked: boolean) => void
  label?: string
  disabled?: boolean
  className?: string
}

function Toggle({
  checked,
  onChange,
  label,
  disabled = false,
  className,
}: ToggleProps) {
  return (
    <label
      className={cn(
        'inline-flex items-center gap-2.5',
        disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
        className,
      )}
    >
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={cn(
          'relative inline-flex h-6 w-11 shrink-0 rounded-full border-2 border-transparent',
          'transition-colors duration-200 ease-in-out',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-usfit-cyan focus-visible:ring-offset-2',
          'cursor-pointer disabled:cursor-not-allowed',
          checked ? 'bg-usfit-cyan' : 'bg-gray-200',
        )}
      >
        <span
          className={cn(
            'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-sm',
            'transition-transform duration-200 ease-in-out',
            checked ? 'translate-x-5' : 'translate-x-0',
          )}
        />
      </button>

      {label ? (
        <span className="text-sm text-gray-700">{label}</span>
      ) : null}
    </label>
  )
}

export { Toggle }
export type { ToggleProps }
