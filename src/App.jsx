import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import TaskStats from './components/TaskStats';
import TaskInput from './components/TaskInput';
import TaskFilters from './components/TaskFilters';
import TaskList from './components/TaskList';
import ConfirmModal from './components/ConfirmModal';
import Toast from './components/Toast';
import './App.css';

// Default starter tasks to display on first visit
const INITIAL_TASKS = [
  {
    id: 'sample-1',
    title: 'Review React component hierarchy and state management',
    completed: true,
    priority: 'High',
    category: 'Study',
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
  },
  {
    id: 'sample-2',
    title: 'Implement TaskFlow To-Do application for Saiket Internship Task 3',
    completed: true,
    priority: 'High',
    category: 'Work',
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
  {
    id: 'sample-3',
    title: 'Design responsive layout with deep navy & teal theme',
    completed: false,
    priority: 'Medium',
    category: 'Work',
    createdAt: new Date(Date.now() - 1800000).toISOString(),
  },
  {
    id: 'sample-4',
    title: 'Prepare internship documentation and project README',
    completed: false,
    priority: 'Low',
    category: 'General',
    createdAt: new Date(Date.now() - 900000).toISOString(),
  },
];

const LOCAL_STORAGE_KEY = 'taskflow_tasks_v1';

export default function App() {
  // Load tasks from localStorage or fall back to initial tasks
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
    } catch (err) {
      console.error('Failed to read tasks from localStorage:', err);
    }
    return INITIAL_TASKS;
  });

  // Filter & Search states
  const [filter, setFilter] = useState('all'); // 'all' | 'active' | 'completed'
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Modal & Toast states
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [toast, setToast] = useState(null);

  // Sync tasks to localStorage whenever tasks state updates
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
    } catch (err) {
      console.error('Failed to save tasks to localStorage:', err);
    }
  }, [tasks]);

  // Available unique categories
  const categories = useMemo(() => {
    const defaultCats = ['Work', 'Personal', 'Study', 'Urgent', 'General'];
    const usedCats = tasks.map((t) => t.category).filter(Boolean);
    return Array.from(new Set([...defaultCats, ...usedCats]));
  }, [tasks]);

  // Statistics counts
  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.completed).length;
    const active = total - completed;
    return { total, active, completed };
  }, [tasks]);

  // Filtered tasks computation
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      // 1. Status Filter
      if (filter === 'active' && task.completed) return false;
      if (filter === 'completed' && !task.completed) return false;

      // 2. Category Filter
      if (categoryFilter !== 'all' && task.category !== categoryFilter) {
        return false;
      }

      // 3. Search Filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesTitle = task.title.toLowerCase().includes(query);
        const matchesCategory = task.category?.toLowerCase().includes(query);
        if (!matchesTitle && !matchesCategory) return false;
      }

      return true;
    });
  }, [tasks, filter, categoryFilter, searchQuery]);

  // Show Toast Helper
  const showToast = (message, type = 'info') => {
    setToast({ message, type });
  };

  // Add Task
  const handleAddTask = ({ title, priority, category }) => {
    const newTask = {
      id: `task-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      title,
      completed: false,
      priority,
      category,
      createdAt: new Date().toISOString(),
    };

    setTasks((prev) => [newTask, ...prev]);
    showToast(`Task "${title}" added successfully`, 'success');
  };

  // Toggle Completion
  const handleToggleComplete = (id) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id === id) {
          const updatedState = !task.completed;
          showToast(
            updatedState ? 'Task marked as completed!' : 'Task reopened as active.',
            'info'
          );
          return { ...task, completed: updatedState };
        }
        return task;
      })
    );
  };

  // Delete Task
  const handleDeleteTask = (id) => {
    const target = tasks.find((t) => t.id === id);
    setTasks((prev) => prev.filter((t) => t.id !== id));
    showToast(target ? `Deleted "${target.title}"` : 'Task deleted', 'danger');
  };

  // Update Task
  const handleUpdateTask = (id, updatedFields) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, ...updatedFields } : task))
    );
    showToast('Task updated successfully', 'success');
  };

  // Clear Completed with confirmation
  const handlePromptClearCompleted = () => {
    if (stats.completed > 0) {
      setIsConfirmModalOpen(true);
    }
  };

  const handleConfirmClearCompleted = () => {
    const count = stats.completed;
    setTasks((prev) => prev.filter((task) => !task.completed));
    setIsConfirmModalOpen(false);
    showToast(`Cleared ${count} completed ${count === 1 ? 'task' : 'tasks'}`, 'danger');
  };

  const handleResetFilters = () => {
    setFilter('all');
    setCategoryFilter('all');
    setSearchQuery('');
  };

  const handleLoadSampleTasks = () => {
    setTasks(INITIAL_TASKS);
    showToast('Sample tasks loaded', 'info');
  };

  return (
    <div className="app-layout">
      <div className="app-container">
        {/* Header */}
        <Header />

        {/* Dashboard Statistics */}
        <TaskStats
          total={stats.total}
          active={stats.active}
          completed={stats.completed}
        />

        {/* Task Creation Card */}
        <TaskInput onAddTask={handleAddTask} />

        {/* Filters, Search & Action Bar */}
        <TaskFilters
          filter={filter}
          onFilterChange={setFilter}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          categoryFilter={categoryFilter}
          onCategoryFilterChange={setCategoryFilter}
          categories={categories}
          counts={stats}
          onPromptClearCompleted={handlePromptClearCompleted}
        />

        {/* Task List */}
        <TaskList
          tasks={filteredTasks}
          totalTasksCount={stats.total}
          searchQuery={searchQuery}
          filter={filter}
          categoryFilter={categoryFilter}
          onResetFilters={handleResetFilters}
          onToggleComplete={handleToggleComplete}
          onDeleteTask={handleDeleteTask}
          onUpdateTask={handleUpdateTask}
          onLoadSampleTasks={handleLoadSampleTasks}
        />

        {/* Footer */}
        <footer className="app-footer">
          <p>
            TaskFlow &copy; {new Date().getFullYear()} • Saiket Systems Full Stack Internship (Task 3)
          </p>
          <p className="footer-subtext">
            Built with React 18, Vite, and Modern CSS • LocalStorage Persistence Enabled
          </p>
        </footer>
      </div>

      {/* Confirmation Modal for Clearing Completed Tasks */}
      <ConfirmModal
        isOpen={isConfirmModalOpen}
        title="Clear Completed Tasks?"
        message={`Are you sure you want to remove all ${stats.completed} completed task${
          stats.completed === 1 ? '' : 's'
        }? This action cannot be undone.`}
        confirmText="Yes, Clear Completed"
        cancelText="Keep Them"
        onConfirm={handleConfirmClearCompleted}
        onCancel={() => setIsConfirmModalOpen(false)}
      />

      {/* Toast Feedback Notification */}
      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}

