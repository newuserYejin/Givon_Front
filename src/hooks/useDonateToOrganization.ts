import { useMutation, useQueryClient } from '@tanstack/react-query'
import { donateToOrganization } from '@/api/orgs'
import { organizationQueryKeys } from '@/hooks/useOrganizations'
import type { DonationRequest } from '@/types/donation'

export const useDonateToOrganization = (orgId?: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: DonationRequest) => donateToOrganization(orgId ?? '', payload),
    onSuccess: async () => {
      if (!orgId) return
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: organizationQueryKeys.status(orgId) }),
        queryClient.invalidateQueries({ queryKey: organizationQueryKeys.detail(orgId) }),
      ])
    },
  })
}
