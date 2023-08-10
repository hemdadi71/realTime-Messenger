import React, { useCallback, useState } from 'react'
import Input from '../input'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import Button from '../button'
import { signIn } from 'next-auth/react'
import axios from 'axios'
import { useRouter } from 'next/router'
import { toast } from 'react-hot-toast'
import Cookies from 'js-cookie'
type variant = 'LOGIN' | 'REGISTER'

const AuthForm = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [variant, setVariant] = useState<variant>('LOGIN')
  const [passwordType, setPasswordType] = useState('password')
  const [confirmPasswordType, setConfirmPasswordType] = useState('password')
  const router = useRouter()
  const schema = yup.object({
    email: yup
      .string()
      .required()
      .matches(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{3,4}$/, 'email is not valid'),
    password: yup
      .string()
      .required()
      .matches(/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/, 'password not valid'),

    ...(variant === 'REGISTER' && {
      name: yup.string().required(),
      confirmPassword: yup
        .string()
        .required()
        .oneOf([yup.ref('password')], 'Password not Match'),
    }),
  })
  type FormData = yup.InferType<typeof schema>
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  })
  const toggleVariant = useCallback(() => {
    if (variant === 'LOGIN') {
      setVariant('REGISTER')
    } else {
      setVariant('LOGIN')
    }
  }, [variant])
  const onSubmit: SubmitHandler<FieldValues> = data => {
    setIsLoading(true)

    if (variant === 'REGISTER') {
      axios
        .post('/api/register', data)
        .then(() => {
          toast.success('success signup')
          setIsLoading(false)
          Cookies.set('token', JSON.stringify(data))
          router.push('/conversations')
        })
        .catch(() => {
          toast.error('Somthing wen wrong!!!')
        })
        .finally(() => setIsLoading(false))
    }

    if (variant === 'LOGIN') {
      axios
        .post('/api/register/signIn', data)
        .then(() => {
          toast.success('wellcome 👋')
          setIsLoading(false)
          Cookies.set('token', JSON.stringify(data))
          router.push('/conversations')
        })
        .catch(() => {
          toast.error('Somthing wen wrong!!!')
        })
        .finally(() => setIsLoading(false))
    }
  }
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-3 flex flex-col gap-4">
        {variant === 'REGISTER' && (
          <Input
            id="name"
            label="Name"
            register={{ ...register('name') }}
            errors={errors.name?.message}
            disabled={isLoading}
          />
        )}
        <Input
          id="email"
          label="Email"
          type="email"
          register={{ ...register('email') }}
          errors={errors.email?.message}
          disabled={isLoading}
        />
        <Input
          id="password"
          label="Password"
          type={passwordType}
          register={{ ...register('password') }}
          errors={errors.password?.message}
          disabled={isLoading}
          setType={setPasswordType}
        />
        {variant === 'REGISTER' && (
          <Input
            id="confirmPassword"
            label="Confirm password"
            type={confirmPasswordType}
            register={{ ...register('confirmPassword') }}
            errors={errors.confirmPassword?.message}
            disabled={isLoading}
            setType={setConfirmPasswordType}
          />
        )}
        <Button isLoading={isLoading} type="submit">
          {variant === 'LOGIN' ? 'Sign in' : 'Register'}
        </Button>
        <p
          className="text-white cursor-pointer hover:text-red-500"
          onClick={toggleVariant}>
          {variant === 'LOGIN' ? 'Create an account' : 'Login'}
        </p>
      </form>
    </>
  )
}

export default AuthForm
