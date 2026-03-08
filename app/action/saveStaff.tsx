'use server'

import { prisma } from '@/app/lib/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { staffSchema } from '@/app/lib/zodSchemas'

export async function saveStaff(prevState: any, formData: FormData) {
  const validatedFields = staffSchema.safeParse({
    StaffName: formData.get('StaffName'),
    EmailAddress: formData.get('EmailAddress'),
    Password: formData.get('Password'),
    MobileNo: formData.get('MobileNo'),
    Description: formData.get('Description'),
  })

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Please correct the errors in the form.',
    }
  }

  const { StaffName, EmailAddress, Password, MobileNo, Description } = validatedFields.data


  try {
    await prisma.staff.create({
      data: {
        StaffName,
        EmailAddress,
        Password: Password || '', // Reminder: Hash this in production!
        MobileNo: MobileNo || '',
        Description: Description || ''
      }
    })
  } catch (error) {
    return { success: false, message: 'Database error: Could not save staff.' }
  }

  revalidatePath('/staff')
  redirect('/staff')
}
