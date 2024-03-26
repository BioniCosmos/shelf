'use server'

import prisma from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { getUser, signIn, signOut } from './auth'

const createWorkSchema = z.object({
  name: z.string().min(1),
  cover: z.string().url().startsWith('https://'),
  like: z.coerce.number().min(1).max(5),
  comment: z.string(),
  link: z.string().url().startsWith('https://').or(z.string().length(0)),
})

export async function createWork(formData: FormData) {
  const user = await getUser()
  const validatedFields = createWorkSchema.safeParse(
    Object.fromEntries(formData)
  )
  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors }
  }
  await prisma.work.create({
    data: { ...validatedFields.data, userEmail: user.email },
  })
  revalidatePath('/dashboard')
}

export async function deleteWork(id: string) {
  const user = await getUser()
  const filter = { where: { id } }
  if ((await prisma.work.findFirst(filter))?.userEmail !== user.email) {
    throw Error('Unauthorized')
  }

  await prisma.work.delete(filter)
  revalidatePath('/dashboard')
}

const loginSchema = z.object({
  provider: z.enum(['github', 'google']),
})

export async function login(formData: FormData) {
  const validatedFields = loginSchema.safeParse(Object.fromEntries(formData))
  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors }
  }
  await signIn(validatedFields.data.provider)
}

export async function logout() {
  await signOut()
}
