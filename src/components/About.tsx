import React from 'react';
import { Target, Users, Lightbulb, Globe, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import sdgLogo from '@/assets/sdg-club-logo.png';

const About = () => {
  const values = [
    {
      icon: Target,
      title: "Mission-Driven",
      description: "Advancing UN SDGs through innovative technology solutions and collaborative action.",
      color: "bg-sdg-3"
    },
    {
      icon: Users,
      title: "Community-Focused",
      description: "Building a diverse network of changemakers, innovators, and sustainability advocates.",
      color: "bg-sdg-14"
    },
    {
      icon: Lightbulb,
      title: "Innovation-First",
      description: "Leveraging cutting-edge tech to solve complex sustainability challenges.",
      color: "bg-sdg-9"
    },
    {
      icon: Globe,
      title: "Global Impact",
      description: "Creating solutions that scale from local communities to global implementation.",
      color: "bg-sdg-17"
    }
  ];

  const team = [
    {
      name: "Induj Gupta",
      role: "President",
      description: "Leading MIT-BLR SDG Club towards sustainable innovation",
      image: "IG",
      color: "bg-sdg-14"
    },
    {
      name: "Akshita Oberoi",
      role: "Vice President",
      description: "Supporting strategic initiatives and community engagement",
      image: "AO",
      color: "bg-sdg-3"
    },
    {
      name: "Aishani Sharma",
      role: "General Secretary",
      description: "Managing club operations and member coordination",
      image: "AS",
      color: "bg-sdg-4"
    },
    {
      name: "Suhani Agrawal",
      role: "Treasurer",
      description: "Overseeing financial planning and budget management",
      image: "SA",
      color: "bg-sdg-8"
    },
    {
      name: "Ashmika Jain",
      role: "Creative Head",
      description: "Leading creative initiatives and visual communications",
      image: "AJ",
      color: "bg-sdg-11"
    },
    {
      name: "Parthav Udayasankar",
      role: "Research and Development Head",
      description: "Driving innovation and technology research projects",
      image: "PU",
      color: "bg-sdg-9"
    },
    {
      name: "Shiven Puri",
      role: "Operations and Logistics Head",
      description: "Managing event logistics and operational excellence",
      image: "SP",
      color: "bg-sdg-17"
    }
  ];

  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="flex justify-center mb-6">
            <img 
              src={sdgLogo} 
              alt="MIT-BLR SDG Club Mission" 
              className="w-16 h-16 object-contain"
            />
          </div>
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-4">
            <Globe className="w-4 h-4 mr-2" />
            About Our Mission
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Empowering <span className="text-gradient">Sustainable Innovation</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            MIT-BLR SDG Club is a dynamic community of students, faculty, and industry partners 
            committed to addressing global challenges through the lens of the UN Sustainable Development Goals.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          <Card className="hover-lift animate-fade-in-up">
            <CardContent className="p-8">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-6">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-muted-foreground leading-relaxed">
                To foster innovation and collaboration in addressing global sustainability challenges 
                through technology, research, and community engagement. We believe in the power of 
                young minds to create meaningful solutions that advance all 17 UN SDGs.
              </p>
            </CardContent>
          </Card>

          <Card className="hover-lift animate-fade-in-up">
            <CardContent className="p-8">
              <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center mb-6">
                <Lightbulb className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
              <p className="text-muted-foreground leading-relaxed">
                A world where every student has the knowledge, tools, and platform to contribute 
                meaningfully to sustainable development. We envision MIT-BLR as a hub for 
                SDG-focused innovation that creates lasting positive impact.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Core Values */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-center mb-12">Our Core Values</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="hover-lift animate-fade-in-up text-center">
                <CardContent className="p-6">
                  <div className={`w-16 h-16 ${value.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold mb-3">{value.title}</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Leadership Team */}
        <div>
          <h3 className="text-2xl font-bold text-center mb-12">Leadership Team</h3>
          <div className="max-w-6xl mx-auto">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {team.map((member, index) => (
                  <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                    <Card className="hover-lift animate-fade-in-up text-center h-full">
                      <CardContent className="p-6 flex flex-col h-full">
                        <div className={`w-20 h-20 ${member.color} rounded-full flex items-center justify-center mx-auto mb-4 text-white text-xl font-bold`}>
                          {member.image}
                        </div>
                        <h4 className="text-lg font-semibold mb-1">{member.name}</h4>
                        <p className="text-primary font-medium mb-2">{member.role}</p>
                        <p className="text-muted-foreground text-sm leading-relaxed flex-grow">
                          {member.description}
                        </p>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex" />
              <CarouselNext className="hidden md:flex" />
            </Carousel>
            
            {/* Mobile navigation dots */}
            <div className="flex justify-center mt-6 md:hidden space-x-2">
              {team.map((_, index) => (
                <div
                  key={index}
                  className="w-2 h-2 rounded-full bg-muted-foreground/30"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;