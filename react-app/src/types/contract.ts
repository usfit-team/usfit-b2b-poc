export type ContractStatus = 'active' | 'expiring' | 'expired' | 'cancelled'
export type PaymentFrequency = 'monthly' | 'quarterly' | 'annual'

export interface Contract {
  id: string
  studentName: string
  studentId: string
  service: string
  status: ContractStatus
  startDate: string
  endDate: string
  value: number
  paymentFrequency: PaymentFrequency
  daysRemaining?: number
}
