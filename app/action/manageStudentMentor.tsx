'use server'

import { prisma } from '@/app/lib/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { manageStudentMentorSchema } from '@/app/lib/zodSchemas'


export async function manageStudentMentor(prevState: any, formData: FormData) {
  const validatedFields = manageStudentMentorSchema.safeParse({
    StaffID: formData.get('StaffID'),
    StudentIDs: formData.getAll('StudentIDs'),
    FromDate: formData.get('FromDate'),
    Description: formData.get('Description'),
  })

  if (!validatedFields.success) {
    return {
      success: false,
      message: 'Please review the highlighted errors.',
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { StaffID, StudentIDs, FromDate, Description } = validatedFields.data
  const selectedStudentIDs = StudentIDs.map(Number)

  try {
    await prisma.$transaction(async (tx: any) => {

      await tx.studentmentor.deleteMany({
        where: { StaffID: Number(StaffID) }
      })
      if (selectedStudentIDs.length > 0) {
        await tx.studentmentor.createMany({
          data: selectedStudentIDs.map(id => ({
            StaffID: Number(StaffID),
            StudentID: id,
            FromDate: FromDate ? new Date(FromDate) : new Date(),
            Description: Description || '',
            Modified: new Date()
          }))
        })
      }
    })
  } catch (error) {
    console.error('Management Error:', error)
  }

  ; (await cookies()).set('flash', encodeURIComponent(JSON.stringify({ type: 'update', message: 'Mentoring assignments updated!' })), { path: '/' });

  revalidatePath('/studentmentor')
  redirect('/studentmentor')
}