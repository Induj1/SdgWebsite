-- Migration: create_mentor_applications.sql
-- Purpose: Create a table to store mentor applications for the SDG Mentorship Program.
-- Usage: Run this in Supabase SQL editor or psql connected to your Postgres database.

-- Requires: no special extensions. Uses standard Postgres types. If you want to use uuid_generate_v4(), enable "pgcrypto" or "uuid-ossp".

CREATE TABLE IF NOT EXISTS public.mentor_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz,

  -- Applicant details
  name text NOT NULL,
  year text NOT NULL,
  branch text NOT NULL,
  email text NOT NULL,
  phone text,

  -- Expertise stored as jsonb array of strings for flexibility
  expertise jsonb,
  previous_experience text,
  availability_per_week text,

  -- Admin fields
  status text DEFAULT 'pending', -- pending | shortlisted | contacted | rejected
  admin_notes text,

  -- Optional: who processed this application
  processed_by uuid
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_mentor_applications_email ON public.mentor_applications (email);
CREATE INDEX IF NOT EXISTS idx_mentor_applications_status ON public.mentor_applications (status);

-- If gen_random_uuid() is not available in your Postgres build, enable pgcrypto extension:
-- CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Example insert:
-- INSERT INTO public.mentor_applications (name, year, branch, email, phone, expertise, previous_experience, availability_per_week)
-- VALUES ('Alice Rao','4','CSE','alice@example.com','+91 98xxxx','["Full-stack","Sustainability"]'::jsonb,'Worked on water reuse project','1-2 hours');
