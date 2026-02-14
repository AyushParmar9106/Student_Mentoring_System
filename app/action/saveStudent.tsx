'use server'

import { prisma } from '../lib/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function saveStudent (prevState: any, formData: FormData) {
  const enrollmentNo = formData.get('EnrollmentNo') as string
  const password = formData.get('Password') as string
  const studentName = formData.get('StudentName') as string
  const mobileNo = formData.get('MobileNo') as string
  const emailAddress = formData.get('EmailAddress') as string
  const description = formData.get('Description') as string
  const staffId = formData.get('StaffID') as string

  try {
    await prisma.students.create({
      data: {
        EnrollmentNo: enrollmentNo,
        Password: password,
        StudentName: studentName,
        MobileNo: mobileNo,
        EmailAddress: emailAddress,
        Description: description,
        // This automatically creates the record in the 'studentmentor' table
        studentmentor: {
          create: {
            StaffID: parseInt(staffId),
            FromDate: new Date()
          }
        }
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
