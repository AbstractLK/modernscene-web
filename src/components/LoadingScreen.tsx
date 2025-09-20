import { motion } from "motion/react";
import { useEffect } from "react";
import logoImage from 'figma:asset/27edc81f4178cc158134fce4bfc6b1ebf0620fd8.png';

interface LoadingScreenProps {
  onComplete: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const containerVariants = {
    initial: { opacity: 1 },
    exit: {
      opacity: 0,
      scale: 1.1,
      transition: {
        duration: 1,
        ease: [0.76, 0, 0.24, 1],
      },
    },
  };

  const textVariants = {
    initial: { 
      opacity: 0,
      y: 30,
      scale: 0.9,
    },
    animate: { 
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 1.2,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: 0.3,
      },
    },
  };

  const letterVariants = {
    initial: { 
      opacity: 0,
      y: 50,
      rotateX: -90,
    },
    animate: { 
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const glowVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: {
      scale: [0, 1.2, 1],
      opacity: [0, 0.8, 0.3],
      transition: {
        duration: 2,
        ease: "easeOut",
        times: [0, 0.6, 1],
        delay: 1,
      },
    },
  };

  const shimmerVariants = {
    initial: { x: "-100%", opacity: 0 },
    animate: {
      x: "100%",
      opacity: [0, 0.5, 0],
      transition: {
        duration: 1.5,
        ease: "easeInOut",
        repeat: 2,
        delay: 1,
      },
    },
  };

  // Auto-complete after animation with proper cleanup
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      exit="exit"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black overflow-hidden"
    >
      {/* Subtle animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <motion.div
          className="absolute top-1/4 left-1/4 w-48 h-48 bg-gradient-to-r from-white to-gray-300 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.05, 0.15, 0.05],
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-gradient-to-r from-gray-300 to-white rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.03, 0.1, 0.03],
            x: [0, -25, 0],
            y: [0, 15, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      {/* Subtle floating particles */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-0.5 h-0.5 bg-white rounded-full opacity-20"
          style={{
            left: `${25 + (i * 20)}%`,
            top: `${35 + (i * 15)}%`,
          }}
          animate={{
            y: [0, -10, 0],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5,
          }}
        />
      ))}

      {/* Main content */}
      <div className="relative text-center">
        {/* Glow effect behind logo */}
        <motion.div
          variants={glowVariants}
          initial="initial"
          animate="animate"
          className="absolute inset-0 bg-gradient-to-r from-white/20 via-gray-300/10 to-white/20 rounded-full blur-3xl"
        />

        {/* Logo Image */}
        <motion.div
          variants={textVariants}
          initial="initial"
          animate="animate"
          className="relative"
        >
          <motion.div
            className="relative overflow-hidden rounded-lg"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Shimmer effect overlay */}
            <motion.div
              variants={shimmerVariants}
              initial="initial"
              animate="animate"
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 z-10"
            />
            
            {/* Main logo image */}
            <motion.img
              src={logoImage}
              alt="Modern Scene Wedding Photography"
              className="w-64 h-auto md:w-80 lg:w-96 max-w-[90vw] object-contain filter brightness-110 contrast-110"
              initial={{ 
                opacity: 0, 
                scale: 0.8,
                rotateY: -15 
              }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                rotateY: 0 
              }}
              transition={{ 
                duration: 1.2, 
                ease: [0.25, 0.46, 0.45, 0.94],
                delay: 0.5 
              }}
            />
          </motion.div>
        </motion.div>

        {/* Loading dots */}
        <motion.div
          className="flex justify-center items-center mt-8 space-x-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className="w-1.5 h-1.5 bg-white rounded-full"
              animate={{
                scale: [1, 1.4, 1],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                delay: index * 0.15,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>
      </div>

      {/* Subtle border glow */}
      <motion.div
        className="absolute inset-0 border border-white/5 rounded-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        style={{
          boxShadow: 'inset 0 0 100px rgba(255,255,255,0.03)',
        }}
      />
    </motion.div>
  );
}