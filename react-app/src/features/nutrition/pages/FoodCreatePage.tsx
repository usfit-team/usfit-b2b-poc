import { useState } from 'react'
import { motion } from 'motion/react'
import Save from 'lucide-react/dist/esm/icons/save'
import Apple from 'lucide-react/dist/esm/icons/apple'
import { Card, CardHeader, CardContent } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Button } from '@/components/ui/Button'
import { BackButton } from '@/components/shared/BackButton'

// ── Constants ──────────────────────────────────────────────

const CATEGORY_OPTIONS = [
  { label: 'Proteinas', value: 'Proteinas' },
  { label: 'Cereais', value: 'Cereais' },
  { label: 'Frutas', value: 'Frutas' },
  { label: 'Leguminosas', value: 'Leguminosas' },
  { label: 'Tuberculos', value: 'Tuberculos' },
  { label: 'Verduras', value: 'Verduras' },
  { label: 'Laticinios', value: 'Laticinios' },
  { label: 'Oleos', value: 'Oleos' },
  { label: 'Outros', value: 'Outros' },
]

// ── Component ──────────────────────────────────────────────

export default function FoodCreatePage() {
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [portion, setPortion] = useState('100g')
  const [calories, setCalories] = useState(0)
  const [protein, setProtein] = useState(0)
  const [carbs, setCarbs] = useState(0)
  const [fat, setFat] = useState(0)
  const [fiber, setFiber] = useState(0)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <BackButton label="Voltar para Alimentos" />
          <h1 className="mt-2 font-display text-2xl font-bold text-gray-900">
            Cadastrar Alimento
          </h1>
          <p className="text-sm text-gray-500">
            Adicione um novo alimento ao banco de dados
          </p>
        </div>
        <Button
          iconLeft={<Save className="h-4 w-4" />}
          disabled={!name || !category}
        >
          Salvar Alimento
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Basic Info */}
        <Card>
          <CardHeader
            title="Informacoes Basicas"
            action={<Apple className="h-5 w-5 text-green-500" />}
          />
          <CardContent className="space-y-4">
            <Input
              label="Nome do Alimento"
              placeholder="Ex: Frango Grelhado"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Select
              label="Categoria"
              placeholder="Selecione a categoria"
              options={CATEGORY_OPTIONS}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
            <Input
              label="Porcao Padrao"
              placeholder="Ex: 100g"
              value={portion}
              onChange={(e) => setPortion(e.target.value)}
              hint="Informe a porcao de referencia para os valores nutricionais"
            />
          </CardContent>
        </Card>

        {/* Nutritional Info */}
        <Card>
          <CardHeader title="Informacoes Nutricionais" />
          <CardContent className="space-y-4">
            <Input
              label="Calorias (kcal)"
              type="number"
              value={calories}
              onChange={(e) => setCalories(Number(e.target.value))}
              variant="active"
            />
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Proteina (g)"
                type="number"
                value={protein}
                onChange={(e) => setProtein(Number(e.target.value))}
              />
              <Input
                label="Carboidrato (g)"
                type="number"
                value={carbs}
                onChange={(e) => setCarbs(Number(e.target.value))}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Gordura (g)"
                type="number"
                value={fat}
                onChange={(e) => setFat(Number(e.target.value))}
              />
              <Input
                label="Fibra (g)"
                type="number"
                value={fiber}
                onChange={(e) => setFiber(Number(e.target.value))}
              />
            </div>

            {/* Calculated Summary */}
            {calories > 0 ? (
              <div className="rounded-xl bg-gray-50 p-4">
                <p className="text-xs font-medium text-gray-500 mb-2">
                  Resumo por {portion}
                </p>
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-gray-600">
                    P: <strong className="text-gray-900">{protein}g</strong>
                  </span>
                  <span className="text-gray-600">
                    C: <strong className="text-gray-900">{carbs}g</strong>
                  </span>
                  <span className="text-gray-600">
                    G: <strong className="text-gray-900">{fat}g</strong>
                  </span>
                  <span className="text-gray-600">
                    Fibra: <strong className="text-gray-900">{fiber}g</strong>
                  </span>
                  <span className="ml-auto font-bold text-usfit-blue">
                    {calories} kcal
                  </span>
                </div>
              </div>
            ) : null}
          </CardContent>
        </Card>
      </div>
    </motion.div>
  )
}
