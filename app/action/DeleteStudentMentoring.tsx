'use server'
import { prisma } from '@/app/lib/prisma'
import { revalidatePath } from 'next/cache'

export default async function DeleteStudentMentoring(id: number) {
  await prisma.studentmentoring.delete({
    where: { StudentMentoringID: id }
  })

  revalidatePath('/studentmentoring')
}
