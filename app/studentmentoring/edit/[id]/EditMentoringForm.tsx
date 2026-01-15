'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { editStudentMentoring } from '@/app/action/editStudentMentoring'

/* ---------- Helper: Safe Date Formatter for <input type="date"> ---------- */
const formatDate = (date: any) =>
  date ? new Date(date).toISOString().split('T')[0] : ''

export default function EditMentoringForm ({ assignment }: { assignment: any }) {
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  /* ---------- Safety Loader ---------- */
  if (!assignment) {
    return (
      <div className='container py-5 text-center'>
        <div className='spinner-border text-primary'></div>
        <p className='mt-2'>Loading mentoring record...</p>
      </div>
    )
  }

  /* ---------- Client Validation Wrapper ---------- */
  async function clientAction (formData: FormData) {
    const mentoringDate = formData.get('date') as string
    const nextDate = formData.get('nextDate') as string

    if (mentoringDate && nextDate) {
      if (new Date(nextDate) < new Date(mentoringDate)) {
        setError('Next Follow-up Date cannot be earlier than Mentoring Date.')
        window.scrollTo({ top: 0, behavior: 'smooth' })
        return
      }
    }

    setError(null)
    setIsSubmitting(true)

    try {
      await editStudentMentoring(formData)
    } catch {
      setError('Something went wrong while updating the record.')
      setIsSubmitting(false)
    }
  }

  return (
    <div className='container py-5'>
      {/* ---------- Error Alert ---------- */}
      {error && (
        <div className='alert alert-danger shadow-sm rounded-3'>
          <i className='bi bi-exclamation-triangle-fill me-2'></i>
          {error}
        </div>
      )}

      {/* ---------- Main Card ---------- */}
      <div
        className='card shadow-lg border-0 rounded-4 mx-auto'
        style={{ maxWidth: 900 }}
      >
        {/* Header */}
        <div className='card-header bg-primary text-white d-flex justify-content-between align-items-center p-4'>
          <h5 className='fw-bold mb-0'>
            <i className='bi bi-pencil-square me-2'></i>
            Edit Mentoring Session
          </h5>
          <span className='badge bg-light text-primary'>
            ID #{assignment.StudentMentoringID}
          </span>
        </div>

        <form action={clientAction}>
          <div className='card-body p-4 p-md-5'>
            {/* Hidden ID */}
            <input
              type='hidden'
              name='StudentMentoringID'
              value={assignment.StudentMentoringID}
            />

            {/* ===== Session Details ===== */}
            <h6 className='text-primary fw-bold mb-3'>
              <i className='bi bi-calendar-event me-2'></i>
              Session Details
            </h6>

            <div className='row g-4'>
              <div className='col-md-4'>
                <label className='form-label fw-semibold'>Mentoring Date</label>
                <input
                  type='date'
                  name='date'
                  className='form-control'
                  defaultValue={formatDate(assignment.DateOfMentoring)}
                  required
                />
              </div>

              <div className='col-md-4'>
                <label className='form-label fw-semibold'>Attendance</label>
                <select
                  name='attendance'
                  className='form-select'
                  defaultValue={assignment.AttendanceStatus}
                >
                  <option value='Present'>Present</option>
                  <option value='Absent'>Absent</option>
                </select>
              </div>

              <div className='col-md-4'>
                <label className='form-label fw-semibold'>Stress Level</label>
                <select
                  name='stress'
                  className='form-select'
                  defaultValue={assignment.StressLevel}
                >
                  <option value='Low'>Low</option>
                  <option value='Medium'>Medium</option>
                  <option value='High'>High</option>
                </select>
              </div>
            </div>

            <hr className='my-4' />

            {/* ===== Discussion ===== */}
            <h6 className='text-primary fw-bold mb-3'>
              <i className='bi bi-chat-left-text me-2'></i>
              Discussion Summary
            </h6>

            <div className='mb-3'>
              <label className='form-label fw-semibold'>Meeting Agenda</label>
              <input
                type='text'
                name='agenda'
                className='form-control'
                defaultValue={assignment.MentoringMeetingAgenda || ''}
                required
              />
            </div>

            <div className='mb-3'>
              <label className='form-label fw-semibold'>Issues Discussed</label>
              <textarea
                name='issues'
                className='form-control'
                rows={3}
                defaultValue={assignment.IssuesDiscussed || ''}
              />
            </div>

            <hr className='my-4' />

            {/* ===== Follow-up ===== */}
            <h6 className='text-primary fw-bold mb-3'>
              <i className='bi bi-arrow-repeat me-2'></i>
              Follow-up & Remarks
            </h6>

            <div className='row g-4'>
              <div className='col-md-6'>
                <label className='form-label fw-semibold'>Learner Type</label>
                <select
                  name='learnerType'
                  className='form-select'
                  defaultValue={assignment.LearnerType}
                >
                  <option value='Average'>Average</option>
                  <option value='Fast'>Fast</option>
                  <option value='Advanced'>Advanced</option>
                </select>
              </div>

              <div className='col-md-6'>
                <label className='form-label fw-semibold'>
                  Next Follow-up Date
                </label>
                <input
                  type='date'
                  name='nextDate'
                  className='form-control'
                  defaultValue={formatDate(assignment.NextMentoringDate)}
                />
              </div>
            </div>

            <div className='mt-3'>
              <label className='form-label fw-semibold'>Staff Opinion</label>
              <textarea
                name='staffOpinion'
                className='form-control'
                rows={3}
                defaultValue={assignment.StaffOpinion || ''}
              />
            </div>
          </div>

          {/* Footer */}
          <div className='card-footer bg-dark d-flex justify-content-end gap-3 p-4'>
            <Link
              href='/studentmentoring'
              className='btn btn-outline-secondary'
            >
              Cancel
            </Link>

            <button
              type='submit'
              disabled={isSubmitting}
              className='btn btn-primary px-4'
            >
              {isSubmitting ? (
                <>
                  <span className='spinner-border spinner-border-sm me-2'></span>
                  Updating...
                </>
              ) : (
                'Update Record'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
