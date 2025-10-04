import React from 'react';
import { Sparkles, Award, Handshake, Target, Users, TrendingUp, Globe, Star, CheckCircle, Mail, Phone } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import sdgLogo from '@/assets/sdg-club-logo.png';

const Sponsors = () => {
  const sponsors = [
    {
      name: "Honeywell",
      logo: "HW",
      tier: "Platinum",
      description: "Leading technology and manufacturing company",
      color: "bg-sdg-9"
    },
    {
      name: "Microsoft",
      logo: "MS",
      tier: "Gold",
      description: "Cloud computing and AI solutions",
      color: "bg-sdg-4"
    },
    {
      name: "Tata Consultancy",
      logo: "TCS",
      tier: "Gold", 
      description: "IT services and consulting",
      color: "bg-sdg-8"
    },
    {
      name: "Infosys",
      logo: "INF",
      tier: "Silver",
      description: "Digital services and consulting",
      color: "bg-sdg-17"
    },
    {
      name: "Wipro",
      logo: "WIP",
      tier: "Silver",
      description: "Information technology company",
      color: "bg-sdg-3"
    },
    {
      name: "ITC Limited",
      logo: "ITC",
      tier: "Bronze",
      description: "Diversified conglomerate",
      color: "bg-sdg-15"
    }
  ];

  const sponsorshipPackages = [
    {
      tier: "Platinum",
      price: "₹10L+",
      color: "from-purple-500 to-purple-600",
      features: [
        "Title sponsor for major events",
        "Logo on all marketing materials",
        "Dedicated networking sessions",
        "Access to talent pipeline",
        "Co-branded research opportunities",
        "Board advisory position",
        "Quarterly impact reports"
      ]
    },
    {
      tier: "Gold",
      price: "₹5-10L",
      color: "from-yellow-500 to-yellow-600",
      popular: true,
      features: [
        "Event co-sponsorship opportunities",
        "Premium logo placement",
        "Mentor recruitment access",
        "Student project partnerships",
        "Industry speaking opportunities",
        "Bi-annual progress updates"
      ]
    },
    {
      tier: "Silver",
      price: "₹2-5L",
      color: "from-gray-400 to-gray-500",
      features: [
        "Workshop sponsorship",
        "Standard logo placement",
        "Resume database access",
        "Campus recruitment events",
        "Newsletter mentions",
        "Annual impact summary"
      ]
    },
    {
      tier: "Bronze",
      price: "₹50K-2L",
      color: "from-orange-500 to-orange-600",
      features: [
        "Community event support",
        "Website recognition",
        "Social media mentions",
        "Student engagement programs",
        "Networking opportunities"
      ]
    }
  ];

  const benefits = [
    {
      icon: Target,
      title: "Brand Alignment with SDGs",
      description: "Associate your brand with UN Sustainable Development Goals and showcase your commitment to global impact."
    },
    {
      icon: Users,
      title: "Access to Top Talent",
      description: "Connect with MIT-BLR's brightest minds in sustainability, technology, and innovation for recruitment and partnerships."
    },
    {
      icon: TrendingUp,
      title: "Innovation Pipeline",
      description: "Get early access to cutting-edge research, student projects, and breakthrough solutions in sustainability tech."
    },
    {
      icon: Globe,
      title: "Market Leadership",
      description: "Position your organization as a sustainability leader and thought leader in your industry."
    }
  ];

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'Platinum': return 'text-purple-600 bg-purple-100';
      case 'Gold': return 'text-yellow-600 bg-yellow-100';
      case 'Silver': return 'text-gray-600 bg-gray-100';
      case 'Bronze': return 'text-orange-600 bg-orange-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <>
      {/* Sponsor Us Hero Section */}
      <section className="py-20 hero-gradient text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in-up">
            <div className="flex justify-center mb-6">
              <img 
                src={sdgLogo} 
                alt="MIT-BLR SDG Club Partnership" 
                className="w-20 h-20 object-contain"
              />
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Partner with <span className="text-gradient-white">Innovation</span>
            </h1>
            <p className="text-xl text-white/90 max-w-4xl mx-auto leading-relaxed mb-8">
              Join industry leaders in supporting MIT-BLR SDG Club's mission to create 
              sustainable solutions that drive global impact. Together, we're building 
              the future of sustainability through technology and innovation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
                <Handshake className="mr-2 h-5 w-5" />
                Become a Sponsor
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Mail className="mr-2 h-5 w-5" />
                Download Partnership Guide
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Sponsor Us */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Why <span className="text-gradient">Partner</span> with Us?
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Partnering with MIT-BLR SDG Club offers unique opportunities to drive innovation, 
              access top talent, and make a meaningful impact on global sustainability challenges.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {benefits.map((benefit, index) => (
              <Card key={index} className="hover-lift text-center">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-3">{benefit.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">500+</div>
              <div className="text-muted-foreground">Active Members</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">50+</div>
              <div className="text-muted-foreground">Events Annually</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">20+</div>
              <div className="text-muted-foreground">Industry Partners</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">100K+</div>
              <div className="text-muted-foreground">Annual Reach</div>
            </div>
          </div>
        </div>
      </section>

      {/* Sponsorship Packages */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Sponsorship <span className="text-gradient">Packages</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Choose a partnership level that aligns with your organization's goals and 
              maximize your impact on sustainable development.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {sponsorshipPackages.map((pkg, index) => (
              <Card key={index} className={`hover-lift relative ${pkg.popular ? 'ring-2 ring-primary' : ''}`}>
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-white">
                      <Star className="w-3 h-3 mr-1" />
                      Most Popular
                    </Badge>
                  </div>
                )}
                <CardHeader className="text-center pb-4">
                  <div className={`w-16 h-16 bg-gradient-to-r ${pkg.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl">{pkg.tier}</CardTitle>
                  <div className="text-3xl font-bold text-primary">{pkg.price}</div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full mt-6 ${pkg.popular ? 'bg-primary hover:bg-primary/90' : ''}`}
                    variant={pkg.popular ? 'default' : 'outline'}
                  >
                    Choose {pkg.tier}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Current Partners */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center mb-16 animate-fade-in-up">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-4">
              <Handshake className="w-4 h-4 mr-2" />
              Our Current Partners
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Trusted by <span className="text-gradient">Industry Leaders</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              We're proud to collaborate with organizations that share our commitment 
              to sustainable innovation and positive global impact.
            </p>
          </div>

          {/* Sponsors Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-16">
            {sponsors.map((sponsor, index) => (
              <Card key={index} className="hover-lift animate-fade-in-up text-center group cursor-pointer">
                <CardContent className="p-6">
                  <div className={`w-16 h-16 ${sponsor.color} rounded-xl flex items-center justify-center mx-auto mb-4 text-white font-bold text-lg group-hover:scale-110 transition-transform`}>
                    {sponsor.logo}
                  </div>
                  <h3 className="font-semibold text-sm mb-2">{sponsor.name}</h3>
                  <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getTierColor(sponsor.tier)}`}>
                    {sponsor.tier}
                  </div>
                  <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                    {sponsor.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Partnership Tiers Info */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <Card className="hover-lift animate-fade-in-up">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-3">Platinum Partners</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Strategic partners driving major initiatives and providing comprehensive support for our SDG missions.
                </p>
              </CardContent>
            </Card>

            <Card className="hover-lift animate-fade-in-up">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-3">Gold & Silver</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Valued partners supporting specific programs, events, and providing mentorship opportunities.
                </p>
              </CardContent>
            </Card>

            <Card className="hover-lift animate-fade-in-up">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Handshake className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-3">Bronze & Community</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Growing network of supporters helping us reach more communities and amplify our impact.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="hero-gradient text-white animate-fade-in-up">
            <CardContent className="p-12 text-center">
              <div className="flex justify-center mb-6">
                <img 
                  src={sdgLogo} 
                  alt="Partner with MIT-BLR SDG Club" 
                  className="w-16 h-16 object-contain opacity-90"
                />
              </div>
              <h3 className="text-3xl font-bold mb-4">Ready to Make an Impact?</h3>
              <p className="mb-8 opacity-90 max-w-3xl mx-auto text-lg">
                Join our partnership network and help shape the future of sustainable development. 
                Together, we can accelerate progress toward the UN SDGs and create lasting positive change.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="secondary" size="lg" className="bg-white text-primary hover:bg-white/90">
                  <Phone className="mr-2 h-5 w-5" />
                  Schedule a Call
                </Button>
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                  <Mail className="mr-2 h-5 w-5" />
                  Send Partnership Inquiry
                </Button>
              </div>
              <div className="mt-8 pt-8 border-t border-white/20">
                <p className="text-white/80 text-sm">
                  Contact our Partnership Team: partnerships@mitblr-sdg.org | +91 98765 43210
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
};

export default Sponsors;