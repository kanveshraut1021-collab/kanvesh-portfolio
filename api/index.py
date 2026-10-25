"""
Vercel Serverless Entrypoint for FastAPI Backend.
Vercel automatically detects the 'app' ASGI instance exported from api/index.py.
"""
import sys
from pathlib import Path

# Ensure root directory is in sys.path so 'backend' package is resolvable
ROOT_DIR = Path(__file__).resolve().parent.parent
if str(ROOT_DIR) not in sys.path:
    sys.path.insert(0, str(ROOT_DIR))

from backend.main import app

# Export app for Vercel Python runtime
__all__ = ["app"]
