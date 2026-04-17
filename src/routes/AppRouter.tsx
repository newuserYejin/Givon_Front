import { Navigate, Route, Routes } from 'react-router-dom'
import { Home } from '@/pages/Home'
import { OrgDetail } from '@/pages/OrgDetail'
import { Login } from '@/pages/Login'
import { MyPage } from '@/pages/MyPage'
import { Register } from '@/pages/Register'
import { AdminDashboard } from '@/pages/admin/Dashboard'
import { UserList } from '@/pages/admin/UserList'
import { OrganizationDashboard } from '@/pages/organization/Dashboard'
import { PublicOnlyRoute, RoleGuard } from '@/routes/RouteGuards'

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="/home" element={<Home />} />
      <Route
        path="/login"
        element={
          <PublicOnlyRoute>
            <Login />
          </PublicOnlyRoute>
        }
      />
      <Route
        path="/register"
        element={
          <PublicOnlyRoute>
            <Register />
          </PublicOnlyRoute>
        }
      />
      <Route
        path="/mypage"
        element={
          <RoleGuard allowedRoles={['DONOR', 'ADMIN', 'ORGANIZATION']}>
            <MyPage />
          </RoleGuard>
        }
      />
      <Route
        path="/admin"
        element={
          <RoleGuard allowedRoles={['ADMIN']}>
            <AdminDashboard />
          </RoleGuard>
        }
      />
      <Route
        path="/admin/userList"
        element={
          <RoleGuard allowedRoles={['ADMIN']}>
            <UserList />
          </RoleGuard>
        }
      />
      <Route
        path="/organization/dashboard"
        element={
          <RoleGuard allowedRoles={['ORGANIZATION']}>
            <OrganizationDashboard />
          </RoleGuard>
        }
      />
      <Route path="/org/:id" element={<OrgDetail />} />
    </Routes>
  )
}
