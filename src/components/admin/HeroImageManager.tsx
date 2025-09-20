import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { useAdmin } from '../../contexts/AdminContext';
import { HeroImage } from '../../types/admin';
import { Plus, Edit, Trash2, Image as ImageIcon } from 'lucide-react';

export function HeroImageManager() {
  const { adminData, updateAdminData } = useAdmin();
  const [editingImage, setEditingImage] = useState<HeroImage | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    src: '',
    alt: '',
    title: '',
    subtitle: ''
  });

  const handleEdit = (image: HeroImage) => {
    setEditingImage(image);
    setFormData({
      src: image.src,
      alt: image.alt,
      title: image.title,
      subtitle: image.subtitle
    });
    setIsDialogOpen(true);
  };

  const handleAdd = () => {
    setEditingImage(null);
    setFormData({
      src: '',
      alt: '',
      title: '',
      subtitle: ''
    });
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (!formData.src || !formData.alt || !formData.title || !formData.subtitle) {
      alert('Please fill in all fields');
      return;
    }

    const newImages = [...adminData.heroImages];
    
    if (editingImage) {
      const index = newImages.findIndex(img => img.id === editingImage.id);
      if (index !== -1) {
        newImages[index] = {
          ...editingImage,
          ...formData
        };
      }
    } else {
      const newImage: HeroImage = {
        id: Date.now().toString(),
        ...formData
      };
      newImages.push(newImage);
    }

    updateAdminData({ heroImages: newImages });
    setIsDialogOpen(false);
    setEditingImage(null);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this image?')) {
      const newImages = adminData.heroImages.filter(img => img.id !== id);
      updateAdminData({ heroImages: newImages });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">Hero Carousel Images</h3>
          <p className="text-gray-600 text-sm">Manage the images displayed in the hero section carousel</p>
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
                {editingImage ? 'Edit Hero Image' : 'Add Hero Image'}
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
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Image title"
                />
              </div>
              <div>
                <Label htmlFor="subtitle">Subtitle</Label>
                <Input
                  id="subtitle"
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  placeholder="Image subtitle"
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {adminData.heroImages.map((image, index) => (
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
                <p className="text-gray-600 text-sm mb-2">{image.subtitle}</p>
                <p className="text-gray-500 text-xs truncate">{image.alt}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {adminData.heroImages.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <ImageIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No hero images yet</h3>
          <p className="text-gray-600 mb-4">Add your first hero image to get started</p>
          <Button onClick={handleAdd} className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add First Image
          </Button>
        </motion.div>
      )}
    </div>
  );
}