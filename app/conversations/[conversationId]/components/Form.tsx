'use client'

import useConversation from '@/app/hook/useConversation'
import { http } from '@/app/libs/http'
import { CldUploadButton } from 'next-cloudinary'
import { useRouter } from 'next/navigation'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { HiPaperAirplane, HiPhoto } from 'react-icons//hi2'
import MessageInput from './MessageInput'

const Form = () => {
  const { conversationId } = useConversation()
  const router = useRouter()
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      message: '',
    },
  })

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setValue('message', '', { shouldValidate: true })
    http('messages', {
      method: 'POST',
      data: {
        ...data,
        conversationId,
      },
    }).then(() => router.refresh())
  }

  const handleUpload = async (result: any) => {
    const res = await http('messages', {
      method: 'POST',
      data: {
        image: result.info.secure_url,
        conversationId: conversationId,
      },
    })
  }
  return (
    <div
      className="
      py-4 px-4 w-ful bg-white border-t items-center flex lg:gap-4
        "
    >
      {/* TODO next-cloudinary */}
      <CldUploadButton
        options={{ maxFiles: 1 }}
        onUpload={handleUpload}
        uploadPreset="gxc8zfla"
      >
        <HiPhoto className=" text-sky-500" size={20} />
      </CldUploadButton>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" flex items-center gap-2 lg:gap-2 w-full"
      >
        <MessageInput id="message" errors={errors} register={register} />
        <button
          type="submit"
          className="
            rounded-full 
            p-2 
            bg-sky-500 
            cursor-pointer 
            hover:bg-sky-600 
            transition
          "
        >
          <HiPaperAirplane size={18} className="text-white" />
        </button>
      </form>
    </div>
  )
}
export default Form
