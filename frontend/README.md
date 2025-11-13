# Task Frontend - React + TypeScript + Tailwind (Admin UI)

This is a starter frontend built with React + TypeScript, TailwindCSS, Zustand for state management, and Axios for API calls.
It includes Login/Register, Task Dashboard, Add/Edit Task pages, JWT token storage and auto-logout on expiry.

## Setup

1. Unzip and `cd` into the project.
2. Install dependencies: `npm install`
3. Start dev server: `npm run dev`
4. Change `src/api/axiosClient.ts` baseURL to your backend URL if needed.

Auth endpoints expected:
- POST /api/login -> { access_token, user, expires_in }
- POST /api/register -> register body
- GET /api/tasks
- GET /api/tasks/:id
- POST /api/tasks
- PUT /api/tasks/:id
- DELETE /api/tasks/:id

