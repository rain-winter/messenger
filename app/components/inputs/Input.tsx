'use client'
import clsx from 'clsx'
import { FC } from 'react'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'

interface InputProps {
  label: string
  id: string
  type?: string
  required?: boolean
  register: UseFormRegister<FieldValues>
  errors: FieldErrors
  disabled?: boolean
}

const Input: FC<InputProps> = ({
  label,
  id,
  type,
  required,
  register,
  errors,
  disabled,
}) => {
  return (
    <div>
      <label
        className="
        block
        text-sm
        font-medium
        text-gray-900
      "
        htmlFor={id}
      >
        {label}
      </label>

      <div className=" mt-2 ">
        <input
          id={id}
          type={type}
          disabled={disabled}
          autoComplete="off"
          {...register(id, { required })}
          className={clsx(`
            form-input block w-full rounded-md border-0 py-1.5 
            shadow-sm ring-1  ring-inset ring-gray-300 
            placeholder:text-gray-400
            focus:ring-2 focus:ring-inset focus:ring-sky-600
            sm:text-sm sm:leading-3,
            errors[id] && 'focus:ring-rose-600,
            disabled && ' opacity-50 cursor-default'
        `)}
        />
      </div>
    </div>
  )
}

export default Input
