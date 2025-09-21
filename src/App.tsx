import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { LoadingScreen } from "./components/LoadingScreen";
import { Navigation } from "./components/Navigation";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Services } from "./components/Services";
import { Portfolio } from "./components/Portfolio";
import { AmazingWork } from "./components/AmazingWork";
import { Testimonials } from "./components/Testimonials";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { AdminPanel } from "./components/AdminPanel";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showMainContent, setShowMainContent] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Handle initial page load with error handling
  useEffect(() => {
    // Don't run loading logic for admin routes
    if (window.location.pathname.startsWith('/admin')) {
      setIsLoading(false);
      setShowMainContent(true);
      return;
    }

    // Fallback timer in case loading takes too long
    const fallbackTimer = setTimeout(() => {
      if (isLoading) {
        console.warn('Loading timeout reached, showing content');
        setHasError(true);
        handleLoadingComplete();
      }
    }, 4000);

    return () => clearTimeout(fallbackTimer);
  }, [isLoading]);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    // Small delay to ensure smooth transition
    const contentTimer = setTimeout(() => {
      setShowMainContent(true);
    }, 300);

    return () => clearTimeout(contentTimer);
  };

  const mainContentVariants = {
    hidden: { 
      opacity: 0,
    },
    visible: { 
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  // If there's an error or loading is taking too long, show content immediately
  if (hasError || (!isLoading && !showMainContent)) {
    return (
      <div className="min-h-screen relative">
        {/* Global background pattern */}
        <div className="fixed inset-0 pointer-events-none z-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,0,0,0.008) 1px, transparent 0)`,
          backgroundSize: '20px 20px'
        }}></div>
        
        <div className="relative z-10">
          <Navigation />
          
          <main>
            <section id="home">
              <Hero />
            </section>
            <About />
            <Services />
            <Portfolio />
            <AmazingWork />
            <Testimonials />
            <Contact />
          </main>
          
          <Footer />
        </div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/admin/*" element={<AdminPanel />} />
        <Route path="/" element={
          <>
            <AnimatePresence mode="wait">
              {isLoading && !hasError && !window.location.pathname.startsWith('/admin') && (
                <LoadingScreen key="loading" onComplete={handleLoadingComplete} />
              )}
            </AnimatePresence>

            <AnimatePresence>
              {showMainContent && !hasError && !window.location.pathname.startsWith('/admin') && (
                <motion.div 
                  key="main-content"
                  variants={mainContentVariants}
                  initial="hidden"
                  animate="visible"
                  className="min-h-screen relative"
                >
                  {/* Global background pattern */}
                  <div className="fixed inset-0 pointer-events-none z-0" style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,0,0,0.008) 1px, transparent 0)`,
                    backgroundSize: '20px 20px'
                  }}></div>
                  
                  <div className="relative z-10">
                    <Navigation />
                    
                    <main>
                      <section id="home">
                        <Hero />
                      </section>
                      <About />
                      <Services />
                      <Portfolio />
                      <AmazingWork />
                      <Testimonials />
                      <Contact />
                    </main>
                    
                    <Footer />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        } />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}