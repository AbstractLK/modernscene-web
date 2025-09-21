import React, { useState, useRef, useCallback } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent } from './ui/card';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { Upload, User, Camera } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface AvatarUploadProps {
  currentAvatar: string;
  displayName: string;
  onAvatarUpdate: (avatarUrl: string) => void;
}

export function AvatarUpload({ currentAvatar, displayName, onAvatarUpdate }: AvatarUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateImageFile = useCallback((file: File): boolean => {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      toast.error('Please upload a valid image file (JPEG, PNG, or WebP)');
      return false;
    }

    const maxSize = 2 * 1024 * 1024; // Reduced to 2MB for avatars
    if (file.size > maxSize) {
      toast.error('Avatar image size must be less than 2MB');
      return false;
    }

    return true;
  }, []);

  const convertFileToDataUrl = useCallback((file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      const cleanup = () => {
        reader.onload = null;
        reader.onerror = null;
        reader.onabort = null;
      };
      
      reader.onload = (e) => {
        cleanup();
        if (e.target?.result) {
          resolve(e.target.result as string);
        } else {
          reject(new Error('Failed to read file'));
        }
      };
      
      reader.onerror = () => {
        cleanup();
        reject(new Error('Failed to read file'));
      };
      
      reader.onabort = () => {
        cleanup();
        reject(new Error('File reading was aborted'));
      };
      
      reader.readAsDataURL(file);
    });
  }, []);

  const handleFileUpload = useCallback(async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const file = files[0]; // Only take the first file for avatar
    setUploading(true);
    
    try {
      if (validateImageFile(file)) {
        const dataUrl = await convertFileToDataUrl(file);
        onAvatarUpdate(dataUrl);
        toast.success('Avatar updated successfully!');
      }
    } catch (error) {
      console.error('Error uploading avatar:', error);
      toast.error('Failed to upload avatar. Please try again.');
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  }, [validateImageFile, convertFileToDataUrl, onAvatarUpdate]);



  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileUpload(e.target.files);
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-4">
      {/* Current Avatar Preview */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <Avatar className="h-20 w-20 sm:h-24 sm:w-24">
          <AvatarImage src={currentAvatar} alt={displayName} />
          <AvatarFallback className="text-lg">
            {displayName?.charAt(0) || 'A'}
          </AvatarFallback>
        </Avatar>
        <div className="text-center sm:text-left">
          <h4 className="font-medium">Current Avatar</h4>
          <p className="text-sm text-gray-500">Upload or drag image to change</p>
        </div>
      </div>



      {/* File Upload Area */}
      <Card 
        className={`border-2 border-dashed transition-colors cursor-pointer ${
          dragActive 
            ? 'border-blue-500 bg-blue-50' 
            : 'border-gray-300 hover:border-gray-400'
        } ${uploading ? 'opacity-50 pointer-events-none' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={openFileDialog}
      >
        <CardContent className="flex flex-col items-center justify-center space-y-3 p-6">
          {uploading ? (
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          ) : (
            <Upload className="h-8 w-8 text-gray-400" />
          )}
          <div className="text-center">
            <p className="text-sm font-medium text-gray-700">
              {uploading ? 'Uploading avatar...' : 'Upload new avatar'}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              PNG, JPG or WebP up to 2MB
            </p>
          </div>
        </CardContent>
      </Card>
      
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileInputChange}
        className="hidden"
      />
    </div>
  );
}