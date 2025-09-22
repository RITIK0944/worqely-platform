import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { 
  Search,
  MapPin,
  Star,
  Phone,
  Clock,
  Filter,
  Users,
  Plus,
  Briefcase,
  X
} from 'lucide-react';
import { User as UserType } from '../../App';
import { AvailableWorkers } from './AvailableWorkers';
import { TaskPosting } from './TaskPosting';

interface ServiceCategoriesProps {
  user: UserType;
  onCategorySelected?: (category: string) => void;
}

const serviceCategories = [
  { name: 'Plumber', icon: '🔧', color: 'bg-blue-500' },
  { name: 'Carpenter', icon: '🔨', color: 'bg-yellow-500' },
  { name: 'Mason', icon: '🧱', color: 'bg-gray-500' },
  { name: 'Construction Labour', icon: '👷', color: 'bg-orange-500' },
  { name: 'Maid', icon: '🧹', color: 'bg-pink-500' },
  { name: 'Cook/Chef', icon: '👨‍🍳', color: 'bg-red-500' },
  { name: 'Gardener', icon: '🌱', color: 'bg-green-500' },
  { name: 'Security Guard', icon: '👮', color: 'bg-indigo-500' },
  { name: 'General Labour', icon: '💪', color: 'bg-purple-500' },
  { name: 'Painter', icon: '🎨', color: 'bg-teal-500' },
  { name: 'Delivery Boy', icon: '🚚', color: 'bg-cyan-500' },
  { name: 'Electrician', icon: '⚡', color: 'bg-yellow-600' },
  { name: 'Welder', icon: '🔥', color: 'bg-red-600' },
  { name: 'Waiter', icon: '🍽️', color: 'bg-brown-500' },
  { name: 'Care Taker', icon: '👥', color: 'bg-emerald-500' }
];

// Mock worker data
const mockWorkers = [
  { id: '1', fullName: 'Rajesh Kumar', category: 'Plumber', rating: 4.8, jobs: 157, location: 'Within 2km', price: '₹300/hr', available: true, mobile: '9876543210' },
  { id: '2', fullName: 'Suresh Patel', category: 'Plumber', rating: 4.6, jobs: 203, location: 'Within 5km', price: '₹350/hr', available: true, mobile: '9876543211' },
  { id: '3', fullName: 'Amit Singh', category: 'Plumber', rating: 4.9, jobs: 89, location: 'Within 3km', price: '₹400/hr', available: false, mobile: '9876543212' },
  { id: '4', fullName: 'Manoj Sharma', category: 'Electrician', rating: 4.7, jobs: 134, location: 'Within 1km', price: '₹450/hr', available: true, mobile: '9876543213' },
  { id: '5', fullName: 'Ravi Yadav', category: 'Carpenter', rating: 4.5, jobs: 98, location: 'Within 4km', price: '₹380/hr', available: true, mobile: '9876543214' }
];

export function ServiceCategories({ user, onCategorySelected }: ServiceCategoriesProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [locationRadius, setLocationRadius] = useState('10');
  const [showTaskPosting, setShowTaskPosting] = useState(false);
  
  const filteredWorkers = mockWorkers.filter(worker => {
    const matchesCategory = !selectedCategory || worker.category === selectedCategory;
    const matchesSearch = worker.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         worker.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    // If onCategorySelected is provided, call it to navigate to task posting
    if (onCategorySelected) {
      onCategorySelected(category);
    }
  };

  const handleBookWorker = (worker: any) => {
    alert(`Booking ${worker.fullName} for ${worker.category} service. You will be contacted shortly!`);
  };

  const handleCallWorker = (worker: any) => {
    alert(`Calling ${worker.fullName} at ${worker.mobile}`);
  };

  const handleContactWorker = (worker: any) => {
    alert(`Contacting ${worker.fullName} at ${worker.mobile}`);
  };

  const handleAddTask = () => {
    setShowTaskPosting(true);
  };

  const handleTaskPosted = (task: any) => {
    console.log('Task posted:', task);
    alert('Task posted successfully! Workers will be notified.');
    setShowTaskPosting(false);
  };

  return (
    <div className="space-y-6">
      {/* Service Categories Grid */}
      <Card>
        <CardHeader>
          <CardTitle>Choose Service Category</CardTitle>
          <CardDescription>Select the type of service you need</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {serviceCategories.map((category) => (
              <Button
                key={category.name}
                variant={selectedCategory === category.name ? "default" : "outline"}
                className="h-24 flex flex-col items-center justify-center space-y-2"
                onClick={() => handleCategorySelect(category.name)}
              >
                <span className="text-2xl">{category.icon}</span>
                <span className="text-xs text-center">{category.name}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search workers by name or skill..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select value={locationRadius} onValueChange={setLocationRadius}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Within 1km</SelectItem>
                  <SelectItem value="5">Within 5km</SelectItem>
                  <SelectItem value="10">Within 10km</SelectItem>
                  <SelectItem value="city">Entire City</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Task Posting Option - Shows when category is selected */}
      {selectedCategory && !showTaskPosting && (
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="bg-blue-100 rounded-full p-3">
                  <Briefcase className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Post a Task for {selectedCategory}</h3>
                  <p className="text-gray-600 text-sm">
                    Describe your specific requirements and let workers bid on your task
                  </p>
                </div>
              </div>
              <Button 
                onClick={handleAddTask}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Task
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Task Posting Form */}
      {showTaskPosting && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Post Task for {selectedCategory}</h3>
            <Button 
              variant="outline" 
              onClick={() => setShowTaskPosting(false)}
            >
              <X className="h-4 w-4 mr-2" />
              Close
            </Button>
          </div>
          <TaskPosting 
            user={user}
            onTaskPosted={handleTaskPosted}
            selectedCategory={selectedCategory}
          />
        </div>
      )}

      {/* Available Workers - Now using the new component */}
      {selectedCategory && !showTaskPosting && (
        <AvailableWorkers 
          category={selectedCategory}
          onContactWorker={handleContactWorker}
        />
      )}

      {/* Emergency Service */}
      <Card className="bg-red-50 border-red-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-red-900 mb-2">Emergency Service</h3>
              <p className="text-red-700 text-sm">Need immediate help? Get connected to available workers instantly</p>
            </div>
            <Button className="bg-red-600 hover:bg-red-700 text-white">
              <Phone className="h-4 w-4 mr-2" />
              Emergency Call
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}