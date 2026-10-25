from datetime import datetime, timezone
from sqlalchemy import Column, Integer, String, Text, DateTime
from backend.database import Base

class ContactMessage(Base):
    """
    SQLAlchemy model for storing contact form submissions in PostgreSQL (Supabase).
    Table: contact_messages
    """
    __tablename__ = "contact_messages"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String(100), nullable=False)
    email = Column(String(255), nullable=False, index=True)
    phone = Column(String(50), nullable=True)
    subject = Column(String(200), nullable=True)  # Optional subject
    message = Column(Text, nullable=False)
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), nullable=False)
    status = Column(String(20), default="unread", nullable=False)  # unread / read / archived

    def __repr__(self):
        return f"<ContactMessage(id={self.id}, name='{self.name}', email='{self.email}')>"
