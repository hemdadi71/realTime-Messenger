import { BsEyeSlashFill } from 'react-icons/bs'
import { BsEyeFill } from 'react-icons/bs'
import { getCurrentUser } from '@/actions/getCurrentUser'
interface InputProps {
  label: string
  id: string
  type?: string
  register: any
  errors: any
  disabled?: boolean
  setType?: any
  isShowPassword?: boolean
  setIsShowPassword?: any
}

const Input: React.FC<InputProps> = ({
  label,
  id,
  type,
  register,
  errors,
  disabled,
  setType,
  isShowPassword,
  setIsShowPassword,
}) => {
  return (
    <>
      <div>
        <label
          className="block text-md font-medium leading-6 text-gray-200"
          htmlFor={id}>
          {label}:
        </label>
        <div className="mt-2 relative flex items-center">
          <input
            type={type}
            id={id}
            autoComplete={id}
            disabled={disabled}
            {...register}
            className={`rounded-full py-1 px-3 w-full focus:outline-none ${
              disabled && 'opacity-80 cursor-default'
            }`}
          />
          <div className="absolute right-2 text-gray-900">
            {label === 'Password' || label === 'Confirm password' ? (
              isShowPassword ? (
                <BsEyeFill
                  onClick={() => {
                    setIsShowPassword(false)
                    setType('password')
                  }}
                  size={18}
                />
              ) : (
                <BsEyeSlashFill
                  onClick={() => {
                    setIsShowPassword(true)
                    setType('text')
                  }}
                  size={18}
                />
              )
            ) : null}
          </div>
        </div>
        <div className="my-1 pl-2">
          <p className="text-red-400 text-sm font-medium">{errors}</p>
        </div>
      </div>
    </>
  )
}

export default Input
