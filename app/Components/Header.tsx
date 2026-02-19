"use client";

import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { usePathname } from "next/navigation";
import { LogoutAction } from "@/app/action/LogoutAction";

export default function Header() {
  const pathname = usePathname();
  const dateString = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <header className="sticky-top shadow-sm border-bottom bg-body">
      <nav className="navbar py-2">
        <div className="container">
          {/* Branding */}
          <Link
            href="/"
            className="navbar-brand d-flex align-items-center fw-bold"
          >
            <div
              className="bg-primary text-white rounded-3 p-1 me-2 d-flex align-items-center justify-content-center"
              style={{ width: "32px", height: "32px" }}
            >
              <i className="bi bi-mortarboard-fill fs-5"></i>
            </div>
            <span className="text-body d-flex align-items-center">
              MENTOR-PRO
              <span
                className="vr mx-2 text-muted opacity-25 d-none d-sm-inline"
                style={{ height: "15px" }}
              ></span>
              <small className="text-muted fw-normal d-none d-smin this -inline">
                Portal
              </small>
            </span>
          </Link>

          {/* Right Side Items */}
          <div className="d-flex align-items-center gap-3">
            <small
              className="text-muted fw-medium d-none d-lg-block"
              suppressHydrationWarning
            >
              <i className="bi bi-calendar3 me-2 text-primary small"></i>
              {dateString}
            </small>

            <div
              className="vr text-muted opacity-25 d-none d-lg-block"
              style={{ height: "24px" }}
            ></div>

            <ThemeToggle />

            {pathname !== '/Login' && (
              <form action={LogoutAction}>
                <button type="submit" className="btn btn-outline-danger btn-sm">
                  <i className="bi bi-box-arrow-right me-1"></i>Logout
                </button>
              </form>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
