import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Eye, Edit3, MessageSquare, Filter, Search, Download, RefreshCw,
  Calendar, User, Mail, Phone, ExternalLink, FileText, Loader2,
  BarChart3, TrendingUp, Users, CheckCircle, Clock, AlertCircle,
  LogOut, Settings, Plus, Trash2
} from 'lucide-react';
import { projectsApi, ProjectSubmission, supabase } from '@/lib/supabase';
import { useAuth } from '@/components/AdminAuth';

interface DashboardStats {
  total: number;
  received: number;
  underReview: number;
  selected: number;
  inProgress: number;
  completed: number;
  rejected: number;
  thisMonth: number;
}

const AdminDashboard: React.FC = () => {
  const { adminUser, signOut } = useAuth();
  const [submissions, setSubmissions] = useState<ProjectSubmission[]>([]);
  const [mentors, setMentors] = useState<any[]>([]);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [selectedSubmission, setSelectedSubmission] = useState<ProjectSubmission | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState('');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const itemsPerPage = 10;
  const [totalMentors, setTotalMentors] = useState(0);
  const [mentorPage, setMentorPage] = useState(1);

  const [activeAdminTab, setActiveAdminTab] = useState<'projects' | 'mentors'>('projects');

  useEffect(() => {
    loadData();
  }, [currentPage, filterStatus, searchTerm]);

  useEffect(() => {
    if (activeAdminTab === 'mentors') loadMentors();
  }, [mentorPage, activeAdminTab]);

  useEffect(() => {
    if (activeAdminTab === 'projects') {
      // Reset pages and reload submissions when switching back to projects
      setCurrentPage(1);
      loadData();
    }
  }, [activeAdminTab]);

  const loadData = async () => {
    try {
      setLoading(true);
      setError('');

      // Load submissions with filters
      const { data: submissionsData, count } = await projectsApi.getSubmissions({
        status: filterStatus,
        search: searchTerm,
        limit: itemsPerPage,
        offset: (currentPage - 1) * itemsPerPage
      });

      setSubmissions(submissionsData || []);
      setTotalCount(count || 0);

      // Load dashboard stats
      const statsData = await projectsApi.getDashboardStats();
      setStats(statsData);

    } catch (error: any) {
      console.error('Failed to load data:', error);
      setError('Failed to load data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const loadMentors = async () => {
    try {
      setLoading(true);
      setError('');
      const { mentorsApi } = await import('@/lib/supabase');
      const { data: mentorData, count } = await mentorsApi.getMentors({ limit: itemsPerPage, offset: (mentorPage - 1) * itemsPerPage });
      setMentors(mentorData || []);
      setTotalMentors(count || 0);
    } catch (error: any) {
      console.error('Failed to load mentors:', error);
      setError('Failed to load mentor applications.');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (submissionId: string, newStatus: string, message?: string) => {
    try {
      setUpdating(true);
      await projectsApi.updateStatus(submissionId, newStatus as ProjectSubmission['status'], adminUser!.id, message);
      
      // Refresh data
      await loadData();
      
      // Update selected submission if it's the one being updated
      if (selectedSubmission?.id === submissionId) {
        const updatedSubmission = await projectsApi.getSubmission(submissionId);
        setSelectedSubmission(updatedSubmission);
      }
    } catch (error: any) {
      console.error('Failed to update status:', error);
      setError('Failed to update status. Please try again.');
    } finally {
      setUpdating(false);
    }
  };

  const handleAddNote = async (submissionId: string, note: string) => {
    try {
      setUpdating(true);
      await projectsApi.addNote(submissionId, note, adminUser!.id);
      
      // Refresh the selected submission
      if (selectedSubmission?.id === submissionId) {
        const updatedSubmission = await projectsApi.getSubmission(submissionId);
        setSelectedSubmission(updatedSubmission);
      }
      
      await loadData();
    } catch (error: any) {
      console.error('Failed to add note:', error);
      setError('Failed to add note. Please try again.');
    } finally {
      setUpdating(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'received': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'under-review': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'selected': return 'bg-green-100 text-green-800 border-green-200';
      case 'in-progress': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'completed': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const totalPages = Math.ceil(totalCount / itemsPerPage);

  if (loading && submissions.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {adminUser?.name} ({adminUser?.role})
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="inline-flex rounded-md bg-muted p-1">
            <button
              className={`px-3 py-1 rounded-md ${activeAdminTab === 'projects' ? 'bg-white shadow' : 'bg-transparent'}`}
              onClick={() => setActiveAdminTab('projects')}
            >
              Projects
            </button>
            <button
              className={`px-3 py-1 rounded-md ${activeAdminTab === 'mentors' ? 'bg-white shadow' : 'bg-transparent'}`}
              onClick={() => setActiveAdminTab('mentors')}
            >
              Mentors
            </button>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={loadData}
            disabled={loading}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </Button>
          <Button variant="outline" onClick={signOut}>
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Stats Cards */}
      {stats && (
        <div className="grid md:grid-cols-4 lg:grid-cols-8 gap-4">
          <Card className="md:col-span-2">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
                  <div className="text-sm text-muted-foreground">Total Submissions</div>
                </div>
                <FileText className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-blue-500">{stats.received}</div>
              <div className="text-sm text-muted-foreground">Received</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-yellow-500">{stats.underReview}</div>
              <div className="text-sm text-muted-foreground">Under Review</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-green-500">{stats.selected}</div>
              <div className="text-sm text-muted-foreground">Selected</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-purple-500">{stats.inProgress}</div>
              <div className="text-sm text-muted-foreground">In Progress</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-emerald-500">{stats.completed}</div>
              <div className="text-sm text-muted-foreground">Completed</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-gray-500">{stats.thisMonth}</div>
              <div className="text-sm text-muted-foreground">This Month</div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by title, name, or ID..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1); // Reset to first page when searching
                  }}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterStatus} onValueChange={(value) => {
              setFilterStatus(value);
              setCurrentPage(1); // Reset to first page when filtering
            }}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="received">Received</SelectItem>
                <SelectItem value="under-review">Under Review</SelectItem>
                <SelectItem value="selected">Selected</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Submissions Table */}
      {activeAdminTab === 'projects' && (
        <Card>
        <CardHeader>
          <CardTitle>Project Submissions ({totalCount} total)</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-6 h-6 animate-spin mr-2" />
              <span>Loading submissions...</span>
            </div>
          ) : submissions.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No submissions found matching your criteria.
            </div>
          ) : (
            <div className="space-y-4">
              {submissions.map((submission) => (
                <div key={submission.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold">{submission.title}</h3>
                        <Badge className={getStatusColor(submission.status)}>
                          {submission.status.charAt(0).toUpperCase() + submission.status.slice(1).replace('-', ' ')}
                        </Badge>
                      </div>
                      
                      <div className="grid md:grid-cols-3 gap-4 text-sm text-muted-foreground mb-3">
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {submission.name}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {formatDate(submission.created_at)}
                        </div>
                        <div className="flex items-center gap-1">
                          <FileText className="w-4 h-4" />
                          {submission.id}
                        </div>
                      </div>
                      
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {submission.description}
                      </p>
                    </div>
                    
                    <div className="flex gap-2 ml-4">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setSelectedSubmission(submission)}
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>{selectedSubmission?.title}</DialogTitle>
                          </DialogHeader>
                          {selectedSubmission && (
                            <SubmissionDetailModal
                              submission={selectedSubmission}
                              onStatusUpdate={handleStatusUpdate}
                              onAddNote={handleAddNote}
                              updating={updating}
                              adminUser={adminUser!}
                            />
                          )}
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-6">
              <div className="text-sm text-muted-foreground">
                Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, totalCount)} of {totalCount} submissions
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                <span className="flex items-center px-3 text-sm">
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </CardContent>
        </Card>
      )}

      {/* Mentor Applications Table */}
      {activeAdminTab === 'mentors' && (
        <Card>
          <CardHeader>
            <CardTitle>Mentor Applications ({totalMentors} total)</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin mr-2" />
                <span>Loading mentor applications...</span>
              </div>
            ) : mentors.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">No mentor applications found.</div>
            ) : (
              <div className="space-y-4">
                {mentors.map((m) => (
                  <div key={m.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold">{m.name}</h3>
                          <Badge className="bg-gray-100 text-gray-800 border-gray-200">{m.status || 'received'}</Badge>
                        </div>

                        <div className="grid md:grid-cols-3 gap-4 text-sm text-muted-foreground mb-3">
                          <div className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            {m.email}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {formatDate(m.created_at)}
                          </div>
                          <div className="flex items-center gap-1">
                            <Phone className="w-4 h-4" />
                            {m.phone || '—'}
                          </div>
                        </div>

                        <p className="text-sm text-muted-foreground line-clamp-2">
                          Expertise: {Array.isArray(m.expertise) ? m.expertise.join(', ') : (m.expertise || 'Not specified')}
                        </p>
                      </div>

                      <div className="flex gap-2 ml-4">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4 mr-1" />
                              View
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>{m.name}</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="text-sm">
                                <div><strong>Email:</strong> {m.email}</div>
                                <div><strong>Phone:</strong> {m.phone || '—'}</div>
                                <div><strong>Year / Branch:</strong> {m.year} / {m.branch}</div>
                                <div><strong>Availability:</strong> {m.availability_per_week || '—'}</div>
                                <div><strong>Expertise:</strong> {Array.isArray(m.expertise) ? m.expertise.join(', ') : (m.expertise || 'Not specified')}</div>
                              </div>
                              {m.previous_experience && (
                                <div>
                                  <h4 className="font-medium">Previous Experience</h4>
                                  <p className="text-sm text-muted-foreground">{m.previous_experience}</p>
                                </div>
                              )}
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

interface SubmissionDetailModalProps {
  submission: ProjectSubmission;
  onStatusUpdate: (id: string, status: string, message?: string) => Promise<void>;
  onAddNote: (id: string, note: string) => Promise<void>;
  updating: boolean;
  adminUser: any;
}

const SubmissionDetailModal: React.FC<SubmissionDetailModalProps> = ({
  submission,
  onStatusUpdate,
  onAddNote,
  updating,
  adminUser
}) => {
  const [newStatus, setNewStatus] = useState(submission.status);
  const [updateMessage, setUpdateMessage] = useState('');
  const [note, setNote] = useState(submission.admin_notes || '');

  const handleStatusUpdate = async () => {
    if (newStatus !== submission.status) {
      await onStatusUpdate(submission.id, newStatus, updateMessage);
      setUpdateMessage('');
    }
  };

  const handleNoteUpdate = async () => {
    if (note !== (submission.admin_notes || '')) {
      await onAddNote(submission.id, note);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'received': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'under-review': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'selected': return 'bg-green-100 text-green-800 border-green-200';
      case 'in-progress': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'completed': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="details" className="w-full">
        <TabsList>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="admin">Admin</TabsTrigger>
        </TabsList>
        
        <TabsContent value="details" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-3">Contact Information</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{submission.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>{submission.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>{submission.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Year {submission.year}</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-3">Project Information</h4>
              <div className="space-y-2 text-sm">
                <div><strong>Primary SDG:</strong> {submission.primary_sdg}</div>
                <div><strong>Timeline:</strong> {submission.timeline} months</div>
                <div><strong>Funding:</strong> {submission.funding_approved ?? 'N/A'}</div>
                <div>
                  <strong>Status:</strong>
                  <Badge className={`ml-2 ${getStatusColor(submission.status)}`}>
                    {submission.status.charAt(0).toUpperCase() + submission.status.slice(1).replace('-', ' ')}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
          
          {submission.secondary_sdgs && submission.secondary_sdgs.length > 0 && (
            <div>
              <h4 className="font-medium mb-2">Additional SDGs</h4>
              <div className="flex flex-wrap gap-2">
                {submission.secondary_sdgs.map((sdg, index) => (
                  <Badge key={index} variant="outline">{sdg}</Badge>
                ))}
              </div>
            </div>
          )}
          
          <div>
            <h4 className="font-medium mb-2">Description</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">{submission.description}</p>
          </div>
          
          <div>
            <h4 className="font-medium mb-2">Expected Impact</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">{submission.expected_impact}</p>
          </div>
        </TabsContent>
        
        <TabsContent value="team" className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">Team Leader</h4>
            <div className="border rounded p-3">
              <div className="font-medium">{submission.name}</div>
              <div className="text-sm text-muted-foreground">{submission.email}</div>
              <div className="text-sm text-muted-foreground">Year {submission.year}</div>
            </div>
          </div>
          
          {submission.team_members && submission.team_members.length > 0 && (
            <div>
              <h4 className="font-medium mb-2">Team Members</h4>
              <div className="space-y-2">
                {submission.team_members.map((member: any, index: number) => (
                  <div key={index} className="border rounded p-3">
                    <div className="font-medium">{member.name}</div>
                    <div className="text-sm text-muted-foreground">{member.email}</div>
                    {member.role && (
                      <div className="text-sm text-muted-foreground">Role: {member.role}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </TabsContent>
        
        {/* Files tab removed */}
        
        <TabsContent value="admin" className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">Update Status</h4>
            <div className="space-y-3">
              <Select value={newStatus} onValueChange={(v) => setNewStatus(v as any)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="received">Received</SelectItem>
                  <SelectItem value="under-review">Under Review</SelectItem>
                  <SelectItem value="selected">Selected</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
              
              {newStatus !== submission.status && (
                <div className="space-y-2">
                  <Textarea 
                    placeholder="Message to send to student (optional)..."
                    value={updateMessage}
                    onChange={(e) => setUpdateMessage(e.target.value)}
                    rows={2}
                  />
                  <Button 
                    onClick={handleStatusUpdate}
                    disabled={updating}
                    size="sm"
                  >
                    {updating ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                        Updating...
                      </>
                    ) : (
                      'Update Status'
                    )}
                  </Button>
                </div>
              )}
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-2">Internal Notes</h4>
            <div className="space-y-2">
              <Textarea 
                placeholder="Add internal notes..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={4}
              />
              <Button 
                onClick={handleNoteUpdate}
                disabled={updating || note === (submission.admin_notes || '')}
                size="sm"
              >
                {updating ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                    Saving...
                  </>
                ) : (
                  'Save Notes'
                )}
              </Button>
            </div>
          </div>
          
          {submission.feedback && (
            <div>
              <h4 className="font-medium mb-2">Latest Feedback</h4>
              <div className="bg-muted/50 p-3 rounded text-sm">
                {submission.feedback}
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;