'use client'

import React from 'react'
import Link from 'next/link'

export default function StudentHistoryView({ student }: { student: any }) {
  // Aggregate all mentoring sessions from all assignments
  const allSessions = student.studentmentor?.flatMap((assignment: any) => assignment.studentmentoring || []) || []

  // Sort by DateOfMentoring descending
  allSessions.sort((a: any, b: any) => new Date(b.DateOfMentoring).getTime() - new Date(a.DateOfMentoring).getTime())

  const totalMeetings = allSessions.length
  const latestSession = allSessions[0]

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className='container py-5'>
      {/* Action Header - Hidden during print */}
      <div className='d-flex justify-content-between align-items-center mb-4 d-print-none'>
        <div>
          <h2 className='fw-bold text-body mb-0'>Student Record Dashboard</h2>
          <Link
            href='/staff'
            className='text-body-secondary text-decoration-none small'
          >
            ← Back to Staff Directory
          </Link>
        </div>
        <div className='d-flex gap-2'>
          <button
            onClick={handlePrint}
            className='btn btn-primary rounded-pill px-4 shadow-sm'
          >
            <i className='bi bi-file-earmark-pdf me-2'></i>Download PDF / Print
          </button>
        </div>
      </div>

      {/* --- ADAPTIVE DOCUMENT VIEW STARTS HERE --- */}
      <div
        className='pdf-view bg-body border border-secondary-subtle rounded-4 shadow-lg overflow-hidden mx-auto'
        style={{ maxWidth: '1000px' }}
      >
        {/* Report Top Header - Remains primary for brand consistency */}
        <div className='bg-primary p-5 text-white text-center position-relative'>
          <div className='position-absolute top-0 end-0 p-3 opacity-25 d-print-none'>
            <i className='bi bi-shield-check fs-1'></i>
          </div>
          <h1 className='fw-bold text-uppercase tracking-widest mb-1'>
            Mentoring History Report
          </h1>
          <p className='mb-0 opacity-75'>Generated for Academic Year 2025-26</p>
        </div>

        <div className='p-4 p-md-5 bg-body'>

          {/* Upcoming Session Alert */}
          {latestSession?.NextMentoringDate && new Date(latestSession.NextMentoringDate) > new Date() && (
            <div className="alert alert-warning border-0 shadow-sm d-flex align-items-center mb-5 d-print-none" role="alert">
              <i className="bi bi-calendar-event-fill fs-3 me-3 text-warning-emphasis"></i>
              <div>
                <h5 className="alert-heading fw-bold text-warning-emphasis mb-1">
                  Upcoming Mentoring Session
                </h5>
                <p className="mb-0 text-body-secondary">
                  Scheduled for <strong className="text-body">{new Date(latestSession.NextMentoringDate).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</strong>.
                  <span className="ms-2 badge bg-warning text-dark rounded-pill">
                    {Math.ceil((new Date(latestSession.NextMentoringDate).getTime() - new Date().getTime()) / (1000 * 3600 * 24))} days left
                  </span>
                </p>
              </div>
            </div>
          )}

          {/* Summary Section */}
          <div className='row g-4 mb-5 pb-5 border-bottom border-secondary-subtle'>
            <div className='col-md-7'>
              <div className='d-flex align-items-center mb-4'>
                <div
                  className='bg-primary text-white rounded-circle d-flex align-items-center justify-content-center fw-bold fs-2 shadow'
                  style={{ width: '70px', height: '70px' }}
                >
                  {student.StudentName.charAt(0)}
                </div>
                <div className='ms-4'>
                  <h3 className='fw-bold text-body mb-0'>
                    {student.StudentName}
                  </h3>
                  <span className='text-body-secondary'>
                    {student.EnrollmentNo}
                  </span>
                </div>
              </div>

              <div className='row small'>
                <div className='col-6 mb-2 text-body'>
                  <label className='d-block text-body-secondary text-uppercase fw-bold smaller'>
                    Email Address
                  </label>
                  <span>{student.EmailAddress}</span>
                </div>
                <div className='col-6 mb-2 text-body'>
                  <label className='d-block text-body-secondary text-uppercase fw-bold smaller'>
                    Primary Mentor
                  </label>
                  <span className='text-primary fw-bold'>
                    {latestSession?.studentmentor?.staff?.StaffName || student.studentmentor?.[0]?.staff?.StaffName || 'N/A'}
                  </span>
                </div>
              </div>
            </div>

            <div className='col-md-5'>
              <div className='bg-body-tertiary p-4 rounded-4 border border-secondary-subtle h-100'>
                <div className='d-flex justify-content-between mb-3 border-bottom border-secondary-subtle pb-2 text-body'>
                  <span className='text-body-secondary small'>
                    Total Sessions
                  </span>
                  <span className='fw-bold'>{totalMeetings}</span>
                </div>
                <div className='d-flex justify-content-between mb-3 border-bottom border-secondary-subtle pb-2 text-body'>
                  <span className='text-body-secondary small'>
                    Last Stress Level
                  </span>
                  <span
                    className={`badge rounded-pill ${latestSession?.StressLevel === 'High'
                      ? 'bg-danger'
                      : 'bg-success'
                      }`}
                  >
                    {latestSession?.StressLevel || 'N/A'}
                  </span>
                </div>
                <div className='d-flex justify-content-between text-body'>
                  <span className='text-body-secondary small'>
                    Attendance %
                  </span>
                  <span className='fw-bold'>
                    {totalMeetings > 0 ? '92%' : '0%'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Mentoring Timeline Table View */}
          <div className='history-section'>
            <h5 className='text-body fw-bold mb-4 d-flex align-items-center'>
              <i className='bi bi-clock-history me-3 text-primary'></i>
              Chronological Session History
            </h5>

            {allSessions.map((m: any, index: number) => (
              <div
                key={m.StudentMentoringID}
                className='mb-5 position-relative ps-4 border-start border-primary border-opacity-25 page-break'
              >
                {/* Timeline Dot */}
                <div
                  className='position-absolute top-0 start-0 translate-middle-x bg-primary rounded-circle'
                  style={{ width: '12px', height: '12px', marginLeft: '-6px' }}
                ></div>

                <div className='card bg-body border border-secondary-subtle shadow-sm rounded-4 overflow-hidden'>
                  <div className='card-header bg-body-tertiary d-flex justify-content-between align-items-center py-2 border-bottom border-secondary-subtle'>
                    <span className='text-primary small fw-bold'>
                      Session #{totalMeetings - index}
                    </span>
                    <span className='text-body-secondary smaller'>
                      {new Date(m.DateOfMentoring).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                  <div className='card-body'>
                    <div className='row g-3'>
                      <div className='col-md-8'>
                        <h6 className='text-body fw-bold mb-1'>
                          {m.MentoringMeetingAgenda || 'General Counseling'}
                        </h6>
                        <p className='small text-body-secondary mb-3 italic'>
                          "{m.IssuesDiscussed}"
                        </p>
                      </div>
                      <div className='col-md-4 text-md-end border-start border-secondary-subtle'>
                        <span
                          className={`badge ${m.AttendanceStatus === 'Present'
                            ? 'text-success'
                            : 'text-danger'
                            } bg-transparent border border-secondary-subtle mb-2`}
                        >
                          {m.AttendanceStatus}
                        </span>
                      </div>
                    </div>

                    <div className='mt-3 p-3 bg-body-tertiary rounded-3 border border-secondary-subtle'>
                      <label className='d-block text-primary smaller text-uppercase fw-bold mb-1'>
                        Mentor's Final Advice
                      </label>
                      <span className='text-body small'>
                        {m.StaffOpinion || 'Pending mentor input.'}
                      </span>
                    </div>

                    {/* Student Feedback Section */}
                    {m.StudentsOpinion && (
                      <div className='mt-2 p-3 bg-body-tertiary rounded-3 border border-secondary-subtle border-start border-4 border-info'>
                        <label className='d-block text-info smaller text-uppercase fw-bold mb-1'>
                          Student Feedback
                        </label>
                        <span className='text-body small fst-italic'>
                          "{m.StudentsOpinion}"
                        </span>
                      </div>
                    )}

                    {/* Parent Interaction Section */}
                    {m.IsParentPresent ? (
                      <div className='mt-2 p-3 bg-warning-subtle rounded-3 border border-warning-subtle'>
                        <div className='d-flex justify-content-between align-items-center mb-1'>
                          <label className='text-warning-emphasis smaller text-uppercase fw-bold'>
                            <i className='bi bi-people-fill me-1'></i>
                            Parent Interaction
                          </label>
                          <span className='badge bg-warning text-dark border border-warning smaller'>
                            {m.ParentName} ({m.ParentMobileNo})
                          </span>
                        </div>
                        <span className='text-body small'>
                          {m.ParentsOpinion || 'No specific remarks recorded.'}
                        </span>
                      </div>
                    ) : (
                      <div className='mt-2 p-3 bg-body-tertiary rounded-3 border border-secondary-subtle border-start border-4 border-secondary opacity-75'>
                        <label className='d-block text-secondary smaller text-uppercase fw-bold mb-1'>
                          <i className='bi bi-people me-1'></i>
                          Parent Interaction
                        </label>
                        <span className='text-body-secondary small fst-italic'>
                          No parents review available in this session.
                        </span>
                      </div>
                    )}

                    {/* Supporting Documents Section */}
                    {m.MentoringDocument && (
                      <div className="mt-3 text-end d-print-none">
                        <a
                          href={m.MentoringDocument}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-sm btn-outline-secondary rounded-pill"
                        >
                          <i className="bi bi-paperclip me-1"></i> View Attached Document
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* PDF Footer Information - Signature blocks */}
          < div className='mt-5 pt-5 text-center border-top border-secondary-subtle d-none d-print-block' >
            <div className='row'>
              <div className='col-6'>
                <div className='mb-5 mt-4 border-bottom border-dark d-inline-block w-50'></div>
                <p className='smaller text-body-secondary'>Student Signature</p>
              </div>
              <div className='col-6'>
                <div className='mb-5 mt-4 border-bottom border-dark d-inline-block w-50'></div>
                <p className='smaller text-body-secondary'>
                  Mentor Official Seal
                </p>
              </div>
            </div>
            <p className='smaller text-body-secondary mt-5'>
              This is an electronically generated report from Mentor-Pro Portal.
            </p>
          </div >
        </div >
      </div >

      <style jsx global>{`
        .smaller {
          font-size: 0.75rem;
          letter-spacing: 0.05rem;
        }
        .tracking-widest {
          letter-spacing: 0.2rem;
        }
        .italic {
          font-style: italic;
        }

        @media print {
          nav,
          footer,
          .d-print-none,
          .btn,
          .theme-toggle {
            display: none !important;
          }
          body {
            background-color: white !important;
            color: black !important;
          }
          .pdf-view {
            max-width: 100% !important;
            border: none !important;
            box-shadow: none !important;
            background: white !important;
          }
          /* Reset colors for printing regardless of UI theme */
          .bg-body,
          .card,
          .bg-body-tertiary {
            background-color: white !important;
            color: black !important;
            border: 1px solid #ddd !important;
          }
          .text-body,
          .text-body-secondary,
          .text-primary,
          .text-secondary {
            color: black !important;
          }
          .bg-primary {
            background-color: #0d6efd !important;
            -webkit-print-color-adjust: exact;
          }
          .page-break {
            page-break-inside: avoid;
          }
        }
      `}</style>
    </div>
  )
}
