import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { 
  Headphones, 
  MessageCircle, 
  Phone, 
  Mail,
  HelpCircle,
  Clock,
  CheckCircle,
  AlertTriangle,
  Search,
  FileText,
  Video,
  Users,
  Lightbulb
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { User as UserType } from '../../App';

interface SupportSectionProps {
  user: UserType | null;
}

const faqData = [
  {
    id: '1',
    category: 'Account',
    question: 'How do I update my profile information?',
    answer: 'You can update your profile by going to Profile Management section and clicking on Edit Profile. Make sure to save your changes after updating.'
  },
  {
    id: '2',
    category: 'Payments',
    question: 'When will I receive my payment?',
    answer: 'Payments are typically processed within 24-48 hours after job completion and customer confirmation. You will receive an SMS notification once the payment is credited.'
  },
  {
    id: '3',
    category: 'Jobs',
    question: 'Why am I not receiving job notifications?',
    answer: 'Make sure your profile is complete, you are marked as available, and your location settings are updated. Also check if you have enabled notifications in your phone settings.'
  },
  {
    id: '4',
    category: 'Premium',
    question: 'What are the benefits of Premium subscription?',
    answer: 'Premium members get priority job notifications, higher visibility, exclusive high-value jobs, dedicated support, and detailed analytics dashboard.'
  },
  {
    id: '5',
    category: 'Technical',
    question: 'The app is running slowly, what should I do?',
    answer: 'Try closing and reopening the app, ensure you have a stable internet connection, and make sure you have the latest version installed.'
  }
];

const supportTickets = [
  {
    id: 'TK001',
    subject: 'Payment not received for job #12345',
    category: 'Payments',
    status: 'open',
    priority: 'high',
    date: '2024-01-20',
    lastUpdate: '2024-01-20'
  },
  {
    id: 'TK002',
    subject: 'Unable to upload profile photo',
    category: 'Technical',
    status: 'resolved',
    priority: 'medium',
    date: '2024-01-18',
    lastUpdate: '2024-01-19'
  }
];

export function SupportSection({ user }: SupportSectionProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketCategory, setTicketCategory] = useState('');
  const [ticketDescription, setTicketDescription] = useState('');

  const categories = ['Account', 'Payments', 'Jobs', 'Premium', 'Technical', 'Insurance', 'SHG'];

  const filteredFAQs = faqData.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-blue-500';
      case 'in-progress': return 'bg-yellow-500';
      case 'resolved': return 'bg-green-500';
      case 'closed': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const handleSubmitTicket = () => {
    if (!ticketSubject || !ticketCategory || !ticketDescription) {
      alert('Please fill in all required fields');
      return;
    }
    alert('Support ticket submitted successfully! We will get back to you within 24 hours.');
    setTicketSubject('');
    setTicketCategory('');
    setTicketDescription('');
  };

  return (
    <div className="space-y-6">
      {/* Quick Support Options */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <Phone className="h-8 w-8 text-blue-500 mx-auto mb-3" />
            <h3 className="font-medium mb-2">Call Support</h3>
            <p className="text-sm text-muted-foreground mb-3">24/7 helpline available</p>
            <p className="text-blue-600 font-medium">1800-XXX-XXXX</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <MessageCircle className="h-8 w-8 text-green-500 mx-auto mb-3" />
            <h3 className="font-medium mb-2">WhatsApp</h3>
            <p className="text-sm text-muted-foreground mb-3">Chat with our team</p>
            <p className="text-green-600 font-medium">+91 XXXXX XXXXX</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <Mail className="h-8 w-8 text-purple-500 mx-auto mb-3" />
            <h3 className="font-medium mb-2">Email Support</h3>
            <p className="text-sm text-muted-foreground mb-3">Get detailed help</p>
            <p className="text-purple-600 font-medium">support@platform.com</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <Video className="h-8 w-8 text-orange-500 mx-auto mb-3" />
            <h3 className="font-medium mb-2">Video Call</h3>
            <p className="text-sm text-muted-foreground mb-3">Screen sharing support</p>
            <Button size="sm" variant="outline">Schedule</Button>
          </CardContent>
        </Card>
      </div>

      {/* Support Tabs */}
      <Tabs defaultValue="faq" className="space-y-4">
        <TabsList>
          <TabsTrigger value="faq" className="flex items-center space-x-2">
            <HelpCircle className="h-4 w-4" />
            <span>FAQ</span>
          </TabsTrigger>
          <TabsTrigger value="tickets" className="flex items-center space-x-2">
            <FileText className="h-4 w-4" />
            <span>My Tickets</span>
          </TabsTrigger>
          <TabsTrigger value="new-ticket" className="flex items-center space-x-2">
            <MessageCircle className="h-4 w-4" />
            <span>New Ticket</span>
          </TabsTrigger>
          <TabsTrigger value="resources" className="flex items-center space-x-2">
            <Lightbulb className="h-4 w-4" />
            <span>Resources</span>
          </TabsTrigger>
        </TabsList>

        {/* FAQ Tab */}
        <TabsContent value="faq">
          <div className="space-y-4">
            {/* Search and Filter */}
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search frequently asked questions..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* FAQ List */}
            <div className="space-y-3">
              {filteredFAQs.map(faq => (
                <Card key={faq.id}>
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <h3 className="font-medium pr-4">{faq.question}</h3>
                        <Badge variant="outline">{faq.category}</Badge>
                      </div>
                      <p className="text-muted-foreground text-sm">{faq.answer}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredFAQs.length === 0 && (
              <Card>
                <CardContent className="text-center py-8">
                  <HelpCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No FAQs found matching your search.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        {/* My Tickets Tab */}
        <TabsContent value="tickets">
          <div className="space-y-4">
            {supportTickets.map(ticket => (
              <Card key={ticket.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-medium">{ticket.subject}</h3>
                        <Badge className={`text-white ${getStatusColor(ticket.status)}`}>
                          {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                        </Badge>
                        <Badge className={`text-white ${getPriorityColor(ticket.priority)}`}>
                          {ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span>Ticket ID: {ticket.id}</span>
                        <span>Category: {ticket.category}</span>
                        <span>Created: {ticket.date}</span>
                        <span>Last Update: {ticket.lastUpdate}</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}

            {supportTickets.length === 0 && (
              <Card>
                <CardContent className="text-center py-8">
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No support tickets found.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        {/* New Ticket Tab */}
        <TabsContent value="new-ticket">
          <Card>
            <CardHeader>
              <CardTitle>Create Support Ticket</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Subject *</label>
                  <Input
                    placeholder="Brief description of your issue"
                    value={ticketSubject}
                    onChange={(e) => setTicketSubject(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Category *</label>
                  <Select value={ticketCategory} onValueChange={setTicketCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Description *</label>
                <Textarea
                  placeholder="Please provide detailed information about your issue..."
                  value={ticketDescription}
                  onChange={(e) => setTicketDescription(e.target.value)}
                  rows={6}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Attachments (Optional)</label>
                <Button variant="outline" size="sm">
                  Choose Files
                </Button>
                <p className="text-xs text-muted-foreground">
                  You can attach screenshots, documents, or other files (max 5MB)
                </p>
              </div>

              <Separator />

              <div className="flex justify-end space-x-2">
                <Button variant="outline">Cancel</Button>
                <Button onClick={handleSubmitTicket}>Submit Ticket</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Resources Tab */}
        <TabsContent value="resources">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Getting Started */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Lightbulb className="h-5 w-5" />
                  <span>Getting Started</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  Platform Overview Guide
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  How to Complete Your Profile
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Finding and Accepting Jobs
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Payment Process Explained
                </Button>
              </CardContent>
            </Card>

            {/* Video Tutorials */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Video className="h-5 w-5" />
                  <span>Video Tutorials</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Video className="h-4 w-4 mr-2" />
                  Platform Tour (5 min)
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Video className="h-4 w-4 mr-2" />
                  Profile Setup (3 min)
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Video className="h-4 w-4 mr-2" />
                  Job Management (7 min)
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Video className="h-4 w-4 mr-2" />
                  Premium Features (4 min)
                </Button>
              </CardContent>
            </Card>

            {/* Community */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5" />
                  <span>Community</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  Join Worker WhatsApp Group
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Best Practices Forum
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Success Stories
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Regional Groups
                </Button>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Headphones className="h-5 w-5" />
                  <span>Contact Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Support Hours: 24/7</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Emergency: 1800-XXX-XXXX</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Email: support@platform.com</span>
                  </div>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    Premium members get priority support with faster response times!
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}