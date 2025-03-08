'use client'
import { LOCAL_STORAGE_KEY, ROLES } from '@/constants'
import type { UserDto } from '@/http/api'
import { usePathname, useRouter } from 'next/navigation'
import type React from 'react'
import { createContext, useContext, useEffect, useState } from 'react'

interface AuthContextType {
  user: UserDto | null
  login: (userData: UserDto, token: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  if (typeof window === 'undefined') {
    return null
  }

  const [user, setUser] = useState<UserDto | null>(null)
  const router = useRouter()
  const pathname = usePathname()

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const validateToken = async () => {
      if (typeof window === 'undefined') {
        return null
      }

      const storedToken = localStorage.getItem(LOCAL_STORAGE_KEY.TOKEN)
      const storedUser = localStorage.getItem(LOCAL_STORAGE_KEY.USER)

      if (!storedToken) {
        router.push('/')
        logout()
        return
      }

      setUser(JSON.parse(storedUser as string))
      login(JSON.parse(storedUser as string), storedToken as string)
    }

    validateToken()
  }, [])

  const login = (userData: UserDto, token: string) => {
    localStorage.setItem(LOCAL_STORAGE_KEY.USER, JSON.stringify(userData))
    localStorage.setItem(LOCAL_STORAGE_KEY.TOKEN, token)
    setUser(userData)

    const isAdmin = userData.role.id === ROLES.ADMINISTRATOR

    if (pathname === '/') {
      if (isAdmin) {
        router.push('/services')
      } else {
        router.push('/appointments')
      }
    }
  }

  const logout = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY.USER)
    localStorage.removeItem(LOCAL_STORAGE_KEY.TOKEN)
    setUser(null)
    router.push('/')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
