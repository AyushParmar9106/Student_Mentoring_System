'use client'

import { useActionState } from 'react'
import { LoginAction } from '@/app/action/LoginAction'
import Link from 'next/link'

export default function LoginPage () {
  // state will capture the { error: ... } returned from your LoginAction [cite: 9]
  const [state, formAction] = useActionState(LoginAction, null)

  return (
    <div className='container d-flex justify-content-center align-items-center vh-100'>
      <div
        className='card shadow-lg border-0 rounded-4 bg-body p-4 border border-secondary-subtle'
        style={{ maxWidth: '450px', width: '100%' }}
      >
        <div className='text-center mb-4'>
          {/* Logo/Title matching your Dashboard [cite: 3] */}
          <div
            className='d-inline-flex align-items-center justify-content-center bg-primary text-white rounded-circle mb-3'
            style={{ width: '60px', height: '60px' }}
          >
            <i className='bi bi-mortarboard-fill fs-2'></i>
          </div>
          <h3 className='fw-bold text-body'>Mentor-Pro Login</h3>
          <p className='text-body-secondary small'>
            Student Mentoring Management System [cite: 3]
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

          {/* Role Selection: Radio buttons determine which table to query [cite: 9, 40, 43] */}
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
                defaultChecked
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
              />
              <label
                className='form-check-label text-body fw-medium'
                htmlFor='roleStudent'
              >
                Student
              </label>
            </div>
          </div>

          {/* Username / ID: Maps to EnrollmentNo or Email/Mobile [cite: 40, 43] */}
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
              />
            </div>
            <div className='form-text small text-body-secondary'>
              Use Enrollment No for Student, Email for Staff.
            </div>
          </div>

          {/* Password field [cite: 40, 43] */}
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
