import Link from 'next/link'
import DeleteBtn from '@/app/ui/DeleteBtn'
import DeleteStudent from '@/app/action/DeleteStudent'
import { prisma } from '../lib/prisma'

export default async function StudentDirectory () {
  const data = await prisma.students.findMany({
    include: { studentmentor: true }
  })

  return (
    <div className='container py-5'>
      <div className='d-flex justify-content-between align-items-center mb-4'>
        <h2 className='fw-bold text-body'>Student Records</h2>
        <Link
          href='/students/add'
          className='btn btn-primary rounded-pill px-4 fw-bold shadow-sm'
        >
          <i className='bi bi-person-plus me-2'></i>Add Student
        </Link>
      </div>

      <div className='row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4'>
        {data.map(s => (
          <div className='col' key={s.StudentID}>
            <div className='card h-100 shadow-sm border-0 bg-body rounded-4 border border-secondary-subtle'>
              <div className='card-header bg-primary text-white d-flex justify-content-between p-3 rounded-top-4 border-0'>
                <span className='fw-bold small'>No: {s.EnrollmentNo}</span>
                <span className='badge bg-white text-primary rounded-pill'>
                  {s.studentmentor?.length || 0} Mentor(s)
                </span>
              </div>

              <div className='card-body'>
                <h5 className='fw-bold text-body mb-1'>{s.StudentName}</h5>
                <p className='text-secondary small mb-3'>
                  {s.EmailAddress || 'Email not set'}
                </p>
                <div className='p-2 bg-body-tertiary rounded border border-secondary-subtle small'>
                  <i className='bi bi-telephone me-2 text-primary'></i>
                  <strong>Mobile:</strong> {s.MobileNo || 'N/A'}
                </div>
              </div>

              {/* Updated Card Footer with Edit Button */}
              <div className='card-footer bg-transparent border-0 d-flex gap-2 p-3 pt-0'>
                <Link
                  href={`/students/${s.StudentID}`}
                  className='btn btn-outline-primary btn-sm rounded-pill flex-grow-1 fw-bold'
                >
                  Profile
                </Link>

                {/* NEW EDIT BUTTON */}
                <Link
                  href={`/students/edit/${s.StudentID}`}
                  className='btn btn-outline-secondary btn-sm rounded-pill flex-grow-1 fw-bold'
                >
                  Edit
                </Link>

                <DeleteBtn deleteFn={DeleteStudent} id={s.StudentID} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
