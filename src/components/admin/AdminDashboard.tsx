import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { useAdmin } from '../../contexts/AdminContext';
import { 
  LogOut, 
  Settings, 
  Image, 
  Camera, 
  Star, 
  Users,
  Home,
  Palette,
  MessageSquare
} from 'lucide-react';
import { HeroImageManager } from './HeroImageManager';
import { PortfolioImageManager } from './PortfolioImageManager';
import { AmazingWorkImageManager } from './AmazingWorkImageManager';
import { TestimonialManager } from './TestimonialManager';
import { CredentialsManager } from './CredentialsManager';

export function AdminDashboard() {
  const { logout, adminData } = useAdmin();
  const [activeTab, setActiveTab] = useState('hero');

  const handleLogout = () => {
    logout();
  };

  const stats = [
    {
      title: 'Hero Images',
      value: adminData.heroImages.length,
      icon: Home,
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Portfolio Images',
      value: Object.values(adminData.portfolioImages).reduce((acc, arr) => acc + arr.length, 0),
      icon: Camera,
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Amazing Work Images',
      value: Object.values(adminData.amazingWorkImages).reduce((acc, arr) => acc + arr.length, 0),
      icon: Palette,
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Testimonials',
      value: adminData.testimonials.length,
      icon: MessageSquare,
      color: 'from-amber-500 to-amber-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-2xl text-gray-900" style={{ fontFamily: 'Lovalina Free' }}>
                Admin Dashboard
              </h1>
              <p className="text-gray-600 text-sm">Modern Scene Wedding Photography</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3"
            >
              <Button
                onClick={handleLogout}
                variant="outline"
                className="flex items-center gap-2 hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-all duration-300"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </motion.div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.02, y: -2 }}
                className="group"
              >
                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <CardContent className="p-6 relative">
                    <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                    <div className="flex items-center justify-between relative z-10">
                      <div>
                        <p className="text-gray-600 text-sm font-medium">{stat.title}</p>
                        <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
                      </div>
                      <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card className="border-0 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-gray-900 to-gray-800 text-white">
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Content Management
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-5 bg-gray-50 p-1 m-0 rounded-none">
                  <TabsTrigger 
                    value="hero" 
                    className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm"
                  >
                    <Home className="w-4 h-4" />
                    <span className="hidden sm:inline">Hero</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="portfolio" 
                    className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm"
                  >
                    <Camera className="w-4 h-4" />
                    <span className="hidden sm:inline">Portfolio</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="amazing-work" 
                    className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm"
                  >
                    <Palette className="w-4 h-4" />
                    <span className="hidden sm:inline">Amazing Work</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="testimonials" 
                    className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span className="hidden sm:inline">Testimonials</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="settings" 
                    className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm"
                  >
                    <Settings className="w-4 h-4" />
                    <span className="hidden sm:inline">Settings</span>
                  </TabsTrigger>
                </TabsList>

                <div className="p-6">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <TabsContent value="hero" className="mt-0">
                        <HeroImageManager />
                      </TabsContent>

                      <TabsContent value="portfolio" className="mt-0">
                        <PortfolioImageManager />
                      </TabsContent>

                      <TabsContent value="amazing-work" className="mt-0">
                        <AmazingWorkImageManager />
                      </TabsContent>

                      <TabsContent value="testimonials" className="mt-0">
                        <TestimonialManager />
                      </TabsContent>

                      <TabsContent value="settings" className="mt-0">
                        <CredentialsManager />
                      </TabsContent>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}