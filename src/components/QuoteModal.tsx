import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Calendar, Heart, Users, MapPin, Phone, Mail } from "lucide-react";

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function QuoteModal({ isOpen, onClose }: QuoteModalProps) {
  const [formData, setFormData] = useState({
    // Wedding Details
    brideName: "",
    groomName: "",
    weddingDate: "",
    homecomingDate: "",
    functionLocation: "",
    additionalLocation: "",
    brideContact: "",
    groomContact: "",
    
    // Bridal and Groom's Dressing Details
    bridalSalonName: "",
    bridalSalonContact: "",
    groomDressingPerson: "",
    groomDressingContact: "",
    
    // Bridal Group Availability
    bridesmaidCount: "",
    bestmanCount: "",
    flowerGirlCount: "",
    pageboyCount: "",
    
    // Additional Details
    additionalDetails: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const formatWhatsAppMessage = () => {
    const message = `🎊 WEDDING QUOTE REQUEST 🎊

👰 BRIDE & GROOM DETAILS:
• Bride's Name: ${formData.brideName || 'Not provided'}
• Groom's Name: ${formData.groomName || 'Not provided'}
• Wedding Date: ${formData.weddingDate || 'Not provided'}
• Homecoming Date: ${formData.homecomingDate || 'Not provided'}
• Function Location: ${formData.functionLocation || 'Not provided'}
• Additional Location: ${formData.additionalLocation || 'Not provided'}
• Bride's Contact: ${formData.brideContact || 'Not provided'}
• Groom's Contact: ${formData.groomContact || 'Not provided'}

💄 DRESSING DETAILS:
• Bridal Salon Name: ${formData.bridalSalonName || 'Not provided'}
• Bridal Salon Contact: ${formData.bridalSalonContact || 'Not provided'}
• Groom's Dressing Person: ${formData.groomDressingPerson || 'Not provided'}
• Groom's Dresser Contact: ${formData.groomDressingContact || 'Not provided'}

🎭 BRIDAL GROUP:
• Bridesmaids: ${formData.bridesmaidCount || '0'}
• Best Men: ${formData.bestmanCount || '0'}
• Flower Girls: ${formData.flowerGirlCount || '0'}
• Page Boys: ${formData.pageboyCount || '0'}

📝 ADDITIONAL DETAILS:
${formData.additionalDetails || 'No additional details provided'}

---
Sent via Modern Scene Wedding Photography Website`;

    return encodeURIComponent(message);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Format the message for WhatsApp
    const whatsappMessage = formatWhatsAppMessage();
    const whatsappNumber = "94774890840"; // Sri Lankan number format for WhatsApp
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
    
    // Open WhatsApp with the pre-filled message
    window.open(whatsappUrl, '_blank');
    
    // Close the modal
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl" style={{ fontFamily: "'Lovalina Free', serif" }}>
            💍 Wedding Details Form
          </DialogTitle>
          <DialogDescription>
            Please fill out your wedding details below to receive a personalized photography quote. This information will be sent directly to our team via WhatsApp.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Wedding Details Section */}
          <div className="space-y-6">
            <h3 className="flex items-center gap-2 text-xl" style={{ fontFamily: "'Lovalina Free', serif" }}>
              👰 Bride & 🤵 Groom Details
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="brideName" className="flex items-center gap-2">
                  👰 Bride's Name
                </Label>
                <Input
                  id="brideName"
                  type="text"
                  placeholder="Enter bride's full name"
                  value={formData.brideName}
                  onChange={(e) => handleInputChange("brideName", e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="groomName" className="flex items-center gap-2">
                  🤵 Groom's Name
                </Label>
                <Input
                  id="groomName"
                  type="text"
                  placeholder="Enter groom's full name"
                  value={formData.groomName}
                  onChange={(e) => handleInputChange("groomName", e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="weddingDate" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Wedding Date
                </Label>
                <Input
                  id="weddingDate"
                  type="date"
                  value={formData.weddingDate}
                  onChange={(e) => handleInputChange("weddingDate", e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="homecomingDate" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Homecoming Date
                </Label>
                <Input
                  id="homecomingDate"
                  type="date"
                  value={formData.homecomingDate}
                  onChange={(e) => handleInputChange("homecomingDate", e.target.value)}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="functionLocation" className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Function Location
                </Label>
                <Input
                  id="functionLocation"
                  type="text"
                  placeholder="Enter wedding venue/location"
                  value={formData.functionLocation}
                  onChange={(e) => handleInputChange("functionLocation", e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="additionalLocation" className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Additional Location
                </Label>
                <Input
                  id="additionalLocation"
                  type="text"
                  placeholder="Enter additional venue/location"
                  value={formData.additionalLocation}
                  onChange={(e) => handleInputChange("additionalLocation", e.target.value)}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="brideContact" className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Bride's Contact
                </Label>
                <Input
                  id="brideContact"
                  type="tel"
                  placeholder="Bride's phone number"
                  value={formData.brideContact}
                  onChange={(e) => handleInputChange("brideContact", e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="groomContact" className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Groom's Contact
                </Label>
                <Input
                  id="groomContact"
                  type="tel"
                  placeholder="Groom's phone number"
                  value={formData.groomContact}
                  onChange={(e) => handleInputChange("groomContact", e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          {/* Bridal and Groom's Dressing Details */}
          <div className="space-y-6">
            <h3 className="flex items-center gap-2 text-xl" style={{ fontFamily: "'Lovalina Free', serif" }}>
              💄 Bridal and Groom's Dressing Details
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="bridalSalonName">Bridal Salon Name</Label>
                <Input
                  id="bridalSalonName"
                  type="text"
                  placeholder="Name of bridal salon"
                  value={formData.bridalSalonName}
                  onChange={(e) => handleInputChange("bridalSalonName", e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="bridalSalonContact">Bridal Salon Contact</Label>
                <Input
                  id="bridalSalonContact"
                  type="tel"
                  placeholder="Salon contact number"
                  value={formData.bridalSalonContact}
                  onChange={(e) => handleInputChange("bridalSalonContact", e.target.value)}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="groomDressingPerson">Groom's Dressing Person</Label>
                <Input
                  id="groomDressingPerson"
                  type="text"
                  placeholder="Name of groom's dresser/stylist"
                  value={formData.groomDressingPerson}
                  onChange={(e) => handleInputChange("groomDressingPerson", e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="groomDressingContact">Groom's Dresser Contact</Label>
                <Input
                  id="groomDressingContact"
                  type="tel"
                  placeholder="Dresser contact number"
                  value={formData.groomDressingContact}
                  onChange={(e) => handleInputChange("groomDressingContact", e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Bridal Group Availability */}
          <div className="space-y-6">
            <h3 className="flex items-center gap-2 text-xl" style={{ fontFamily: "'Lovalina Free', serif" }}>
              🎭 Bridal Group Availability
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="bridesmaidCount" className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Bridesmaid Count
                </Label>
                <Input
                  id="bridesmaidCount"
                  type="number"
                  min="0"
                  placeholder="0"
                  value={formData.bridesmaidCount}
                  onChange={(e) => handleInputChange("bridesmaidCount", e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="bestmanCount">Bestman Count</Label>
                <Input
                  id="bestmanCount"
                  type="number"
                  min="0"
                  placeholder="0"
                  value={formData.bestmanCount}
                  onChange={(e) => handleInputChange("bestmanCount", e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="flowerGirlCount">Flower Girl Count</Label>
                <Input
                  id="flowerGirlCount"
                  type="number"
                  min="0"
                  placeholder="0"
                  value={formData.flowerGirlCount}
                  onChange={(e) => handleInputChange("flowerGirlCount", e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="pageboyCount">Pageboy Count</Label>
                <Input
                  id="pageboyCount"
                  type="number"
                  min="0"
                  placeholder="0"
                  value={formData.pageboyCount}
                  onChange={(e) => handleInputChange("pageboyCount", e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Additional Details */}
          <div className="space-y-4">
            <Label htmlFor="additionalDetails">Additional Details</Label>
            <Textarea
              id="additionalDetails"
              placeholder="Please share any additional details about your wedding, special requirements, timeline preferences, or questions you may have..."
              rows={4}
              value={formData.additionalDetails}
              onChange={(e) => handleInputChange("additionalDetails", e.target.value)}
            />
          </div>

          {/* Form Actions */}
          <div className="flex gap-4 pt-6">
            <Button 
              type="submit" 
              className="flex-1 bg-gray-900 text-white hover:bg-gray-800"
            >
              <Heart className="h-4 w-4 mr-2" />
              Submit Quote Request
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
              className="px-8"
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}