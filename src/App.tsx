import React, { useState } from 'react';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Label } from './components/ui/label';
import { Card, CardHeader, CardTitle, CardContent } from './components/ui/card';
import { AdminPanel } from './components/AdminPanel';
import { MainWebsite } from './components/MainWebsite';
import { toast, Toaster } from 'sonner@2.0.3';

// User data interface
export interface UserData {
  username: string;
  password: string;
  avatar: string;
  displayName: string;
}

// Mock data structure for the website content
export interface WebsiteData {
  heroImages: string[];
  recentWeddings: {
    [key: string]: string[];
  };
  amazingWork: {
    [key: string]: string[];
  };
  testimonials: {
    name: string;
    text: string;
    rating: number;
  }[];
}

// Initial user data
export const initialUserData: UserData = {
  username: 'admin',
  password: 'admin',
  avatar: 'https://images.unsplash.com/photo-1701463387028-3947648f1337?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBhdmF0YXIlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NTgzOTAzMTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  displayName: 'Administrator'
};

export const initialData: WebsiteData = {
  heroImages: [
    "https://images.unsplash.com/photo-1677677402907-05f2883e3f66?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwY2VyZW1vbnklMjBvdXRkb29yfGVufDF8fHx8MTc1ODM3MzY1OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1606217239566-1c893c2e110e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwYnJpZGUlMjBncm9vbSUyMHBvcnRyYWl0fGVufDF8fHx8MTc1ODM3MzY2Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1714972383570-44ddc9738355?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwcmVjZXB0aW9uJTIwZGFuY2V8ZW58MXx8fHwxNzU4MzczNjY1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  ],
  recentWeddings: {
    'Sarah & John': [
      "https://images.unsplash.com/photo-1664312696723-173130983e27?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwZmxvd2VycyUyMGJvdXF1ZXR8ZW58MXx8fHwxNzU4MzA4MTQzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1631225866082-8150132a7473?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwcmluZ3MlMjBkZXRhaWx8ZW58MXx8fHwxNzU4MzczNjcxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1694781064767-cacff9156dfc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwZGVjb3IlMjB0YWJsZSUyMHNldHRpbmd8ZW58MXx8fHwxNzU4MzczNjc0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    ],
    'Emily & David': [
      "https://images.unsplash.com/photo-1677677402907-05f2883e3f66?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwY2VyZW1vbnklMjBvdXRkb29yfGVufDF8fHx8MTc1ODM3MzY1OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1606217239566-1c893c2e110e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwYnJpZGUlMjBncm9vbSUyMHBvcnRyYWl0fGVufDF8fHx8MTc1ODM3MzY2Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1714972383570-44ddc9738355?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwcmVjZXB0aW9uJTIwZGFuY2V8ZW58MXx8fHwxNzU4MzczNjY1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    ],
    'Lisa & Michael': [
      "https://images.unsplash.com/photo-1664312696723-173130983e27?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwZmxvd2VycyUyMGJvdXF1ZXR8ZW58MXx8fHwxNzU4MzA4MTQzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1631225866082-8150132a7473?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwcmluZ3MlMjBkZXRhaWx8ZW58MXx8fHwxNzU4MzczNjcxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1694781064767-cacff9156dfc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwZGVjb3IlMjB0YWJsZSUyMHNldHRpbmd8ZW58MXx8fHwxNzU4MzczNjc0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    ]
  },
  amazingWork: {
    'Ceremony': [
      "https://images.unsplash.com/photo-1677677402907-05f2883e3f66?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwY2VyZW1vbnklMjBvdXRkb29yfGVufDF8fHx8MTc1ODM3MzY1OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1606217239566-1c893c2e110e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwYnJpZGUlMjBncm9vbSUyMHBvcnRyYWl0fGVufDF8fHx8MTc1ODM3MzY2Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1714972383570-44ddc9738355?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwcmVjZXB0aW9uJTIwZGFuY2V8ZW58MXx8fHwxNzU4MzczNjY1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1664312696723-173130983e27?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwZmxvd2VycyUyMGJvdXF1ZXR8ZW58MXx8fHwxNzU4MzA4MTQzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    ],
    'Reception': [
      "https://images.unsplash.com/photo-1714972383570-44ddc9738355?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwcmVjZXB0aW9uJTIwZGFuY2V8ZW58MXx8fHwxNzU4MzczNjY1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1694781064767-cacff9156dfc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwZGVjb3IlMjB0YWJsZSUyMHNldHRpbmd8ZW58MXx8fHwxNzU4MzczNjc0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1631225866082-8150132a7473?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwcmluZ3MlMjBkZXRhaWx8ZW58MXx8fHwxNzU4MzczNjcxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1677677402907-05f2883e3f66?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwY2VyZW1vbnklMjBvdXRkb29yfGVufDF8fHx8MTc1ODM3MzY1OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    ],
    'Details': [
      "https://images.unsplash.com/photo-1631225866082-8150132a7473?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwcmluZ3MlMjBkZXRhaWx8ZW58MXx8fHwxNzU4MzczNjcxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1664312696723-173130983e27?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwZmxvd2VycyUyMGJvdXF1ZXR8ZW58MXx8fHwxNzU4MzA4MTQzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1694781064767-cacff9156dfc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwZGVjb3IlMjB0YWJsZSUyMHNldHRpbmd8ZW58MXx8fHwxNzU4MzczNjc0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1606217239566-1c893c2e110e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwYnJpZGUlMjBncm9vbSUyMHBvcnRyYWl0fGVufDF8fHx8MTc1ODM3MzY2Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    ]
  },
  testimonials: [
    {
      name: "Sarah & John",
      text: "Modern Scene captured our special day perfectly! The photos are absolutely stunning and we couldn't be happier with the results. They made us feel so comfortable throughout the entire process.",
      rating: 5
    },
    {
      name: "Emily & David",
      text: "Professional, creative, and so easy to work with. The team at Modern Scene went above and beyond to make sure every moment was captured beautifully. Highly recommend!",
      rating: 5
    },
    {
      name: "Lisa & Michael",
      text: "From engagement photos to the wedding day, Modern Scene delivered exceptional quality. Their attention to detail and artistic vision is unmatched. Thank you for preserving our memories!",
      rating: 5
    }
  ]
};

type ViewState = 'website' | 'login' | 'admin';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewState>('website');
  const [websiteData, setWebsiteData] = useState<WebsiteData>(initialData);
  const [userData, setUserData] = useState<UserData>(initialUserData);
  const [loginCredentials, setLoginCredentials] = useState({ username: '', password: '' });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);

  const handleAdminLogin = () => {
    setCurrentView('login');
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginCredentials.username === userData.username && loginCredentials.password === userData.password) {
      setIsLoggedIn(true);
      setCurrentView('admin');
      setCurrentUser(userData);
      toast.success('Successfully logged in!');
    } else {
      toast.error('Invalid credentials. Please check your username and password.');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentView('website');
    setCurrentUser(null);
    setLoginCredentials({ username: '', password: '' });
    toast.success('Successfully logged out!');
  };

  const updateWebsiteData = (newData: WebsiteData) => {
    setWebsiteData(newData);
    toast.success('Website content updated successfully!');
  };

  const updateUserData = (newUserData: UserData) => {
    setUserData(newUserData);
    setCurrentUser(newUserData);
    toast.success('User profile updated successfully!');
  };

  if (currentView === 'website') {
    return (
      <>
        <MainWebsite 
          data={websiteData}
          onAdminLogin={handleAdminLogin}
        />
        <Toaster position="top-right" />
      </>
    );
  }

  if (currentView === 'login') {
    return (
      <>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Modern Scene Admin</CardTitle>
              <p className="text-muted-foreground">Enter your credentials to access the admin panel</p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    type="text"
                    value={loginCredentials.username}
                    onChange={(e) => setLoginCredentials(prev => ({ ...prev, username: e.target.value }))}
                    placeholder="Enter username"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={loginCredentials.password}
                    onChange={(e) => setLoginCredentials(prev => ({ ...prev, password: e.target.value }))}
                    placeholder="Enter password"
                    required
                  />
                </div>
                <Button type="submit" className="w-full">Login to Admin Panel</Button>
              </form>
              <div className="mt-4 p-3 bg-blue-50 rounded-lg text-sm text-blue-700">
                <p><strong>Demo Credentials:</strong></p>
                <p>Username: admin</p>
                <p>Password: admin</p>
              </div>
            </CardContent>
          </Card>
        </div>
        <Toaster position="top-right" />
      </>
    );
  }

  if (currentView === 'admin' && isLoggedIn) {
    return (
      <>
        <AdminPanel 
          websiteData={websiteData}
          onUpdateData={updateWebsiteData}
          userData={userData}
          onUpdateUserData={updateUserData}
          currentUser={currentUser}
          onLogout={handleLogout}
        />
        <Toaster position="top-right" />
      </>
    );
  }

  // Fallback to login if somehow in an invalid state
  return (
    <>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Access Denied</CardTitle>
            <p className="text-muted-foreground">Please log in to access the admin panel</p>
          </CardHeader>
          <CardContent>
            <Button onClick={() => setCurrentView('login')} className="w-full">
              Go to Login
            </Button>
          </CardContent>
        </Card>
      </div>
      <Toaster position="top-right" />
    </>
  );
}