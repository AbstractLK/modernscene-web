import { motion } from "motion/react";
import { Heart, Calendar, Sparkles, Camera, MapPin, Users, Video, Gift } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { useInView } from "../hooks/useInView";
import weddingIcon from 'figma:asset/428f5f5d50390b217398a7d93a7f2b11c5cb4129.png';
import engagementIcon from 'figma:asset/724fe1b33e417feb750fa3630001da3dab44ed98.png';
import casualIcon from 'figma:asset/1b6f26023ca76a64603692cf714e81eb1186c419.png';
import homecomingIcon from 'figma:asset/e26fd976b367da4e1eb9f92d38ddee528e54aaab.png';
import cinematographyIcon from 'figma:asset/5d09b6551c2a4235d0a1743a9b72cef0381370bd.png';

export function Services() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const services = [
    {
      icon: Heart,
      title: "WEDDINGS",
      description: "Your wedding day is the pinnacle of your love story. Modern Scene creates breathtaking visual narratives that capture every precious moment - from intimate glances to joyful celebrations, preserving memories that will last forever."
    },
    {
      icon: Users,
      title: "ENGAGEMENTS", 
      description: "Celebrate the beginning of your journey together with stunning engagement photography. We create romantic, authentic portraits that showcase your unique connection and the excitement of this special chapter in your lives."
    },
    {
      icon: Camera,
      title: "CASUAL SHOOTS",
      description: "Relax and get comfortable with our lens through casual portrait sessions. These intimate shoots help you feel natural on camera while creating beautiful lifestyle images that reflect your authentic selves and relationship."
    },
    {
      icon: MapPin,
      title: "HOMECOMINGS",
      description: "Traditional homecoming ceremonies deserve artistic documentation. We capture the cultural richness and emotional significance of these sacred moments with respect, creativity, and modern photographic excellence."
    },
    {
      icon: Video,
      title: "CINEMATOGRAPHY", 
      description: "Bring your love story to life with cinematic wedding films. Our artistic videography captures the emotion, atmosphere, and magic of your day, creating moving visual stories you'll treasure forever."
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

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        type: "spring",
        bounce: 0.4,
      },
    },
  };

  const ServiceCard = ({ service, index }: { service: any; index: number }) => {
    const IconComponent = service.icon;
    const getCustomIcon = () => {
      switch (service.title) {
        case "WEDDINGS":
          return <img src={weddingIcon} alt="Wedding" className="w-8 h-8" />;
        case "ENGAGEMENTS":
          return <img src={engagementIcon} alt="Engagement" className="w-8 h-8" />;
        case "CASUAL SHOOTS":
          return <img src={casualIcon} alt="Casual Shoot" className="w-8 h-8" />;
        case "HOMECOMINGS":
          return <img src={homecomingIcon} alt="Homecoming" className="w-8 h-8" />;
        case "CINEMATOGRAPHY":
          return <img src={cinematographyIcon} alt="Cinematography" className="w-8 h-8" />;
        default:
          return <IconComponent className="w-8 h-8 text-gray-700" />;
      }
    };

    return (
      <motion.div
        variants={cardVariants}
        whileHover={{ 
          y: -10,
          scale: 1.02,
          transition: { duration: 0.3 }
        }}
        className="relative group"
      >
        <Card className="bg-white border-0 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden">
          <CardContent className="p-8 text-center relative">
            {/* Animated background gradient */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileHover={{ opacity: 0.05, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-600 rounded-lg"
            />
            
            <motion.div
              variants={iconVariants}
              className="w-16 h-16 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center relative z-10 group-hover:bg-gray-900 transition-colors duration-300"
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="group-hover:brightness-0 group-hover:invert transition-all duration-300"
              >
                {getCustomIcon()}
              </motion.div>
            </motion.div>

            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: index * 0.1 + 0.4 }}
              className="text-xl mb-4 text-gray-900 tracking-wide group-hover:text-gray-900 transition-colors duration-300 relative z-10"
            >
              {service.title}
            </motion.h3>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: index * 0.1 + 0.6 }}
              className="text-gray-600 leading-relaxed relative z-10"
            >
              {service.description}
            </motion.p>

            {/* Decorative corner elements */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileHover={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="absolute top-2 right-2 w-2 h-2 bg-gray-300 rounded-full"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileHover={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="absolute bottom-2 left-2 w-2 h-2 bg-gray-300 rounded-full"
            />
          </CardContent>
        </Card>
      </motion.div>
    );
  };

  return (
    <section id="services" className="py-20 relative overflow-hidden">
      {/* Sophisticated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-gray-25 to-white"></div>
      
      {/* Elegant mesh pattern */}
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.02) 1px, transparent 1px)`,
        backgroundSize: '60px 60px'
      }}></div>
      
      {/* Soft geometric overlays */}
      <motion.div
        animate={{ 
          rotate: [0, 360],
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute top-10 left-1/4 w-40 h-40 bg-gradient-to-r from-amber-100/30 to-orange-100/30 rounded-full blur-3xl"
      />
      
      <motion.div
        animate={{ 
          rotate: [360, 0],
          scale: [1, 0.9, 1]
        }}
        transition={{ 
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute bottom-20 right-1/3 w-36 h-36 bg-gradient-to-l from-blue-100/20 to-indigo-100/20 rounded-full blur-3xl"
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
              initial={{ opacity: 0, rotateX: -90 }}
              animate={inView ? { opacity: 1, rotateX: 0 } : { opacity: 0, rotateX: -90 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-block"
            >
              Our
            </motion.span>
            {" "}
            <motion.span
              initial={{ opacity: 0, rotateX: -90 }}
              animate={inView ? { opacity: 1, rotateX: 0 } : { opacity: 0, rotateX: -90 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="inline-block bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent"
            >
              Services
            </motion.span>
          </motion.h2>

          <motion.p
            variants={headerVariants}
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            From intimate moments to grand celebrations, Modern Scene offers comprehensive wedding photography services that capture your love story with artistic vision and contemporary elegance.
          </motion.p>

          {/* Decorative line animation */}
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={inView ? { width: 100, opacity: 1 } : { width: 0, opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="h-0.5 bg-gradient-to-r from-transparent via-gray-400 to-transparent mx-auto mt-8"
          />
        </motion.div>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="space-y-8"
        >
          {/* First row - 3 services */}
          <motion.div
            variants={containerVariants}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {services.slice(0, 3).map((service, index) => (
              <ServiceCard key={index} service={service} index={index} />
            ))}
          </motion.div>
          
          {/* Second row - 2 services centered */}
          <motion.div
            variants={containerVariants}
            className="flex justify-center"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl">
              {services.slice(3).map((service, index) => (
                <ServiceCard key={index + 3} service={service} index={index + 3} />
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Floating background elements */}
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 10, 0],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-32 left-10 w-8 h-8 bg-gray-300 rounded-full blur-sm opacity-20"
        />
        
        <motion.div
          animate={{ 
            y: [0, 25, 0],
            rotate: [0, -15, 0],
            opacity: [0.1, 0.25, 0.1]
          }}
          transition={{ 
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
          className="absolute bottom-40 right-16 w-6 h-6 bg-gray-400 rounded-full blur-sm opacity-20"
        />
      </div>
    </section>
  );
}