import { withAuth } from 'next-auth/middleware'
// TODO 使用signOut()退出后 回到登录页
export default withAuth({
  pages: {
    signIn: '/',
  },
})

export const config = {
  matcher: ['/conversations/:path*', '/users/:path*'],
}
