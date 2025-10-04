import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle, Github, Linkedin, Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    inquiryType: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission here
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      content: "indujgupta@gmail.com",
      link: "mailto:indujgupta@gmail.com",
      color: "bg-sdg-3"
    },
    {
      icon: Phone,
      title: "Call Us",
      content: "+91 95694 06171",
      link: "tel:+919569406171",
      color: "bg-sdg-14"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      content: "Manipal Academy Of Higher Education Bengaluru BSF Campus, Yelahanka, Govindapura, Bengaluru, Karnataka 560064",
      link: "https://maps.google.com/?q=Manipal+Academy+Higher+Education+Bengaluru+BSF+Campus+Yelahanka",
      color: "bg-sdg-9"
    }
  ];

  const socialLinks = [
    {
      icon: Github,
      name: "GitHub",
      url: "https://github.com/mit-blr-sdg-club",
      color: "hover:text-gray-600"
    },
    {
      icon: Linkedin,
      name: "LinkedIn",
      url: "https://www.linkedin.com/company/sdg-club-mit-blr/",
      color: "hover:text-blue-600"
    },
    {
      icon: Instagram,
      name: "Instagram",
      url: "https://www.instagram.com/sdgclub_mitblr/profilecard/?igsh=NDR4b3VoanZsOWpm",
      color: "hover:text-pink-600"
    },
    {
      icon: MessageCircle,
      name: "Discord",
      url: "https://discord.gg/mit-blr-sdg",
      color: "hover:text-indigo-600"
    }
  ];

  const inquiryTypes = [
    "General Inquiry",
    "Join the Club",
    "Event Registration",
    "Partnership Opportunity",
    "Media & Press",
    "Sponsorship",
    "Technical Support"
  ];

  return (
    <section id="contact" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-4">
            <MessageCircle className="w-4 h-4 mr-2" />
            Get In Touch
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Let's Create <span className="text-gradient">Impact Together</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Ready to join our mission? Have questions about our initiatives? 
            We'd love to hear from you and explore how we can collaborate for a sustainable future.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          
          {/* Contact Information */}
          <div className="space-y-8">
            <Card className="animate-fade-in-up">
              <CardHeader>
                <CardTitle className="text-2xl">Connect With Us</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-4 group">
                    <div className={`w-12 h-12 ${info.color} rounded-lg flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110`}>
                      <info.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">{info.title}</h4>
                      <a 
                        href={info.link}
                        className="text-muted-foreground hover:text-primary transition-colors"
                        target={info.link.startsWith('http') ? '_blank' : undefined}
                        rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                      >
                        {info.content}
                      </a>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Social Links */}
            <Card className="animate-fade-in-up">
              <CardHeader>
                <CardTitle>Follow Our Journey</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-12 h-12 bg-muted rounded-lg flex items-center justify-center transition-all hover:scale-110 hover:shadow-lg ${social.color}`}
                      title={social.name}
                    >
                      <social.icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Interactive Map */}
            <Card className="animate-fade-in-up">
              <CardHeader>
                <CardTitle>Find Us On Campus</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video rounded-lg overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.4648833826757!2d77.58961367507556!3d13.123322087236067!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae19d502aa02b3%3A0xb31f075ede4c71ab!2sManipal%20Academy%20of%20Higher%20Education%2C%20Bengaluru!5e0!3m2!1sen!2sin!4v1695210456789!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="MIT-BLR Campus Location"
                  />
                </div>
                <div className="mt-4 text-center">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => window.open('https://www.google.co.in/maps/place/Manipal+Academy+of+Higher+Education,+Bengaluru/@13.1233221,77.5896137,17z/data=!3m1!4b1!4m6!3m5!1s0x3bae19d502aa02b3:0xb31f075ede4c71ab!8m2!3d13.1233221!4d77.5921886!16s%2Fg%2F11sqnl75nc?entry=ttu&g_ep=EgoyMDI1MDkxNy4wIKXMDSoASAFQAw%3D%3D', '_blank')}
                  >
                    <MapPin className="w-4 h-4 mr-2" />
                    Open in Google Maps
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <Card className="animate-fade-in-up">
            <CardHeader>
              <CardTitle className="text-2xl">Send Us a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Name Field */}
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    required
                  />
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                  />
                </div>

                {/* Inquiry Type */}
                <div className="space-y-2">
                  <Label htmlFor="inquiry">Inquiry Type</Label>
                  <Select onValueChange={(value) => handleInputChange('inquiryType', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select inquiry type" />
                    </SelectTrigger>
                    <SelectContent>
                      {inquiryTypes.map((type) => (
                        <SelectItem key={type} value={type.toLowerCase().replace(/\s+/g, '-')}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Message Field */}
                <div className="space-y-2">
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us about your inquiry, ideas, or how you'd like to get involved..."
                    className="min-h-[120px] resize-none"
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    required
                  />
                </div>

                {/* Submit Button */}
                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full hero-gradient text-white font-medium hover-lift"
                >
                  Send Message
                  <Send className="ml-2 h-5 w-5" />
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  We typically respond within 24 hours. Your privacy is important to us.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Newsletter Signup CTA */}
        <Card className="mt-16 hero-gradient text-white animate-fade-in-up">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Stay Updated with Our Impact</h3>
            <p className="mb-6 opacity-90 max-w-2xl mx-auto">
              Join our newsletter to receive updates on events, initiatives, and opportunities 
              to contribute to sustainable development goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input 
                placeholder="Enter your email" 
                className="bg-white text-foreground border-white/20"
              />
              <Button variant="secondary" className="bg-white text-primary hover:bg-white/90">
                Subscribe
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Contact;