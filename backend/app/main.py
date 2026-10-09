import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.app.core.config import settings
from backend.app.core.database import engine, Base
import backend.app.models # Register all models

from backend.app.api.auth import router as auth_router
from backend.app.api.crops import router as crops_router
from backend.app.api.weather import router as weather_router
from backend.app.api.disease import router as disease_router
from backend.app.api.advisory import router as advisory_router
from backend.app.api.market import market_router, schemes_router
from backend.app.api.admin import router as admin_router

# Auto-create tables in SQLite/PostgreSQL
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="KrishiMitra AI — Farmer-Friendly Crop Advisory API",
    description="Full-stack AI agricultural advisory backend supporting multi-crop recommendation, agromet weather, disease detection, and official scheme tracking for Indian farmers.",
    version="1.0.0"
)

# CORS Middleware setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Allow local Vite frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount API Routers
app.include_router(auth_router, prefix="/api")
app.include_router(crops_router, prefix="/api")
app.include_router(weather_router, prefix="/api")
app.include_router(disease_router, prefix="/api")
app.include_router(advisory_router, prefix="/api")
app.include_router(market_router, prefix="/api")
app.include_router(schemes_router, prefix="/api")
app.include_router(admin_router, prefix="/api")

import os
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

@app.get("/api/health")
def health_check():
    return {
        "status": "healthy",
        "database": "connected",
        "environment": settings.ENVIRONMENT
    }

# Check if production build exists in dist/
DIST_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))), "dist")
ASSETS_DIR = os.path.join(DIST_DIR, "assets")

if os.path.exists(ASSETS_DIR):
    app.mount("/assets", StaticFiles(directory=ASSETS_DIR), name="assets")

@app.get("/{full_path:path}")
def serve_spa(full_path: str):
    # If file exists in dist, serve it
    target = os.path.join(DIST_DIR, full_path)
    if full_path and os.path.isfile(target):
        return FileResponse(target)
    index_file = os.path.join(DIST_DIR, "index.html")
    if os.path.exists(index_file):
        return FileResponse(index_file)
    return {
        "app": "KrishiMitra AI",
        "tagline": "सही सलाह, बेहतर खेती",
        "docs_url": "/docs",
        "message": "Frontend build not detected. Visit /docs for API."
    }

if __name__ == "__main__":
    uvicorn.run("backend.app.main:app", host="0.0.0.0", port=8000, reload=True)
