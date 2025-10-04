import React from 'react';
import { ArrowLeft, Lightbulb, Rocket, Users, DollarSign, TrendingUp, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ProjectSubmissionForm from '@/components/ProjectSubmissionForm';
import sdgLogo from '@/assets/sdg-club-logo.png';

const Projects = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <section className="pt-24 pb-12 hero-gradient text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-6">
            <Link to="/">
              <Button 
                size="sm" 
                className="bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white hover:text-black transition-all duration-300 font-medium shadow-lg"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <img src={sdgLogo} alt="SDG Club" className="h-12 w-12" />
              <div>
                <h1 className="text-3xl md:text-4xl font-bold">MIT-BLR SDG Club</h1>
                <p className="text-xl text-white/90">Projects Portal</p>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Building Sustainable Solutions for Tomorrow
            </h2>
            <p className="text-lg text-white/90 mb-6">
              Join us in creating innovative projects that address the UN Sustainable Development Goals.
            </p>
            <Button 
              size="lg" 
              className="bg-white text-black hover:bg-white/90 font-medium shadow-lg"
              onClick={() => document.getElementById('pitch-section')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Lightbulb className="w-5 h-5 mr-2" />
              Submit Your Idea
            </Button>
          </div>
        </div>
      </section>

      <section id="pitch-section" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Pitch Your Sustainability Project</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Have an innovative idea for sustainable development? We provide incubation, funding, 
              mentorship, and technical support to bring your vision to life.
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-6 mb-12">
            <Card className="text-center hover-lift">
              <CardContent className="p-6">
                <DollarSign className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Funding Support</h3>
                <p className="text-sm text-muted-foreground">Up to ₹10L funding for promising projects</p>
              </CardContent>
            </Card>
            <Card className="text-center hover-lift">
              <CardContent className="p-6">
                <Users className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Expert Mentorship</h3>
                <p className="text-sm text-muted-foreground">Connect with industry experts and faculty</p>
              </CardContent>
            </Card>
            <Card className="text-center hover-lift">
              <CardContent className="p-6">
                <Rocket className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Technical Support</h3>
                <p className="text-sm text-muted-foreground">Access to labs, equipment, and resources</p>
              </CardContent>
            </Card>
            <Card className="text-center hover-lift">
              <CardContent className="p-6">
                <TrendingUp className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Progress Tracking</h3>
                <p className="text-sm text-muted-foreground">Real-time updates on your project status</p>
              </CardContent>
            </Card>
          </div>

          <ProjectSubmissionForm />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Projects;
