-- MIT-BLR SDG Club Database Schema - UPDATE VERSION
-- Run this in your Supabase SQL editor to update existing tables

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create sequence for submission IDs (must be created before using it)
CREATE SEQUENCE IF NOT EXISTS submission_sequence START 1;

-- Update existing admin_users table to add password_hash column if it doesn't exist
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='admin_users' AND column_name='password_hash') THEN
        ALTER TABLE admin_users ADD COLUMN password_hash TEXT DEFAULT 'demo_password';
    END IF;
END $$;

-- Create other tables only if they don't exist
CREATE TABLE IF NOT EXISTS project_submissions (
  id TEXT PRIMARY KEY DEFAULT ('SDG-' || EXTRACT(YEAR FROM NOW()) || '-' || LPAD(NEXTVAL('submission_sequence')::TEXT, 3, '0')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Personal Information
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  registration_number TEXT NOT NULL,
  branch TEXT NOT NULL,
  year TEXT NOT NULL,
  
  -- Project Details
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  primary_sdg TEXT NOT NULL,
  secondary_sdgs TEXT[] DEFAULT '{}',
  timeline TEXT NOT NULL,
  expected_impact TEXT NOT NULL,
  
  -- Team Information (JSON)
  team_members JSONB DEFAULT '[]',
  
  -- File Attachments removed
  
  -- Status and Progress
  status TEXT NOT NULL DEFAULT 'received' CHECK (status IN ('received', 'under-review', 'selected', 'in-progress', 'completed', 'rejected')),
  stage INTEGER DEFAULT 0,
  
  -- Admin Fields
  admin_notes TEXT,
  feedback TEXT,
  assigned_mentor UUID REFERENCES admin_users(id),
  funding_approved DECIMAL,
  
  -- Metadata
  submission_ip INET,
  user_agent TEXT
);

-- Project Updates/History Table
CREATE TABLE IF NOT EXISTS project_updates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id TEXT NOT NULL REFERENCES project_submissions(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_by UUID NOT NULL REFERENCES admin_users(id),
  update_type TEXT NOT NULL CHECK (update_type IN ('status_change', 'feedback', 'note', 'file_upload')),
  old_value TEXT,
  new_value TEXT,
  message TEXT
);

-- Update existing project_submissions table to add new fields and remove funding_required
DO $$ 
BEGIN 
    -- Add registration_number column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='project_submissions' AND column_name='registration_number') THEN
        ALTER TABLE project_submissions ADD COLUMN registration_number TEXT;
    END IF;
    
    -- Add branch column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='project_submissions' AND column_name='branch') THEN
        ALTER TABLE project_submissions ADD COLUMN branch TEXT;
    END IF;
    
    -- Remove funding_required column if it exists
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='project_submissions' AND column_name='funding_required') THEN
        ALTER TABLE project_submissions DROP COLUMN funding_required;
    END IF;
END $$;

-- Update existing records to have empty registration_number and branch if they are null
UPDATE project_submissions SET registration_number = '' WHERE registration_number IS NULL;
UPDATE project_submissions SET branch = '' WHERE branch IS NULL;

-- Make the new columns NOT NULL after updating existing records
ALTER TABLE project_submissions ALTER COLUMN registration_number SET NOT NULL;
ALTER TABLE project_submissions ALTER COLUMN branch SET NOT NULL;

-- Create indexes for better performance (with IF NOT EXISTS)
CREATE INDEX IF NOT EXISTS idx_submissions_status ON project_submissions(status);
CREATE INDEX IF NOT EXISTS idx_submissions_created_at ON project_submissions(created_at);
CREATE INDEX IF NOT EXISTS idx_submissions_email ON project_submissions(email);
CREATE INDEX IF NOT EXISTS idx_submissions_search ON project_submissions USING gin(to_tsvector('english', title || ' ' || name || ' ' || description));
CREATE INDEX IF NOT EXISTS idx_updates_project_id ON project_updates(project_id);

-- Disable RLS for development (enable in production)
ALTER TABLE admin_users DISABLE ROW LEVEL SECURITY;
ALTER TABLE project_submissions DISABLE ROW LEVEL SECURITY;
ALTER TABLE project_updates DISABLE ROW LEVEL SECURITY;

-- Functions to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Drop existing triggers if they exist and recreate
DROP TRIGGER IF EXISTS update_admin_users_updated_at ON admin_users;
DROP TRIGGER IF EXISTS update_submissions_updated_at ON project_submissions;

-- Recreate triggers
CREATE TRIGGER update_admin_users_updated_at BEFORE UPDATE ON admin_users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_submissions_updated_at BEFORE UPDATE ON project_submissions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Update existing admin users with password_hash if they don't have one
UPDATE admin_users SET password_hash = 'admin123' WHERE password_hash IS NULL OR password_hash = 'demo_password';

