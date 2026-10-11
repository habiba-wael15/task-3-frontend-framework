# TaskFlow — Modern Front-End Framework Task Management

![TaskFlow Status](https://img.shields.io/badge/TaskFlow-Productivity%20App-0d9488?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-5.4.11-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Saiket Internship](https://img.shields.io/badge/Saiket%20Systems-Task%203-6366f1?style=for-the-badge)

A modern, responsive task management application built with **React** and **Vite** for the **Saiket Systems Full Stack Development Internship — Task 3: Front-End Framework Basics**.

---

## Internship Task 3 Description

- **Task Title:** Front-End Framework Basics
- **Goal:** Build a small application using React.js or Angular, such as a To-Do List, that allows users to add, edit, and delete tasks.
- **Framework Chosen:** React.js (ES6+, Functional Components, Hooks)

TaskFlow extends the basic requirements with a productivity dashboard, task statistics, browser `localStorage` persistence, priority and category organization, search, status filtering, and a responsive interface.

---

## Features

1. **Add Tasks with Validation**
   - Add tasks using a simple input form.
   - Prevent empty or whitespace-only task titles.
   - Assign a priority: Low, Medium, or High.
   - Choose a category: Work, Personal, Study, Urgent, or General.

2. **Edit Tasks**
   - Edit task titles, priorities, and categories without reloading the page.
   - Press <kbd>Enter</kbd> to save or <kbd>Esc</kbd> to cancel.

3. **Delete Tasks**
   - Delete individual tasks with feedback notifications.

4. **Mark Tasks as Completed**
   - Toggle tasks between active and completed states.
   - Completed tasks have distinct visual styling.

5. **Task Statistics**
   - View total, active, and completed task counts.
   - Track the completion percentage with a progress bar.

6. **Status Filters**
   - Filter tasks by All, Active, or Completed.

7. **Search and Category Filtering**
   - Search tasks by title or supported tags.
   - Filter tasks by category.

8. **Empty States**
   - Display helpful messages when no tasks exist.
   - Offer options to restore sample tasks or reset filters, where supported.

9. **Persistent Storage**
   - Save tasks in browser `localStorage`.
   - Restore saved tasks when the page is reloaded.

10. **Clear Completed Tasks**
    - Clear completed tasks after confirmation.

11. **Responsive Design**
    - Use a minimalist interface with navy, teal, and violet accents.
    - Support desktop, tablet, and mobile layouts.

12. **Toast Notifications**
    - Display feedback for supported task actions.

---

## Technologies Used

- **React 18** — Functional components and React Hooks.
- **JavaScript (ES6+)** — Modern JavaScript syntax and modules.
- **Vite 5** — Development server and production build tool.
- **HTML5 and CSS3** — Semantic markup, responsive layouts, Flexbox, and CSS Grid.
- **Web Storage API** — Browser-side persistence with `localStorage`.

---

## Project Structure

```text
task-3-frontend-framework/
├── index.html
├── package.json
├── vite.config.js
├── README.md
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── components/
│       ├── Header.jsx
│       ├── TaskStats.jsx
│       ├── TaskInput.jsx
│       ├── TaskFilters.jsx
│       ├── TaskList.jsx
│       ├── TaskItem.jsx
│       ├── ConfirmModal.jsx
│       └── Toast.jsx
└── dist/
```

---

## Installation and Local Setup

### Prerequisites

- Node.js 18 or later
- npm

### 1. Open the project directory

```bash
cd task-3-frontend-framework
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

Open the local URL shown in the terminal, usually [http://localhost:5173](http://localhost:5173).

---

## Production Build

Create an optimized production build:

```bash
npm run build
```

The generated production files are placed in the `dist/` directory.

To preview the production build locally:

```bash
npm run preview
```

---

## Verification

- **Production Build:** `npm run build` completed successfully, generating production assets in `dist/`.
- **Application:** The development server was launched locally and the TaskFlow interface was displayed in a browser.

Additional feature testing should be completed manually before claiming that every feature has been verified.

---

## License and Attribution

Developed by **Habiba Wael** for the **Saiket Systems Full Stack Development Internship**.

**Task 3:** Front-End Framework Basics.
