import { motion } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Button } from "./ui/button";
import { useInView } from "../hooks/useInView";

export function About() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9, rotateY: -15 },
    visible: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const statVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section id="about" className="py-20 relative overflow-hidden">
      {/* Elegant gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100"></div>
      
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,0,0,0.03) 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }}></div>
      
      {/* Floating decorative elements */}
      <motion.div
        animate={{ 
          x: [0, 30, 0],
          y: [0, -20, 0],
          rotate: [0, 5, 0]
        }}
        transition={{ 
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-20 right-10 w-24 h-24 bg-gradient-to-br from-amber-100 to-orange-50 rounded-full blur-xl opacity-60"
      />
      
      <motion.div
        animate={{ 
          x: [0, -25, 0],
          y: [0, 15, 0],
          rotate: [0, -3, 0]
        }}
        transition={{ 
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 5
        }}
        className="absolute bottom-32 left-16 w-32 h-32 bg-gradient-to-tr from-blue-50 to-indigo-100 rounded-full blur-2xl opacity-40"
      />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid lg:grid-cols-2 gap-16 items-center"
        >
          <motion.div variants={itemVariants}>
            <motion.h2
              variants={itemVariants}
              className="text-4xl md:text-5xl mb-8 text-gray-900"
              style={{ fontFamily: 'Lovalina Free' }}
            >
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="inline-block"
              >
                Capturing Your
              </motion.span>
              <br />
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="inline-block bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent"
              >
                Love Story
              </motion.span>
            </motion.h2>

            <motion.div variants={itemVariants}>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="text-lg text-gray-600 mb-6 leading-relaxed"
              >
                Modern Scene Wedding Photography specializes in creating timeless and elegant wedding photographs that tell your unique love story. With a keen eye for modern aesthetics and classic romance, we capture the genuine emotions and intimate moments that make your day truly special.
              </motion.p>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                className="text-lg text-gray-600 mb-6 leading-relaxed"
              >
                Our approach combines contemporary photography techniques with artistic vision to deliver stunning images that you'll treasure forever. From engagement sessions to the wedding day and beyond, we document every precious moment with style and sophistication.
              </motion.p>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 1.1 }}
                className="text-lg text-gray-600 mb-8 leading-relaxed"
              >
                We believe that great wedding photography goes beyond just beautiful images - it's about preserving the feelings, the laughter, the tears, and all the magical moments that make your wedding day unforgettable.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 1.3 }}
              >
                <Button className="bg-gray-900 text-white hover:bg-gray-800 px-8 py-3 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                  View Our Story
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
          
          <motion.div
            variants={imageVariants}
            className="relative"
          >
            <motion.div
              whileHover={{ scale: 1.02, rotateY: 2 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1754466511489-cf598ca355d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwcGxhbm5pbmclMjBkZWNvciUyMGZsb3dlcnN8ZW58MXx8fHwxNzU4MDk5OTA1fDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Wedding planning and floral decorations"
                className="w-full h-[600px] object-cover rounded-lg shadow-2xl"
              />
              
              {/* Floating animation overlay */}
              <motion.div
                animate={{ 
                  opacity: [0.3, 0.6, 0.3],
                  scale: [1, 1.05, 1]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-lg pointer-events-none"
              />
            </motion.div>

            <motion.div
              variants={statVariants}
              whileHover={{ scale: 1.1, rotate: 2 }}
              className="absolute -bottom-8 -left-8 w-32 h-32 bg-gray-100 rounded-lg shadow-lg flex items-center justify-center cursor-pointer"
            >
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={inView ? { scale: 1 } : { scale: 0 }}
                  transition={{ duration: 0.6, delay: 1.5, type: "spring", bounce: 0.4 }}
                  className="text-3xl text-gray-900 mb-1"
                >
                  500+
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.6, delay: 1.7 }}
                  className="text-sm text-gray-600"
                >
                  Weddings
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              variants={statVariants}
              whileHover={{ scale: 1.1, rotate: -2 }}
              className="absolute -top-8 -right-8 w-32 h-32 bg-white rounded-lg shadow-lg flex items-center justify-center cursor-pointer"
            >
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={inView ? { scale: 1 } : { scale: 0 }}
                  transition={{ duration: 0.6, delay: 1.6, type: "spring", bounce: 0.4 }}
                  className="text-3xl text-gray-900 mb-1"
                >
                  10+
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.6, delay: 1.8 }}
                  className="text-sm text-gray-600"
                >
                  Years
                </motion.div>
              </div>
            </motion.div>

            {/* Decorative floating elements */}
            <motion.div
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 5, 0],
                opacity: [0.3, 0.7, 0.3]
              }}
              transition={{ 
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute top-20 -left-4 w-3 h-3 bg-gray-300 rounded-full blur-sm"
            />
            
            <motion.div
              animate={{ 
                y: [0, 15, 0],
                rotate: [0, -3, 0],
                opacity: [0.2, 0.5, 0.2]
              }}
              transition={{ 
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2
              }}
              className="absolute bottom-32 -right-6 w-2 h-2 bg-gray-400 rounded-full blur-sm"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}