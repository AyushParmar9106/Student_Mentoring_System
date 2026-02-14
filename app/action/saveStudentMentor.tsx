'use server'

import { prisma } from '@/app/lib/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function saveAssignment (prevState: any, formData: FormData) {
  const staffId = formData.get('StaffID') as string
  const fromDate = formData.get('FromDate') as string
  const toDate = formData.get('ToDate') as string
  const description = formData.get('Description') as string

  // CRITICAL FIX: Use .getAll() to capture the array of selected IDs
  const studentIds = formData.getAll('StudentIDs') as string[]

  if (studentIds.length === 0) {
    return { success: false, message: 'Please select at least one student.' }
  }

  try {
    // We use a transaction to ensure all assignments are saved correctly
    await prisma.$transaction(
      studentIds.map(id =>
        prisma.studentmentor.create({
          data: {
            StudentID: parseInt(id),
            StaffID: parseInt(staffId),
            FromDate: new Date(fromDate),
            ToDate: toDate ? new Date(toDate) : null,
            Description: description
          }
        })
      )
    )
  } catch (error: any) {
    console.error('Bulk Assignment Error:', error)
    return {
      success: false,
      message: 'An error occurred while linking students. Please try again.'
    }
  }

  revalidatePath('/studentmentor')
  redirect('/studentmentor')
}
