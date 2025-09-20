import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { useInView } from "../hooks/useInView";

export function Portfolio() {
  const [activeFilter, setActiveFilter] = useState("All");
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const portfolioItems = [
    {
      image: "https://images.unsplash.com/photo-1749301071652-3928dbd4abb9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwd2VkZGluZyUyMGNlcmVtb255JTIwb3V0ZG9vcnxlbnwxfHx8fDE3NTgxOTQyNzB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      title: "Sarah & Michael",
      location: "Weddings",
      description: "Romantic vineyard wedding with garden-inspired florals"
    },
    {
      image: "https://images.unsplash.com/photo-1606217239566-1c893c2e110e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmlkZSUyMGdyb29tJTIwd2VkZGluZyUyMHBvcnRyYWl0fGVufDF8fHx8MTc1ODE5NDI3M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      title: "Emma & James",
      location: "Homecoming",
      description: "Elegant ballroom reception with classic styling"
    },
    {
      image: "https://images.unsplash.com/photo-1738669469338-801b4e9dbccf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwcmVjZXB0aW9uJTIwcm9tYW50aWMlMjBsaWdodGluZ3xlbnwxfHx8fDE3NTgxOTQyNzV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      title: "Lisa & David",
      location: "Casual Shoots",
      description: "Intimate ceremony with tropical floral arrangements"
    },
    {
      image: "https://images.unsplash.com/photo-1684244276932-6ae853774c4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwYm91cXVldCUyMHJpbmdzJTIwZGV0YWlsc3xlbnwxfHx8fDE3NTgxOTQyNzh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      title: "Anna & Chris",
      location: "Thanks Cards & Enlargements",
      description: "Outdoor ceremony surrounded by natural beauty"
    },
    {
      image: "https://images.unsplash.com/photo-1639823096986-f08f3884de84?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwd2VkZGluZyUyMGNodXJjaCUyMGNlcmVtb255fGVufDF8fHx8MTc1ODE5NDI4MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      title: "Rachel & Tom",
      location: "Weddings",
      description: "Modern celebration with sophisticated details"
    },
    {
      image: "https://images.unsplash.com/photo-1629942878547-cfd0c89b54d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWFjaCUyMHdlZGRpbmclMjBzdW5zZXQlMjBjb3VwbGV8ZW58MXx8fHwxNzU4MTk0MjgzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      title: "Maria & Alex",
      location: "Casual Shoots",
      description: "Rustic elegance with breathtaking mountain views"
    }
  ];

  const filterButtons = [
    "All",
    "Weddings",
    "Homecoming", 
    "Casual Shoots",
    "Engagements",
    "Cinematography",
    "Thanks Cards & Enlargements"
  ];

  const filteredItems = activeFilter === "All" 
    ? portfolioItems 
    : portfolioItems.filter(item => 
        item.location.toLowerCase() === activeFilter.toLowerCase()
      );

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

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      transition: {
        duration: 0.3,
      },
    },
  };

  const PortfolioCard = ({ item, index }: { item: any; index: number }) => {
    const images = [
      "https://images.unsplash.com/photo-1749301071652-3928dbd4abb9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwd2VkZGluZyUyMGNlcmVtb255JTIwb3V0ZG9vcnxlbnwxfHx8fDE3NTgxOTQyNzB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1606217239566-1c893c2e110e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmlkZSUyMGdyb29tJTIwd2VkZGluZyUyMHBvcnRyYWl0fGVufDF8fHx8MTc1ODE5NDI3M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1738669469338-801b4e9dbccf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwcmVjZXB0aW9uJTIwcm9tYW50aWMlMjBsaWdodGluZ3xlbnwxfHx8fDE3NTgxOTQyNzV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1684244276932-6ae853774c4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwYm91cXVldCUyMHJpbmdzJTIwZGV0YWlsc3xlbnwxfHx8fDE3NTgxOTQyNzh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1639823096986-f08f3884de84?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwd2VkZGluZyUyMGNodXJjaCUyMGNlcmVtb255fGVufDF8fHx8MTc1ODE5NDI4MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1629942878547-cfd0c89b54d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWFjaCUyMHdlZGRpbmclMjBzdW5zZXQlMjBjb3VwbGV8ZW58MXx8fHwxNzU4MTk0MjgzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    ];

    return (
      <motion.div
        layout
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        whileHover={{ y: -10, scale: 1.02 }}
        transition={{ duration: 0.3 }}
        className="group cursor-pointer"
      >
        <Card className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500">
          <motion.div 
            className="relative overflow-hidden"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <ImageWithFallback
                src={images[index % images.length]}
                alt={`${item.title} wedding photography`}
                className="w-full h-64 object-cover"
              />
            </motion.div>

            {/* Overlay with gradient animation */}
            <motion.div 
              initial={{ opacity: 0.3 }}
              whileHover={{ opacity: 0.1 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"
            />

            {/* Animated corner elements */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="absolute top-4 right-4 w-2 h-2 bg-white/70 rounded-full"
            />

            {/* Floating heart animation on hover */}
            <motion.div
              initial={{ scale: 0, y: 10, opacity: 0 }}
              whileHover={{ 
                scale: [0, 1.2, 1],
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

          <motion.div 
            className="p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
          >
            <motion.h3 
              className="text-xl mb-1 text-gray-900 group-hover:text-gray-700 transition-colors duration-300"
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              {item.title}
            </motion.h3>
            
            <motion.p 
              className="text-sm text-gray-600 mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 + 0.4 }}
            >
              {item.location}
            </motion.p>
            
            <motion.p 
              className="text-sm text-gray-600 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 + 0.5 }}
            >
              {item.description}
            </motion.p>
          </motion.div>
        </Card>
      </motion.div>
    );
  };

  return (
    <section id="portfolio" className="py-20 relative overflow-hidden">
      {/* Dreamy gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-amber-25 to-orange-50"></div>
      
      {/* Elegant diamond pattern */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(0,0,0,0.02) 20px, rgba(0,0,0,0.02) 40px)`,
      }}></div>
      
      {/* Soft floating elements */}
      <motion.div
        animate={{ 
          x: [0, 50, 0],
          y: [0, -30, 0],
          rotate: [0, 10, 0]
        }}
        transition={{ 
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-16 left-1/5 w-28 h-28 bg-gradient-to-br from-amber-200/40 to-orange-200/40 rounded-full blur-2xl"
      />
      
      <motion.div
        animate={{ 
          x: [0, -40, 0],
          y: [0, 25, 0],
          rotate: [0, -8, 0]
        }}
        transition={{ 
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 7
        }}
        className="absolute bottom-20 right-1/4 w-36 h-36 bg-gradient-to-tl from-blue-100/30 to-indigo-200/30 rounded-full blur-3xl"
      />
      
      <motion.div
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{ 
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/3 right-1/6 w-20 h-20 bg-gradient-to-r from-violet-100/40 to-purple-100/40 rounded-full blur-xl"
      />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.h2
            variants={headerVariants}
            className="text-4xl md:text-5xl mb-6 text-gray-900"
            style={{ fontFamily: 'Lovalina Free' }}
          >
            <motion.span
              initial={{ opacity: 0, rotateY: -90 }}
              animate={inView ? { opacity: 1, rotateY: 0 } : { opacity: 0, rotateY: -90 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-block"
            >
              Recent
            </motion.span>
            {" "}
            <motion.span
              initial={{ opacity: 0, rotateY: -90 }}
              animate={inView ? { opacity: 1, rotateY: 0 } : { opacity: 0, rotateY: -90 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="inline-block bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent"
            >
              Weddings
            </motion.span>
          </motion.h2>

          <motion.p
            variants={headerVariants}
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8"
          >
            Every love story deserves to be told beautifully. Explore our recent wedding photography showcasing couples' most precious moments captured with artistic vision and modern elegance.
          </motion.p>
          
          {/* Animated Filter Buttons */}
          <motion.div
            variants={containerVariants}
            className="flex flex-wrap justify-center gap-3 mb-8"
          >
            {filterButtons.map((filter, index) => (
              <motion.div
                key={filter}
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={inView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.1 + 0.6 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={() => setActiveFilter(filter)}
                  className={`bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-100 px-6 py-2 transition-all duration-300 ${
                    activeFilter === filter 
                      ? 'bg-gray-900 text-white border-gray-900 hover:bg-gray-800 shadow-lg' 
                      : ''
                  }`}
                >
                  {filter}
                </Button>
              </motion.div>
            ))}
          </motion.div>

          {/* Decorative line animation */}
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={inView ? { width: 120, opacity: 1 } : { width: 0, opacity: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="h-0.5 bg-gradient-to-r from-transparent via-gray-400 to-transparent mx-auto"
          />
        </motion.div>
        
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredItems.map((item, index) => (
              <PortfolioCard key={`${item.title}-${index}-${activeFilter}`} item={item} index={index} />
            ))}
          </motion.div>
        </AnimatePresence>
        
        {filteredItems.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-12"
          >
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-gray-500 text-lg"
            >
              No items found for the selected category.
            </motion.p>
          </motion.div>
        )}

        {/* Background decorative elements */}
        <motion.div
          animate={{ 
            y: [0, -15, 0],
            rotate: [0, 10, 0],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{ 
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-40 right-20 w-6 h-6 bg-gray-300 rounded-full blur-sm opacity-20"
        />
        
        <motion.div
          animate={{ 
            y: [0, 20, 0],
            rotate: [0, -8, 0],
            opacity: [0.1, 0.25, 0.1]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute bottom-60 left-12 w-4 h-4 bg-gray-400 rounded-full blur-sm opacity-20"
        />
      </div>
    </section>
  );
}