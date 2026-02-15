<<<<<<< HEAD
import { prisma } from '../../lib/prisma'
=======
import { prisma } from '@/app/lib/prisma'
>>>>>>> d282a3810cbf7cbc9068d4230e349a3be90eecd7
import AddStudentForm from '@/app/students/[studentid]/AddStudentForm'

export default async function Page () {
  // Fetch mentors from the 'staff' table
  const staffMembers = await prisma.staff.findMany({
    select: {
      StaffID: true,
      StaffName: true
    },
    orderBy: {
      StaffName: 'asc'
    }
  })

  return (
    <main>
      {/* Render the separate client form component */}
      <AddStudentForm staffList={staffMembers} />
    </main>
  )
}
