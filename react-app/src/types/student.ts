export type StudentStatus = 'active' | 'inactive' | 'pending'

export interface Student {
  id: string
  name: string
  email: string
  phone: string
  avatar?: string
  initials: string
  status: StudentStatus
  contractType: string
  lastAccess: string
  registeredAt: string
  goal: string
  age: number
  gender: 'male' | 'female'
  weight: number
  height: number
  bodyFat?: number
}
