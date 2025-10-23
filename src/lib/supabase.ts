import { createClient } from '@supabase/supabase-js'

// Supabase configuration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'your-supabase-url'
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-supabase-anon-key'

export const supabase = createClient(supabaseUrl, supabaseKey)

// Database Types
export interface ProjectSubmission {
  id: string
  created_at: string
  updated_at: string
  
  // Personal Information
  name: string
  email: string
  phone: string
  registration_number: string
  branch: string
  year: string
  
  // Project Details
  title: string
  description: string
  primary_sdg: string
  sdg_track?: string
  secondary_sdgs: string[]
  timeline: string
  expected_impact: string
  
  // Team Information
  team_members: TeamMember[]
  
  // File Attachments removed
  
  // Status and Progress
  status: 'received' | 'under-review' | 'selected' | 'in-progress' | 'completed' | 'rejected'
  stage: number
  
  // Admin Fields
  admin_notes: string
  feedback: string
  assigned_mentor?: string
  funding_approved?: number
  
  // Metadata
  submission_ip?: string
  user_agent?: string
}

export interface TeamMember {
  name: string
  email: string
  role?: string
}

export interface AdminUser {
  id: string
  email: string
  name: string
  role: 'admin' | 'reviewer' | 'mentor'
  permissions: string[]
  created_at: string
}

export interface ProjectUpdate {
  id: string
  project_id: string
  created_at: string
  updated_by: string
  update_type: 'status_change' | 'feedback' | 'note' | 'file_upload'
  old_value?: string
  new_value?: string
  message?: string
}

