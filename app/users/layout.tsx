// TODO layout

import getUsers from '../actions/getUser'
import SideBar from '../components/sidebar/SideBar'
import UserList from './components/UserList'

// 会直接作用users下面的tsx
export default async function UsersLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const users = await getUsers()
  
  return (
    // TODO Server Component
    <SideBar>
      <div className=" h-full">
        <UserList items={users} />
        {children}
      </div>
    </SideBar>
  )
}
