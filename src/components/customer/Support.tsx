import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { 
  Headphones,
  MessageCircle,
  Phone,
  Mail,
  Clock,
  HelpCircle,
  AlertTriangle,
  CheckCircle,
  Search
} from 'lucide-react';
import { User as UserType } from '../../App';

interface SupportProps {
  user: UserType;
}

// Mock FAQ data
const mockFAQs = [
  {
    id: 'faq1',
    question: 'How do I book a service?',
    answer: 'You can book a service by going to the Service tab, selecting the category you need, choosing a worker, and clicking "Book Now". You will be contacted shortly to confirm the booking.'
  },
  {
    id: 'faq2',
    question: 'What if the worker doesn\'t show up?',
    answer: 'If a worker doesn\'t show up at the scheduled time, please contact our support team immediately. We will find a replacement worker and may provide compensation for the inconvenience.'
  },
  {
    id: 'faq3',
    question: 'How do I make payments?',
    answer: 'We accept multiple payment methods including UPI, Credit/Debit cards, Net Banking, and Cash on Service. You can also use your wallet balance for faster payments.'
  },
  {
    id: 'faq4',
    question: 'Can I cancel a booking?',
    answer: 'Yes, you can cancel a booking up to 2 hours before the scheduled time. For cancellations made within 2 hours, cancellation charges may apply.'
  },
  {
    id: 'faq5',
    question: 'How are workers verified?',
    answer: 'All workers on our platform are verified through Aadhaar authentication, background checks, and skill assessments. We ensure only qualified professionals join our network.'
  },
  {
    id: 'faq6',
    question: 'What if I\'m not satisfied with the service?',
    answer: 'If you\'re not satisfied with the service, please contact us within 24 hours. We offer service guarantees and will arrange for rework or provide refunds as appropriate.'
  }
];

// Mock support tickets
const mockTickets = [
  { id: 'T001', title: 'Payment not reflected', status: 'Open', date: '2024-01-15', category: 'Payment' },
  { id: 'T002', title: 'Worker quality complaint', status: 'In Progress', date: '2024-01-12', category: 'Service Quality' },
  { id: 'T003', title: 'Booking cancellation issue', status: 'Resolved', date: '2024-01-10', category: 'Booking' }
];

