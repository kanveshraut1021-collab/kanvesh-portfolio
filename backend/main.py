
import logging
from contextlib import asynccontextmanager
from datetime import datetime, timezone
from typing import List

from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from sqlalchemy import text

from backend.config import settings
from backend.database import (
    get_db,
    init_db,
    ACTIVE_ENGINE_TYPE,
)
from backend.models import ContactMessage
from backend.schemas import (
    ContactCreate,
    ContactSubmissionResult,
    HealthResponse,
    ProjectInfo,
)


# --------------------------------------------------
# LOGGING
# --------------------------------------------------

logging.basicConfig(level=logging.INFO)

logger = logging.getLogger("portfolio.api")


# --------------------------------------------------
# DATABASE STARTUP
# --------------------------------------------------

@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("Starting FastAPI application...")

    try:
        init_db()
        logger.info("Database tables verified.")

    except Exception as e:
        logger.exception("Database initialization failed: %s", e)

    yield

    logger.info("Shutting down FastAPI application...")


# --------------------------------------------------
# FASTAPI APPLICATION
# --------------------------------------------------

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.PROJECT_VERSION,
    description="FastAPI backend for Kanvesh Raut's portfolio.",
    lifespan=lifespan,
)


# --------------------------------------------------
# CORS CONFIGURATION
# --------------------------------------------------

app.add_middleware(
    CORSMiddleware,

    allow_origins=[
        "https://kanvesh-portfolio.vercel.app",
    ],

    allow_credentials=True,

    allow_methods=[
        "GET",
        "POST",
        "OPTIONS",
    ],

    allow_headers=[
        "Content-Type",
        "Accept",
        "Authorization",
    ],
)


# --------------------------------------------------
# HEALTH CHECK
# --------------------------------------------------

@app.get(
    "/api/health",
    response_model=HealthResponse,
    tags=["System"],
)
def check_health(db: Session = Depends(get_db)):

    db_connected = False

    try:
        db.execute(text("SELECT 1"))
        db_connected = True

    except Exception as e:
        logger.warning(
            "Database connectivity check failed: %s",
            str(e),
        )

    return HealthResponse(
        status="healthy" if db_connected else "unhealthy",
        service=settings.PROJECT_NAME,
        database_connected=db_connected,
        database_engine=ACTIVE_ENGINE_TYPE,
        timestamp=datetime.now(timezone.utc),
    )


# --------------------------------------------------
# CONTACT FORM API
# --------------------------------------------------

@app.post(
    "/api/contact",
    response_model=ContactSubmissionResult,
    status_code=status.HTTP_201_CREATED,
    tags=["Contact"],
)
def create_contact_message(
    payload: ContactCreate,
    db: Session = Depends(get_db),
):

    # Honeypot spam protection
    if payload.website:

        logger.warning(
            "Honeypot triggered. Submission discarded."
        )

        return ContactSubmissionResult(
            success=True,
            message="Your message has been saved successfully!",
            contact_id=None,
            timestamp=datetime.now(timezone.utc),
        )

    # Save contact message
    try:

        new_message = ContactMessage(
            name=payload.name.strip(),
            email=payload.email.strip().lower(),

            phone=(
                payload.phone.strip()
                if payload.phone
                else None
            ),

            subject=(
                payload.subject.strip()
                if payload.subject
                else None
            ),

            message=payload.message.strip(),

            status="unread",
        )

        db.add(new_message)

        db.commit()

        db.refresh(new_message)

        logger.info(
            "Contact message saved. ID: %s",
            new_message.id,
        )

        return ContactSubmissionResult(
            success=True,
            message="Your message has been saved successfully!",
            contact_id=new_message.id,
            timestamp=new_message.created_at,
        )

    except Exception as e:

        db.rollback()

        logger.exception(
            "Failed to save contact message: %s",
            str(e),
        )

        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to save message. Please try again.",
        )


# --------------------------------------------------
# FEATURED PROJECTS
# --------------------------------------------------

FEATURED_PROJECTS = [

    {
        "id": "farmedge",

        "title": "FarmEdge",

        "subtitle": "Modern Agriculture Portal",

        "category": "Agricultural Information & Climate Platform",

        "live_url": "https://modernfarmingfarmedge.netlify.app/",

        "github_url": "https://github.com/kanveshraut1021-collab",

        "description": (
            "A web project focused on modern farming, "
            "agricultural information, climate suitability, "
            "and farming-related buying and selling."
        ),

        "objective": (
            "Empower farmers and agriculture enthusiasts "
            "with practical guidance on modern cultivation "
            "techniques, climate guides, and an accessible store."
        ),

        "features": [
            "Modern agricultural technique guides",
            "Climate and crop suitability information",
            "Agricultural supply catalog",
            "Responsive multi-section layout",
        ],

        "tech_stack": [
            "HTML5",
            "CSS3",
            "JavaScript",
            "Netlify",
        ],

        "screenshot": "/screenshots/farmedge.png",
    },

    {
        "id": "sai-automobile",

        "title": "Sai Automobile",

        "subtitle": "Commercial Workshop & Service Platform",

        "category": "Commercial Client Project",

        "live_url": "https://sai-automobile.vercel.app/",

        "github_url": "https://github.com/kanveshraut1021-collab",

        "description": (
            "A commercial website built for an automotive "
            "business providing battery replacement, oil "
            "change, and vehicle wash services."
        ),

        "objective": (
            "Build a professional web presence for an "
            "automobile service business with service "
            "information and direct customer contact."
        ),

        "features": [
            "Interactive service cards",
            "Automobile battery brand showcase",
            "Direct calling integration",
            "Workshop information and location navigation",
        ],

        "tech_stack": [
            "HTML5",
            "CSS3",
            "JavaScript",
            "Vercel",
        ],

        "screenshot": "/screenshots/sai-automobile.png",
    },

    {
        "id": "inventory-system",

        "title": "Inventory Management System",

        "subtitle": "StockHub Dark Dashboard Application",

        "category": "Full-Stack Dashboard Application",

        "live_url": (
            "https://inventory-management-system-iota-sandy.vercel.app/"
        ),

        "github_url": "https://github.com/kanveshraut1021-collab",

        "description": (
            "A dark inventory management dashboard "
            "for tracking warehouse stock, monitoring "
            "replenishment thresholds, and managing products."
        ),

        "objective": (
            "Build an inventory control system with "
            "stock status, search, and low-stock alerts."
        ),

        "features": [
            "Stock level analytics",
            "Product inventory table",
            "Search and filtering",
            "Low-stock alerts",
            "Dark dashboard interface",
        ],

        "tech_stack": [
            "React.js",
            "Python Flask",
            "REST API",
            "Tailwind CSS",
            "Vercel",
        ],

        "screenshot": "/screenshots/inventory.png",
    },

]


# --------------------------------------------------
# PROJECTS API
# --------------------------------------------------

@app.get(
    "/api/projects",
    response_model=List[ProjectInfo],
    tags=["Projects"],
)
def get_projects():

    return FEATURED_PROJECTS


# --------------------------------------------------
# RUN APPLICATION
# --------------------------------------------------

if __name__ == "__main__":

    import uvicorn

    uvicorn.run(
        "backend.main:app",
        host="0.0.0.0",
        port=settings.PORT,
        reload=settings.DEBUG,
    )
