'use server'

import prisma from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { auth, signIn } from './auth'

const createWorkSchema = z.object({
  name: z.string().min(1),
  cover: z.string().url().startsWith('https://'),
  like: z.coerce.number().min(1).max(5),
  comment: z.string(),
  link: z.string().url().startsWith('https://').or(z.string().length(0)),
})

export async function createWork(formData: FormData) {
  const session = await auth()
  if (!session?.user) {
    throw Error('You must be signed in to perform this action.')
  }

  const validatedFields = createWorkSchema.safeParse(
    Object.fromEntries(formData)
  )
  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors }
  }
  await prisma.work.create({ data: validatedFields.data })
  revalidatePath('/dashboard')
}

export async function deleteWork(id: string) {
  const session = await auth()
  if (!session?.user) {
    throw Error('You must be signed in to perform this action.')
  }

  await prisma.work.deleteMany({ where: { id } })
  revalidatePath('/dashboard')
}

const loginSchema = z.object({
  provider: z.enum(['github']),
})

export async function login(formData: FormData) {
  const validatedFields = loginSchema.safeParse(Object.fromEntries(formData))
  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors }
  }
  await signIn(validatedFields.data.provider)
}
