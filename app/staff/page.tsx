import React from 'react'
import { prisma } from '@/app/lib/prisma'
import Link from 'next/link'
import DeleteStaff from '@/app/action/DeleteStaff'
import DeleteBtn from '@/app/ui/DeleteBtn'

export default async function StaffDirectory () {
  const data = await prisma.staff.findMany({
    include: { studentmentor: true },
    orderBy: { StaffName: 'asc' }
  })

  return (
    <div className='container py-5'>
      <div className='d-flex justify-content-between align-items-center mb-4'>
        <h2 className='fw-bold text-body'>Faculty Staff Directory</h2>
        <Link
          href='/staff/add'
          className='btn btn-primary rounded-pill px-4 fw-bold shadow-sm'
        >
          <i className='bi bi-person-plus-fill me-2'></i>Add Staff
        </Link>
      </div>

      <div className='row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4'>
        {data.map(member => (
          <div className='col' key={member.StaffID}>
            <div className='card h-100 shadow-sm border-0 bg-body rounded-4'>
              <div className='card-header bg-dark text-white d-flex justify-content-between align-items-center p-3 rounded-top-4 border-0'>
                <span className='fw-bold small text-uppercase tracking-wider'>
                  Staff ID: {member.StaffID}
                </span>
                <span className='badge bg-primary rounded-pill'>
                  {member.studentmentor?.length || 0} Mentees
                </span>
              </div>

              <div className='card-body p-4'>
                <h5 className='card-title fw-bold text-body mb-1'>
                  {member.StaffName}
                </h5>
                <p className='text-primary small mb-3'>
                  {member.EmailAddress || 'Email not provided'}
                </p>
                <hr className='opacity-25' />
                <div className='small'>
                  <div className='mb-2 text-body'>
                    <i className='bi bi-telephone-fill me-2 text-primary'></i>
                    <strong>Mobile:</strong> {member.MobileNo || 'N/A'}
                  </div>
                  <div className='text-body-secondary text-truncate-3 italic'>
                    {member.Description || 'No biography available.'}
                  </div>
                </div>
              </div>

              <div className='card-footer bg-transparent border-0 d-flex gap-2 p-3'>
                <Link
                  href={`/staff/${member.StaffID}`}
                  className='btn btn-outline-primary btn-sm flex-grow-1 rounded-pill fw-bold'
                >
                  View Dashboard
                </Link>
                <DeleteBtn deleteFn={DeleteStaff} id={member.StaffID} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
