import { Alert, Button, Card, Spin, Tag, Typography, message } from 'antd'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { isAuthApiError, me } from '@/api/auth'
import { useAuth } from '@/hooks/useAuth'
import type { UserRole } from '@/types/auth'

const roleLabels: Record<UserRole, string> = {
  DONOR: '기부자',
  ADMIN: '플랫폼 관리자',
  ORGANIZATION: '기관 관리자',
}

export const MyPage = () => {
  const navigate = useNavigate()
  const { user: sessionUser, logout } = useAuth()

  const meQuery = useQuery({
    queryKey: ['auth', 'me'],
    queryFn: me,
    retry: 0,
  })

  useEffect(() => {
    if (!meQuery.error) return

    if (isAuthApiError(meQuery.error) && meQuery.error.status === 401) {
      message.error('로그인이 만료되었습니다. 다시 로그인해 주세요.')
      logout()
      navigate('/login', { replace: true })
    }
  }, [logout, meQuery.error, navigate])

  const user = meQuery.data ?? sessionUser

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.08)] md:p-10">
        <div className="space-y-3">
          <div className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">my page</div>
          <Typography.Title level={2} className="!mb-0 !text-slate-900">
            마이페이지
          </Typography.Title>
          <p className="max-w-2xl text-sm leading-7 text-slate-600">
            `/api/auth/me`를 통해 현재 로그인한 사용자의 정보를 다시 확인합니다.
          </p>
        </div>
      </section>

      {meQuery.isLoading ? (
        <Card className="border border-slate-200 bg-white shadow-[0_14px_30px_rgba(15,23,42,0.06)]" styles={{ body: { padding: 24 } }}>
          <div className="flex items-center gap-3 text-slate-600">
            <Spin />
            <span>사용자 정보를 불러오는 중입니다.</span>
          </div>
        </Card>
      ) : meQuery.isError && !user ? (
        <Alert
          type="error"
          showIcon
          message="사용자 정보를 불러오지 못했습니다."
          description={meQuery.error instanceof Error ? meQuery.error.message : '잠시 후 다시 시도해 주세요.'}
          action={
            <Button
              size="small"
              onClick={() => {
                meQuery.refetch()
              }}
            >
              다시 시도
            </Button>
          }
        />
      ) : user ? (
        <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
          <Card className="border border-slate-200 bg-white shadow-[0_14px_30px_rgba(15,23,42,0.06)]" styles={{ body: { padding: 24 } }}>
            <div className="space-y-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-sm uppercase tracking-[0.2em] text-slate-500">profile</div>
                  <h3 className="mt-2 text-2xl font-semibold text-slate-900">{user.name}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">현재 로그인한 계정 정보입니다.</p>
                </div>
                <Tag className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-600 shadow-sm">
                  {roleLabels[user.role]}
                </Tag>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                  <div className="text-xs uppercase tracking-[0.18em] text-slate-500">name</div>
                  <div className="mt-2 text-sm font-medium text-slate-900">{user.name}</div>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                  <div className="text-xs uppercase tracking-[0.18em] text-slate-500">role</div>
                  <div className="mt-2 text-sm font-medium text-slate-900">{roleLabels[user.role]}</div>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:col-span-2">
                  <div className="text-xs uppercase tracking-[0.18em] text-slate-500">email</div>
                  <div className="mt-2 text-sm font-medium text-slate-900">{user.email}</div>
                </div>
              </div>
            </div>
          </Card>

          <Card className="border border-slate-200 bg-white shadow-[0_14px_30px_rgba(15,23,42,0.06)]" styles={{ body: { padding: 24 } }}>
            <div className="space-y-4">
              <div>
                <div className="text-sm uppercase tracking-[0.2em] text-slate-500">session</div>
                <h3 className="mt-2 text-xl font-semibold text-slate-900">로그인 상태</h3>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="text-sm text-slate-500">인증 상태</div>
                <div className="mt-2 text-base font-semibold text-slate-900">로그인됨</div>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="text-sm text-slate-500">조회 방식</div>
                <div className="mt-2 text-sm leading-6 text-slate-700">
                  로컬 세션을 기준으로 화면을 열고, `/api/auth/me`로 서버에서 최신 사용자 정보를 다시 확인합니다.
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  className="border border-slate-200 bg-white text-slate-700 shadow-sm hover:!border-slate-300 hover:!text-slate-900"
                  onClick={() => meQuery.refetch()}
                >
                  정보 새로고침
                </Button>
                <Button
                  className="border border-slate-900 bg-slate-900 text-white shadow-sm hover:!border-slate-700 hover:!bg-slate-800"
                  onClick={() => {
                    logout()
                    navigate('/login')
                  }}
                >
                  로그아웃
                </Button>
              </div>
            </div>
          </Card>
        </div>
      ) : null}
    </div>
  )
}
