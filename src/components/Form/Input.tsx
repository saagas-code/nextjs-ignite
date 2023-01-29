import { forwardRef, ForwardRefRenderFunction } from 'react'
import {UseFormRegister, FieldValues } from 'react-hook-form'
import { FieldError } from 'react-hook-form/dist/types'

type Props = {
  name: string,
  type: string,
  placeholder?: string
  label?: string
  register?: any
  error?: FieldError
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, Props> = ({name, type, placeholder, label, register, error}, ref) => {
  return (
    <>
      <div className="flex flex-col w-full">
        { !!label && <label htmlFor={name}>{label}</label> }
        <input 
          name={name} 
          type={type}
          id={name}
          placeholder={placeholder} 
          ref={ref}
          {...register}
          className={`rounded-[8px] bg-gray-900 p-2 border border-transparent 
          focus:border-pink-600 mb-2  hover:bg-gray-900 transition-all 
            duration-500 ease-in-out ${error ? '!border-red-500' : ''}`}
        />
        <span className="text-sm text-red-400">
          {error?.message}
        </span>
        
      </div>
    </>
  )
}

export const Input = forwardRef(InputBase)