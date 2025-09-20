import { motion } from "motion/react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Card, CardContent } from "./ui/card";
import { useInView } from "../hooks/useInView";

export function Contact() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const contactInfo = [
    {
      icon: MapPin,
      title: "Studio Location",
      details: "50A,1/1 Airport Road, Minuwangoda 11550"
    },
    {
      icon: Phone,
      title: "Phone",
      details: "0774890840"
    },
    {
      icon: Mail,
      title: "Email",
      details: "info@modernscene.lk"
    },
    {
      icon: Clock,
      title: "Hours",
      details: "8 AM–6 PM"
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

  const formVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const ContactInfoCard = ({ info, index }: { info: any; index: number }) => {
    const IconComponent = info.icon;
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        animate={inView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.9 }}
        transition={{ duration: 0.5, delay: index * 0.1 + 0.8 }}
        whileHover={{ 
          scale: 1.02,
          y: -5,
          transition: { duration: 0.3 }
        }}
      >
        <Card className="border-0 shadow-md hover:shadow-xl transition-all duration-300 group">
          <CardContent className="p-6 flex items-center space-x-4">
            <motion.div 
              className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-gray-200 transition-colors duration-300"
              whileHover={{ 
                rotate: 360,
                scale: 1.1
              }}
              transition={{ duration: 0.5 }}
            >
              <IconComponent className="w-6 h-6 text-gray-700" />
            </motion.div>
            <div>
              <motion.h4 
                className="text-gray-900 mb-1 group-hover:text-gray-700 transition-colors duration-300"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                {info.title}
              </motion.h4>
              <p className="text-gray-600">{info.details}</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  };

  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      {/* Clean gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-gray-100"></div>
      
      {/* Modern grid pattern */}
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.01) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.01) 1px, transparent 1px)`,
        backgroundSize: '50px 50px'
      }}></div>
      
      {/* Minimalist floating shapes */}
      <motion.div
        animate={{ 
          x: [0, 45, 0],
          y: [0, -25, 0],
          rotate: [0, 8, 0]
        }}
        transition={{ 
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-32 right-1/4 w-20 h-20 bg-gradient-to-br from-slate-200/50 to-gray-200/50 rounded-full blur-xl"
      />
      
      <motion.div
        animate={{ 
          x: [0, -30, 0],
          y: [0, 18, 0],
          rotate: [0, -6, 0]
        }}
        transition={{ 
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 5
        }}
        className="absolute bottom-40 left-1/5 w-24 h-24 bg-gradient-to-tl from-blue-100/40 to-slate-100/40 rounded-full blur-2xl"
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
              Get
            </motion.span>
            {" "}
            <motion.span
              initial={{ opacity: 0, rotateY: -90 }}
              animate={inView ? { opacity: 1, rotateY: 0 } : { opacity: 0, rotateY: -90 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="inline-block"
            >
              In
            </motion.span>
            {" "}
            <motion.span
              initial={{ opacity: 0, rotateY: -90 }}
              animate={inView ? { opacity: 1, rotateY: 0 } : { opacity: 0, rotateY: -90 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="inline-block bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent"
            >
              Touch
            </motion.span>
          </motion.h2>

          <motion.p
            variants={headerVariants}
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            Ready to capture your love story? We'd love to hear about your wedding vision and discuss how we can create beautiful memories together.
          </motion.p>

          {/* Decorative line animation */}
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={inView ? { width: 100, opacity: 1 } : { width: 0, opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="h-0.5 bg-gradient-to-r from-transparent via-gray-400 to-transparent mx-auto mt-8"
          />
        </motion.div>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid lg:grid-cols-2 gap-16"
        >
          {/* Animated Contact Form */}
          <motion.div variants={formVariants}>
            <motion.h3 
              className="text-2xl mb-8 text-gray-900" 
              style={{ fontFamily: 'Lovalina Free' }}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Send us a message
            </motion.h3>
            
            <motion.form 
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <motion.div 
                className="grid md:grid-cols-2 gap-6"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <motion.div
                  whileFocus={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <label htmlFor="firstName" className="block text-sm text-gray-700 mb-2">
                    First Name
                  </label>
                  <Input id="firstName" placeholder="Your first name" />
                </motion.div>
                <motion.div
                  whileFocus={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <label htmlFor="lastName" className="block text-sm text-gray-700 mb-2">
                    Last Name
                  </label>
                  <Input id="lastName" placeholder="Your last name" />
                </motion.div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                whileFocus={{ scale: 1.02 }}
              >
                <label htmlFor="email" className="block text-sm text-gray-700 mb-2">
                  Email
                </label>
                <Input id="email" type="email" placeholder="your.email@example.com" />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                whileFocus={{ scale: 1.02 }}
              >
                <label htmlFor="phone" className="block text-sm text-gray-700 mb-2">
                  Phone
                </label>
                <Input id="phone" type="tel" placeholder="(555) 123-4567" />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 1 }}
                whileFocus={{ scale: 1.02 }}
              >
                <label htmlFor="weddingDate" className="block text-sm text-gray-700 mb-2">
                  Wedding Date
                </label>
                <Input id="weddingDate" type="date" />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 1.1 }}
                whileFocus={{ scale: 1.02 }}
              >
                <label htmlFor="message" className="block text-sm text-gray-700 mb-2">
                  Message
                </label>
                <Textarea 
                  id="message" 
                  placeholder="Tell us about your dream wedding..."
                  rows={6}
                />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button 
                  className="w-full bg-gray-900 text-white hover:bg-gray-800 py-3 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Send Message
                </Button>
              </motion.div>
            </motion.form>
          </motion.div>
          
          {/* Animated Contact Information */}
          <motion.div variants={cardVariants}>
            <motion.h3 
              className="text-2xl mb-8 text-gray-900" 
              style={{ fontFamily: 'Lovalina Free' }}
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Contact Information
            </motion.h3>
            
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <ContactInfoCard key={index} info={info} index={index} />
              ))}
            </div>
          </motion.div>
        </motion.div>
        
        {/* Animated Google Maps Section */}
        <motion.div 
          className="mt-20"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          <motion.div className="text-center mb-8">
            <motion.h3 
              className="text-2xl mb-4 text-gray-900" 
              style={{ fontFamily: 'Lovalina Free' }}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 1.6 }}
            >
              Visit Our Studio
            </motion.h3>
            <motion.p 
              className="text-gray-600"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 1.7 }}
            >
              Find us at our studio location in Minuwangoda
            </motion.p>
          </motion.div>
          
          <motion.div 
            className="w-full h-96 rounded-lg overflow-hidden shadow-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.8, delay: 1.8 }}
            whileHover={{ scale: 1.02 }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3958.123456789!2d79.98123456789!3d7.23456789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2efabcdef1234%3A0x1234567890abcdef!2s50A%2C%201%2F1%20Airport%20Rd%2C%20Minuwangoda%2011550!5e0!3m2!1sen!2slk!4v1234567890123!5m2!1sen!2slk"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Modern Scene Wedding Photography Studio Location"
            />
          </motion.div>
        </motion.div>

        {/* Background floating elements */}
        <motion.div
          animate={{ 
            y: [0, -18, 0],
            rotate: [0, 12, 0],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-40 right-20 w-5 h-5 bg-gray-300 rounded-full blur-sm opacity-20"
        />
        
        <motion.div
          animate={{ 
            y: [0, 22, 0],
            rotate: [0, -10, 0],
            opacity: [0.1, 0.25, 0.1]
          }}
          transition={{ 
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4
          }}
          className="absolute bottom-60 left-16 w-3 h-3 bg-gray-400 rounded-full blur-sm opacity-20"
        />
      </div>
    </section>
  );
}