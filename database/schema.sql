-- MIT-BLR SDG Club Database Schema
-- Run this in your Supabase SQL editor

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create sequence for submission IDs (must be created before using it)
CREATE SEQUENCE IF NOT EXISTS submission_sequence START 1;

-- Admin Users Table
CREATE TABLE admin_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('admin', 'reviewer', 'mentor')),
  permissions TEXT[] DEFAULT '{}',
  password_hash TEXT DEFAULT 'demo_password', -- For demo purposes
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Project Submissions Table
CREATE TABLE project_submissions (
  id TEXT PRIMARY KEY DEFAULT ('SDG-' || EXTRACT(YEAR FROM NOW()) || '-' || LPAD(NEXTVAL('submission_sequence')::TEXT, 3, '0')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Personal Information
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  year TEXT NOT NULL,
  
  -- Project Details
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  primary_sdg TEXT NOT NULL,
  secondary_sdgs TEXT[] DEFAULT '{}',
  timeline TEXT NOT NULL,
  funding_required TEXT NOT NULL,
  expected_impact TEXT NOT NULL,
  
  -- Team Information (JSON)
  team_members JSONB DEFAULT '[]',
  
  -- File Attachments
  attachments TEXT[] DEFAULT '{}',
  
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
CREATE TABLE project_updates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id TEXT NOT NULL REFERENCES project_submissions(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_by UUID NOT NULL REFERENCES admin_users(id),
  update_type TEXT NOT NULL CHECK (update_type IN ('status_change', 'feedback', 'note', 'file_upload')),
  old_value TEXT,
  new_value TEXT,
  message TEXT
);

-- Create indexes for better performance
CREATE INDEX idx_submissions_status ON project_submissions(status);
CREATE INDEX idx_submissions_created_at ON project_submissions(created_at);
CREATE INDEX idx_submissions_email ON project_submissions(email);
CREATE INDEX idx_submissions_search ON project_submissions USING gin(to_tsvector('english', title || ' ' || name || ' ' || description));
CREATE INDEX idx_updates_project_id ON project_updates(project_id);

-- Row Level Security (RLS) Policies

-- Disable RLS for development (enable in production)
-- ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE project_submissions ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE project_updates ENABLE ROW LEVEL SECURITY;

-- For development, allow all access (REMOVE IN PRODUCTION)
-- Re-enable and configure proper RLS policies in production

-- Functions to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_admin_users_updated_at BEFORE UPDATE ON admin_users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_submissions_updated_at BEFORE UPDATE ON project_submissions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample admin user (replace with your email)
INSERT INTO admin_users (email, name, role, permissions, password_hash) VALUES
('admin@mitblrsdg.club', 'Admin User', 'admin', ARRAY['read', 'write', 'delete', 'manage_users'], 'admin123'),
('reviewer@mitblrsdg.club', 'Reviewer User', 'reviewer', ARRAY['read', 'write'], 'admin123'),
('mentor@mitblrsdg.club', 'Mentor User', 'mentor', ARRAY['read', 'write'], 'admin123'),
('indujgupta@gmail.com', 'Induj Gupta', 'admin', ARRAY['read', 'write', 'delete', 'manage_users'], 'hello123');

-- Insert sample project submissions for testing
INSERT INTO project_submissions (
  name, email, phone, year, title, description, primary_sdg, 
  secondary_sdgs, timeline, funding_required, expected_impact,
  team_members, status, feedback
) VALUES 
(
  'Rahul Sharma', 
  'rahul.sharma@mitblr.edu.in', 
  '+91 98765 43210', 
  '3',
  'Campus Rainwater Harvesting System',
  'A comprehensive rainwater harvesting system for MIT-BLR campus that includes smart collection points, filtration systems, and IoT monitoring.',
  'SDG 6 - Clean Water & Sanitation',
  ARRAY['SDG 11 - Sustainable Cities', 'SDG 13 - Climate Action'],
  '6',
  '3l',
  'Expected to reduce campus water consumption by 30%, save ₹2L annually in water costs.',
  '[{"name": "Priya Patel", "email": "priya.patel@mitblr.edu.in", "role": "IoT Developer"}, {"name": "Arjun Kumar", "email": "arjun.kumar@mitblr.edu.in", "role": "System Designer"}]'::jsonb,
  'in-progress',
  'Great progress! The prototype testing phase has begun. Expected completion by December 2024.'
),
(
  'Anita Desai',
  'anita.desai@mitblr.edu.in',
  '+91 87654 32109',
  '2',
  'Smart Waste Segregation Bot',
  'An AI-powered robot that can automatically segregate waste into different categories using computer vision and machine learning.',
  'SDG 12 - Responsible Consumption',
  ARRAY['SDG 9 - Industry Innovation'],
  '8',
  '5l',
  'Will improve waste segregation accuracy by 90% and reduce manual sorting effort.',
  '[{"name": "Vikram Singh", "email": "vikram.singh@mitblr.edu.in", "role": "AI Developer"}]'::jsonb,
  'under-review',
  'Your proposal is being evaluated by our technical committee. We appreciate the detailed implementation plan.'
),
(
  'Sneha Gupta',
  'sneha.gupta@mitblr.edu.in',
  '+91 76543 21098',
  '4',
  'Solar Panel Efficiency Optimizer',
  'IoT-based system to optimize solar panel efficiency through real-time monitoring and cleaning automation.',
  'SDG 7 - Affordable Clean Energy',
  ARRAY['SDG 9 - Industry Innovation', 'SDG 13 - Climate Action'],
  '12',
  '1l',
  'Expected to improve solar panel efficiency by 25% and reduce maintenance costs.',
  '[]'::jsonb,
  'completed',
  'Project successfully completed! The solar optimization system is now deployed across 3 campus buildings with 25% efficiency improvement.'
);

-- Create views for analytics
CREATE VIEW submission_stats AS
SELECT 
  status,
  COUNT(*) as count,
  EXTRACT(MONTH FROM created_at) as month,
  EXTRACT(YEAR FROM created_at) as year
FROM project_submissions 
GROUP BY status, EXTRACT(MONTH FROM created_at), EXTRACT(YEAR FROM created_at);

CREATE VIEW monthly_submissions AS
SELECT 
  DATE_TRUNC('month', created_at) as month,
  COUNT(*) as submissions
FROM project_submissions 
GROUP BY DATE_TRUNC('month', created_at)
ORDER BY month DESC;