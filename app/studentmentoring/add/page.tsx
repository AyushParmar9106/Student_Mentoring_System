import { AddMentoring } from '@/app/action/AddMentoring'
import Link from 'next/link'

export default async function RecordSession ({
  searchParams
}: {
  searchParams: Promise<{ assignmentId: string }>
}) {
  const { assignmentId } = await searchParams

  return (
    <div className='container py-5'>
      {/* Navigation Breadcrumb */}
      <nav aria-label='breadcrumb' className='mb-4'>
        <ol className='breadcrumb'>
          <li className='breadcrumb-item'>
            <Link
              href='/staff'
              className='text-body-secondary text-decoration-none'
            >
              Dashboard
            </Link>
          </li>
          <li
            className='breadcrumb-item active text-body fw-bold'
            aria-current='page'
          >
            New Mentoring Record
          </li>
        </ol>
      </nav>

      <div className='d-flex justify-content-between align-items-center mb-4'>
        <h2 className='fw-bold text-body mb-0'>Record Mentoring Session</h2>
        <span className='badge bg-primary-subtle text-primary border border-primary-subtle px-3 py-2 rounded-pill'>
          Assignment ID: {assignmentId}
        </span>
      </div>

      {/* Main Form Card: 
          Uses 'bg-body' and 'text-body' for automatic theme switching
      */}
      <form
        action={AddMentoring}
        className='card border-0 shadow-sm rounded-4 bg-body overflow-hidden'
      >
        <div className='card-header bg-dark py-3'>
          <h5 className='mb-0 text-white fw-bold'>Session Details</h5>
        </div>

        <div className='card-body p-4'>
          <input type='hidden' name='assignmentId' value={assignmentId} />

          <div className='row g-4'>
            {/* Core Metrics Section */}
            <div className='col-md-4'>
              <label className='form-label text-body-secondary small fw-bold text-uppercase'>
                Date of Mentoring
              </label>
              <input
                type='date'
                name='date'
                className='form-control bg-body-tertiary border-secondary-subtle text-body rounded-3'
                required
              />
            </div>

            <div className='col-md-4'>
              <label className='form-label text-body-secondary small fw-bold text-uppercase'>
                Attendance Status
              </label>
              <select
                name='attendance'
                className='form-select bg-body-tertiary border-secondary-subtle text-body rounded-3'
              >
                <option value='Present'>Present</option>
                <option value='Absent'>Absent</option>
              </select>
            </div>

            <div className='col-md-4'>
              <label className='form-label text-body-secondary small fw-bold text-uppercase'>
                Stress Level
              </label>
              <select
                name='stress'
                className='form-select bg-body-tertiary border-secondary-subtle text-body rounded-3'
              >
                <option value='Low'>Low</option>
                <option value='Medium'>Medium</option>
                <option value='High'>High</option>
              </select>
            </div>

            {/* Discussion Content */}
            <div className='col-12'>
              <label className='form-label text-body-secondary small fw-bold text-uppercase'>
                Mentoring Meeting Agenda
              </label>
              <textarea
                name='agenda'
                className='form-control bg-body-tertiary border-secondary-subtle text-body rounded-3'
                rows={2}
                placeholder='What objectives were planned for this session?'
              ></textarea>
            </div>

            <div className='col-12'>
              <label className='form-label text-body-secondary small fw-bold text-uppercase'>
                Issues Discussed
              </label>
              <textarea
                name='issues'
                className='form-control bg-body-tertiary border-secondary-subtle text-body rounded-3'
                rows={3}
                placeholder='Summary or list of topics discussed...'
              ></textarea>
            </div>

            {/* Student Profiling */}
            <div className='col-md-6'>
              <label className='form-label text-body-secondary small fw-bold text-uppercase'>
                Learner Type
              </label>
              <select
                name='learnerType'
                className='form-select bg-body-tertiary border-secondary-subtle text-body rounded-3'
              >
                <option value='Average'>Average Learner</option>
                <option value='Fast'>Fast Learner</option>
                <option value='Advanced'>Advanced Learner</option>
              </select>
            </div>

            <div className='col-md-6'>
              <label className='form-label text-body-secondary small fw-bold text-uppercase'>
                Next Follow-up Date
              </label>
              <input
                type='date'
                name='nextDate'
                className='form-control bg-body-tertiary border-secondary-subtle text-body rounded-3'
              />
            </div>

            {/* Mentor Feedback */}
            <div className='col-12'>
              <label className='form-label text-body-secondary small fw-bold text-uppercase'>
                Staff Opinion / Remarks
              </label>
              <textarea
                name='staffOpinion'
                className='form-control bg-body-tertiary border-secondary-subtle text-body rounded-3'
                rows={3}
                placeholder="Mentor's feedback or remarks on student progress..."
              ></textarea>
            </div>

            {/* Action Buttons */}
            <div className='col-12 mt-4 pt-3 border-top border-secondary-subtle d-flex gap-3'>
              <button
                type='submit'
                className='btn btn-dark px-5 py-2 rounded-pill fw-bold shadow-sm'
              >
                <i className='bi bi-check2-circle me-2'></i>Save Session Record
              </button>
              <Link
                href='/staff'
                className='btn btn-outline-secondary px-4 py-2 rounded-pill fw-bold'
              >
                Cancel
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
