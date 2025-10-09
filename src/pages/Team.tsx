import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Mail, Linkedin, Github, Users, Target, Heart, Award, ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import sdgLogo from '@/assets/sdg-club-logo.png';
import indujImage from '@/assets/team/induj.jpg';
import aishaniImage from '@/assets/team/aishani.jpg';
import ashmikaImage from '@/assets/team/ashmika.jpg';
import suhaniImage from '@/assets/team/suhani.jpg';
import parthavImage from '@/assets/team/parthav.jpg';
import akshitaImage from '@/assets/team/akshita.jpg';
import shivenImage from '@/assets/team/shiven.jpg';

const Team = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const carouselRef = useRef(null);
  const autoPlayRef = useRef(null);

  // Team members data - you'll need to add the actual image paths
  const teamMembers = [
    {
      id: 1,
      name: "Induj",
      role: "President",
      description: "Leading the SDG Club with passion for sustainable innovation and environmental impact.",
      image: indujImage,
      email: "induj.mitblr2023@learner.manipal.edu",
      linkedin: "https://www.linkedin.com/in/induj-gupta-35382752/",
      specialties: ["Leadership", "Environmental Science", "Innovation"]
    },
    {
      id: 2,
      name: "Akshita",
      role: "Vice President",
      description: "Supporting leadership and driving strategic initiatives for sustainable development.",
      image: akshitaImage,
      email: "akshita@mitblr.edu.in",
      linkedin: "#",
      specialties: ["Strategic Planning", "Leadership", "Team Coordination"]
    },
    {
      id: 3,
      name: "Aishani",
      role: "General Secretary",
      description: "Managing organizational affairs and coordinating club activities and communications.",
      image: aishaniImage,
      email: "aishani@mitblr.edu.in",
      linkedin: "#",
      specialties: ["Administration", "Communication", "Organization"]
    },
    {
      id: 4,
      name: "Suhani",
      role: "Treasurer",
      description: "Managing club finances and ensuring efficient resource allocation for sustainability projects.",
      image: suhaniImage,
      email: "suhani@mitblr.edu.in",
      linkedin: "#",
      specialties: ["Financial Management", "Budget Planning", "Resource Allocation"]
    },
    {
      id: 5,
      name: "Ashmika",
      role: "Marketing Head",
      description: "Leading marketing strategies and brand promotion for SDG awareness and engagement.",
      image: ashmikaImage,
      email: "ashmika@mitblr.edu.in",
      linkedin: "#",
      specialties: ["Digital Marketing", "Brand Strategy", "Social Media"]
    },
    {
      id: 6,
      name: "Shiven",
      role: "Operations & Logistics Head",
      description: "Ensuring smooth operations and coordinating logistics for all club activities and events.",
      image: shivenImage,
      email: "shiven@mitblr.edu.in",
      linkedin: "#",
      specialties: ["Operations Management", "Event Logistics", "Coordination"]
    },
    {
      id: 7,
      name: "Parthav",
      role: "Content Head",
      description: "Creating and managing content strategy to effectively communicate SDG initiatives.",
      image: parthavImage,
      email: "parthav@mitblr.edu.in",
      linkedin: "#",
      specialties: ["Content Strategy", "Creative Writing", "Digital Communication"]
    }
  ];

  const clubStats = [
    { icon: Users, label: "Active Members", value: "50+" },
    { icon: Target, label: "Projects Completed", value: "25+" },
    { icon: Heart, label: "Community Impact", value: "1000+" },
    { icon: Award, label: "Awards Won", value: "5+" }
  ];

  // Carousel functionality
  const cardsPerView = 3;
  const maxSlide = Math.max(0, teamMembers.length - cardsPerView);
  
  const nextSlide = () => {
    setCurrentSlide((prev) => {
      if (prev === 0) {
        // Show Induj's slide for longer time
        setTimeout(() => setCurrentSlide(1), 6000);
        return prev;
      }
      return prev >= maxSlide ? 0 : prev + 1;
    });
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev <= 0 ? maxSlide : prev - 1));
  };

  const goToSlide = (index) => {
    setCurrentSlide(Math.min(index, maxSlide));
  };

  const toggleAutoPlay = () => {
    setIsAutoPlay(!isAutoPlay);
  };

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlay) {
      autoPlayRef.current = setInterval(() => {
        nextSlide();
      }, 4000);
    } else {
      clearInterval(autoPlayRef.current);
    }

    return () => clearInterval(autoPlayRef.current);
  }, [isAutoPlay, currentSlide]);

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Header */}
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
                <p className="text-xl text-white/90">Our Team</p>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Meet Our Leadership Team
            </h2>
            <p className="text-lg text-white/90 mb-6 max-w-3xl mx-auto">
              Passionate individuals driving sustainable change at MIT-BLR through innovation, 
              collaboration, and dedication to the UN Sustainable Development Goals.
            </p>
          </div>
        </div>
      </section>

      {/* Club Stats */}
      <section className="py-16 relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5" />
        <div className="absolute inset-0 opacity-5">
          <div className="grid grid-cols-8 gap-4 h-full">
            {Array.from({ length: 32 }, (_, i) => (
              <div 
                key={i} 
                className="bg-primary rounded-full w-1 h-1 animate-pulse"
                style={{ animationDelay: `${i * 200}ms` }}
              />
            ))}
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {clubStats.map((stat, index) => (
              <Card 
                key={index} 
                className="group relative overflow-hidden border-0 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <CardContent className="p-8 text-center relative">
                  {/* Background Icon */}
                  <div className="absolute top-2 right-2 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                    <stat.icon className="w-16 h-16 text-primary" />
                  </div>
                  
                  {/* Main Icon */}
                  <div className="relative bg-gradient-to-br from-primary to-secondary p-3 rounded-2xl w-fit mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  {/* Stats */}
                  <div className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2 group-hover:scale-105 transition-transform duration-300">
                    {stat.value}
                  </div>
                  <div className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                    {stat.label}
                  </div>
                  
                  {/* Decorative Line */}
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-500" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team Carousel */}
      <section className="py-20 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-6">
              <Users className="w-5 h-5 text-primary" />
              <span className="text-primary font-medium">Meet Our Leaders</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-primary/80 to-secondary bg-clip-text text-transparent">
              Leadership Team
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
              Passionate visionaries driving sustainable change through innovation, collaboration, 
              and unwavering commitment to the UN Sustainable Development Goals.
            </p>

            {/* Carousel Controls */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <Button
                onClick={prevSlide}
                size="sm"
                className="h-12 w-12 p-0 rounded-full bg-white border-2 border-blue-200 text-blue-600 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              
              <Button
                onClick={toggleAutoPlay}
                size="sm"
                className="h-12 px-6 rounded-full bg-white border-2 border-blue-200 text-blue-600 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl font-medium"
              >
                {isAutoPlay ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                {isAutoPlay ? 'Pause' : 'Play'}
              </Button>
              
              <Button
                onClick={nextSlide}
                size="sm"
                className="h-12 w-12 p-0 rounded-full bg-white border-2 border-blue-200 text-blue-600 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Carousel Container */}
          <div className="relative">
            <div 
              ref={carouselRef}
              className="overflow-hidden rounded-3xl"
            >
              <div 
                className="flex transition-transform duration-700 ease-out"
                style={{ 
                  transform: `translateX(-${currentSlide * (100 / 3)}%)`,
                }}
              >
                {teamMembers.map((member, index) => (
                  <div 
                    key={member.id}
                    className="w-1/3 flex-shrink-0 px-4"
                  >
                    <Card className="group relative overflow-hidden border-0 shadow-2xl bg-white/90 backdrop-blur-sm hover:shadow-3xl transition-all duration-500 hover:-translate-y-3 mx-auto max-w-sm h-[600px]">
                      {/* Role Badge */}
                      <div className="absolute top-4 right-4 z-10">
                        <Badge className="bg-gradient-to-r from-primary to-secondary text-white shadow-lg font-medium px-3 py-1 text-sm">
                          {member.role}
                        </Badge>
                      </div>

                      {/* Image Section */}
                      <div className="relative overflow-hidden h-80">
                        <img 
                          src={member.image} 
                          alt={member.name}
                          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                        />
                        
                        {/* Overlay with Social Links */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                          <div className="absolute bottom-4 left-4 right-4">
                            <div className="flex gap-3 justify-center">
                              <Button 
                                size="sm" 
                                className="h-10 w-10 p-0 bg-white/90 backdrop-blur-md border-2 border-white text-gray-700 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-300 rounded-full shadow-lg"
                                onClick={() => window.open(`mailto:${member.email}`)}
                              >
                                <Mail className="w-4 h-4" />
                              </Button>
                              <Button 
                                size="sm" 
                                className="h-10 w-10 p-0 bg-white/90 backdrop-blur-md border-2 border-white text-gray-700 hover:bg-green-600 hover:text-white hover:border-green-600 transition-all duration-300 rounded-full shadow-lg"
                                onClick={() => window.open(member.linkedin)}
                              >
                                <Linkedin className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Content Section */}
                      <CardContent className="p-6 space-y-4 flex-1">
                        <div className="text-center">
                          <h3 className="text-xl font-bold mb-2 text-gray-900 group-hover:text-primary transition-colors duration-300">
                            {member.name}
                          </h3>
                          <p className="text-sm text-gray-600 leading-relaxed mb-4">
                            {member.description}
                          </p>
                        </div>
                        
                        {/* Specialties */}
                        <div className="space-y-2">
                          <p className="text-xs font-bold text-gray-500 uppercase tracking-wide text-center">Expertise</p>
                          <div className="flex flex-wrap gap-1 justify-center">
                            {member.specialties.map((specialty, specialtyIndex) => (
                              <Badge 
                                key={specialtyIndex} 
                                className="text-xs px-2 py-1 bg-primary/10 text-primary border border-primary/20 hover:bg-primary hover:text-white transition-all duration-300"
                              >
                                {specialty}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        {/* Removed Connect button */}
                      </CardContent>

                      {/* Decorative Elements */}
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary" />
                    </Card>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Dots */}
            <div className="flex justify-center mt-8 gap-2">
              {Array.from({ length: maxSlide + 1 }, (_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide 
                      ? 'bg-gradient-to-r from-primary to-secondary scale-125' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>

            {/* Progress Bar */}
            <div className="mt-6 max-w-md mx-auto">
              <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-700 ease-out"
                  style={{ width: `${((currentSlide + 1) / (maxSlide + 1)) * 100}%` }}
                />
              </div>
              <div className="flex justify-between mt-2 text-sm text-gray-500">
                <span>Slide {currentSlide + 1} of {maxSlide + 1}</span>
                <span>Showing {Math.min(cardsPerView, teamMembers.length - currentSlide)} members</span>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-20">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/20 to-secondary/20 backdrop-blur-sm px-6 py-3 rounded-full mb-6 border border-primary/20">
              <Heart className="w-5 h-5 text-primary" />
              <span className="text-primary font-medium">Join Our Mission</span>
            </div>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Ready to make a difference? Join our team of changemakers and help build a sustainable future.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-primary to-secondary hover:shadow-lg transition-all duration-300 text-white font-medium px-8 py-3 rounded-full"
                asChild
              >
                <Link to="/projects">
                  Submit Your Project
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-primary/20 hover:bg-primary hover:text-white transition-all duration-300 px-8 py-3 rounded-full"
                asChild
              >
                <Link to="/gallery">
                  View Our Gallery
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 via-transparent to-primary/10" />
        <div className="absolute top-1/4 left-0 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-0 w-72 h-72 bg-secondary/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            {/* Mission Badge */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/20 to-secondary/20 backdrop-blur-sm px-6 py-3 rounded-full mb-8 border border-primary/20">
              <Target className="w-5 h-5 text-primary" />
              <span className="text-primary font-semibold">Our Mission</span>
            </div>
            
            {/* Main Heading */}
            <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-gray-900 via-primary to-secondary bg-clip-text text-transparent leading-tight">
              Empowering Tomorrow's <br />
              <span className="relative">
                Changemakers
                <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary rounded-full" />
              </span>
            </h2>
            
            {/* Mission Text */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-xl border border-primary/10 mb-10">
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-4xl mx-auto">
                To empower students at MIT-BLR to become <span className="font-semibold text-primary">catalysts for sustainable development</span> by providing 
                platforms for innovation, collaboration, and meaningful action towards achieving the <span className="font-semibold text-secondary">UN 
                Sustainable Development Goals</span>. We believe in creating lasting impact through technology, 
                community engagement, and sustainable practices.
              </p>
            </div>
            
            {/* Mission Values */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
              {["Innovation", "Sustainability", "Community Impact", "Collaboration", "Leadership"].map((value, index) => (
                <div 
                  key={index}
                  className="group relative"
                >
                  <Badge 
                    className="w-full py-3 px-6 text-sm font-medium bg-gradient-to-r from-white to-gray-50 text-gray-700 border-2 border-primary/20 hover:border-primary hover:shadow-lg transition-all duration-300 cursor-pointer group-hover:scale-105"
                  >
                    {value}
                  </Badge>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                </div>
              ))}
            </div>

            {/* Impact Numbers */}
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-1">17</div>
                <div className="text-sm text-gray-600">SDG Goals</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary mb-1">1+</div>
                <div className="text-sm text-gray-600">Years Impact</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-1">∞</div>
                <div className="text-sm text-gray-600">Possibilities</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Join Our Team</h2>
          <p className="text-muted-foreground mb-8">
            Ready to make a difference? Join our community of changemakers and help build a sustainable future.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link to="/projects">
                Submit Your Project
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/gallery">
                View Our Gallery
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Team;