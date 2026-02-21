import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

const data = [
  { month: 'Ago', alunos: 65 },
  { month: 'Set', alunos: 68 },
  { month: 'Out', alunos: 72 },
  { month: 'Nov', alunos: 75 },
  { month: 'Dez', alunos: 82 },
  { month: 'Jan', alunos: 85 },
]

function GrowthChart() {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <AreaChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
        <defs>
          <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.15} />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.01} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
        <XAxis
          dataKey="month"
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 12, fill: '#9ca3af' }}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 12, fill: '#9ca3af' }}
          domain={[50, 100]}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: '#fff',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            fontSize: '13px',
            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
          }}
          labelStyle={{ fontWeight: 600, color: '#111827' }}
        />
        <Area
          type="monotone"
          dataKey="alunos"
          stroke="#3b82f6"
          strokeWidth={2.5}
          fill="url(#blueGradient)"
          dot={{ r: 4, fill: '#3b82f6', stroke: '#fff', strokeWidth: 2 }}
          activeDot={{ r: 6, fill: '#3b82f6', stroke: '#fff', strokeWidth: 2 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

export default GrowthChart
