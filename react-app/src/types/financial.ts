export type InvoiceStatus = 'paid' | 'pending' | 'overdue'

export interface Invoice {
  id: string
  studentName: string
  description: string
  value: number
  dueDate: string
  status: InvoiceStatus
  paidAt?: string
}

export interface FinancialSummary {
  totalRevenue: number
  pendingAmount: number
  overdueAmount: number
  paidCount: number
  pendingCount: number
  overdueCount: number
}
