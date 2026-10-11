import React, { useState, useEffect, useRef } from 'react';

export default function TaskItem({
  task,
  onToggleComplete,
  onDeleteTask,
  onUpdateTask,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedPriority, setEditedPriority] = useState(task.priority || 'Medium');
  const [editedCategory, setEditedCategory] = useState(task.category || 'General');
  const [editError, setEditError] = useState('');

  const editInputRef = useRef(null);

  useEffect(() => {
    if (isEditing) {
      setEditedTitle(task.title);
      setEditedPriority(task.priority || 'Medium');
      setEditedCategory(task.category || 'General');
      setEditError('');
      if (editInputRef.current) {
        editInputRef.current.focus();
        editInputRef.current.select();
      }
    }
  }, [isEditing, task]);

  const handleStartEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditError('');
    setEditedTitle(task.title);
  };

  const handleSaveEdit = (e) => {
    if (e) e.preventDefault();
    const trimmed = editedTitle.trim();
    if (!trimmed) {
      setEditError('Task title cannot be empty.');
      return;
    }

    onUpdateTask(task.id, {
      title: trimmed,
      priority: editedPriority,
      category: editedCategory,
    });
    setIsEditing(false);
    setEditError('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSaveEdit(e);
    } else if (e.key === 'Escape') {
      handleCancelEdit();
    }
  };

  // Format date nicely
  const formattedDate = new Date(task.createdAt || Date.now()).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <li className={`task-item ${task.completed ? 'task-completed' : ''} ${isEditing ? 'task-editing' : ''}`}>
      {isEditing ? (
        <form className="edit-form" onSubmit={handleSaveEdit}>
          <div className="edit-main-row">
            <input
              ref={editInputRef}
              type="text"
              className={`edit-title-input ${editError ? 'input-error' : ''}`}
              value={editedTitle}
              onChange={(e) => {
                setEditedTitle(e.target.value);
                if (editError) setEditError('');
              }}
              onKeyDown={handleKeyDown}
              aria-label="Edit task title"
              placeholder="Task title"
            />
          </div>

          {editError && (
            <p className="edit-error-msg" role="alert">
              {editError}
            </p>
          )}

          <div className="edit-meta-row">
            <div className="edit-selects">
              <select
                value={editedPriority}
                onChange={(e) => setEditedPriority(e.target.value)}
                className={`priority-select priority-${editedPriority.toLowerCase()}`}
                aria-label="Edit priority"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>

              <select
                value={editedCategory}
                onChange={(e) => setEditedCategory(e.target.value)}
                className="category-select"
                aria-label="Edit category"
              >
                <option value="General">General</option>
                <option value="Work">Work</option>
                <option value="Personal">Personal</option>
                <option value="Study">Study</option>
                <option value="Urgent">Urgent</option>
              </select>
            </div>

            <div className="edit-actions">
              <button
                type="submit"
                className="btn-save"
                aria-label="Save changes"
                title="Save changes (Enter)"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>Save</span>
              </button>
              <button
                type="button"
                className="btn-cancel"
                onClick={handleCancelEdit}
                aria-label="Cancel editing"
                title="Cancel editing (Esc)"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
                <span>Cancel</span>
              </button>
            </div>
          </div>
        </form>
      ) : (
        <div className="task-content-layout">
          {/* Custom Checkbox */}
          <label className="checkbox-container">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => onToggleComplete(task.id)}
              aria-label={`Mark "${task.title}" as ${task.completed ? 'incomplete' : 'complete'}`}
            />
            <span className="checkbox-custom" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </span>
          </label>

          {/* Task Info */}
          <div className="task-info">
            <div className="task-title-row">
              <span className={`task-title ${task.completed ? 'completed-text' : ''}`}>
                {task.title}
              </span>
            </div>

            <div className="task-badges-row">
              <span className={`badge-priority priority-${(task.priority || 'Medium').toLowerCase()}`}>
                {task.priority || 'Medium'}
              </span>

              <span className="badge-category">
                {task.category || 'General'}
              </span>

              <span className="task-timestamp" title={`Created at: ${formattedDate}`}>
                {formattedDate}
              </span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="task-actions" aria-label="Task actions">
            <button
              type="button"
              className="action-btn btn-edit"
              onClick={handleStartEdit}
              aria-label={`Edit task "${task.title}"`}
              title="Edit task"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
            </button>

            <button
              type="button"
              className="action-btn btn-delete"
              onClick={() => onDeleteTask(task.id)}
              aria-label={`Delete task "${task.title}"`}
              title="Delete task"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                <line x1="10" y1="11" x2="10" y2="17" />
                <line x1="14" y1="11" x2="14" y2="17" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </li>
  );
}

