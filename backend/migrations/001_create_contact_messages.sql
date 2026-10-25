-- =============================================================================
-- Migration: 001_create_contact_messages.sql
-- Description: Creates the contact_messages table for Kanvesh Raut's Portfolio
-- Provider: Supabase / PostgreSQL
-- =============================================================================

CREATE TABLE IF NOT EXISTS contact_messages (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    subject VARCHAR(200),
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    status VARCHAR(20) DEFAULT 'unread' NOT NULL
);

-- Performance Indexes
CREATE INDEX IF NOT EXISTS idx_contact_messages_email ON contact_messages(email);
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON contact_messages(created_at DESC);

-- Optional Row-Level Security (RLS) for Supabase:
-- Enable RLS to prevent unauthenticated public SELECT queries from Supabase client libraries
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Allow insert from backend API service role or authenticated backend connection
-- Note: FastAPI connects using PostgreSQL connection string (direct or pooled),
-- which bypasses RLS when using the postgres / service_role user.
