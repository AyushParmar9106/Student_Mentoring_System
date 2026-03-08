'use server'

import { prisma } from '@/app/lib/prisma'
import { redirect } from 'next/navigation'
import { forgotPasswordSchema } from '@/app/lib/zodSchemas'

export async function forgotPassword(prevState: any, formData: FormData) {
    const validatedFields = forgotPasswordSchema.safeParse({
        role: formData.get('role'),
        identifier: formData.get('identifier'),
        newPassword: formData.get('newPassword'),
    })

    if (!validatedFields.success) {
        return {
            error: 'Please fix the errors below.',
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    const { role, identifier, newPassword } = validatedFields.data

    try {
        if (role === 'Student') {
            // Find Student by EnrollmentNo, Email, Mobile, or Name
            const student = await prisma.students.findFirst({
                where: {
                    OR: [
                        { EnrollmentNo: identifier },
                        { EmailAddress: identifier },
                        { MobileNo: identifier },
                        { StudentName: identifier }
                    ]
                }
            })

            if (!student) {
                return { error: 'Student record not found with this identifier.' }
            }

            // Update Password
            await prisma.students.update({
                where: { StudentID: student.StudentID },
                data: { Password: newPassword }
            })

        } else if (role === 'Staff') {
            // Find Staff/Admin by Email, Mobile, or Name
            const staff = await prisma.staff.findFirst({
                where: {
                    OR: [
                        { EmailAddress: identifier },
                        { MobileNo: identifier },
                        { StaffName: identifier }
                    ]
                }
            })

            if (!staff) {
                return { error: 'Staff record not found with this identifier.' }
            }

            // Update Password
            await prisma.staff.update({
                where: { StaffID: staff.StaffID },
                data: { Password: newPassword }
            })
        } else {
            return { error: 'Invalid User Role selected.' }
        }

    } catch (error) {
        console.error('Forgot Password Error:', error)
        return { error: 'Database error occurred. Please try again.' }
    }

    // If successful, redirect to login
    redirect('/Login?message=PasswordUpdated')
}
