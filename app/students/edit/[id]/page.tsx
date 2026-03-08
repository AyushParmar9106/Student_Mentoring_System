import React from 'react'
import Link from 'next/link'
import { prisma } from '@/app/lib/prisma'
import EditStudentForm from './EditStudentForm'

async function EditStudentPage({
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
          <EditStudentForm student={student} />
        </div>
      </div>
    </div>
  )
}

export default EditStudentPage
