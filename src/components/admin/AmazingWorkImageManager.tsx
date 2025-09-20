import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent } from '../ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { useAdmin } from '../../contexts/AdminContext';
import { AmazingWorkImage } from '../../types/admin';
import { Plus, Edit, Trash2, Image as ImageIcon } from 'lucide-react';

const amazingWorkCategories = [
  { key: 'fineArt', label: 'Fine Art' },
  { key: 'artistic', label: 'Artistic' },
  { key: 'vintage', label: 'Vintage' }
];

const gridClasses = [
  'row-span-1',
  'row-span-2',
  'col-span-2',
  'col-span-2 row-span-2'
];

export function AmazingWorkImageManager() {
  const { adminData, updateAdminData } = useAdmin();
  const [activeCategory, setActiveCategory] = useState('fineArt');
  const [editingImage, setEditingImage] = useState<AmazingWorkImage | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    src: '',
    alt: '',
    className: 'row-span-1'
  });

  const handleEdit = (image: AmazingWorkImage) => {
    setEditingImage(image);
    setFormData({
      src: image.src,
      alt: image.alt,
      className: image.className
    });
    setIsDialogOpen(true);
  };

  const handleAdd = () => {
    setEditingImage(null);
    setFormData({
      src: '',
      alt: '',
      className: 'row-span-1'
    });
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (!formData.src || !formData.alt) {
      alert('Please fill in all required fields');
      return;
    }

    const newAmazingWorkImages = { ...adminData.amazingWorkImages };
    const categoryImages = [...newAmazingWorkImages[activeCategory as keyof typeof newAmazingWorkImages]];
    
    if (editingImage) {
      const index = categoryImages.findIndex(img => img.id === editingImage.id);
      if (index !== -1) {
        categoryImages[index] = {
          ...editingImage,
          ...formData
        };
      }
    } else {
      const newImage: AmazingWorkImage = {
        id: Date.now().toString(),
        ...formData
      };
      categoryImages.push(newImage);
    }

    newAmazingWorkImages[activeCategory as keyof typeof newAmazingWorkImages] = categoryImages;
    updateAdminData({ amazingWorkImages: newAmazingWorkImages });
    setIsDialogOpen(false);
    setEditingImage(null);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this image?')) {
      const newAmazingWorkImages = { ...adminData.amazingWorkImages };
      const categoryImages = newAmazingWorkImages[activeCategory as keyof typeof newAmazingWorkImages];
      newAmazingWorkImages[activeCategory as keyof typeof newAmazingWorkImages] = categoryImages.filter(img => img.id !== id);
      updateAdminData({ amazingWorkImages: newAmazingWorkImages });
    }
  };

  const currentCategoryImages = adminData.amazingWorkImages[activeCategory as keyof typeof adminData.amazingWorkImages];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">Amazing Work Images</h3>
          <p className="text-gray-600 text-sm">Manage images in the Our Amazing Work section by style</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleAdd} className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add Image
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingImage ? 'Edit Amazing Work Image' : 'Add Amazing Work Image'}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="src">Image URL</Label>
                <Input
                  id="src"
                  value={formData.src}
                  onChange={(e) => setFormData({ ...formData, src: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              <div>
                <Label htmlFor="alt">Alt Text</Label>
                <Input
                  id="alt"
                  value={formData.alt}
                  onChange={(e) => setFormData({ ...formData, alt: e.target.value })}
                  placeholder="Descriptive alt text"
                />
              </div>
              <div>
                <Label htmlFor="className">Grid Size</Label>
                <Select value={formData.className} onValueChange={(value) => setFormData({ ...formData, className: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {gridClasses.map((className) => (
                      <SelectItem key={className} value={className}>
                        {className.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2 pt-4">
                <Button onClick={handleSave} className="flex-1">
                  {editingImage ? 'Update' : 'Add'} Image
                </Button>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs value={activeCategory} onValueChange={setActiveCategory}>
        <TabsList className="grid grid-cols-3 w-full">
          {amazingWorkCategories.map((category) => (
            <TabsTrigger key={category.key} value={category.key}>
              {category.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {amazingWorkCategories.map((category) => (
          <TabsContent key={category.key} value={category.key} className="mt-6">
            <div className="mb-4">
              <h4 className="text-lg font-medium text-gray-900">{category.label}</h4>
              <p className="text-gray-600 text-sm">
                {currentCategoryImages.length} image{currentCategoryImages.length !== 1 ? 's' : ''}
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px]">
              {currentCategoryImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className={`relative overflow-hidden rounded-lg group ${image.className}`}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjE4MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIG5vdCBmb3VuZDwvdGV4dD48L3N2Zz4=';
                    }}
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => handleEdit(image)}
                      className="bg-white/90 hover:bg-white"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(image.id)}
                      className="bg-red-500/90 hover:bg-red-500"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                    {image.className}
                  </div>
                </motion.div>
              ))}
            </div>

            {currentCategoryImages.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <ImageIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No images in {category.label}</h3>
                <p className="text-gray-600 mb-4">Add your first image to this category</p>
                <Button onClick={handleAdd} className="flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Add First Image
                </Button>
              </motion.div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}