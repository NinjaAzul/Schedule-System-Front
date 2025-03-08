'use client'

import {
  useAppointmentsControllerCreate,
  useServicesControllerFindAll,
  useServicesControllerFindAvailability,
  getAppointmentsControllerFindAllQueryKey
} from '@http/api'
import React, { useEffect, useId, useState } from 'react'
import DatePicker from 'react-datepicker'
import { Controller, useForm } from 'react-hook-form'
import { ModalBase } from './ModalBase'
import 'react-datepicker/dist/react-datepicker.css'
import { zodResolver } from '@hookform/resolvers/zod'
import { queryClient } from '@providers'
import { formateHoursToISODate } from '@utils'
import { ptBR } from 'date-fns/locale'
import { ArrowRight, Calendar, Check, User } from 'lucide-react'
import { toast } from 'react-toastify'
import { z } from 'zod'
import { Input } from '@components/input'
import { Select } from '@components/select'
import { Button } from '@components/button'
import { TimeCarousel } from '@components/time-carousel'


const schema = z.object({
  date: z.date({
    required_error: 'Data é obrigatória',
  }),
  service: z.string().min(1, { message: 'Serviço inválido' }),
  time: z.string().min(1, { message: 'Hora é obrigatória' }),
})

type FormData = z.infer<typeof schema>

export const CreateAppointmentModal = ({
  isOpen,
  closeModal,
}: {
  isOpen: boolean
  closeModal: () => void
}) => {

  const [step, setStep] = useState(1)


  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { isValid },
  } = useForm<FormData>({
    mode: 'onChange',
    resolver: zodResolver(schema),
    defaultValues: {
      date: undefined,
      service: '',
      time: '',
    },
  })


  const date = watch('date')
  const service = watch('service')
  const time = watch('time')
  const { mutate: createAppointment, isPending } = useAppointmentsControllerCreate()
  const { data: services, isLoading: isLoadingServices } = useServicesControllerFindAll()
  const { data: availableAppointments, isLoading: isLoadingAvailableAppointments } = useServicesControllerFindAvailability(
    Number(service),
    {
      fromDate: date?.toString(),
      toDate: date?.toString(),
    },
    {
      query: {
        staleTime: 0,
        enabled: !!date && !!service,
      },
    }
  )


  const isEmptyAvailableAppointments =
    availableAppointments?.length === 0 || !availableAppointments


  const [times] = availableAppointments || []

  const onSubmit = (data: FormData) => {
    console.log(data, 'data')
    if (step === 1) {
      setStep(2)
    } else {
      createAppointment(
        {
          data: {
            scheduledAt: formateHoursToISODate(data.date.toString(), data.time),
            serviceId: Number(service),
          },
        },
        {
          onSuccess: response => {
            toast.success(response.message)
            queryClient.invalidateQueries({
              queryKey: getAppointmentsControllerFindAllQueryKey(),
            })

            closeModal()
          },
        }
      )
    }
  }

  useEffect(() => {
    reset()
  }, [reset])

  useEffect(() => {
    if (isOpen) {
      setStep(1)
    }
  }, [isOpen])

  return (
    <ModalBase
      isOpen={isOpen}
      closeModal={closeModal}
      isLoader={isLoadingAvailableAppointments || isLoadingServices}
      title="Agendamento"
    >
      <form onSubmit={handleSubmit(onSubmit)} className=" ">
        {step === 1 && (
          <div className="flex flex-col gap-2 py-2">
            <Controller
              control={control}
              name="date"
              render={({ field }) => (
                <DatePicker
                  selected={field.value}
                  onChange={field.onChange}
                  locale={ptBR}
                  dateFormat="dd/MM/yyyy"
                  minDate={new Date()}
                  placeholderText="Selecione a data"
                  wrapperClassName="w-full"
                  customInput={<Input icon={<Calendar />} label="Data" />}
                />
              )}
            />

            <Controller
              control={control}
              name="service"
              render={({ field }) => (
                <Select
                  label="Serviço"
                  icon={<User size={18} />}
                  options={[
                    ...(services?.services.map(service => ({
                      value: service.id.toString(),
                      label: service.name,
                    })) || []),
                  ]}
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />

            {isEmptyAvailableAppointments ? (
              <div className="flex justify-center items-center ml-2 my-5">
                <p className="text-gray-100">
                  Nenhum horário disponível para o serviço selecionado
                </p>
              </div>
            ) : (
              <div>
                <Controller
                  name="time"
                  control={control}
                  render={({ field }) => (
                    <div>
                      < TimeCarousel
                        key={useId()}
                        label="Horários disponíveis"
                        times={times.times}
                        value={field.value}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        name={field.name}
                      />
                    </div>
                  )}
                />
              </div>
            )}

          </div>
        )}

        {step === 2 && (
          <div className='my-10'>
            <p>
              Você tem certeza que deseja agendar para o serviço
              <span className='font-bold text-blue'>
                {' '}{services?.services.find(s => s.id === Number(service))?.name} {' '}
              </span>
              no dia
              <span className='font-bold text-blue'>
                {' '}  {date?.toLocaleDateString()} {' '}
              </span>
              às
              <span className='font-bold text-blue'>
                {' '}  {time}
              </span>
              ?
            </p>
          </div>
        )}

        <div className="flex gap-2 mt-4">
          <Button
            className="w-full items-center justify-between"
            variant="outline"
            icon={step === 1 ? <ArrowRight /> : <Check />}
            disabled={isPending || !isValid}
            type="submit"
            isLoading={isPending}
          >
            {step === 1 ? 'Próximo' : 'Confirmar'}
          </Button>
          <Button
            className="w-full flex-1"
            variant="badge"
            onClick={() => closeModal()}
            disabled={isPending}
          >
            Cancelar
          </Button>
        </div>

      </form>
    </ModalBase>
  )
}
