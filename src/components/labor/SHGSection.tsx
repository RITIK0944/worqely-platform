import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Progress } from '../ui/progress';
import { Separator } from '../ui/separator';
import { 
  Users, 
  Wallet, 
  TrendingUp, 
  Calendar,
  MessageCircle,
  Plus,
  Gift,
  Handshake,
  Target,
  PiggyBank,
  UserPlus
} from 'lucide-react';
import { User as UserType } from '../../App';

interface SHGSectionProps {
  user: UserType | null;
}

// Mock SHG data
const shgData = {
  groupName: "Delhi Workers United",
  members: 12,
  totalFund: 45000,
  userContribution: 3500,
  monthlyContribution: 500,
  nextMeeting: "2024-01-25",
  isActive: true
};

const groupMembers = [
  { id: '1', name: 'Rajesh Kumar', role: 'Leader', contribution: 4200, profession: 'Plumber' },
  { id: '2', name: 'Priya Sharma', role: 'Secretary', contribution: 3800, profession: 'Electrician' },
  { id: '3', name: 'Amit Singh', role: 'Treasurer', contribution: 4500, profession: 'Carpenter' },
  { id: '4', name: 'Sunita Devi', role: 'Member', contribution: 3200, profession: 'Mason' },
  { id: '5', name: 'Vikram Patel', role: 'Member', contribution: 3900, profession: 'Painter' },
];

const recentActivities = [
  { id: '1', type: 'contribution', amount: 500, date: '2024-01-20', member: 'You' },
  { id: '2', type: 'loan', amount: 5000, date: '2024-01-18', member: 'Rajesh Kumar' },
  { id: '3', type: 'contribution', amount: 500, date: '2024-01-15', member: 'Priya Sharma' },
  { id: '4', type: 'meeting', amount: 0, date: '2024-01-15', member: 'Group Meeting' },
];

