'use client'

import React, { useActionState } from 'react'
import Link from 'next/link'
import { editStaff } from '@/app/action/editStaff'

export default function EditStaffForm({ staff }: { staff: any }) {
    const [state, formAction, isPending] = useActionState(editStaff, null)

    return (
        <form action={formAction}>
            {/* Hidden ID for Server Action */}
            <input type='hidden' name='StaffID' value={staff.StaffID} />

            {state?.success === false && (
                <div className='alert alert-danger shadow-sm rounded-3 mb-4'>
                    <i className='bi bi-exclamation-triangle-fill me-2'></i>
                    {state.message}
                </div>
            )}

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
                            className={`form-control bg-body-tertiary border-secondary-subtle text-body shadow-none ${state?.errors?.EmailAddress ? 'is-invalid' : ''}`}
                        />
                    </div>
                    {state?.errors?.EmailAddress && <div className="text-danger small mt-1">{state.errors.EmailAddress[0]}</div>}
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
                            className={`form-control bg-body-tertiary border-secondary-subtle text-body shadow-none ${state?.errors?.Password ? 'is-invalid' : ''}`}
                        />
                    </div>
                    {state?.errors?.Password && <div className="text-danger small mt-1">{state.errors.Password[0]}</div>}
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
                        className={`form-control bg-body-tertiary border-secondary-subtle text-body shadow-none ${state?.errors?.StaffName ? 'is-invalid' : ''}`}
                    />
                    {state?.errors?.StaffName && <div className="text-danger small mt-1">{state.errors.StaffName[0]}</div>}
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
                            className={`form-control bg-body-tertiary border-secondary-subtle text-body shadow-none ${state?.errors?.MobileNo ? 'is-invalid' : ''}`}
                        />
                    </div>
                    {state?.errors?.MobileNo && <div className="text-danger small mt-1">{state.errors.MobileNo[0]}</div>}
                </div>

                <div className='col-12'>
                    <label className='form-label small fw-bold text-body-secondary'>
                        BIO / DEPARTMENT NOTES
                    </label>
                    <textarea
                        name='Description'
                        defaultValue={staff.Description!}
                        className={`form-control bg-body-tertiary border-secondary-subtle text-body shadow-none ${state?.errors?.Description ? 'is-invalid' : ''}`}
                        rows={4}
                        placeholder='e.g. Computer Science Department, Mentoring Lead...'
                    ></textarea>
                    {state?.errors?.Description && <div className="text-danger small mt-1">{state.errors.Description[0]}</div>}
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
                        disabled={isPending}
                        className='btn btn-primary px-5 rounded-pill fw-bold shadow-sm d-flex align-items-center'
                    >
                        {isPending ? (
                            <>
                                <span className='spinner-border spinner-border-sm me-2'></span>
                                Updating...
                            </>
                        ) : (
                            <>
                                <i className='bi bi-check-circle me-2'></i>
                                Update Staff Profile
                            </>
                        )}
                    </button>
                </div>
            </div>
        </form>
    )
}
