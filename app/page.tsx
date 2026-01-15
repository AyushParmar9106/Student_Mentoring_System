"use client";

import React from "react";
import Link from "next/link";

// In a real Server Component, you would fetch these from Prisma
export default function Home() {
  const menuItems = [
    {
      title: "Student Directory",
      description: "Manage detailed profiles, enrollment data, and contact info.",
      link: "/students",
      icon: "bi-people-fill",
      gradient: "linear-gradient(45deg, #0d6efd, #0dcaf0)",
      status: "Database Active",
    },
    {
      title: "Faculty Staff",
      description: "View staff directory and manage mentor profiles.",
      link: "/staff",
      icon: "bi-person-vcard-fill",
      gradient: "linear-gradient(45deg, #198754, #20c997)",
      status: "Mentors Loaded",
    },
    {
      title: "Mentor Mapping",
      description: "Manage relationships between staff and assigned students.",
      link: "/studentmentor",
      icon: "bi-diagram-3-fill",
      gradient: "linear-gradient(135deg, #6610f2, #6f42c1)",
      status: "Relational Sync",
    },
    {
      title: "Session Logs",
      description: "Full logs of mentoring sessions, attendance, and feedback.",
      link: "/studentmentoring",
      icon: "bi-journal-check",
      gradient: "linear-gradient(45deg, #fd7e14, #ffc107)",
      status: "History Online",
    },
  ];

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
             <Link href="/Login" className="btn btn-primary rounded-pill px-4 py-2 fw-bold shadow-sm">
                <i className="bi bi-box-arrow-in-right me-2"></i>Sign In to Dashboard
             </Link>
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

      <style jsx global>{`
        .card-hover:hover {
          transform: translateY(-8px);
          box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.15) !important;
          border: 1px solid rgba(13, 110, 253, 0.25) !important;
        }
        .transition-all {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>
    </div>
  );
}