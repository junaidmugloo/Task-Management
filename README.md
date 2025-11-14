## Quickstart (development)

1. Clone or unzip this project.
2. Create a virtual environment in backend folder and activate it:
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

## Frontend (summary)
2. open frontend folder and hit commands below:
   ```bash
   npm install
   npm run dev
   and change backend url in src/api folder in axiosclient.txs as your backend url
   ```

