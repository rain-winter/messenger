'use client'

import Button from '@/app/components/Button'
import Modal from '@/app/components/modals/Modal'
import useConversation from '@/app/hook/useConversation'
import { http } from '@/app/libs/http'
import { Dialog } from '@headlessui/react'
import { useRouter } from 'next/navigation'
import { FC, useCallback, useState } from 'react'
import { FiAlertTriangle } from 'react-icons/fi'

interface ConfirmModalProps {
  isOpen: boolean
  onClose: () => void
}
const ConfirmModal: FC<ConfirmModalProps> = ({ isOpen, onClose }) => {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { conversationId } = useConversation()
  const onDelete = useCallback(async () => {
    setIsLoading(true)
    http(`conversations/${conversationId}`, {
      method: 'delete',
    })
      .then(() => {
        onClose()
        router.push('/conversations')
        router.refresh()
      })
      .finally(() => setIsLoading(false))
  }, [conversationId, onClose, router])

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div
        className="
            mx-auto flex h-12 w-12 flex-shrink-0 items-center
            justify-center rounded-md bg-red-100 
            sm:mx-0 sm:h-10 sm:w-10
         "
      >
        <FiAlertTriangle className=" h-6 w-6 text-red-600" />
      </div>
      <div
        className="
          mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left
        "
      >
        <Dialog.Title
          as="h3"
          className=" font-bold text-gray-900 text-base font-serif leading-6"
        >
          删除聊天
        </Dialog.Title>
        <div className="mt-2">
          <p className="text-sm text-gray-500">
            确实要删除此对话吗? 无法撤消此操作。
          </p>
        </div>
      </div>

      <div className="mt-5 sm:mt-4 flex justify-end ">
        <Button disabled={isLoading} danger onClick={onDelete}>
          删除
        </Button>
        <Button disabled={isLoading} secondary onClick={onClose}>
          取消
        </Button>
      </div>
    </Modal>
  )
}

export default ConfirmModal
