import logging
from contextlib import asynccontextmanager
from datetime import datetime, timezone
from typing import List, Optional

from fastapi import FastAPI, Depends, HTTPException, status, Query
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from sqlalchemy import desc

from backend.config import settings
from backend.database import get_db, init_db, ACTIVE_ENGINE_TYPE, engine
from backend.models import ContactMessage
from backend.schemas import (
    ContactCreate,
    ContactResponse,
    ContactSubmissionResult,
    HealthResponse,
    ProjectInfo
)

logger = logging.getLogger("portfolio.api")
logging.basicConfig(level=logging.INFO)

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Initialize DB schema
    logger.info("Starting up FastAPI application...")
    try:
        init_db()
        logger.info("Database tables verified.")
    except Exception as e:
        logger.error("Failed to initialize database: %s", e)
    yield
    # Shutdown
    logger.info("Shutting down FastAPI application...")

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.PROJECT_VERSION,
    description="Python FastAPI backend for Kanvesh Raut's Full-Stack Portfolio with PostgreSQL/SQLAlchemy storage and contact management.",
    lifespan=lifespan
)

# Configure CORS Middleware using dynamic, trusted origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)

# -----------------------------------------------------------------------------
# HEALTH CHECK
# -----------------------------------------------------------------------------
@app.get("/api/health", response_model=HealthResponse, tags=["System"])
def check_health(db: Session = Depends(get_db)):
    """
    Check the health of the FastAPI service and verify PostgreSQL / Supabase database connectivity.
    """
    db_connected = False
    try:
        from sqlalchemy import text
        db.execute(text("SELECT 1"))
        db_connected = True
    except Exception as e:
        logger.warning("Database connectivity check failed: %s", str(e))
        db_connected = False

    return HealthResponse(
        status="healthy",
        service=settings.PROJECT_NAME,
        database_connected=db_connected,
        database_engine=ACTIVE_ENGINE_TYPE,
        timestamp=datetime.now(timezone.utc)
    )

# -----------------------------------------------------------------------------
# CONTACT FORM API
# -----------------------------------------------------------------------------
@app.post(
    "/api/contact",
    response_model=ContactSubmissionResult,
    status_code=status.HTTP_201_CREATED,
    tags=["Contact"]
)
def create_contact_message(payload: ContactCreate, db: Session = Depends(get_db)):
    """
    Receive contact message submission from frontend portfolio,
    validate payload via Pydantic, and persist into PostgreSQL (Supabase) via SQLAlchemy.
    """
    # 1. Anti-spam honeypot detection
    if payload.website:
        logger.warning("Honeypot triggered by suspected bot. Discarding submission.")
        return ContactSubmissionResult(
            success=True,
            message="Your message has been saved successfully!",
            contact_id=None,
            timestamp=datetime.now(timezone.utc)
        )

    # 2. Persist to PostgreSQL database
    try:
        new_message = ContactMessage(
            name=payload.name.strip(),
            email=payload.email.strip().lower(),
            phone=payload.phone.strip() if payload.phone else None,
            subject=payload.subject.strip() if payload.subject else None,
            message=payload.message.strip(),
            status="unread"
        )
        db.add(new_message)
        db.commit()
        db.refresh(new_message)

        logger.info(
            "Contact message stored: ID #%s from %s <%s>",
            new_message.id,
            new_message.name,
            new_message.email
        )

        return ContactSubmissionResult(
            success=True,
            message="Your message has been saved successfully!",
            contact_id=new_message.id,
            timestamp=new_message.created_at
        )
    except Exception as e:
        db.rollback()
        logger.error("Database error while storing contact message: %s", str(e))
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to save message to database. Please try again or reach out directly."
        )

# -----------------------------------------------------------------------------
# PROJECTS API
# -----------------------------------------------------------------------------
FEATURED_PROJECTS = [
    {
        "id": "farmedge",
        "title": "FarmEdge",
        "subtitle": "Modern Agriculture Portal",
        "category": "Agricultural Information & Climate Platform",
        "live_url": "https://modernfarmingfarmedge.netlify.app/",
        "github_url": "https://github.com/kanveshraut1021-collab",
        "description": "A web project focused on modern farming, agricultural information, climate suitability, and farming-related buying and selling. Empowering farmers with smart technology for sustainable growth.",
        "objective": "Empower farmers and agriculture enthusiasts with practical guidance on modern cultivation techniques (drip irrigation, hydroponics), climate guides, and an accessible store interface.",
        "features": [
            "Modern agricultural technique guides with efficiency and water conservation metrics",
            "Climate & crop suitability recommendations tailored to regional farming needs",
            "AgroSmart agricultural supply catalog with interactive cart calculation",
            "Clean, responsive multi-section layout accessible on mobile devices in rural areas"
        ],
        "tech_stack": ["HTML5", "CSS3", "JavaScript", "Netlify"],
        "screenshot": "/screenshots/farmedge.png"
    },
    {
        "id": "sai-automobile",
        "title": "Sai Automobile",
        "subtitle": "Commercial Workshop & Service Platform",
        "category": "Commercial Client Project",
        "live_url": "https://sai-automobile.vercel.app/",
        "github_url": "https://github.com/kanveshraut1021-collab",
        "description": "A real-world commercial website built for an automotive business providing battery replacement, oil change, and vehicle wash bay services with interactive shutter doors and quick-call booking.",
        "objective": "Build a high-conversion, professional web presence for a local automobile service business with clear pricing, battery brand showcases, real-time workshop details, and direct call functionality.",
        "features": [
            "Interactive service bay inspection cards with shutter door roll-up animations",
            "Curated genuine battery brand catalog (Exide, Amaron, Tata Green)",
            "Direct emergency calling integration (tel:+919075919023) for on-road assistance",
            "Operational hours, live open indicator, and service location navigation"
        ],
        "tech_stack": ["HTML5", "CSS3", "JavaScript", "Vercel"],
        "screenshot": "/screenshots/sai-automobile.png"
    },
    {
        "id": "inventory-system",
        "title": "Inventory Management System",
        "subtitle": "StockHub Dark Dashboard Application",
        "category": "Full-Stack Dashboard Application",
        "live_url": "https://inventory-management-system-iota-sandy.vercel.app/",
        "github_url": "https://github.com/kanveshraut1021-collab",
        "description": "A high-performance dark inventory management dashboard for tracking warehouse stock, monitoring replenishment thresholds, and managing SKU health with real-time analytics.",
        "objective": "Engineered an enterprise-grade dark inventory control system with real-time stock status, search filtration, and low-stock replenishment alert metrics.",
        "features": [
            "Real-time stock level analytics, SKU classification, and category breakdown",
            "Product inventory data table with instant search and status indicators",
            "Critical stock health alerts highlighting items requiring immediate restock",
            "Dark theme UI designed for extended viewing with JetBrains Mono data typography"
        ],
        "tech_stack": ["React.js", "Python Flask / REST API", "Tailwind CSS", "Vercel"],
        "screenshot": "/screenshots/inventory.png"
    }
]

@app.get("/api/projects", response_model=List[ProjectInfo], tags=["Projects"])
def get_projects():
    """
    Return list of live featured projects with full metadata, descriptions, and verified links.
    """
    return FEATURED_PROJECTS

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("backend.main:app", host=settings.HOST, port=settings.PORT, reload=settings.DEBUG)
