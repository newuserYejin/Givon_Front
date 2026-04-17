import { useQuery } from '@tanstack/react-query'
import { getOrganizationStatus } from '@/api/orgs'
import { organizationQueryKeys } from '@/hooks/useOrganizations'

export const useOrganizationStatus = (id?: string) =>
  useQuery({
    queryKey: organizationQueryKeys.status(id ?? ''),
    queryFn: () => getOrganizationStatus(id ?? ''),
    enabled: Boolean(id),
  })
