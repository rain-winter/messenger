'use client'
import Avatar from '@/app/components/Avatar'
import AvatarGroup from '@/app/components/AvatarGroup'
import useOtherUser from '@/app/hook/useOtherUser'
import { Conversation, User } from '@prisma/client'
import Link from 'next/link'
import { FC, useMemo, useState } from 'react'
import { HiChevronLeft } from 'react-icons/hi'
import { HiEllipsisHorizontal } from 'react-icons/hi2'
import ProfileDrawer from './ProfileDrawer'

interface HeaderProps {
  conversation: Conversation & {
    users: User[]                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
  }
}
const Header: FC<HeaderProps> = ({ conversation }) => {
  const otherUser = useOtherUser(conversation)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const statusText = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.users.length}人`
    }
    return 'Active'
  }, [conversation])

  return (
    <>
      <ProfileDrawer
        onClose={() => setDrawerOpen(false)}
        data={conversation}
        isOpen={drawerOpen}
      />

      <div
        className=" bg-white w-full flex border-b-[1px] sm:px-4
         lg:px-6 justify-between items-center shadow-sm"
      >
        <div className=" flex gap-3 items-center">
          <Link
            className=" lg:hidden block
            hover:text-sky-800 transition cursor-pointer
            text-sky-500"
            href="/conversations"
          >
            <HiChevronLeft size={20} />
          </Link>
          {
            conversation.isGroup ? (
              <AvatarGroup users={conversation.users} />
            ):(
              <Avatar user={otherUser} />
            )
          }
          
          <div className="flex flex-col">
            <div>{conversation.name || otherUser.name}</div>
            <div className=" text-sm font-light text-neutral-50">
              {statusText}
            </div>
          </div>
        </div>
        <HiEllipsisHorizontal
          onClick={() => setDrawerOpen(true)}
          size={32}
          className="
        text-sky-500 cursor-pointer hover:text-sky-600 transition "
        />
      </div>
    </>
  )
}

export default Header
