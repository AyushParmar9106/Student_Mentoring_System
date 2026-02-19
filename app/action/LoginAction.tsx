'use server'
import { prisma } from '@/app/lib/prisma'
import { redirect } from 'next/navigation'
import { login } from '@/app/lib/auth'

export async function LoginAction(prevState: any, formData: FormData) {
  const role = formData.get('role')
  const username = (formData.get('username') as string)?.trim()
  const password = (formData.get('password') as string)?.trim()

  console.log('--- Login Attempt ---')
  console.log('Role:', role)
  console.log('Username Typed:', `"${username}"`)

  try {
    if (role === 'Student') {
      // Updated Logic: Check EnrollmentNo OR EmailAddress OR MobileNo
      const user = await prisma.students.findFirst({
        where: {
          OR: [
            { EnrollmentNo: username },
            { EmailAddress: username },
            { MobileNo: username }
          ],
          Password: password
        }
      })

      if (!user) {
        console.log('Result: Student not found in database.')
        return {
          error: 'Invalid Credentials. Check Enrollment No, Email, or Mobile.'
        }
      }

      console.log('Result: Success! Redirecting Student ID:', user.StudentID)

      // Create Session
      await login({ id: user.StudentID, role: 'Student', name: user.StudentName })

      redirect(`/students/${user.StudentID}`)
    } else if (role === 'Staff') {
      // Admin Hardcoded Check
      if (username === 'ayush9106@gmail.com' && password === 'ayush9106') {
        console.log('Result: Admin Success! Redirecting to root.')

        // Create Admin Session
        await login({ id: 'admin', role: 'Admin', name: 'Ayush Parmar', isAdmin: true })

        redirect('/')
      }

      // Mentor/Staff Check
      const user = await prisma.staff.findFirst({
        where: {
          OR: [{ EmailAddress: username }, { MobileNo: username }],
          Password: password
        }
      })

      if (!user) {
        console.log('Result: Staff not found in database.')
        return { error: 'Invalid Email/Mobile or Password.' }
      }

      console.log('Result: Success! Redirecting Staff ID:', user.StaffID)

      // Create Staff Session
      await login({ id: user.StaffID, role: 'Staff', name: user.StaffName })

      redirect(`/staff/${user.StaffID}`)
    }
  } catch (error: any) {
    if (error.message === 'NEXT_REDIRECT') {
      throw error
    }
    console.error('Database Error:', error)
    return { error: 'A database error occurred. Please try again later.' }
  }

  return { error: 'Please select a role and fill all fields.' }
}
