import { prisma } from '@/app/lib/prisma'
import { editStaff } from '@/app/action/editStaff'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export default async function EditStaff ({
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
          <form action={editStaff}>
            {/* Hidden ID for Server Action */}
            <input type='hidden' name='StaffID' value={staff.StaffID} />

            <div className='row g-4'>
              {/* Account Security Section */}
              <div className='col-12 border-bottom border-secondary-subtle pb-2 mb-2'>
                <h6 className='text-primary text-uppercase fw-bold small tracking-wider'>
                  Account Security
                </h6>
              </div>

              <div className='col-md-6'>
                <label className='form-label small fw-bold text-body-secondary'>
                  LOGIN EMAIL (ID)
                </label>
                <div className='input-group'>
                  <span className='input-group-text bg-body-tertiary border-secondary-subtle text-body-secondary'>
                    <i className='bi bi-envelope'></i>
                  </span>
                  <input
                    type='email'
                    name='EmailAddress'
                    defaultValue={staff.EmailAddress!}
                    className='form-control bg-body-tertiary border-secondary-subtle text-body shadow-none'
                    required
                  />
                </div>
              </div>

              <div className='col-md-6'>
                <label className='form-label small fw-bold text-body-secondary'>
                  PASSWORD
                </label>
                <div className='input-group'>
                  <span className='input-group-text bg-body-tertiary border-secondary-subtle text-body-secondary'>
                    <i className='bi bi-shield-lock'></i>
                  </span>
                  <input
                    type='password'
                    name='Password'
                    defaultValue={staff.Password}
                    className='form-control bg-body-tertiary border-secondary-subtle text-body shadow-none'
                    required
                  />
                </div>
                <div className='form-text smaller text-body-secondary'>
                  User can change this after first login.
                </div>
              </div>

              {/* Profile Details Section */}
              <div className='col-12 border-bottom border-secondary-subtle pb-2 mb-2 mt-4'>
                <h6 className='text-primary text-uppercase fw-bold small tracking-wider'>
                  Professional Profile
                </h6>
              </div>

              <div className='col-md-7'>
                <label className='form-label small fw-bold text-body-secondary'>
                  FULL NAME
                </label>
                <input
                  type='text'
                  name='StaffName'
                  defaultValue={staff.StaffName}
                  className='form-control bg-body-tertiary border-secondary-subtle text-body shadow-none'
                  required
                />
              </div>

              <div className='col-md-5'>
                <label className='form-label small fw-bold text-body-secondary'>
                  MOBILE NUMBER
                </label>
                <div className='input-group'>
                  <span className='input-group-text bg-body-tertiary border-secondary-subtle text-body-secondary'>
                    <i className='bi bi-phone'></i>
                  </span>
                  <input
                    type='text'
                    name='MobileNo'
                    defaultValue={staff.MobileNo!}
                    className='form-control bg-body-tertiary border-secondary-subtle text-body shadow-none'
                  />
                </div>
              </div>

              <div className='col-12'>
                <label className='form-label small fw-bold text-body-secondary'>
                  BIO / DEPARTMENT NOTES
                </label>
                <textarea
                  name='Description'
                  defaultValue={staff.Description!}
                  className='form-control bg-body-tertiary border-secondary-subtle text-body shadow-none'
                  rows={4}
                  placeholder='e.g. Computer Science Department, Mentoring Lead...'
                ></textarea>
              </div>

              {/* Form Actions */}
              <div className='col-12 mt-5 pt-4 border-top border-secondary-subtle d-flex justify-content-end gap-3'>
                <Link
                  href='/staff'
                  className='btn btn-outline-secondary px-4 rounded-pill fw-bold border-2'
                >
                  Cancel
                </Link>
                <button
                  type='submit'
                  className='btn btn-primary px-5 rounded-pill fw-bold shadow-sm d-flex align-items-center'
                >
                  <i className='bi bi-check-circle me-2'></i>
                  Update Staff Profile
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
