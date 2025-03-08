import { Aside } from '@contents'
import { hatTop } from '@lucide/lab'
import { Icon, User } from 'lucide-react'

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex flex-col h-screen">
      <header className="flex justify-between  p-4 items-center bg-blue-dark border-b border-gray-600 shadow">
        <span className="flex  items-center gap-2">
          <Icon className="size-7" iconNode={hatTop} />
          <h1 className="text-2xl font-bold">Barber Shop </h1>
        </span>
        <div className="rounded-full bg-gray-300 w-9 h-9 flex items-center justify-center">
          {' '}
          <User className="size-6" />
        </div>
      </header>
      <div className=" flex h-full">
        <Aside />
        <main className="flex-1  bg-gray-900">
          <div className="h-[calc(100vh-110px)]  m-5 p-5 overflow-y-auto bg-gray-700 rounded-sm  border border-gray-600">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
