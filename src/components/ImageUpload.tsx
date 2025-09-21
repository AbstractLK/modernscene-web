import React, { useState, useRef, useCallback } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent } from './ui/card';
import { Upload, Image, X, AlertCircle } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface ImageUploadProps {
  onImageAdd: (imageUrl: string) => void;
  placeholder?: string;
  className?: string;
  multiple?: boolean;
}

export function ImageUpload({ onImageAdd, placeholder = "Upload image files", className = "", multiple = false }: ImageUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateImageFile = useCallback((file: File): boolean => {
    // Check file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      toast.error('Please upload a valid image file (JPEG, PNG, WebP, or GIF)');
      return false;
    }

    // Check file size (max 5MB to prevent memory issues)
    const maxSize = 5 * 1024 * 1024; // Reduced to 5MB
    if (file.size > maxSize) {
      toast.error('Image file size must be less than 5MB');
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
    if (!files) return;

    setUploading(true);
    
    try {
      const fileArray = Array.from(files);
      
      // Limit concurrent file processing to prevent memory issues
      const maxConcurrent = 3;
      for (let i = 0; i < fileArray.length; i += maxConcurrent) {
        const batch = fileArray.slice(i, i + maxConcurrent);
        
        await Promise.all(
          batch.map(async (file) => {
            if (validateImageFile(file)) {
              try {
                const dataUrl = await convertFileToDataUrl(file);
                onImageAdd(dataUrl);
                toast.success(`Image "${file.name}" uploaded successfully!`);
              } catch (error) {
                console.error(`Error uploading ${file.name}:`, error);
                toast.error(`Failed to upload ${file.name}`);
              }
            }
          })
        );
      }
    } catch (error) {
      console.error('Error uploading files:', error);
      toast.error('Failed to upload images. Please try again.');
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  }, [validateImageFile, convertFileToDataUrl, onImageAdd]);



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
    <div className={`space-y-4 ${className}`}>
      {/* File Upload Section */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">Upload Image File{multiple ? 's' : ''}</Label>
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
          <CardContent className="flex flex-col items-center justify-center space-y-4 p-6">
            <div className="flex flex-col items-center space-y-2">
              {uploading ? (
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              ) : (
                <Upload className="h-8 w-8 text-gray-400" />
              )}
              <div className="text-center">
                <p className="text-sm font-medium text-gray-700">
                  {uploading ? 'Uploading...' : `Click to upload or drag and drop`}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  PNG, JPG, WebP or GIF up to 5MB
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple={multiple}
          onChange={handleFileInputChange}
          className="hidden"
        />
      </div>

      {/* File Format Info */}
      <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg text-sm text-blue-700">
        <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
        <div>
          <p className="font-medium">Supported formats:</p>
          <p className="text-xs mt-1">JPEG, PNG, WebP, GIF • Maximum size: 5MB • Recommended: High-resolution images for best quality</p>
        </div>
      </div>
    </div>
  );
}