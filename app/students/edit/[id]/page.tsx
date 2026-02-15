import { editStudent } from '@/app/action/editStudent'
<<<<<<< HEAD
import React from 'react'
import Link from 'next/link'
import { prisma } from '@/app/lib/prisma'
=======
import { prisma } from '@/app/lib/prisma'
import React from 'react'
import Link from 'next/link'
>>>>>>> d282a3810cbf7cbc9068d4230e349a3be90eecd7

async function EditStudentPage ({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const studentId = parseInt(id)

  const student = await prisma.students.findUnique({
    where: { StudentID: studentId }
  })

  if (!student) {
    return (
      <div className='d-flex align-items-center justify-content-center min-vh-100 bg-body'>
        <div className='card shadow p-4 text-center'>
          <h4 className='text-danger'>Student not found</h4>
          <Link href='/students' className='btn btn-link mt-3'>
            Return to Student List
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className='container py-5' data-bs-theme='auto'>
      {/* Header */}
      <div className='d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4'>
        <div>
          <h2 className='fw-bold'>Edit Student</h2>
          <p className='text-secondary mb-0'>
            Updating profile for{' '}
            <span className='fw-semibold text-primary'>
              {student.StudentName}
            </span>
          </p>
        </div>
        <Link
          href='/students'
          className='btn btn-outline-secondary mt-3 mt-md-0'
        >
          ← Back to Directory
        </Link>
      </div>

      {/* Form Card */}
      <div className='card shadow-lg border-0 rounded-4'>
        <div className='card-body p-4 p-md-5'>
          <form action={editStudent}>
            <input type='hidden' name='StudentID' value={student.StudentID} />

            <div className='row g-4'>
              {/* Academic Info */}
              <div className='col-md-6'>
                <h5 className='border-bottom pb-2 mb-3'>
                  Academic Information
                </h5>

                <div className='mb-3'>
                  <label className='form-label'>Full Name</label>
                  <input
                    type='text'
                    name='StudentName'
                    defaultValue={student.StudentName ?? ''}
                    className='form-control'
                    required
                  />
                </div>

                <div className='mb-3'>
                  <label className='form-label'>Enrollment Number</label>
                  <input
                    type='text'
                    name='EnrollmentNo'
                    defaultValue={student.EnrollmentNo ?? ''}
                    className='form-control'
                  />
                </div>

                <div className='mb-3'>
                  <label className='form-label'>Password</label>
                  <input
                    type='password'
                    name='Password'
                    defaultValue={student.Password ?? ''}
                    className='form-control'
                  />
                </div>
              </div>

              {/* Contact Info */}
              <div className='col-md-6'>
                <h5 className='border-bottom pb-2 mb-3'>Contact Details</h5>

                <div className='mb-3'>
                  <label className='form-label'>Contact Number</label>
                  <input
                    type='text'
                    name='MobileNo'
                    defaultValue={student.MobileNo ?? ''}
                    className='form-control'
                  />
                </div>

                <div className='mb-3'>
                  <label className='form-label'>Email Address</label>
                  <input
                    type='email'
                    name='EmailAddress'
                    defaultValue={student.EmailAddress ?? ''}
                    className='form-control'
                  />
                </div>

                <div className='mb-3'>
                  <label className='form-label'>Mentoring Notes</label>
                  <textarea
                    name='Description'
                    rows={3}
                    defaultValue={student.Description ?? ''}
                    className='form-control'
                  />
                </div>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className='d-flex flex-column flex-sm-row justify-content-end gap-3 pt-4 border-top mt-4'>
              <Link href='/students' className='btn btn-light'>
                Cancel
              </Link>
              <button type='submit' className='btn btn-primary px-4'>
                Update Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EditStudentPage
