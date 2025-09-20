import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { QuoteModal } from "./QuoteModal";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function Hero() {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const heroImages = [
    {
      src: "https://images.unsplash.com/photo-1749731894795-4eae105fa60a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwYnJpZGUlMjBncm9vbSUyMHdlZGRpbmclMjBjZXJlbW9ueXxlbnwxfHx8fDE3NTgyMTc0MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      alt: "Elegant wedding ceremony",
      title: "Elegant Ceremonies",
      subtitle: "Capturing sacred moments"
    },
    {
      src: "https://images.unsplash.com/photo-1625415002553-f23e2d1c05a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxyb21hbnRpYyUyMHdlZGRpbmclMjBjb3VwbGUlMjBvdXRkb29yJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzU4MjE3NDI5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      alt: "Romantic wedding couple outdoor portrait",
      title: "Romantic Portraits",
      subtitle: "Love in every frame"
    },
    {
      src: "https://images.unsplash.com/photo-1652492892191-487055a9b6bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHx3ZWRkaW5nJTIwcmVjZXB0aW9uJTIwY2VsZWJyYXRpb24lMjBkYW5jaW5nfGVufDF8fHx8MTc1ODIxNzQzMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      alt: "Wedding reception celebration",
      title: "Joyful Celebrations",
      subtitle: "Dancing through forever"
    },
    {
      src: "https://images.unsplash.com/photo-1748203187699-4b97a1ef8698?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHx3ZWRkaW5nJTIwcmluZyUyMGNlcmVtb255JTIwaW50aW1hdGUlMjBtb21lbnR8ZW58MXx8fHwxNzU4MjE3NDM0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      alt: "Wedding ring ceremony",
      title: "Intimate Moments",
      subtitle: "Details that matter"
    },
    {
      src: "https://images.unsplash.com/photo-1549871630-740049f93554?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHx3ZWRkaW5nJTIwYm91cXVldCUyMGJlYXV0aWZ1bCUyMGZsb3dlcnMlMjBicmlkZXxlbnwxfHx8fDE3NTgyMTc0Mzd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      alt: "Wedding bouquet",
      title: "Beautiful Details",
      subtitle: "Artistry in bloom"
    }
  ];

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [heroImages.length]);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  const scrollToPortfolio = () => {
    const portfolioElement = document.getElementById('portfolio');
    if (portfolioElement) {
      portfolioElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const currentImage = heroImages[currentImageIndex];

  return (
    <>
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Carousel Background Images */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <ImageWithFallback
                src={currentImage.src}
                alt={currentImage.alt}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50" />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevImage}
          className="absolute left-6 top-1/2 transform -translate-y-1/2 z-20 bg-white/10 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/20 transition-all duration-300"
          aria-label="Previous image"
        >
          <ChevronLeft size={24} />
        </button>
        
        <button
          onClick={nextImage}
          className="absolute right-6 top-1/2 transform -translate-y-1/2 z-20 bg-white/10 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/20 transition-all duration-300"
          aria-label="Next image"
        >
          <ChevronRight size={24} />
        </button>

        {/* Carousel Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentImageIndex 
                  ? 'bg-white' 
                  : 'bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
        
        {/* Main Content with Animated Text */}
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-6">
          {/* Animated Main Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-6xl md:text-8xl mb-4 font-light tracking-wide" style={{ fontFamily: 'Lovalina Free' }}>
              Modern Scene
              <span className="block text-3xl md:text-4xl mt-4 font-normal tracking-wider">Wedding Photography</span>
            </h1>
          </motion.div>

          {/* Animated Subtitle - Changes with each image */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${currentImageIndex}-subtitle`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="mb-2"
            >
              <h2 className="text-2xl md:text-3xl font-light" style={{ fontFamily: 'Lovalina Free' }}>
                {currentImage.title}
              </h2>
            </motion.div>
          </AnimatePresence>

          {/* Animated Description - Changes with each image */}
          <AnimatePresence mode="wait">
            <motion.p
              key={`${currentImageIndex}-description`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeInOut" }}
              className="text-lg md:text-xl mb-8 font-light italic"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              {currentImage.subtitle}
            </motion.p>
          </AnimatePresence>

          {/* Static Main Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-base md:text-lg mb-8 font-light"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Capturing love stories with modern elegance and timeless grace
          </motion.p>

          {/* Animated Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button 
              size="lg" 
              className="bg-transparent border border-white text-white hover:bg-white hover:text-black px-8 py-3 transition-all duration-300 transform hover:scale-105"
              onClick={() => setIsQuoteModalOpen(true)}
            >
              Book Your Session
            </Button>
            <Button 
              size="lg" 
              className="bg-transparent border border-white text-white hover:bg-white hover:text-black px-8 py-3 transition-all duration-300 transform hover:scale-105"
              onClick={scrollToPortfolio}
            >
              Portfolio
            </Button>
          </motion.div>
        </div>

        {/* Floating Animation Elements */}
        <motion.div
          animate={{ 
            y: [0, -10, 0],
            rotate: [0, 2, 0]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 right-20 w-4 h-4 bg-white/20 rounded-full blur-sm hidden lg:block"
        />
        
        <motion.div
          animate={{ 
            y: [0, 15, 0],
            rotate: [0, -3, 0]
          }}
          transition={{ 
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute bottom-32 left-16 w-3 h-3 bg-white/15 rounded-full blur-sm hidden lg:block"
        />
      </section>
      
      <QuoteModal 
        isOpen={isQuoteModalOpen} 
        onClose={() => setIsQuoteModalOpen(false)} 
      />
    </>
  );
}