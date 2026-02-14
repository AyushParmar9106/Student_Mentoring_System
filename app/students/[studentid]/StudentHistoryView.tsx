'use client'

import React from 'react'
import Link from 'next/link'

export default function StudentHistoryView ({ student }: { student: any }) {
  const assignment = student.studentmentor?.[0]
  const totalMeetings = assignment?.studentmentoring?.length || 0
  const latestSession = assignment?.studentmentoring?.[0]

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
                    {assignment?.staff?.StaffName || 'N/A'}
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
                    className={`badge rounded-pill ${
                      latestSession?.StressLevel === 'High'
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

            {assignment?.studentmentoring?.map((m: any, index: number) => (
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
                          className={`badge ${
                            m.AttendanceStatus === 'Present'
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
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* PDF Footer Information - Signature blocks */}
          <div className='mt-5 pt-5 text-center border-top border-secondary-subtle d-none d-print-block'>
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
          </div>
        </div>
      </div>

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
