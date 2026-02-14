'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { prisma } from '../lib/prisma'

export default async function DeleteStaff (staffid: number) {
  await prisma.staff.delete({
    where: { StaffID: staffid }
  })
  revalidatePath('/staff')
  redirect('/staff')
}
