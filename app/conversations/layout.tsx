import getConversations from '../actions/getConversations'
import getUsers from '../actions/getUser'
import SideBar from '../components/sidebar/SideBar'
import ConversationList from './components/ConversationList'

export default async function ConversationsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const users = await getUsers()
  const conversations = await getConversations()


  return (
    // TODO layout
    <SideBar>
      <div className="h-full">
        <ConversationList
          users={users}
          title="Messages"
          initialItems={conversations}
        />
        {children}
      </div>
    </SideBar>
  )
}
