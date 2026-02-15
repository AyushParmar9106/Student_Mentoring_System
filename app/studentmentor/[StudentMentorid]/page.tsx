import { prisma } from '@/app/lib/prisma'
import { manageStudentMentor } from '@/app/action/manageStudentMentor'
import Link from 'next/link'
import { notFound } from 'next/navigation'

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

        <form action={manageStudentMentor} className='card-body p-4'>
          <input type='hidden' name='StaffID' value={staff.StaffID} />

          <div className='row g-4'>
            <div className='col-md-6'>
              <label className='form-label fw-bold small text-uppercase text-body-secondary'>
                Assignment Start Date
              </label>
              <input
                type='date'
                name='FromDate'
                className='form-control bg-body-tertiary border-secondary-subtle text-body'
                defaultValue={new Date().toISOString().split('T')[0]}
              />
            </div>

            <div className='col-12'>
              <label className='form-label fw-bold small text-uppercase text-body-secondary mb-3 d-block'>
                Select Students to Assign
              </label>

              {/* Scrollable list of students with checkboxes */}
              <div
                className='border border-secondary-subtle rounded-3 p-3 bg-body-tertiary'
                style={{ maxHeight: '400px', overflowY: 'auto' }}
              >
                <div className='row g-3'>
                  {allStudents.map((student: typeof allStudents[0]) => (
                    <div key={student.StudentID} className='col-md-6 col-lg-4'>
                      <div className='form-check p-2 border border-secondary-subtle rounded bg-body shadow-sm h-100 d-flex align-items-center'>
                        <input
                          className='form-check-input ms-0 me-2 shadow-none'
                          type='checkbox'
                          name='StudentIDs'
                          value={student.StudentID}
                          id={`student-${student.StudentID}`}
                          defaultChecked={assignedIds.has(student.StudentID)}
                        />
                        <label
                          className='form-check-label text-body small fw-bold mb-0'
                          htmlFor={`student-${student.StudentID}`}
                        >
                          {student.StudentName}
                          <span className='d-block text-body-secondary fw-normal smaller'>
                            {student.EnrollmentNo}
                          </span>
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className='col-12'>
              <label className='form-label fw-bold small text-uppercase text-body-secondary'>
                Internal Notes (Description)
              </label>
              <textarea
                name='Description'
                className='form-control bg-body-tertiary border-secondary-subtle text-body'
                rows={2}
                placeholder='Optional notes about this assignment group...'
              ></textarea>
            </div>

            <div className='col-12 mt-4 pt-3 border-top border-secondary-subtle d-flex gap-3'>
              <button
                type='submit'
                className='btn btn-primary px-5 py-2 rounded-pill fw-bold'
              >
                Sync Assignments
              </button>
              <Link
                href={`/staff/${staff.StaffID}`}
                className='btn btn-outline-secondary px-4 py-2 rounded-pill fw-bold'
              >
                Cancel
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
