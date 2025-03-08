import dotenv from 'dotenv'
import { defineConfig } from 'orval'

dotenv.config()

export default defineConfig({
  api: {
    input: `${process.env.NEXT_PUBLIC_API_URL}/api/json`,
    output: {
      target: './src/http/api.ts',
      client: 'react-query',
      httpClient: 'axios',
      clean: true,
      baseUrl: process.env.NEXT_PUBLIC_API_URL,
      override: {
        query: {
          useQuery: true,
          useInfinite: true,
          useMutation: true,
        },
        fetch: {
          includeHttpResponseReturnType: true,
        },
        mutator: {
          path: './src/services/axios.ts',
          name: 'customInstance',
        },
      },
    },
  },
})
