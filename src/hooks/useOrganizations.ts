import { useQuery } from '@tanstack/react-query'
import { getOrganizations } from '@/api/orgs'

export const organizationQueryKeys = {
  all: ['organizations'] as const,
  detail: (id: string) => ['organizations', id] as const,
  status: (id: string) => ['organizations', id, 'status'] as const,
}

export const useOrganizations = () =>
  useQuery({
    queryKey: organizationQueryKeys.all,
    queryFn: getOrganizations,
  })
