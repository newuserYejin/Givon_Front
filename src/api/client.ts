import axios from 'axios'

export const apiClient = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const storedSession = window.localStorage.getItem('givon-auth-session')

    if (storedSession) {
      try {
        const parsed = JSON.parse(storedSession) as { accessToken?: string }
        if (parsed.accessToken) {
          config.headers = config.headers ?? {}
          config.headers.Authorization = `Bearer ${parsed.accessToken}`
        }
      } catch {
        window.localStorage.removeItem('givon-auth-session')
      }
    }
  }

  return config
})
