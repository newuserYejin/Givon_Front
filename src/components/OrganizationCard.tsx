import { Button, Card, Progress, Tag } from 'antd'
import { ArrowRightOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import type { Organization } from '@/types/donation'

type OrganizationCardProps = {
  organization: Organization
}

const urgencyColor = {
  high: 'volcano',
  medium: 'gold',
  low: 'blue',
} as const

export const OrganizationCard = ({ organization }: OrganizationCardProps) => {
  const navigate = useNavigate()
  const progressPercent = Math.min(
    100,
    Math.round((organization.progress.donated / organization.progress.target) * 100),
  )

  return (
    <Card
      className="h-full overflow-hidden border border-slate-200 bg-white text-slate-800 shadow-[0_18px_45px_rgba(15,23,42,0.08)]"
      styles={{ body: { padding: 24 } }}
    >
      <div className="mb-5 rounded-3xl border border-slate-200 bg-white p-5 text-slate-900 shadow-sm">
        <div className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
          {organization.category}
        </div>
        <div className="mt-2 text-2xl font-semibold">{organization.name}</div>
        <div className="mt-3 text-sm leading-6 text-slate-600">{organization.headline}</div>
      </div>
      <div className="space-y-4">
        <p className="text-sm leading-6 text-slate-600">{organization.summary}</p>
        <div className="flex flex-wrap gap-2">
          {organization.impact.map((item) => (
            <Tag key={item} color="default" className="border border-slate-200 bg-white text-slate-600">
              {item}
            </Tag>
          ))}
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>기부 진행률</span>
            <span>
              {organization.progress.donated}/{organization.progress.target}
            </span>
          </div>
          <Progress percent={progressPercent} showInfo={false} strokeColor="#0f172a" trailColor="#e2e8f0" />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {organization.neededItems.slice(0, 2).map((item) => (
            <Tag key={item.id} color={urgencyColor[item.urgency]} className="m-0">
              {item.name}
            </Tag>
          ))}
        </div>
        <Button
          type="primary"
          size="large"
          className="w-full border border-slate-900 bg-slate-900 font-medium text-white shadow-sm hover:!border-slate-700 hover:!bg-slate-800"
          icon={<ArrowRightOutlined />}
          onClick={() => navigate(`/org/${organization.id}`)}
        >
          상세 보기
        </Button>
      </div>
    </Card>
  )
}
