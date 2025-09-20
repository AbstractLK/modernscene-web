import React, { createContext, useContext, useState, useEffect } from 'react';
import { AdminUser, AdminData } from '../types/admin';

interface AdminContextType {
  isAuthenticated: boolean;
  adminData: AdminData;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  updateAdminData: (data: Partial<AdminData>) => void;
  updateCredentials: (username: string, password: string) => void;
  adminUser: AdminUser;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

const defaultAdminData: AdminData = {
  heroImages: [
    {
      id: '1',
      src: "https://images.unsplash.com/photo-1749731894795-4eae105fa60a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwYnJpZGUlMjBncm9vbSUyMHdlZGRpbmclMjBjZXJlbW9ueXxlbnwxfHx8fDE3NTgyMTc0MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      alt: "Elegant wedding ceremony",
      title: "Elegant Ceremonies",
      subtitle: "Capturing sacred moments"
    },
    {
      id: '2',
      src: "https://images.unsplash.com/photo-1625415002553-f23e2d1c05a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxyb21hbnRpYyUyMHdlZGRpbmclMjBjb3VwbGUlMjBvdXRkb29yJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzU4MjE3NDI5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      alt: "Romantic wedding couple outdoor portrait",
      title: "Romantic Portraits",
      subtitle: "Love in every frame"
    },
    {
      id: '3',
      src: "https://images.unsplash.com/photo-1652492892191-487055a9b6bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHx3ZWRkaW5nJTIwcmVjZXB0aW9uJTIwY2VsZWJyYXRpb24lMjBkYW5jaW5nfGVufDF8fHx8MTc1ODIxNzQzMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      alt: "Wedding reception celebration",
      title: "Joyful Celebrations",
      subtitle: "Dancing through forever"
    },
    {
      id: '4',
      src: "https://images.unsplash.com/photo-1748203187699-4b97a1ef8698?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHx3ZWRkaW5nJTIwcmluZyUyMGNlcmVtb255JTIwaW50aW1hdGUlMjBtb21lbnR8ZW58MXx8fHwxNzU4MjE3NDM0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      alt: "Wedding ring ceremony",
      title: "Intimate Moments",
      subtitle: "Details that matter"
    },
    {
      id: '5',
      src: "https://images.unsplash.com/photo-1549871630-740049f93554?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHx3ZWRkaW5nJTIwYm91cXVldCUyMGJlYXV0aWZ1bCUyMGZsb3dlcnMlMjBicmlkZXxlbnwxfHx8fDE3NTgyMTc0Mzd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      alt: "Wedding bouquet",
      title: "Beautiful Details",
      subtitle: "Artistry in bloom"
    }
  ],
  portfolioImages: {
    weddings: [
      {
        id: '1',
        src: "https://images.unsplash.com/photo-1749301071652-3928dbd4abb9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwd2VkZGluZyUyMGNlcmVtb255JTIwb3V0ZG9vcnxlbnwxfHx8fDE3NTgxOTQyNzB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        alt: "Elegant wedding ceremony",
        title: "Sarah & Michael",
        location: "Weddings",
        description: "Romantic vineyard wedding with garden-inspired florals"
      }
    ],
    homecoming: [
      {
        id: '2',
        src: "https://images.unsplash.com/photo-1606217239566-1c893c2e110e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmlkZSUyMGdyb29tJTIwd2VkZGluZyUyMHBvcnRyYWl0fGVufDF8fHx8MTc1ODE5NDI3M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        alt: "Wedding couple portrait",
        title: "Emma & James",
        location: "Homecoming",
        description: "Elegant ballroom reception with classic styling"
      }
    ],
    casualShoots: [
      {
        id: '3',
        src: "https://images.unsplash.com/photo-1738669469338-801b4e9dbccf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHx3ZWRkaW5nJTIwcmVjZXB0aW9uJTIwcm9tYW50aWMlMjBsaWdodGluZ3xlbnwxfHx8fDE3NTgxOTQyNzV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        alt: "Romantic wedding reception",
        title: "Lisa & David",
        location: "Casual Shoots",
        description: "Intimate ceremony with tropical floral arrangements"
      }
    ],
    engagements: [],
    cinematography: [],
    thanksCards: [
      {
        id: '4',
        src: "https://images.unsplash.com/photo-1684244276932-6ae853774c4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHx3ZWRkaW5nJTIwYm91cXVldCUyMHJpbmdzJTIwZGV0YWlsc3xlbnwxfHx8fDE3NTgxOTQyNzh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        alt: "Wedding details",
        title: "Anna & Chris",
        location: "Thanks Cards & Enlargements",
        description: "Outdoor ceremony surrounded by natural beauty"
      }
    ]
  },
  amazingWorkImages: {
    fineArt: [
      {
        id: '1',
        src: "https://images.unsplash.com/photo-1752392253470-0e5a322e66f9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwY291cGxlJTIwaW50aW1hdGUlMjBtb21lbnR8ZW58MXx8fHwxNzU4MTIxOTExfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        alt: "Intimate wedding moment",
        className: "row-span-2"
      }
    ],
    artistic: [
      {
        id: '2',
        src: "https://images.unsplash.com/photo-1547697932-14a499b46a2e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmlkZSUyMHBvcnRyYWl0JTIwdmVpbCUyMGFydGlzdGljfGVufDF8fHx8MTc1ODEyMTkxM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        alt: "Artistic bride portrait with veil",
        className: "row-span-1"
      }
    ],
    vintage: [
      {
        id: '3',
        src: "https://images.unsplash.com/photo-1660294502608-d65e5c62f244?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHx3ZWRkaW5nJTIwY291cGxlJTIwZ29sZGVuJTIwaG91cnxlbnwxfHx8fDE3NTgxMjE5MTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        alt: "Golden hour wedding couple",
        className: "row-span-2"
      }
    ]
  },
  testimonials: [
    {
      id: '1',
      name: "Sarah & Michael",
      location: "Napa Valley",
      text: "Modern Scene captured our wedding day beautifully! Every photo tells a story, and their artistic vision exceeded our expectations. We're so grateful for these timeless memories.",
      rating: 5
    },
    {
      id: '2',
      name: "Emma & James",
      location: "San Francisco", 
      text: "From engagement photos to our wedding day, Modern Scene was incredible. Their modern style and attention to detail made us feel so comfortable, and the results are absolutely stunning.",
      rating: 5
    },
    {
      id: '3',
      name: "Lisa & David",
      location: "Carmel",
      text: "We couldn't be happier with our wedding photography! Modern Scene perfectly captured the romance and joy of our special day. Every image is a work of art that we'll treasure forever.",
      rating: 5
    }
  ]
};

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminData, setAdminData] = useState<AdminData>(defaultAdminData);
  const [adminUser, setAdminUser] = useState<AdminUser>({ username: 'admin', password: 'admin' });

  useEffect(() => {
    // Load data from localStorage on mount
    const savedAuth = localStorage.getItem('adminAuth');
    const savedData = localStorage.getItem('adminData');
    const savedUser = localStorage.getItem('adminUser');

    if (savedAuth === 'true') {
      setIsAuthenticated(true);
    }

    if (savedData) {
      try {
        setAdminData(JSON.parse(savedData));
      } catch (error) {
        console.error('Error loading admin data:', error);
      }
    }

    if (savedUser) {
      try {
        setAdminUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error loading admin user:', error);
      }
    }
  }, []);

  const login = (username: string, password: string): boolean => {
    if (username === adminUser.username && password === adminUser.password) {
      setIsAuthenticated(true);
      localStorage.setItem('adminAuth', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('adminAuth');
  };

  const updateAdminData = (data: Partial<AdminData>) => {
    const newData = { ...adminData, ...data };
    setAdminData(newData);
    localStorage.setItem('adminData', JSON.stringify(newData));
  };

  const updateCredentials = (username: string, password: string) => {
    const newUser = { username, password };
    setAdminUser(newUser);
    localStorage.setItem('adminUser', JSON.stringify(newUser));
  };

  return (
    <AdminContext.Provider value={{
      isAuthenticated,
      adminData,
      login,
      logout,
      updateAdminData,
      updateCredentials,
      adminUser
    }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}