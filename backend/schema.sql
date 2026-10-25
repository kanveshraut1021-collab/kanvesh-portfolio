-- =============================================================================
-- Supabase SQL Schema for Kanvesh Raut's Full-Stack Portfolio
-- You can copy and run this directly in the Supabase SQL Editor:
-- https://supabase.com/dashboard/project/<your-project-id>/sql
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

-- Indexes for efficient lookup and query ordering
CREATE INDEX IF NOT EXISTS idx_contact_messages_email ON contact_messages(email);
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON contact_messages(created_at DESC);

-- Enable Row Level Security (RLS) for extra security against public API inspection
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
