'use client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/card'
import { Calendar, Clock, DollarSign, Search } from 'lucide-react'

import { Badge } from '@/components/badge'
import { Loader } from '@components'
import { getAppointmentsControllerFindAllQueryKey, useAppointmentsControllerFindAll } from '@http/api'
import { extractTime, formatDate, formatPrice } from '@utils'
import { useEffect } from 'react'
import { queryClient } from '@providers'

export const AppointmentsCard = () => {
  const {
    isLoading,
    data: appointments,
    isRefetching,
  } = useAppointmentsControllerFindAll()

  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: getAppointmentsControllerFindAllQueryKey(),
    })
  }, [])

  const isEmpty = appointments?.appointments.length === 0

  if (isLoading || isRefetching) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-15rem)]">
        <Loader />
      </div>
    )
  }

  if (isEmpty) {
    return (
      <div className="flex justify-center items-center flex-col gap-4 h-[calc(100vh-15rem)]">
        <p className="text-gray-500 flex items-center gap-2">
          Nenhum agendamento encontrado <Search className="w-5 h-5" />
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {appointments?.appointments.map(appointments => (
        <Card
          className="overflow-hidden transition-all hover:shadow-lg"
          key={appointments.id}
        >
          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle className="mb-0">{appointments.service.name} </CardTitle>
            <Badge variant="outline" className="">
              ID: {appointments.id}{' '}
            </Badge>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-gray-100" />
              <span className="font-semibold text-lg">
                {formatPrice(appointments.service.price)}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-gray-100" />
              <span>Agendado para:</span>
            </div>

            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-gray-100" />
              <span>
                {formatDate(appointments.scheduledAt)} às{' '}
                {extractTime(appointments.scheduledAt)}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
