import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Separator } from '../ui/separator';
import { Switch } from '../ui/switch';
import { 
  User, 
  Camera, 
  MapPin, 
  Phone, 
  Mail, 
  Calendar, 
  Star,
  Shield,
  Award,
  Settings,
  CheckCircle
} from 'lucide-react';
import { User as UserType } from '../../App';

interface ProfileManagementProps {
  user: UserType | null;
  onClose?: () => void;
}

export function ProfileManagement({ user, onClose }: ProfileManagementProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isAvailable, setIsAvailable] = useState(true);

  return (
    <div className="space-y-6">
      {/* Profile Overview Card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <User className="h-5 w-5" />
            <span>Profile Overview</span>
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Badge variant={isAvailable ? "default" : "secondary"} className={isAvailable ? "bg-green-500" : ""}>
              {isAvailable ? "Available" : "Offline"}
            </Badge>
            <Switch
              checked={isAvailable}
              onCheckedChange={setIsAvailable}
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src={user?.profilePhoto} />
                <AvatarFallback className="text-lg">
                  {user?.fullName.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <Button variant="outline" size="sm" className="flex items-center space-x-2">
                <Camera className="h-4 w-4" />
                <span>Update Photo</span>
              </Button>
            </div>
            
            <div className="flex-1 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm text-muted-foreground">Full Name</Label>
                  <p className="font-medium">{user?.fullName}</p>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">Work Category</Label>
                  <p className="font-medium">{user?.workCategory}</p>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">Experience</Label>
                  <p className="font-medium">{user?.experience || "2 years"}</p>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">Rating</Label>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="font-medium">{user?.rating || "4.8"}</span>
                    <span className="text-muted-foreground">({user?.completedJobs || "157"} jobs)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Phone className="h-5 w-5" />
            <span>Contact Information</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Mobile Number</Label>
              <Input defaultValue={user?.mobile} disabled={!isEditing} />
            </div>
            <div className="space-y-2">
              <Label>Email Address</Label>
              <Input defaultValue={user?.email || "worker@example.com"} disabled={!isEditing} />
            </div>
          </div>
          
          {user?.address && (
            <div className="space-y-2">
              <Label>Address</Label>
              <Textarea 
                defaultValue={`${user.address.street}, ${user.address.city}, ${user.address.state} - ${user.address.pincode}`}
                disabled={!isEditing}
                rows={3}
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Professional Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Award className="h-5 w-5" />
            <span>Professional Details</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Work Category</Label>
              <Input defaultValue={user?.workCategory} disabled />
              <p className="text-xs text-muted-foreground">Contact support to change category</p>
            </div>
            <div className="space-y-2">
              <Label>Experience Level</Label>
              <Input defaultValue={user?.experience || "2 years"} disabled={!isEditing} />
            </div>
            <div className="space-y-2">
              <Label>Shift Preference</Label>
              <Input defaultValue={user?.shiftType || "full-time"} disabled={!isEditing} />
            </div>
            <div className="space-y-2">
              <Label>Aadhaar Number</Label>
              <div className="flex items-center space-x-2">
                <Input defaultValue={user?.aadhaarNumber} disabled />
                <CheckCircle className="h-5 w-5 text-green-500" />
              </div>
              <p className="text-xs text-green-600">Verified ✓</p>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Skills & Description</Label>
            <Textarea 
              placeholder="Describe your skills, specializations, and experience..."
              disabled={!isEditing}
              rows={4}
              defaultValue="Experienced plumber with 2+ years in residential and commercial plumbing. Specializes in pipe repairs, installations, and maintenance."
            />
          </div>
        </CardContent>
      </Card>

      {/* Verification Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5" />
            <span>Verification Status</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <div>
                  <p className="font-medium">Aadhaar Verification</p>
                  <p className="text-sm text-muted-foreground">Identity verified</p>
                </div>
              </div>
              <Badge className="bg-green-500">Verified</Badge>
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <div>
                  <p className="font-medium">Mobile Verification</p>
                  <p className="text-sm text-muted-foreground">Phone number verified</p>
                </div>
              </div>
              <Badge className="bg-green-500">Verified</Badge>
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <div>
                  <p className="font-medium">Profile Review</p>
                  <p className="text-sm text-muted-foreground">Profile reviewed and approved</p>
                </div>
              </div>
              <Badge className="bg-green-500">Verified</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Account Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Settings className="h-5 w-5" />
            <span>Account Settings</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Change Password</Label>
            <Input 
              type="password" 
              placeholder="Enter new password" 
              disabled={!isEditing}
            />
          </div>
          <div className="space-y-2">
            <Label>Confirm Password</Label>
            <Input 
              type="password" 
              placeholder="Confirm new password" 
              disabled={!isEditing}
            />
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)} className="flex-1">
            <Settings className="h-4 w-4 mr-2" />
            Edit Profile
          </Button>
        ) : (
          <>
            <Button onClick={() => setIsEditing(false)} className="flex-1">
              <CheckCircle className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setIsEditing(false)}
              className="flex-1"
            >
              Cancel
            </Button>
          </>
        )}
        {onClose && (
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        )}
      </div>
    </div>
  );
}