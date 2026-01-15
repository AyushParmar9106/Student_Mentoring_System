'use server'

import { prisma } from '@/app/lib/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function saveStaff (prevState: any, formData: FormData) {
  const StaffName = formData.get('StaffName') as string
  const EmailAddress = formData.get('EmailAddress') as string
  const Password = formData.get('Password') as string
  const MobileNo = formData.get('MobileNo') as string
  const Description = formData.get('Description') as string

  try {
    await prisma.staff.create({
      data: {
        StaffName,
        EmailAddress,
        Password, // Reminder: Hash this in production!
        MobileNo,
        Description
      }
    })
  } catch (error) {
    return { success: false, message: 'Database error: Could not save staff.' }
  }

  revalidatePath('/staff')
  redirect('/staff')
}
