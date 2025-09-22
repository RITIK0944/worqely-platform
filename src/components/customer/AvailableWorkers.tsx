import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Star, MapPin, Clock, Phone, MessageCircle, Filter, Search, ChevronDown } from 'lucide-react';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { User } from '../../App';

interface AvailableWorkersProps {
  category?: string;
  onContactWorker: (worker: User) => void;
}

// Mock worker data
const mockWorkers: User[] = [
  {
    id: 'w1',
    fullName: 'Rajesh Kumar',
    mobile: '9876543210',
    type: 'labor',
    aadhaarNumber: '1234-5678-9012',
    workCategory: 'Plumbing',
    experience: '5-10 years',
    rating: 4.8,
    completedJobs: 245,
    availability: 'available',
    hourlyRate: 350,
    skills: ['Pipe Installation', 'Leak Repair', 'Bathroom Fitting'],
    isOnline: true,
    address: {
      street: 'MG Road',
      city: 'Bangalore',
      state: 'Karnataka',
      country: 'India',
      pincode: '560001'
    },
    profilePhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 'w2',
    fullName: 'Priya Sharma',
    mobile: '9876543211',
    type: 'labor',
    aadhaarNumber: '2345-6789-0123',
    workCategory: 'Electrical',
    experience: '3-5 years',
    rating: 4.6,
    completedJobs: 187,
    availability: 'available',
    hourlyRate: 400,
    skills: ['Wiring', 'Switch Installation', 'Fan Installation'],
    isOnline: true,
    address: {
      street: 'Koramangala',
      city: 'Bangalore',
      state: 'Karnataka',
      country: 'India',
      pincode: '560034'
    },
    profilePhoto: 'https://images.unsplash.com/photo-1494790108755-2616b9f24049?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 'w3',
    fullName: 'Amit Singh',
    mobile: '9876543212',
    type: 'labor',
    aadhaarNumber: '3456-7890-1234',
    workCategory: 'Painting',
    experience: '1-3 years',
    rating: 4.4,
    completedJobs: 98,
    availability: 'busy',
    hourlyRate: 280,
    skills: ['Interior Painting', 'Exterior Painting', 'Texture Work'],
    isOnline: false,
    address: {
      street: 'Indiranagar',
      city: 'Bangalore',
      state: 'Karnataka',
      country: 'India',
      pincode: '560038'
    },
    profilePhoto: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 'w4',
    fullName: 'Sunita Devi',
    mobile: '9876543213',
    type: 'labor',
    aadhaarNumber: '4567-8901-2345',
    workCategory: 'Cleaning',
    experience: '3-5 years',
    rating: 4.9,
    completedJobs: 312,
    availability: 'available',
    hourlyRate: 200,
    skills: ['Deep Cleaning', 'Kitchen Cleaning', 'Bathroom Cleaning'],
    isOnline: true,
    address: {
      street: 'Whitefield',
      city: 'Bangalore',
      state: 'Karnataka',
      country: 'India',
      pincode: '560066'
    },
    profilePhoto: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 'w5',
    fullName: 'Mohammed Ali',
    mobile: '9876543214',
    type: 'labor',
    aadhaarNumber: '5678-9012-3456',
    workCategory: 'Carpentry',
    experience: '5-10 years',
    rating: 4.7,
    completedJobs: 156,
    availability: 'available',
    hourlyRate: 450,
    skills: ['Furniture Making', 'Repair Work', 'Door Installation'],
    isOnline: true,
    address: {
      street: 'Electronic City',
      city: 'Bangalore',
      state: 'Karnataka',
      country: 'India',
      pincode: '560100'
    },
    profilePhoto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 'w6',
    fullName: 'Lakshmi Patel',
    mobile: '9876543215',
    type: 'labor',
    aadhaarNumber: '6789-0123-4567',
    workCategory: 'Cooking',
    experience: '10+ years',
    rating: 4.9,
    completedJobs: 89,
    availability: 'available',
    hourlyRate: 300,
    skills: ['Indian Cuisine', 'Party Catering', 'Home Cooking'],
    isOnline: true,
    address: {
      street: 'HSR Layout',
      city: 'Bangalore',
      state: 'Karnataka',
      country: 'India',
      pincode: '560102'
    },
    profilePhoto: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face'
  }
];

