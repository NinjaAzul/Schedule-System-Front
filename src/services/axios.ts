import { LOCAL_STORAGE_KEY } from '@/constants'
import { type UserDto, authControllerMe } from '@/http/api'
import { formatAndShowValidationErrors } from '@utils'
import Axios, { type AxiosError, type AxiosRequestConfig } from 'axios'
import { usePathname, useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

export type ValidationError = {
  errors: {
    property: string
    error: {
      isNumber: string
    }
    children: []
  }[]
}

export const AXIOS_INSTANCE = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
})

AXIOS_INSTANCE.interceptors.request.use(config => {
  const token = localStorage.getItem(LOCAL_STORAGE_KEY.TOKEN)
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

function createAxiosResponseInterceptor() {
  const interceptor = AXIOS_INSTANCE.interceptors.response.use(
    response => response,
    async error => {
      if (error.response?.status !== 401) {
        return Promise.reject(error)
      }

      if (error.response.config.url.includes('/auth')) {
        return Promise.reject(error)
      }

      AXIOS_INSTANCE.interceptors.response.eject(interceptor)

      try {
        const { user, token } = await authControllerMe()
        saveToken(user, token)
        error.response.config.headers.Authorization = `Bearer ${token}`
        return AXIOS_INSTANCE(error.response.config)
      } catch (error2) {
        destroyToken()
        const router = useRouter()
        router.push('/')
        return Promise.reject(error2)
      } finally {
        createAxiosResponseInterceptor()
      }
    }
  )
}

createAxiosResponseInterceptor()

export const customInstance = <T>(config: AxiosRequestConfig): Promise<T> => {
  const source = Axios.CancelToken.source()
  const promise = AXIOS_INSTANCE({ ...config, cancelToken: source.token }).then(
    ({ data }) => data
  )

  // @ts-ignore
  promise.cancel = () => {
    source.cancel('Query was cancelled')
  }

  return promise
}

AXIOS_INSTANCE.interceptors.response.use(
  response => {
    return response
  },
  error => {
    handleError(error)
    return Promise.reject(error)
  }
)

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const handleError = (error: any) => {
  if (error.response?.status === 401) {
    toast.error(error.response.data.message)
  }

  if (error.response?.status === 422) {
    formatAndShowValidationErrors(error.response.data.message.errors)
  }
  if (error.response?.status === 500) {
    toast.error('Algo inesperado aconteceu, tente novamente mais tarde')
  }
}

export const setAuthorizationHeader = (token: string) => {
  AXIOS_INSTANCE.defaults.headers.Authorization = `Bearer ${token}`
}
export const removeAuthorizationHeader = () => {
  AXIOS_INSTANCE.defaults.headers.Authorization = ''
}

function saveToken(user: UserDto, token: string) {
  localStorage.setItem(LOCAL_STORAGE_KEY.USER, JSON.stringify(user))
  localStorage.setItem(LOCAL_STORAGE_KEY.TOKEN, token)
}

function destroyToken() {
  localStorage.removeItem(LOCAL_STORAGE_KEY.USER)
  localStorage.removeItem(LOCAL_STORAGE_KEY.TOKEN)
}
