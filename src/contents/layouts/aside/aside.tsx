'use client'
import { ROLES } from '@constants'
import { useAuth } from '@contexts/auth-context'
import { Home, LogOut, User } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

export const Aside = () => {
  const { push } = useRouter()
  const pathname = usePathname()
  const [currentLink, setCurrentLink] = useState('/appointments')
  const { user, logout } = useAuth()

  const isAdmin = user?.role.id === ROLES.ADMINISTRATOR

  useEffect(() => {
    setCurrentLink(pathname)
  }, [pathname])

  return (
    <aside className="w-64 bg-gray-700 border border-gray-600  h-full max-h-screen">
      <nav>
        <ul>
          {isAdmin && (
            <li
              onClick={() => push('/services')}
              data-active={currentLink === '/services'}
              onKeyDown={e =>
                (e.key === 'Enter' || e.key === ' ') && push('/services')
              }
              className="flex data-[active=true]:bg-gray-600 items-center p-4 hover:bg-gray-600 border-gray-600 cursor-pointer"
            >
              <Home className="h-5 w-5 mr-2" />
              <span>Serviços </span>
            </li>
          )}
          <li
            onClick={() => push('/appointments')}
            data-active={currentLink === '/appointments'}
            onKeyDown={e =>
              (e.key === 'Enter' || e.key === ' ') && push('/appointments')
            }
            className="flex data-[active=true]:bg-gray-600 items-center p-4  hover:bg-gray-600  border-gray-600 cursor-pointer"
          >
            <User className="h-5 w-5 mr-2" />
            <span>Agendamentos </span>
          </li>

          <li
            onClick={() => {
              logout()
              toast.success('Deslogado com sucesso')
            }}
            onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && logout()}
            className="flex data-[active=true]:bg-gray-600 items-center p-4  hover:bg-gray-600   border-gray-600 cursor-pointer"
          >
            <LogOut className="h-5 w-5 mr-2" />
            <span>Sair </span>
          </li>
        </ul>
      </nav>
    </aside>
  )
}
