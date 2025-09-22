import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { MapPin, Clock, DollarSign, User, Phone, AlertCircle, CheckCircle, Filter, Search } from 'lucide-react';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Task, User as UserType } from '../../App';

interface TaskBoardProps {
  user: UserType;
  onApplyToTask: (taskId: string) => void;
}

// Mock tasks data
const mockTasks: Task[] = [
  {
    id: 't1',
    customerId: 'c1',
    customerName: 'Anita Sharma',
    title: 'Kitchen Faucet Repair',
    description: 'Kitchen faucet is leaking from the base. Need someone experienced to fix it quickly. Water is dripping continuously and causing wastage.',
    category: 'Plumbing',
    location: 'Koramangala, Bangalore',
    budget: 800,
    urgency: 'high',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    deadline: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // tomorrow
    status: 'posted',
    requirements: ['Bring tools', 'Experience with modern faucets', 'Available today'],
    contactInfo: {
      phone: '9876543210',
      email: 'anita@example.com'
    }
  },
  {
    id: 't2',
    customerId: 'c2',
    customerName: 'Raj Patel',
    title: 'Living Room Painting',
    description: 'Need to paint the living room walls. Room is 12x14 feet. Prefer white color with some accent wall. All materials will be provided.',
    category: 'Painting',
    location: 'Indiranagar, Bangalore',
    budget: 3500,
    urgency: 'medium',
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
    deadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days
    status: 'posted',
    requirements: ['Bring brushes and rollers', '2-day work', 'Clean finish'],
    contactInfo: {
      phone: '9876543211'
    }
  },
  {
    id: 't3',
    customerId: 'c3',
    customerName: 'Meera Reddy',
    title: 'Deep House Cleaning',
    description: 'Need thorough cleaning of 2BHK apartment. Kitchen, bathrooms, all rooms including balcony. Post-renovation cleaning required.',
    category: 'Cleaning',
    location: 'Whitefield, Bangalore',
    budget: 2000,
    urgency: 'low',
    createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(), // 8 hours ago
    deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 1 week
    status: 'posted',
    requirements: ['Bring cleaning supplies', '6-8 hours work', 'Experienced in post-renovation cleaning'],
    contactInfo: {
      phone: '9876543212',
      email: 'meera@example.com'
    }
  },
  {
    id: 't4',
    customerId: 'c4',
    customerName: 'Kumar Singh',
    title: 'Fan Installation & Wiring',
    description: 'Need to install 3 ceiling fans in bedrooms. Wiring is already done, just need installation and testing. Old fans need to be removed.',
    category: 'Electrical',
    location: 'HSR Layout, Bangalore',
    budget: 1200,
    urgency: 'medium',
    createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(), // 12 hours ago
    deadline: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days
    status: 'posted',
    requirements: ['Ladder will be provided', 'Test all connections', 'Clean installation'],
    contactInfo: {
      phone: '9876543213'
    }
  },
  {
    id: 't5',
    customerId: 'c5',
    customerName: 'Priya Nair',
    title: 'Kitchen Cabinet Repair',
    description: 'Kitchen cabinet door hinges are broken and drawer slides need replacement. 3 cabinets and 2 drawers need fixing.',
    category: 'Carpentry',
    location: 'Electronic City, Bangalore',
    budget: 1500,
    urgency: 'low',
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    deadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days
    status: 'posted',
    requirements: ['Bring replacement hinges', 'Measure accurately', 'Warranty on work'],
    contactInfo: {
      phone: '9876543214',
      email: 'priya@example.com'
    }
  }
];

