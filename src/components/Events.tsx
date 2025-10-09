import React, { useState } from 'react';
import { Calendar, MapPin, Clock, Users, ExternalLink, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Events = () => {
  const [activeTab, setActiveTab] = useState('upcoming');

  const events = {
    upcoming: [
      {
        id: 2,
        title: "Sustainability Conclave",
        description: "Industry leaders discuss the future of sustainable technology and innovation",
        date: "January 15, 2026",
        time: "2:00 PM - 5:00 PM",
        venue: "Virtual & Campus",
        participants: "500+ Expected",
        category: "conclave",
        sdg: [17, 9, 8],
        status: "Early Bird",
      },
      {
        id: 11,
        title: "SDG Thrift Store",
        description: "Campus-wide thrift store to promote circular economy and sustainable fashion—buy, sell, and swap pre-loved items.",
        date: "October 29, 2025",
        time: "10:00 AM - 6:00 PM",
        venue: "Student Activity Center",
        participants: "Open to All",
        category: "stall",
        sdg: [12, 11],
        status: "Register Now",
        countdown: "20 days to go"
      }
      ,
      {
        id: 3,
        title: "Clean Energy Workshop",
        description: "Hands-on workshop on renewable energy technologies and implementation",
        date: "January 25, 2025",
        time: "10:00 AM - 4:00 PM",
        venue: "Engineering Lab 3",
        participants: "50 Seats",
        category: "workshop",
        sdg: [7, 13],
        status: "Few Spots Left",
      }
    ],
    ongoing: [
      {
        id: 4,
        title: "Weekly SDG Study Circle",
        description: "Weekly discussions on UN SDG progress and implementation strategies",
        date: "Every Thursday",
        time: "6:00 PM - 7:30 PM",
        venue: "Conference Room A",
        participants: "30-40 Members",
        category: "weekly",
        sdg: [4, 17],
        status: "Join Anytime",
        countdown: "Next: Tomorrow"
      }
    ],
    past: [
      {
        id: 10,
        title: "SDG Hackathon 2025",
        description: "A high-energy, campus-wide hackathon tackling Sustainable Development Goals with student teams building prototypes and pitching to mentors.",
        date: "September 25-27, 2025",
        time: "48-72 Hours",
        venue: "MIT-BLR Campus",
        participants: "300+ Participants",
        category: "hackathon",
        sdg: [9, 13, 17],
        status: "Completed",
        countdown: "Highlights & Winners"
      },
      {
        id: 5,
        title: "HackVerse Hackathon",
        description: "36-hour intensive hackathon with IBM & AWS collaboration featuring 200+ participants from ACM-MITB",
        date: "August 15-17, 2025",
        time: "36 Hours",
        venue: "MIT-BLR Campus",
        participants: "200+ Participants",
        category: "hackathon",
        sdg: [9, 17, 8],
        status: "Completed",
        countdown: "Results Available"
      },
      {
        id: 6,
        title: "Elephant Day Conservation Event",
        description: "Conservation and ecosystem awareness initiative focusing on wildlife protection and biodiversity",
        date: "August 12, 2025",
        time: "10:00 AM - 4:00 PM",
        venue: "MIT-BLR Campus",
        participants: "150+ Participants",
        category: "drive",
        sdg: [15, 14, 13],
        status: "Successful",
        countdown: "Impact Report"
      },
      {
        id: 7,
        title: "Tech Solstice Pop-Up Stall",
        description: "Interactive stall raising awareness on sustainability through technology and innovation",
        date: "June 21, 2025",
        time: "12:00 PM - 8:00 PM",
        venue: "Campus Main Plaza",
        participants: "500+ Visitors",
        category: "stall",
        sdg: [12, 13, 9],
        status: "Successful",
        countdown: "Photo Gallery"
      },
      {
        id: 8,
        title: "AI for Good Symposium 2024",
        description: "Exploring AI applications for sustainable development and social impact",
        date: "March 10, 2025",
        time: "9:00 AM - 6:00 PM",
        venue: "MIT-BLR Auditorium",
        participants: "300 Attendees",
        category: "symposium",
        sdg: [9, 4, 3],
        status: "Completed",
        countdown: "Highlights Available"
      },
      {
        id: 9,
        title: "Water Conservation Drive",
        description: "Campus-wide initiative to promote water conservation awareness",
        date: "March 20-25, 2024",
        time: "All Day",
        venue: "MIT-BLR Campus",
        participants: "1000+ Participants",
        category: "drive",
        sdg: [6, 14],
        status: "Successful",
        countdown: "Impact Report"
      }
    ]
  };

  const categories = [
    { id: 'all', name: 'All Events', color: 'bg-primary' },
    { id: 'hackathon', name: 'Hackathons', color: 'bg-sdg-9' },
    { id: 'workshop', name: 'Workshops', color: 'bg-sdg-4' },
    { id: 'conclave', name: 'Conclaves', color: 'bg-sdg-17' },
    { id: 'webinar', name: 'Webinars', color: 'bg-sdg-3' },
  ];

  const tabs = [
    { id: 'upcoming', name: 'Upcoming', count: events.upcoming.length },
    { id: 'ongoing', name: 'Ongoing', count: events.ongoing.length },
    { id: 'past', name: 'Past Events', count: events.past.length },
  ];

  const getSDGColor = (sdgId: number) => {
    return `bg-sdg-${sdgId}`;
  };

  return (
    <section id="events" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-4">
            <Calendar className="w-4 h-4 mr-2" />
            Events & Activities
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Join Our <span className="text-gradient">Impact Journey</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            From hackathons to workshops, conclaves to community drives - 
            discover opportunities to learn, collaborate, and create sustainable solutions.
          </p>
        </div>

        {/* Event Categories Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant="outline"
              size="sm"
              className="hover-lift text-foreground border-muted-foreground hover:bg-muted hover:text-foreground"
            >
              <Filter className="w-4 h-4 mr-2" />
              {category.name}
            </Button>
          ))}
        </div>

        {/* Event Tabs */}
        <div className="flex justify-center mb-12">
          <div className="flex bg-muted rounded-lg p-1">
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 text-foreground ${activeTab === tab.id ? 'bg-background shadow-sm text-foreground' : 'hover:bg-background/50'}`}
              >
                {tab.name}
                <Badge variant="secondary" className="ml-2 text-xs">
                  {tab.count}
                </Badge>
              </Button>
            ))}
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events[activeTab as keyof typeof events].map((event) => (
            <Card key={event.id} className="hover-lift animate-fade-in-up">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <Badge 
                    variant="secondary" 
                    className={`${event.category === 'hackathon' ? 'bg-sdg-9' : 
                      event.category === 'workshop' ? 'bg-sdg-4' : 
                      event.category === 'conclave' ? 'bg-sdg-17' : 'bg-primary'} text-white`}
                  >
                    {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                  </Badge>
                  <span className="text-xs text-muted-foreground font-medium">
                    {event.countdown}
                  </span>
                </div>
                <CardTitle className="text-xl mb-2">{event.title}</CardTitle>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {event.description}
                </p>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-sm">
                    <Calendar className="w-4 h-4 mr-3 text-muted-foreground" />
                    {event.date}
                  </div>
                  <div className="flex items-center text-sm">
                    <Clock className="w-4 h-4 mr-3 text-muted-foreground" />
                    {event.time}
                  </div>
                  <div className="flex items-center text-sm">
                    <MapPin className="w-4 h-4 mr-3 text-muted-foreground" />
                    {event.venue}
                  </div>
                  <div className="flex items-center text-sm">
                    <Users className="w-4 h-4 mr-3 text-muted-foreground" />
                    {event.participants}
                  </div>
                </div>

                {/* SDG Goals */}
                <div className="flex items-center gap-2 mb-6">
                  <span className="text-xs text-muted-foreground">SDG Goals:</span>
                  {event.sdg.map((sdgId) => (
                    <div
                      key={sdgId}
                      className={`w-6 h-6 ${getSDGColor(sdgId)} rounded text-white text-xs flex items-center justify-center font-bold`}
                    >
                      {sdgId}
                    </div>
                  ))}
                </div>

                {/* Action Button */}
                <Button 
                  className="w-full" 
                  variant={activeTab === 'past' ? 'outline' : 'default'}
                >
                  {activeTab === 'past' ? 'View Highlights' : 
                   activeTab === 'ongoing' ? 'Join Now' : 'Register'}
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        {activeTab === 'upcoming' && (
          <div className="text-center mt-16">
            <Card className="max-w-2xl mx-auto hero-gradient text-white">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4">Don't Miss Out!</h3>
                <p className="mb-6 opacity-90">
                  Stay updated with our latest events and be the first to know about 
                  new opportunities to make a sustainable impact.
                </p>
                <Button variant="secondary" size="lg" className="bg-white text-primary hover:bg-white/90">
                  Subscribe to Updates
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </section>
  );
};

export default Events;