'use server'

import { prisma } from '@/app/lib/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function editStudent (formData: FormData) {
  // Extract the ID from the form and convert to number
  const studentId = Number(formData.get('StudentID'))

  const saveObj = {
    StudentName: formData.get('StudentName') as string,
    EnrollmentNo: formData.get('EnrollmentNo') as string,
    Password: formData.get('Password') as string,
    MobileNo: formData.get('MobileNo') as string,
    EmailAddress: formData.get('EmailAddress') as string,
    Description: formData.get('Description') as string
  }

  await prisma.students.update({
    where: {
      StudentID: studentId
    },
    data: saveObj
  })

  // Clear the cache for the student list and redirect
  revalidatePath('/students')
  redirect('/students')
}
