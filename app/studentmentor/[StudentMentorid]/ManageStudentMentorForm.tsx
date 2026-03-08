'use client'

import React, { useActionState } from 'react'
import Link from 'next/link'
import { manageStudentMentor } from '@/app/action/manageStudentMentor'

export default function ManageStudentMentorForm({
    staff,
    allStudents,
    assignedIds
}: {
    staff: any
    allStudents: any[]
    assignedIds: Set<number>
}) {
    const [state, formAction, isPending] = useActionState(manageStudentMentor, null)

    return (
        <form action={formAction} className='card-body p-4'>
            <input type='hidden' name='StaffID' value={staff.StaffID} />

            {state?.success === false && (
                <div className='alert alert-danger shadow-sm rounded-3 mb-4'>
                    <i className='bi bi-exclamation-triangle-fill me-2'></i>
                    {state.message}
                </div>
            )}

            <div className='row g-4'>
                <div className='col-md-6'>
                    <label className='form-label fw-bold small text-uppercase text-body-secondary'>
                        Assignment Start Date
                    </label>
                    <input
                        type='date'
                        name='FromDate'
                        className={`form-control bg-body-tertiary border-secondary-subtle text-body ${state?.errors?.FromDate ? 'is-invalid' : ''}`}
                        defaultValue={new Date().toISOString().split('T')[0]}
                    />
                    {state?.errors?.FromDate && <div className="text-danger small mt-1">{state.errors.FromDate[0]}</div>}
                </div>

                <div className='col-12'>
                    <label className='form-label fw-bold small text-uppercase text-body-secondary mb-3 d-block'>
                        Select Students to Assign
                    </label>

                    {/* Scrollable list of students with checkboxes */}
                    <div
                        className={`border border-secondary-subtle rounded-3 p-3 bg-body-tertiary ${state?.errors?.StudentIDs ? 'border-danger' : ''}`}
                        style={{ maxHeight: '400px', overflowY: 'auto' }}
                    >
                        <div className='row g-3'>
                            {allStudents.map((student: typeof allStudents[0]) => (
                                <div key={student.StudentID} className='col-md-6 col-lg-4'>
                                    <div className='form-check p-2 border border-secondary-subtle rounded bg-body shadow-sm h-100 d-flex align-items-center'>
                                        <input
                                            className='form-check-input ms-0 me-2 shadow-none'
                                            type='checkbox'
                                            name='StudentIDs'
                                            value={student.StudentID}
                                            id={`student-${student.StudentID}`}
                                            defaultChecked={assignedIds.has(student.StudentID)}
                                        />
                                        <label
                                            className='form-check-label text-body small fw-bold mb-0'
                                            htmlFor={`student-${student.StudentID}`}
                                        >
                                            {student.StudentName}
                                            <span className='d-block text-body-secondary fw-normal smaller'>
                                                {student.EnrollmentNo}
                                            </span>
                                        </label>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    {state?.errors?.StudentIDs && <div className="text-danger small mt-1">{state.errors.StudentIDs[0]}</div>}
                </div>

                <div className='col-12'>
                    <label className='form-label fw-bold small text-uppercase text-body-secondary'>
                        Internal Notes (Description)
                    </label>
                    <textarea
                        name='Description'
                        className={`form-control bg-body-tertiary border-secondary-subtle text-body ${state?.errors?.Description ? 'is-invalid' : ''}`}
                        rows={2}
                        placeholder='Optional notes about this assignment group...'
                    ></textarea>
                    {state?.errors?.Description && <div className="text-danger small mt-1">{state.errors.Description[0]}</div>}
                </div>

                <div className='col-12 mt-4 pt-3 border-top border-secondary-subtle d-flex gap-3'>
                    <button
                        type='submit'
                        disabled={isPending}
                        className='btn btn-primary px-5 py-2 rounded-pill fw-bold'
                    >
                        {isPending ? (
                            <>
                                <span className='spinner-border spinner-border-sm me-2'></span>
                                Syncing...
                            </>
                        ) : (
                            'Sync Assignments'
                        )}
                    </button>
                    <Link
                        href={`/staff/${staff.StaffID}`}
                        className='btn btn-outline-secondary px-4 py-2 rounded-pill fw-bold'
                    >
                        Cancel
                    </Link>
                </div>
            </div>
        </form>
    )
}
