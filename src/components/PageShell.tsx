import { useState, type ReactNode } from 'react'
import { Button, Drawer, Layout, Tag } from 'antd'
import { HeartFilled, LogoutOutlined, MenuOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'

type PageShellProps = {
  children: ReactNode
}

export const PageShell = ({ children }: PageShellProps) => {
  const navigate = useNavigate()
  const { isAuthenticated, user, logout } = useAuth()
  const [drawerOpen, setDrawerOpen] = useState(false)

  const closeDrawer = () => setDrawerOpen(false)

  return (
    <Layout className="min-h-screen bg-white text-slate-800 relative">
      <Layout.Header style={{position:"sticky",top : 0, zIndex:10, alignItems:"center" }} className="!flex !h-auto !items-center !justify-between !border-b !border-slate-200 !bg-white !px-4 !py-4 md:!px-8">
        <Link to="/home" className="group flex items-center gap-3 text-slate-900" onClick={closeDrawer}>
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.08)]">
            <HeartFilled className="text-base text-slate-900" />
          </span>
          <div>
            <div className="text-base font-semibold tracking-tight text-slate-900">Givon</div>
            <div className="text-xs text-slate-500">Warm donation platform</div>
          </div>
        </Link>

        <div className="hidden items-center gap-2 md:flex md:flex-wrap md:justify-end">
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

        <Button
          type="text"
          aria-label="메뉴 열기"
          onClick={() => setDrawerOpen(true)}
          className="inline-flex items-center justify-center rounded-full border border-slate-200 text-slate-700 shadow-sm md:hidden"
          icon={<MenuOutlined />}
        />
      </Layout.Header>

      <Drawer
        placement="left"
        open={drawerOpen}
        onClose={closeDrawer}
        width={280}
        className="md:hidden"
        closable={{ placement: 'end' }}
        title={
          <Link to="/home" className="flex items-center gap-3 text-slate-900" onClick={closeDrawer}>
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.08)]">
              <HeartFilled className="text-base text-slate-900" />
            </span>
            <div>
              <div className="text-sm font-semibold tracking-tight text-slate-900">Givon</div>
              <div className="text-xs text-slate-500">Warm donation platform</div>
            </div>
          </Link>
        }
        styles={{
          body: { padding: 20 },
          header: { borderBottom: '1px solid #e2e8f0' },
        }}
      >
        <div className="flex flex-col gap-2">
          <Link to="/home" onClick={closeDrawer} className="rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-300 hover:text-slate-900">
            홈
          </Link>
          <Link to="/org/1" onClick={closeDrawer} className="rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-300 hover:text-slate-900">
            기부하기
          </Link>
          {!isAuthenticated ? (
            <>
              <Link to="/login" onClick={closeDrawer} className="rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-300 hover:text-slate-900">
                로그인
              </Link>
              <Link to="/register" onClick={closeDrawer} className="rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-300 hover:text-slate-900">
                회원가입
              </Link>
            </>
          ) : null}
          {isAuthenticated ? (
            <Link to="/mypage" onClick={closeDrawer} className="rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-300 hover:text-slate-900">
              마이페이지
            </Link>
          ) : null}
          {user?.role === 'ADMIN' ? (
            <>
              <Link to="/admin" onClick={closeDrawer} className="rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-300 hover:text-slate-900">
                관리자 대시보드
              </Link>
              <Link to="/admin/userList" onClick={closeDrawer} className="rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-300 hover:text-slate-900">
                사용자 관리
              </Link>
            </>
          ) : null}
          {user?.role === 'ORGANIZATION' ? (
            <Link to="/organization/dashboard" onClick={closeDrawer} className="rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-300 hover:text-slate-900">
              기관 대시보드
            </Link>
          ) : null}
          {isAuthenticated ? (
            <Button
              type="text"
              icon={<LogoutOutlined />}
              onClick={() => {
                closeDrawer()
                logout()
                navigate('/home')
              }}
              className="mt-2 rounded-2xl border border-slate-200 text-left text-slate-700 shadow-sm hover:!border-slate-300 hover:!text-slate-900"
              block
            >
              로그아웃
            </Button>
          ) : null}
        </div>
      </Drawer>

      <Layout.Content className="relative mx-auto flex w-full max-w-7xl flex-col items-center justify-center px-4 py-6 md:px-8 md:py-5">
        {children}
      </Layout.Content>
    </Layout>
  )
}
