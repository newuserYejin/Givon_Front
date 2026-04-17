import type {
  DonationRequest,
  DonationResponse,
  DonationStatus,
  Organization,
} from '@/types/donation'

const now = () => new Date().toISOString()

const organizations: Organization[] = [
  {
    id: '1',
    name: '따뜻한식탁센터',
    category: '아동·청소년',
    location: '서울 마포구',
    summary: '결식 우려 아동에게 식사와 학습 지원을 연결하는 기관입니다.',
    description:
      '학교 급식이 없는 시간에도 아이들이 안정적으로 식사와 돌봄을 받을 수 있도록 식료품과 생활물품을 연결합니다.',
    headline: '아이들의 하루가 끊기지 않도록, 식사와 생활물품을 이어줍니다.',
    accent: 'from-orange-500 to-amber-300',
    progress: { donated: 78, target: 120 },
    impact: ['월 180가구 식사 지원', '방학 중 긴급 식품 키트', '정기 돌봄 연계'],
    neededItems: [
      {
        id: 'rice',
        name: '즉석밥',
        description: '아이들 한 끼를 바로 채울 수 있는 기본 식품',
        unit: '개',
        suggestedQuantity: 12,
        urgency: 'high',
      },
      {
        id: 'ramen',
        name: '간편식',
        description: '방학 중 빠르게 조리 가능한 식사류',
        unit: '개',
        suggestedQuantity: 24,
        urgency: 'high',
      },
      {
        id: 'snack',
        name: '건강 간식',
        description: '간단한 영양 보충용 스낵과 음료',
        unit: '세트',
        suggestedQuantity: 8,
        urgency: 'medium',
      },
    ],
  },
  {
    id: '2',
    name: '희망케어하우스',
    category: '노인복지',
    location: '경기 수원시',
    summary: '독거 어르신의 일상에 필요한 생활용품과 건강 용품을 지원합니다.',
    description:
      '지역 돌봄 네트워크와 연결해 위생, 건강, 정서 지원 물품을 빠르게 전달합니다.',
    headline: '생활의 빈틈을 채우는 돌봄 물품을 가장 필요한 곳에 전달합니다.',
    accent: 'from-emerald-600 to-teal-300',
    progress: { donated: 56, target: 100 },
    impact: ['월 95명 안부 확인', '정기 위생키트 전달', '건강용품 긴급 지원'],
    neededItems: [
      {
        id: 'mask',
        name: '마스크·위생세트',
        description: '외출과 위생 관리에 필요한 기본 키트',
        unit: '세트',
        suggestedQuantity: 20,
        urgency: 'high',
      },
      {
        id: 'blanket',
        name: '가벼운 담요',
        description: '계절 변화에 맞춘 생활 보온 물품',
        unit: '장',
        suggestedQuantity: 10,
        urgency: 'medium',
      },
      {
        id: 'supplement',
        name: '영양 보충식',
        description: '식사 보완을 위한 간편 영양식',
        unit: '개',
        suggestedQuantity: 16,
        urgency: 'medium',
      },
    ],
  },
]

const statusStore: Record<string, DonationStatus> = {
  '1': {
    orgId: '1',
    stage: 'selection',
    updatedAt: now(),
    note: '아직 선택된 기부 물품이 없습니다.',
    history: [{ label: '선택 대기', detail: '기부 물품을 선택해 주세요.', at: now() }],
  },
  '2': {
    orgId: '2',
    stage: 'selection',
    updatedAt: now(),
    note: '아직 선택된 기부 물품이 없습니다.',
    history: [{ label: '선택 대기', detail: '기부 물품을 선택해 주세요.', at: now() }],
  },
}

const clone = <T,>(value: T): T => JSON.parse(JSON.stringify(value)) as T

export const mockApi = {
  async listOrganizations(): Promise<Organization[]> {
    return clone(organizations)
  },
  async getOrganization(id: string): Promise<Organization> {
    const org = organizations.find((item) => item.id === id)
    if (!org) {
      throw new Error('Organization not found')
    }
    return clone(org)
  },
  async getStatus(id: string): Promise<DonationStatus> {
    const status = statusStore[id]
    if (!status) {
      throw new Error('Status not found')
    }
    return clone(status)
  },
  async donate(id: string, request: DonationRequest): Promise<DonationResponse> {
    const totalQuantity = request.items.reduce((sum, item) => sum + item.quantity, 0)
    const status: DonationStatus = {
      orgId: id,
      stage: 'preparing',
      updatedAt: now(),
      note: `총 ${totalQuantity}개 물품이 포장 준비 단계로 접수되었습니다.`,
      history: [
        {
          label: '물품 선택',
          detail: `선택된 ${request.items.length}개 품목을 접수했습니다.`,
          at: now(),
        },
        {
          label: '포장 준비',
          detail: `선택된 물품을 검수 및 포장 중입니다.`,
          at: now(),
        },
      ],
    }

    statusStore[id] = status
    return {
      donationId: `don-${id}-${Date.now()}`,
      status: clone(status),
    }
  },
}
