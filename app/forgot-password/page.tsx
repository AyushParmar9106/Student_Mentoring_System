
'use client'

import { useActionState, useEffect, useState, Suspense } from 'react'
import { forgotPassword } from '@/app/action/forgotPassword'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

function ForgotPasswordContent() {
    const [state, formAction, isPending] = useActionState(forgotPassword, null)
    const searchParams = useSearchParams()

    // Get values from query params
    const paramRole = searchParams.get('role') || 'Staff'
    const paramIdentifier = searchParams.get('identifier') || ''

    const [role, setRole] = useState(paramRole)
    const [identifier, setIdentifier] = useState(paramIdentifier)

    // Update state if params change (though usually they are set on load)
    useEffect(() => {
        if (searchParams.get('role')) setRole(searchParams.get('role')!)
        if (searchParams.get('identifier')) setIdentifier(searchParams.get('identifier')!)
    }, [searchParams])

    return (
        <div className='container d-flex justify-content-center align-items-center vh-100'>
            <div
                className='card shadow-lg border-0 rounded-4 bg-body p-4 border border-secondary-subtle'
                style={{ maxWidth: '450px', width: '100%' }}
            >
                <div className='text-center mb-4'>
                    <div
                        className='d-inline-flex align-items-center justify-content-center bg-danger text-white rounded-circle mb-3'
                        style={{ width: '60px', height: '60px' }}
                    >
                        <i className='bi bi-key-fill fs-2'></i>
                    </div>
                    <h3 className='fw-bold text-body'>Reset Password</h3>
                    <p className='text-body-secondary small'>
                        Enter your details to reset your password.
                    </p>
                </div>

                <form action={formAction}>
                    {/* Validation Error Alert */}
                    {state?.error && (
                        <div className='alert alert-danger py-2 small text-center rounded-3 border-danger-subtle'>
                            <i className='bi bi-exclamation-triangle-fill me-2'></i>
                            {state.error}
                        </div>
                    )}

                    {/* Role Selection */}
                    <label className='form-label fw-bold text-body small text-uppercase mb-2'>
                        I am a:
                    </label>
                    <div className='d-flex gap-4 mb-4'>
                        <div className='form-check'>
                            <input
                                className='form-check-input shadow-none'
                                type='radio'
                                name='role'
                                id='roleStaff'
                                value='Staff'
                                checked={role === 'Staff'}
                                onChange={() => setRole('Staff')}
                            />
                            <label
                                className='form-check-label text-body fw-medium'
                                htmlFor='roleStaff'
                            >
                                Staff / Admin
                            </label>
                        </div>
                        <div className='form-check'>
                            <input
                                className='form-check-input shadow-none'
                                type='radio'
                                name='role'
                                id='roleStudent'
                                value='Student'
                                checked={role === 'Student'}
                                onChange={() => setRole('Student')}
                            />
                            <label
                                className='form-check-label text-body fw-medium'
                                htmlFor='roleStudent'
                            >
                                Student
                            </label>
                        </div>
                    </div>

                    {/* Identifier Input */}
                    <div className='mb-3'>
                        <label className='form-label fw-bold text-body small text-uppercase'>
                            Identifier
                        </label>
                        <div className='input-group'>
                            <span className='input-group-text bg-body-tertiary border-secondary-subtle text-body-secondary'>
                                <i className='bi bi-person-badge'></i>
                            </span>
                            <input
                                type='text'
                                name='identifier'
                                className='form-control bg-body-tertiary border-secondary-subtle text-body rounded-end-3'
                                placeholder='Enrollment No / Email / Mobile / Name'
                                required
                                value={identifier}
                                onChange={(e) => setIdentifier(e.target.value)}
                            />
                        </div>
                        <div className='form-text small text-body-secondary'>
                            Enter your Enrollment No, Email, Mobile No, or Full Name.
                        </div>
                    </div>

                    {/* New Password Input */}
                    <div className='mb-4'>
                        <label className='form-label fw-bold text-body small text-uppercase'>
                            New Password
                        </label>
                        <div className='input-group'>
                            <span className='input-group-text bg-body-tertiary border-secondary-subtle text-body-secondary'>
                                <i className='bi bi-lock'></i>
                            </span>
                            <input
                                type='password'
                                name='newPassword'
                                className='form-control bg-body-tertiary border-secondary-subtle text-body rounded-end-3'
                                placeholder='Enter new password'
                                required
                            />
                        </div>
                    </div>

                    {/* Actions */}
                    <div className='d-grid gap-2'>
                        <button
                            type='submit'
                            disabled={isPending}
                            className='btn btn-danger rounded-pill py-2 fw-bold shadow-sm'
                        >
                            {isPending ? 'Resetting...' : 'Reset Password'}
                        </button>
                        <Link
                            href='/Login'
                            className='btn btn-link text-decoration-none text-body-secondary small fw-bold mt-2'
                        >
                            ← Back to Login
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default function ForgotPasswordPage() {
    return (
        <Suspense fallback={<div className="container d-flex justify-content-center align-items-center vh-100">Loading...</div>}>
            <ForgotPasswordContent />
        </Suspense>
    )
}
