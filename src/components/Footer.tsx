import { motion } from "motion/react";
import { Heart, Instagram, Facebook, Mail, Youtube, MessageSquare } from "lucide-react";
import { useInView } from "../hooks/useInView";

export function Footer() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

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

  const socialLinks = [
    {
      href: "https://www.facebook.com/ModernSceneWeddings.lk/",
      icon: Facebook,
      label: "Facebook"
    },
    {
      href: "https://www.instagram.com/modernsceneweddings/?fbclid=IwY2xjawM5GV1leHRuA2FlbQIxMABicmlkETE1NXM4VmdOTml4SWtmcTdrAR6-4egHbpxcGgIcVuuYG_j6I4xVMUhsQmuzczEbs7dGE_FYpH2ceGDSQrxqGg_aem_TFFKjE3tmDGgWPnox3dK_A#",
      icon: Instagram,
      label: "Instagram"
    },
    {
      href: "https://www.youtube.com/@ModernSceneWeddings",
      icon: Youtube,
      label: "YouTube"
    },
    {
      href: "https://wa.me/94774890840",
      icon: MessageSquare,
      label: "WhatsApp"
    }
  ];

  return (
    <footer className="relative text-white py-12 overflow-hidden">
      {/* Dark elegant gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-gray-900 to-black"></div>
      
      {/* Sophisticated pattern overlay */}
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.02) 2px, transparent 2px), radial-gradient(circle at 75% 75%, rgba(255,255,255,0.01) 1px, transparent 1px)`,
        backgroundSize: '60px 60px, 30px 30px'
      }}></div>
      
      {/* Elegant floating elements */}
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
        className="absolute top-16 right-1/5 w-16 h-16 bg-gradient-to-br from-white/5 to-gray-300/5 rounded-full blur-xl"
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
          delay: 4
        }}
        className="absolute bottom-20 left-1/6 w-12 h-12 bg-gradient-to-tl from-slate-400/3 to-gray-500/3 rounded-full blur-lg"
      />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8"
        >
          {/* Company Info */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <motion.h3 
              className="text-2xl mb-3 tracking-wide" 
              style={{ fontFamily: 'Lovalina Free' }}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <motion.span
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
              >
                MODERN SCENE WEDDING
              </motion.span>
            </motion.h3>
            
            <motion.p 
              className="text-gray-300 text-sm mb-4 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              If you feel like you can trust us with your story, please get in touch.
            </motion.p>
            
            {/* Animated Social Links */}
            <motion.div 
              className="flex space-x-3"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              {socialLinks.map((link, index) => {
                const IconComponent = link.icon;
                return (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-white transition-all duration-300"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                    transition={{ 
                      duration: 0.4, 
                      delay: 0.9 + index * 0.1,
                      type: "spring",
                      bounce: 0.5
                    }}
                    whileHover={{ 
                      scale: 1.2,
                      rotate: 360,
                      color: "#ffffff"
                    }}
                    whileTap={{ scale: 0.9 }}
                    aria-label={link.label}
                  >
                    <IconComponent className="w-5 h-5" />
                  </motion.a>
                );
              })}
            </motion.div>

            {/* Floating heart animation */}
            <motion.div
              animate={{ 
                y: [0, -5, 0],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute mt-4 text-red-400/30"
            >
              <Heart className="w-4 h-4" />
            </motion.div>
          </motion.div>
          
          {/* Call Us */}
          <motion.div variants={itemVariants}>
            <motion.h4 
              className="text-sm mb-3 flex items-center"
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              <motion.span 
                className="mr-2"
                animate={{ rotate: [0, 15, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                📞
              </motion.span>
              CALL US
            </motion.h4>
            <motion.div 
              className="space-y-1 text-gray-300 text-sm"
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <motion.p
                whileHover={{ x: 5, color: "#ffffff" }}
                transition={{ duration: 0.2 }}
              >
                +94 77 489 08 40
              </motion.p>
              <motion.p
                whileHover={{ x: 5, color: "#ffffff" }}
                transition={{ duration: 0.2 }}
              >
                +94 70 2 890 840
              </motion.p>
            </motion.div>
          </motion.div>
          
          {/* Write to Us */}
          <motion.div variants={itemVariants}>
            <motion.h4 
              className="text-sm mb-3 flex items-center"
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              <motion.span 
                className="mr-2"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ✉️
              </motion.span>
              WRITE TO US
            </motion.h4>
            <motion.div 
              className="space-y-1 text-gray-300 text-sm"
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <motion.p
                whileHover={{ x: 5, color: "#ffffff" }}
                transition={{ duration: 0.2 }}
              >
                info@modernscene.lk
              </motion.p>
            </motion.div>
          </motion.div>
          
          {/* Location */}
          <motion.div variants={itemVariants}>
            <motion.h4 
              className="text-sm mb-3 flex items-center"
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              <motion.span 
                className="mr-2"
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                📍
              </motion.span>
              LOCATION
            </motion.h4>
            <motion.div 
              className="text-gray-300 text-sm"
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <motion.p
                whileHover={{ x: 5, color: "#ffffff" }}
                transition={{ duration: 0.2 }}
              >
                No 50A, 1/1 Airport Road, Minuwangoda 11550
              </motion.p>
            </motion.div>
          </motion.div>
          
          {/* Working Hours */}
          <motion.div variants={itemVariants}>
            <motion.h4 
              className="text-sm mb-3 flex items-center"
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              <motion.span 
                className="mr-2"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                🕒
              </motion.span>
              WORKING HOURS
            </motion.h4>
            <motion.div 
              className="text-gray-300 text-sm"
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <motion.p
                whileHover={{ x: 5, color: "#ffffff" }}
                transition={{ duration: 0.2 }}
              >
                7 Days : 8AM - 7PM
              </motion.p>
            </motion.div>
          </motion.div>
        </motion.div>
        
        {/* Animated Footer Bottom */}
        <motion.div 
          className="border-t border-slate-500 pt-6 flex flex-col md:flex-row justify-between items-center text-sm"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <motion.p 
            className="text-gray-400"
            whileHover={{ color: "#ffffff" }}
            transition={{ duration: 0.3 }}
          >
            © 2024 Modern Scene (PVT) Limited. All Rights Reserved.
          </motion.p>
          <motion.p 
            className="text-gray-400 mt-2 md:mt-0"
            whileHover={{ color: "#ffffff" }}
            transition={{ duration: 0.3 }}
          >
            Website by MS Adx Digital Services
          </motion.p>
        </motion.div>

        {/* Decorative floating elements */}
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
          className="absolute top-20 right-20 w-4 h-4 bg-white/10 rounded-full blur-sm"
        />
        
        <motion.div
          animate={{ 
            y: [0, 15, 0],
            rotate: [0, -8, 0],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ 
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
          className="absolute bottom-20 left-16 w-3 h-3 bg-white/5 rounded-full blur-sm"
        />

        {/* Animated line divider */}
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={inView ? { width: "100%", opacity: 0.2 } : { width: 0, opacity: 0 }}
          transition={{ duration: 1.5, delay: 1 }}
          className="absolute bottom-0 left-0 h-px bg-gradient-to-r from-transparent via-white to-transparent"
        />
      </div>
    </footer>
  );
}