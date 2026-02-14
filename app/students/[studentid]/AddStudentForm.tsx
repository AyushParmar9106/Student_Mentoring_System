'use client'

import { saveStudent } from '@/app/action/saveStudent'
import { useActionState, useTransition } from 'react'
import Link from 'next/link'

interface StaffMember {
  StaffID: number
  StaffName: string
}

export default function AddStudentForm ({
  staffList
}: {
  staffList: StaffMember[]
}) {
  const [state, formAction] = useActionState(saveStudent, null)
  const [isPending, startTransition] = useTransition()

  const handleSubmit = (formData: FormData) => {
    startTransition(() => {
      formAction(formData)
    })
  }

  return (
    <div className='container'>
      <div className='row justify-content-center'>
        <div className='col-lg-8 col-md-10'>
          <div className='card border-0 shadow-lg rounded-4 overflow-hidden shadow-sm'>
            {/* Header stays blue for brand consistency */}
            <div className='card-header bg-primary text-white p-4 border-0'>
              <div className='d-flex align-items-center justify-content-between'>
                <div>
                  <h3 className='fw-bold mb-0'>Student Registration</h3>
                  <p className='small mb-0 opacity-75'>
                    Enter credentials and personal details
                  </p>
                </div>
                <i className='bi bi-person-plus-fill fs-1 opacity-50'></i>
              </div>
            </div>

            {/* Body uses theme-aware background */}
            <div className='card-body p-4 p-md-5 bg-body-secondary text-body'>
              {state?.success === false && (
                <div
                  className='alert alert-danger border-0 shadow-sm d-flex align-items-center'
                  role='alert'
                >
                  <i className='bi bi-exclamation-triangle-fill me-2'></i>
                  <div>{state.message}</div>
                </div>
              )}

              <form action={handleSubmit}>
                <div className='row g-4'>
                  <div className='col-12 border-bottom pb-2'>
                    <h5 className='text-primary text-uppercase small fw-bold tracking-wider'>
                      Login Credentials
                    </h5>
                  </div>

                  <div className='col-md-6'>
                    <label className='form-label fw-semibold small'>
                      Enrollment Number
                    </label>
                    <div className='input-group'>
                      <span className='input-group-text bg-body border-end-0 text-muted'>
                        <i className='bi bi-hash'></i>
                      </span>
                      <input
                        type='text'
                        name='EnrollmentNo'
                        className='form-control bg-body border-start-0 shadow-none'
                        required
                      />
                    </div>
                  </div>

                  <div className='col-md-6'>
                    <label className='form-label fw-semibold small'>
                      Password
                    </label>
                    <div className='input-group'>
                      <span className='input-group-text bg-body border-end-0 text-muted'>
                        <i className='bi bi-lock'></i>
                      </span>
                      <input
                        type='password'
                        name='Password'
                        className='form-control bg-body border-start-0 shadow-none'
                        required
                      />
                    </div>
                  </div>

                  <div className='col-12 border-bottom pb-2 mt-5'>
                    <h5 className='text-primary text-uppercase small fw-bold tracking-wider'>
                      Personal Details
                    </h5>
                  </div>

                  <div className='col-12'>
                    <label className='form-label fw-semibold small'>
                      Full Name
                    </label>
                    <input
                      type='text'
                      name='StudentName'
                      className='form-control bg-body shadow-none'
                      required
                    />
                  </div>

                  <div className='col-md-6'>
                    <label className='form-label fw-semibold small'>
                      Mobile Number
                    </label>
                    <input
                      type='tel'
                      name='MobileNo'
                      className='form-control bg-body shadow-none'
                    />
                  </div>

                  <div className='col-md-6'>
                    <label className='form-label fw-semibold small'>
                      Email Address
                    </label>
                    <input
                      type='email'
                      name='EmailAddress'
                      className='form-control bg-body shadow-none'
                    />
                  </div>

                  <div className='col-12 border-bottom pb-2 mt-5'>
                    <h5 className='text-primary text-uppercase small fw-bold tracking-wider'>
                      Mentor Assignment
                    </h5>
                  </div>

                  <div className='col-12'>
                    <label className='form-label fw-semibold small'>
                      Select Mentor (Staff)
                    </label>
                    <div className='input-group'>
                      <span className='input-group-text bg-body border-end-0 text-muted'>
                        <i className='bi bi-person-badge-fill'></i>
                      </span>
                      <select
                        name='StaffID'
                        className='form-select bg-body border-start-0 shadow-none'
                        required
                      >
                        <option value=''>Choose a mentor...</option>
                        {staffList?.map(staff => (
                          <option key={staff.StaffID} value={staff.StaffID}>
                            {staff.StaffName}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className='col-12'>
                    <label className='form-label fw-semibold small'>
                      Additional Description
                    </label>
                    <textarea
                      name='Description'
                      className='form-control bg-body shadow-none'
                      rows={3}
                      placeholder='Notes about student...'
                    ></textarea>
                  </div>

                  <div className='col-12 pt-4 border-top mt-5'>
                    <div className='d-flex gap-3 justify-content-end'>
                      <Link
                        href='/students'
                        className='btn btn-light px-4 py-2 rounded-3 fw-medium border'
                      >
                        Cancel
                      </Link>
                      <button
                        type='submit'
                        className='btn btn-primary px-5 py-2 fw-bold rounded-3 shadow-sm'
                        disabled={isPending}
                      >
                        {isPending ? (
                          <>
                            <span className='spinner-border spinner-border-sm me-2'></span>
                            Saving...
                          </>
                        ) : (
                          'Register Student'
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
