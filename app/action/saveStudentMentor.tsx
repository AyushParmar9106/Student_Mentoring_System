'use server'

import { prisma } from '@/app/lib/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { assignMentorSchema } from '@/app/lib/zodSchemas'

export async function saveAssignment(prevState: any, formData: FormData) {
  const validatedFields = assignMentorSchema.safeParse({
    StaffID: formData.get('StaffID'),
    StudentIDs: formData.getAll('StudentIDs'),
    FromDate: formData.get('FromDate'),
    ToDate: formData.get('ToDate'),
    Description: formData.get('Description'),
  })

  if (!validatedFields.success) {
    return {
      success: false,
      message: 'Please review the highlighted errors.',
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { StaffID, StudentIDs, FromDate, ToDate, Description } = validatedFields.data

  try {
    // We use a transaction to ensure all assignments are saved correctly
    await prisma.$transaction(
      StudentIDs.map(id =>
        prisma.studentmentor.create({
          data: {
            StudentID: parseInt(id),
            StaffID: parseInt(StaffID),
            FromDate: new Date(FromDate),
            ToDate: ToDate ? new Date(ToDate) : null,
            Description: Description || ''
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
