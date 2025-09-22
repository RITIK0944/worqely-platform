import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { 
  AlertTriangle, 
  Clock, 
  CheckCircle, 
  XCircle,
  FileText,
  Upload,
  MessageSquare,
  Phone
} from 'lucide-react';
import { User as UserType } from '../../App';

interface IssueSectionProps {
  user: UserType;
}

// Mock issue data
const mockIssues = [
  {
    id: 'ISS001',
    title: 'Worker did not show up',
    category: 'Service Quality',
    workerName: 'Rajesh Kumar',
    bookingId: 'BK001',
    description: 'The plumber did not arrive at the scheduled time and did not inform in advance.',
    status: 'Under Investigation',
    priority: 'High',
    dateCreated: '2024-01-15',
    lastUpdate: '2024-01-16'
  },
  {
    id: 'ISS002',
    title: 'Poor quality of work',
    category: 'Service Quality',
    workerName: 'Suresh Patel',
    bookingId: 'BK002',
    description: 'The electrical work was not completed properly and needs rework.',
    status: 'Resolved',
    priority: 'Medium',
    dateCreated: '2024-01-10',
    lastUpdate: '2024-01-12'
  },
  {
    id: 'ISS003',
    title: 'Overcharging',
    category: 'Billing',
    workerName: 'Amit Singh',
    bookingId: 'BK003',
    description: 'Worker charged more than the agreed amount without prior notice.',
    status: 'Closed',
    priority: 'High',
    dateCreated: '2024-01-08',
    lastUpdate: '2024-01-10'
  }
];

const issueCategories = [
  'Service Quality',
  'Worker Behavior',
  'Billing/Payment',
  'No Show/Late Arrival', 
  'Damage to Property',
  'Safety Concerns',
  'Communication Issues',
  'Other'
];

const priorities = ['Low', 'Medium', 'High', 'Critical'];

