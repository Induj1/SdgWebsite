import React, { useState, useEffect } from 'react';
import { ArrowLeft, Search } from 'lucide-react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ProjectSubmissionTracker, { ProjectSubmission } from '@/components/ProjectSubmissionTracker';
import SubmissionSuccess from '@/components/SubmissionSuccess';
import { projectsApi } from '@/lib/supabase';
import sdgLogo from '@/assets/sdg-club-logo.png';

const ProjectTracker = () => {
  const [searchParams] = useSearchParams();
  const [submissionId, setSubmissionId] = useState('');
  const [submission, setSubmission] = useState<ProjectSubmission | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  // Check if this is a success redirect
  useEffect(() => {
    const success = searchParams.get('success');
    const id = searchParams.get('id');
    const title = searchParams.get('title');
    
    if (success === 'true' && id && title) {
      setShowSuccess(true);
      setSubmissionId(id);
      // Auto-load the submission after showing success
      setTimeout(() => {
        setShowSuccess(false);
        handleSearch(id);
      }, 5000);
    }
  }, [searchParams]);

  const handleSearch = async (id?: string) => {
    const searchId = id || submissionId;
    if (!searchId.trim()) {
      setError('Please enter a submission ID');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const foundSubmission = await projectsApi.getSubmission(searchId);
      
      // Convert Supabase data to expected format
      const convertedSubmission: ProjectSubmission = {
        id: foundSubmission.id,
        title: foundSubmission.title,
        submissionDate: foundSubmission.created_at,
        status: foundSubmission.status,
        currentStage: foundSubmission.stage,
        lastUpdated: foundSubmission.updated_at,
        feedback: foundSubmission.feedback || undefined
      };
      
      setSubmission(convertedSubmission);
      setError('');
    } catch (error: any) {
      console.error('Search error:', error);
      setSubmission(null);
      setError('Submission not found. Please check your submission ID and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleTrackProgress = () => {
    setShowSuccess(false);
    const id = searchParams.get('id');
    if (id) {
      handleSearch(id);
    }
  };

  const handleSubmitAnother = () => {
    // Navigate back to projects page
    window.location.href = '/projects?tab=pitch';
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="hero-gradient text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-6">
            <Link to="/projects">
              <Button 
                size="sm" 
                className="bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white hover:text-black transition-all duration-300 font-medium shadow-lg"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Projects
              </Button>
            </Link>
          </div>
          
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <img 
                src={sdgLogo} 
                alt="MIT-BLR SDG Club Logo" 
                className="w-20 h-20 object-contain"
              />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Track Your <span className="text-gradient-white">Project Submission</span>
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Stay updated on your project's journey from idea to impact. 
              Enter your submission ID to track progress and milestones.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Show Success Message if redirected from submission */}
          {showSuccess && (
            <div className="mb-12">
              <SubmissionSuccess
                submissionId={searchParams.get('id') || ''}
                projectTitle={searchParams.get('title') || ''}
                onTrackProgress={handleTrackProgress}
                onSubmitAnother={handleSubmitAnother}
              />
            </div>
          )}

          {/* Search Section */}
          {!showSuccess && (
            <>
              <div className="max-w-2xl mx-auto mb-12">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-center">Find Your Submission</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Enter your submission ID (e.g., SDG-2024-001)"
                        value={submissionId}
                        onChange={(e) => setSubmissionId(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                      />
                      <Button 
                        onClick={() => handleSearch()}
                        disabled={loading}
                        className="flex-shrink-0"
                      >
                        <Search className="w-4 h-4 mr-2" />
                        {loading ? 'Searching...' : 'Search'}
                      </Button>
                    </div>
                    
                    {error && (
                      <Alert variant="destructive">
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )}

                    <div className="text-center text-sm text-muted-foreground">
                      <p>Don't have your submission ID? Check your confirmation email or contact us at{' '}
                        <a href="mailto:projects@mitblrsdg.club" className="text-primary hover:underline">
                          projects@mitblrsdg.club
                        </a>
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Submission Details */}
              {submission && (
                <div className="mb-12">
                  <ProjectSubmissionTracker submission={submission} />
                </div>
              )}

              {/* Instructions */}
              <div className="max-w-4xl mx-auto">
                <Card>
                  <CardHeader>
                    <CardTitle>Need Help?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-muted-foreground space-y-2">
                      <p>• Your submission ID was sent to your email after submitting your project</p>
                      <p>• The ID format is: SDG-YYYY-XXX (e.g., SDG-2024-001)</p>
                      <p>• Contact us at <a href="mailto:projects@mitblrsdg.club" className="text-primary hover:underline">projects@mitblrsdg.club</a> if you need assistance</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProjectTracker;