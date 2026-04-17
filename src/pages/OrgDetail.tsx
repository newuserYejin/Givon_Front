import { useMemo, useState } from 'react'
import { Alert, Button, Card, Divider, Empty, Space, Spin, Tag, Typography, message } from 'antd'
import { CheckCircleOutlined, ShoppingOutlined } from '@ant-design/icons'
import { useParams } from 'react-router-dom'
import { DonationItemSelector } from '@/components/DonationItemSelector'
import { StatusTimeline } from '@/components/StatusTimeline'
import { useDonateToOrganization } from '@/hooks/useDonateToOrganization'
import { useOrganization } from '@/hooks/useOrganization'
import { useOrganizationStatus } from '@/hooks/useOrganizationStatus'
import type { DonationSelection } from '@/types/donation'

export const OrgDetail = () => {
  const { id } = useParams()
  const organizationQuery = useOrganization(id)
  const statusQuery = useOrganizationStatus(id)
  const donateMutation = useDonateToOrganization(id)
  const [selectedItems, setSelectedItems] = useState<DonationSelection[]>([])
  const [donorName, setDonorName] = useState('익명 기부자')

  const organization = organizationQuery.data
  const canDonate = selectedItems.length > 0 && !donateMutation.isPending

  const selectedSummary = useMemo(
    () =>
      selectedItems.reduce(
        (acc, item) => ({
          count: acc.count + 1,
          quantity: acc.quantity + item.quantity,
        }),
        { count: 0, quantity: 0 },
      ),
    [selectedItems],
  )

  const handleDonate = async () => {
    if (!id || selectedItems.length === 0) return

    try {
      const response = await donateMutation.mutateAsync({
        items: selectedItems,
        donorName,
        message: '기관 상세 페이지에서 바로 요청한 기부입니다.',
      })
      message.success('기부 요청이 접수되었습니다.')
      setSelectedItems([])
      await statusQuery.refetch()
      if (response.status.note) {
        message.info(response.status.note)
      }
    } catch {
      message.error('기부 요청 처리에 실패했습니다.')
    }
  }

  if (organizationQuery.isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Spin size="large" />
      </div>
    )
  }

  if (organizationQuery.isError || !organization) {
    return (
      <Alert
        type="error"
        showIcon
        message="기관 정보를 불러오지 못했습니다."
        description="잘못된 경로이거나 API 응답을 확인해야 합니다."
      />
    )
  }

  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_18px_45px_rgba(15,23,42,0.08)]">
        <div className={`border-b border-slate-200 bg-white px-6 py-8 text-slate-950 md:px-10 md:py-12`}>
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl space-y-4">
              <Tag className="border border-slate-200 bg-white text-slate-700 shadow-sm">{organization.category}</Tag>
              <Typography.Title level={1} className="!mb-0 !text-4xl !font-semibold !text-slate-950 md:!text-5xl">
                {organization.name}
              </Typography.Title>
              <p className="max-w-2xl text-base leading-8 text-slate-950/80 md:text-lg">{organization.headline}</p>
            </div>
            <Card className="w-full max-w-sm border border-slate-200 bg-white text-slate-800 shadow-sm" styles={{ body: { padding: 20 } }}>
              <div className="text-sm font-medium text-slate-900/70">주소</div>
              <div className="mt-1 text-xl font-semibold">{organization.location}</div>
              <div className="mt-4 text-sm leading-6 text-slate-900/80">{organization.summary}</div>
            </Card>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <Card className="border border-slate-200 bg-white text-slate-800 shadow-[0_14px_30px_rgba(15,23,42,0.06)]" styles={{ body: { padding: 24 } }}>
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-sm uppercase tracking-[0.2em] text-orange-300">donation items</div>
              <h2 className="mt-2 text-2xl font-semibold text-white">물품 선택</h2>
            </div>
            <Space>
              <Tag color="green" icon={<ShoppingOutlined />}>
                {selectedSummary.count}개 품목
              </Tag>
              <Tag color="blue" icon={<CheckCircleOutlined />}>
                {selectedSummary.quantity}개 수량
              </Tag>
            </Space>
          </div>
          <Divider className="border-slate-200" />
          <DonationItemSelector
            items={organization.neededItems}
            selectedItems={selectedItems}
            onChange={setSelectedItems}
          />
          <Divider className="border-slate-200" />
          <div className="grid gap-4 md:grid-cols-2">
            <Card size="small" className="border border-slate-200 bg-white text-slate-800 shadow-sm" styles={{ body: { padding: 16 } }}>
              <div className="text-sm text-slate-400">기부자명</div>
              <input
                value={donorName}
                onChange={(event) => setDonorName(event.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none ring-0 placeholder:text-slate-400 focus:border-slate-400"
                placeholder="익명 기부자"
              />
            </Card>
            <Card size="small" className="border border-slate-200 bg-white text-slate-800 shadow-sm" styles={{ body: { padding: 16 } }}>
              <div className="text-sm text-slate-400">선택 상태</div>
              <div className="mt-2 text-lg font-semibold text-white">
                {selectedItems.length > 0 ? '기부 준비 완료' : '아직 선택되지 않음'}
              </div>
              <div className="mt-1 text-sm text-slate-400">
                선택한 물품을 제출하면 상태가 포장 준비 단계로 업데이트됩니다.
              </div>
            </Card>
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            <Button
              type="primary"
              size="large"
              loading={donateMutation.isPending}
              disabled={!canDonate}
              onClick={handleDonate}
              className="border border-slate-900 bg-slate-900 font-medium text-white shadow-sm hover:!border-slate-700 hover:!bg-slate-800 disabled:!border-slate-200 disabled:!bg-slate-200 disabled:!text-slate-500"
            >
              기부하기
            </Button>
            <Button
              size="large"
              onClick={() => setSelectedItems([])}
              className="border border-slate-200 bg-white text-slate-700 shadow-sm hover:!border-slate-300 hover:!text-slate-900"
            >
              선택 초기화
            </Button>
          </div>
        </Card>

        <div className="space-y-6">
          <Card className="border border-slate-200 bg-white text-slate-800 shadow-[0_14px_30px_rgba(15,23,42,0.06)]" styles={{ body: { padding: 24 } }}>
            <div className="text-sm uppercase tracking-[0.2em] text-emerald-300">status</div>
            <h2 className="mt-2 text-2xl font-semibold text-white">기부 상태 확인</h2>
            <Divider className="border-slate-200" />
            {statusQuery.isLoading ? <Spin /> : <StatusTimeline status={statusQuery.data} />}
          </Card>

          <Card className="border border-slate-200 bg-white text-slate-800 shadow-[0_14px_30px_rgba(15,23,42,0.06)]" styles={{ body: { padding: 24 } }}>
            <div className="text-sm uppercase tracking-[0.2em] text-orange-300">impact</div>
            <h2 className="mt-2 text-2xl font-semibold text-white">기관 정보</h2>
            <p className="mt-3 text-sm leading-7 text-slate-400">{organization.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {organization.impact.map((item) => (
                <Tag key={item} color="default" className="border border-slate-200 bg-white text-slate-600">
                  {item}
                </Tag>
              ))}
            </div>
            <Divider className="border-slate-200" />
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="text-sm text-slate-400">기부 요청 팁</div>
              <p className="mt-2 text-sm leading-7 text-slate-300">
                필요한 품목을 선택하고 수량을 조절한 뒤 제출하면, React Query가 상태를 갱신해 같은 화면에서
                즉시 확인할 수 있습니다.
              </p>
            </div>
          </Card>
        </div>
      </section>
      <section>
        <Alert
          className="border border-slate-200 bg-white text-slate-700 shadow-sm"
          type="info"
          showIcon
          message="API 서버 정보"
          description="이 프런트엔드는 `http://localhost:8080`을 기준으로 설계되며, 서버가 없을 경우 mock 데이터로 동작합니다."
        />
      </section>
      {!organization.neededItems.length ? <Empty description="요청 가능한 물품이 없습니다." /> : null}
    </div>
  )
}
