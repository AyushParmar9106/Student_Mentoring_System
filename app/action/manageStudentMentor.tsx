'use server'

import { prisma } from '@/app/lib/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import type { Prisma } from '@prisma/client'

export async function manageStudentMentor(formData: FormData) {
  const StaffID = Number(formData.get('StaffID'))
  const selectedStudentIDs = formData.getAll('StudentIDs').map(Number)
  const fromDateVal = formData.get('FromDate') as string
  const description = (formData.get('Description') as string) || ''

  try {
    // 2. Explicitly type the 'tx' parameter as Prisma.TransactionClient
    await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
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
  } catch (error: any) {
    console.error('Management Error:', error)
    if (error.code === 'P2002') {
      console.error('Unique constraint failed on the fields:', error.meta?.target)
    }
    // Optional: Add return { error: "Failed to update" } to handle UI feedback
    // throw error; // Uncomment if we want to bubble up the error to a global error boundary
  }

  revalidatePath('/studentmentor')
  redirect('/studentmentor')
}