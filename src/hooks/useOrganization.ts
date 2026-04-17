import { useQuery } from '@tanstack/react-query'
import { getOrganization } from '@/api/orgs'
import { organizationQueryKeys } from '@/hooks/useOrganizations'

export const useOrganization = (id?: string) =>
  useQuery({
    queryKey: organizationQueryKeys.detail(id ?? ''),
    queryFn: () => getOrganization(id ?? ''),
    enabled: Boolean(id),
  })
