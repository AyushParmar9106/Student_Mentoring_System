'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from '../lib/prisma'

export default async function DeleteStudent(studentid: number) {
  await prisma.students.delete({
    where: { StudentID: studentid }
  })

  revalidatePath('/students')
}
