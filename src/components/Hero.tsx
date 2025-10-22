import React from 'react';
import { ArrowRight, Calendar, Target, Users, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SDGWheel from '@/components/SDGWheel';
import sdgLogo from '@/assets/sdg-club-logo.png';

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 sdg-gradient animate-gradient opacity-10"></div>
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]"></div>
      
      {/* Content */}
  <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column - Text Content */}
          <div className="animate-fade-in-up">
            <div className="flex justify-center lg:justify-start mb-6">
              <img 
                src={sdgLogo} 
                alt="MIT-BLR SDG Club" 
                className="w-16 h-16 object-contain"
              />
            </div>
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-6">
              <Target className="w-4 h-4 mr-2" />
              Sustainable Development Goals 2030
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Driving Innovation for a{' '}
              <span className="text-gradient">Sustainable Future</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 leading-relaxed">
              Join MIT-BLR SDG Club in our mission to advance the UN Sustainable Development Goals 
              through cutting-edge technology, collaborative innovation, and impactful community engagement.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button 
                size="lg" 
                className="hero-gradient text-white font-medium hover-lift"
                onClick={() => window.open('https://chat.whatsapp.com/LOoA6TT5dHPEndwNooNkDE', '_blank')}
              >
                Join Our Mission
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
              <Button 
                size="lg" 
                variant="outline" 
                className="hover-lift"
                onClick={() => window.open('https://hackspacehackathon.mitblrsdg.club/', '_blank')}
              >
                <Calendar className="mr-2 h-5 w-5" />
                Hackathon 2025
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">100+</div>
                <div className="text-sm text-muted-foreground">Active Members</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary mb-1">5+</div>
                <div className="text-sm text-muted-foreground">Events Hosted</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-sdg-14 mb-1">17</div>
                <div className="text-sm text-muted-foreground">SDG Goals</div>
              </div>
            </div>
          </div>
          
          {/* Right Column - SDG Wheel */}
          <div className="flex justify-center animate-scale-in">
            <SDGWheel />
          </div>
        </div>
      </div>

      {/* Floating CTA removed per request */}
    </section>
  );
};

export default Hero;