export function TaskBoard({ user, onApplyToTask }: TaskBoardProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterUrgency, setFilterUrgency] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    // Filter tasks by worker's category or show all if no specific category
    let relevantTasks = user.workCategory 
      ? mockTasks.filter(task => task.category === user.workCategory)
      : mockTasks;
    
    setTasks(relevantTasks);
    setFilteredTasks(relevantTasks);
  }, [user.workCategory]);

  useEffect(() => {
    let filtered = tasks;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.customerName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (filterCategory !== 'all') {
      filtered = filtered.filter(task => task.category === filterCategory);
    }

    // Filter by urgency
    if (filterUrgency !== 'all') {
      filtered = filtered.filter(task => task.urgency === filterUrgency);
    }

    // Sort tasks
    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'oldest':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case 'budget-high':
          return b.budget - a.budget;
        case 'budget-low':
          return a.budget - b.budget;
        case 'urgency':
          const urgencyOrder = { high: 3, medium: 2, low: 1 };
          return urgencyOrder[b.urgency] - urgencyOrder[a.urgency];
        default:
          return 0;
      }
    });

    setFilteredTasks(filtered);
  }, [tasks, searchTerm, filterCategory, filterUrgency, sortBy]);

  const getUrgencyBadge = (urgency: string) => {
    switch (urgency) {
      case 'high':
        return <Badge className="bg-red-100 text-red-800">🔥 Urgent</Badge>;
      case 'medium':
        return <Badge className="bg-yellow-100 text-yellow-800">⚡ Medium</Badge>;
      case 'low':
        return <Badge className="bg-green-100 text-green-800">📅 Low</Badge>;
      default:
        return <Badge variant="outline">{urgency}</Badge>;
    }
  };

  const getTimeAgo = (dateString: string) => {
    const now = new Date();
    const past = new Date(dateString);
    const diffInHours = Math.floor((now.getTime() - past.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  const categories = ['all', ...Array.from(new Set(mockTasks.map(task => task.category)))];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Available Tasks</CardTitle>
          <CardDescription>
            {filteredTasks.length} tasks available in your category
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Search Tasks</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search tasks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Urgency</label>
              <Select value={filterUrgency} onValueChange={setFilterUrgency}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Urgency</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Sort By</label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="budget-high">Budget: High to Low</SelectItem>
                  <SelectItem value="budget-low">Budget: Low to High</SelectItem>
                  <SelectItem value="urgency">Most Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredTasks.map((task) => (
          <Card key={task.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback>
                      {task.customerName.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{task.title}</h3>
                    <p className="text-sm text-muted-foreground">by {task.customerName}</p>
                  </div>
                </div>
                {getUrgencyBadge(task.urgency)}
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Description */}
              <p className="text-sm text-muted-foreground line-clamp-3">
                {task.description}
              </p>

              {/* Task Details */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center space-x-1">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{task.location}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <span className="font-semibold">₹{task.budget}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{getTimeAgo(task.createdAt)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Badge variant="outline" className="text-xs">
                    {task.category}
                  </Badge>
                </div>
              </div>

              {/* Requirements */}
              {task.requirements && task.requirements.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm font-medium">Requirements:</p>
                  <div className="space-y-1">
                    {task.requirements.slice(0, 3).map((req, index) => (
                      <div key={index} className="flex items-center space-x-2 text-xs">
                        <CheckCircle className="h-3 w-3 text-green-600 flex-shrink-0" />
                        <span className="text-muted-foreground">{req}</span>
                      </div>
                    ))}
                    {task.requirements.length > 3 && (
                      <p className="text-xs text-muted-foreground">
                        +{task.requirements.length - 3} more requirements
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Deadline */}
              {task.deadline && (
                <div className="flex items-center space-x-2 text-sm">
                  <AlertCircle className="h-4 w-4 text-orange-500" />
                  <span className="text-muted-foreground">
                    Deadline: {new Date(task.deadline).toLocaleDateString()}
                  </span>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-2 pt-4 border-t">
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    if (task.contactInfo?.phone) {
                      window.open(`tel:${task.contactInfo.phone}`);
                    }
                  }}
                >
                  <Phone className="h-4 w-4 mr-1" />
                  Contact
                </Button>
                <Button
                  size="sm"
                  className="flex-1"
                  onClick={() => onApplyToTask(task.id)}
                >
                  <User className="h-4 w-4 mr-1" />
                  Apply Now
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTasks.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <div className="text-muted-foreground">
              <AlertCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <h3 className="font-medium mb-2">No tasks found</h3>
              <p>Try adjusting your filters or check back later for new tasks.</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}