'use server'

import { prisma } from '../lib/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { studentSchema } from '@/app/lib/zodSchemas'

export async function saveStudent(prevState: any, formData: FormData) {
  const validatedFields = studentSchema.safeParse({
    EnrollmentNo: formData.get('EnrollmentNo'),
    Password: formData.get('Password'),
    StudentName: formData.get('StudentName'),
    MobileNo: formData.get('MobileNo'),
    EmailAddress: formData.get('EmailAddress'),
    Description: formData.get('Description'),
    StaffID: formData.get('StaffID'),
  })

  if (!validatedFields.success) {
    return {
      success: false,
      message: 'Please fill all required fields correctly.',
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const {
    EnrollmentNo: enrollmentNo,
    Password: password,
    StudentName: studentName,
    MobileNo: mobileNo,
    EmailAddress: emailAddress,
    Description: description,
    StaffID: staffId,
  } = validatedFields.data

  try {
    await prisma.students.create({
      data: {
        EnrollmentNo: enrollmentNo,
        Password: password || '',
        StudentName: studentName,
        MobileNo: mobileNo || '',
        EmailAddress: emailAddress || '',
        Description: description || '',
        // This automatically creates the record in the 'studentmentor' table
        studentmentor: staffId ? {
          create: {
            StaffID: parseInt(staffId),
            FromDate: new Date()
          }
        } : undefined
      }
    })
  } catch (error: any) {
    console.error('Prisma Error:', error)
    return {
      success: false,
      message:
        'Error: Could not register student. Make sure the Enrollment No is unique.'
    }
  }

  revalidatePath('/students')
  redirect('/students')
}
