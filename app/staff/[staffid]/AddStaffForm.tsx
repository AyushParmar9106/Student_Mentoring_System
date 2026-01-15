'use client'

// You will need to create this action
import { useActionState, useTransition } from 'react'
import Link from 'next/link'
import { saveStaff } from '@/app/action/saveStaff'

export default function AddStaffForm () {
  const [state, formAction] = useActionState(saveStaff, null)
  const [isPending, startTransition] = useTransition()

  const handleSubmit = (formData: FormData) => {
    startTransition(() => {
      formAction(formData)
    })
  }

  return (
    <div className='container py-5'>
      <div className='row justify-content-center'>
        <div className='col-lg-8 col-md-10'>
          <div className='card border-0 shadow-lg rounded-4 overflow-hidden'>
            {/* Header - Purple/Indigo to differentiate from Student Blue */}
            <div className='card-header bg-dark text-white p-4 border-0'>
              <div className='d-flex align-items-center justify-content-between'>
                <div>
                  <h3 className='fw-bold mb-0'>Staff Onboarding</h3>
                  <p className='small mb-0 opacity-75'>
                    Register new faculty or administrative members
                  </p>
                </div>
                <i className='bi bi-person-badge fs-1 opacity-50'></i>
              </div>
            </div>

            {/* Body */}
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
                  {/* Section 1: Authentication */}
                  <div className='col-12 border-bottom pb-2'>
                    <h5 className='text-dark text-uppercase small fw-bold tracking-wider'>
                      Account Security
                    </h5>
                  </div>

                  <div className='col-md-6'>
                    <label className='form-label fw-semibold small'>
                      Email Address (Username)
                    </label>
                    <div className='input-group'>
                      <span className='input-group-text bg-body border-end-0 text-muted'>
                        <i className='bi bi-envelope'></i>
                      </span>
                      <input
                        type='email'
                        name='EmailAddress'
                        className='form-control bg-body border-start-0 shadow-none'
                        placeholder='staff@institution.com'
                        required
                      />
                    </div>
                  </div>

                  <div className='col-md-6'>
                    <label className='form-label fw-semibold small'>
                      Initial Password
                    </label>
                    <div className='input-group'>
                      <span className='input-group-text bg-body border-end-0 text-muted'>
                        <i className='bi bi-shield-lock'></i>
                      </span>
                      <input
                        type='password'
                        name='Password'
                        className='form-control bg-body border-start-0 shadow-none'
                        required
                      />
                    </div>
                  </div>

                  {/* Section 2: Personal Info */}
                  <div className='col-12 border-bottom pb-2 mt-5'>
                    <h5 className='text-dark text-uppercase small fw-bold tracking-wider'>
                      Professional Profile
                    </h5>
                  </div>

                  <div className='col-12'>
                    <label className='form-label fw-semibold small'>
                      Full Name
                    </label>
                    <input
                      type='text'
                      name='StaffName'
                      className='form-control bg-body shadow-none'
                      placeholder='e.g. Dr. Jane Smith'
                      required
                    />
                  </div>

                  <div className='col-md-6'>
                    <label className='form-label fw-semibold small'>
                      Mobile Number
                    </label>
                    <div className='input-group'>
                      <span className='input-group-text bg-body border-end-0 text-muted'>
                        <i className='bi bi-phone'></i>
                      </span>
                      <input
                        type='tel'
                        name='MobileNo'
                        className='form-control bg-body border-start-0 shadow-none'
                      />
                    </div>
                  </div>

                  <div className='col-12'>
                    <label className='form-label fw-semibold small'>
                      Professional Biography / Description
                    </label>
                    <textarea
                      name='Description'
                      className='form-control bg-body shadow-none'
                      rows={4}
                      placeholder='Department, specializations, or office hours...'
                    ></textarea>
                  </div>

                  {/* Footer Actions */}
                  <div className='col-12 pt-4 border-top mt-5'>
                    <div className='d-flex gap-3 justify-content-end'>
                      <Link
                        href='/staff'
                        className='btn btn-light px-4 py-2 rounded-3 fw-medium border'
                      >
                        Cancel
                      </Link>
                      <button
                        type='submit'
                        className='btn btn-dark px-5 py-2 fw-bold rounded-3 shadow-sm'
                        disabled={isPending}
                      >
                        {isPending ? (
                          <>
                            <span className='spinner-border spinner-border-sm me-2'></span>
                            Processing...
                          </>
                        ) : (
                          'Create Staff Account'
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
