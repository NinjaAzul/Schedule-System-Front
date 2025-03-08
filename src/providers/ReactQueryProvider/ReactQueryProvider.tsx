'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
      staleTime: 5000,
    },
  },
})

export const ReactQueryProvider = ({
  children,
}: { children: React.ReactNode }) => {
  if (typeof window === 'undefined') {
    return null
  }


  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
