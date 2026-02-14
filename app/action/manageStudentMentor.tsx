'use server'

import { prisma } from '@/app/lib/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function manageStudentMentor (formData: FormData) {
  const StaffID = Number(formData.get('StaffID'))
  // Get all checked values from the checkbox list
  const selectedStudentIDs = formData.getAll('StudentIDs').map(Number)
  const fromDateVal = formData.get('FromDate') as string
  const description = (formData.get('Description') as string) || ''

  try {
    // Transaction ensures the sync is atomic
    await prisma.$transaction(async tx => {
      // 1. Remove all existing assignments for this mentor
      await tx.studentmentor.deleteMany({
        where: { StaffID: StaffID }
      })

      // 2. Add only the students currently checked in the form
      if (selectedStudentIDs.length > 0) {
        await tx.studentmentor.createMany({
          data: selectedStudentIDs.map(id => ({
            StaffID: StaffID,
            StudentID: id,
            FromDate: fromDateVal ? new Date(fromDateVal) : new Date(),
            Description: description,
            Modified: new Date()
          }))
        })
      }
    })
  } catch (error) {
    console.error('Management Error:', error)
  }

  revalidatePath('/studentmentor')
  redirect('/studentmentor')
}
