from typing import List, Optional
from pydantic_settings import BaseSettings
from pydantic import Field
import os

class Settings(BaseSettings):
    PROJECT_NAME: str = "Kanvesh Raut Portfolio API"
    PROJECT_VERSION: str = "1.0.0"
    API_V1_PREFIX: str = "/api"
    
    # Database Settings - Supabase / PostgreSQL Connection URL
    # Format: postgresql://postgres:[password]@db.[ref].supabase.co:5432/postgres
    # Or Supabase Pooler: postgresql://postgres.[ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres
    DATABASE_URL: Optional[str] = Field(
        default=None,
        description="Supabase / PostgreSQL connection string. Defaults to SQLite fallback if not set."
    )
    
    # Frontend Deployment URL for secure CORS in production
    FRONTEND_URL: Optional[str] = Field(
        default=None,
        description="Deployed frontend URL (e.g. https://kanvesh-portfolio.vercel.app). Comma-separate if multiple."
    )
    
    # Server Settings
    HOST: str = "127.0.0.1"
    PORT: int = 8000
    DEBUG: bool = False
    
    @property
    def cors_origins(self) -> List[str]:
        """
        Dynamically construct trusted CORS origins without wildcard security risks in production.
        """
        origins = [
            "http://localhost:5173",
            "http://127.0.0.1:5173",
            "http://localhost:3000",
            "http://127.0.0.1:3000",
        ]
        if self.FRONTEND_URL:
            for url in self.FRONTEND_URL.split(","):
                clean = url.strip().rstrip("/")
                if clean and clean not in origins:
                    origins.append(clean)
        return origins

    class Config:
        env_file = (".env", "backend/.env")
        env_file_encoding = "utf-8"
        extra = "ignore"

settings = Settings()
