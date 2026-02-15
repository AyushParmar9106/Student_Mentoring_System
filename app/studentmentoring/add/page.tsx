import Link from 'next/link'
import AddMentoringForm from './AddMentoringForm'

export default async function RecordSession({
  searchParams
}: {
  searchParams: Promise<{ assignmentId: string }>
}) {
  const { assignmentId } = await searchParams

  return (
    <div className='container py-5'>
      {/* Navigation Breadcrumb */}
      <nav aria-label='breadcrumb' className='mb-4'>
        <ol className='breadcrumb'>
          <li className='breadcrumb-item'>
            <Link
              href='/staff'
              className='text-body-secondary text-decoration-none'
            >
              Dashboard
            </Link>
          </li>
          <li
            className='breadcrumb-item active text-body fw-bold'
            aria-current='page'
          >
            New Mentoring Record
          </li>
        </ol>
      </nav>

      <div className='d-flex justify-content-between align-items-center mb-4'>
        <h2 className='fw-bold text-body mb-0'>Record Mentoring Session</h2>
        <span className='badge bg-primary-subtle text-primary border border-primary-subtle px-3 py-2 rounded-pill'>
          Assignment ID: {assignmentId}
        </span>
      </div>

      <AddMentoringForm assignmentId={Number(assignmentId)} />
    </div>
  )
}
