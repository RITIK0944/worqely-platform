import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  Calendar,
  Clock,
  User,
  MapPin,
  Star,
  Phone,
  MessageSquare,
  Download,
  RefreshCw
} from 'lucide-react';
import { User as UserType } from '../../App';

interface BookingHistoryProps {
  user: UserType;
}

// Mock booking data
const mockCurrentBookings = [
  {
    id: 'BK001',
    workerName: 'Rajesh Kumar',
    workerPhone: '9876543210',
    service: 'Plumber',
    date: '2024-01-20',
    time: '2:00 PM - 4:00 PM',
    location: 'Sector 15, Gurgaon',
    amount: '₹800',
    status: 'Confirmed',
    description: 'Kitchen sink leakage repair'
  },
  {
    id: 'BK002',
    workerName: 'Suresh Patel',
    workerPhone: '9876543211',
    service: 'Electrician',
    date: '2024-01-22',
    time: '10:00 AM - 12:00 PM',
    location: 'MG Road, Delhi',
    amount: '₹1200',
    status: 'In Progress',
    description: 'Electrical wiring installation'
  }
];

const mockPreviousBookings = [
  {
    id: 'BK003',
    workerName: 'Amit Singh',
    workerPhone: '9876543212',
    service: 'Carpenter',
    date: '2024-01-15',
    time: '9:00 AM - 6:00 PM',
    location: 'Connaught Place, Delhi',
    amount: '₹2500',
    status: 'Completed',
    description: 'Kitchen cabinet installation',
    rating: 5,
    review: 'Excellent work, very professional'
  },
  {
    id: 'BK004',
    workerName: 'Manoj Sharma',
    workerPhone: '9876543213',
    service: 'Painter',
    date: '2024-01-10',
    time: '8:00 AM - 5:00 PM',
    location: 'Saket, Delhi',
    amount: '₹3200',
    status: 'Completed',
    description: 'Living room painting',
    rating: 4,
    review: 'Good work, completed on time'
  },
  {
    id: 'BK005',
    workerName: 'Ravi Yadav',
    workerPhone: '9876543214',
    service: 'Plumber',
    date: '2024-01-08',
    time: '3:00 PM - 5:00 PM',
    location: 'Lajpat Nagar, Delhi',
    amount: '₹600',
    status: 'Cancelled',
    description: 'Bathroom tap repair',
    cancelReason: 'Worker unavailable'
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Confirmed': return 'bg-blue-500';
    case 'In Progress': return 'bg-yellow-500';
    case 'Completed': return 'bg-green-500';
    case 'Cancelled': return 'bg-red-500';
    default: return 'bg-gray-500';
  }
};

export function BookingHistory({ user }: BookingHistoryProps) {
  const [activeTab, setActiveTab] = useState('current');

  const handleCallWorker = (phone: string, name: string) => {
    alert(`Calling ${name} at ${phone}`);
  };

  const handleChatWorker = (workerId: string, name: string) => {
    alert(`Opening chat with ${name}`);
  };

  const handleRebookService = (booking: any) => {
    alert(`Rebooking ${booking.service} service with ${booking.workerName}`);
  };

  const handleDownloadReceipt = (bookingId: string) => {
    alert(`Downloading receipt for booking ${bookingId}`);
  };

  const renderBookingCard = (booking: any, isCurrent = true) => (
    <Card key={booking.id} className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="bg-primary/10 rounded-full p-2">
              <User className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-medium">{booking.workerName}</h3>
              <p className="text-sm text-muted-foreground">{booking.service}</p>
            </div>
          </div>
          <div className="text-right">
            <Badge className={`${getStatusColor(booking.status)} text-white`}>
              {booking.status}
            </Badge>
            <p className="text-lg font-medium mt-1">{booking.amount}</p>
          </div>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 mr-2" />
            {booking.date}
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="h-4 w-4 mr-2" />
            {booking.time}
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 mr-2" />
            {booking.location}
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-4">{booking.description}</p>

        {booking.rating && (
          <div className="mb-4 p-3 bg-muted rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-4 w-4 ${i < booking.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} 
                  />
                ))}
              </div>
              <span className="text-sm font-medium">Your Rating</span>
            </div>
            {booking.review && (
              <p className="text-sm text-muted-foreground">"{booking.review}"</p>
            )}
          </div>
        )}

        {booking.cancelReason && (
          <div className="mb-4 p-3 bg-red-50 rounded-lg">
            <p className="text-sm text-red-700">Cancelled: {booking.cancelReason}</p>
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          {isCurrent && (
            <>
              <Button size="sm" onClick={() => handleCallWorker(booking.workerPhone, booking.workerName)}>
                <Phone className="h-4 w-4 mr-1" />
                Call
              </Button>
              <Button size="sm" variant="outline" onClick={() => handleChatWorker(booking.id, booking.workerName)}>
                <MessageSquare className="h-4 w-4 mr-1" />
                Chat
              </Button>
            </>
          )}
          
          {!isCurrent && booking.status === 'Completed' && (
            <Button size="sm" variant="outline" onClick={() => handleRebookService(booking)}>
              <RefreshCw className="h-4 w-4 mr-1" />
              Book Again
            </Button>
          )}
          
          <Button size="sm" variant="outline" onClick={() => handleDownloadReceipt(booking.id)}>
            <Download className="h-4 w-4 mr-1" />
            Receipt
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Booking History</CardTitle>
          <CardDescription>Track your current and past service bookings</CardDescription>
        </CardHeader>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="current" className="flex items-center space-x-2">
            <Clock className="h-4 w-4" />
            <span>Current Bookings ({mockCurrentBookings.length})</span>
          </TabsTrigger>
          <TabsTrigger value="previous" className="flex items-center space-x-2">
            <Calendar className="h-4 w-4" />
            <span>Previous Bookings ({mockPreviousBookings.length})</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="current" className="space-y-4">
          {mockCurrentBookings.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-medium mb-2">No Current Bookings</h3>
                <p className="text-muted-foreground">You don't have any active bookings right now.</p>
              </CardContent>
            </Card>
          ) : (
            mockCurrentBookings.map(booking => renderBookingCard(booking, true))
          )}
        </TabsContent>

        <TabsContent value="previous" className="space-y-4">
          {mockPreviousBookings.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-medium mb-2">No Previous Bookings</h3>
                <p className="text-muted-foreground">Your completed bookings will appear here.</p>
              </CardContent>
            </Card>
          ) : (
            mockPreviousBookings.map(booking => renderBookingCard(booking, false))
          )}
        </TabsContent>
      </Tabs>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{mockPreviousBookings.filter(b => b.status === 'Completed').length}</div>
            <div className="text-sm text-muted-foreground">Completed Services</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">
              ₹{mockPreviousBookings.filter(b => b.status === 'Completed').reduce((sum, b) => sum + parseInt(b.amount.replace('₹', '').replace(',', '')), 0).toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">Total Spent</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">
              {mockPreviousBookings.filter(b => b.rating).length > 0 ? 
                (mockPreviousBookings.filter(b => b.rating).reduce((sum, b) => sum + (b.rating || 0), 0) / mockPreviousBookings.filter(b => b.rating).length).toFixed(1) : 
                '0'
              }⭐
            </div>
            <div className="text-sm text-muted-foreground">Average Rating Given</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}