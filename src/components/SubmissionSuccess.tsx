import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, ArrowRight, Mail, Calendar } from 'lucide-react';

interface SubmissionSuccessProps {
  submissionId: string;
  projectTitle: string;
  onTrackProgress: () => void;
  onSubmitAnother: () => void;
}

const SubmissionSuccess: React.FC<SubmissionSuccessProps> = ({
  submissionId,
  projectTitle,
  onTrackProgress,
  onSubmitAnother
}) => {
  return (
    <div className="max-w-2xl mx-auto text-center space-y-6">
      {/* Success Icon */}
      <div className="flex justify-center mb-6">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
          <CheckCircle className="w-12 h-12 text-green-600" />
        </div>
      </div>

      {/* Success Message */}
      <div className="space-y-4">
        <h2 className="text-3xl font-bold text-foreground">
          🎉 Your idea has been submitted!
        </h2>
        <p className="text-lg text-muted-foreground">
          Thank you for sharing your innovative project idea with us. 
          We're excited to review "{projectTitle}" and explore its potential impact.
        </p>
      </div>

      {/* Submission Details */}
      <Card className="text-left">
        <CardHeader>
          <CardTitle className="text-lg">Submission Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Submission ID:</span>
            <Badge variant="outline" className="font-mono">{submissionId}</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Project Title:</span>
            <span className="text-sm font-medium">{projectTitle}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Submitted:</span>
            <span className="text-sm">{new Date().toLocaleDateString()}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Status:</span>
            <Badge className="bg-blue-100 text-blue-800 border-blue-200">
              📥 Received
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-6">
          <h3 className="font-semibold text-blue-900 mb-3">What happens next?</h3>
          <div className="space-y-2 text-sm text-blue-800">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 flex-shrink-0" />
              <span>You'll receive a confirmation email within 5 minutes</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 flex-shrink-0" />
              <span>Our team will review your submission within 2 weeks</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 flex-shrink-0" />
              <span>You can track your progress anytime using the link below</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button 
          onClick={onTrackProgress}
          className="hero-gradient text-white font-medium hover-lift"
          size="lg"
        >
          Track Progress
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
        
        <Button 
          onClick={onSubmitAnother}
          variant="outline"
          size="lg"
        >
          Submit Another Idea
        </Button>
      </div>

      {/* Contact Info */}
      <div className="pt-6 border-t">
        <p className="text-sm text-muted-foreground">
          Have questions? Feel free to reach out to us at{' '}
          <a href="mailto:projects@mitblrsdg.club" className="text-primary hover:underline">
            projects@mitblrsdg.club
          </a>
        </p>
      </div>
    </div>
  );
};

export default SubmissionSuccess;