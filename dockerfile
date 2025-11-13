# ================================
# 1) Build React Frontend
# ================================
FROM node:18 AS frontend

WORKDIR /app/frontend
COPY frontend/package.json frontend/package-lock.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build


# ================================
# 2) Build Python Backend
# ================================
FROM python:3.11 AS backend

WORKDIR /app

# Copy backend
COPY backend/ ./backend/

# Ensure static folder exists
RUN mkdir -p backend/static

# Copy frontend build to backend/static
COPY --from=frontend /app/frontend/dist/ ./backend/static/

# Install backend Python dependencies
RUN pip install --no-cache-dir -r backend/requirements.txt


# ================================
# 3) Final Image (Slim Python)
# ================================
FROM python:3.11-slim

WORKDIR /app

# Copy backend (including static files)
COPY --from=backend /app/backend ./backend

EXPOSE 8000

# Start FastAPI (app/main.py)
CMD ["uvicorn", "backend.app.main:app", "--host", "0.0.0.0", "--port", "8000"]
