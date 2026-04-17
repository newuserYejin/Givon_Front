import { Button, Card, Col, Row, Statistic, Typography } from 'antd'
import { Link } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { useUsers } from '@/hooks/useUsers'

export const AdminDashboard = () => {
  const { user, logout } = useAuth()
  const { data } = useUsers()

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.08)] md:p-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="space-y-3">
            <div className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">admin dashboard</div>
            <Typography.Title level={2} className="!mb-0 !text-slate-900">
              관리 대시보드
            </Typography.Title>
            <p className="text-sm text-slate-600">
              Donor UI를 유지한 채, 관리 기능은 별도 대시보드로 확장됩니다.
            </p>
          </div>
          <div className="flex gap-2">
            <Button className="border border-slate-200 bg-white text-slate-700 shadow-sm hover:!border-slate-300 hover:!text-slate-900">
              {user?.name}
            </Button>
            <Button onClick={logout} className="border border-slate-200 bg-white text-slate-700 shadow-sm hover:!border-slate-300 hover:!text-slate-900">
              로그아웃
            </Button>
          </div>
        </div>
      </section>

      <Row gutter={[16, 16]}>
        <Col xs={24} md={8}>
          <Card className="border border-slate-200 bg-white shadow-[0_14px_30px_rgba(15,23,42,0.06)]" styles={{ body: { padding: 20 } }}>
            <Statistic title="총 사용자" value={data?.length ?? 0} />
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card className="border border-slate-200 bg-white shadow-[0_14px_30px_rgba(15,23,42,0.06)]" styles={{ body: { padding: 20 } }}>
            <Statistic title="대기 검토" value={4} />
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card className="border border-slate-200 bg-white shadow-[0_14px_30px_rgba(15,23,42,0.06)]" styles={{ body: { padding: 20 } }}>
            <Statistic title="활성 메뉴" value={3} />
          </Card>
        </Col>
      </Row>

      <Card className="border border-slate-200 bg-white shadow-[0_14px_30px_rgba(15,23,42,0.06)]" styles={{ body: { padding: 24 } }}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="text-sm uppercase tracking-[0.2em] text-slate-500">admin actions</div>
            <h3 className="mt-2 text-xl font-semibold text-slate-900">관리 화면 바로가기</h3>
          </div>
          <Link to="/admin/userList" className="text-slate-700 hover:text-slate-900">
            사용자 목록 보기
          </Link>
        </div>
      </Card>
    </div>
  )
}