-- Insert or update admin users (using ON CONFLICT to handle existing records)
INSERT INTO admin_users (email, name, role, permissions, password_hash) VALUES
('admin@mitblrsdg.club', 'Admin User', 'admin', ARRAY['read', 'write', 'delete', 'manage_users'], 'admin123'),
('reviewer@mitblrsdg.club', 'Reviewer User', 'reviewer', ARRAY['read', 'write'], 'admin123'),
('mentor@mitblrsdg.club', 'Mentor User', 'mentor', ARRAY['read', 'write'], 'admin123'),
('indujgupta@gmail.com', 'Induj Gupta', 'admin', ARRAY['read', 'write', 'delete', 'manage_users'], 'hello123')
ON CONFLICT (email) DO UPDATE SET 
  password_hash = EXCLUDED.password_hash,
  name = EXCLUDED.name,
  role = EXCLUDED.role,
  permissions = EXCLUDED.permissions;

-- Insert sample project submissions for testing (only if table is empty)
INSERT INTO project_submissions (
  name, email, phone, registration_number, branch, year, title, description, primary_sdg, 
  secondary_sdgs, timeline, expected_impact,
  team_members, status, feedback
) 
SELECT * FROM (VALUES 
  (
    'Rahul Sharma', 
    'rahul.sharma@mitblr.edu.in', 
    '+91 98765 43210', 
    '21BCS001',
    'cse',
    '3',
    'Campus Rainwater Harvesting System',
    'A comprehensive rainwater harvesting system for MIT-BLR campus that includes smart collection points, filtration systems, and IoT monitoring.',
    'SDG 6 - Clean Water & Sanitation',
    ARRAY['SDG 11 - Sustainable Cities', 'SDG 13 - Climate Action'],
    '6',
    'Expected to reduce campus water consumption by 30%, save ₹2L annually in water costs.',
    '[{"name": "Priya Patel", "email": "priya.patel@mitblr.edu.in", "role": "IoT Developer"}, {"name": "Arjun Kumar", "email": "arjun.kumar@mitblr.edu.in", "role": "System Designer"}]'::jsonb,
    'in-progress',
    'Great progress! The prototype testing phase has begun. Expected completion by December 2024.'
  ),
  (
    'Anita Desai',
    'anita.desai@mitblr.edu.in',
    '+91 87654 32109',
    '22BEC045',
    'ece',
    '2',
    'Smart Waste Segregation Bot',
    'An AI-powered robot that can automatically segregate waste into different categories using computer vision and machine learning.',
    'SDG 12 - Responsible Consumption',
    ARRAY['SDG 9 - Industry Innovation'],
    '8',
    'Will improve waste segregation accuracy by 90% and reduce manual sorting effort.',
    '[{"name": "Vikram Singh", "email": "vikram.singh@mitblr.edu.in", "role": "AI Developer"}]'::jsonb,
    'under-review',
    'Your proposal is being evaluated by our technical committee. We appreciate the detailed implementation plan.'
  ),
  (
    'Sneha Gupta',
    'sneha.gupta@mitblr.edu.in',
    '+91 76543 21098',
    '20BME123',
    'mech',
    '4',
    'Solar Panel Efficiency Optimizer',
    'IoT-based system to optimize solar panel efficiency through real-time monitoring and cleaning automation.',
    'SDG 7 - Affordable Clean Energy',
    ARRAY['SDG 9 - Industry Innovation', 'SDG 13 - Climate Action'],
    '12',
    'Expected to improve solar panel efficiency by 25% and reduce maintenance costs.',
    '[]'::jsonb,
    'completed',
    'Project successfully completed! The solar optimization system is now deployed across 3 campus buildings with 25% efficiency improvement.'
  )
) AS sample_data(name, email, phone, registration_number, branch, year, title, description, primary_sdg, secondary_sdgs, timeline, expected_impact, team_members, status, feedback)
WHERE NOT EXISTS (SELECT 1 FROM project_submissions LIMIT 1);

-- Create views for analytics (with OR REPLACE to handle existing views)
CREATE OR REPLACE VIEW submission_stats AS
SELECT 
  status,
  COUNT(*) as count,
  EXTRACT(MONTH FROM created_at) as month,
  EXTRACT(YEAR FROM created_at) as year
FROM project_submissions 
GROUP BY status, EXTRACT(MONTH FROM created_at), EXTRACT(YEAR FROM created_at);

CREATE OR REPLACE VIEW monthly_submissions AS
SELECT 
  DATE_TRUNC('month', created_at) as month,
  COUNT(*) as submissions
FROM project_submissions 
GROUP BY DATE_TRUNC('month', created_at)
ORDER BY month DESC;