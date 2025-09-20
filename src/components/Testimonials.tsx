import { motion } from "motion/react";
import { Star } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { useInView } from "../hooks/useInView";

export function Testimonials() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const testimonials = [
    {
      name: "Sarah & Michael",
      location: "Napa Valley",
      text: "Modern Scene captured our wedding day beautifully! Every photo tells a story, and their artistic vision exceeded our expectations. We're so grateful for these timeless memories.",
      rating: 5
    },
    {
      name: "Emma & James",
      location: "San Francisco", 
      text: "From engagement photos to our wedding day, Modern Scene was incredible. Their modern style and attention to detail made us feel so comfortable, and the results are absolutely stunning.",
      rating: 5
    },
    {
      name: "Lisa & David",
      location: "Carmel",
      text: "We couldn't be happier with our wedding photography! Modern Scene perfectly captured the romance and joy of our special day. Every image is a work of art that we'll treasure forever.",
      rating: 5
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
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
  };

  const TestimonialCard = ({ testimonial, index }: { testimonial: any; index: number }) => {
    return (
      <motion.div
        variants={cardVariants}
        whileHover={{ 
          y: -10,
          scale: 1.02,
          transition: { duration: 0.3 }
        }}
        className="group"
      >
        <Card className="bg-white border-0 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden">
          <CardContent className="p-8 relative">
            {/* Background gradient animation */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileHover={{ opacity: 0.05, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-yellow-200 rounded-lg"
            />

            {/* Animated stars */}
            <motion.div 
              className="flex mb-4 relative z-10"
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.6, delay: index * 0.1 + 0.4 }}
            >
              {[...Array(testimonial.rating)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={inView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: index * 0.1 + 0.5 + i * 0.1,
                    type: "spring",
                    bounce: 0.5
                  }}
                  whileHover={{ 
                    scale: 1.2,
                    rotate: 360,
                    transition: { duration: 0.3 }
                  }}
                >
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                </motion.div>
              ))}
            </motion.div>

            {/* Animated quote */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: index * 0.1 + 0.8 }}
              className="text-gray-600 mb-6 leading-relaxed italic relative z-10 group-hover:text-gray-700 transition-colors duration-300"
            >
              <motion.span
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 + 1 }}
                className="text-4xl text-yellow-400/30 absolute -top-2 -left-1"
              >
                "
              </motion.span>
              {testimonial.text}
              <motion.span
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 + 1.2 }}
                className="text-4xl text-yellow-400/30"
              >
                "
              </motion.span>
            </motion.p>

            {/* Animated names and location */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: index * 0.1 + 1 }}
              className="relative z-10"
            >
              <motion.h4 
                className="text-gray-900 mb-1 group-hover:text-gray-800 transition-colors duration-300"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                {testimonial.name}
              </motion.h4>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 + 1.2 }}
                className="text-gray-500 text-sm"
              >
                {testimonial.location}
              </motion.p>
            </motion.div>

            {/* Decorative corner elements */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileHover={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="absolute top-4 right-4 w-2 h-2 bg-yellow-400/30 rounded-full"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileHover={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="absolute bottom-4 left-4 w-1 h-1 bg-yellow-400/20 rounded-full"
            />

            {/* Floating heart animation */}
            <motion.div
              animate={{ 
                y: [0, -5, 0],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.5
              }}
              className="absolute bottom-2 right-2 text-yellow-400/20 text-xs"
            >
              ♥
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    );
  };

  return (
    <section id="testimonials" className="py-20 relative overflow-hidden">
      {/* Warm gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-amber-25 via-yellow-50 to-orange-50"></div>
      
      {/* Subtle honeycomb pattern */}
      <div className="absolute inset-0 opacity-15" style={{
        backgroundImage: `repeating-linear-gradient(30deg, transparent, transparent 35px, rgba(255,193,7,0.03) 35px, rgba(255,193,7,0.03) 70px), repeating-linear-gradient(-30deg, transparent, transparent 35px, rgba(255,193,7,0.03) 35px, rgba(255,193,7,0.03) 70px)`,
      }}></div>
      
      {/* Golden floating elements */}
      <motion.div
        animate={{ 
          x: [0, 40, 0],
          y: [0, -35, 0],
          rotate: [0, 12, 0]
        }}
        transition={{ 
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-20 left-1/6 w-24 h-24 bg-gradient-to-br from-yellow-200/60 to-amber-200/60 rounded-full blur-xl"
      />
      
      <motion.div
        animate={{ 
          x: [0, -35, 0],
          y: [0, 20, 0],
          rotate: [0, -8, 0]
        }}
        transition={{ 
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4
        }}
        className="absolute bottom-24 right-1/5 w-28 h-28 bg-gradient-to-tl from-orange-200/50 to-yellow-200/50 rounded-full blur-2xl"
      />
      
      <motion.div
        animate={{ 
          scale: [1, 1.4, 1],
          opacity: [0.3, 0.7, 0.3],
          rotate: [0, 45, 0]
        }}
        transition={{ 
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/3 right-1/4 w-16 h-16 bg-gradient-to-r from-amber-100/50 to-yellow-100/50 rounded-full blur-xl"
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
              What
            </motion.span>
            {" "}
            <motion.span
              initial={{ opacity: 0, rotateY: -90 }}
              animate={inView ? { opacity: 1, rotateY: 0 } : { opacity: 0, rotateY: -90 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="inline-block bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent"
            >
              Couples
            </motion.span>
            {" "}
            <motion.span
              initial={{ opacity: 0, rotateY: -90 }}
              animate={inView ? { opacity: 1, rotateY: 0 } : { opacity: 0, rotateY: -90 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="inline-block"
            >
              Say
            </motion.span>
          </motion.h2>

          <motion.p
            variants={headerVariants}
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            Don't just take our word for it. Here's what our couples have to say about their wedding experience with us.
          </motion.p>

          {/* Decorative line animation */}
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={inView ? { width: 120, opacity: 1 } : { width: 0, opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="h-0.5 bg-gradient-to-r from-transparent via-yellow-400 to-transparent mx-auto mt-8"
          />
        </motion.div>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} index={index} />
          ))}
        </motion.div>

        {/* Background floating elements */}
        <motion.div
          animate={{ 
            y: [0, -15, 0],
            rotate: [0, 8, 0],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{ 
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-32 right-20 w-5 h-5 bg-yellow-400 rounded-full blur-sm opacity-20"
        />
        
        <motion.div
          animate={{ 
            y: [0, 20, 0],
            rotate: [0, -12, 0],
            opacity: [0.1, 0.25, 0.1]
          }}
          transition={{ 
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
          className="absolute bottom-40 left-16 w-3 h-3 bg-yellow-300 rounded-full blur-sm opacity-20"
        />
      </div>
    </section>
  );
}