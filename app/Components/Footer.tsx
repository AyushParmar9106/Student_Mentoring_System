"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-body border-top mt-auto pt-5 pb-3 shadow-sm">
      <div className="container">
        <div className="row g-4 mb-5">
          {/* Brand & Mission */}
          <div className="col-lg-5">
            <div className="pe-lg-5">
              <div className="d-flex align-items-center mb-4">
                <div className="bg-primary bg-gradient text-white rounded-3 p-2 me-3 shadow-sm d-flex align-items-center justify-content-center" style={{ width: "40px", height: "40px" }}>
                  <i className="bi bi-shield-check fs-4"></i>
                </div>
                <h4 className="fw-bold text-body mb-0 tracking-tight">MENTOR<span className="text-primary">-PRO</span></h4>
              </div>
              <p className="text-body-secondary mb-4 leading-relaxed">
                Empowering academic success through structured guidance. We bridge the gap between ambitious students and experienced mentors to build a resilient educational community.
              </p>
              <div className="d-flex gap-2">
                {['facebook', 'linkedin', 'twitter-x', 'instagram'].map((social) => (
                  <a key={social} href="#" className="btn btn-sm btn-outline-secondary rounded-circle d-flex align-items-center justify-content-center social-icon" style={{ width: "36px", height: "36px" }}>
                    <i className={`bi bi-${social}`}></i>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Links Grid */}
          <div className="col-lg-7">
            <div className="row g-4">
              <div className="col-6 col-sm-4">
                <h6 className="fw-bold text-body text-uppercase smaller tracking-widest mb-4">Platform</h6>
                <ul className="list-unstyled d-grid gap-2">
                  <li><Link href="/" className="footer-nav-link">Dashboard</Link></li>
                  <li><Link href="/students" className="footer-nav-link">Student Hub</Link></li>
                  <li><Link href="/staff" className="footer-nav-link">Faculty Portal</Link></li>
                  <li><Link href="/studentmentor" className="footer-nav-link">Pairing Logs</Link></li>
                </ul>
              </div>
              
              <div className="col-6 col-sm-4">
                <h6 className="fw-bold text-body text-uppercase smaller tracking-widest mb-4">Resources</h6>
                <ul className="list-unstyled d-grid gap-2">
                  <li><a href="#" className="footer-nav-link">Mentoring Guide</a></li>
                  <li><a href="#" className="footer-nav-link">Stress Assessment</a></li>
                  <li><a href="#" className="footer-nav-link">Success Stories</a></li>
                  <li><a href="#" className="footer-nav-link">System Status</a></li>
                </ul>
              </div>

              <div className="col-12 col-sm-4">
                <h6 className="fw-bold text-body text-uppercase smaller tracking-widest mb-4">Office</h6>
                <p className="text-body-secondary small mb-2">
                  <i className="bi bi-geo-alt me-2 text-primary"></i> 
                  Academic Block A, 4th Floor
                </p>
                <p className="text-body-secondary small">
                  <i className="bi bi-envelope-at me-2 text-primary"></i>
                  support@mentorpro.edu
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-4 border-top border-secondary-subtle">
          <div className="row align-items-center text-center text-md-start">
            <div className="col-md-6 mb-3 mb-md-0">
              <span className="text-body-secondary smaller">
                © {new Date().getFullYear()} <span className="text-body fw-semibold">Mentor-Pro Academic Suite</span>. All rights reserved.
              </span>
            </div>
            <div className="col-md-6 text-md-end d-flex justify-content-center justify-content-md-end gap-3 smaller">
              <a href="#" className="text-body-secondary text-decoration-none hover-primary">Privacy</a>
              <span className="text-secondary-subtle">|</span>
              <a href="#" className="text-body-secondary text-decoration-none hover-primary">Terms</a>
              <span className="text-secondary-subtle">|</span>
              <span className="text-body-secondary italic opacity-75">Crafted by Ayush S. Parmar</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .smaller { font-size: 0.7rem; }
        .tracking-widest { letter-spacing: 0.15em; }
        .tracking-tight { letter-spacing: -0.02em; }
        .leading-relaxed { line-height: 1.7; }
        .footer-nav-link {
          text-decoration: none;
          color: var(--bs-body-secondary-color);
          font-size: 0.9rem;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          display: inline-block;
        }
        .footer-nav-link:hover {
          color: var(--bs-primary);
          transform: translateX(5px);
        }
        .social-icon {
          transition: all 0.3s ease;
          border-color: var(--bs-secondary-bg);
        }
        .social-icon:hover {
          background-color: var(--bs-primary);
          border-color: var(--bs-primary);
          color: white;
          transform: translateY(-3px);
          box-shadow: 0 4px 12px rgba(var(--bs-primary-rgb), 0.3);
        }
        .hover-primary:hover { color: var(--bs-primary) !important; }
      `}</style>
    </footer>
  );
}