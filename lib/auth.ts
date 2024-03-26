import NextAuth from 'next-auth'
import GitHub from 'next-auth/providers/github'
import Google from 'next-auth/providers/google'

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [GitHub, Google],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      if (isLoggedIn && nextUrl.pathname.startsWith('/login')) {
        return Response.redirect(new URL('/dashboard', nextUrl))
      }
      return isLoggedIn
    },
  },
  pages: {
    signIn: '/login',
  },
})

export async function getUser() {
  const session = await auth()
  if (session === null || session.user === undefined) {
    throw Error('You must be signed in to perform this action.')
  }

  const { user } = session
  return {
    name: user.name ?? '',
    email: user.email ?? '',
    image: user.image ?? '',
  }
}
