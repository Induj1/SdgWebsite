import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import AdminDashboard from '@/components/AdminDashboard';
import { AuthProvider, AuthGuard } from '@/components/AdminAuth';
import sdgLogo from '@/assets/sdg-club-logo.png';

const AdminContent = () => {
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
              Project <span className="text-gradient-white">Administration</span>
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Manage project submissions, track progress, and coordinate with students 
              to bring innovative sustainability ideas to life.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <AdminDashboard />
      </section>

      <Footer />
    </div>
  );
};

const Admin = () => {
  return (
    <AuthProvider>
      <AuthGuard>
        <AdminContent />
      </AuthGuard>
    </AuthProvider>
  );
};

export default Admin;