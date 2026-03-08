import { prisma } from '@/app/lib/prisma'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import ManageStudentMentorForm from './ManageStudentMentorForm'

export default async function ManageAssignments({
  params
}: {
  params: Promise<{ staffid: string }>
}) {
  const { staffid } = await params
  const sId = Number(staffid)

  if (isNaN(sId)) return notFound()

  // Fetch staff, all students, and current assignments
  const [staff, allStudents, currentAssignments] = await Promise.all([
    prisma.staff.findUnique({ where: { StaffID: sId } }),
    prisma.students.findMany({ orderBy: { StudentName: 'asc' } }),
    prisma.studentmentor.findMany({ where: { StaffID: sId } })
  ])

  if (!staff) return notFound()

  // Create a Set of IDs for quick lookup to "pre-check" checkboxes
  const assignedIds = new Set(currentAssignments.map((a: typeof currentAssignments[0]) => a.StudentID))

  return (
    <div className='container py-5'>
      <div className='card shadow-sm border-0 rounded-4 bg-body border border-secondary-subtle overflow-hidden'>
        <div className='card-header bg-dark text-white py-3'>
          <h5 className='mb-0 fw-bold'>Manage Mentees for {staff.StaffName}</h5>
        </div>

        <ManageStudentMentorForm staff={staff} allStudents={allStudents} assignedIds={assignedIds} />
      </div>
    </div>
  )
}
