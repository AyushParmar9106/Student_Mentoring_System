"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return <div style={{ width: "56px", height: "28px" }}></div>;

  const isDark = theme === "dark";

  return (
    <div className="d-flex align-items-center">
      <label
        className="theme-switch"
        title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      >
        <input
          type="checkbox"
          checked={isDark}
          onChange={() => setTheme(isDark ? "light" : "dark")}
        />
        <div className="slider round">
          {/* Icons positioned inside the track */}
          <i className="bi bi-sun-fill icon-sun"></i>
          <i className="bi bi-moon-stars-fill icon-moon"></i>
        </div>
      </label>

      <style jsx>{`
        .theme-switch {
          position: relative;
          display: inline-block;
          width: 56px;
          height: 28px;
          margin-bottom: 0;
        }

        .theme-switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }

        .slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #495057; /* Darker track for better icon contrast */
          transition: 0.4s;
          border-radius: 34px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 6px;
        }

        /* The sliding circle */
        .slider:before {
          position: absolute;
          content: "";
          height: 20px;
          width: 20px;
          left: 4px;
          bottom: 4px;
          background-color: white;
          transition: 0.4s;
          border-radius: 50%;
          z-index: 2;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }

        /* Positioning the icons inside the track */
        .icon-sun {
          color: #ffc107;
          font-size: 12px;
          z-index: 1;
        }

        .icon-moon {
          color: #f8f9fa;
          font-size: 11px;
          z-index: 1;
        }

        /* Logic for active state */
        input:checked + .slider {
          background-color: #0d6efd;
        }

        input:checked + .slider:before {
          transform: translateX(28px);
        }

        /* Subtle hover effect */
        .theme-switch:hover .slider {
          filter: brightness(110%);
        }
      `}</style>
    </div>
  );
}
