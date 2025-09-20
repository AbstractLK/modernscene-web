import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useInView } from "../hooks/useInView";

const portfolioImages = {
  fineArt: [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1752392253470-0e5a322e66f9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwY291cGxlJTIwaW50aW1hdGUlMjBtb21lbnR8ZW58MXx8fHwxNzU4MTIxOTExfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      alt: "Intimate wedding moment",
      className: "row-span-2"
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1749846430330-72f8f0d8cb51?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwY291cGxlJTIwZG9ncyUyMG91dGRvb3J8ZW58MXx8fHwxNzU4MTIxOTEyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      alt: "Wedding couple with dogs outdoors",
      className: "row-span-1"
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1547697932-14a499b46a2e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmlkZSUyMHBvcnRyYWl0JTIwdmVpbCUyMGFydGlzdGljfGVufDF8fHx8MTc1ODEyMTkxM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      alt: "Artistic bride portrait with veil",
      className: "row-span-2"
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1704281657570-350a6ef6a0c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwY2VyZW1vbnklMjBjb3VwbGUlMjB3YWxraW5nfGVufDF8fHx8MTc1ODEyMTkxM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      alt: "Wedding ceremony couple walking",
      className: "row-span-1"
    },
    {
      id: 5,
      src: "https://images.unsplash.com/photo-1574075691131-081e60d1b8f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwY291cGxlJTIwZm9yZXN0JTIwZGFuY2luZ3xlbnwxfHx8fDE3NTgxMjE5MTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      alt: "Wedding couple dancing in forest",
      className: "row-span-2"
    },
    {
      id: 6,
      src: "https://images.unsplash.com/photo-1754966447282-b56909233452?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwY291cGxlJTIwbW9vZHklMjBsYW5kc2NhcGV8ZW58MXx8fHwxNzU4MTIxOTEzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      alt: "Moody landscape wedding photo",
      className: "row-span-1"
    },
    {
      id: 7,
      src: "https://images.unsplash.com/photo-1638616587511-4925b47e794b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwcm9tYW50aWMlMjBzaWxob3VldHRlfGVufDF8fHx8MTc1ODEyMTkxM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      alt: "Romantic wedding silhouette",
      className: "row-span-2"
    },
    {
      id: 8,
      src: "https://images.unsplash.com/photo-1660294502608-d65e5c62f244?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwY291cGxlJTIwZ29sZGVuJTIwaG91cnxlbnwxfHx8fDE3NTgxMjE5MTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      alt: "Golden hour wedding couple",
      className: "row-span-1"
    }
  ],
  artistic: [
    // Reordered for different aesthetic
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1547697932-14a499b46a2e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmlkZSUyMHBvcnRyYWl0JTIwdmVpbCUyMGFydGlzdGljfGVufDF8fHx8MTc1ODEyMTkxM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      alt: "Artistic bride portrait with veil",
      className: "row-span-1"
    },
    {
      id: 7,
      src: "https://images.unsplash.com/photo-1638616587511-4925b47e794b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwcm9tYW50aWMlMjBzaWxob3VldHRlfGVufDF8fHx8MTc1ODEyMTkxM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      alt: "Romantic wedding silhouette",
      className: "row-span-2"
    },
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1752392253470-0e5a322e66f9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwY291cGxlJTIwaW50aW1hdGUlMjBtb21lbnR8ZW58MXx8fHwxNzU4MTIxOTExfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      alt: "Intimate wedding moment",
      className: "row-span-1"
    },
    {
      id: 6,
      src: "https://images.unsplash.com/photo-1754966447282-b56909233452?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwY291cGxlJTIwbW9vZHklMjBsYW5kc2NhcGV8ZW58MXx8fHwxNzU4MTIxOTEzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      alt: "Moody landscape wedding photo",
      className: "row-span-2"
    },
    {
      id: 5,
      src: "https://images.unsplash.com/photo-1574075691131-081e60d1b8f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwY291cGxlJTIwZm9yZXN0JTIwZGFuY2luZ3xlbnwxfHx8fDE3NTgxMjE5MTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      alt: "Wedding couple dancing in forest",
      className: "row-span-1"
    },
    {
      id: 8,
      src: "https://images.unsplash.com/photo-1660294502608-d65e5c62f244?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwY291cGxlJTIwZ29sZGVuJTIwaG91cnxlbnwxfHx8fDE3NTgxMjE5MTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      alt: "Golden hour wedding couple",
      className: "row-span-2"
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1749846430330-72f8f0d8cb51?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwY291cGxlJTIwZG9ncyUyMG91dGRvb3J8ZW58MXx8fHwxNzU4MTIxOTEyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      alt: "Wedding couple with dogs outdoors",
      className: "row-span-1"
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1704281657570-350a6ef6a0c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwY2VyZW1vbnklMjBjb3VwbGUlMjB3YWxraW5nfGVufDF8fHx8MTc1ODEyMTkxM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      alt: "Wedding ceremony couple walking",
      className: "row-span-1"
    }
  ],
  vintage: [
    // Another arrangement for vintage feel
    {
      id: 8,
      src: "https://images.unsplash.com/photo-1660294502608-d65e5c62f244?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwY291cGxlJTIwZ29sZGVuJTIwaG91cnxlbnwxfHx8fDE3NTgxMjE5MTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      alt: "Golden hour wedding couple",
      className: "row-span-2"
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1704281657570-350a6ef6a0c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwY2VyZW1vbnklMjBjb3VwbGUlMjB3YWxraW5nfGVufDF8fHx8MTc1ODEyMTkxM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      alt: "Wedding ceremony couple walking",
      className: "row-span-1"
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1749846430330-72f8f0d8cb51?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwY291cGxlJTIwZG9ncyUyMG91dGRvb3J8ZW58MXx8fHwxNzU4MTIxOTEyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      alt: "Wedding couple with dogs outdoors",
      className: "row-span-2"
    },
    {
      id: 6,
      src: "https://images.unsplash.com/photo-1754966447282-b56909233452?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwY291cGxlJTIwbW9vZHklMjBsYW5kc2NhcGV8ZW58MXx8fHwxNzU4MTIxOTEzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      alt: "Moody landscape wedding photo",
      className: "row-span-1"
    },
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1752392253470-0e5a322e66f9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwY291cGxlJTIwaW50aW1hdGUlMjBtb21lbnR8ZW58MXx8fHwxNzU4MTIxOTExfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      alt: "Intimate wedding moment",
      className: "row-span-1"
    },
    {
      id: 7,
      src: "https://images.unsplash.com/photo-1638616587511-4925b47e794b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwcm9tYW50aWMlMjBzaWxob3VldHRlfGVufDF8fHx8MTc1ODEyMTkxM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      alt: "Romantic wedding silhouette",
      className: "row-span-2"
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1547697932-14a499b46a2e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmlkZSUyMHBvcnRyYWl0JTIwdmVpbCUyMGFydGlzdGljfGVufDF8fHx8MTc1ODEyMTkxM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      alt: "Artistic bride portrait with veil",
      className: "row-span-1"
    },
    {
      id: 5,
      src: "https://images.unsplash.com/photo-1574075691131-081e60d1b8f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwY291cGxlJTIwZm9yZXN0JTIwZGFuY2luZ3xlbnwxfHx8fDE3NTgxMjE5MTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      alt: "Wedding couple dancing in forest",
      className: "row-span-1"
    }
  ]
};