export function IssueSection({ user }: IssueSectionProps) {
  const [showNewIssueForm, setShowNewIssueForm] = useState(false);
  const [issueForm, setIssueForm] = useState({
    title: '',
    category: '',
    workerName: '',
    bookingId: '',
    priority: 'Medium',
    description: '',
    attachments: [] as File[]
  });

  const handleInputChange = (field: string, value: string) => {
    setIssueForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setIssueForm(prev => ({
      ...prev,
      attachments: [...prev.attachments, ...files].slice(0, 3) // Max 3 files
    }));
  };

  const handleSubmitIssue = () => {
    if (issueForm.title && issueForm.category && issueForm.description) {
      alert(`Issue submitted successfully! Issue ID: ISS${Date.now().toString().slice(-6)}`);
      setIssueForm({
        title: '',
        category: '',
        workerName: '',
        bookingId: '',
        priority: 'Medium',
        description: '',
        attachments: []
      });
      setShowNewIssueForm(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open': return 'bg-red-500';
      case 'Under Investigation': return 'bg-yellow-500';
      case 'Resolved': return 'bg-green-500';
      case 'Closed': return 'bg-gray-500';
      default: return 'bg-blue-500';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical': return 'bg-red-600';
      case 'High': return 'bg-orange-500';
      case 'Medium': return 'bg-yellow-500';
      case 'Low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Open': return <AlertTriangle className="h-4 w-4" />;
      case 'Under Investigation': return <Clock className="h-4 w-4" />;
      case 'Resolved': return <CheckCircle className="h-4 w-4" />;
      case 'Closed': return <XCircle className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2" />
                Issues & Complaints
              </CardTitle>
              <CardDescription>Report and track issues with services or workers</CardDescription>
            </div>
            <Button onClick={() => setShowNewIssueForm(!showNewIssueForm)}>
              <AlertTriangle className="h-4 w-4 mr-2" />
              Report Issue
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* New Issue Form */}
      {showNewIssueForm && (
        <Card className="border-dashed border-red-300 bg-red-50">
          <CardContent className="p-6 space-y-4">
            <h3 className="font-medium text-red-900">Report New Issue</h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Issue Title *</label>
                <Input
                  placeholder="Brief description of the issue"
                  value={issueForm.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-1 block">Category *</label>
                <Select 
                  value={issueForm.category}
                  onValueChange={(value) => handleInputChange('category', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select issue category" />
                  </SelectTrigger>
                  <SelectContent>
                    {issueCategories.map(category => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">Worker Name</label>
                <Input
                  placeholder="Name of the worker involved"
                  value={issueForm.workerName}
                  onChange={(e) => handleInputChange('workerName', e.target.value)}
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">Booking ID</label>
                <Input
                  placeholder="Related booking ID (if any)"
                  value={issueForm.bookingId}
                  onChange={(e) => handleInputChange('bookingId', e.target.value)}
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">Priority</label>
                <Select 
                  value={issueForm.priority}
                  onValueChange={(value) => handleInputChange('priority', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {priorities.map(priority => (
                      <SelectItem key={priority} value={priority}>
                        {priority}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">Attachments</label>
                <Input
                  type="file"
                  multiple
                  accept="image/*,.pdf,.doc,.docx"
                  onChange={handleFileUpload}
                  className="cursor-pointer"
                />
                {issueForm.attachments.length > 0 && (
                  <p className="text-xs text-muted-foreground mt-1">
                    {issueForm.attachments.length} file(s) selected
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">Detailed Description *</label>
              <Textarea
                placeholder="Provide detailed information about the issue including what happened, when it occurred, and how it affected you..."
                rows={4}
                value={issueForm.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
              />
            </div>

            <div className="flex space-x-2">
              <Button onClick={handleSubmitIssue} className="bg-red-600 hover:bg-red-700">
                Submit Issue
              </Button>
              <Button variant="outline" onClick={() => setShowNewIssueForm(false)}>
                Cancel
              </Button>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <p className="text-sm text-yellow-800">
                <strong>Note:</strong> All issues are taken seriously and will be investigated promptly. 
                You will receive updates via email and in-app notifications.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Issue Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">{mockIssues.filter(i => i.status === 'Open' || i.status === 'Under Investigation').length}</div>
            <div className="text-sm text-muted-foreground">Active Issues</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{mockIssues.filter(i => i.status === 'Resolved').length}</div>
            <div className="text-sm text-muted-foreground">Resolved</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-gray-600">{mockIssues.filter(i => i.status === 'Closed').length}</div>
            <div className="text-sm text-muted-foreground">Closed</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{mockIssues.length}</div>
            <div className="text-sm text-muted-foreground">Total Issues</div>
          </CardContent>
        </Card>
      </div>

      {/* Issues List */}
      <Card>
        <CardHeader>
          <CardTitle>Your Issues</CardTitle>
          <CardDescription>Track the status of your reported issues</CardDescription>
        </CardHeader>
        <CardContent>
          {mockIssues.length === 0 ? (
            <div className="text-center py-8">
              <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h3 className="font-medium mb-2">No Issues Reported</h3>
              <p className="text-muted-foreground">Great! You haven't reported any issues yet.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {mockIssues.map((issue) => (
                <Card key={issue.id} className="border-l-4 border-l-red-500">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start space-x-3">
                        <div className="bg-red-100 rounded-full p-2 mt-1">
                          {getStatusIcon(issue.status)}
                        </div>
                        <div>
                          <h3 className="font-medium">{issue.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            Issue #{issue.id} • {issue.category}
                            {issue.workerName && ` • Worker: ${issue.workerName}`}
                            {issue.bookingId && ` • Booking: ${issue.bookingId}`}
                          </p>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <Badge className={`${getStatusColor(issue.status)} text-white mb-1`}>
                          {issue.status}
                        </Badge>
                        <Badge className={`${getPriorityColor(issue.priority)} text-white text-xs`}>
                          {issue.priority}
                        </Badge>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground mb-3">{issue.description}</p>

                    <div className="flex items-center justify-between">
                      <div className="text-xs text-muted-foreground">
                        Created: {issue.dateCreated} • Updated: {issue.lastUpdate}
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <MessageSquare className="h-4 w-4 mr-1" />
                          View Details
                        </Button>
                        {issue.status !== 'Closed' && (
                          <Button size="sm" variant="outline">
                            <Phone className="h-4 w-4 mr-1" />
                            Follow Up
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Emergency Contact */}
      <Card className="bg-red-50 border-red-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-red-900 mb-2 flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2" />
                Emergency Support
              </h3>
              <p className="text-red-700 text-sm">
                For urgent safety issues or emergencies, contact us immediately
              </p>
            </div>
            <div className="text-right">
              <Button className="bg-red-600 hover:bg-red-700 mb-2">
                <Phone className="h-4 w-4 mr-2" />
                Emergency: 1800-URGENT
              </Button>
              <p className="text-xs text-red-600">Available 24/7</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}