export function AvailableWorkers({ category, onContactWorker }: AvailableWorkersProps) {
  const [workers, setWorkers] = useState<User[]>([]);
  const [filteredWorkers, setFilteredWorkers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('rating');
  const [filterAvailability, setFilterAvailability] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    // Filter workers by category if specified
    let categoryWorkers = category 
      ? mockWorkers.filter(worker => worker.workCategory === category)
      : mockWorkers;
    
    setWorkers(categoryWorkers);
    setFilteredWorkers(categoryWorkers);
  }, [category]);

  useEffect(() => {
    let filtered = workers;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(worker =>
        worker.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        worker.skills?.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
        worker.address?.city.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by availability
    if (filterAvailability !== 'all') {
      filtered = filtered.filter(worker => worker.availability === filterAvailability);
    }

    // Sort workers
    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        case 'experience':
          return (b.completedJobs || 0) - (a.completedJobs || 0);
        case 'price-low':
          return (a.hourlyRate || 0) - (b.hourlyRate || 0);
        case 'price-high':
          return (b.hourlyRate || 0) - (a.hourlyRate || 0);
        default:
          return 0;
      }
    });

    setFilteredWorkers(filtered);
  }, [workers, searchTerm, sortBy, filterAvailability]);

  const getAvailabilityBadge = (availability: string, isOnline: boolean) => {
    if (availability === 'available' && isOnline) {
      return <Badge className="bg-green-100 text-green-800">● Available Now</Badge>;
    } else if (availability === 'available') {
      return <Badge className="bg-blue-100 text-blue-800">Available</Badge>;
    } else if (availability === 'busy') {
      return <Badge className="bg-yellow-100 text-yellow-800">Busy</Badge>;
    } else {
      return <Badge className="bg-gray-100 text-gray-800">Offline</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>
                {category ? `${category} Workers` : 'Available Workers'}
              </CardTitle>
              <CardDescription>
                {filteredWorkers.length} workers found in your area
              </CardDescription>
            </div>
            <Button 
              variant="outline" 
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
              <ChevronDown className={`h-4 w-4 ml-2 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </Button>
          </div>
        </CardHeader>
        
        {showFilters && (
          <CardContent className="border-t pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name, skills, location..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Sort By</label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="experience">Most Experienced</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Availability</label>
                <Select value={filterAvailability} onValueChange={setFilterAvailability}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Workers</SelectItem>
                    <SelectItem value="available">Available Only</SelectItem>
                    <SelectItem value="busy">Busy</SelectItem>
                    <SelectItem value="offline">Offline</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        )}
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredWorkers.map((worker) => (
          <Card key={worker.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={worker.profilePhoto} />
                    <AvatarFallback>
                      {worker.fullName.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{worker.fullName}</h3>
                    <p className="text-sm text-muted-foreground">{worker.workCategory}</p>
                  </div>
                </div>
                {getAvailabilityBadge(worker.availability || 'offline', worker.isOnline || false)}
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Rating and Experience */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{worker.rating}</span>
                  <span className="text-sm text-muted-foreground">
                    ({worker.completedJobs} jobs)
                  </span>
                </div>
                <div className="text-sm text-muted-foreground">
                  {worker.experience}
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{worker.address?.city}, {worker.address?.state}</span>
              </div>

              {/* Skills */}
              <div className="space-y-2">
                <p className="text-sm font-medium">Skills:</p>
                <div className="flex flex-wrap gap-1">
                  {worker.skills?.slice(0, 3).map((skill, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                  {(worker.skills?.length || 0) > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{(worker.skills?.length || 0) - 3} more
                    </Badge>
                  )}
                </div>
              </div>

              {/* Pricing */}
              <div className="flex items-center justify-between pt-2 border-t">
                <div>
                  <span className="text-lg font-semibold">₹{worker.hourlyRate}</span>
                  <span className="text-sm text-muted-foreground">/hour</span>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onContactWorker(worker)}
                  >
                    <Phone className="h-4 w-4 mr-1" />
                    Call
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => onContactWorker(worker)}
                  >
                    <MessageCircle className="h-4 w-4 mr-1" />
                    Chat
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredWorkers.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <div className="text-muted-foreground">
              <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <h3 className="font-medium mb-2">No workers found</h3>
              <p>Try adjusting your filters or search in a different category.</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}