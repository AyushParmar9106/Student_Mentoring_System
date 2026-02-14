'use server'

import { prisma } from '@/app/lib/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

async function editStaff (formData: FormData) {
  // Extract the ID from the form and convert to number
  const StaffID = Number(formData.get('StaffID'))

  const saveObj = {
    StaffName: formData.get('StaffName') as string,
    MobileNo: formData.get('MobileNo') as string,
    EmailAddress: formData.get('EmailAddress') as string,
    Password: formData.get('Password') as string,
    Description: formData.get('Description') as string
  }

  await prisma.staff.update({
    where: {
      StaffID: StaffID
    },
    data: saveObj
  })

  // Clear the cache for the staff list and redirect
  revalidatePath('/staff')
  redirect('/staff')
}

export { editStaff }
