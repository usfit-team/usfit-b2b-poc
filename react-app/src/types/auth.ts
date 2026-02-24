export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  initials: string
  plan: 'free' | 'pro' | 'enterprise'
  role: 'owner' | 'admin' | 'nutritionist' | 'trainer'
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
}

export const AUTH_STORAGE_KEY = 'usfit_auth_v1'

export interface AuthStorageSchema {
  version: 1
  user: User
  token: string
  expiresAt: string
}
