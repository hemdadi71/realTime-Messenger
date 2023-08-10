import { useState } from 'react'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'
import { BsEyeSlashFill } from 'react-icons/bs'
import { BsEyeFill } from 'react-icons/bs'
interface InputProps {
  label: string
  id: string
  type?: string
  register: any
  errors: any
  disabled?: boolean
  setType?: any
}

const Input: React.FC<InputProps> = ({
  label,
  id,
  type,
  register,
  errors,
  disabled,
  setType,
}) => {
  const [isShowPassword, setIsShowPassword] = useState(false)
  return (
    <>
      <div>
        <label
          className="block text-sm font-medium leading-6 text-gray-200"
          htmlFor={id}>
          {label}
        </label>
        <div className="mt-2 relative">
          <input
            type={type}
            id={id}
            autoComplete={id}
            disabled={disabled}
            {...register}
            className={`rounded-full py-1 px-3 focus:outline-none ${
              disabled && 'opacity-80 cursor-default'
            }`}
          />
          <div className="absolute top-1 right-2 text-gray-900">
            {label === 'Password' || label === 'Confirm password' ? (
              isShowPassword ? (
                <BsEyeFill
                  onClick={() => {
                    setIsShowPassword(false)
                    setType('password')
                  }}
                  size={20}
                />
              ) : (
                <BsEyeSlashFill
                  onClick={() => {
                    setIsShowPassword(true)
                    setType('text')
                  }}
                  size={20}
                />
              )
            ) : null}
          </div>
        </div>
        <div className="my-1 pl-2">
          <p className="text-red-500 text-sm font-medium">{errors}</p>
        </div>
      </div>
    </>
  )
}

export default Input
