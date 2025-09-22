import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { 
  CheckCircle, 
  XCircle, 
  Phone, 
  MapPin, 
  Clock, 
  DollarSign,
  Filter,
  Search
} from 'lucide-react';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { User as UserType } from '../../App';

interface AvailableTasksProps {
  user: UserType | null;
  displayMode?: 'full' | 'dashboard';
  limit?: number;
}

// Mock data for work requests
const mockWorkRequests = [
  {
    id: '1',
    customerName: 'Rajesh Sharma',
    customerMobile: '9876543210',
    serviceType: 'Plumbing',
    description: 'Kitchen sink leakage repair needed urgently',
    location: 'Sector 15, Gurgaon',
    distance: '2.5 km',
    requestTime: '2 hours ago',
    estimatedPayment: '₹800',
    urgency: 'High',
    estimatedDuration: '2-3 hours'
  },
  {
    id: '2',
    customerName: 'Priya Patel',
    customerMobile: '9876543211',
    serviceType: 'Plumbing',
    description: 'Bathroom tap installation',
    location: 'MG Road, Delhi',
    distance: '5.2 km',
    requestTime: '4 hours ago',
    estimatedPayment: '₹1200',
    urgency: 'Medium',
    estimatedDuration: '1-2 hours'
  },
  {
    id: '3',
    customerName: 'Amit Kumar',
    customerMobile: '9876543212',
    serviceType: 'Plumbing',
    description: 'Water tank overflow issue',
    location: 'Connaught Place, Delhi',
    distance: '8.1 km',
    requestTime: '6 hours ago',
    estimatedPayment: '₹600',
    urgency: 'Low',
    estimatedDuration: '3-4 hours'
  },
  {
    id: '4',
    customerName: 'Sunita Singh',
    customerMobile: '9876543213',
    serviceType: 'Plumbing',
    description: 'Bathroom pipe replacement required',
    location: 'Koramangala, Bangalore',
    distance: '3.8 km',
    requestTime: '1 hour ago',
    estimatedPayment: '₹1500',
    urgency: 'High',
    estimatedDuration: '3-4 hours'
  },
  {
    id: '5',
    customerName: 'Vikram Gupta',
    customerMobile: '9876543214',
    serviceType: 'Plumbing',
    description: 'Water heater installation and connection',
    location: 'Indiranagar, Bangalore',
    distance: '4.2 km',
    requestTime: '3 hours ago',
    estimatedPayment: '₹2000',
    urgency: 'Medium',
    estimatedDuration: '2-3 hours'
  }
];

export function AvailableTasks({ user, displayMode = 'full', limit }: AvailableTasksProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [urgencyFilter, setUrgencyFilter] = useState('all');
  const [lastRefresh, setLastRefresh] = useState(new Date());
  
  // Auto-refresh tasks every 5 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      setLastRefresh(new Date());
    }, 5 * 60 * 1000); // 5 minutes
    
    return () => clearInterval(interval);
  }, []);

  const handleAcceptRequest = (requestId: string) => {
    alert(`Request ${requestId} accepted! Customer will be notified.`);
  };

  const handleRejectRequest = (requestId: string) => {
    alert(`Request ${requestId} rejected.`);
  };

  const handleCallCustomer = (request: any) => {
    alert(`Calling ${request.customerName} at ${request.customerMobile}`);
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'High': return 'bg-red-500';
      case 'Medium': return 'bg-yellow-500';
      case 'Low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  let filteredRequests = mockWorkRequests.filter(request => {
    const matchesSearch = request.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesUrgency = urgencyFilter === 'all' || request.urgency.toLowerCase() === urgencyFilter;
    return matchesSearch && matchesUrgency;
  });

  // Apply limit for dashboard mode
  if (displayMode === 'dashboard' && limit) {
    filteredRequests = filteredRequests.slice(0, limit);
  }

  // Dashboard mode renders tasks more compactly
  if (displayMode === 'dashboard') {
    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
          <span>Refreshed: {lastRefresh.toLocaleTimeString()}</span>
          <span className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>Auto-updating</span>
          </span>
        </div>
        {filteredRequests.map(request => (
          <Card key={request.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-medium">{request.customerName}</h4>
                    <Badge 
                      variant="secondary" 
                      className={`text-white text-xs ${getUrgencyColor(request.urgency)}`}
                    >
                      {request.urgency}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2 line-clamp-1">{request.description}</p>
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <span className="flex items-center">
                      <MapPin className="h-3 w-3 mr-1" />
                      {request.distance}
                    </span>
                    <span className="flex items-center text-green-600 font-medium">
                      <DollarSign className="h-3 w-3 mr-1" />
                      {request.estimatedPayment}
                    </span>
                  </div>
                </div>
                <Button size="sm" onClick={() => handleAcceptRequest(request.id)}>
                  Accept
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
        {filteredRequests.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <CheckCircle className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>No new tasks available right now</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <span>Available Tasks</span>
            <Badge variant="secondary">{filteredRequests.length} Tasks</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search tasks by description, customer, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={urgencyFilter} onValueChange={setUrgencyFilter}>
              <SelectTrigger className="w-[180px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by urgency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Urgency</SelectItem>
                <SelectItem value="high">High Priority</SelectItem>
                <SelectItem value="medium">Medium Priority</SelectItem>
                <SelectItem value="low">Low Priority</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Task list */}
      <div className="space-y-4">
        {filteredRequests.map(request => (
          <Card key={request.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg">{request.customerName}</h3>
                      <Badge 
                        variant="secondary" 
                        className={`text-white ${getUrgencyColor(request.urgency)}`}
                      >
                        {request.urgency} Priority
                      </Badge>
                    </div>
                    <p className="text-muted-foreground mb-3">{request.description}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center text-muted-foreground">
                        <MapPin className="h-4 w-4 mr-2" />
                        {request.location} ({request.distance})
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <Clock className="h-4 w-4 mr-2" />
                        Duration: {request.estimatedDuration}
                      </div>
                      <div className="flex items-center text-green-600">
                        <DollarSign className="h-4 w-4 mr-2" />
                        <span className="font-medium">{request.estimatedPayment}</span>
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <Clock className="h-4 w-4 mr-2" />
                        Posted {request.requestTime}
                      </div>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button 
                    onClick={() => handleAcceptRequest(request.id)}
                    className="flex-1"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Accept Task
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => handleCallCustomer(request)}
                    className="flex-1 sm:flex-none"
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Call Customer
                  </Button>
                  <Button 
                    variant="destructive"
                    onClick={() => handleRejectRequest(request.id)}
                    className="flex-1 sm:flex-none"
                  >
                    <XCircle className="h-4 w-4 mr-2" />
                    Decline
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredRequests.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <CheckCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg mb-2">No tasks available</h3>
            <p className="text-muted-foreground">
              {searchTerm || urgencyFilter !== 'all' 
                ? 'No tasks match your current filters. Try adjusting your search criteria.'
                : 'No new tasks are available right now. Check back later for new opportunities.'
              }
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}