import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  Star,
  Search,
  Filter,
  Calendar,
  Download,
  DollarSign,
  MapPin,
  Phone
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { User as UserType } from '../../App';

interface WorkHistoryProps {
  user: UserType | null;
}

// Mock work history data
const mockWorkHistory = [
  {
    id: '1',
    customerName: 'Rajesh Sharma',
    customerMobile: '9876543210',
    serviceType: 'Plumbing',
    description: 'Kitchen sink repair and pipe replacement',
    location: 'Sector 15, Gurgaon',
    date: '2024-01-20',
    completedDate: '2024-01-20',
    status: 'completed',
    payment: 800,
    rating: 5,
    review: 'Excellent work! Very professional and completed on time.',
    duration: '3 hours',
    photos: 2
  },
  {
    id: '2',
    customerName: 'Priya Patel',
    customerMobile: '9876543211',
    serviceType: 'Plumbing',
    description: 'Bathroom tap installation and water pressure check',
    location: 'MG Road, Delhi',
    date: '2024-01-19',
    completedDate: '2024-01-19',
    status: 'completed',
    payment: 1200,
    rating: 4,
    review: 'Good work, but took a bit longer than expected.',
    duration: '4 hours',
    photos: 3
  },
  {
    id: '3',
    customerName: 'Vikram Singh',
    customerMobile: '9876543212',
    serviceType: 'Plumbing',
    description: 'Emergency toilet repair',
    location: 'Connaught Place, Delhi',
    date: '2024-01-18',
    completedDate: '2024-01-18',
    status: 'completed',
    payment: 950,
    rating: 5,
    review: 'Quick response and perfect solution. Highly recommended!',
    duration: '2 hours',
    photos: 1
  },
  {
    id: '4',
    customerName: 'Sunita Devi',
    customerMobile: '9876543213',
    serviceType: 'Plumbing',
    description: 'Water tank cleaning and maintenance',
    location: 'Dwarka, Delhi',
    date: '2024-01-17',
    completedDate: null,
    status: 'cancelled',
    payment: 0,
    rating: 0,
    review: 'Customer cancelled due to personal reasons',
    duration: null,
    photos: 0
  },
  {
    id: '5',
    customerName: 'Amit Kumar',
    customerMobile: '9876543214',
    serviceType: 'Plumbing',
    description: 'Shower installation and bathroom renovation support',
    location: 'Karol Bagh, Delhi',
    date: '2024-01-16',
    completedDate: '2024-01-16',
    status: 'completed',
    payment: 1500,
    rating: 5,
    review: 'Excellent craftsmanship and attention to detail.',
    duration: '6 hours',
    photos: 5
  },
  {
    id: '6',
    customerName: 'Neha Gupta',
    customerMobile: '9876543215',
    serviceType: 'Plumbing',
    description: 'Pipe leak detection and repair',
    location: 'Lajpat Nagar, Delhi',
    date: '2024-01-15',
    completedDate: '2024-01-16',
    status: 'completed',
    payment: 750,
    rating: 3,
    review: 'Work was okay, but communication could be better.',
    duration: '3 hours',
    photos: 1
  }
];

export function WorkHistory({ user }: WorkHistoryProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date-desc');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'cancelled': return 'bg-red-500';
      case 'in-progress': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? 'text-yellow-500 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  const filteredAndSortedHistory = mockWorkHistory
    .filter(job => {
      const matchesSearch = 
        job.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || job.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'date-desc':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'date-asc':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 'payment-desc':
          return b.payment - a.payment;
        case 'payment-asc':
          return a.payment - b.payment;
        case 'rating-desc':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

  const stats = {
    total: mockWorkHistory.length,
    completed: mockWorkHistory.filter(j => j.status === 'completed').length,
    cancelled: mockWorkHistory.filter(j => j.status === 'cancelled').length,
    totalEarnings: mockWorkHistory.filter(j => j.status === 'completed').reduce((sum, j) => sum + j.payment, 0),
    avgRating: mockWorkHistory.filter(j => j.status === 'completed' && j.rating > 0).reduce((sum, j, _, arr) => sum + j.rating / arr.length, 0)
  };

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl">{stats.total}</p>
            <p className="text-sm text-muted-foreground">Total Jobs</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl text-green-600">{stats.completed}</p>
            <p className="text-sm text-muted-foreground">Completed</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl text-red-600">{stats.cancelled}</p>
            <p className="text-sm text-muted-foreground">Cancelled</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl">₹{stats.totalEarnings}</p>
            <p className="text-sm text-muted-foreground">Total Earned</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center space-x-1">
              <Star className="h-4 w-4 text-yellow-500 fill-current" />
              <p className="text-2xl">{stats.avgRating.toFixed(1)}</p>
            </div>
            <p className="text-sm text-muted-foreground">Avg Rating</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by customer, description, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[150px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date-desc">Latest First</SelectItem>
                <SelectItem value="date-asc">Oldest First</SelectItem>
                <SelectItem value="payment-desc">Highest Payment</SelectItem>
                <SelectItem value="payment-asc">Lowest Payment</SelectItem>
                <SelectItem value="rating-desc">Highest Rating</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Job History List */}
      <div className="space-y-4">
        {filteredAndSortedHistory.map(job => (
          <Card key={job.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-medium">{job.customerName}</h3>
                      <Badge 
                        className={`text-white ${getStatusColor(job.status)}`}
                      >
                        {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                      </Badge>
                      {job.rating > 0 && (
                        <div className="flex items-center space-x-1">
                          {renderStars(job.rating)}
                        </div>
                      )}
                    </div>
                    <p className="text-muted-foreground mb-2">{job.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-2 mb-1">
                      <DollarSign className="h-4 w-4 text-green-600" />
                      <span className="text-lg font-medium text-green-600">₹{job.payment}</span>
                    </div>
                    {job.duration && (
                      <p className="text-sm text-muted-foreground">Duration: {job.duration}</p>
                    )}
                  </div>
                </div>

                {/* Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-2" />
                    {job.location}
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-2" />
                    Started: {job.date}
                  </div>
                  {job.completedDate && (
                    <div className="flex items-center text-muted-foreground">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Completed: {job.completedDate}
                    </div>
                  )}
                </div>

                {/* Review */}
                {job.review && (
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-sm italic">"{job.review}"</p>
                  </div>
                )}

                {/* Actions */}
                <div className="flex flex-wrap gap-2">

                  {job.status === 'completed' && (
                    <>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                      {job.photos > 0 && (
                        <Button variant="outline" size="sm">
                          View Photos ({job.photos})
                        </Button>
                      )}
                    </>
                  )}
                  {job.status === 'completed' && job.rating === 0 && (
                    <Button variant="outline" size="sm">
                      Request Review
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* No Results */}
      {filteredAndSortedHistory.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg mb-2">No jobs found</h3>
            <p className="text-muted-foreground">
              {searchTerm || statusFilter !== 'all' 
                ? 'No jobs match your current filters. Try adjusting your search criteria.'
                : 'Your completed jobs will appear here.'
              }
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}