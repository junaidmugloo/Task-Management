# Task Tracker Backend (FastAPI)

Minimal Task Tracker backend using FastAPI and PostgreSQL (SQLAlchemy ORM).

## Features
- FastAPI (Python 3.10+)
- PostgreSQL with SQLAlchemy ORM
- JWT authentication (register/login)
- CRUD APIs for tasks (`/auth/register`, `/auth/login`, `/tasks` GET, POST, PUT, DELETE)
- Environment variables for configuration
- Simple dependency-based DB session management

## Quickstart (development)

1. Clone or unzip this project.
2. Create a virtual environment and activate it:
   ```bash
   python -m venv .venv
   source .venv/bin/activate  # on Windows: .venv\Scripts\activate
   ```
3. Install requirements:
   ```bash
   pip install -r requirements.txt
   ```
4. Copy `.env.example` to `.env` and update values (DATABASE_URL, JWT_SECRET):
   ```bash
   cp .env.example .env
   ```
   Example `DATABASE_URL` (Postgres): `postgresql://user:password@localhost:5432/taskdb`
5. Create database tables (simple script provided):
   ```bash
   python create_tables.py
   ```
6. Run the app:
   ```bash
   uvicorn app.main:app --reload
   ```
7. Open docs: `http://127.0.0.1:8000/docs`

## Endpoints (summary)
- `POST /auth/register` - register user (email, password)
- `POST /auth/login` - login, returns `access_token`
- `GET /tasks` - list tasks for current user
- `POST /tasks` - create task
- `PUT /tasks/{task_id}` - update a task (only owner)
- `DELETE /tasks/{task_id}` - delete a task (only owner)

## Notes
- This scaffold uses synchronous SQLAlchemy sessions. For production, consider connection pooling and async approaches.
- Keep `JWT_SECRET` safe. Use long random strings in production.
