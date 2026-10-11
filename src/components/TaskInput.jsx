import React, { useState } from 'react';

export default function TaskInput({ onAddTask }) {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [category, setCategory] = useState('General');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      setError('Please enter a task title. Empty or whitespace-only tasks cannot be added.');
      return;
    }

    onAddTask({
      title: trimmedTitle,
      priority,
      category,
    });

    setTitle('');
    setError('');
  };

  const handleChange = (e) => {
    setTitle(e.target.value);
    if (error) {
      setError('');
    }
  };

  return (
    <section className="task-input-section" aria-label="Add new task">
      <form className="task-input-form" onSubmit={handleSubmit} noValidate>
        <div className="input-row-main">
          <label htmlFor="task-title-input" className="sr-only">
            Task Title
          </label>
          <div className="input-wrapper">
            <svg
              className="input-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="16" />
              <line x1="8" y1="12" x2="16" y2="12" />
            </svg>
            <input
              id="task-title-input"
              type="text"
              className={`task-text-input ${error ? 'input-error' : ''}`}
              placeholder="What do you need to accomplish? (e.g. Prepare presentation slides)"
              value={title}
              onChange={handleChange}
              aria-invalid={Boolean(error)}
              aria-describedby={error ? 'input-error-msg' : undefined}
            />
          </div>

          <button
            type="submit"
            className="btn-primary"
            aria-label="Add new task"
          >
            <svg
              className="btn-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            <span>Add Task</span>
          </button>
        </div>

        {error && (
          <div id="input-error-msg" className="input-error-feedback" role="alert">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        <div className="input-options-row">
          <div className="select-group">
            <label htmlFor="priority-select" className="option-label">
              Priority:
            </label>
            <div className="select-wrapper">
              <select
                id="priority-select"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className={`priority-select priority-${priority.toLowerCase()}`}
              >
                <option value="Low">Low Priority</option>
                <option value="Medium">Medium Priority</option>
                <option value="High">High Priority</option>
              </select>
            </div>
          </div>

          <div className="select-group">
            <label htmlFor="category-select" className="option-label">
              Category:
            </label>
            <div className="select-wrapper">
              <select
                id="category-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="category-select"
              >
                <option value="General">General</option>
                <option value="Work">Work</option>
                <option value="Personal">Personal</option>
                <option value="Study">Study</option>
                <option value="Urgent">Urgent</option>
              </select>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}

