import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface Column<T> {
  key: string
  header: string
  render?: (row: T, index: number) => ReactNode
  className?: string
  headerClassName?: string
}

interface DataTableProps<T> {
  columns: Column<T>[]
  data: T[]
  keyExtractor: (row: T, index: number) => string
  onRowClick?: (row: T) => void
  emptyMessage?: string
  className?: string
}

function DataTable<T>({
  columns,
  data,
  keyExtractor,
  onRowClick,
  emptyMessage = 'Nenhum registro encontrado.',
  className,
}: DataTableProps<T>) {
  return (
    <div className={cn('w-full overflow-x-auto', className)}>
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-gray-100">
            {columns.map((col) => (
              <th
                key={col.key}
                className={cn(
                  'px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500',
                  col.headerClassName,
                )}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-4 py-8 text-center text-sm text-gray-400"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr
                key={keyExtractor(row, rowIndex)}
                onClick={onRowClick ? () => onRowClick(row) : undefined}
                className={cn(
                  'border-b border-gray-50 transition-colors duration-150',
                  'hover:bg-gray-50/80',
                  onRowClick ? 'cursor-pointer' : '',
                )}
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={cn('px-4 py-3 text-gray-700', col.className)}
                  >
                    {col.render
                      ? col.render(row, rowIndex)
                      : String((row as Record<string, unknown>)[col.key] ?? '')}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

export { DataTable }
export type { DataTableProps, Column }
