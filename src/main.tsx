import { ConfigProvider, theme } from 'antd'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { App } from '@/App'
import { PageShell } from '@/components/PageShell'
import { AuthProvider } from '@/hooks/useAuth'
import 'antd/dist/reset.css'
import '@/index.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        algorithm: theme.defaultAlgorithm,
        token: {
          colorPrimary: '#0f172a',
          colorInfo: '#334155',
          colorSuccess: '#334155',
          colorWarning: '#64748b',
          borderRadius: 16,
          fontFamily: '"Noto Sans KR", "Space Grotesk", sans-serif',
        },
      }}
    >
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AuthProvider>
            <PageShell>
              <App />
            </PageShell>
          </AuthProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </ConfigProvider>
  </React.StrictMode>,
)
