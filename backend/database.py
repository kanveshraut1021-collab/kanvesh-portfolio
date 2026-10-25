import logging
from sqlalchemy import create_engine, text
from sqlalchemy.orm import declarative_base, sessionmaker
from backend.config import settings

logger = logging.getLogger("portfolio.database")
logging.basicConfig(level=logging.INFO)

Base = declarative_base()

def create_resilient_engine():
    """
    Creates an SQLAlchemy engine.
    First attempts PostgreSQL using DATABASE_URL from .env / environment.
    If PostgreSQL is unreachable or connection fails, cleanly falls back
    to a local SQLite database (sqlite:///./portfolio.db) to ensure development
    and testing continue without interruption.
    """
    pg_url = settings.DATABASE_URL
    active_engine = None
    engine_type = "postgresql"

    # Try PostgreSQL first if URL is configured for postgres
    if pg_url and ("postgres" in pg_url):
        try:
            logger.info("Connecting to PostgreSQL database at %s...", pg_url.split("@")[-1] if "@" in pg_url else "configured URL")
            test_engine = create_engine(
                pg_url,
                pool_pre_ping=True,
                pool_recycle=300,
                connect_args={"connect_timeout": 3} if "psycopg2" in pg_url or "postgresql" in pg_url else {}
            )
            # Test actual connection
            with test_engine.connect() as conn:
                conn.execute(text("SELECT 1"))
            logger.info(" Successfully connected to PostgreSQL database!")
            active_engine = test_engine
            engine_type = "postgresql"
        except Exception as e:
            logger.warning(" Could not connect to PostgreSQL database (%s).", str(e).split("\n")[0])
            logger.info(" Falling back to SQLite database (sqlite:///./portfolio.db) for local execution.")
            active_engine = None

    if active_engine is None:
        sqlite_url = "sqlite:///./portfolio.db"
        active_engine = create_engine(
            sqlite_url,
            connect_args={"check_same_thread": False}
        )
        engine_type = "sqlite (local fallback - configure PostgreSQL in .env for production)"

    return active_engine, engine_type

engine, ACTIVE_ENGINE_TYPE = create_resilient_engine()
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_db():
    """
    FastAPI dependency that yields a database session and closes it on exit.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def init_db():
    """
    Initializes database tables.
    """
    logger.info("Initializing database schema on %s...", ACTIVE_ENGINE_TYPE)
    Base.metadata.create_all(bind=engine)
    logger.info("Database schema initialized successfully.")
