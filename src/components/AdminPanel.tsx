import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { 
  Users, 
  LogOut, 
  Search,
  Shield,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  XCircle,
  Eye
} from 'lucide-react';
import { User as UserType } from '../App';

interface AdminPanelProps {
  user: UserType | null;
  onLogout: () => void;
}

// Mock admin user for demo
const mockAdminUser = {
  id: 'admin',
  fullName: 'Admin User',
  email: 'admin@workconnect.com',
  mobile: '9999999999',
  type: 'admin' as const
};

// Mock data for customers
const mockCustomers = [
  {
    id: '1',
    fullName: 'John Doe',
    email: 'john@example.com',
    mobile: '9876543210',
    joinDate: '2024-01-01',
    totalBookings: 12,
    status: 'Active'
  },
  {
    id: '2',
    fullName: 'Jane Smith',
    email: 'jane@example.com',
    mobile: '9876543211',
    joinDate: '2024-01-05',
    totalBookings: 8,
    status: 'Active'
  },
  {
    id: '3',
    fullName: 'Robert Johnson',
    email: 'robert@example.com',
    mobile: '9876543212',
    joinDate: '2024-01-10',
    totalBookings: 0,
    status: 'Inactive'
  }
];

// Mock data for laborers
const mockLaborers = [
  {
    id: '1',
    fullName: 'Rajesh Kumar',
    email: 'rajesh@example.com',
    mobile: '9876543212',
    workCategory: 'Plumber',
    aadhaarNumber: '1234-5678-9012',
    joinDate: '2024-01-01',
    completedJobs: 157,
    rating: 4.8,
    status: 'Verified',
    earnings: 32000
  },
  {
    id: '2',
    fullName: 'Suresh Patel',
    email: 'suresh@example.com',
    mobile: '9876543213',
    workCategory: 'Electrician',
    aadhaarNumber: '2345-6789-0123',
    joinDate: '2024-01-02',
    completedJobs: 203,
    rating: 4.6,
    status: 'Verified',
    earnings: 45500
  },
  {
    id: '3',
    fullName: 'Amit Singh',
    email: 'amit@example.com',
    mobile: '9876543214',
    workCategory: 'Carpenter',
    aadhaarNumber: '3456-7890-1234',
    joinDate: '2024-01-15',
    completedJobs: 89,
    rating: 4.9,
    status: 'Pending',
    earnings: 28900
  }
];

// Mock booking data
const mockBookings = [
  {
    id: '1',
    customerName: 'John Doe',
    workerName: 'Rajesh Kumar',
    service: 'Plumbing',
    date: '2024-01-15',
    amount: '₹800',
    status: 'Completed'
  },
  {
    id: '2',
    customerName: 'Jane Smith',
    workerName: 'Suresh Patel',
    service: 'Electrical',
    date: '2024-01-14',
    amount: '₹1200',
    status: 'Completed'
  },
  {
    id: '3',
    customerName: 'Robert Johnson',
    workerName: 'Amit Singh',
    service: 'Carpentry',
    date: '2024-01-12',
    amount: '₹2500',
    status: 'Cancelled'
  }
];

// Mock platform statistics
const mockStats = {
  totalCustomers: 1248,
  totalLaborers: 356,
  totalBookings: 5679,
  totalRevenue: 2845000,
  averageRating: 4.7,
  completionRate: 94.2
};

