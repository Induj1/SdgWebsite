import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Plus, Send, ChevronDown, ChevronUp, Upload, X, 
  Lightbulb, Users, Clock, Target,
  UserPlus, Trash2, FileText, Loader2, AlertCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { sendConfirmationEmail } from '@/components/EmailTemplate';
import { projectsApi } from '@/lib/supabase';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role?: string;
}

interface FormData {
  // Personal Info
  name: string;
  email: string;
  phone: string;
  registrationNumber: string;
  branch: string;
  year: string;
  
  // Project Info
  title: string;
  primarySDG: string;
  secondarySDGs: string[];
  description: string;
  timeline: string;
  impact: string;
  
  // Team Members
  teamMembers: TeamMember[];
  
  // Files
  attachments: File[];
}

const ProjectSubmissionForm: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [showExample, setShowExample] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    registrationNumber: '',
    branch: '',
    year: '',
    title: '',
    primarySDG: '',
    secondarySDGs: [],
    description: '',
    timeline: '',
    impact: '',
    teamMembers: [],
    attachments: []
  });

  const totalSteps = 3;
  const progress = (currentStep / totalSteps) * 100;

  const sdgOptions = [
    { value: 'sdg-1', label: '1 - No Poverty', color: 'bg-red-600' },
    { value: 'sdg-2', label: '2 - Zero Hunger', color: 'bg-yellow-600' },
    { value: 'sdg-3', label: '3 - Good Health', color: 'bg-green-600' },
    { value: 'sdg-4', label: '4 - Quality Education', color: 'bg-red-700' },
    { value: 'sdg-5', label: '5 - Gender Equality', color: 'bg-orange-600' },
    { value: 'sdg-6', label: '6 - Clean Water & Sanitation', color: 'bg-blue-400' },
    { value: 'sdg-7', label: '7 - Affordable Clean Energy', color: 'bg-yellow-500' },
    { value: 'sdg-8', label: '8 - Decent Work', color: 'bg-red-800' },
    { value: 'sdg-9', label: '9 - Industry Innovation', color: 'bg-orange-700' },
    { value: 'sdg-10', label: '10 - Reduced Inequalities', color: 'bg-pink-600' },
    { value: 'sdg-11', label: '11 - Sustainable Cities', color: 'bg-orange-500' },
    { value: 'sdg-12', label: '12 - Responsible Consumption', color: 'bg-yellow-700' },
    { value: 'sdg-13', label: '13 - Climate Action', color: 'bg-green-700' },
    { value: 'sdg-14', label: '14 - Life Below Water', color: 'bg-blue-600' },
    { value: 'sdg-15', label: '15 - Life on Land', color: 'bg-green-500' },
    { value: 'sdg-16', label: '16 - Peace & Justice', color: 'bg-blue-800' },
    { value: 'sdg-17', label: '17 - Partnerships', color: 'bg-blue-900' }
  ];

  const exampleProject = {
    title: "Campus Rainwater Harvesting System",
    primarySDG: "sdg-6",
    secondarySDGs: ["sdg-11", "sdg-13"],
    description: "A comprehensive rainwater harvesting system for MIT-BLR campus that includes smart collection points, filtration systems, and IoT monitoring. The system will collect rainwater from rooftops and common areas, filter it for various uses, and provide real-time monitoring through sensors. This addresses water scarcity issues while promoting sustainable campus practices.",
    timeline: "6",
    impact: "Expected to reduce campus water consumption by 30%, save ₹2L annually in water costs, and serve as a demonstration model for other institutions. Will directly benefit 5000+ students and staff while contributing to water conservation awareness."
  };

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addTeamMember = () => {
    const newMember: TeamMember = {
      id: Date.now().toString(),
      name: '',
      email: '',
      role: ''
    };
    setFormData(prev => ({
      ...prev,
      teamMembers: [...prev.teamMembers, newMember]
    }));
  };

  const updateTeamMember = (id: string, field: keyof TeamMember, value: string) => {
    setFormData(prev => ({
      ...prev,
      teamMembers: prev.teamMembers.map(member =>
        member.id === id ? { ...member, [field]: value } : member
      )
    }));
  };

  const removeTeamMember = (id: string) => {
    setFormData(prev => ({
      ...prev,
      teamMembers: prev.teamMembers.filter(member => member.id !== id)
    }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const validFiles = files.filter(file => file.size <= 10 * 1024 * 1024); // 10MB limit
    
    setFormData(prev => ({
      ...prev,
      attachments: [...prev.attachments, ...validFiles]
    }));
  };

  const removeFile = (index: number) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index)
    }));
  };

  const toggleSecondarySDG = (sdg: string) => {
    setFormData(prev => ({
      ...prev,
      secondarySDGs: prev.secondarySDGs.includes(sdg)
        ? prev.secondarySDGs.filter(s => s !== sdg)
        : [...prev.secondarySDGs, sdg]
    }));
  };

  const fillExample = () => {
    setFormData(prev => ({
      ...prev,
      ...exampleProject
    }));
    setShowExample(false);
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(formData.name && formData.email && formData.phone && formData.registrationNumber && formData.branch && formData.year);
      case 2:
        return !!(formData.title && formData.primarySDG && formData.description);
      case 3:
        return !!(formData.timeline && formData.impact);
      default:
        return false;
    }
  };

  const nextStep = () => {
    if (currentStep < totalSteps && validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStep(currentStep)) {
      setError('Please fill in all required fields.');
      return;
    }

    setSubmitting(true);
    setError('');
    
    try {
      const submissionData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        registration_number: formData.registrationNumber,
        branch: formData.branch,
        year: formData.year,
        title: formData.title,
        description: formData.description,
        primary_sdg: formData.primarySDG,
        secondary_sdgs: formData.secondarySDGs,
        timeline: formData.timeline,
        expected_impact: formData.impact,
        team_members: formData.teamMembers,
        attachments: formData.attachments.map(file => file.name),
        status: 'received' as const,
        stage: 0,
        admin_notes: '',
        feedback: '',
        submission_ip: undefined,
        user_agent: navigator.userAgent
      };

      // Save to Supabase
      const savedSubmission = await projectsApi.createSubmission(submissionData);
      
      // Send confirmation email
      try {
        await sendConfirmationEmail({
          name: formData.name,
          email: formData.email,
          projectTitle: formData.title,
          submissionId: savedSubmission.id
        });
      } catch (emailError) {
        console.error('Failed to send confirmation email:', emailError);
        // Don't fail the entire submission if email fails
      }
      
      // Redirect to success page
      navigate(`/track-project?success=true&id=${savedSubmission.id}&title=${encodeURIComponent(formData.title)}`);
      
    } catch (error: any) {
      console.error('Submission error:', error);
      setError(error.message || 'Failed to submit your project. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const stepTitles = [
    "Personal Information",
    "Project Details", 
    "Timeline & Impact"
  ];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Bar */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Submit Your Project Idea</h3>
            <span className="text-sm text-muted-foreground">
              Step {currentStep} of {totalSteps}
            </span>
          </div>
          
          <Progress value={progress} className="h-2 mb-4" />
          
          <div className="flex justify-between text-sm">
            {stepTitles.map((title, index) => (
              <div key={index} className={`flex items-center ${
                index + 1 <= currentStep ? 'text-primary' : 'text-muted-foreground'
              }`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs mr-2 ${
                  index + 1 <= currentStep ? 'bg-primary text-white' : 'bg-muted'
                }`}>
                  {index + 1}
                </div>
                <span className="hidden sm:inline">{title}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Example Project Inspiration */}
      <Card className="mb-8 bg-blue-50 border-blue-200">
        <Collapsible open={showExample} onOpenChange={setShowExample}>
          <CollapsibleTrigger asChild>
            <CardHeader className="cursor-pointer hover:bg-blue-100/50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-blue-600" />
                  <CardTitle className="text-lg text-blue-900">
                    💡 Need Inspiration? Check out a sample project idea
                  </CardTitle>
                </div>
                {showExample ? (
                  <ChevronUp className="w-5 h-5 text-blue-600" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-blue-600" />
                )}
              </div>
            </CardHeader>
          </CollapsibleTrigger>
          
          <CollapsibleContent>
            <CardContent className="pt-0">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-blue-900 mb-2">
                    {exampleProject.title}
                  </h4>
                  <div className="flex gap-2 mb-3">
                    <Badge className="bg-blue-100 text-blue-800">
                      Primary: {sdgOptions.find(s => s.value === exampleProject.primarySDG)?.label}
                    </Badge>
                    {exampleProject.secondarySDGs.map(sdg => (
                      <Badge key={sdg} variant="outline" className="text-blue-700">
                        {sdgOptions.find(s => s.value === sdg)?.label}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-sm text-blue-800 leading-relaxed">
                    {exampleProject.description}
                  </p>
                </div>
                
                <Button 
                  onClick={fillExample}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Use This Example
                </Button>
              </div>
            </CardContent>
          </CollapsibleContent>
        </Collapsible>
      </Card>

      {/* Main Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            {stepTitles[currentStep - 1]}
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          {/* Error Alert */}
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Your Name *</Label>
                    <Input 
                      id="name" 
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input 
                      id="phone" 
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="registrationNumber">Registration Number *</Label>
                    <Input 
                      id="registrationNumber" 
                      placeholder="Enter your registration number"
                      value={formData.registrationNumber}
                      onChange={(e) => handleInputChange('registrationNumber', e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="branch">Branch *</Label>
                    <Select value={formData.branch} onValueChange={(value) => handleInputChange('branch', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select branch" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cse">Computer Science & Engineering</SelectItem>
                        <SelectItem value="ece">Electronics & Communication</SelectItem>
                        <SelectItem value="eee">Electrical & Electronics</SelectItem>
                        <SelectItem value="mech">Mechanical Engineering</SelectItem>
                        <SelectItem value="civil">Civil Engineering</SelectItem>
                        <SelectItem value="chem">Chemical Engineering</SelectItem>
                        <SelectItem value="it">Information Technology</SelectItem>
                        <SelectItem value="biotech">Biotechnology</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="year">Year of Study *</Label>
                    <Select value={formData.year} onValueChange={(value) => handleInputChange('year', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select year" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1st Year</SelectItem>
                        <SelectItem value="2">2nd Year</SelectItem>
                        <SelectItem value="3">3rd Year</SelectItem>
                        <SelectItem value="4">4th Year</SelectItem>
                        <SelectItem value="graduate">Graduate</SelectItem>
                        <SelectItem value="faculty">Faculty</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Team Members Section */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Team Members (Optional)</Label>
                    <Button 
                      type="button"
                      variant="outline" 
                      size="sm"
                      onClick={addTeamMember}
                      disabled={formData.teamMembers.length >= 3}
                    >
                      <UserPlus className="w-4 h-4 mr-2" />
                      Add Member
                    </Button>
                  </div>
                  
                  {formData.teamMembers.map((member, index) => (
                    <div key={member.id} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">Team Member {index + 1}</h4>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeTeamMember(member.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-3">
                        <Input
                          placeholder="Full name"
                          value={member.name}
                          onChange={(e) => updateTeamMember(member.id, 'name', e.target.value)}
                        />
                        <Input
                          type="email"
                          placeholder="Email address"
                          value={member.email}
                          onChange={(e) => updateTeamMember(member.id, 'email', e.target.value)}
                        />
                      </div>
                      
                      <Input
                        placeholder="Role in project (optional)"
                        value={member.role || ''}
                        onChange={(e) => updateTeamMember(member.id, 'role', e.target.value)}
                      />
                    </div>
                  ))}
                  
                  <p className="text-sm text-muted-foreground">
                    Add up to 3 team members. All members will receive updates about the project.
                  </p>
                </div>
              </div>
            )}

            {/* Step 2: Project Details */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <Label htmlFor="title">Project Title *</Label>
                  <Input 
                    id="title" 
                    placeholder="Give your project a compelling name"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="primarySDG">Primary SDG Focus *</Label>
                  <Select value={formData.primarySDG} onValueChange={(value) => handleInputChange('primarySDG', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select primary SDG focus" />
                    </SelectTrigger>
                    <SelectContent>
                      {sdgOptions.map((sdg) => (
                        <SelectItem key={sdg.value} value={sdg.value}>
                          <div className="flex items-center gap-2">
                            <div className={`w-3 h-3 rounded ${sdg.color}`}></div>
                            {sdg.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Additional SDG Categories (Optional)</Label>
                  <p className="text-sm text-muted-foreground mb-3">
                    Select any additional SDGs your project addresses
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {sdgOptions
                      .filter(sdg => sdg.value !== formData.primarySDG)
                      .map((sdg) => (
                        <Badge
                          key={sdg.value}
                          variant={formData.secondarySDGs.includes(sdg.value) ? "default" : "outline"}
                          className="cursor-pointer hover:bg-primary/80 transition-colors"
                          onClick={() => toggleSecondarySDG(sdg.value)}
                        >
                          <div className={`w-2 h-2 rounded mr-2 ${sdg.color}`}></div>
                          {sdg.label.split(' - ')[0]}
                        </Badge>
                      ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Project Description *</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Describe your project idea, the problem it solves, and your proposed solution..."
                    rows={4}
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    required
                  />
                </div>

                {/* File Upload Section */}
                <div className="space-y-4">
                  <Label>Supporting Documents (Optional)</Label>
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                    <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground mb-2">
                      Attach supporting documents (PDFs, sketches, or presentations)
                    </p>
                    <p className="text-xs text-muted-foreground mb-4">Max 10MB per file</p>
                    <input
                      type="file"
                      id="file-upload"
                      className="hidden"
                      multiple
                      accept=".pdf,.doc,.docx,.ppt,.pptx,.jpg,.jpeg,.png"
                      onChange={handleFileUpload}
                    />
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => document.getElementById('file-upload')?.click()}
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      Choose Files
                    </Button>
                  </div>
                  
                  {formData.attachments.length > 0 && (
                    <div className="space-y-2">
                      <Label>Attached Files:</Label>
                      {formData.attachments.map((file, index) => (
                        <div key={index} className="flex items-center justify-between bg-muted p-3 rounded">
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4" />
                            <span className="text-sm">{file.name}</span>
                            <span className="text-xs text-muted-foreground">
                              ({(file.size / 1024 / 1024).toFixed(1)} MB)
                            </span>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFile(index)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Step 3: Timeline & Impact */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-1 gap-4">
                  <div>
                    <Label htmlFor="timeline">Expected Timeline *</Label>
                    <Select value={formData.timeline} onValueChange={(value) => handleInputChange('timeline', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Project duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="3">3 months</SelectItem>
                        <SelectItem value="6">6 months</SelectItem>
                        <SelectItem value="12">1 year</SelectItem>
                        <SelectItem value="18">1.5 years</SelectItem>
                        <SelectItem value="24">2 years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="impact">Expected Impact *</Label>
                  <Textarea 
                    id="impact" 
                    placeholder="How will your project create positive impact? Include metrics if possible..."
                    rows={3}
                    value={formData.impact}
                    onChange={(e) => handleInputChange('impact', e.target.value)}
                    required
                  />
                </div>

                {/* Summary Section */}
                <Card className="bg-muted/50">
                  <CardHeader>
                    <CardTitle className="text-lg">Submission Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Project:</span> {formData.title || 'Not specified'}
                      </div>
                      <div>
                        <span className="font-medium">Primary SDG:</span> {
                          sdgOptions.find(s => s.value === formData.primarySDG)?.label || 'Not selected'
                        }
                      </div>
                      <div>
                        <span className="font-medium">Timeline:</span> {
                          formData.timeline ? `${formData.timeline} months` : 'Not specified'
                        }
                      </div>
                      <div>
                        <span className="font-medium">Team Size:</span> {formData.teamMembers.length + 1} member(s)
                      </div>
                    </div>
                    
                    {formData.secondarySDGs.length > 0 && (
                      <div>
                        <span className="font-medium text-sm">Additional SDGs:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {formData.secondarySDGs.map(sdg => (
                            <Badge key={sdg} variant="secondary" className="text-xs">
                              {sdgOptions.find(s => s.value === sdg)?.label.split(' - ')[0]}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6 border-t">
              <Button 
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="bg-white border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 px-6 py-2 font-medium transition-all duration-200"
              >
                Previous
              </Button>
              
              <div className="flex gap-2">
                {currentStep < totalSteps ? (
                  <Button 
                    type="button"
                    onClick={nextStep}
                    disabled={!validateStep(currentStep)}
                    className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-6 py-2 font-medium hover:from-blue-700 hover:to-green-700 shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    Next Step
                  </Button>
                ) : (
                  <Button 
                    type="submit"
                    disabled={!validateStep(currentStep) || submitting}
                    className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-6 py-2 font-medium hover:from-blue-700 hover:to-green-700 shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit Project Pitch <Send className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectSubmissionForm;