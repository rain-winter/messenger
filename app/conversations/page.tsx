'use client'

import clsx from 'clsx'

import EmptyState from '../components/EmptyState'
import useConversation from '../hook/useConversation'

const Home = () => {
  const { isOpen } = useConversation()

  return (
    <div
      className={clsx(' hidden lg:pl-80 h-full lg:block', isOpen ? 'block' : 'hidden')}
    >
      <EmptyState />
    </div>
  )
}

export default Home
