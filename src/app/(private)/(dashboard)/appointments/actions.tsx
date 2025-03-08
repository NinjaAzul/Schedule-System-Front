'use client'
import { Button, CreateAppointmentModal } from '@components'

import { useAppointmentsControllerFindAll } from '@http/api'
import { Plus, RefreshCcw } from 'lucide-react'
import { useState } from 'react'

export const Actions = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { isLoading, refetch, isRefetching } =
    useAppointmentsControllerFindAll()

  if (isLoading) {
    return <div>Carregando...</div>
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Agendamentos</h1>
        <div className="flex items-center justify-end gap-2">
          <Button
            title="Recarregar"
            className="max-w-fit"
            isLoading={isRefetching}
            onClick={() => refetch()}
          >
            <RefreshCcw />
          </Button>
          <Button
            title="Novo Agendamento"
            className="max-w-fit"
            onClick={() => setIsOpen(true)}
          >
            <Plus />
          </Button>
        </div>
      </div>
      {isOpen && (
        <CreateAppointmentModal
          isOpen={isOpen}
          closeModal={() => setIsOpen(false)}
        />
      )}
    </>
  )
}
