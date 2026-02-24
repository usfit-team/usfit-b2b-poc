import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import type { AuthState, AuthStorageSchema, User } from '@/types/auth'
import { AUTH_STORAGE_KEY } from '@/types/auth'

interface AuthContextValue extends AuthState {
  login: (user: User, token?: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

const MOCK_USER: User = {
  id: 'usr_001',
  name: 'Dr. Silva',
  email: 'dr.silva@usfit.com',
  initials: 'DS',
  plan: 'pro',
  role: 'owner',
}

function loadStoredAuth(): AuthState {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY)
    if (!raw) return { user: null, isAuthenticated: false }

    const parsed: AuthStorageSchema = JSON.parse(raw)
    if (parsed.version !== 1) return { user: null, isAuthenticated: false }

    const isExpired = new Date(parsed.expiresAt) < new Date()
    if (isExpired) {
      localStorage.removeItem(AUTH_STORAGE_KEY)
      return { user: null, isAuthenticated: false }
    }

    return { user: parsed.user, isAuthenticated: true }
  } catch {
    localStorage.removeItem(AUTH_STORAGE_KEY)
    return { user: null, isAuthenticated: false }
  }
}

function persistAuth(user: User, token: string): void {
  const schema: AuthStorageSchema = {
    version: 1,
    user,
    token,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
  }
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(schema))
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>(loadStoredAuth)

  const login = useCallback((user: User, token?: string) => {
    const authToken = token ?? 'mock_token_' + Date.now()
    persistAuth(user, authToken)
    setAuthState({ user, isAuthenticated: true })
    window.location.href = '/dashboard'
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem(AUTH_STORAGE_KEY)
    setAuthState({ user: null, isAuthenticated: false })
    window.location.href = '/'
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({
      user: authState.user,
      isAuthenticated: authState.isAuthenticated,
      login,
      logout,
    }),
    [authState, login, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export { MOCK_USER }
