import { FC } from 'react'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'

interface MessageInputProps {
  id: string
  placeholder?: string
  type?: string
  required?: boolean
  register: UseFormRegister<FieldValues>
  errors: FieldErrors
}

const MessageInput: FC<MessageInputProps> = ({
  placeholder,
  id,
  errors,
  type,
  required,
  register,
}) => {
  return (
    <div className=" relative w-full">
      <input
        type={type}
        id={id}
        autoComplete={id}
        {...register(id, { required })}
        className=" text-block font-light 
        py-2 px-4 bg-neutral-100 rounded-md focus:outline-none"
      />
    </div>
  )
}
export default MessageInput
