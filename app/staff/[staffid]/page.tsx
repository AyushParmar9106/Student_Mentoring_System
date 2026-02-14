
import { prisma } from '@/app/lib/prisma'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export default async function MentorDashboard ({
  params
}: {
  params: Promise<{ staffid: string }>
}) {
  const { staffid } = await params
  const id = parseInt(staffid)
  if (isNaN(id)) return notFound()

  const staff = await prisma.staff.findFirst({
    where: { StaffID: id },
    include: {
      studentmentor: {
        include: {
          students: true,
          studentmentoring: { orderBy: { DateOfMentoring: 'desc' }, take: 1 }
        }
      }
    }
  })

  if (!staff) return notFound()

  const highStressCount = staff.studentmentor.filter(
    m => m.studentmentoring[0]?.StressLevel === 'High'
  ).length

  return (
    <div className='container py-5'>
      {/* --- STAFF PROFILE HEADER SECTION --- */}
      <div className='card border-0 shadow-sm rounded-4 bg-body border border-secondary-subtle mb-4 overflow-hidden'>
        <div className='card-body p-4'>
          <div className='row align-items-center'>
            <div className='col-auto'>
              <div
                className='bg-primary text-white rounded-circle d-flex align-items-center justify-content-center shadow-sm'
                style={{ width: '70px', height: '70px' }}
              >
                <span className='fs-2 fw-bold'>
                  {staff.StaffName.charAt(0)}
                </span>
              </div>
            </div>
            <div className='col'>
              <h3 className='fw-bold text-body mb-1'>{staff.StaffName}</h3>
              <div className='d-flex flex-wrap gap-3'>
                <span className='text-body-secondary small'>
                  <i className='bi bi-envelope me-1'></i>
                  {staff.EmailAddress}
                </span>
                <span className='text-body-secondary small'>
                  <i className='bi bi-telephone me-1'></i>
                  {staff.MobileNo || 'No Phone'}
                </span>
                <span className='badge bg-primary-subtle text-primary border border-primary-subtle rounded-pill'>
                  Staff ID: {staff.StaffID}
                </span>
              </div>
            </div>
            <div className='col-md-auto mt-3 mt-md-0'>
              <Link
                href={`/staff/edit/${staff.StaffID}`}
                className='btn btn-outline-primary rounded-pill px-4 fw-bold'
              >
                <i className='bi bi-pencil-square me-2'></i>Edit Profile
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* --- STATS ROW --- */}
      <div className='row g-3 mb-5'>
        <div className='col-md-4'>
          <div className='card border-0 shadow-sm rounded-4 p-4 bg-primary text-white h-100'>
            <h6 className='text-uppercase small fw-bold opacity-75'>
              Active Mentees
            </h6>
            <h1 className='fw-bold mb-0'>{staff.studentmentor.length}</h1>
          </div>
        </div>
        <div className='col-md-4'>
          <div className='card border-0 shadow-sm rounded-4 p-4 bg-danger text-white h-100'>
            <h6 className='text-uppercase small fw-bold opacity-75'>
              Critical Stress Alerts
            </h6>
            <h1 className='fw-bold mb-0'>{highStressCount}</h1>
          </div>
        </div>
        <div className='col-md-4 text-center d-flex align-items-center'>
          <Link
            href={`/studentmentor/edit/${staff.StaffID}`}
            className='btn btn-dark w-100 py-3 rounded-4 fw-bold shadow'
          >
            <i className='bi bi-person-gear me-2'></i>Manage Caseload
          </Link>
        </div>
      </div>

      {/* --- STUDENT TABLE --- */}

      <div className='card border-0 shadow-sm rounded-4 bg-body border border-secondary-subtle overflow-hidden'>
        <div className='card-header bg-transparent py-3 border-bottom border-secondary-subtle d-flex justify-content-between align-items-center'>
          <h5 className='mb-0 fw-bold text-body'>My Assigned Students</h5>
          <small className='text-body-secondary'>
            Showing {staff.studentmentor.length} students
          </small>
        </div>
        <div className='card-body p-0'>
          <div className='table-responsive'>
            <table className='table table-hover align-middle mb-0'>
              <thead className='table-light'>
                <tr>
                  <th className='ps-4'>Student</th>
                  <th>Enrollment No</th>
                  <th>Last Stress Level</th>
                  <th className='text-end pe-4'>Actions</th>
                </tr>
              </thead>
              <tbody>
                {staff.studentmentor.map(m => {
                  const latest = m.studentmentoring[0]
                  return (
                    <tr key={m.StudentMentorID}>
                      <td className='ps-4'>
                        <div className='fw-bold text-body'>
                          {m.students?.StudentName}
                        </div>
                        <div className='small text-muted'>
                          {m.students?.EmailAddress}
                        </div>
                      </td>
                      <td>{m.students?.EnrollmentNo}</td>
                      <td>
                        <span
                          className={`badge rounded-pill ${
                            latest?.StressLevel === 'High'
                              ? 'bg-danger'
                              : 'bg-success-subtle text-success'
                          }`}
                        >
                          {latest?.StressLevel || 'No Data'}
                        </span>
                      </td>
                      <td className='text-end pe-4'>
                        <Link
                          href={`/studentmentoring/add?assignmentId=${m.StudentMentorID}&staffId=${staff.StaffID}`}
                          className='btn btn-sm btn-primary rounded-pill px-3 fw-bold me-2'
                        >
                          Record Session
                        </Link>
                        <Link
                          href={`/students/${m.StudentID}`}
                          className='btn btn-sm btn-outline-secondary rounded-pill px-3 fw-bold'
                        >
                          History
                        </Link>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
