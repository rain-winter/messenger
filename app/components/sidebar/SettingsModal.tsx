import { http } from '@/app/libs/http'
import { User } from '@prisma/client'
import { CldUploadButton } from 'next-cloudinary'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { FC, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import Button from '../Button'
import Input from '../inputs/Input'
import Modal from '../modals/Modal'

interface SettingsModalProps {
  isOpen?: boolean
  currentUser: User
  onClose: () => void
}
const SettingsModal: FC<SettingsModalProps> = ({
  isOpen,
  currentUser,
  onClose,
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: currentUser?.name,
      image: currentUser.image,
    },
  })
  const image = watch('image')

  const handleUpload = (result: any) => {
    setValue('image', result.info.secure_url, {
      shouldValidate: true,
    })
  }

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true)
    http('settings', {
      method: 'POST',
      data,
    })
      .then(() => {
        onClose()
        router.refresh()
      })
      .catch(() => toast.error('Something went wrong!'))
      .finally(() => setIsLoading(false))
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className=" space-y-12">
          <div className=" border-b border-gray-900/10 pb-12">
            {/* 标题 */}
            <h2 className=" text-base font-semibold left-7 text-gray-900">
              个人信息
            </h2>
            <p className=" mt-1 text-sm leading-6 text-gray-500">
              编辑个人信息
            </p>
            <div className=" mt-10 flex flex-col gap-y-0">
              <Input
                disabled={isLoading}
                label="名字"
                id="name"
                errors={errors}
                required
                register={register}
              />
              <div>
                <label
                  htmlFor="photo"
                  className=" block text-sm font-medium left-6 test-gray-900"
                >
                  头像
                </label>
                <div className="mt-2 flex items-center gap-x-3">
                  <Image
                    width={48}
                    height={48}
                    className=" rounded-md"
                    src={
                      image || currentUser.image || '/images/placeholder.jpg'
                    }
                    alt="头像"
                  />
                  <CldUploadButton
                    options={{ maxFiles: 1 }}
                    onUpload={handleUpload}
                    uploadPreset="uploadPreset"
                  >
                    <Button disabled={isLoading} secondary type="button">
                      修改
                    </Button>
                  </CldUploadButton>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 sm:flex ">
          <Button disabled={isLoading} secondary onClick={onClose}>
            取消
          </Button>
          <Button disabled={isLoading} type="submit">
            保存
          </Button>
        </div>
      </form>
    </Modal>
  )
}

export default SettingsModal
