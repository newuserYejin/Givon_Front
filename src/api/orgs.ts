import { apiClient } from '@/api/client'
import { mockApi } from '@/api/mock'
import type { DonationRequest, DonationResponse, DonationStatus, Organization } from '@/types/donation'

const withFallback = async <T>(request: Promise<{ data: T }>, fallback: () => Promise<T>) => {
  try {
    const response = await request
    return response.data
  } catch {
    return fallback()
  }
}

export const getOrganizations = async () => {
  return withFallback(apiClient.get<Organization[]>('/orgs'), () => mockApi.listOrganizations())
}

export const getOrganization = async (id: string) => {
  return withFallback(apiClient.get<Organization>(`/orgs/${id}`), () => mockApi.getOrganization(id))
}

export const getOrganizationStatus = async (id: string) => {
  return withFallback(apiClient.get<DonationStatus>(`/orgs/${id}/status`), () => mockApi.getStatus(id))
}

export const donateToOrganization = async (id: string, payload: DonationRequest) => {
  return withFallback(apiClient.post<DonationResponse>(`/orgs/${id}/donations`, payload), () =>
    mockApi.donate(id, payload),
  )
}
