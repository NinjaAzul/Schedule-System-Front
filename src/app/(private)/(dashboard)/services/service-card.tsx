'use client'
import { Badge } from '@/components/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/card'
import { Loader } from '@/components/loader'
import { extractTime, formatPrice } from '@/utils'
import { getServicesControllerFindAllQueryKey, useServicesControllerFindAll } from '@http/api'
import { queryClient } from '@providers'
import { Calendar, Clock, DollarSign, Search } from 'lucide-react'
import { useEffect } from 'react'

export const ServiceCard = () => {
  const {
    data: services,
    isLoading,
    isRefetching,
  } = useServicesControllerFindAll()

  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: getServicesControllerFindAllQueryKey(),
    })
  }, [])

  const isEmpty = services?.services.length === 0

  if (isLoading || isRefetching) {
    return (
      <div
        className="flex justify-center items-center"
        style={{ height: 'calc(100vh - 15rem)' }}
      >
        <Loader />
      </div>
    )
  }

  if (isEmpty) {
    return (
      <div
        className="flex justify-center items-center flex-col gap-4"
        style={{ height: 'calc(100vh - 15rem)' }}
      >
        <p className="text-gray-500 flex items-center gap-2">
          Nenhum serviço encontrado <Search className="w-5 h-5" />
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {services?.services.map(service => (
        <Card
          className="overflow-hidden transition-all hover:shadow-lg"
          key={service.id}
        >
          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle className="mb-0">{service.name}</CardTitle>
            <Badge variant="outline" className="">
              ID: {service.id}
            </Badge>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-gray-100" />
              <span>{service.duration} minutos</span>
            </div>

            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-gray-100" />
              <span className="font-semibold text-lg">
                {formatPrice(service.price)}
              </span>
            </div>

            <div> Horario de atendimento: </div>

            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-gray-100" />
              <span>Das {extractTime(service.startTime)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-gray-100" />
              <span>Até {extractTime(service.endTime)}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
