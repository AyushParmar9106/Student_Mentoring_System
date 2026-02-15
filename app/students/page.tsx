import Link from 'next/link'
import DeleteBtn from '@/app/ui/DeleteBtn'
import DeleteStudent from '@/app/action/DeleteStudent'
import { prisma } from '../lib/prisma'
import Search from '@/app/ui/Search'
import Pagination from '@/app/ui/Pagination'

export const dynamic = 'force-dynamic'

export default async function StudentDirectory({
  searchParams,
}: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const { query, page } = (await searchParams) || {};
  const currentPage = Number(page) || 1;
  const itemsPerPage = 6; // Adjusted for grid layout
  const searchQuery = query || '';

  // Calculate skip for pagination
  const skip = (currentPage - 1) * itemsPerPage;

  // WHERE clause for filtering
  const whereClause = searchQuery
    ? {
      OR: [
        { StudentName: { contains: searchQuery } }, // Case-insensitive by default in some DBs, or use mode: 'insensitive' if Postgres
        { EnrollmentNo: { contains: searchQuery } },
        { EmailAddress: { contains: searchQuery } },
      ],
    }
    : {};

  // Fetch data and total count concurrently
  const [data, totalCount] = await Promise.all([
    prisma.students.findMany({
      where: whereClause,
      include: { studentmentor: true },
      skip: skip,
      take: itemsPerPage,
      orderBy: { StudentID: 'desc' }, // Show newest first
    }),
    prisma.students.count({ where: whereClause }),
  ]);

  const totalPages = Math.ceil(totalCount / itemsPerPage);

  return (
    <div className='container py-5'>
      <div className='d-flex flex-column flex-md-row justify-content-between align-items-center mb-4 gap-3'>
        <h2 className='fw-bold text-body mb-0'>Student Records</h2>

        <div className="d-flex flex-grow-1 w-100 w-md-auto justify-content-end gap-2">
          <div className="w-100" style={{ maxWidth: '400px' }}>
            <Search placeholder="Search by name, enrollment..." />
          </div>
          <Link
            href='/students/add'
            className='btn btn-primary rounded-pill px-4 fw-bold shadow-sm text-nowrap'
          >
            <i className='bi bi-person-plus me-2'></i>Add Student
          </Link>
        </div>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-5">
          <p className="text-muted">No students found.</p>
        </div>
      ) : (
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
      )}

      {/* Pagination Control */}
      <Pagination totalPages={totalPages} />
    </div>
  )
}
