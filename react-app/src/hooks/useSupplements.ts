import { useState, useCallback } from 'react'
import type { Supplement } from '@/types/nutrition'

export function useSupplements(initial: Supplement[] = []) {
  const [supplements, setSupplements] = useState<Supplement[]>(initial)

  const addSupplement = useCallback((name: string, dose: string, frequency: string) => {
    if (!name) return
    setSupplements((prev) => [
      ...prev,
      { id: crypto.randomUUID(), name, dose, frequency },
    ])
  }, [])

  const removeSupplement = useCallback((id: string) => {
    setSupplements((prev) => prev.filter((s) => s.id !== id))
  }, [])

  return { supplements, addSupplement, removeSupplement }
}
