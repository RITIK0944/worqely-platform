import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { 
  User, 
  Camera, 
  MapPin, 
  Phone, 
  Mail, 
  CreditCard,
  X,
  Save,
  Edit
} from 'lucide-react';
import { User as UserType, Address } from '../../App';

interface ProfileSectionProps {
  user: UserType;
  onClose: () => void;
}

const indianStates = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Delhi', 'Jammu and Kashmir', 'Ladakh'
];

export function ProfileSection({ user, onClose }: ProfileSectionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: user.fullName,
    email: user.email || '',
    mobile: user.mobile,
    aadhaarNumber: user.aadhaarNumber,
    profilePhoto: user.profilePhoto,
    address: user.address || {
      street: '',
      city: '',
      state: '',
      country: 'India',
      pincode: ''
    } as Address
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name.startsWith('address.')) {
      const addressField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleAddressSelectChange = (field: keyof Address, value: string) => {
    setFormData(prev => ({
      ...prev,
      address: {
        ...prev.address,
        [field]: value
      }
    }));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const photoUrl = URL.createObjectURL(file);
      setFormData(prev => ({
        ...prev,
        profilePhoto: photoUrl
      }));
    }
  };

  const handleSave = () => {
    // Here you would typically save to backend
    alert('Profile updated successfully!');
    setIsEditing(false);
  };

  const formatAadhaar = (value: string) => {
    const digits = value.replace(/\D/g, '');
    if (digits.length >= 8) {
      return `${digits.slice(0, 4)}-${digits.slice(4, 8)}-${digits.slice(8, 12)}`;
    } else if (digits.length >= 4) {
      return `${digits.slice(0, 4)}-${digits.slice(4)}`;
    }
    return digits;
  };

  const handleAadhaarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatAadhaar(e.target.value);
    setFormData(prev => ({
      ...prev,
      aadhaarNumber: formatted
    }));
  };

  return (
    <Card className="max-h-[90vh] overflow-y-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center">
              <User className="h-5 w-5 mr-2" />
              Profile Settings
            </CardTitle>
            <CardDescription>View and update your personal information</CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            {!isEditing && (
              <Button size="sm" onClick={() => setIsEditing(true)}>
                <Edit className="h-4 w-4 mr-1" />
                Edit
              </Button>
            )}
            <Button size="sm" variant="outline" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Profile Photo Section */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={formData.profilePhoto} />
                  <AvatarFallback className="text-2xl">
                    {formData.fullName.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                {isEditing && (
                  <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center cursor-pointer">
                    <Camera className="h-6 w-6 text-white" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                  </div>
                )}
              </div>
              <div>
                <h3 className="text-lg font-medium">{formData.fullName}</h3>
                <p className="text-muted-foreground">Customer Account</p>
                <p className="text-sm text-muted-foreground">
                  Member since {new Date().getFullYear()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Full Name</label>
                {isEditing ? (
                  <Input
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                  />
                ) : (
                  <div className="p-2 bg-muted rounded-lg">{formData.fullName}</div>
                )}
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">Email</label>
                {isEditing ? (
                  <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                  />
                ) : (
                  <div className="p-2 bg-muted rounded-lg flex items-center">
                    <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                    {formData.email || 'Not provided'}
                  </div>
                )}
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">Mobile Number</label>
                {isEditing ? (
                  <Input
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    placeholder="Enter your mobile number"
                    maxLength={10}
                  />
                ) : (
                  <div className="p-2 bg-muted rounded-lg flex items-center">
                    <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                    {formData.mobile}
                  </div>
                )}
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">Aadhaar Number</label>
                {isEditing ? (
                  <Input
                    name="aadhaarNumber"
                    value={formData.aadhaarNumber}
                    onChange={handleAadhaarChange}
                    placeholder="XXXX-XXXX-XXXX"
                    maxLength={14}
                  />
                ) : (
                  <div className="p-2 bg-muted rounded-lg flex items-center">
                    <CreditCard className="h-4 w-4 mr-2 text-muted-foreground" />
                    {formData.aadhaarNumber}
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Address Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <MapPin className="h-5 w-5 mr-2" />
              Address Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Street Address</label>
              {isEditing ? (
                <Textarea
                  name="address.street"
                  value={formData.address.street}
                  onChange={handleInputChange}
                  placeholder="Enter your complete address"
                  rows={3}
                />
              ) : (
                <div className="p-2 bg-muted rounded-lg min-h-[60px]">
                  {formData.address.street || 'Not provided'}
                </div>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">City</label>
                {isEditing ? (
                  <Input
                    name="address.city"
                    value={formData.address.city}
                    onChange={handleInputChange}
                    placeholder="Enter city"
                  />
                ) : (
                  <div className="p-2 bg-muted rounded-lg">
                    {formData.address.city || 'Not provided'}
                  </div>
                )}
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">State</label>
                {isEditing ? (
                  <Select 
                    value={formData.address.state}
                    onValueChange={(value) => handleAddressSelectChange('state', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      {indianStates.map(state => (
                        <SelectItem key={state} value={state}>
                          {state}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <div className="p-2 bg-muted rounded-lg">
                    {formData.address.state || 'Not provided'}
                  </div>
                )}
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">Pincode</label>
                {isEditing ? (
                  <Input
                    name="address.pincode"
                    value={formData.address.pincode}
                    onChange={handleInputChange}
                    placeholder="6-digit pincode"
                    maxLength={6}
                  />
                ) : (
                  <div className="p-2 bg-muted rounded-lg">
                    {formData.address.pincode || 'Not provided'}
                  </div>
                )}
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">Country</label>
                <div className="p-2 bg-muted rounded-lg">
                  {formData.address.country}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Account Security */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Account Security</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Password</label>
              <div className="flex space-x-2">
                <Input 
                  type="password" 
                  value="••••••••" 
                  readOnly 
                  className="flex-1" 
                />
                <Button variant="outline" size="sm">
                  Change Password
                </Button>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">Two-Factor Authentication</p>
                  <p className="text-xs text-muted-foreground">Extra security for your account</p>
                </div>
                <Button size="sm" variant="outline">
                  Enable
                </Button>
              </div>
              
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">Login Notifications</p>
                  <p className="text-xs text-muted-foreground">Get notified of new logins</p>
                </div>
                <Button size="sm" variant="outline">
                  Configure
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        {isEditing && (
          <div className="flex space-x-2 sticky bottom-0 bg-white p-4 border-t">
            <Button onClick={handleSave} className="flex-1">
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setIsEditing(false)}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}