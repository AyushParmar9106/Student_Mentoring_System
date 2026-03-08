import { prisma } from '@/app/lib/prisma'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import EditStaffForm from './EditStaffForm'

export default async function EditStaff({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const staffId = Number(id)

  if (isNaN(staffId)) return notFound()

  const staff = await prisma.staff.findUnique({
    where: { StaffID: staffId }
  })

  if (!staff) {
    return (
      <div className='container py-5 text-center'>
        <div className='alert alert-warning border-0 shadow-sm rounded-4'>
          <i className='bi bi-exclamation-circle me-2'></i>
          Staff member not found.
        </div>
        <Link href='/staff' className='btn btn-primary rounded-pill px-4'>
          Return to Directory
        </Link>
      </div>
    )
  }

  return (
    <div className='container py-5'>
      <div
        className='card border-0 shadow-lg rounded-4 bg-body border border-secondary-subtle overflow-hidden mx-auto'
        style={{ maxWidth: '850px' }}
      >
        {/* Header - Subtle contrast in both themes */}
        <div className='card-header bg-body-tertiary border-bottom border-secondary-subtle p-4'>
          <div className='d-flex align-items-center'>
            <div
              className='bg-primary text-white rounded-circle p-2 me-3 d-flex align-items-center justify-content-center'
              style={{ width: '45px', height: '45px' }}
            >
              <i className='bi bi-person-gear fs-4'></i>
            </div>
            <div>
              <h4 className='fw-bold text-body mb-0'>Edit Staff Profile</h4>
              <p className='text-body-secondary small mb-0'>
                Update account credentials and professional details
              </p>
            </div>
          </div>
        </div>

        <div className='card-body p-4 p-md-5'>
          <EditStaffForm staff={staff} />
        </div>
      </div>
    </div>
  )
}
