import React, { useCallback, useEffect, useState } from 'react'
import Input from '../input/TextField'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import Button from '../button'
import { signIn } from 'next-auth/react'
import axios from 'axios'
import { useRouter } from 'next/router'
import { toast } from 'react-hot-toast'
import Cookies from 'js-cookie'
import { getCurrentUser } from '@/actions/getCurrentUser'
import CheckBox from '../input/CheckBox'
import CheckBoxInput from '../input/CheckBox'
type variant = 'LOGIN' | 'REGISTER'

const AuthForm = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [variant, setVariant] = useState<variant>('LOGIN')
  const [passwordType, setPasswordType] = useState('password')
  const [confirmPasswordType, setConfirmPasswordType] = useState('password')
  const [isShowPassword, setIsShowPassword] = useState(false)
  const [isChecked, setIsChecked] = useState(true)
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
    setPasswordType('password')
    setConfirmPasswordType('password')
    setIsShowPassword(false)
    if (variant === 'REGISTER') {
      axios
        .post('/api/register', data)
        .then(res => {
          toast.success('success signup')
          setIsLoading(false)
          router.push('/contacts')
        })
        .catch(() => {
          toast.error('Somthing went wrong!!!')
        })
        .finally(() => setIsLoading(false))
    }

    if (variant === 'LOGIN') {
      axios
        .post('/api/register/signIn', data)
        .then(res => {
          toast.success('wellcome 👋')
          setIsLoading(false)
          isChecked &&
            Cookies.set('token', JSON.stringify(res.data), {
              expires: 7,
            })
          localStorage.setItem('isLogin', JSON.stringify({ isLogin: true }))
          router.push('/contacts')
        })
        .catch(() => {
          toast.error('Somthing went wrong!!!')
        })
        .finally(() => setIsLoading(false))
    }
  }
  const handleChange = (e: any) => {
    const checked = e.target.checked
    if (checked) {
      setIsChecked(true)
    } else {
      setIsChecked(false)
    }
  }
  useEffect(() => {
    localStorage.removeItem('isLogin')
  }, [])
  return (
    <>
      <div className="flex justify-center text-gray-100 text-2xl font-bold border-b border-gray-200 pb-3">
        <p>{variant === 'LOGIN' ? 'Login' : 'Join now'}</p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-3 flex flex-col gap-1 overflow-auto">
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
          isShowPassword={isShowPassword}
          setIsShowPassword={setIsShowPassword}
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
            isShowPassword={isShowPassword}
            setIsShowPassword={setIsShowPassword}
          />
        )}
        {variant === 'LOGIN' && (
          <CheckBoxInput onChange={handleChange} label="Remember me" />
        )}
        <Button className="mt-4" isLoading={isLoading} type="submit">
          {variant === 'LOGIN' ? 'Sign in' : 'Register'}
        </Button>
        <div className="w-full h-[.5px] bg-gray-200 my-4" />
        <div
          className="
            flex 
            gap-2 
            justify-center 
            text-sm 
             
            px-2 
            text-gray-300
          ">
          <div>
            {variant === 'LOGIN'
              ? 'New to Messenger?'
              : 'Already have an account?'}
          </div>
          <p
            className="text-white cursor-pointer hover:text-blue-400"
            onClick={toggleVariant}>
            {variant === 'LOGIN' ? 'Create an account' : 'Login'}
          </p>
        </div>
      </form>
    </>
  )
}

export default AuthForm
