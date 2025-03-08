'use client'
import { authControllerAuthenticate } from '@/http/api'
import { Button, Input } from '@components'
import { useAuth } from '@contexts'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight, Mail, User } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string(),
})

type LoginFormInputs = z.infer<typeof loginSchema>

export const LoginPage: React.FC = () => {
  const { login } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const { token, user } = await authControllerAuthenticate({
        email: data.email,
        password: data.password,
      })
      login(user, token)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full bg-gray-700 border border-gray-600 rounded-2xl p-8 space-y-6 md:max-w-[440px]"
      >
        <h2 className="font-heading font-semibold text-gray-200 text-xl">
          Login
        </h2>
        <div className="space-y-2">
          <Input
            error={errors.email}
            {...register('email')}
            icon={<User />}
            placeholder="E-mail"
            type="text"
          />
          {errors.email && (
            <p className="text-danger text-xs font-semibold">
              {errors.email?.message}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Input
            error={errors.password}
            {...register('password')}
            icon={<Mail />}
            placeholder="Senha"
            type="password"
          />
          {errors.password && (
            <p className="text-danger text-xs font-semibold">
              {errors.password?.message}
            </p>
          )}
        </div>
        <Button type="submit">
          <span className="flex w-full justify-between items-center gap-2">
            <p>Entrar</p>
            <ArrowRight />
          </span>
        </Button>
      </form>
    </div>
  )
}
