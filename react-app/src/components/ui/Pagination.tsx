import ChevronLeft from 'lucide-react/dist/esm/icons/chevron-left'
import ChevronRight from 'lucide-react/dist/esm/icons/chevron-right'
import { cn } from '@/lib/utils'

interface PaginationProps {
  currentPage: number
  totalPages: number
  totalResults?: number
  onPageChange: (page: number) => void
  className?: string
}

function Pagination({
  currentPage,
  totalPages,
  totalResults,
  onPageChange,
  className,
}: PaginationProps) {
  const pages = generatePageNumbers(currentPage, totalPages)

  return (
    <div
      className={cn(
        'flex items-center justify-between gap-4',
        className,
      )}
    >
      {totalResults !== undefined ? (
        <span className="text-sm text-gray-500">
          {totalResults} resultado{totalResults !== 1 ? 's' : ''}
        </span>
      ) : (
        <span />
      )}

      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className={cn(
            'inline-flex h-8 w-8 items-center justify-center rounded-full text-sm',
            'transition-colors duration-150',
            'disabled:opacity-40 disabled:cursor-not-allowed',
            'hover:bg-gray-100 text-gray-600',
            'cursor-pointer',
          )}
          aria-label="Página anterior"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        {pages.map((page, i) =>
          page === '...' ? (
            <span
              key={`ellipsis-${i}`}
              className="inline-flex h-8 w-8 items-center justify-center text-sm text-gray-400"
            >
              ...
            </span>
          ) : (
            <button
              type="button"
              key={page}
              onClick={() => onPageChange(page as number)}
              className={cn(
                'inline-flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium',
                'transition-all duration-150',
                'cursor-pointer',
                currentPage === page
                  ? 'bg-usfit-gradient text-white shadow-sm'
                  : 'text-gray-600 hover:bg-gray-100',
              )}
            >
              {page}
            </button>
          ),
        )}

        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className={cn(
            'inline-flex h-8 w-8 items-center justify-center rounded-full text-sm',
            'transition-colors duration-150',
            'disabled:opacity-40 disabled:cursor-not-allowed',
            'hover:bg-gray-100 text-gray-600',
            'cursor-pointer',
          )}
          aria-label="Próxima página"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

function generatePageNumbers(
  current: number,
  total: number,
): (number | '...')[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }

  const pages: (number | '...')[] = [1]

  if (current > 3) {
    pages.push('...')
  }

  const start = Math.max(2, current - 1)
  const end = Math.min(total - 1, current + 1)

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  if (current < total - 2) {
    pages.push('...')
  }

  pages.push(total)

  return pages
}

export { Pagination }
export type { PaginationProps }