export function AdminPanel({ user, onLogout }: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');

  // Use mock admin user for demo if not provided
  const currentUser = user || mockAdminUser;

  const handleVerifyLaborer = (laborerId: string) => {
    alert(`Laborer ${laborerId} has been verified.`);
  };

  const handleRejectLaborer = (laborerId: string) => {
    alert(`Laborer ${laborerId} verification has been rejected.`);
  };

  const handleViewDetails = (type: string, id: string) => {
    alert(`Viewing detailed information for ${type} ID: ${id}`);
  };

  const filteredCustomers = mockCustomers.filter(customer =>
    customer.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredLaborers = mockLaborers.filter(laborer =>
    laborer.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    laborer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    laborer.workCategory.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-primary mr-3" />
              <h1 className="text-xl text-primary">Admin Panel</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">
                Welcome, {currentUser.fullName}
              </span>
              <Button variant="outline" size="sm" onClick={onLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-8">
          <Button 
            variant={activeTab === 'overview' ? 'default' : 'outline'}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </Button>
          <Button 
            variant={activeTab === 'customers' ? 'default' : 'outline'}
            onClick={() => setActiveTab('customers')}
          >
            Customers ({mockStats.totalCustomers})
          </Button>
          <Button 
            variant={activeTab === 'laborers' ? 'default' : 'outline'}
            onClick={() => setActiveTab('laborers')}
          >
            Workers ({mockStats.totalLaborers})
          </Button>
          <Button 
            variant={activeTab === 'bookings' ? 'default' : 'outline'}
            onClick={() => setActiveTab('bookings')}
          >
            Bookings ({mockStats.totalBookings})
          </Button>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="text-center">
                    <Users className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                    <p className="text-2xl">{mockStats.totalCustomers}</p>
                    <p className="text-sm text-muted-foreground">Customers</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="text-center">
                    <Users className="h-8 w-8 text-green-500 mx-auto mb-2" />
                    <p className="text-2xl">{mockStats.totalLaborers}</p>
                    <p className="text-sm text-muted-foreground">Workers</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="text-center">
                    <TrendingUp className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                    <p className="text-2xl">{mockStats.totalBookings}</p>
                    <p className="text-sm text-muted-foreground">Bookings</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="text-center">
                    <TrendingUp className="h-8 w-8 text-orange-500 mx-auto mb-2" />
                    <p className="text-lg">₹{(mockStats.totalRevenue / 100000).toFixed(1)}L</p>
                    <p className="text-sm text-muted-foreground">Revenue</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="text-center">
                    <CheckCircle className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                    <p className="text-2xl">{mockStats.averageRating}⭐</p>
                    <p className="text-sm text-muted-foreground">Avg Rating</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="text-center">
                    <CheckCircle className="h-8 w-8 text-teal-500 mx-auto mb-2" />
                    <p className="text-2xl">{mockStats.completionRate}%</p>
                    <p className="text-sm text-muted-foreground">Success Rate</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest platform activities and alerts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                    <AlertCircle className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="font-medium">New worker registration</p>
                      <p className="text-sm text-muted-foreground">Amit Singh (Carpenter) pending verification</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <div>
                      <p className="font-medium">Booking completed</p>
                      <p className="text-sm text-muted-foreground">John Doe → Rajesh Kumar (Plumbing) - ₹800</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 bg-orange-50 rounded-lg">
                    <AlertCircle className="h-5 w-5 text-orange-500" />
                    <div>
                      <p className="font-medium">Customer complaint</p>
                      <p className="text-sm text-muted-foreground">Service quality concern reported - needs review</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Customers Tab */}
        {activeTab === 'customers' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Customer Management</CardTitle>
                <CardDescription>View and manage customer accounts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <Input
                    placeholder="Search customers..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="max-w-sm"
                  />
                </div>
                
                <div className="space-y-4">
                  {filteredCustomers.map(customer => (
                    <div key={customer.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="bg-blue-100 rounded-full p-2">
                          <Users className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium">{customer.fullName}</p>
                          <p className="text-sm text-muted-foreground">{customer.email}</p>
                          <p className="text-sm text-muted-foreground">{customer.mobile}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge variant={customer.status === 'Active' ? 'default' : 'secondary'}>
                            {customer.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {customer.totalBookings} bookings • Joined {customer.joinDate}
                        </p>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleViewDetails('customer', customer.id)}
                          className="mt-2"
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Laborers Tab */}
        {activeTab === 'laborers' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Worker Management</CardTitle>
                <CardDescription>Verify and manage worker accounts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <Input
                    placeholder="Search workers..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="max-w-sm"
                  />
                </div>
                
                <div className="space-y-4">
                  {filteredLaborers.map(laborer => (
                    <div key={laborer.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="bg-green-100 rounded-full p-2">
                          <Users className="h-4 w-4 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium">{laborer.fullName}</p>
                          <p className="text-sm text-muted-foreground">{laborer.email}</p>
                          <p className="text-sm text-muted-foreground">{laborer.mobile}</p>
                          <p className="text-sm text-muted-foreground">Aadhaar: {laborer.aadhaarNumber}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge variant="secondary">{laborer.workCategory}</Badge>
                          <Badge 
                            variant={laborer.status === 'Verified' ? 'default' : 'destructive'}
                            className={laborer.status === 'Verified' ? 'bg-green-500' : ''}
                          >
                            {laborer.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">
                          {laborer.completedJobs} jobs • {laborer.rating}⭐ • ₹{laborer.earnings}
                        </p>
                        <div className="flex space-x-2">
                          {laborer.status === 'Pending' && (
                            <>
                              <Button 
                                size="sm" 
                                onClick={() => handleVerifyLaborer(laborer.id)}
                                className="bg-green-500 hover:bg-green-600"
                              >
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Verify
                              </Button>
                              <Button 
                                size="sm" 
                                variant="destructive"
                                onClick={() => handleRejectLaborer(laborer.id)}
                              >
                                <XCircle className="h-4 w-4 mr-1" />
                                Reject
                              </Button>
                            </>
                          )}
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleViewDetails('laborer', laborer.id)}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Bookings Tab */}
        {activeTab === 'bookings' && (
          <Card>
            <CardHeader>
              <CardTitle>Booking Management</CardTitle>
              <CardDescription>Monitor all platform bookings and transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockBookings.map(booking => (
                  <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="bg-purple-100 rounded-full p-2">
                        <TrendingUp className="h-4 w-4 text-purple-600" />
                      </div>
                      <div>
                        <p className="font-medium">{booking.customerName} → {booking.workerName}</p>
                        <p className="text-sm text-muted-foreground">{booking.service} service</p>
                        <p className="text-sm text-muted-foreground">Date: {booking.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge 
                          variant={booking.status === 'Completed' ? 'default' : 'destructive'}
                          className={booking.status === 'Completed' ? 'bg-green-500' : ''}
                        >
                          {booking.status}
                        </Badge>
                        <span className="font-medium">{booking.amount}</span>
                      </div>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleViewDetails('booking', booking.id)}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}