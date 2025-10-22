import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2 } from 'lucide-react';
import { mentorsApi } from '@/lib/supabase';

const Mentor: React.FC = () => {
  const [form, setForm] = useState({
    name: '',
    year: '',
    branch: '',
    email: '',
    phone: '',
    expertise: '',
    previous_experience: '',
    availability: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const validate = () => {
    return !!(form.name && form.email && form.year && form.branch);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!validate()) {
      setError('Please fill in the required fields (Name, Email, Year, Branch).');
      return;
    }

    setSubmitting(true);
    try {
      await mentorsApi.createMentor({
        name: form.name,
        year: form.year,
        branch: form.branch,
        email: form.email,
        phone: form.phone,
        expertise: form.expertise.split(',').map(s => s.trim()).filter(Boolean),
        previous_experience: form.previous_experience,
        availability_per_week: form.availability
      } as any);

      setSuccess('Thank you — your mentorship interest has been recorded. We will contact shortlisted mentors via email.');
      setForm({ name: '', year: '', branch: '', email: '', phone: '', expertise: '', previous_experience: '', availability: '' });
    } catch (err: any) {
      console.error('Mentor submission error', err);
      setError(err.message || 'Failed to submit your application. Please try again later.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Become a Mentor — SDG Mentorship Program</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-sm text-muted-foreground">
            Guide 2–3 student teams during a project cycle. Time commitment: 1–2 hours/week. Fill the short form below to apply.
          </p>

          {error && (
            <Alert variant="destructive" className="mb-4"><AlertDescription>{error}</AlertDescription></Alert>
          )}

          {success && (
            <Alert variant="default" className="mb-4"><AlertDescription>{success}</AlertDescription></Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>Name *</Label>
                <Input value={form.name} onChange={(e) => handleChange('name', e.target.value)} />
              </div>
              <div>
                <Label>Email *</Label>
                <Input type="email" value={form.email} onChange={(e) => handleChange('email', e.target.value)} />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>Year *</Label>
                <Select value={form.year} onValueChange={(v) => handleChange('year', v)}>
                  <SelectTrigger><SelectValue placeholder="Select year" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2">2nd Year</SelectItem>
                    <SelectItem value="3">3rd Year</SelectItem>
                    <SelectItem value="4">4th Year</SelectItem>
                    <SelectItem value="graduate">Graduate</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Branch *</Label>
                <Select value={form.branch} onValueChange={(v) => handleChange('branch', v)}>
                  <SelectTrigger><SelectValue placeholder="Select branch" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cse-core">CSE - Core</SelectItem>
                    <SelectItem value="cse-ai">CSE - AI</SelectItem>
                    <SelectItem value="cse-cybersecurity">CSE - Cybersecurity</SelectItem>
                    <SelectItem value="cse-datascience">CSE - Data Science</SelectItem>
                    <SelectItem value="it">IT</SelectItem>
                    <SelectItem value="ece">ECE</SelectItem>
                    <SelectItem value="ecm">ECM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label>Phone (optional)</Label>
              <Input value={form.phone} onChange={(e) => handleChange('phone', e.target.value)} />
            </div>

            <div>
              <Label>Areas of expertise / interest</Label>
              <Input placeholder="e.g., Full-stack, Design, Sustainability" value={form.expertise} onChange={(e) => handleChange('expertise', e.target.value)} />
              <p className="text-xs text-muted-foreground mt-1">Comma-separated</p>
            </div>

            <div>
              <Label>Previous project / experience (brief)</Label>
              <Textarea value={form.previous_experience} onChange={(e) => handleChange('previous_experience', e.target.value)} rows={3} />
            </div>

            <div>
              <Label>Availability per week</Label>
              <Input placeholder="e.g., 1 hour, 2 hours" value={form.availability} onChange={(e) => handleChange('availability', e.target.value)} />
            </div>

            <div className="flex justify-end">
              <Button type="submit" className="bg-gradient-to-r from-blue-600 to-green-600 text-white" disabled={submitting}>
                {submitting ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Submitting...</> : 'Apply to Mentor'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Mentor;
