# MIT-BLR SDG Club - Admin Panel Setup Guide

This guide will help you set up the admin panel with Supabase backend integration.

## 🚀 Quick Setup

### 1. Environment Variables

Copy the `.env.example` file to `.env.local`:

```bash
cp .env.example .env.local
```

Update the Supabase configuration in `.env.local`:

```bash
VITE_SUPABASE_URL=your-supabase-project-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### 2. Supabase Setup

1. **Create a Supabase Project**
   - Go to [supabase.com](https://supabase.com)
   - Create a new project
   - Wait for setup completion

2. **Run the Database Schema**
   - Navigate to SQL Editor in your Supabase dashboard
   - Copy and paste the contents of `database/schema.sql`
   - Run the script to create tables and sample data

3. **Configure Authentication**
   - Go to Authentication > Settings in Supabase
   - Enable email/password authentication
   - Set up your domain URLs for redirects

4. **Set Row Level Security (RLS)**
   - The schema already includes RLS policies
   - Only authenticated admin users can access the data
   - Each admin user has role-based permissions

### 3. Admin User Setup

The schema creates sample admin users:
- **Email**: `admin@mitblrsdg.club`
- **Password**: You'll need to set this up in Supabase Auth

To create admin users:

1. Go to Authentication > Users in Supabase
2. Add new users with the emails from the `admin_users` table
3. Send them invites or set passwords manually

### 4. Admin Panel Features

#### 📊 Dashboard Overview
- Real-time statistics
- Submission status breakdown
- Monthly submission trends

#### 🔍 Submission Management
- **Search & Filter**: Find submissions by ID, name, or title
- **Status Updates**: Change submission status with email notifications
- **Detailed View**: Complete submission information including:
  - Personal details
  - Project description and SDG mapping
  - Team member information
  - File attachments
  - Admin notes and feedback

#### 👥 Team Collaboration
- **Role-based Access**: Admin, Reviewer, and Mentor roles
- **Activity Tracking**: All changes are logged with timestamps
- **Internal Notes**: Private admin notes for each submission

#### 📧 Email Integration
- **Automatic Notifications**: Status change emails to students
- **Confirmation Emails**: Sent upon project submission
- **Custom Messages**: Personalized feedback in status updates

### 5. Database Schema Overview

#### Core Tables:
- `admin_users` - Admin panel users with roles
- `project_submissions` - Student project submissions
- `project_updates` - Activity log for all changes

#### Key Features:
- **Auto-generated IDs**: Format `SDG-YYYY-XXX`
- **JSON Support**: Team members and attachments stored as JSON
- **Full-text Search**: Optimized search across titles and descriptions
- **Audit Trail**: Complete history of all changes

### 6. Security Features

- **Row Level Security (RLS)**: Database-level access control
- **Role-based Permissions**: Different access levels for admins
- **Session Management**: Secure JWT token handling
- **Input Validation**: Client and server-side validation

### 7. API Endpoints

The `projectsApi` object provides:

```typescript
// Get submissions with filters
await projectsApi.getSubmissions({ 
  status: 'under-review', 
  search: 'water',
  limit: 10 
})

// Update submission status
await projectsApi.updateStatus(id, 'selected', adminId, 'Great project!')

// Add internal notes
await projectsApi.addNote(id, 'Follow up needed', adminId)

// Get dashboard statistics
await projectsApi.getDashboardStats()
```

### 8. File Upload (Future Enhancement)

Currently, file names are stored as references. To implement actual file uploads:

1. Set up Supabase Storage bucket
2. Configure upload policies
3. Update the form to handle file uploads
4. Modify the database to store file URLs

### 9. Email Service Integration

The email templates are ready for integration with services like:
- **SendGrid**
- **Mailgun**
- **Resend**
- **Supabase Edge Functions**

Update the `sendConfirmationEmail` function in `EmailTemplate.tsx` to use your preferred service.

### 10. Deployment

For production deployment:

1. **Environment Variables**: Set up production Supabase credentials
2. **Domain Configuration**: Update Supabase auth settings
3. **SSL/HTTPS**: Ensure secure connections
4. **CORS**: Configure allowed origins in Supabase

### 11. Development Workflow

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Access admin panel
http://localhost:8081/admin
```

### 12. Troubleshooting

#### Common Issues:

1. **"Cannot connect to Supabase"**
   - Check environment variables
   - Verify Supabase project is active
   - Check network connectivity

2. **"User not authorized"**
   - Ensure user exists in `admin_users` table
   - Check RLS policies
   - Verify user role permissions

3. **"Submission not found"**
   - Check submission ID format
   - Verify data exists in database
   - Check database permissions

#### Debug Mode:
Enable console logging by adding to your `.env.local`:
```bash
VITE_DEBUG=true
```

### 13. Next Steps

Consider implementing:
- **File upload to Supabase Storage**
- **Real-time notifications with WebSockets**
- **Advanced analytics dashboard**
- **Bulk operations for submissions**
- **Export functionality (CSV, PDF)**
- **Mobile app for admin access**

---

## 🛠 Technical Stack

- **Frontend**: React + TypeScript + Vite
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **UI Framework**: shadcn/ui + Tailwind CSS
- **State Management**: React Hooks
- **Routing**: React Router

## 📞 Support

For technical issues or questions:
- **Email**: tech@mitblrsdg.club
- **Documentation**: [Supabase Docs](https://supabase.com/docs)
- **Community**: [Supabase Discord](https://discord.supabase.com)

---

*Built with ❤️ for sustainable innovation at MIT-BLR*