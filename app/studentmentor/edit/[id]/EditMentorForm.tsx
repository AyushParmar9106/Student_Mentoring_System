'use client' // This solves the 'styled-jsx' Server Component error

import React from 'react'
import Link from 'next/link'
import { editStudentMentor } from '@/app/action/editStudentMentor'

export default function EditMentorForm ({ assignment }: { assignment: any }) {
  // SAFETY CHECK: This solves the 'Cannot read StudentMentorID of undefined' error
  if (!assignment) {
    return (
      <div className='container py-5 text-center text-body'>
        <div className='spinner-border text-primary' role='status'></div>
        <p className='mt-2'>Loading assignment data...</p>
      </div>
    )
  }

  return (
    <div className='container py-5'>
      <div
        className='card shadow-lg border-0 rounded-4 bg-body border border-secondary-subtle overflow-hidden mx-auto'
        style={{ maxWidth: '850px' }}
      >
        <div className='card-header bg-primary text-white p-4'>
          <h4 className='fw-bold mb-0'>Edit Assignment</h4>
        </div>

        <div className='card-body p-4 p-md-5'>
          <form action={editStudentMentor}>
            {/* Optional Chaining (?.) for safe property access */}
            <input
              type='hidden'
              name='StudentMentorID'
              value={assignment?.StudentMentorID}
            />

            <div className='row g-4 text-body'>
              <div className='col-md-6'>
                <label className='form-label fw-bold small text-uppercase'>
                  From Date
                </label>
                <input
                  type='date'
                  name='FromDate'
                  defaultValue={
                    assignment?.FromDate
                      ? new Date(assignment.FromDate)
                          .toISOString()
                          .split('T')[0]
                      : ''
                  }
                  className='form-control bg-body-tertiary border-secondary-subtle text-body shadow-none'
                  required
                />
              </div>

              <div className='col-md-6'>
                <label className='form-label fw-bold small text-uppercase'>
                  To Date
                </label>
                <input
                  type='date'
                  name='ToDate'
                  defaultValue={
                    assignment?.ToDate
                      ? new Date(assignment.ToDate).toISOString().split('T')[0]
                      : ''
                  }
                  className='form-control bg-body-tertiary border-secondary-subtle text-body shadow-none'
                />
              </div>

              <div className='col-12'>
                <label className='form-label fw-bold small text-uppercase'>
                  Notes
                </label>
                <textarea
                  name='Description'
                  defaultValue={assignment?.Description || ''}
                  className='form-control bg-body-tertiary border-secondary-subtle text-body shadow-none'
                  rows={3}
                />
              </div>
            </div>

            <div className='d-flex justify-content-end gap-3 mt-4 border-top pt-4 border-secondary-subtle'>
              <Link
                href='/studentmentor'
                className='btn btn-outline-secondary rounded-pill px-4 fw-bold'
              >
                Cancel
              </Link>
              <button
                type='submit'
                className='btn btn-primary rounded-pill px-5 fw-bold shadow-sm'
              >
                Update Assignment
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
