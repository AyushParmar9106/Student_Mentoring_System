'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import { saveAssignment } from '@/app/action/saveStudentMentor'

interface StudentItem {
  StudentID: number
  StudentName: string
}
interface StaffItem {
  StaffID: number
  StaffName: string
}

export default function AddStudentMentorForm ({
  studentList,
  staffList
}: {
  studentList: StudentItem[]
  staffList: StaffItem[]
}) {
  const [state, formAction, isPending] = useActionState(saveAssignment, null)

  return (
    <div className='container py-5'>
      <div className='row justify-content-center'>
        <div className='col-lg-8 col-md-10'>
          <div className='card border-0 shadow-lg rounded-4 overflow-hidden bg-body'>
            <div className='card-header bg-success text-white p-4 border-0'>
              <div className='d-flex align-items-center justify-content-between'>
                <div>
                  <h3 className='fw-bold mb-0'>Bulk Mentor Assignment</h3>
                  <p className='small mb-0 opacity-75'>
                    Assign one mentor to multiple students
                  </p>
                </div>
                <i className='bi bi-people-fill fs-1 opacity-50'></i>
              </div>
            </div>

            <div className='card-body p-4 p-md-5 bg-body-tertiary'>
              {state?.success === false && (
                <div className='alert alert-danger border-0 shadow-sm mb-4'>
                  <i className='bi bi-exclamation-triangle-fill me-2'></i>
                  {state.message}
                </div>
              )}

              <form action={formAction}>
                <div className='row g-4'>
                  {/* Mentor Selection (Single) */}
                  <div className='col-12'>
                    <label className='form-label fw-semibold small'>
                      Staff Mentor
                    </label>
                    <select
                      name='StaffID'
                      className='form-select bg-body shadow-none'
                      required
                    >
                      <option value=''>Select Mentor...</option>
                      {staffList.map(st => (
                        <option key={st.StaffID} value={st.StaffID}>
                          {st.StaffName}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Student Selection (Checkbox List) */}
                  <div className='col-12 mt-4'>
                    <label className='form-label fw-semibold small d-flex justify-content-between'>
                      Select Students
                      <span
                        className='text-muted fw-normal'
                        style={{ fontSize: '11px' }}
                      >
                        Check one or more
                      </span>
                    </label>

                    <div
                      className='border rounded-3 bg-body overflow-auto'
                      style={{
                        maxHeight: '250px',
                        border: '1px solid #dee2e6'
                      }}
                    >
                      {studentList.length > 0 ? (
                        studentList.map(s => (
                          <div
                            key={s.StudentID}
                            className='form-check border-bottom px-3 py-2 m-0 hover-bg-light'
                            style={{ transition: 'background 0.2s' }}
                          >
                            <input
                              className='form-check-input ms-0 me-3'
                              type='checkbox'
                              name='StudentIDs'
                              value={s.StudentID}
                              id={`student-${s.StudentID}`}
                            />
                            <label
                              className='form-check-label d-block w-100 cursor-pointer'
                              htmlFor={`student-${s.StudentID}`}
                              style={{ cursor: 'pointer' }}
                            >
                              {s.StudentName}
                            </label>
                          </div>
                        ))
                      ) : (
                        <div className='p-3 text-center text-muted'>
                          No students available
                        </div>
                      )}
                    </div>

                    <div className='form-text mt-2 small text-muted'>
                      All checked students will be linked to the selected
                      mentor.
                    </div>
                  </div>

                  <div className='col-md-6 mt-4'>
                    <label className='form-label fw-semibold small'>
                      From Date
                    </label>
                    <input
                      type='date'
                      name='FromDate'
                      className='form-control bg-body shadow-none'
                      required
                    />
                  </div>

                  <div className='col-md-6 mt-4'>
                    <label className='form-label fw-semibold small'>
                      To Date (Optional)
                    </label>
                    <input
                      type='date'
                      name='ToDate'
                      className='form-control bg-body shadow-none'
                    />
                  </div>

                  <div className='col-12 mt-4'>
                    <label className='form-label fw-semibold small'>
                      Description
                    </label>
                    <textarea
                      name='Description'
                      className='form-control bg-body shadow-none'
                      rows={3}
                    ></textarea>
                  </div>

                  <div className='col-12 pt-4 border-top mt-4 d-flex gap-3 justify-content-end'>
                    <Link
                      href='/studentmentor'
                      className='btn btn-outline-secondary px-4 rounded-3'
                    >
                      Cancel
                    </Link>
                    <button
                      type='submit'
                      className='btn btn-success px-5 fw-bold rounded-3 shadow-sm'
                      disabled={isPending}
                    >
                      {isPending ? 'Saving...' : 'Create Assignments'}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Optional: Simple internal CSS for hover effect */}
      <style jsx>{`
        .hover-bg-light:hover {
          background-color: rgba(0, 0, 0, 0.03);
        }
        .cursor-pointer {
          cursor: pointer;
        }
      `}</style>
    </div>
  )
}
