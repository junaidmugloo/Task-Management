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
# 2) Build Python Backend (install deps)
# ================================
FROM python:3.11 AS backend

WORKDIR /app
COPY backend/ ./backend/

# Copy frontend build into backend/static
RUN mkdir -p backend/static
COPY --from=frontend /app/frontend/dist/ ./backend/static/

# Install backend dependencies into /install directory
RUN pip install --prefix=/install -r backend/requirements.txt


# ================================
# 3) Final Runtime Image
# ================================
FROM python:3.11-slim

WORKDIR /app

# Copy installed python packages from builder stage
COPY --from=backend /install /usr/local

# Copy backend code
COPY --from=backend /app/backend ./backend

# MUST install uvicorn in final image
RUN pip install uvicorn

EXPOSE 8000

CMD ["uvicorn", "backend.app.main:app", "--host", "0.0.0.0", "--port", "8000"]
