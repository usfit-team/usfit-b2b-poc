import { Link } from 'react-router-dom'
import CheckCircle from 'lucide-react/dist/esm/icons/check-circle'
import { Button } from '@/components/ui/Button'

interface ConfirmationPageProps {
  title: string
  message: string
  backHref: string
  backLabel: string
}

export function ConfirmationPage({ title, message, backHref, backLabel }: ConfirmationPageProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6 animate-[scaleIn_0.5s_ease-out_forwards]">
        <CheckCircle className="w-10 h-10 text-green-600" />
      </div>
      <h1 className="font-display text-2xl font-bold text-gray-900 mb-3">{title}</h1>
      <p className="text-gray-500 max-w-md mb-8">{message}</p>
      <Link to={backHref}>
        <Button variant="primary">{backLabel}</Button>
      </Link>
    </div>
  )
}
