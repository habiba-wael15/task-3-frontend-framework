import React from 'react';

export default function TaskStats({ total, active, completed }) {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <section className="stats-container" aria-label="Task statistics overview">
      <div className="stat-card">
        <div className="stat-icon-wrapper stat-total" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
            <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
          </svg>
        </div>
        <div className="stat-content">
          <span className="stat-label">Total Tasks</span>
          <span className="stat-value">{total}</span>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon-wrapper stat-active" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
        </div>
        <div className="stat-content">
          <span className="stat-label">In Progress</span>
          <span className="stat-value">{active}</span>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon-wrapper stat-completed" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        </div>
        <div className="stat-content">
          <span className="stat-label">Completed</span>
          <span className="stat-value">{completed}</span>
        </div>
      </div>

      <div className="stat-card stat-progress-card">
        <div className="stat-progress-header">
          <span className="stat-label">Completion Rate</span>
          <span className="stat-percentage">{percentage}%</span>
        </div>
        <div
          className="progress-bar-bg"
          role="progressbar"
          aria-valuenow={percentage}
          aria-valuemin="0"
          aria-valuemax="100"
          aria-label="Overall task completion progress"
        >
          <div
            className="progress-bar-fill"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </section>
  );
}

