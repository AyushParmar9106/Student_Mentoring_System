'use server'

import { prisma } from '@/app/lib/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { editStaffSchema } from '@/app/lib/zodSchemas'

async function editStaff(prevState: any, formData: FormData) {
  const validatedFields = editStaffSchema.safeParse({
    StaffID: formData.get('StaffID'),
    StaffName: formData.get('StaffName'),
    MobileNo: formData.get('MobileNo'),
    EmailAddress: formData.get('EmailAddress'),
    Password: formData.get('Password'),
    Description: formData.get('Description'),
  })

  if (!validatedFields.success) {
    return {
      success: false,
      message: 'Please review the highlighted errors.',
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { StaffID, StaffName, MobileNo, EmailAddress, Password, Description } = validatedFields.data

  const saveObj = {
    StaffName,
    MobileNo: MobileNo || '',
    EmailAddress,
    Password: Password || '',
    Description: Description || ''
  }

  await prisma.staff.update({
    where: {
      StaffID: Number(StaffID)
    },
    data: saveObj
  })

    // Clear the cache for the staff list and redirect
    ; (await cookies()).set('flash', encodeURIComponent(JSON.stringify({ type: 'update', message: 'Staff profile updated!' })), { path: '/' });

  revalidatePath('/staff')
  redirect('/staff')
}

export { editStaff }
