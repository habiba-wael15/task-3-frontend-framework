import React from 'react';

export default function Header() {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  });

  return (
    <header className="app-header">
      <div className="header-brand">
        <div className="brand-icon-wrapper" aria-hidden="true">
          <svg
            className="brand-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
        </div>
        <div>
          <div className="brand-title-row">
            <h1 className="brand-title">TaskFlow</h1>
            <span className="badge-internship">Saiket Internship • Task 3</span>
          </div>
          <p className="brand-subtitle">Smart, minimalist task & productivity workspace</p>
        </div>
      </div>

      <div className="header-meta">
        <div className="date-pill" title="Current Date">
          <svg
            className="meta-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          <span>{today}</span>
        </div>
      </div>
    </header>
  );
}

