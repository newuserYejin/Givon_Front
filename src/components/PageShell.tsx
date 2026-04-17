import type { ReactNode } from 'react'
import { Button, Layout, Tag } from 'antd'
import { HeartFilled } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'

type PageShellProps = {
  children: ReactNode
}

export const PageShell = ({ children }: PageShellProps) => {
  const navigate = useNavigate()
  const { isAuthenticated, user, logout } = useAuth()

  return (
    <Layout className="min-h-screen bg-white text-slate-800">
      <Layout.Header className="!flex !h-auto !flex-col !items-start !justify-between !gap-4 !border-b !border-slate-200 !bg-white !px-4 !py-4 md:!flex-row md:!items-center md:!px-8">
        <Link to="/home" className="group flex items-center gap-3 text-slate-900">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.08)]">
            <HeartFilled className="text-base text-slate-900" />
          </span>
          <div>
            <div className="text-base font-semibold tracking-tight text-slate-900">Givon</div>
            <div className="text-xs text-slate-500">Warm donation platform</div>
          </div>
        </Link>
        <div className="flex w-full flex-wrap items-center gap-2 md:w-auto md:justify-end">
          <Link to="/home" className="rounded-full border border-slate-200 px-3 py-2 text-sm text-slate-700 shadow-sm transition hover:border-slate-300 hover:text-slate-900">
            홈
          </Link>
          <Link to="/org/1" className="rounded-full border border-slate-200 px-3 py-2 text-sm text-slate-700 shadow-sm transition hover:border-slate-300 hover:text-slate-900">
            기부하기
          </Link>
          {!isAuthenticated ? (
            <>
              <Link to="/login" className="rounded-full border border-slate-200 px-3 py-2 text-sm text-slate-700 shadow-sm transition hover:border-slate-300 hover:text-slate-900">
                로그인
              </Link>
              <Link to="/register" className="rounded-full border border-slate-200 px-3 py-2 text-sm text-slate-700 shadow-sm transition hover:border-slate-300 hover:text-slate-900">
                회원가입
              </Link>
            </>
          ) : null}
          {user?.role === 'ADMIN' ? (
            <>
              <Link to="/admin" className="rounded-full border border-slate-200 px-3 py-2 text-sm text-slate-700 shadow-sm transition hover:border-slate-300 hover:text-slate-900">
                관리자 대시보드
              </Link>
              <Link to="/admin/userList" className="rounded-full border border-slate-200 px-3 py-2 text-sm text-slate-700 shadow-sm transition hover:border-slate-300 hover:text-slate-900">
                사용자 관리
              </Link>
            </>
          ) : null}
          {user?.role === 'ORGANIZATION' ? (
            <Link to="/organization/dashboard" className="rounded-full border border-slate-200 px-3 py-2 text-sm text-slate-700 shadow-sm transition hover:border-slate-300 hover:text-slate-900">
              기관 대시보드
            </Link>
          ) : null}
          {isAuthenticated ? (
            <Link to="/mypage" className="rounded-full border border-slate-200 px-3 py-2 text-sm text-slate-700 shadow-sm transition hover:border-slate-300 hover:text-slate-900">
              마이페이지
            </Link>
          ) : null}
          {isAuthenticated ? (
            <Button
              type="text"
              onClick={() => {
                logout()
                navigate('/home')
              }}
              className="rounded-full border border-slate-200 text-slate-700 shadow-sm hover:!border-slate-300 hover:!text-slate-900"
            >
              로그아웃
            </Button>
          ) : null}
          <Tag className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-600 shadow-sm">
            Border-first UI
          </Tag>
        </div>
      </Layout.Header>
      <Layout.Content className="relative mx-auto w-full max-w-7xl px-4 py-6 md:px-8 md:py-10">
        {children}
      </Layout.Content>
    </Layout>
  )
}
