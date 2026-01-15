'use server'
import { prisma } from '@/app/lib/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export default async function DeleteStudentMentoring (id: number) {
  await prisma.studentmentoring.delete({
    where: { StudentMentoringID: id }
  })
  revalidatePath('/studentmentoring')
  redirect('/studentmentoring')
}
