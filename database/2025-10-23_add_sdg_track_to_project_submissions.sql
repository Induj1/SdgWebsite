-- Migration: Add sdg_track column to project_submissions
-- Created: 2025-10-23
-- Purpose: Persist the "Sustainable Development Track" chosen in the project submission form

BEGIN;

-- Add a text column to store the selected SDG track (if not already present)
ALTER TABLE public.project_submissions
  ADD COLUMN IF NOT EXISTS sdg_track TEXT;

-- Create an index to allow fast filtering by sdg_track
CREATE INDEX IF NOT EXISTS idx_project_submissions_sdg_track
  ON public.project_submissions (sdg_track);

COMMIT;

-- Rollback note: To remove this column, run:
-- ALTER TABLE public.project_submissions DROP COLUMN IF EXISTS sdg_track;
-- DROP INDEX IF EXISTS idx_project_submissions_sdg_track;
