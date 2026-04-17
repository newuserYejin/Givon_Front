import { Card, Checkbox, InputNumber, Space, Tag } from 'antd'
import type { DonationItem, DonationSelection } from '@/types/donation'

type DonationItemSelectorProps = {
  items: DonationItem[]
  selectedItems: DonationSelection[]
  onChange: (items: DonationSelection[]) => void
}

const urgencyColor = {
  high: 'volcano',
  medium: 'gold',
  low: 'blue',
} as const

export const DonationItemSelector = ({ items, selectedItems, onChange }: DonationItemSelectorProps) => {
  const selectedMap = new Map(selectedItems.map((item) => [item.itemId, item.quantity]))

  const toggleItem = (itemId: string, checked: boolean) => {
    if (checked) {
      const item = items.find((candidate) => candidate.id === itemId)
      onChange([
        ...selectedItems,
        {
          itemId,
          quantity: item?.suggestedQuantity ?? 1,
        },
      ])
      return
    }

    onChange(selectedItems.filter((item) => item.itemId !== itemId))
  }

  const updateQuantity = (itemId: string, quantity: number | null) => {
    const nextQuantity = Math.max(1, quantity ?? 1)
    onChange(
      selectedItems.map((item) =>
        item.itemId === itemId ? { ...item, quantity: nextQuantity } : item,
      ),
    )
  }

  return (
    <div className="space-y-3">
      {items.map((item) => {
        const checked = selectedMap.has(item.id)

        return (
          <Card
            key={item.id}
            size="small"
            className="border border-slate-200 bg-white text-slate-800 shadow-sm"
            styles={{ body: { padding: 16 } }}
          >
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <Space align="start" size={12} className="items-start">
                <Checkbox
                  checked={checked}
                  onChange={(event) => toggleItem(item.id, event.target.checked)}
                  className="pt-1"
                />
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-base font-medium text-slate-900">{item.name}</span>
                    <Tag color={urgencyColor[item.urgency]}>{item.urgency}</Tag>
                  </div>
                  <p className="mt-1 text-sm leading-6 text-slate-600">{item.description}</p>
                </div>
              </Space>
              <div className="flex items-center gap-3">
                <span className="text-sm text-slate-400">수량</span>
                <InputNumber
                  min={1}
                  value={selectedMap.get(item.id) ?? item.suggestedQuantity}
                  disabled={!checked}
                  onChange={(value) => updateQuantity(item.id, value)}
                  className="!w-28"
                />
                <span className="text-sm text-slate-500">{item.unit}</span>
              </div>
            </div>
          </Card>
        )
      })}
    </div>
  )
}
