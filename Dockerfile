# ================================
# 1) Build React Frontend (Vite)
# ================================
FROM node:20 AS frontend

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

COPY backend/ ./backend/

RUN mkdir -p backend/static

COPY --from=frontend /app/frontend/dist/ ./backend/static/

# Install backend requirements + uvicorn
RUN pip install --no-cache-dir -r backend/requirements.txt uvicorn

# ================================
# 3) Final Runtime Image
# ================================
FROM python:3.11-slim

WORKDIR /app

COPY --from=backend /app/backend ./backend

EXPOSE 8000

CMD ["uvicorn", "backend.app.main:app", "--host", "0.0.0.0", "--port", "8000"]
