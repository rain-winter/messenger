'use client'

import useConversation from '@/app/hook/useConversation'
import { pusherClient } from '@/app/libs/pusher'
import { FullMessageType } from '@/app/types'
import axios from 'axios'
import { find } from 'lodash'
import { FC, useEffect, useRef, useState } from 'react'
import MessageBox from './MessageBox'

interface BodyProps {
  initialMessages: FullMessageType[]
}

const Body: FC<BodyProps> = ({ initialMessages }) => {
  const [messages, setMessages] = useState(initialMessages)

  const bottomRef = useRef<HTMLDivElement>(null)

  const { conversationId } = useConversation()
  useEffect(() => {
    axios.post(`/api/conversations/${conversationId}/seen`)
  }, [conversationId])

  useEffect(() => {
    pusherClient.subscribe(conversationId)
    bottomRef?.current?.scrollIntoView()

    const messageHandle = (message: FullMessageType) => {
      setMessages((current) => {
        if (find(current, { id: message.id })) {
          return current
        }
        return [...current, message]
      })
      bottomRef?.current?.scrollIntoView()
    }
    // 绑定
    pusherClient.bind('messages:new', messageHandle)
    // 卸载
    return () => {
      pusherClient.unsubscribe(conversationId)
      pusherClient.unbind('messages:new', messageHandle)
    }
  }, [conversationId])

  return (
    <div className="flex-1 overflow-y-auto ">
      {messages.map((message, i) => (
        <MessageBox
          isLast={i === messages.length - 1}
          key={message.id}
          data={message}
        />
      ))}
      <div ref={bottomRef} className=" pt-24" />
    </div>
  )
}
export default Body
