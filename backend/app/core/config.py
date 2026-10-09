import os
from typing import List

class Settings:
    PROJECT_NAME: str = os.getenv("PROJECT_NAME", "KrishiMitra AI")
    VERSION: str = "1.0.0"
    ENVIRONMENT: str = os.getenv("ENVIRONMENT", "development")
    DEBUG: bool = os.getenv("DEBUG", "True").lower() in ("true", "1")
    
    SECRET_KEY: str = os.getenv("SECRET_KEY", "krishimitra-super-secret-production-key-2026")
    ALGORITHM: str = os.getenv("ALGORITHM", "HS256")
    ACCESS_TOKEN_EXPIRE_MINUTES: int = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "1440"))
    
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./krishimitra.db")
    
    CORS_ORIGINS: List[str] = [
        origin.strip() 
        for origin in os.getenv("CORS_ORIGINS", "http://localhost:5173,http://localhost:3000,http://127.0.0.1:5173,http://127.0.0.1:3000,*").split(",")
        if origin.strip()
    ]
    
    # Weather configuration
    WEATHER_API_KEY: str = os.getenv("WEATHER_API_KEY", "")
    
    # LLM configuration
    LLM_PROVIDER: str = os.getenv("LLM_PROVIDER", "")
    LLM_API_KEY: str = os.getenv("LLM_API_KEY", "")
    
    # ML Disease Model
    DISEASE_MODEL_API_URL: str = os.getenv("DISEASE_MODEL_API_URL", "")

settings = Settings()
