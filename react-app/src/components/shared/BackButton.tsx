import { useNavigate } from 'react-router-dom'
import ArrowLeft from 'lucide-react/dist/esm/icons/arrow-left'

export function BackButton({ label = 'Voltar' }: { label?: string }) {
  const navigate = useNavigate()

  return (
    <button
      onClick={() => navigate(-1)}
      className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-usfit-blue transition-colors"
    >
      <ArrowLeft className="w-4 h-4" />
      {label}
    </button>
  )
}
