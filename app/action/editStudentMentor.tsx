'use server'

import { prisma } from '@/app/lib/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { editStudentMentorSchema } from '@/app/lib/zodSchemas'

export async function editStudentMentor(prevState: any, formData: FormData) {
  const validatedFields = editStudentMentorSchema.safeParse({
    StudentMentorID: formData.get('StudentMentorID'),
    StudentID: formData.get('StudentID'),
    StaffID: formData.get('StaffID'),
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

  const { StudentMentorID, StudentID, StaffID, FromDate, ToDate, Description } = validatedFields.data

  const saveObj = {
    StudentID: Number(StudentID),
    StaffID: Number(StaffID),
    FromDate: FromDate ? new Date(FromDate) : new Date(),
    ToDate: ToDate ? new Date(ToDate) : null,
    Description: Description || '',
    Modified: new Date()
  }

  try {
    await prisma.studentmentor.update({
      where: { StudentMentorID: Number(StudentMentorID) },
      data: saveObj
    })
  } catch (error) {
    console.error('Database Update Error:', error)
    // In a real app, you might return an error message here
  }

  // Clear the cache for the assignment list and redirect
  ; (await cookies()).set('flash', encodeURIComponent(JSON.stringify({ type: 'update', message: 'Mentoring assignment updated!' })), { path: '/' });

  revalidatePath('/studentmentor')
  redirect('/studentmentor')
}
