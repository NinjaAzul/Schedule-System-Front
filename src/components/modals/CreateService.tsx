'use client'
import { Button } from '@components/button'
import { ModalBase } from './ModalBase'

import { Input } from '@components/input'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  getServicesControllerFindAllQueryKey,
  useServicesControllerCreate,
} from '@http/api'
import { queryClient } from '@providers'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { z } from 'zod'
import { useEffect } from 'react'
import { Check } from 'lucide-react'

const createServiceSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  duration: z
    .preprocess(
      value => Number(value),
      z
        .number({ invalid_type_error: 'O número não é válido' })
        .min(1, 'Duração deve ser maior que 0 minutos')
    )
    .transform(value => Number(value)),
  price: z
    .preprocess(
      value => Number(value),
      z
        .number({ invalid_type_error: 'O número não é válido' })
        .min(1, 'Preço deve ser maior que R$0.00 reais')
    )
    .transform(value => Number(value)),
  startHour: z.string().min(1, 'Hora de início é obrigatória'),
  endHour: z.string().min(1, 'Hora de término é obrigatória'),
})

type CreateServiceFormInputs = z.infer<typeof createServiceSchema>

export const CreateServiceModal = ({
  isOpen,
  closeModal,
}: {
  isOpen: boolean
  closeModal: () => void
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<CreateServiceFormInputs>({
    resolver: zodResolver(createServiceSchema),
    defaultValues: {
      name: undefined,
      duration: undefined,
      price: undefined,
      startHour: undefined,
      endHour: undefined,
    },
    mode: 'all',
  })
  const { mutate, isPending } = useServicesControllerCreate()

  const onSubmit = (data: CreateServiceFormInputs) => {
    const currentDate = new Date().toISOString().split('T')[0]
    const startTimeISO = `${currentDate}T${data.startHour}:00.000Z`
    const endTimeISO = `${currentDate}T${data.endHour}:00.000Z`
    mutate(
      {
        data: {
          name: data.name,
          duration: data.duration,
          price: data.price,
          startHour: startTimeISO,
          endHour: endTimeISO,
        },
      },
      {
        onSuccess: () => {
          toast.success('Serviço criado com sucesso')
          closeModal()
          queryClient.invalidateQueries({
            queryKey: getServicesControllerFindAllQueryKey(),
          })
        },
      }
    )
  }

  useEffect(() => {
    reset()
  }, [reset])

  return (
    <ModalBase isOpen={isOpen} closeModal={closeModal} title="Criar Serviço">
      <div className="py-2">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Input
              label="Nome"
              error={errors.name}
              {...register('name', { required: 'Nome é obrigatório' })}
              placeholder="Nome do Serviço"
              type="text"
            />
            {errors.name && (
              <p className="text-danger text-xs font-semibold">
                {errors.name?.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Input
              label="Duração"
              error={errors.duration}
              inputMode="numeric"
              {...register('duration', { required: 'Duração é obrigatória' })}
              placeholder="Duração"
              type="number"
            />
            {errors.duration && (
              <p className="text-red-500 text-xs mt-1">
                {errors.duration.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Input
              error={errors.price}
              label="Preço"
              inputMode="decimal"
              {...register('price', { required: 'Preço é obrigatório' })}
              placeholder="Preço"
              type="text"
            />
            {errors.price && (
              <p className="text-red-500 text-xs mt-1">
                {errors.price.message}
              </p>
            )}
          </div>
          <div className="space-y-2 grid grid-cols-2 gap-2">
            <div className="space-y-2">
              <Input
                error={errors.startHour}
                label="Hora de início"
                {...register('startHour', {
                  required: 'Hora de início é obrigatória',
                })}
                placeholder="Hora de início"
                type="time"
              />
              {errors.startHour && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.startHour.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Input
                error={errors.endHour}
                label="Hora de término"
                {...register('endHour', {
                  required: 'Hora de término é obrigatória',
                })}
                placeholder="Hora de término"
                type="time"
              />
              {errors.endHour && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.endHour.message}
                </p>
              )}
            </div>
          </div>
          <div className="flex gap-2 justify-end">

            <Button isLoading={isPending} type="submit" className="w-full items-center justify-between" icon={<Check />} disabled={!isValid || isPending}>
              Criar
            </Button>

            <Button type="button" variant="badge" className='w-full flex-1' onClick={closeModal} disabled={isPending}>
              Cancelar
            </Button>

          </div>
        </form>
      </div>
    </ModalBase>
  )
}
