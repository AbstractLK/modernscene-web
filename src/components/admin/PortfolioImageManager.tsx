import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { useAdmin } from '../../contexts/AdminContext';
import { PortfolioImage } from '../../types/admin';
import { Plus, Edit, Trash2, Image as ImageIcon } from 'lucide-react';

const portfolioCategories = [
  { key: 'weddings', label: 'Weddings' },
  { key: 'homecoming', label: 'Homecoming' },
  { key: 'casualShoots', label: 'Casual Shoots' },
  { key: 'engagements', label: 'Engagements' },
  { key: 'cinematography', label: 'Cinematography' },
  { key: 'thanksCards', label: 'Thanks Cards & Enlargements' }
];

export function PortfolioImageManager() {
  const { adminData, updateAdminData } = useAdmin();
  const [activeCategory, setActiveCategory] = useState('weddings');
  const [editingImage, setEditingImage] = useState<PortfolioImage | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    src: '',
    alt: '',
    title: '',
    location: '',
    description: ''
  });

  const handleEdit = (image: PortfolioImage) => {
    setEditingImage(image);
    setFormData({
      src: image.src,
      alt: image.alt,
      title: image.title,
      location: image.location,
      description: image.description
    });
    setIsDialogOpen(true);
  };

  const handleAdd = () => {
    setEditingImage(null);
    setFormData({
      src: '',
      alt: '',
      title: '',
      location: portfolioCategories.find(cat => cat.key === activeCategory)?.label || '',
      description: ''
    });
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (!formData.src || !formData.alt || !formData.title || !formData.description) {
      alert('Please fill in all required fields');
      return;
    }

    const newPortfolioImages = { ...adminData.portfolioImages };
    const categoryImages = [...newPortfolioImages[activeCategory as keyof typeof newPortfolioImages]];
    
    if (editingImage) {
      const index = categoryImages.findIndex(img => img.id === editingImage.id);
      if (index !== -1) {
        categoryImages[index] = {
          ...editingImage,
          ...formData
        };
      }
    } else {
      const newImage: PortfolioImage = {
        id: Date.now().toString(),
        ...formData
      };
      categoryImages.push(newImage);
    }

    newPortfolioImages[activeCategory as keyof typeof newPortfolioImages] = categoryImages;
    updateAdminData({ portfolioImages: newPortfolioImages });
    setIsDialogOpen(false);
    setEditingImage(null);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this image?')) {
      const newPortfolioImages = { ...adminData.portfolioImages };
      const categoryImages = newPortfolioImages[activeCategory as keyof typeof newPortfolioImages];
      newPortfolioImages[activeCategory as keyof typeof newPortfolioImages] = categoryImages.filter(img => img.id !== id);
      updateAdminData({ portfolioImages: newPortfolioImages });
    }
  };

  const currentCategoryImages = adminData.portfolioImages[activeCategory as keyof typeof adminData.portfolioImages];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">Portfolio Images</h3>
          <p className="text-gray-600 text-sm">Manage images in the Recent Weddings section by category</p>
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
                {editingImage ? 'Edit Portfolio Image' : 'Add Portfolio Image'}
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
                <Label htmlFor="title">Title (Couple Names)</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Sarah & Michael"
                />
              </div>
              <div>
                <Label htmlFor="location">Location/Category</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Wedding location or category"
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Brief description of the wedding or shoot"
                  rows={3}
                />
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
        <TabsList className="grid grid-cols-3 lg:grid-cols-6 w-full">
          {portfolioCategories.map((category) => (
            <TabsTrigger key={category.key} value={category.key} className="text-xs">
              {category.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {portfolioCategories.map((category) => (
          <TabsContent key={category.key} value={category.key} className="mt-6">
            <div className="mb-4">
              <h4 className="text-lg font-medium text-gray-900">{category.label}</h4>
              <p className="text-gray-600 text-sm">
                {currentCategoryImages.length} image{currentCategoryImages.length !== 1 ? 's' : ''}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentCategoryImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
                    <div className="aspect-video relative overflow-hidden">
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjE4MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIG5vdCBmb3VuZDwvdGV4dD48L3N2Zz4=';
                        }}
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
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
                    </div>
                    <CardContent className="p-4">
                      <h4 className="font-semibold text-gray-900 mb-1">{image.title}</h4>
                      <p className="text-gray-600 text-sm mb-2">{image.location}</p>
                      <p className="text-gray-500 text-xs line-clamp-2">{image.description}</p>
                    </CardContent>
                  </Card>
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