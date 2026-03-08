'use client'

import React, { useActionState } from 'react'
import Link from 'next/link'
import { editStudent } from '@/app/action/editStudent'

export default function EditStudentForm({ student }: { student: any }) {
    const [state, formAction, isPending] = useActionState(editStudent, null)

    return (
        <form action={formAction}>
            <input type='hidden' name='StudentID' value={student.StudentID} />

            {state?.success === false && (
                <div className='alert alert-danger shadow-sm rounded-3 mb-4'>
                    <i className='bi bi-exclamation-triangle-fill me-2'></i>
                    {state.message}
                </div>
            )}

            <div className='row g-4'>
                {/* Academic Info */}
                <div className='col-md-6'>
                    <h5 className='border-bottom pb-2 mb-3'>
                        Academic Information
                    </h5>

                    <div className='mb-3'>
                        <label className='form-label'>Full Name</label>
                        <input
                            type='text'
                            name='StudentName'
                            defaultValue={student.StudentName ?? ''}
                            className={`form-control ${state?.errors?.StudentName ? 'is-invalid' : ''}`}
                        />
                        {state?.errors?.StudentName && <div className="text-danger small mt-1">{state.errors.StudentName[0]}</div>}
                    </div>

                    <div className='mb-3'>
                        <label className='form-label'>Enrollment Number</label>
                        <input
                            type='text'
                            name='EnrollmentNo'
                            defaultValue={student.EnrollmentNo ?? ''}
                            className={`form-control ${state?.errors?.EnrollmentNo ? 'is-invalid' : ''}`}
                        />
                        {state?.errors?.EnrollmentNo && <div className="text-danger small mt-1">{state.errors.EnrollmentNo[0]}</div>}
                    </div>

                    <div className='mb-3'>
                        <label className='form-label'>Password</label>
                        <input
                            type='password'
                            name='Password'
                            defaultValue={student.Password ?? ''}
                            className={`form-control ${state?.errors?.Password ? 'is-invalid' : ''}`}
                        />
                        {state?.errors?.Password && <div className="text-danger small mt-1">{state.errors.Password[0]}</div>}
                    </div>
                </div>

                {/* Contact Info */}
                <div className='col-md-6'>
                    <h5 className='border-bottom pb-2 mb-3'>Contact Details</h5>

                    <div className='mb-3'>
                        <label className='form-label'>Contact Number</label>
                        <input
                            type='text'
                            name='MobileNo'
                            defaultValue={student.MobileNo ?? ''}
                            className={`form-control ${state?.errors?.MobileNo ? 'is-invalid' : ''}`}
                        />
                        {state?.errors?.MobileNo && <div className="text-danger small mt-1">{state.errors.MobileNo[0]}</div>}
                    </div>

                    <div className='mb-3'>
                        <label className='form-label'>Email Address</label>
                        <input
                            type='email'
                            name='EmailAddress'
                            defaultValue={student.EmailAddress ?? ''}
                            className={`form-control ${state?.errors?.EmailAddress ? 'is-invalid' : ''}`}
                        />
                        {state?.errors?.EmailAddress && <div className="text-danger small mt-1">{state.errors.EmailAddress[0]}</div>}
                    </div>

                    <div className='mb-3'>
                        <label className='form-label'>Mentoring Notes</label>
                        <textarea
                            name='Description'
                            rows={3}
                            defaultValue={student.Description ?? ''}
                            className={`form-control ${state?.errors?.Description ? 'is-invalid' : ''}`}
                        />
                        {state?.errors?.Description && <div className="text-danger small mt-1">{state.errors.Description[0]}</div>}
                    </div>
                </div>
            </div>

            {/* Footer Buttons */}
            <div className='d-flex flex-column flex-sm-row justify-content-end gap-3 pt-4 border-top mt-4'>
                <Link href='/students' className='btn btn-light'>
                    Cancel
                </Link>
                <button type='submit' disabled={isPending} className='btn btn-primary px-4'>
                    {isPending ? (
                        <>
                            <span className='spinner-border spinner-border-sm me-2'></span>
                            Updating...
                        </>
                    ) : (
                        'Update Profile'
                    )}
                </button>
            </div>
        </form>
    )
}
