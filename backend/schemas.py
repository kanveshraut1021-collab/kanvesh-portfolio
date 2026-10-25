from pydantic import BaseModel, EmailStr, Field, ConfigDict
from typing import Optional, List
from datetime import datetime

class ContactCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100, description="Full name of sender", examples=["Kanvesh Raut"])
    email: EmailStr = Field(..., description="Valid sender email address", examples=["kanveshraut9640@gmail.com"])
    phone: Optional[str] = Field(None, max_length=50, description="Optional phone number", examples=["+91 9075919023"])
    subject: str = Field(..., min_length=2, max_length=200, description="Subject of the message", examples=["Internship Opportunity"])
    message: str = Field(..., min_length=10, max_length=5000, description="Detailed message body", examples=["Hello Kanvesh, I reviewed your portfolio..."])

class ContactResponse(BaseModel):
    id: int
    name: str
    email: str
    phone: Optional[str] = None
    subject: str
    message: str
    created_at: datetime
    status: str

    model_config = ConfigDict(from_attributes=True)

class ContactSubmissionResult(BaseModel):
    success: bool
    message: str
    contact_id: int
    timestamp: datetime

class HealthResponse(BaseModel):
    status: str
    service: str
    database_connected: bool
    database_engine: str
    timestamp: datetime

class ProjectInfo(BaseModel):
    id: str
    title: str
    subtitle: str
    category: str
    live_url: str
    github_url: Optional[str] = None
    description: str
    objective: str
    features: List[str]
    tech_stack: List[str]
    screenshot: str
