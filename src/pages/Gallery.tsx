import React, { useState } from 'react';
import { ArrowLeft, X, ChevronLeft, ChevronRight, Calendar, Users, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import sdgLogo from '@/assets/sdg-club-logo.png';

// Import gallery images
import gallery1 from '@/assets/gallery-1.jpg';
import gallery2 from '@/assets/gallery-2.jpg';
import gallery3 from '@/assets/gallery-3.jpg';
import gallery4 from '@/assets/gallery-4.jpg';
import gallery5 from '@/assets/gallery-5.png';
import gallery6 from '@/assets/gallery-6.png';
import gallery7 from '@/assets/gallery-7.png';
import gallery8 from '@/assets/gallery-8.jpg';
import gallery9 from '@/assets/gallery-9.jpg';
import gallery10 from '@/assets/gallery-10.jpg';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const galleryImages = [
    {
      id: 1,
      src: gallery1,
      title: "SDG Club Workshop Session",
      description: "Students collaborating on sustainable development projects",
      date: "October 2024",
      category: "Workshop"
    },
    {
      id: 2,
      src: gallery2,
      title: "Team Collaboration",
      description: "Innovative minds working together on sustainability solutions",
      date: "October 2024",
      category: "Workshop"
    },
    {
      id: 3,
      src: gallery3,
      title: "SDG Hackspace",
      description: "core team brainstorming with the honeywell partners",
      date: "October 2024",
      category: "Development"
    },
    {
      id: 4,
      src: gallery4,
      title: "Campus Initiative",
      description: "MIT-BLR SDG Club members working on campus sustainability",
      date: "October 2024",
      category: "Campus"
    },
    {
      id: 5,
      src: gallery5,
      title: "SDG Selfie Challenge",
      description: "Students showcasing their commitment to SDGs",
      date: "October 2024",
      category: "Event"
    },
    {
      id: 6,
      src: gallery6,
      title: "SDG Awareness Campaign",
      description: "Spreading awareness about sustainable development goals",
      date: "October 2024",
      category: "Event"
    },
    {
      id: 8,
      src: gallery8,
      title: "Leadership Presentation",
      description: "SDG Club leader presenting sustainability initiatives and impact",
      date: "October 2024",
      category: "Presentation"
    },
    {
      id: 9,
      src: gallery9,
      title: "Community Outreach",
      description: "Engaging with the community on sustainable development projects",
      date: "October 2024",
      category: "Outreach"
    },
    {
      id: 10,
      src: gallery10,
      title: "World elephant day ",
      description: "gaining knowledge ",
      date: "October 2024",
      category: "Innovation"
    }
  ];

  const categories = ["All", "Workshop", "Development", "Campus", "Event", "Presentation", "Outreach", "Innovation"];
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredImages = activeCategory === "All" 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeCategory);

  const openModal = (index: number) => {
    setSelectedImage(index);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    if (selectedImage === null) return;
    
    const currentIndex = selectedImage;
    let newIndex;
    
    if (direction === 'prev') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : filteredImages.length - 1;
    } else {
      newIndex = currentIndex < filteredImages.length - 1 ? currentIndex + 1 : 0;
    }
    
    setSelectedImage(newIndex);
  };

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
                <p className="text-xl text-white/90">Gallery</p>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Moments of Impact & Innovation
            </h2>
            <p className="text-lg text-white/90 mb-6">
              Capturing our journey towards sustainable development and the passionate minds driving change
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filter */}
          <div className="flex justify-center mb-12">
            <div className="flex gap-2 bg-muted p-1 rounded-lg">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={activeCategory === category ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setActiveCategory(category)}
                  className="rounded-md"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredImages.map((image, index) => (
              <Card 
                key={image.id} 
                className="overflow-hidden hover-lift cursor-pointer group"
                onClick={() => openModal(index)}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img 
                    src={image.src} 
                    alt={image.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                  <Badge 
                    variant="secondary" 
                    className="absolute top-3 right-3 bg-white/90 text-black"
                  >
                    {image.category}
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                    {image.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {image.description}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {image.date}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Stats Section */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-primary mb-2">10</div>
                <div className="text-sm text-muted-foreground">Gallery Photos</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-green-600 mb-2">50+</div>
                <div className="text-sm text-muted-foreground">Active Members</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-blue-600 mb-2">25+</div>
                <div className="text-sm text-muted-foreground">Projects Completed</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-purple-600 mb-2">10+</div>
                <div className="text-sm text-muted-foreground">Events Organized</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Image Modal */}
      {selectedImage !== null && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 text-white hover:bg-white/20"
            onClick={closeModal}
          >
            <X className="w-6 h-6" />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
            onClick={() => navigateImage('prev')}
          >
            <ChevronLeft className="w-8 h-8" />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
            onClick={() => navigateImage('next')}
          >
            <ChevronRight className="w-8 h-8" />
          </Button>

          <div className="max-w-4xl max-h-[80vh] flex flex-col">
            <img 
              src={filteredImages[selectedImage].src} 
              alt={filteredImages[selectedImage].title}
              className="max-w-full max-h-[70vh] object-contain"
            />
            <div className="text-white text-center mt-4">
              <h3 className="text-xl font-semibold mb-2">
                {filteredImages[selectedImage].title}
              </h3>
              <p className="text-white/80">
                {filteredImages[selectedImage].description}
              </p>
              <div className="flex items-center justify-center gap-4 mt-2 text-sm text-white/60">
                <span>{filteredImages[selectedImage].date}</span>
                <Badge variant="outline" className="border-white/30 text-white">
                  {filteredImages[selectedImage].category}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Gallery;