import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, Clock, AlertCircle, Rocket, Target } from 'lucide-react';

export interface ProjectSubmission {
  id: string;
  title: string;
  submissionDate: string;
  status: 'received' | 'under-review' | 'selected' | 'in-progress' | 'completed' | 'rejected';
  currentStage: number;
  lastUpdated: string;
  feedback?: string;
}

interface ProjectSubmissionTrackerProps {
  submission: ProjectSubmission;
}

const ProjectSubmissionTracker: React.FC<ProjectSubmissionTrackerProps> = ({ submission }) => {
  const stages = [
    {
      id: 'received',
      title: 'Received',
      description: 'Your idea has been submitted successfully',
      icon: CheckCircle,
      emoji: '📥'
    },
    {
      id: 'under-review',
      title: 'Under Review',
      description: 'Our team is evaluating your proposal',
      icon: Clock,
      emoji: '🧠'
    },
    {
      id: 'selected',
      title: 'Selected for Stage 2',
      description: 'Congratulations! Your idea has been shortlisted',
      icon: Target,
      emoji: '✨'
    },
    {
      id: 'in-progress',
      title: 'In Progress',
      description: 'Your project is being developed',
      icon: Rocket,
      emoji: '🛠'
    },
    {
      id: 'completed',
      title: 'Completed',
      description: 'Project successfully completed',
      icon: CheckCircle,
      emoji: '✅'
    }
  ];

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

  const getProgressPercentage = () => {
    const statusIndex = stages.findIndex(stage => stage.id === submission.status);
    return statusIndex >= 0 ? ((statusIndex + 1) / stages.length) * 100 : 0;
  };

  const currentStageIndex = stages.findIndex(stage => stage.id === submission.status);

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-xl mb-2">{submission.title}</CardTitle>
            <p className="text-sm text-muted-foreground">
              Submitted on {new Date(submission.submissionDate).toLocaleDateString()}
            </p>
          </div>
          <Badge variant="outline" className={getStatusColor(submission.status)}>
            {submission.status.charAt(0).toUpperCase() + submission.status.slice(1).replace('-', ' ')}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Progress</span>
            <span className="text-sm text-muted-foreground">{Math.round(getProgressPercentage())}%</span>
          </div>
          <Progress value={getProgressPercentage()} className="h-2" />
        </div>

        {/* Stage Timeline */}
        <div className="space-y-4">
          {stages.map((stage, index) => {
            const Icon = stage.icon;
            const isCompleted = index <= currentStageIndex;
            const isCurrent = index === currentStageIndex;
            
            return (
              <div key={stage.id} className="flex items-start gap-4">
                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                  isCompleted 
                    ? 'bg-primary text-primary-foreground border-primary' 
                    : 'bg-muted text-muted-foreground border-muted-foreground/20'
                }`}>
                  {isCompleted ? (
                    <Icon className="w-5 h-5" />
                  ) : (
                    <span className="text-lg">{stage.emoji}</span>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className={`font-medium ${isCompleted ? 'text-foreground' : 'text-muted-foreground'}`}>
                      {stage.emoji} {stage.title}
                    </h4>
                    {isCurrent && (
                      <Badge variant="secondary" className="text-xs">Current</Badge>
                    )}
                  </div>
                  <p className={`text-sm ${isCompleted ? 'text-muted-foreground' : 'text-muted-foreground/60'}`}>
                    {stage.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Feedback Section */}
        {submission.feedback && (
          <div className="bg-muted/50 p-4 rounded-lg">
            <h4 className="font-medium mb-2 flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              Latest Update
            </h4>
            <p className="text-sm text-muted-foreground">{submission.feedback}</p>
            <p className="text-xs text-muted-foreground mt-2">
              Last updated: {new Date(submission.lastUpdated).toLocaleDateString()}
            </p>
          </div>
        )}

        {/* Next Steps */}
        {submission.status !== 'completed' && submission.status !== 'rejected' && (
          <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">What's Next?</h4>
            <p className="text-sm text-blue-800">
              {submission.status === 'received' && "Our evaluation team will review your submission within 2 weeks."}
              {submission.status === 'under-review' && "We're currently evaluating your project proposal. You'll hear from us soon!"}
              {submission.status === 'selected' && "Congratulations! Our team will contact you within 3-5 days to discuss next steps."}
              {submission.status === 'in-progress' && "Your project is being developed. We'll keep you updated on progress milestones."}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProjectSubmissionTracker;