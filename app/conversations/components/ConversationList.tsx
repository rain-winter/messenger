'use client'
import GroupChatModal from '@/app/components/modals/GroupChatModal'
import useConversation from '@/app/hook/useConversation'
import { FullConversationType } from '@/app/types'
import { User } from '@prisma/client'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import { FC, useState } from 'react'
import { MdOutlineGroupAdd } from 'react-icons/md'
import ConversationBox from './ConversationBox'

interface ConversationListProps {
  initialItems: FullConversationType[]
  users: User[]
  title?: string
}

const ConversationList: FC<ConversationListProps> = ({
  users,
  initialItems,
}) => {
  const [items, setItems] = useState(initialItems)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const router = useRouter()
  const { conversationId, isOpen } = useConversation()

  return (
    <>
      <GroupChatModal
        users={users}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <aside
        className={clsx(
          `
        fixed 
        inset-y-0 
        pb-20
        lg:pb-0
        lg:left-20 
        lg:w-80 
        lg:block
        overflow-y-auto 
        border-r 
        border-gray-200 
      `,
          isOpen ? 'hidden' : 'block w-full left-0'
        )}
      >
        <div className="px-5">
          <div className="flex justify-between mb-4 pt-4">
            <div className=" text-2xl text-bold text-neutral-800">消息</div>
            <div
              onClick={() => setIsModalOpen(true)}
              className=" rounded-md p-2 bg-gray-200 cursor-pointer hover:opacity-75"
            >
              <MdOutlineGroupAdd size={20} />
            </div>
          </div>
          {items.map((item) => (
            <ConversationBox
              key={item.id}
              data={item}
              selected={conversationId === item.id}
            />
          ))}
        </div>
      </aside>
    </>
  )
}
export default ConversationList
