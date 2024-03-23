'use server'

import prisma from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const createWorkSchema = z.object({
  name: z.string(),
  cover: z.string().url().startsWith('https://'),
  like: z.coerce.number().min(1).max(5),
  comment: z.string(),
  link: z.string().url().startsWith('https://').or(z.string().length(0)),
})

export async function createWork(formData: FormData) {
  const validatedFields = createWorkSchema.safeParse(
    Object.fromEntries(formData)
  )
  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors }
  }
  await prisma.work.create({ data: validatedFields.data })
  revalidatePath('/dashboard')
}
