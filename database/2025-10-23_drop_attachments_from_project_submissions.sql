-- Migration: Drop attachments column from project_submissions
-- Created: 2025-10-23
-- Purpose: Remove the attachments column and associated data from project_submissions

BEGIN;

-- Only drop the column if it exists
ALTER TABLE public.project_submissions
  DROP COLUMN IF EXISTS attachments;

-- If there are references or indexes, drop them as well (no-op if absent)
-- DROP INDEX IF EXISTS idx_project_submissions_attachments;

COMMIT;

-- Rollback note: To restore the column (manual restore required), re-run schema or add a column with a default; data loss is permanent if column dropped.
