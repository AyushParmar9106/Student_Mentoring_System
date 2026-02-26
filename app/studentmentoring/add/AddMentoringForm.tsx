'use client'

import { useState } from 'react'
import Link from 'next/link'
import { AddMentoring } from '@/app/action/AddMentoring'
import { UploadButton } from '@/app/utils/uploadthing'

export default function AddMentoringForm({ assignmentId }: { assignmentId: number }) {
    const [isParentVisible, setIsParentVisible] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [uploadedFileUrl, setUploadedFileUrl] = useState<string | null>(null)

    // Wrapper to handle submit loading state
    async function handleSubmit(formData: FormData) {
        setIsSubmitting(true)
        await AddMentoring(formData)
    }

    return (
        <form action={handleSubmit} className='card border-0 shadow-sm rounded-4 bg-body overflow-hidden'>
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

                    <div className='col-12'>
                        <label className='form-label text-body-secondary small fw-bold text-uppercase'>
                            Student Opinion
                        </label>
                        <textarea
                            name='studentOpinion'
                            className='form-control bg-body-tertiary border-secondary-subtle text-body rounded-3'
                            rows={2}
                            placeholder="Student's feedback on the session..."
                        />
                    </div>

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

                    {/* Conditional Parent Fields with Animation Effect */}
                    {isParentVisible && (
                        <div className='col-12 animate-fade-in'>
                            <div className='p-4 bg-primary-subtle bg-opacity-10 rounded-4 border border-primary border-opacity-25'>
                                <div className='d-flex align-items-center mb-3 text-primary'>
                                    <i className='bi bi-info-circle-fill me-2'></i>
                                    <span className='small fw-bold text-uppercase'>Parent Details Required</span>
                                </div>
                                <div className='row g-3'>
                                    <div className='col-md-6'>
                                        <label className='form-label small fw-bold text-body-secondary'>Parent Name</label>
                                        <div className="input-group">
                                            <span className="input-group-text bg-body border-secondary-subtle text-secondary"><i className="bi bi-person"></i></span>
                                            <input
                                                type='text'
                                                name='parentName'
                                                className='form-control bg-body border-secondary-subtle'
                                                placeholder="e.g. Mr. John Doe"
                                            />
                                        </div>
                                    </div>
                                    <div className='col-md-6'>
                                        <label className='form-label small fw-bold text-body-secondary'>Parent Mobile</label>
                                        <div className="input-group">
                                            <span className="input-group-text bg-body border-secondary-subtle text-secondary"><i className="bi bi-telephone"></i></span>
                                            <input
                                                type='text'
                                                name='parentMobile'
                                                className='form-control bg-body border-secondary-subtle'
                                                placeholder="+91 XXXXX XXXXX"
                                            />
                                        </div>
                                    </div>
                                    <div className='col-12'>
                                        <label className='form-label small fw-bold text-body-secondary'>Parent's Remarks / Discussion Points</label>
                                        <textarea
                                            name='parentOpinion'
                                            className='form-control bg-body border-secondary-subtle'
                                            rows={2}
                                            placeholder="Record the key points discussed with the parent..."
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

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

                    {/* File Upload via Uploadthing */}
                    <div className='col-12'>
                        <label className='form-label text-body-secondary small fw-bold text-uppercase'>
                            Supporting Documents (Optional)
                        </label>
                        {uploadedFileUrl ? (
                            <div className="mb-3 p-3 bg-success-subtle rounded-3 border border-success d-flex justify-content-between align-items-center">
                                <div>
                                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                                    <span className="fw-bold text-success">File Uploaded Successfully!</span>
                                </div>
                                <a href={uploadedFileUrl} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-success">View</a>
                            </div>
                        ) : (
                            <UploadButton
                                endpoint="pdfUploader"
                                onClientUploadComplete={(res) => {
                                    if (res && res[0]) {
                                        setUploadedFileUrl(res[0].url)
                                        alert("Upload Completed")
                                    }
                                }}
                                onUploadError={(error: Error) => {
                                    alert(`ERROR! ${error.message}`)
                                }}
                                className="mt-2 text-start ut-button:bg-dark ut-button:ut-readying:bg-secondary"
                            />
                        )}
                        <input type="hidden" name="fileUrl" value={uploadedFileUrl || ''} />
                    </div>

                    {/* Action Buttons */}
                    <div className='col-12 mt-4 pt-3 border-top border-secondary-subtle d-flex gap-3'>
                        <button
                            type='submit'
                            disabled={isSubmitting}
                            className='btn btn-dark px-5 py-2 rounded-pill fw-bold shadow-sm'
                        >
                            <i className='bi bi-check2-circle me-2'></i>
                            {isSubmitting ? 'Saving...' : 'Save Session Record'}
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
    )
}
