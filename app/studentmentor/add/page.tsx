import { prisma } from '@/app/lib/prisma'
import AddStudentMentorForm from '../[StudentMentorid]/AddStudentMentorForm'

export default async function Page() {
  const [students, staff] = await Promise.all([
    prisma.students.findMany({
      select: { StudentID: true, StudentName: true },
      orderBy: { StudentName: 'asc' }
    }),
    prisma.staff.findMany({
      select: { StaffID: true, StaffName: true },
      orderBy: { StaffName: 'asc' }
    })
  ])

  return (
    <main className='py-4'>
      <AddStudentMentorForm studentList={students} staffList={staff} />
    </main>
  )
}
