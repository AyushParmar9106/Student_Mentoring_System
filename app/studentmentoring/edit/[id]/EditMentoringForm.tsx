'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { editStudentMentoring } from '@/app/action/editStudentMentoring'

/* ---------- Helper: Safe Date Formatter for <input type="date"> ---------- */
const formatDate = (date: any) =>
  date ? new Date(date).toISOString().split('T')[0] : ''

export default function EditMentoringForm({ assignment }: { assignment: any }) {
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isParentVisible, setIsParentVisible] = useState(assignment?.IsParentPresent || false)

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
  async function clientAction(formData: FormData) {
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

            <div className='mt-3'>
              <label className='form-label fw-semibold'>Student Opinion</label>
              <textarea
                name='studentOpinion'
                className='form-control'
                rows={2}
                placeholder="Student's feedback on the session..."
                defaultValue={assignment.StudentsOpinion || ''}
              />
            </div>

            <hr className='my-4' />

            {/* ===== Parent Involvement ===== */}
            <h6 className='text-primary fw-bold mb-3'>
              <i className='bi bi-people me-2'></i>
              Parent Interaction
            </h6>

            {/* Parent Involvement Selection */}
            <div className='col-12'>
              <label className='form-label text-body-secondary small fw-bold text-uppercase d-block mb-3'>
                Parent / Guardian Interaction
              </label>
              <div className="d-flex gap-3 mb-3">
                <div
                  onClick={() => setIsParentVisible(false)}
                  className={`flex-grow-1 p-3 rounded-3 border text-center cursor-pointer transition-all ${!isParentVisible ? 'bg-dark text-white border-dark ring-2 ring-offset-2' : 'bg-body-tertiary text-body border-secondary-subtle'}`}
                  style={{ cursor: 'pointer', transition: 'all 0.2s ease' }}
                >
                  <div className="d-flex align-items-center justify-content-center gap-2">
                    <i className={`bi ${!isParentVisible ? 'bi-person-x-fill' : 'bi-person-x'} fs-5`}></i>
                    <span className="fw-bold">Not Present</span>
                  </div>
                </div>

                <div
                  onClick={() => setIsParentVisible(true)}
                  className={`flex-grow-1 p-3 rounded-3 border text-center cursor-pointer transition-all ${isParentVisible ? 'bg-primary text-white border-primary shadow' : 'bg-body-tertiary text-body border-secondary-subtle'}`}
                  style={{ cursor: 'pointer', transition: 'all 0.2s ease' }}
                >
                  <div className="d-flex align-items-center justify-content-center gap-2">
                    <i className={`bi ${isParentVisible ? 'bi-people-fill' : 'bi-people'} fs-5`}></i>
                    <span className="fw-bold">Parent Present</span>
                  </div>
                </div>
              </div>
              {/* Hidden input to maintain server action compatibility */}
              <input type="hidden" name="isParentPresent" value={isParentVisible ? 'on' : 'off'} />
            </div>

            {isParentVisible && (
              <div className='p-3 bg-body-tertiary rounded-3 border border-secondary-subtle'>
                <div className='row g-3'>
                  <div className='col-md-6'>
                    <label className='form-label small fw-bold'>Parent Name</label>
                    <input
                      type='text'
                      name='parentName'
                      className='form-control form-control-sm'
                      defaultValue={assignment.ParentName || ''}
                    />
                  </div>
                  <div className='col-md-6'>
                    <label className='form-label small fw-bold'>Parent Mobile</label>
                    <input
                      type='text'
                      name='parentMobile'
                      className='form-control form-control-sm'
                      defaultValue={assignment.ParentMobileNo || ''}
                    />
                  </div>
                  <div className='col-12'>
                    <label className='form-label small fw-bold'>Parent's Remarks</label>
                    <textarea
                      name='parentOpinion'
                      className='form-control form-control-sm'
                      rows={2}
                      defaultValue={assignment.ParentsOpinion || ''}
                    />
                  </div>
                </div>
              </div>
            )}

            <hr className='my-4' />

            {/* ===== File Upload ===== */}
            <h6 className='text-primary fw-bold mb-3'>
              <i className='bi bi-paperclip me-2'></i>
              Supporting Documents
            </h6>

            <div className='mb-3'>
              {assignment.MentoringDocument && (
                <div className="mb-3 p-3 bg-body-tertiary rounded-3 border border-secondary-subtle d-flex justify-content-between align-items-center">
                  <div>
                    <span className="badge bg-secondary me-2">Current File</span>
                    <span className="small text-body-secondary text-break">{assignment.MentoringDocument.split('/').pop()}</span>
                  </div>
                  <a
                    href={assignment.MentoringDocument}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-sm btn-outline-primary"
                  >
                    <i className="bi bi-eye me-1"></i> View
                  </a>
                </div>
              )}

              <label className='form-label fw-semibold'>
                {assignment.MentoringDocument ? 'Replace Document' : 'Upload Document'}
              </label>
              <input
                type='file'
                name='file'
                className='form-control bg-body-tertiary border-secondary-subtle text-body'
                accept='.pdf,.doc,.docx,.jpg,.jpeg,.png'
              />
              <div className="form-text small">Accepted formats: PDF, Word, Image. (Max 5MB)</div>
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
