import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";
import { QuoteModal } from "./QuoteModal";
import logoImage from 'figma:asset/70860a66863f55612e77945f03a55d9c6bfb8318.png';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navItems = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Portfolio", href: "#portfolio" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Contact", href: "#contact" },
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navVariants = {
    hidden: { y: -100 },
    visible: {
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  const mobileMenuVariants = {
    hidden: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const mobileItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  return (
    <>
      <motion.nav
        variants={navVariants}
        initial="hidden"
        animate="visible"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled 
            ? 'bg-white/95 backdrop-blur-xl border-b border-gray-100/50 shadow-[0_8px_32px_rgba(0,0,0,0.08)]' 
            : 'bg-white/90 backdrop-blur-lg border-b border-white/30'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <motion.div 
              variants={itemVariants}
              className="flex-shrink-0"
            >
              <motion.div
                className="relative"
                whileHover={{ 
                  scale: 1.02,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.img
                  src={logoImage}
                  alt="Modern Scene Wedding Photography"
                  className="h-12 w-auto object-contain filter brightness-100 contrast-100 hover:brightness-110 transition-all duration-500"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  style={{
                    maxHeight: '48px',
                    maxWidth: '200px'
                  }}
                />
                {/* Subtle glow effect on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-amber-400/20 to-orange-400/20 rounded-lg blur-lg opacity-0 -z-10"
                  whileHover={{ 
                    opacity: 1,
                    scale: 1.1,
                    transition: { duration: 0.3, ease: "easeOut" }
                  }}
                />
              </motion.div>
            </motion.div>
            
            {/* Desktop Navigation */}
            <motion.div 
              variants={itemVariants}
              className="hidden md:block"
            >
              <div className="ml-12 flex items-center space-x-10">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    className="text-slate-700 hover:text-amber-600 px-4 py-3 text-sm font-medium tracking-wide transition-all duration-400 relative group"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                    whileHover={{ 
                      y: -1,
                      transition: { duration: 0.3, ease: "easeOut" }
                    }}
                  >
                    <span className="relative z-10">{item.label}</span>
                    {/* Elegant hover background */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileHover={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                    {/* Animated underline */}
                    <motion.div
                      className="absolute bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-amber-500 to-orange-400 origin-left"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    />
                  </motion.a>
                ))}
              </div>
            </motion.div>
            
            <motion.div 
              variants={itemVariants}
              className="hidden md:block"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button 
                className="bg-gradient-to-r from-slate-900 to-slate-800 hover:from-amber-600 hover:to-orange-500 text-white px-8 py-3 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.15)] hover:shadow-[0_8px_25px_rgba(217,119,6,0.3)] transition-all duration-500 border border-slate-700 hover:border-amber-400"
                onClick={() => setIsQuoteModalOpen(true)}
              >
                <span className="font-medium tracking-wide">Get Quote</span>
              </Button>
            </motion.div>

            {/* Mobile menu button */}
            <motion.div 
              variants={itemVariants}
              className="md:hidden"
            >
              <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="text-slate-700 hover:text-amber-600 p-3 relative rounded-lg hover:bg-amber-50 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <AnimatePresence mode="wait">
                  {isOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X size={24} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu size={24} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </motion.div>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isOpen && (
              <motion.div 
                variants={mobileMenuVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="md:hidden overflow-hidden"
              >
                <div className="px-4 pt-4 pb-6 space-y-2 bg-white/95 backdrop-blur-lg border-t border-gray-100/50">
                  {navItems.map((item, index) => (
                    <motion.a
                      key={item.label}
                      href={item.href}
                      className="text-slate-700 hover:text-amber-600 block px-4 py-3 text-base font-medium hover:bg-gradient-to-r hover:from-amber-50 hover:to-orange-50 rounded-xl transition-all duration-400 border border-transparent hover:border-amber-100"
                      onClick={() => setIsOpen(false)}
                      variants={mobileItemVariants}
                      whileHover={{ x: 8, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {item.label}
                    </motion.a>
                  ))}
                  <motion.div 
                    className="pt-6"
                    variants={mobileItemVariants}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button 
                      className="w-full bg-gradient-to-r from-slate-900 to-slate-800 hover:from-amber-600 hover:to-orange-500 text-white py-4 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.15)] hover:shadow-[0_8px_25px_rgba(217,119,6,0.3)] transition-all duration-500 border border-slate-700 hover:border-amber-400"
                      onClick={() => {
                        setIsQuoteModalOpen(true);
                        setIsOpen(false);
                      }}
                    >
                      <span className="font-medium tracking-wide">Get Quote</span>
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Elegant animated progress bar on scroll */}
        <motion.div
          className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-amber-500 via-orange-400 to-amber-400 origin-left shadow-[0_0_10px_rgba(217,119,6,0.3)]"
          style={{ scaleX: scrolled ? 1 : 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </motion.nav>
      
      <QuoteModal 
        isOpen={isQuoteModalOpen} 
        onClose={() => setIsQuoteModalOpen(false)} 
      />
    </>
  );
}