import { apiClient } from './client'

export const getUsers = async () => {
  const response = await apiClient.get('/api/users')
  return response.data
}