export function AmazingWork() {
  const [activeTab, setActiveTab] = useState("vintage");
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const tabs = [
    { id: "fineArt", label: "FINE ART" },
    { id: "artistic", label: "ARTISTIC" },
    { id: "vintage", label: "VINTAGE" }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const headerVariants = {
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
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Artistic gradient background */}
      <div className="absolute inset-0 bg-gradient-to-tr from-gray-100 via-gray-50 to-white"></div>
      
      {/* Sophisticated texture overlay */}
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `repeating-conic-gradient(from 0deg at 50% 50%, transparent 0deg, rgba(0,0,0,0.01) 45deg, transparent 90deg)`,
        backgroundSize: '80px 80px'
      }}></div>
      
      {/* Creative floating shapes */}
      <motion.div
        animate={{ 
          x: [0, 60, 0],
          y: [0, -40, 0],
          rotate: [0, 15, 0]
        }}
        transition={{ 
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-24 right-1/5 w-32 h-32 bg-gradient-to-br from-amber-100/50 to-orange-100/50 rounded-full blur-2xl"
      />
      
      <motion.div
        animate={{ 
          x: [0, -45, 0],
          y: [0, 30, 0],
          rotate: [0, -12, 0]
        }}
        transition={{ 
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 6
        }}
        className="absolute bottom-28 left-1/6 w-28 h-28 bg-gradient-to-tl from-teal-100/40 to-cyan-100/40 rounded-full blur-xl"
      />
      
      <motion.div
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.5, 0.2],
          rotate: [0, 90, 0]
        }}
        transition={{ 
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/2 left-1/3 w-20 h-20 bg-gradient-to-r from-purple-100/30 to-violet-100/30 rounded-full blur-2xl"
      />
      <div className="max-w-7xl mx-auto text-center relative z-10">
        {/* Animated Header */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mb-16"
        >
          <motion.h2
            variants={headerVariants}
            className="text-4xl md:text-5xl text-gray-400 mb-8 tracking-wider"
            style={{ fontFamily: 'Lovalina Free' }}
          >
            <motion.span
              initial={{ opacity: 0, y: 20, rotateX: -90 }}
              animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 20, rotateX: -90 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-block"
            >
              OUR
            </motion.span>
            {" "}
            <motion.span
              initial={{ opacity: 0, y: 20, rotateX: -90 }}
              animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 20, rotateX: -90 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="inline-block bg-gradient-to-r from-gray-500 to-gray-300 bg-clip-text text-transparent"
            >
              AMAZING
            </motion.span>
            {" "}
            <motion.span
              initial={{ opacity: 0, y: 20, rotateX: -90 }}
              animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 20, rotateX: -90 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="inline-block"
            >
              WORK
            </motion.span>
          </motion.h2>

          <motion.p
            variants={headerVariants}
            className="text-gray-600 max-w-4xl mx-auto leading-relaxed"
          >
            We want to capture the way your relationship feels, the way your hands touch and faces meet. We want to capture the tears, the laugh from your gut moments, and all stuff in between.
          </motion.p>

          {/* Decorative line animation */}
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={inView ? { width: 100, opacity: 1 } : { width: 0, opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="h-0.5 bg-gradient-to-r from-transparent via-gray-400 to-transparent mx-auto mt-8"
          />
        </motion.div>

        {/* Animated Tabs */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex justify-center mb-12"
        >
          <div className="flex space-x-12">
            {tabs.map((tab, index) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.4, delay: index * 0.1 + 1 }}
                whileHover={{ 
                  scale: 1.05,
                  y: -2
                }}
                whileTap={{ scale: 0.95 }}
                className={`text-sm tracking-widest transition-all duration-300 relative ${
                  activeTab === tab.id
                    ? "text-gray-800"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                {tab.label}
                
                {/* Animated underline */}
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ 
                    width: activeTab === tab.id ? "100%" : 0 
                  }}
                  transition={{ duration: 0.3 }}
                  className="absolute -bottom-1 left-0 h-px bg-gray-800"
                />
                
                {/* Hover effect dots */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  whileHover={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2 }}
                  className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-gray-400 rounded-full"
                />
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Animated Gallery Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto auto-rows-[200px]"
          >
            {portfolioImages[activeTab as keyof typeof portfolioImages].map((image, index) => (
              <motion.div
                key={`${activeTab}-${image.id}`}
                variants={imageVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: index * 0.1 }}
                whileHover={{ 
                  scale: 1.05,
                  rotate: Math.random() * 4 - 2, // Random slight rotation
                  zIndex: 10
                }}
                className={`relative overflow-hidden rounded-sm group cursor-pointer ${image.className}`}
              >
                <motion.div
                  initial={{ scale: 1.2, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="w-full h-full"
                >
                  <ImageWithFallback
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                  />
                </motion.div>

                {/* Animated overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 0.3 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-white/20"
                />

                {/* Corner decorative elements */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="absolute top-2 right-2 w-2 h-2 bg-white/70 rounded-full"
                />

                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  className="absolute bottom-2 left-2 w-1 h-1 bg-white/50 rounded-full"
                />

                {/* Floating heart on hover */}
                <motion.div
                  initial={{ scale: 0, y: 10, opacity: 0 }}
                  whileHover={{ 
                    scale: [0, 1.3, 1],
                    y: [10, -5, 0],
                    opacity: [0, 1, 0.8]
                  }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                >
                  <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">♥</span>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Background floating elements */}
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 15, 0],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-40 left-20 w-6 h-6 bg-gray-300 rounded-full blur-sm opacity-20"
        />
        
        <motion.div
          animate={{ 
            y: [0, 25, 0],
            rotate: [0, -12, 0],
            opacity: [0.1, 0.25, 0.1]
          }}
          transition={{ 
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4
          }}
          className="absolute bottom-60 right-24 w-4 h-4 bg-gray-400 rounded-full blur-sm opacity-20"
        />
      </div>
    </section>
  );
}