
'use client'

import { useActionState, useEffect, useState, Suspense } from 'react'
import { LoginAction } from '@/app/action/LoginAction'
import Link from 'next/link'
import { useSearchParams, useRouter } from 'next/navigation'

function LoginContent() {
  // state will capture the { error: ... } returned from your LoginAction
  const [state, formAction] = useActionState(LoginAction, null)
  const searchParams = useSearchParams()
  const router = useRouter()
  const [message, setMessage] = useState('')
  const [username, setUsername] = useState('')
  const [role, setRole] = useState('Staff')
  const [clientError, setClientError] = useState('')

  useEffect(() => {
    if (searchParams.get('message') === 'PasswordUpdated') {
      setMessage('Password updated successfully! Please login.')
    }
  }, [searchParams])

  const handleForgotPassword = () => {
    if (!username.trim()) {
      setClientError('Please enter your Username / ID to reset password.')
      return
    }
    setClientError('')
    router.push(`/forgot-password?identifier=${encodeURIComponent(username)}&role=${role}`)
  }

  return (
    <div className='container d-flex justify-content-center align-items-center vh-100'>
      <div
        className='card shadow-lg border-0 rounded-4 bg-body p-4 border border-secondary-subtle'
        style={{ maxWidth: '450px', width: '100%' }}
      >
        <div className='text-center mb-4'>
          {/* Logo/Title matching your Dashboard */}
          <div
            className='d-inline-flex align-items-center justify-content-center bg-primary text-white rounded-circle mb-3'
            style={{ width: '60px', height: '60px' }}
          >
            <i className='bi bi-mortarboard-fill fs-2'></i>
          </div>
          <h3 className='fw-bold text-body'>Mentor-Pro Login</h3>
          <p className='text-body-secondary small'>
            Student Mentoring Management System
          </p>
        </div>

        <form action={formAction}>
          {/* Success Message Alert */}
          {message && (
            <div className='alert alert-success py-2 small text-center rounded-3 border-success-subtle'>
              <i className='bi bi-check-circle-fill me-2'></i>
              {message}
            </div>
          )}

          {/* Validation Error Alert (Server) */}
          {state?.error && !clientError && (
            <div className='alert alert-danger py-2 small text-center rounded-3 border-danger-subtle'>
              <i className='bi bi-exclamation-triangle-fill me-2'></i>
              {state.error}
            </div>
          )}

          {/* Validation Error Alert (Client) */}
          {clientError && (
            <div className='alert alert-danger py-2 small text-center rounded-3 border-danger-subtle'>
              <i className='bi bi-exclamation-triangle-fill me-2'></i>
              {clientError}
            </div>
          )}

          {/* Role Selection: Radio buttons determine which table to query */}
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

          {/* Username / ID: Maps to EnrollmentNo or Email/Mobile */}
          <div className='mb-3'>
            <label className='form-label fw-bold text-body small text-uppercase'>
              Username / ID
            </label>
            <div className='input-group'>
              <span className='input-group-text bg-body-tertiary border-secondary-subtle text-body-secondary'>
                <i className='bi bi-person'></i>
              </span>
              <input
                type='text'
                name='username'
                className='form-control bg-body-tertiary border-secondary-subtle text-body rounded-end-3'
                placeholder='Enrollment No or Email'
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className='form-text small text-body-secondary'>
              Use Enrollment No for Student, Email for Staff.
            </div>
          </div>

          {/* Password field */}
          <div className='mb-4'>
            <label className='form-label fw-bold text-body small text-uppercase'>
              Password
            </label>
            <div className='input-group'>
              <span className='input-group-text bg-body-tertiary border-secondary-subtle text-body-secondary'>
                <i className='bi bi-lock'></i>
              </span>
              <input
                type='password'
                name='password'
                className='form-control bg-body-tertiary border-secondary-subtle text-body rounded-end-3'
                placeholder='••••••••'
                required
              />
            </div>
          </div>

          {/* Login Actions */}
          <div className='d-grid gap-2'>
            <button
              type='submit'
              className='btn btn-primary rounded-pill py-2 fw-bold shadow-sm'
            >
              Sign In
            </button>
            <button
              type='button'
              onClick={handleForgotPassword}
              className='btn btn-link text-decoration-none text-body-secondary small fw-bold mt-2'
            >
              Forgot Password?
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="container d-flex justify-content-center align-items-center vh-100">Loading...</div>}>
      <LoginContent />
    </Suspense>
  )
}

