import React from 'react';
import TaskItem from './TaskItem';

export default function TaskList({
  tasks,
  totalTasksCount,
  searchQuery,
  filter,
  categoryFilter,
  onResetFilters,
  onToggleComplete,
  onDeleteTask,
  onUpdateTask,
  onLoadSampleTasks,
}) {
  // Empty State 1: Absolutely no tasks in the whole app
  if (totalTasksCount === 0) {
    return (
      <section className="empty-state-card" aria-label="No tasks">
        <div className="empty-icon-wrapper" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 11l3 3L22 4" />
            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
          </svg>
        </div>
        <h3 className="empty-title">All clear! No tasks right now</h3>
        <p className="empty-description">
          Add your first task using the input form above, or load sample tasks to explore TaskFlow's capabilities.
        </p>
        {onLoadSampleTasks && (
          <button
            type="button"
            className="btn-secondary"
            onClick={onLoadSampleTasks}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            <span>Load Sample Tasks</span>
          </button>
        )}
      </section>
    );
  }

  // Empty State 2: Tasks exist, but current search or filters yield 0 results
  if (tasks.length === 0) {
    return (
      <section className="empty-state-card" aria-label="No matching tasks">
        <div className="empty-icon-wrapper search-empty" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
            <line x1="8" y1="11" x2="14" y2="11" />
          </svg>
        </div>
        <h3 className="empty-title">No matching tasks found</h3>
        <p className="empty-description">
          {searchQuery
            ? `No tasks match "${searchQuery}". Try a different keyword or reset your filters.`
            : `There are currently no tasks in the "${filter}" filter ${
                categoryFilter !== 'all' ? `and "${categoryFilter}" category.` : '.'
              }`}
        </p>
        <button
          type="button"
          className="btn-secondary"
          onClick={onResetFilters}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="1 4 1 10 7 10" />
            <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
          </svg>
          <span>Reset All Filters</span>
        </button>
      </section>
    );
  }

  // Active Task List
  return (
    <section className="task-list-section" aria-label="Task list">
      <div className="task-list-header">
        <h2 className="section-title">
          Tasks
          <span className="task-counter-pill">{tasks.length}</span>
        </h2>
        <span className="task-list-hint">Click checkbox to complete • Double click or use edit icon to modify</span>
      </div>

      <ul className="task-list" role="list">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggleComplete={onToggleComplete}
            onDeleteTask={onDeleteTask}
            onUpdateTask={onUpdateTask}
          />
        ))}
      </ul>
    </section>
  );
}

