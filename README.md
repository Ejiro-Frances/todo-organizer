# 📝 Todo App

A modern **Todo App** built with **React**, **TypeScript**, and a rich ecosystem of tools including **TanStack Query/Form/Router**, **Tailwind CSS** for styling, and **shadcn/ui** for UI components.

This app helps users efficiently **create, update, and manage tasks**, with features like filters, pagination, skeleton loaders, and a polished UI.

---

## 📸 Screenshots

| Home Page                          | 404 Page                              |
| ---------------------------------- | ------------------------------------- |
| ![Home](/public/task-board.png)    | ![404 Page](/public/not-found.png)    |
| ---------------------------------- | ------------------------------------- |
| Error Boundary                     | Task Detail Page                      |
| ---------------------------------  | ------------------------------------- |
| ![Error page](/public/error.png)   | ![Detail](/public/task-detail.png)    |

---

## Demo

[Live Demo](https://todo-organizer-five.vercel.app)
[404 Demo](https://todo-organizer-five.vercel.app/non)
[Error Demo](https://todo-organizer-five.vercel.app/testerror)

---

## 📌 Features

- ✅ Create, view, edit, and delete tasks
- 🔍 Search tasks with debounced input
- 🗂️ Filter by task status: All / Todo / In Progress / Done
- 🔁 Pagination (12 per page by default, but can be increased)
- 🔢 Dynamic task count by status
- 🔧 Inline editing with optimistic updates
- 🎨 UI styled with Tailwind CSS + `shadcn/ui`
- 📅 Track task creation and status update timestamps
- 🎯 Priority indicators (Low / Medium / High)
- 🔔 Toast notifications via `sonner`
- 💀 Custom 404 page and testable error boundary
- 💅 Smooth loaders and polished UX animations

---

## 🚀 Tech Stack

| Category      | Tool / Library            |
| ------------- | ------------------------- |
| Frontend      | React + TypeScript        |
| State + Fetch | `@tanstack/react-query`   |
| Forms         | `@tanstack/react-form`    |
| Routing       | `@tanstack/react-router`  |
| Styling       | Tailwind CSS, `shadcn/ui` |
| Icons         | `react-icons`             |
| Notifications | `sonner`                  |
| Build Tool    | Vite                      |

---

## 🛠️ Installation & Setup

### 📦 Prerequisites

- Node.js >= 18
- npm / yarn / pnpm

### 🚀 Clone and Run

```bash
# Clone the repo
git clone https://github.com/Ejiro-Frances/todo-organizer.git
cd todo-organizer

# Install dependencies
npm install

# Run development server
npm run dev
```

---

## 📜 Available Scripts

| Command           | Description                          |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Start the development server         |
| `npm run build`   | Build for production                 |
| `npm run preview` | Preview the production build locally |

---

## 🧱 Architecture Overview

This app follows a modular, component-based architecture. Key decisions include:

- **TanStack Query** for efficient, cached data fetching with optimistic updates
- **TanStack Form** for scalable, type-safe form handling
- **TanStack Router** for file-based, nested routing with error boundaries
- **Task Data Persistence** via API with fallback caching (future support for offline via localforage/Dexie planned)
- **Skeleton Loaders** and toast notifications to enhance UX
- **Accessibility & Keyboard Navigation** across modals and pagination

---

## 🧪 API Usage

All task operations use REST-like endpoints with optional query params for filtering, pagination, and search.

### 🔍 `GET /tasks`

```ts
Params: {
  page?: number;
  limit?: number;
  filter?: "ALL" | "TODO" | "IN_PROGRESS" | "DONE";
  search?: string;
}
```

### ✏️ `PATCH /tasks/:id`

- Update a task’s status, title, description, or priority.

### ➕ `POST /tasks`

- Add a new task.

### ❌ `DELETE /tasks/:id`

- Delete a task.

---

## ⚠️ Known Issues / Limitations

- ❌ No offline support (yet)
- 🐢 Marking task complete may feel slow due to network latency
- 🧮 Task status count reflects only the current page’s data
- 🔄 Search and filter resets to first page automatically (may confuse users)

---

## 🌱 Future Improvements

- 📅 **Duration & Deadline** fields for tasks
- 🛎️ **In-app & Scheduled Notifications**
- 📆 **Calendar View** integration (e.g., FullCalendar)
- 🏷️ **Custom Tags** + filtering by tag
- ♻️ Improve loader smoothness and reduce perceived latency
- 🌍 **Offline support** using localForage or Dexie
- 🔁 Make task filter counters reflect all tasks, not just current page
- 🧪 Add unit and integration testing with Vitest or Jest

---

## 📄 License

MIT © 2025 — \[Ejiro Frances]
