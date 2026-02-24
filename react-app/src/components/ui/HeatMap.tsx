import { cn } from '@/lib/utils'

type HeatLevel = 0 | 1 | 2 | 3

const levelColors: Record<HeatLevel, string> = {
  0: 'bg-[#E5E7EB]',
  1: 'bg-[#FBBF24]',
  2: 'bg-[#10B981]',
  3: 'bg-[#EF4444]',
}

const levelLabels: Record<HeatLevel, string> = {
  0: 'Sem atividade',
  1: 'Baixa',
  2: 'Moderada',
  3: 'Alta',
}

interface HeatMapDay {
  date: string
  level: HeatLevel
  label?: string
}

interface HeatMapProps {
  data: HeatMapDay[]
  columns?: number
  className?: string
}

function HeatMap({
  data,
  columns = 7,
  className,
}: HeatMapProps) {
  return (
    <div className={cn('inline-flex flex-col gap-1', className)}>
      <div
        className="grid gap-[3px]"
        style={{ gridTemplateColumns: `repeat(${columns}, 12px)` }}
      >
        {data.map((day) => (
          <div
            key={day.date}
            title={day.label ?? `${day.date}: ${levelLabels[day.level]}`}
            className={cn('heat-box', levelColors[day.level])}
          />
        ))}
      </div>

      <div className="mt-2 flex items-center gap-1.5 text-[10px] text-gray-400">
        <span>Menos</span>
        {([0, 1, 2, 3] as const).map((level) => (
          <div
            key={level}
            className={cn('heat-box', levelColors[level])}
          />
        ))}
        <span>Mais</span>
      </div>
    </div>
  )
}

export { HeatMap }
export type { HeatMapProps, HeatMapDay, HeatLevel }
