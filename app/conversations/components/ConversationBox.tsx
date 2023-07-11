'use client'

import Avatar from '@/app/components/Avatar'
import AvatarGroup from '@/app/components/AvatarGroup'
import useOtherUser from '@/app/hook/useOtherUser'
import { FullConversationType } from '@/app/types'
import clsx from 'clsx'
import { format } from 'date-fns'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { FC, useCallback, useMemo } from 'react'

interface ConversationBoxProps {
  data: FullConversationType
  selected?: boolean
}

const ConversationBox: FC<ConversationBoxProps> = ({ data, selected }) => {
  const otherUser = useOtherUser(data)

  const session = useSession()
  const router = useRouter()

  const handleClick = useCallback(
    () => router.push(`/conversations/${data.id}`),
    [data.id, router]
  )

  // TODO  ?
  const lastMessage = useMemo(() => {
    const messages = data.messages || []
    return messages[messages.length - 1]
  }, [data.messages])
  const userEmail = useMemo(() => {
    return session.data?.user?.email
  }, [session.data?.user?.email])

  const hasSeen = useMemo(() => {
    if (!lastMessage) return false
    const seenArray = lastMessage.seen || []
    if (!userEmail) return false
    return seenArray.filter((user) => user.email === userEmail).length !== 0
  }, [userEmail, lastMessage])

  const lastMessageText = useMemo(() => {
    if (lastMessage?.image) return '发送图片'

    if (lastMessage?.body) return lastMessage.body
    return '开始聊天'
  }, [lastMessage])

  return (
    <div
      onClick={handleClick}
      className={clsx(
        `
        w-full relative mt-2 py-2
        flex items-center space-x-2 round-lg
        transition cursor-pointer
  `,
        selected ? ' bg-neutral-100' : 'bg-white'
      )}
    >
      {data.isGroup ? (
        <AvatarGroup users={data.users} />
      ) : (
        <Avatar user={otherUser} />
      )}
      <div className=" min-w-0 flex-1">
        <div className=" focus:outline-none">
          <div className=" flex justify-between items-center mb-1">
            <p className="text-md font-mono text-gray-900">
              {data.name || otherUser.name}
            </p>
            {lastMessage?.createdAt && (
              <p>{format(new Date(lastMessage.createdAt), 'p')}</p>
            )}
          </div>
          <p
            className={clsx(
              ` truncate text-sm`,
              hasSeen ? 'text-gray-500' : 'text-black font-medium'
            )}
          >
            {lastMessageText}
          </p>
        </div>
      </div>
    </div>
  )
}
export default ConversationBox