export function SHGSection({ user }: SHGSectionProps) {
  const [activeTab, setActiveTab] = useState('overview');

  const userContributionPercentage = (shgData.userContribution / shgData.totalFund) * 100;
  const avgContribution = shgData.totalFund / shgData.members;

  return (
    <div className="space-y-6">
      {/* SHG Status Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>Self Help Group (SHG)</span>
            </div>
            <Badge className={shgData.isActive ? 'bg-green-500' : 'bg-red-500'}>
              {shgData.isActive ? 'Active Member' : 'Inactive'}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-3 w-fit mx-auto mb-2">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <p className="text-2xl">{shgData.groupName}</p>
              <p className="text-sm text-muted-foreground">{shgData.members} members</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-full p-3 w-fit mx-auto mb-2">
                <PiggyBank className="h-6 w-6 text-green-600" />
              </div>
              <p className="text-2xl">₹{shgData.totalFund}</p>
              <p className="text-sm text-muted-foreground">Total Fund</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 rounded-full p-3 w-fit mx-auto mb-2">
                <Wallet className="h-6 w-6 text-purple-600" />
              </div>
              <p className="text-2xl">₹{shgData.userContribution}</p>
              <p className="text-sm text-muted-foreground">Your Contribution</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation Tabs */}
      <div className="flex space-x-1">
        <Button 
          variant={activeTab === 'overview' ? 'default' : 'outline'}
          onClick={() => setActiveTab('overview')}
          size="sm"
        >
          Overview
        </Button>
        <Button 
          variant={activeTab === 'members' ? 'default' : 'outline'}
          onClick={() => setActiveTab('members')}
          size="sm"
        >
          Members
        </Button>
        <Button 
          variant={activeTab === 'activities' ? 'default' : 'outline'}
          onClick={() => setActiveTab('activities')}
          size="sm"
        >
          Activities
        </Button>
        <Button 
          variant={activeTab === 'loans' ? 'default' : 'outline'}
          onClick={() => setActiveTab('loans')}
          size="sm"
        >
          Loans
        </Button>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Contribution Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5" />
                <span>Contribution Overview</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm">Your Contribution</span>
                    <span className="text-sm text-muted-foreground">
                      {userContributionPercentage.toFixed(1)}% of total
                    </span>
                  </div>
                  <Progress value={userContributionPercentage} className="h-3" />
                  <p className="text-sm text-muted-foreground mt-1">
                    ₹{shgData.userContribution} out of ₹{shgData.totalFund}
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Monthly Contribution:</span>
                    <span className="font-medium">₹{shgData.monthlyContribution}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Average per member:</span>
                    <span className="font-medium">₹{Math.round(avgContribution)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Next meeting:</span>
                    <span className="font-medium">{shgData.nextMeeting}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button className="flex items-center justify-center space-x-2 h-20">
                  <Plus className="h-5 w-5" />
                  <span>Make Contribution</span>
                </Button>
                <Button variant="outline" className="flex items-center justify-center space-x-2 h-20">
                  <Handshake className="h-5 w-5" />
                  <span>Request Loan</span>
                </Button>
                <Button variant="outline" className="flex items-center justify-center space-x-2 h-20">
                  <MessageCircle className="h-5 w-5" />
                  <span>Group Chat</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Members Tab */}
      {activeTab === 'members' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>Group Members</span>
              </div>
              <Button size="sm" variant="outline">
                <UserPlus className="h-4 w-4 mr-2" />
                Invite Member
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {groupMembers.map((member, index) => (
                <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center space-x-2">
                        <p className="font-medium">{member.name}</p>
                        {member.role !== 'Member' && (
                          <Badge variant="secondary">{member.role}</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{member.profession}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">₹{member.contribution}</p>
                    <p className="text-sm text-muted-foreground">Total contribution</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Activities Tab */}
      {activeTab === 'activities' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5" />
              <span>Recent Activities</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-full ${
                      activity.type === 'contribution' ? 'bg-green-100' :
                      activity.type === 'loan' ? 'bg-blue-100' : 'bg-purple-100'
                    }`}>
                      {activity.type === 'contribution' && <Plus className="h-4 w-4 text-green-600" />}
                      {activity.type === 'loan' && <Handshake className="h-4 w-4 text-blue-600" />}
                      {activity.type === 'meeting' && <Users className="h-4 w-4 text-purple-600" />}
                    </div>
                    <div>
                      <p className="font-medium">
                        {activity.type === 'contribution' && 'Contribution Made'}
                        {activity.type === 'loan' && 'Loan Taken'}
                        {activity.type === 'meeting' && 'Group Meeting'}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {activity.member} • {activity.date}
                      </p>
                    </div>
                  </div>
                  {activity.amount > 0 && (
                    <div className="text-right">
                      <p className={`font-medium ${
                        activity.type === 'contribution' ? 'text-green-600' : 'text-blue-600'
                      }`}>
                        {activity.type === 'contribution' ? '+' : '-'}₹{activity.amount}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Loans Tab */}
      {activeTab === 'loans' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Handshake className="h-5 w-5" />
                <span>Loan Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h3 className="font-medium mb-2">Loan Eligibility</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Based on your contribution, you are eligible for:
                    </p>
                    <p className="text-2xl text-blue-600">₹{shgData.userContribution * 3}</p>
                    <p className="text-xs text-muted-foreground">Maximum loan amount</p>
                  </div>
                  <Button className="w-full">
                    <Handshake className="h-4 w-4 mr-2" />
                    Apply for Loan
                  </Button>
                </div>
                <div className="space-y-3">
                  <h4 className="font-medium">Loan Terms:</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Interest rate: 0%</li>
                    <li>• Maximum tenure: 12 months</li>
                    <li>• No collateral required</li>
                    <li>• Group guarantee system</li>
                    <li>• Flexible repayment options</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Current Loans</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-medium">Emergency Loan</h4>
                      <p className="text-sm text-muted-foreground">Taken on: Jan 15, 2024</p>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800">Active</Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Loan Amount:</p>
                      <p className="font-medium">₹8,000</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Outstanding:</p>
                      <p className="font-medium">₹6,500</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Monthly EMI:</p>
                      <p className="font-medium">₹750</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Next Due Date:</p>
                      <p className="font-medium text-orange-600">Feb 15, 2024</p>
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-muted-foreground">Repayment Progress</span>
                      <span className="text-sm text-muted-foreground">18.75% paid</span>
                    </div>
                    <Progress value={18.75} className="h-2" />
                  </div>
                </div>
                
                <div className="text-center py-4 text-sm text-muted-foreground">
                  <p>Interest-free loans as per SHG policy</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}