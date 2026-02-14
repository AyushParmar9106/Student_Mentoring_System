'use server'

import { prisma } from '@/app/lib/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function editStudentMentor (formData: FormData) {
  const StudentMentorID = Number(formData.get('StudentMentorID'))

  // Safely handle dates to satisfy Prisma's strict update types
  const fromDateVal = formData.get('FromDate') as string
  const toDateVal = formData.get('ToDate') as string

  const saveObj = {
    StudentID: Number(formData.get('StudentID')),
    StaffID: Number(formData.get('StaffID')),
    // Ensure we provide a valid Date object or null
    FromDate: fromDateVal ? new Date(fromDateVal) : new Date(),
    ToDate: toDateVal ? new Date(toDateVal) : null,
    Description: (formData.get('Description') as string) || '',
    Modified: new Date()
  }

  try {
    await prisma.studentmentor.update({
      where: { StudentMentorID: StudentMentorID },
      data: saveObj
    })
  } catch (error) {
    console.error('Database Update Error:', error)
    // In a real app, you might return an error message here
  }

  revalidatePath('/studentmentor')
  redirect('/studentmentor')
}
