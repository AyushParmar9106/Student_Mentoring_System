'use server'

import { prisma } from '@/app/lib/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { editStudentSchema } from '@/app/lib/zodSchemas'

export async function editStudent(prevState: any, formData: FormData) {
  const validatedFields = editStudentSchema.safeParse({
    StudentID: formData.get('StudentID'),
    StudentName: formData.get('StudentName'),
    EnrollmentNo: formData.get('EnrollmentNo'),
    Password: formData.get('Password'),
    MobileNo: formData.get('MobileNo'),
    EmailAddress: formData.get('EmailAddress'),
    Description: formData.get('Description'),
  })

  if (!validatedFields.success) {
    return {
      success: false,
      message: 'Please review the highlighted errors.',
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { StudentID, StudentName, EnrollmentNo, Password, MobileNo, EmailAddress, Description } = validatedFields.data

  const saveObj = {
    StudentName,
    EnrollmentNo,
    Password: Password || '',
    MobileNo: MobileNo || '',
    EmailAddress: EmailAddress || '',
    Description: Description || ''
  }

  await prisma.students.update({
    where: {
      StudentID: Number(StudentID)
    },
    data: saveObj
  })

    // Clear the cache for the student list and redirect
    ; (await cookies()).set('flash', encodeURIComponent(JSON.stringify({ type: 'update', message: 'Student profile updated!' })), { path: '/' });

  revalidatePath('/students')
  redirect('/students')
}
