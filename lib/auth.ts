import NextAuth from 'next-auth'
import GitHub from 'next-auth/providers/github'
import Google from 'next-auth/providers/google'
import prisma from './db'

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

  const {
    name,
    email,
    image: avatar,
  } = session.user as {
    name: string
    email: string
    image: string
  }

  const user = await prisma.user.findUnique({ where: { email } })
  if (user === null) {
    return prisma.user.create({ data: { name, email, avatar } })
  }
  return user
}
