import React from 'react'
import { prisma } from '@/app/lib/prisma'
import Link from 'next/link'
import DeleteBtn from '@/app/ui/DeleteBtn'
import DeleteStudentMentor from '@/app/action/DeleteStudentMentor'

export const dynamic = 'force-dynamic'

async function StudentMentor() {
  // Fetching Staff (Mentors) with their assigned students
  const mentorsWithStudents = await prisma.staff.findMany({
    include: {
      studentmentor: {
        include: {
          students: true
        }
      }
    },
    // Only show mentors who actually have assigned students
    where: {
      studentmentor: {
        some: {}
      }
    },
    orderBy: { StaffName: 'asc' }
  })

  return (
    <div className='container py-5'>
      <div className='text-center mb-5'>
        <h2 className='fw-bold text-body'>Mentoring Assignments</h2>
        <p className='text-body-secondary'>
          Active relationships between Faculty and Students
        </p>

        <Link
          href='/studentmentor/add'
          className='btn btn-success rounded-pill px-4 fw-bold shadow-sm mt-2'
        >
          <i className='bi bi-plus-lg me-2'></i> New Assignment
        </Link>
      </div>

      <div className='row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4'>
        {mentorsWithStudents.map(mentor => (
          <div className='col' key={mentor.StaffID}>
            <div className='card h-100 shadow-sm border-0 border-top border-4 border-info bg-body rounded-4'>
              <div className='card-header bg-transparent py-3 border-0'>
                <div className='d-flex align-items-center mb-1'>
                  <div className='bg-info bg-opacity-10 p-2 rounded-circle me-3 text-info'>
                    <i className='bi bi-person-badge-fill fs-5'></i>
                  </div>
                  <div>
                    <h6 className='card-title mb-0 fw-bold text-body'>
                      {mentor.StaffName}
                    </h6>
                    <small
                      className='text-info fw-bold text-uppercase'
                      style={{ fontSize: '0.65rem' }}
                    >
                      Lead Mentor
                    </small>
                  </div>
                </div>
              </div>

              <div className='card-body pt-0'>
                <div className='d-flex justify-content-between align-items-center mb-3 bg-body-tertiary p-2 rounded-3 border border-secondary-subtle'>
                  <span className='small fw-bold text-body-secondary'>
                    Assigned Mentees
                  </span>
                  <span className='badge bg-info rounded-pill'>
                    {mentor.studentmentor.length}
                  </span>
                </div>

                {/* Scrollable list of students belonging to this mentor */}
                <div
                  className='pe-2'
                  style={{ maxHeight: '250px', overflowY: 'auto' }}
                >
                  {mentor.studentmentor.map(assignment => (
                    <div
                      key={assignment.StudentMentorID}
                      className='p-2 mb-2 rounded bg-body-tertiary border border-secondary-subtle position-relative'
                    >
                      <div className='d-flex justify-content-between align-items-start'>
                        <div>
                          <div className='fw-bold text-body small'>
                            {assignment.students?.StudentName}
                          </div>
                          <div
                            className='text-muted'
                            style={{ fontSize: '0.7rem' }}
                          >
                            ID: {assignment.students?.EnrollmentNo}
                          </div>
                        </div>
                        <DeleteBtn
                          deleteFn={DeleteStudentMentor}
                          id={assignment.StudentMentorID}
                        />
                      </div>

                      <hr className='my-2 opacity-10' />

                      <div
                        className='d-flex justify-content-between'
                        style={{ fontSize: '0.65rem' }}
                      >
                        <span className='text-body-secondary'>
                          <i className='bi bi-calendar-event me-1'></i>
                          {assignment.FromDate?.toLocaleDateString('en-GB')}
                        </span>
                        {assignment.ToDate ? (
                          <span className='text-danger'>
                            Ends:{' '}
                            {assignment.ToDate.toLocaleDateString('en-GB')}
                          </span>
                        ) : (
                          <span className='text-success fw-bold'>
                            Active Now
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className='card-footer bg-transparent border-0 p-3'>
                <Link
                  href={`/studentmentor/edit/${mentor.StaffID}`}
                  className='btn btn-sm btn-outline-info w-100 rounded-pill fw-bold'
                >
                  <i className='bi bi-gear-fill me-2'></i>Manage Caseload
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className='mt-5 pt-4 border-top border-secondary-subtle text-center'>
        <Link
          href='/'
          className='btn btn-outline-secondary rounded-pill px-4 fw-bold'
        >
          <i className='bi bi-house-door me-2'></i>Back to Home
        </Link>
      </div>
    </div>
  )
}

export default StudentMentor
