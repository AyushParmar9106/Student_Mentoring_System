import React from 'react'
import Link from 'next/link'
import { prisma } from '../lib/prisma'
import DeleteBtn from '@/app/ui/DeleteBtn'
import DeleteStudentMentoring from '@/app/action/DeleteStudentMentoring'

async function studentmentoring () {
  const data = await prisma.studentmentoring.findMany({
    include: {
      studentmentor: { include: { staff: true, students: true } }
    },
    orderBy: { DateOfMentoring: 'desc' }
  })

  return (
    <div className='container py-5'>
      <h2 className='text-primary fw-bold mb-4'>Mentoring Session Logs</h2>
      <div className='row g-4'>
        {data.map(log => (
          <div className='col-12' key={log.StudentMentoringID}>
            <div className='card shadow-sm border-0 bg-body rounded-4'>
              <div
                className={`card-header d-flex justify-content-between ${
                  log.AttendanceStatus === 'Present'
                    ? 'bg-success-subtle text-success'
                    : 'bg-danger-subtle text-danger'
                }`}
              >
                <span className='fw-bold small'>
                  ID: #{log.StudentMentoringID}
                </span>
                <span className='badge bg-primary'>
                  Stress: {log.StressLevel}
                </span>
              </div>
              <div className='card-body'>
                <p className='mb-1 text-body'>
                  <strong>Mentor:</strong> {log.studentmentor?.staff?.StaffName}
                </p>
                <p className='mb-1 text-body'>
                  <strong>Student:</strong>{' '}
                  {log.studentmentor?.students?.StudentName}
                </p>
                <div className='p-2 bg-body-tertiary rounded small italic'>
                  "{log.IssuesDiscussed}"
                </div>
              </div>
              <div className='card-footer bg-transparent d-flex justify-content-end gap-2'>
                <Link
                  href={`/studentmentoring/edit/${log.StudentMentoringID}`}
                  className='btn btn-sm btn-outline-primary rounded-pill'
                >
                  Edit
                </Link>
                <DeleteBtn
                  deleteFn={DeleteStudentMentoring}
                  id={log.StudentMentoringID}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
export default studentmentoring