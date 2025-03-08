'use client'
import { Button, CreateServiceModal } from '@components'
import { useServicesControllerFindAll } from '@http/api'
import { Plus, RefreshCcw } from 'lucide-react'
import { useState } from 'react'

export const Actions = () => {
  const { isLoading, refetch, isRefetching } = useServicesControllerFindAll()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Serviços</h1>
        <div className="flex items-center justify-end gap-2">
          <Button
            title="Recarregar"
            className="max-w-fit"
            isLoading={isLoading || isRefetching}
            onClick={() => refetch()}
          >
            <RefreshCcw />
          </Button>
          <Button
            title="Novo Serviço"
            className="max-w-fit"
            onClick={() => setIsOpen(true)}
          >
            <Plus />
          </Button>
        </div>
      </div>
      <CreateServiceModal isOpen={isOpen} closeModal={() => setIsOpen(false)} />
    </>
  )
}
