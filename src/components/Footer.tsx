import React from 'react';
import { Heart, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import sdgLogo from '@/assets/sdg-club-logo.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '/projects' },
    { name: 'Events', href: '#events' },
    { name: 'Contact', href: '#contact' },
  ];

  const sdgResources = [
    { name: 'UN SDG Website', href: 'https://sdgs.un.org/goals' },
    { name: 'SDG Tracker', href: 'https://sdg-tracker.org/' },
    { name: 'Global Goals', href: 'https://www.globalgoals.org/' },
  ];

  return (
    <footer className="bg-foreground text-background py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand Section */}
          <div className="col-span-1 lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <img 
                src={sdgLogo} 
                alt="MIT-BLR SDG Club" 
                className="w-12 h-12 object-contain"
              />
              <div>
                <h3 className="font-bold text-lg">MIT-BLR SDG Club</h3>
                <p className="text-sm opacity-80">Driving Innovation for a Sustainable Future</p>
              </div>
            </div>
            <p className="text-background/80 mb-6 leading-relaxed">
              Empowering students and communities to create meaningful solutions 
              that advance the UN Sustainable Development Goals through technology, 
              collaboration, and innovation.
            </p>
            <div className="flex items-center space-x-2 text-sm">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-400" />
              <span>for a sustainable future</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  {link.href.startsWith('/') ? (
                    <Link
                      to={link.href}
                      className="text-background/80 hover:text-background transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      className="text-background/80 hover:text-background transition-colors text-sm"
                    >
                      {link.name}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* SDG Resources */}
          <div>
            <h4 className="font-semibold mb-4">SDG Resources</h4>
            <ul className="space-y-2">
              {sdgResources.map((resource) => (
                <li key={resource.name}>
                  <a
                    href={resource.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-background/80 hover:text-background transition-colors text-sm inline-flex items-center"
                  >
                    {resource.name}
                    <ExternalLink className="w-3 h-3 ml-1" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-background/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-background/60 text-sm">
            © {currentYear} MIT-BLR SDG Club. All rights reserved.
          </p>
          
          {/* SDG Goals Strip */}
          <div className="flex items-center space-x-1 mt-4 md:mt-0">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17].map((sdg) => (
              <div
                key={sdg}
                className={`w-6 h-6 bg-sdg-${sdg} rounded text-white text-xs flex items-center justify-center font-bold opacity-80 hover:opacity-100 transition-opacity cursor-pointer`}
                title={`SDG ${sdg}`}
              >
                {sdg}
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;