import { Navigate, Outlet } from 'react-router-dom'
import type { ReactNode } from 'react'
import { getDefaultDashboardPath, useAuth } from '@/hooks/useAuth'
import type { UserRole } from '@/types/auth'

type RoleGuardProps = {
  allowedRoles: UserRole[]
  children?: ReactNode
}

export const RoleGuard = ({ allowedRoles, children }: RoleGuardProps) => {
  const { isAuthenticated, user } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to={getDefaultDashboardPath(user?.role ?? 'DONOR')} replace />
  }

  return children ? <>{children}</> : <Outlet />
}

export const PublicOnlyRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, user } = useAuth()

  if (isAuthenticated && user) {
    return <Navigate to={getDefaultDashboardPath(user.role)} replace />
  }

  return children ? <>{children}</> : <Outlet />
}
