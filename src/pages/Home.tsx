import { Button, Card, Space, Typography } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useOrganizations } from '@/hooks/useOrganizations'
import { OrganizationCard } from '@/components/OrganizationCard'

export const Home = () => {
  const { data, isLoading, isError } = useOrganizations()
  const navigate = useNavigate()

  return (
    <div className="space-y-10">
      <section className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.08)] md:p-10">
        <div className="relative grid gap-8 md:grid-cols-[1.4fr_0.9fr] md:items-end">
          <div className="space-y-5">
            <div className="inline-flex rounded-full border border-slate-200 px-3 py-1 text-xs font-medium uppercase tracking-[0.24em] text-slate-500 shadow-sm">
              donation web app
            </div>
            <Typography.Title level={1} className="!mb-0 !text-4xl !font-semibold !tracking-tight !text-slate-900 md:!text-6xl">
              따뜻한 나눔을
              <br />
              더 편하게 연결해요
            </Typography.Title>
            <p className="max-w-2xl text-base leading-8 text-slate-700 md:text-lg">
              물품을 고르고, 기부를 요청하고, 진행 상태를 확인하는 흐름을 밝고 친근한 화면으로 정리했습니다.
              React Query와 Router 기반 구조는 유지하면서 더 산뜻한 분위기로 다듬었습니다.
            </p>
            <Space wrap>
              <Button
                size="large"
                type="primary"
                className="border border-slate-900 bg-slate-900 font-medium text-white shadow-sm hover:!border-slate-700 hover:!bg-slate-800"
                onClick={() => navigate('/org/1')}
              >
                추천 기관 보기
              </Button>
              <Button
                size="large"
                className="border border-slate-200 bg-white text-slate-700 shadow-sm hover:!border-slate-300 hover:!text-slate-900"
                onClick={() => navigate('/login')}
              >
                로그인
              </Button>
              <Button
                size="large"
                className="border border-slate-200 bg-white text-slate-700 shadow-sm hover:!border-slate-300 hover:!text-slate-900"
                onClick={() => navigate('/register')}
              >
                회원가입
              </Button>
            </Space>
          </div>
          <Card className="border border-slate-200 bg-white text-slate-900 shadow-[0_18px_45px_rgba(15,23,42,0.08)]" styles={{ body: { padding: 20 } }}>
            <div className="space-y-5">
              <div>
                <div className="text-sm text-slate-500">오늘의 나눔 현황</div>
                <div className="mt-2 text-2xl font-semibold text-slate-900">빠르게 연결되는 기부 경험</div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                  <div className="text-sm text-slate-500">활성 기관</div>
                  <div className="mt-1 text-2xl font-semibold text-slate-900">12</div>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                  <div className="text-sm text-slate-500">대기 요청</div>
                  <div className="mt-1 text-2xl font-semibold text-slate-900">4</div>
                </div>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-4 text-sm leading-6 text-slate-600 shadow-sm">
                API 서버가 연결되지 않아도 mock 데이터로 화면을 확인할 수 있도록 구성되어 있습니다.
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {[
          {
            title: '따뜻한 톤',
            description: '화이트, 오렌지, 민트 계열로 밝고 친근한 분위기를 맞췄습니다.',
          },
          {
            title: '빠른 흐름',
            description: '홈에서 기관 탐색, 상세 확인, 기부 진행까지 자연스럽게 이어집니다.',
          },
          {
            title: '상태 확인',
            description: '로딩과 에러, 빈 화면까지 대응해 안정적으로 정보를 보여줍니다.',
          },
        ].map((feature) => (
          <Card key={feature.title} className="border border-slate-200 bg-white text-slate-800 shadow-[0_14px_30px_rgba(15,23,42,0.06)]" styles={{ body: { padding: 20 } }}>
            <div className="text-lg font-semibold text-slate-900">{feature.title}</div>
            <p className="mt-2 text-sm leading-6 text-slate-600">{feature.description}</p>
          </Card>
        ))}
      </section>

      <section className="space-y-5">
        <div className="flex items-end justify-between gap-4">
          <div>
            <div className="text-sm uppercase tracking-[0.2em] text-slate-500">featured organizations</div>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900">기부 기관 목록</h2>
          </div>
        </div>

        {isLoading ? (
          <div className="grid gap-5 md:grid-cols-2">
            <Card className="border border-slate-200 bg-white shadow-[0_14px_30px_rgba(15,23,42,0.06)]" styles={{ body: { padding: 24 } }}>
              불러오는 중...
            </Card>
            <Card className="border border-slate-200 bg-white shadow-[0_14px_30px_rgba(15,23,42,0.06)]" styles={{ body: { padding: 24 } }}>
              불러오는 중...
            </Card>
          </div>
        ) : isError ? (
          <Card className="border border-slate-200 bg-white text-slate-700 shadow-[0_14px_30px_rgba(15,23,42,0.06)]" styles={{ body: { padding: 24 } }}>
            기관 목록을 불러오지 못했습니다. 서버 상태를 확인해 주세요.
          </Card>
        ) : data && data.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-2">
            {data.map((organization) => (
              <OrganizationCard key={organization.id} organization={organization} />
            ))}
          </div>
        ) : (
          <Card className="border border-dashed border-slate-200 bg-white text-slate-500 shadow-[0_14px_30px_rgba(15,23,42,0.06)]" styles={{ body: { padding: 24 } }}>
            표시할 기관이 없습니다.
          </Card>
        )}
      </section>
    </div>
  )
}
