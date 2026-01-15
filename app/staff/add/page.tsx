'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import { saveStaff } from '@/app/action/saveStaff'

export default function AddStaffForm () {
  const [state, formAction, isPending] = useActionState(saveStaff, null)

  return (
    <div className='container py-5'>
      <div className='row justify-content-center'>
        <div className='col-lg-8 col-md-10'>
          {/* Use bg-body and border to respect light/dark mode */}
          <div className='card border shadow-lg rounded-4 overflow-hidden bg-body'>
            {/* Header: Dark background looks professional in both modes */}
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

            {/* Body: bg-body-tertiary provides a subtle contrast from the card background */}
            <div className='card-body p-4 p-md-5 bg-body-tertiary text-body'>
              {state?.success === false && (
                <div
                  className='alert alert-danger border-0 shadow-sm d-flex align-items-center'
                  role='alert'
                >
                  <i className='bi bi-exclamation-triangle-fill me-2'></i>
                  <div>{state.message}</div>
                </div>
              )}

              <form action={formAction}>
                <div className='row g-4'>
                  {/* Section Label: text-primary for brand consistency */}
                  <div className='col-12 border-bottom border-secondary-subtle pb-2'>
                    <h5 className='text-primary text-uppercase small fw-bold tracking-wider'>
                      Account Security
                    </h5>
                  </div>

                  <div className='col-md-6'>
                    <label className='form-label fw-semibold small'>
                      Email Address
                    </label>
                    <div className='input-group'>
                      {/* bg-body on input-group-text ensures it flips in dark mode */}
                      <span className='input-group-text bg-body border-end-0 text-muted'>
                        <i className='bi bi-envelope'></i>
                      </span>
                      <input
                        type='email'
                        name='EmailAddress'
                        className='form-control bg-body border-start-0 shadow-none text-body'
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
                        className='form-control bg-body border-start-0 shadow-none text-body'
                        required
                      />
                    </div>
                  </div>

                  <div className='col-12 border-bottom border-secondary-subtle pb-2 mt-5'>
                    <h5 className='text-primary text-uppercase small fw-bold tracking-wider'>
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
                      className='form-control bg-body shadow-none text-body'
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
                      className='form-control bg-body shadow-none text-body'
                    />
                  </div>

                  <div className='col-12'>
                    <label className='form-label fw-semibold small'>
                      Biography
                    </label>
                    <textarea
                      name='Description'
                      className='form-control bg-body shadow-none text-body'
                      rows={4}
                    ></textarea>
                  </div>

                  <div className='col-12 pt-4 border-top border-secondary-subtle mt-5'>
                    <div className='d-flex gap-3 justify-content-end'>
                      <Link
                        href='/staff'
                        className='btn btn-outline-secondary px-4 py-2 rounded-3 fw-medium'
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
