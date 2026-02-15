import React from 'react'
import Link from 'next/link'
import { prisma } from '../lib/prisma'
import DeleteBtn from '@/app/ui/DeleteBtn'
import DeleteStudentMentoring from '@/app/action/DeleteStudentMentoring'
<<<<<<< HEAD
import Search from '@/app/ui/Search'
import Pagination from '@/app/ui/Pagination'

export const dynamic = 'force-dynamic'

async function studentmentoring({
  searchParams
}: {
  searchParams?: Promise<{
    query?: string
    page?: string
  }>
}) {
  const { query, page } = (await searchParams) || {}
  const currentPage = Number(page) || 1
  const itemsPerPage = 6
  const searchQuery = query || ''

  // Calculate skip for pagination
  const skip = (currentPage - 1) * itemsPerPage

  // WHERE clause for filtering
  const whereClause = searchQuery
    ? {
      OR: [
        { IssuesDiscussed: { contains: searchQuery } },
        { MentoringMeetingAgenda: { contains: searchQuery } },
        {
          studentmentor: {
            students: { StudentName: { contains: searchQuery } }
          }
        },
        {
          studentmentor: {
            staff: { StaffName: { contains: searchQuery } }
          }
        }
      ]
    }
    : {}

  // Fetch data and total count concurrently
  const [data, totalCount] = await Promise.all([
    prisma.studentmentoring.findMany({
      where: whereClause,
      include: {
        studentmentor: { include: { staff: true, students: true } }
      },
      orderBy: { DateOfMentoring: 'desc' },
      skip: skip,
      take: itemsPerPage
    }),
    prisma.studentmentoring.count({ where: whereClause })
  ])

  const totalPages = Math.ceil(totalCount / itemsPerPage)

  return (
    <div className='container py-5'>
      <div className='d-flex flex-column flex-md-row justify-content-between align-items-center mb-4 gap-3'>
        <h2 className='text-primary fw-bold mb-0'>Mentoring Session Logs</h2>

        <div className="d-flex flex-grow-1 w-100 w-md-auto justify-content-end" style={{ maxWidth: '400px' }}>
          <Search placeholder="Search agenda, issues, student..." />
        </div>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-5 border border-secondary-subtle rounded-4 bg-body-tertiary dashed-border">
          <div className="mb-3 text-secondary opacity-50">
            <i className="bi bi-search fs-1"></i>
          </div>
          <h5 className="fw-bold text-body">No sessions found</h5>
          <p className="text-body-secondary mb-0">Try adjusting your search criteria or add a new session.</p>
        </div>
      ) : (
        <div className='row g-4'>
          {data.map(log => (
            <div className='col-12' key={log.StudentMentoringID}>
              <div className='card shadow-sm border-0 bg-body rounded-4'>
                <div
                  className={`card-header d-flex justify-content-between ${log.AttendanceStatus === 'Present'
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
                  <div className="row">
                    <div className="col-md-6">
                      <p className='mb-1 text-body'>
                        <strong>Mentor:</strong> {log.studentmentor?.staff?.StaffName}
                      </p>
                      <p className='mb-1 text-body'>
                        <strong>Student:</strong>{' '}
                        {log.studentmentor?.students?.StudentName}
                      </p>
                    </div>
                    <div className="col-md-6 text-md-end">
                      <small className="text-secondary">
                        {log.DateOfMentoring ? new Date(log.DateOfMentoring).toLocaleDateString() : 'N/A'}
                      </small>
                    </div>
                  </div>

                  <div className='p-3 bg-body-tertiary rounded small fst-italic border border-secondary-subtle mt-2'>
                    "{log.IssuesDiscussed}"
                  </div>
                </div>
                <div className='card-footer bg-transparent d-flex justify-content-end gap-2 p-3'>
                  <Link
                    href={`/studentmentoring/edit/${log.StudentMentoringID}`}
                    className='btn btn-sm btn-outline-primary rounded-pill px-3'
                  >
                    <i className="bi bi-pencil-square me-1"></i> Edit
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
      )}

      {/* Pagination Control */}
      <div className="mt-4">
        <Pagination totalPages={totalPages} />
=======

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
>>>>>>> d282a3810cbf7cbc9068d4230e349a3be90eecd7
      </div>
    </div>
  )
}
export default studentmentoring