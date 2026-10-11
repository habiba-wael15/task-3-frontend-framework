import React from 'react';

export default function TaskFilters({
  filter,
  onFilterChange,
  searchQuery,
  onSearchChange,
  categoryFilter,
  onCategoryFilterChange,
  categories,
  counts,
  onPromptClearCompleted,
}) {
  return (
    <section className="filters-section" aria-label="Task controls and filters">
      {/* Search Bar */}
      <div className="search-bar-wrapper">
        <label htmlFor="task-search-input" className="sr-only">
          Search tasks by title
        </label>
        <div className="search-input-container">
          <svg
            className="search-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            id="task-search-input"
            type="text"
            className="search-input"
            placeholder="Search tasks by title..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          {searchQuery && (
            <button
              type="button"
              className="search-clear-btn"
              onClick={() => onSearchChange('')}
              aria-label="Clear search query"
              title="Clear search"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Filter and Action Controls */}
      <div className="controls-row">
        {/* Status Tab Filters */}
        <div className="status-tabs" role="tablist" aria-label="Filter tasks by completion status">
          <button
            type="button"
            role="tab"
            aria-selected={filter === 'all'}
            className={`tab-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => onFilterChange('all')}
          >
            <span>All</span>
            <span className="tab-count">{counts.total}</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={filter === 'active'}
            className={`tab-btn ${filter === 'active' ? 'active' : ''}`}
            onClick={() => onFilterChange('active')}
          >
            <span>Active</span>
            <span className="tab-count">{counts.active}</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={filter === 'completed'}
            className={`tab-btn ${filter === 'completed' ? 'active' : ''}`}
            onClick={() => onFilterChange('completed')}
          >
            <span>Completed</span>
            <span className="tab-count">{counts.completed}</span>
          </button>
        </div>

        {/* Secondary controls: Category filter & Clear Completed */}
        <div className="secondary-controls">
          <div className="category-filter-wrapper">
            <label htmlFor="filter-category-select" className="sr-only">
              Filter by category
            </label>
            <select
              id="filter-category-select"
              value={categoryFilter}
              onChange={(e) => onCategoryFilterChange(e.target.value)}
              className="category-filter-select"
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            className="btn-clear-completed"
            onClick={onPromptClearCompleted}
            disabled={counts.completed === 0}
            title={counts.completed === 0 ? 'No completed tasks to clear' : 'Clear all completed tasks'}
            aria-label={`Clear ${counts.completed} completed tasks`}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            </svg>
            <span>Clear Completed ({counts.completed})</span>
          </button>
        </div>
      </div>
    </section>
  );
}

