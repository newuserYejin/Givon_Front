import { useQuery } from '@tanstack/react-query'
import { getUsers } from '@/api/userApi'
import type { User } from '@/types/user'

export const userQueryKeys = {
  all: ['users'] as const,
}

export const useUsers = () =>
  useQuery<User[]>({
    queryKey: userQueryKeys.all,
    queryFn: getUsers as () => Promise<User[]>,
  })
