import os
import logging
from sqlalchemy import create_engine, text
from sqlalchemy.orm import declarative_base, sessionmaker
from sqlalchemy.pool import NullPool
from backend.config import settings

logger = logging.getLogger("portfolio.database")

Base = declarative_base()

def get_normalized_database_url(raw_url: str) -> str:
    """
    Ensure the PostgreSQL connection string uses the 'postgresql://' dialect
    expected by SQLAlchemy 2.0+ and psycopg2 driver.
    Supabase and cloud providers often prefix with 'postgres://'.
    """
    if not raw_url:
        return ""
    url = raw_url.strip()
    if url.startswith("postgres://"):
        url = "postgresql://" + url[len("postgres://"):]
    return url

def create_resilient_engine():
    """
    Creates an SQLAlchemy engine optimized for PostgreSQL (Supabase)
    and compatible with Vercel serverless execution.

    Key considerations:
    1. Serverless pooling: In Vercel / serverless environments, NullPool is used
       to prevent connection starvation on Supabase.
    2. Local execution: Connection pre-ping and recycling are enabled.
    3. Resilience: If DATABASE_URL is not provided or unreachable during local dev,
       it gracefully falls back to local SQLite so development never blocks.
    """
    is_serverless = bool(os.getenv("VERCEL") or os.getenv("AWS_LAMBDA_FUNCTION_NAME"))
    raw_pg_url = settings.DATABASE_URL or os.getenv("DATABASE_URL", "")
    pg_url = get_normalized_database_url(raw_pg_url)

    active_engine = None
    engine_type = "postgresql"

    # Attempt PostgreSQL (Supabase) connection
    if pg_url and ("postgres" in pg_url):
        try:
            masked_target = pg_url.split("@")[-1] if "@" in pg_url else "configured host"
            logger.info("Connecting to PostgreSQL at %s (serverless=%s)...", masked_target, is_serverless)

            engine_kwargs = {
                "pool_pre_ping": True,
                "connect_args": {"connect_timeout": 5}
            }

            if is_serverless:
                # In Vercel serverless, NullPool prevents idle connection accumulation
                engine_kwargs["poolclass"] = NullPool
                logger.info("Using NullPool for Vercel serverless database operations.")
            else:
                engine_kwargs["pool_recycle"] = 300
                engine_kwargs["pool_size"] = 5
                engine_kwargs["max_overflow"] = 5

            test_engine = create_engine(pg_url, **engine_kwargs)

            # Test connection probe
            with test_engine.connect() as conn:
                conn.execute(text("SELECT 1"))

            logger.info("Successfully connected to Supabase / PostgreSQL database!")
            active_engine = test_engine
            engine_type = "postgresql (Supabase)"
        except Exception as e:
            err_msg = str(e).split("\n")[0]
            logger.warning("Could not establish PostgreSQL connection (%s).", err_msg)
            if not is_serverless:
                logger.info("Falling back to local SQLite (portfolio.db) for local execution.")
            active_engine = None

    # Fallback to local SQLite if PostgreSQL is not available
    if active_engine is None:
        sqlite_url = "sqlite:///./portfolio.db"
        active_engine = create_engine(
            sqlite_url,
            connect_args={"check_same_thread": False}
        )
        engine_type = "sqlite (local fallback - set DATABASE_URL for Supabase PostgreSQL)"

    return active_engine, engine_type

engine, ACTIVE_ENGINE_TYPE = create_resilient_engine()
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_db():
    """
    FastAPI dependency that yields a database session and safely closes it on request completion.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def init_db():
    """
    Initializes database schema. Safe to call multiple times (idempotent).
    """
    logger.info("Verifying database schema on %s...", ACTIVE_ENGINE_TYPE)
    Base.metadata.create_all(bind=engine)
    logger.info("Database schema verification completed.")