export function Support({ user }: SupportProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [ticketForm, setTicketForm] = useState({
    subject: '',
    category: '',
    description: '',
    priority: 'Medium'
  });
  const [showTicketForm, setShowTicketForm] = useState(false);

  const filteredFAQs = mockFAQs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmitTicket = () => {
    if (ticketForm.subject && ticketForm.category && ticketForm.description) {
      alert(`Support ticket submitted successfully! Ticket ID: T${Date.now().toString().slice(-6)}`);
      setTicketForm({ subject: '', category: '', description: '', priority: 'Medium' });
      setShowTicketForm(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open': return 'bg-red-500';
      case 'In Progress': return 'bg-yellow-500';
      case 'Resolved': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Support & Help</CardTitle>
          <CardDescription>Get help with your questions and issues</CardDescription>
        </CardHeader>
      </Card>

      {/* Contact Options */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="bg-blue-50 border-blue-200 hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <Phone className="h-8 w-8 text-blue-600 mx-auto mb-3" />
            <h3 className="font-medium mb-2">Call Support</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Get instant help from our experts
            </p>
            <p className="font-medium text-blue-600">1800-123-4567</p>
            <Badge className="mt-2 bg-green-500">24/7 Available</Badge>
          </CardContent>
        </Card>

        <Card className="bg-green-50 border-green-200 hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <MessageCircle className="h-8 w-8 text-green-600 mx-auto mb-3" />
            <h3 className="font-medium mb-2">Live Chat</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Chat with our support team
            </p>
            <Button size="sm" className="bg-green-600 hover:bg-green-700">
              Start Chat
            </Button>
            <Badge className="mt-2 bg-green-500">Online Now</Badge>
          </CardContent>
        </Card>

        <Card className="bg-purple-50 border-purple-200 hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <Mail className="h-8 w-8 text-purple-600 mx-auto mb-3" />
            <h3 className="font-medium mb-2">Email Support</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Send us your detailed queries
            </p>
            <p className="font-medium text-purple-600">support@workconnect.com</p>
            <Badge className="mt-2 bg-purple-500">24hr Response</Badge>
          </CardContent>
        </Card>
      </div>

      {/* FAQ Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <HelpCircle className="h-5 w-5 mr-2" />
            Frequently Asked Questions
          </CardTitle>
          <CardDescription>Find quick answers to common questions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search FAQs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {filteredFAQs.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {filteredFAQs.length === 0 && (
            <div className="text-center py-8">
              <HelpCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No FAQs found matching your search.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Support Tickets */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Your Support Tickets</CardTitle>
              <CardDescription>Track your submitted support requests</CardDescription>
            </div>
            <Button onClick={() => setShowTicketForm(!showTicketForm)}>
              <MessageCircle className="h-4 w-4 mr-2" />
              New Ticket
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* New Ticket Form */}
          {showTicketForm && (
            <Card className="mb-6 border-dashed">
              <CardContent className="p-6 space-y-4">
                <h3 className="font-medium">Submit New Support Ticket</h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Subject</label>
                    <Input
                      placeholder="Brief description of your issue"
                      value={ticketForm.subject}
                      onChange={(e) => setTicketForm({...ticketForm, subject: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Category</label>
                    <select 
                      className="w-full p-2 border rounded-lg"
                      value={ticketForm.category}
                      onChange={(e) => setTicketForm({...ticketForm, category: e.target.value})}
                    >
                      <option value="">Select category</option>
                      <option value="Payment">Payment Issues</option>
                      <option value="Booking">Booking Problems</option>
                      <option value="Service Quality">Service Quality</option>
                      <option value="Technical">Technical Issues</option>
                      <option value="Account">Account Related</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-1 block">Description</label>
                  <Textarea
                    placeholder="Provide detailed information about your issue"
                    rows={4}
                    value={ticketForm.description}
                    onChange={(e) => setTicketForm({...ticketForm, description: e.target.value})}
                  />
                </div>

                <div className="flex space-x-2">
                  <Button onClick={handleSubmitTicket}>Submit Ticket</Button>
                  <Button variant="outline" onClick={() => setShowTicketForm(false)}>
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Existing Tickets */}
          <div className="space-y-3">
            {mockTickets.map((ticket) => (
              <div key={ticket.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50">
                <div className="flex items-center space-x-4">
                  <div className="flex flex-col items-center">
                    {ticket.status === 'Open' && <AlertTriangle className="h-5 w-5 text-red-500" />}
                    {ticket.status === 'In Progress' && <Clock className="h-5 w-5 text-yellow-500" />}
                    {ticket.status === 'Resolved' && <CheckCircle className="h-5 w-5 text-green-500" />}
                  </div>
                  <div>
                    <h3 className="font-medium">{ticket.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {ticket.category} • {ticket.date} • ID: {ticket.id}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge className={`${getStatusColor(ticket.status)} text-white`}>
                    {ticket.status}
                  </Badge>
                  <Button size="sm" variant="outline" className="mt-2 ml-2">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {mockTickets.length === 0 && (
            <div className="text-center py-8">
              <Headphones className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No support tickets found.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Help */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4 mb-4">
            <div className="bg-blue-500 text-white rounded-full p-3">
              <Headphones className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-medium">Need Immediate Help?</h3>
              <p className="text-sm text-muted-foreground">Our support team is here to help you 24/7</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Phone className="h-4 w-4 mr-2" />
              Call Now: 1800-123-4567
            </Button>
            <Button variant="outline" className="border-blue-200">
              <MessageCircle className="h-4 w-4 mr-2" />
              Start Live Chat
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}