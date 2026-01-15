import { prisma } from '@/app/lib/prisma'
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
