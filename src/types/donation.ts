export type DonationStage = 'selection' | 'preparing' | 'picked_up' | 'delivered' | 'completed'

export type DonationItem = {
  id: string
  name: string
  description: string
  unit: string
  suggestedQuantity: number
  urgency: 'high' | 'medium' | 'low'
}

export type Organization = {
  id: string
  name: string
  category: string
  location: string
  summary: string
  description: string
  impact: string[]
  headline: string
  accent: string
  progress: {
    donated: number
    target: number
  }
  neededItems: DonationItem[]
}

export type DonationStatusStep = {
  label: string
  detail: string
  at: string
}

export type DonationStatus = {
  orgId: string
  stage: DonationStage
  updatedAt: string
  note: string
  history: DonationStatusStep[]
}

export type DonationSelection = {
  itemId: string
  quantity: number
}

export type DonationRequest = {
  items: DonationSelection[]
  donorName?: string
  message?: string
}

export type DonationResponse = {
  donationId: string
  status: DonationStatus
}
