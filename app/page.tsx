import React from "react";
import Link from "next/link";
import { prisma } from "./lib/prisma";
import Reminders from "./Components/Reminders";

export const dynamic = 'force-dynamic'; // Ensure real-time data

export default async function Home() {
  // Fetch real-time counts from the database
  const studentCount = await prisma.students.count();
  const staffCount = await prisma.staff.count();
  const mentoringMapCount = await prisma.studentmentor.count();
  const sessionCount = await prisma.studentmentoring.count();

  // Fetch session
  const { getSession } = await import("./lib/auth");
  const session = await getSession();

  const role = session?.user?.role;
  const isAdmin = role === 'Admin';
  const isStaff = role === 'Staff';
  const isStudent = role === 'Student';

  const menuItems = [
    {
      title: "Student Directory",
      description: "Manage detailed profiles, enrollment data, and contact info.",
      link: "/students",
      icon: "bi-people-fill",
      gradient: "linear-gradient(45deg, #0d6efd, #0dcaf0)",
      status: `${studentCount} Students Active`,
      allowed: isAdmin || isStaff, // Admin & Staff
    },
    {
      title: "Faculty Staff",
      description: "View staff directory and manage mentor profiles.",
      link: "/staff",
      icon: "bi-person-vcard-fill",
      gradient: "linear-gradient(45deg, #198754, #20c997)",
      status: `${staffCount} Mentors Loaded`,
      allowed: isAdmin, // Only Admin
    },
    {
      title: "Mentor Mapping",
      description: "Manage relationships between staff and assigned students.",
      link: "/studentmentor",
      icon: "bi-diagram-3-fill",
      gradient: "linear-gradient(135deg, #6610f2, #6f42c1)",
      status: `${mentoringMapCount} Relations Sync`,
      allowed: isAdmin, // Only Admin
    },
    {
      title: "Session Logs",
      description: "Full logs of mentoring sessions, attendance, and feedback.",
      link: "/studentmentoring",
      icon: "bi-journal-check",
      gradient: "linear-gradient(45deg, #fd7e14, #ffc107)",
      status: `${sessionCount} Sessions Logged`,
      allowed: true, // Everyone (Page logic must filter for Student)
    },
  ].filter(item => item.allowed);

  return (
    <div className="container-fluid min-vh-100 py-5 bg-body-tertiary px-4">
      <div className="container">
        {/* Portal Welcome Section */}
        <div className="row mb-5 align-items-center">
          <div className="col-md-8 text-center text-md-start">
            <h1 className="display-5 fw-bold text-body mb-2">
              Mentor<span className="text-primary">Pro</span> Portal
            </h1>
            <p className="lead text-secondary">
              Centralized management for the Student Mentoring lifecycle.
            </p>
          </div>
          <div className="col-md-4 text-md-end text-center mt-3 mt-md-0">
            {session ? (
              <div className="d-flex gap-2 justify-content-md-end justify-content-center align-items-center">
                <span className="fw-medium text-body me-2 d-none d-md-block">
                  Hello, {session.user?.name?.split(' ')[0]}
                  <small className="badge bg-secondary text-white ms-2 fw-normal">{session.user?.role}</small>
                </span>
                {session.user?.role === 'Student' && (
                  <Link href={`/students/${session.user.id}`} className="btn btn-outline-primary rounded-pill px-4 py-2 fw-bold shadow-sm">
                    <i className="bi bi-person-badge me-2"></i>My Profile
                  </Link>
                )}
                {session.user?.role === 'Staff' && !session.user?.isAdmin && (
                  <Link href={`/staff/${session.user.id}`} className="btn btn-outline-primary rounded-pill px-4 py-2 fw-bold shadow-sm">
                    <i className="bi bi-person-badge me-2"></i>My Profile
                  </Link>
                )}
              </div>
            ) : (
              <Link href="/Login" className="btn btn-primary rounded-pill px-4 py-2 fw-bold shadow-sm">
                <i className="bi bi-box-arrow-in-right me-2"></i>Sign In to Dashboard
              </Link>
            )}
          </div>
        </div>

        {/* Reminders Section */}
        <div className="row justify-content-center">
          <div className="col-12">
            <Reminders />
          </div>
        </div>


        {/* Dashboard Navigation Grid */}
        <div className="row g-4">
          {menuItems.map((item, index) => (
            <div className="col-md-6 col-lg-3" key={index}>
              <Link href={item.link} className="text-decoration-none h-100 d-block">
                <div className="card h-100 shadow-sm border-0 overflow-hidden card-hover transition-all bg-body">
                  <div style={{ height: "5px", background: item.gradient }}></div>
                  <div className="card-body p-4">
                    <div className="d-flex justify-content-between align-items-start mb-4">
                      <div className="p-3 rounded-4 bg-body-secondary shadow-sm">
                        <i className={`bi ${item.icon} fs-2`} style={{
                          background: item.gradient,
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                        }}></i>
                      </div>
                      <span className="badge bg-body-secondary text-secondary border border-secondary-subtle small px-2 py-1">
                        {item.status}
                      </span>
                    </div>
                    <h4 className="fw-bold mb-2 text-body">{item.title}</h4>
                    <p className="card-text text-body-secondary small mb-0">
                      {item.description}
                    </p>
                  </div>
                  <div className="card-footer bg-transparent border-0 px-4 pb-4">
                    <div className="d-flex align-items-center fw-bold text-primary small">
                      Access Records <i className="bi bi-chevron-right ms-1"></i>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}