// Database Functions
export const projectsApi = {
  // Get all submissions with filters
  async getSubmissions(filters?: {
    status?: string
    search?: string
    limit?: number
    offset?: number
  }) {
    let query = supabase
      .from('project_submissions')
      .select('*')
      .order('created_at', { ascending: false })

    if (filters?.status && filters.status !== 'all') {
      query = query.eq('status', filters.status)
    }

    if (filters?.search) {
      query = query.or(`title.ilike.%${filters.search}%,name.ilike.%${filters.search}%,id.ilike.%${filters.search}%`)
    }

    if (filters?.limit) {
      query = query.limit(filters.limit)
    }

    if (filters?.offset) {
      query = query.range(filters.offset, filters.offset + (filters.limit || 10) - 1)
    }

    const { data, error, count } = await query

    if (error) throw error
    return { data: data as ProjectSubmission[], count }
  },

  // Get single submission
  async getSubmission(id: string) {
    const { data, error } = await supabase
      .from('project_submissions')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return data as ProjectSubmission
  },

  // Create new submission
  async createSubmission(submission: Omit<ProjectSubmission, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('project_submissions')
      .insert([submission])
      .select()
      .single()

    if (error) throw error
    return data as ProjectSubmission
  },

  // Update submission
  async updateSubmission(id: string, updates: Partial<ProjectSubmission>) {
    const { data, error } = await supabase
      .from('project_submissions')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data as ProjectSubmission
  },

  // Update status
  async updateStatus(id: string, status: ProjectSubmission['status'], adminId: string, message?: string) {
    const { data: submission, error: fetchError } = await supabase
      .from('project_submissions')
      .select('status')
      .eq('id', id)
      .single()

    if (fetchError) throw fetchError

    // Update submission status
    const { data, error } = await supabase
      .from('project_submissions')
      .update({ 
        status, 
        updated_at: new Date().toISOString(),
        ...(message && { feedback: message })
      })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error

    // Log the status change
    await supabase
      .from('project_updates')
      .insert([{
        project_id: id,
        updated_by: adminId,
        update_type: 'status_change',
        old_value: submission.status,
        new_value: status,
        message
      }])

    return data as ProjectSubmission
  },

  // Add admin note
  async addNote(id: string, note: string, adminId: string) {
    const { data, error } = await supabase
      .from('project_submissions')
      .update({ 
        admin_notes: note,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error

    // Log the note
    await supabase
      .from('project_updates')
      .insert([{
        project_id: id,
        updated_by: adminId,
        update_type: 'note',
        message: note
      }])

    return data as ProjectSubmission
  },

  // Get project updates/history
  async getProjectUpdates(projectId: string) {
    const { data, error } = await supabase
      .from('project_updates')
      .select(`
        *,
        admin:admin_users(name, email)
      `)
      .eq('project_id', projectId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  },

  // Get dashboard stats
  async getDashboardStats() {
    const { data: submissions, error } = await supabase
      .from('project_submissions')
      .select('status, created_at')

    if (error) throw error

    const stats = {
      total: submissions.length,
      received: submissions.filter(s => s.status === 'received').length,
      underReview: submissions.filter(s => s.status === 'under-review').length,
      selected: submissions.filter(s => s.status === 'selected').length,
      inProgress: submissions.filter(s => s.status === 'in-progress').length,
      completed: submissions.filter(s => s.status === 'completed').length,
      rejected: submissions.filter(s => s.status === 'rejected').length,
      thisMonth: submissions.filter(s => {
        const submissionDate = new Date(s.created_at)
        const now = new Date()
        return submissionDate.getMonth() === now.getMonth() && submissionDate.getFullYear() === now.getFullYear()
      }).length
    }

    return stats
  }
}

// Mentors API
export const mentorsApi = {
  // Create mentor application
  async createMentor(application: Omit<MentorApplication, 'id' | 'created_at' | 'updated_at'>) {
    const payload = {
      ...application,
      expertise: application.expertise ?? null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    const { data, error } = await supabase
      .from('mentor_applications')
      .insert([payload])
      .select()
      .single()

    if (error) throw error
    return data as MentorApplication
  }
,

  // Get mentor applications with optional filters
  async getMentors(filters?: { status?: string; search?: string; limit?: number; offset?: number }) {
    let query: any = supabase
      .from('mentor_applications')
      .select('*')
      .order('created_at', { ascending: false })

    if (filters?.status && filters.status !== 'all') {
      query = query.eq('status', filters.status)
    }

    if (filters?.search) {
      query = query.or(`name.ilike.%${filters.search}%,email.ilike.%${filters.search}%`)
    }

    if (filters?.limit) {
      query = query.limit(filters.limit)
    }

    if (filters?.offset) {
      query = query.range(filters.offset, filters.offset + (filters.limit || 10) - 1)
    }

    const { data, error, count } = await query
    if (error) throw error
    return { data: data as MentorApplication[], count }
  },

  async getMentor(id: string) {
    const { data, error } = await supabase
      .from('mentor_applications')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return data as MentorApplication
  },

  async updateMentor(id: string, updates: Partial<MentorApplication>) {
    const { data, error } = await supabase
      .from('mentor_applications')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data as MentorApplication
  }
}

// Authentication helpers - Simple table-based auth for demo
export const authApi = {
  async signIn(email: string, password: string) {
    // Check against admin_users table directly
    const { data: adminUser, error } = await supabase
      .from('admin_users')
      .select('*')
      .eq('email', email)
      .eq('password_hash', password)
      .single()

    if (error || !adminUser) {
      throw new Error('Invalid email or password')
    }

    // Store admin user info in localStorage for demo purposes
    localStorage.setItem('adminUser', JSON.stringify(adminUser))
    
    return { user: adminUser }
  },

  async signOut() {
    localStorage.removeItem('adminUser')
  },

  async getCurrentUser() {
    const adminUserData = localStorage.getItem('adminUser')
    if (adminUserData) {
      return JSON.parse(adminUserData)
    }
    return null
  },

  async getAdminUser(userId: string) {
    const { data, error } = await supabase
      .from('admin_users')
      .select('*')
      .eq('id', userId)
      .single()

    if (error) throw error
    return data as AdminUser
  }
}

export interface MentorApplication {
  id: string
  created_at: string
  updated_at?: string

  name: string
  year: string
  branch: string
  email: string
  phone?: string
  expertise?: string[]
  previous_experience?: string
  availability_per_week?: string

  status?: string
  admin_notes?: string
  processed_by?: string
}