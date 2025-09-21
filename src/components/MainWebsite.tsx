import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ChevronLeft, ChevronRight, Star, MapPin, Phone, Mail, Camera, Heart, Users, Settings } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { WebsiteData } from '../App';

interface MainWebsiteProps {
  data: WebsiteData;
  onAdminLogin: () => void;
}

export function MainWebsite({ data, onAdminLogin }: MainWebsiteProps) {
  const [currentHeroImage, setCurrentHeroImage] = useState(0);

  const nextHeroImage = () => {
    setCurrentHeroImage((prev) => (prev + 1) % data.heroImages.length);
  };

  const prevHeroImage = () => {
    setCurrentHeroImage((prev) => (prev - 1 + data.heroImages.length) % data.heroImages.length);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Camera className="h-8 w-8 text-gray-800" />
              <span className="text-xl font-semibold text-gray-800">Modern Scene</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#home" className="text-gray-700 hover:text-gray-900">Home</a>
              <a href="#services" className="text-gray-700 hover:text-gray-900">Services</a>
              <a href="#weddings" className="text-gray-700 hover:text-gray-900">Recent Weddings</a>
              <a href="#work" className="text-gray-700 hover:text-gray-900">Our Work</a>
              <a href="#testimonials" className="text-gray-700 hover:text-gray-900">Testimonials</a>
              <a href="#contact" className="text-gray-700 hover:text-gray-900">Contact</a>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onAdminLogin}
              className="flex items-center gap-2"
            >
              <Settings className="h-4 w-4" />
              Admin
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative h-screen">
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <div className="relative h-full overflow-hidden">
          <ImageWithFallback
            src={data.heroImages[currentHeroImage]}
            alt="Wedding Photography"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="text-center text-white max-w-4xl px-4">
            <h1 className="text-5xl md:text-7xl font-light mb-6">Modern Scene</h1>
            <p className="text-xl md:text-2xl mb-8 font-light">Wedding Photography that captures your love story</p>
            <Button size="lg" className="bg-white text-black hover:bg-gray-100">
              View Our Work
            </Button>
          </div>
        </div>
        <button 
          onClick={prevHeroImage}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/30 p-2 rounded-full text-white"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button 
          onClick={nextHeroImage}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/30 p-2 rounded-full text-white"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light mb-4">Capturing Your Love Story</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We specialize in creating timeless, elegant wedding photography that tells your unique story
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-gray-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <Heart className="h-10 w-10 text-gray-600" />
              </div>
              <h3 className="text-xl font-medium mb-4">Wedding Photography</h3>
              <p className="text-gray-600">Beautiful, candid moments captured throughout your special day</p>
            </div>
            <div className="text-center">
              <div className="bg-gray-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <Camera className="h-10 w-10 text-gray-600" />
              </div>
              <h3 className="text-xl font-medium mb-4">Engagement Sessions</h3>
              <p className="text-gray-600">Intimate pre-wedding sessions to capture your connection</p>
            </div>
            <div className="text-center">
              <div className="bg-gray-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <Users className="h-10 w-10 text-gray-600" />
              </div>
              <h3 className="text-xl font-medium mb-4">Family Portraits</h3>
              <p className="text-gray-600">Professional family photography for all occasions</p>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Weddings Section */}
      <section id="weddings" className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light mb-4">Recent Weddings</h2>
            <p className="text-xl text-gray-600">A glimpse into some of our latest wedding celebrations</p>
          </div>
          <Tabs defaultValue={Object.keys(data.recentWeddings)[0]} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              {Object.keys(data.recentWeddings).map((wedding) => (
                <TabsTrigger key={wedding} value={wedding} className="text-sm">
                  {wedding}
                </TabsTrigger>
              ))}
            </TabsList>
            {Object.entries(data.recentWeddings).map(([wedding, images]) => (
              <TabsContent key={wedding} value={wedding}>
                <div className="grid md:grid-cols-3 gap-4">
                  {images.map((image, index) => (
                    <div key={index} className="aspect-square overflow-hidden rounded-lg">
                      <ImageWithFallback
                        src={image}
                        alt={`${wedding} - Photo ${index + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Our Amazing Work Section */}
      <section id="work" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light mb-4">OUR AMAZING WORK</h2>
            <p className="text-xl text-gray-600">Explore our portfolio across different wedding moments</p>
          </div>
          <Tabs defaultValue={Object.keys(data.amazingWork)[0]} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              {Object.keys(data.amazingWork).map((category) => (
                <TabsTrigger key={category} value={category} className="text-sm">
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
            {Object.entries(data.amazingWork).map(([category, images]) => (
              <TabsContent key={category} value={category}>
                <div className="grid md:grid-cols-4 gap-4">
                  {images.map((image, index) => (
                    <div key={index} className="aspect-square overflow-hidden rounded-lg">
                      <ImageWithFallback
                        src={image}
                        alt={`${category} - Photo ${index + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light mb-4">What Couples Say</h2>
            <p className="text-xl text-gray-600">Hear from our happy couples</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {data.testimonials.slice().reverse().map((testimonial, index) => (
              <Card key={index} className="p-6">
                <CardContent className="pt-0">
                  <div className="flex mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 italic">"{testimonial.text}"</p>
                  <p className="font-medium">- {testimonial.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light mb-4">Get In Touch</h2>
            <p className="text-xl text-gray-600">Ready to capture your special day?</p>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-medium mb-6">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-gray-600" />
                  <span>123 Photography Studio, New York, NY 10001</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-gray-600" />
                  <span>(555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-gray-600" />
                  <span>hello@modernscene.com</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-medium mb-6">Send us a message</h3>
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="First Name"
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-transparent"
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-transparent"
                  />
                </div>
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-transparent"
                />
                <input
                  type="date"
                  placeholder="Wedding Date"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-transparent"
                />
                <textarea
                  placeholder="Tell us about your wedding"
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-transparent"
                ></textarea>
                <Button className="w-full bg-gray-800 hover:bg-gray-900">Send Message</Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Camera className="h-8 w-8" />
              <span className="text-xl font-semibold">Modern Scene</span>
            </div>
            <p className="text-gray-400">Creating beautiful wedding memories since 2015</p>
          </div>
          <div>
            <h4 className="font-medium mb-4">Quick Links</h4>
            <div className="space-y-2 text-gray-400">
              <div><a href="#home" className="hover:text-white">Home</a></div>
              <div><a href="#services" className="hover:text-white">Services</a></div>
              <div><a href="#work" className="hover:text-white">Portfolio</a></div>
              <div><a href="#contact" className="hover:text-white">Contact</a></div>
            </div>
          </div>
          <div>
            <h4 className="font-medium mb-4">Follow Us</h4>
            <div className="space-y-2 text-gray-400">
              <div><a href="#" className="hover:text-white">Instagram</a></div>
              <div><a href="#" className="hover:text-white">Facebook</a></div>
              <div><a href="#" className="hover:text-white">Pinterest</a></div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
          <p>&copy; 2024 Modern Scene Photography. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}