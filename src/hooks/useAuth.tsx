import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { AuthSession, AuthUser, UserRole } from '@/types/auth'

type AuthContextValue = {
  user: AuthUser | null
  isAuthenticated: boolean
  login: (session: AuthSession) => void
  logout: () => void
}

const AUTH_STORAGE_KEY = 'givon-auth-session'
const LEGACY_AUTH_STORAGE_KEY = 'givon-auth-user'

const AuthContext = createContext<AuthContextValue | null>(null)

const normalizeRole = (role: string): UserRole => {
  const upperRole = role.toUpperCase()

  if (upperRole === 'ADMIN' || upperRole === 'ORGANIZATION' || upperRole === 'DONOR') {
    return upperRole
  }

  return 'DONOR'
}

const normalizeUser = (user: AuthUser): AuthUser => ({
  ...user,
  role: normalizeRole(user.role),
})

const readStoredSession = (): AuthSession | null => {
  try {
    const raw = window.localStorage.getItem(AUTH_STORAGE_KEY)

    if (raw) {
      const parsed = JSON.parse(raw) as Partial<AuthSession> | null

      if (parsed?.accessToken && parsed.user) {
        return {
          accessToken: parsed.accessToken,
          user: normalizeUser(parsed.user as AuthUser),
        }
      }
    }

    const legacyRaw = window.localStorage.getItem(LEGACY_AUTH_STORAGE_KEY)

    if (legacyRaw) {
      const legacyUser = JSON.parse(legacyRaw) as AuthUser
      return {
        accessToken: '',
        user: normalizeUser(legacyUser),
      }
    }
  } catch {
    return null
  }

  return null
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<AuthSession | null>(null)

  useEffect(() => {
    const storedSession = readStoredSession()

    if (storedSession?.accessToken) {
      setSession(storedSession)
    } else if (storedSession) {
      window.localStorage.removeItem(AUTH_STORAGE_KEY)
      window.localStorage.removeItem(LEGACY_AUTH_STORAGE_KEY)
    }
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({
      user: session?.user ?? null,
      isAuthenticated: Boolean(session?.accessToken),
      login: (nextSession) => {
        const normalizedSession = {
          accessToken: nextSession.accessToken,
          user: normalizeUser(nextSession.user),
        }

        setSession(normalizedSession)
        window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(normalizedSession))
        window.localStorage.removeItem(LEGACY_AUTH_STORAGE_KEY)
      },
      logout: () => {
        setSession(null)
        window.localStorage.removeItem(AUTH_STORAGE_KEY)
        window.localStorage.removeItem(LEGACY_AUTH_STORAGE_KEY)
      },
    }),
    [session],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }

  return context
}

export const getDefaultDashboardPath = (role: UserRole) => {
  if (role === 'ADMIN') return '/admin'
  if (role === 'ORGANIZATION') return '/organization/dashboard'
  return '/home'
}

export const normalizeAuthRole = normalizeRole
