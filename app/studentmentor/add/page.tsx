<<<<<<< HEAD
import { prisma } from '../../lib/prisma'
=======
import { prisma } from '@/app/lib/prisma'
>>>>>>> d282a3810cbf7cbc9068d4230e349a3be90eecd7
import AddStudentMentorForm from '../[StudentMentorid]/AddStudentMentorForm'

export default async function Page () {
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
