import React, { useState, useMemo, useCallback } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Separator } from './ui/separator';
import { Badge } from './ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from './ui/dropdown-menu';
import { ImageUpload } from './ImageUpload';
import { AvatarUpload } from './AvatarUpload';
import { WebsiteData, UserData } from '../App';
import { 
  LogOut, 
  Eye, 
  Image, 
  MessageSquare, 
  Settings, 
  Plus, 
  Trash2, 
  Save,
  Star,
  User,
  ChevronDown,
  Lock,
  Camera,
  X
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface AdminPanelProps {
  websiteData: WebsiteData;
  onUpdateData: (data: WebsiteData) => void;
  userData: UserData;
  onUpdateUserData: (data: UserData) => void;
  currentUser: UserData | null;
  onLogout: () => void;
}

export function AdminPanel({ websiteData, onUpdateData, userData, onUpdateUserData, currentUser, onLogout }: AdminPanelProps) {
  const [data, setData] = useState<WebsiteData>(websiteData);
  const [userFormData, setUserFormData] = useState<UserData>(userData);
  const [newTabName, setNewTabName] = useState('');
  const [showProfileSettings, setShowProfileSettings] = useState(false);

  // Memoize reversed testimonials to prevent recreation on every render
  const reversedTestimonials = useMemo(() => {
    return data.testimonials.slice().reverse();
  }, [data.testimonials]);

  const handleSave = useCallback(() => {
    onUpdateData(data);
  }, [data, onUpdateData]);

  const handleUserUpdate = useCallback(() => {
    onUpdateUserData(userFormData);
  }, [userFormData, onUpdateUserData]);

  const updateUserField = useCallback((field: keyof UserData, value: string) => {
    setUserFormData(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);

  const openProfileSettings = () => {
    setShowProfileSettings(true);
  };

  const closeProfileSettings = () => {
    setShowProfileSettings(false);
  };

  const addHeroImage = (imageUrl: string) => {
    setData(prev => ({
      ...prev,
      heroImages: [...prev.heroImages, imageUrl]
    }));
  };

  const removeHeroImage = (index: number) => {
    setData(prev => ({
      ...prev,
      heroImages: prev.heroImages.filter((_, i) => i !== index)
    }));
    toast.success('Hero image removed successfully!');
  };

  const addNewTab = (section: 'recentWeddings' | 'amazingWork') => {
    if (newTabName.trim()) {
      setData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [newTabName.trim()]: []
        }
      }));
      setNewTabName('');
      toast.success('New tab added successfully!');
    }
  };

  const removeTab = (section: 'recentWeddings' | 'amazingWork', tabName: string) => {
    setData(prev => {
      const newSection = { ...prev[section] };
      delete newSection[tabName];
      return {
        ...prev,
        [section]: newSection
      };
    });
    toast.success('Tab removed successfully!');
  };

  const addImageToTab = (section: 'recentWeddings' | 'amazingWork', tabName: string, imageUrl: string) => {
    setData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [tabName]: [...prev[section][tabName], imageUrl]
      }
    }));
  };

  const removeImageFromTab = (section: 'recentWeddings' | 'amazingWork', tabName: string, imageIndex: number) => {
    setData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [tabName]: prev[section][tabName].filter((_, i) => i !== imageIndex)
      }
    }));
    toast.success('Image removed from tab successfully!');
  };

  const updateTestimonial = (index: number, field: 'name' | 'text' | 'rating', value: string | number) => {
    setData(prev => ({
      ...prev,
      testimonials: prev.testimonials.map((testimonial, i) => 
        i === index ? { ...testimonial, [field]: value } : testimonial
      )
    }));
  };

  const addTestimonial = () => {
    setData(prev => ({
      ...prev,
      testimonials: [...prev.testimonials, { name: '', text: '', rating: 5 }]
    }));
    toast.success('New testimonial added!');
  };

  const removeTestimonial = (index: number) => {
    setData(prev => ({
      ...prev,
      testimonials: prev.testimonials.filter((_, i) => i !== index)
    }));
    toast.success('Testimonial removed!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Settings className="h-6 w-6 sm:h-8 sm:w-8 text-gray-800" />
              <span className="text-lg sm:text-xl font-semibold text-gray-800 truncate">Modern Scene Admin</span>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Button onClick={handleSave} className="flex items-center gap-1 sm:gap-2 text-sm sm:text-base px-2 sm:px-4">
                <Save className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Save Changes</span>
                <span className="sm:hidden">Save</span>
              </Button>
              
              {/* User Profile Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-1 sm:gap-2 p-1 sm:p-2 rounded-md hover:bg-gray-100 transition-colors">
                    <Avatar className="h-6 w-6 sm:h-8 sm:w-8">
                      <AvatarImage src={currentUser?.avatar} alt={currentUser?.displayName} />
                      <AvatarFallback className="text-xs sm:text-sm">
                        {currentUser?.displayName?.charAt(0) || 'A'}
                      </AvatarFallback>
                    </Avatar>
                    <div className="hidden sm:flex flex-col items-start text-sm">
                      <span className="font-medium">{currentUser?.displayName}</span>
                      <span className="text-xs text-muted-foreground">@{currentUser?.username}</span>
                    </div>
                    <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 sm:w-56">
                  <DropdownMenuItem onClick={openProfileSettings} className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Profile Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={onLogout} className="flex items-center gap-2 text-red-600">
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content or Profile Settings */}
      {showProfileSettings ? (
        /* Profile Settings Overlay */
        <div className="min-h-screen bg-gray-50">
          {/* Profile Settings Header */}
          <div className="bg-white shadow-sm border-b">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-14 sm:h-16">
                <div className="flex items-center space-x-2">
                  <User className="h-6 w-6 sm:h-8 sm:w-8 text-gray-800" />
                  <span className="text-lg sm:text-xl font-semibold text-gray-800">Profile Settings</span>
                </div>
                <Button variant="outline" onClick={closeProfileSettings} className="flex items-center gap-1 sm:gap-2 text-sm sm:text-base px-2 sm:px-4">
                  <X className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="hidden sm:inline">Back to Admin Panel</span>
                  <span className="sm:hidden">Back</span>
                </Button>
              </div>
            </div>
          </div>

          {/* Profile Settings Content */}
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
            <div className="grid gap-4 sm:gap-6">
              {/* Profile Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                    <User className="h-4 w-4 sm:h-5 sm:w-5" />
                    Profile Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 sm:space-y-6">
                  <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                    <div className="relative group cursor-pointer" onClick={() => document.getElementById('avatar-file-input')?.click()}>
                      <Avatar className="h-16 w-16 sm:h-20 sm:w-20 transition-all duration-200 group-hover:opacity-80">
                        <AvatarImage src={userFormData.avatar} alt={userFormData.displayName} />
                        <AvatarFallback className="text-lg">
                          {userFormData.displayName?.charAt(0) || 'A'}
                        </AvatarFallback>
                      </Avatar>
                      <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <Camera className="h-6 w-6 text-white" />
                      </div>
                      <input
                        id="avatar-file-input"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onload = (event) => {
                              if (event.target?.result) {
                                updateUserField('avatar', event.target.result as string);
                                toast.success('Avatar updated successfully!');
                              }
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                    </div>
                    <div className="space-y-1 sm:space-y-2 text-center sm:text-left">
                      <h3 className="text-lg font-medium">{userFormData.displayName}</h3>
                      <p className="text-sm text-muted-foreground">@{userFormData.username}</p>
                      <p className="text-xs text-gray-500">Click avatar to change</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="displayName">Display Name</Label>
                      <Input
                        id="displayName"
                        value={userFormData.displayName}
                        onChange={(e) => updateUserField('displayName', e.target.value)}
                        placeholder="Enter display name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <Input
                        id="username"
                        value={userFormData.username}
                        onChange={(e) => updateUserField('username', e.target.value)}
                        placeholder="Enter username"
                      />
                    </div>
                  </div>
                  

                </CardContent>
              </Card>

              {/* Security Settings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                    <Lock className="h-4 w-4 sm:h-5 sm:w-5" />
                    Security Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 sm:space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input
                      id="currentPassword"
                      type="password"
                      placeholder="Enter current password"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input
                        id="newPassword"
                        type="password"
                        value={userFormData.password}
                        onChange={(e) => updateUserField('password', e.target.value)}
                        placeholder="Enter new password"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="Confirm new password"
                      />
                    </div>
                  </div>
                  
                  <div className="p-3 sm:p-4 bg-blue-50 rounded-lg text-xs sm:text-sm text-blue-700">
                    <div className="flex items-start gap-2">
                      <Lock className="h-3 w-3 sm:h-4 sm:w-4 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Password Requirements:</p>
                        <ul className="mt-1 list-disc list-inside text-xs space-y-1">
                          <li>At least 8 characters long</li>
                          <li>Include uppercase and lowercase letters</li>
                          <li>Include at least one number</li>
                          <li>Include at least one special character</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Save Changes */}
              <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-4">
                <Button variant="outline" onClick={() => setUserFormData(userData)} className="order-2 sm:order-1">
                  Reset Changes
                </Button>
                <Button onClick={handleUserUpdate} className="flex items-center gap-2 order-1 sm:order-2">
                  <Save className="h-4 w-4" />
                  Update Profile
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Main Admin Panel Content */
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
          <Tabs defaultValue="hero" className="w-full">
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 mb-6 sm:mb-8">
              <TabsTrigger value="hero" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm p-2 sm:p-3">
                <Image className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden xs:inline">Hero Images</span>
                <span className="xs:hidden">Hero</span>
              </TabsTrigger>
              <TabsTrigger value="weddings" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm p-2 sm:p-3">
                <Image className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden xs:inline">Recent Weddings</span>
                <span className="xs:hidden">Weddings</span>
              </TabsTrigger>
              <TabsTrigger value="work" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm p-2 sm:p-3">
                <Image className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden xs:inline">Amazing Work</span>
                <span className="xs:hidden">Work</span>
              </TabsTrigger>
              <TabsTrigger value="testimonials" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm p-2 sm:p-3">
                <MessageSquare className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden xs:inline">Testimonials</span>
                <span className="xs:hidden">Reviews</span>
              </TabsTrigger>
            </TabsList>

            {/* Hero Images Management */}
            <TabsContent value="hero">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg sm:text-xl">Hero Section Carousel Images</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 sm:space-y-6">
                  <ImageUpload
                    onImageAdd={addHeroImage}
                    placeholder="Enter hero image URL"
                    className="mb-6"
                  />
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {data.heroImages.map((image, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={image}
                          alt={`Hero image ${index + 1}`}
                          className="w-full h-48 object-cover rounded-lg"
                        />
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => removeHeroImage(index)}
                          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                        <Badge className="absolute bottom-2 left-2">
                          Image {index + 1}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Recent Weddings Management */}
            <TabsContent value="weddings">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg sm:text-xl">Recent Weddings Section</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 sm:space-y-6">
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                    <Input
                      placeholder="Enter new tab name (e.g., 'Anna & Mark')"
                      value={newTabName}
                      onChange={(e) => setNewTabName(e.target.value)}
                      className="flex-1"
                    />
                    <Button onClick={() => addNewTab('recentWeddings')} className="flex items-center gap-2 w-full sm:w-auto">
                      <Plus className="h-4 w-4" />
                      Add Tab
                    </Button>
                  </div>

                  <Tabs defaultValue={Object.keys(data.recentWeddings)[0]} className="w-full">
                    <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 gap-1 h-auto">
                      {Object.keys(data.recentWeddings).map((wedding) => (
                        <TabsTrigger key={wedding} value={wedding} className="relative text-xs sm:text-sm p-2 sm:p-3 h-auto min-h-[2.5rem]">
                          <span className="truncate">{wedding}</span>
                          <div
                            onClick={(e) => {
                              e.stopPropagation();
                              removeTab('recentWeddings', wedding);
                            }}
                            className="absolute -top-1 -right-1 h-4 w-4 sm:h-5 sm:w-5 bg-red-500 hover:bg-red-600 text-white rounded-full cursor-pointer flex items-center justify-center text-xs"
                          >
                            ×
                          </div>
                        </TabsTrigger>
                      ))}
                    </TabsList>
                    
                    {Object.entries(data.recentWeddings).map(([wedding, images]) => (
                      <TabsContent key={wedding} value={wedding} className="space-y-4 mt-4">
                        <ImageUpload
                          onImageAdd={(imageUrl) => addImageToTab('recentWeddings', wedding, imageUrl)}
                          placeholder={`Add image to ${wedding} wedding`}
                        />
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                          {images.map((image, index) => (
                            <div key={index} className="relative group">
                              <img
                                src={image}
                                alt={`${wedding} - Photo ${index + 1}`}
                                className="w-full h-48 object-cover rounded-lg"
                              />
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => removeImageFromTab('recentWeddings', wedding, index)}
                                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </TabsContent>
                    ))}
                  </Tabs>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Amazing Work Management */}
            <TabsContent value="work">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg sm:text-xl">Our Amazing Work Section</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 sm:space-y-6">
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                    <Input
                      placeholder="Enter new category name (e.g., 'Portraits')"
                      value={newTabName}
                      onChange={(e) => setNewTabName(e.target.value)}
                      className="flex-1"
                    />
                    <Button onClick={() => addNewTab('amazingWork')} className="flex items-center gap-2 w-full sm:w-auto">
                      <Plus className="h-4 w-4" />
                      Add Category
                    </Button>
                  </div>

                  <Tabs defaultValue={Object.keys(data.amazingWork)[0]} className="w-full">
                    <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 gap-1 h-auto">
                      {Object.keys(data.amazingWork).map((category) => (
                        <TabsTrigger key={category} value={category} className="relative text-xs sm:text-sm p-2 sm:p-3 h-auto min-h-[2.5rem]">
                          <span className="truncate">{category}</span>
                          <div
                            onClick={(e) => {
                              e.stopPropagation();
                              removeTab('amazingWork', category);
                            }}
                            className="absolute -top-1 -right-1 h-4 w-4 sm:h-5 sm:w-5 bg-red-500 hover:bg-red-600 text-white rounded-full cursor-pointer flex items-center justify-center text-xs"
                          >
                            ×
                          </div>
                        </TabsTrigger>
                      ))}
                    </TabsList>
                    
                    {Object.entries(data.amazingWork).map(([category, images]) => (
                      <TabsContent key={category} value={category} className="space-y-4 mt-4">
                        <ImageUpload
                          onImageAdd={(imageUrl) => addImageToTab('amazingWork', category, imageUrl)}
                          placeholder={`Add image to ${category} category`}
                        />
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                          {images.map((image, index) => (
                            <div key={index} className="relative group">
                              <img
                                src={image}
                                alt={`${category} - Photo ${index + 1}`}
                                className="w-full h-48 object-cover rounded-lg"
                              />
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => removeImageFromTab('amazingWork', category, index)}
                                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </TabsContent>
                    ))}
                  </Tabs>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Testimonials Management */}
            <TabsContent value="testimonials">
              <Card>
                <CardHeader>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
                    <CardTitle className="text-lg sm:text-xl">What Couples Say - Testimonials</CardTitle>
                    <Button onClick={addTestimonial} className="flex items-center gap-2 w-full sm:w-auto">
                      <Plus className="h-4 w-4" />
                      Add Testimonial
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4 sm:space-y-6">
                  {reversedTestimonials.map((testimonial, index) => {
                    const actualIndex = data.testimonials.length - 1 - index;
                    return (
                    <Card key={actualIndex} className="p-3 sm:p-4">
                      <div className="space-y-4">
                        <div className="flex justify-between items-start">
                          <h4 className="font-medium text-sm sm:text-base">Testimonial {actualIndex + 1}</h4>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => removeTestimonial(actualIndex)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label className="text-sm">Couple Names</Label>
                            <Input
                              value={testimonial.name}
                              onChange={(e) => updateTestimonial(actualIndex, 'name', e.target.value)}
                              placeholder="e.g., Sarah & John"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-sm">Rating</Label>
                            <select
                              value={testimonial.rating}
                              onChange={(e) => updateTestimonial(actualIndex, 'rating', parseInt(e.target.value))}
                              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                              <option value={5}>5 Stars</option>
                              <option value={4}>4 Stars</option>
                              <option value={3}>3 Stars</option>
                              <option value={2}>2 Stars</option>
                              <option value={1}>1 Star</option>
                            </select>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label className="text-sm">Testimonial Text</Label>
                          <Textarea
                            value={testimonial.text}
                            onChange={(e) => updateTestimonial(actualIndex, 'text', e.target.value)}
                            placeholder="Enter the testimonial text..."
                            rows={3}
                            className="text-sm"
                          />
                        </div>
                        
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-xs sm:text-sm text-gray-600">
                          <span>Preview:</span>
                          <div className="flex items-center gap-2">
                            <div className="flex">
                              {Array.from({ length: testimonial.rating }).map((_, i) => (
                                <Star key={i} className="h-3 w-3 sm:h-4 sm:w-4 fill-yellow-400 text-yellow-400" />
                              ))}
                            </div>
                            <span>- {testimonial.name || 'Name not set'}</span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  )})}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
}