import { Alert, Timeline } from 'antd'
import type { DonationStatus } from '@/types/donation'

type StatusTimelineProps = {
  status?: DonationStatus
}

export const StatusTimeline = ({ status }: StatusTimelineProps) => {
  if (!status) {
    return (
      <Alert
        type="info"
        showIcon
        className="border border-slate-200 bg-white text-slate-700 shadow-sm"
        message="상태 정보가 없습니다."
        description="기부를 완료하면 접수와 포장 준비 상태가 여기에 표시됩니다."
      />
    )
  }

  return (
    <div className="space-y-4">
      <Alert
        type="success"
        showIcon
        className="border border-slate-200 bg-white text-slate-700 shadow-sm"
        message={`현재 상태: ${status.stage}`}
        description={status.note}
      />
      <Timeline
        mode="left"
        items={status.history.map((item) => ({
          children: (
            <div className="pb-1">
              <div className="text-sm font-medium text-slate-900">{item.label}</div>
              <div className="text-sm text-slate-400">{item.detail}</div>
              <div className="mt-1 text-xs text-slate-500">{new Date(item.at).toLocaleString('ko-KR')}</div>
            </div>
          ),
        }))}
      />
    </div>
  )
}
