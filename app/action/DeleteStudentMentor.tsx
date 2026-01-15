'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from '../lib/prisma'

export default async function DeleteStudentMentor (assignmentId: number) {
  try {
    await prisma.studentmentor.delete({
      where: {
        StudentMentorID: assignmentId
      }
    })

    revalidatePath('/students')
    revalidatePath('/staff')

    return { success: true }
  } catch (error) {
    console.error('Delete Error:', error)
    return { success: false, message: 'Failed to remove the assignment.' }
  }
}
