import React, { useState, Suspense, lazy } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { 
  CheckCircle, 
  Clock, 
  DollarSign, 
  TrendingUp,
  Users,
  Shield,
  Crown,
  Calendar,
  Headphones,
  Star,
  LogOut,
  Settings,
  Bell,
  ShoppingCart
} from 'lucide-react';
import { User as UserType, useLanguage } from '../App';

// Lazy load worker components
const AvailableTasks = lazy(() => import('./labor/AvailableTasks').then(module => ({ default: module.AvailableTasks })));
const TaskBoard = lazy(() => import('./labor/TaskBoard').then(module => ({ default: module.TaskBoard })));
const ProfileManagement = lazy(() => import('./labor/ProfileManagement').then(module => ({ default: module.ProfileManagement })));
const ShiftSelection = lazy(() => import('./labor/ShiftSelection').then(module => ({ default: module.ShiftSelection })));
const EarningsTracking = lazy(() => import('./labor/EarningsTracking').then(module => ({ default: module.EarningsTracking })));
const SHGSection = lazy(() => import('./labor/SHGSection').then(module => ({ default: module.SHGSection })));
const InsuranceSection = lazy(() => import('./labor/InsuranceSection').then(module => ({ default: module.InsuranceSection })));
const PremiumSubscription = lazy(() => import('./labor/PremiumSubscription').then(module => ({ default: module.PremiumSubscription })));
const WorkHistory = lazy(() => import('./labor/WorkHistory').then(module => ({ default: module.WorkHistory })));
const SupportSection = lazy(() => import('./labor/SupportSection').then(module => ({ default: module.SupportSection })));
const ECommerceSection = lazy(() => import('./labor/ECommerceSection').then(module => ({ default: module.ECommerceSection })));

interface WorkerDashboardProps {
  user: UserType | null;
  onLogout: () => void;
}

export function LaborDashboard({ user, onLogout }: WorkerDashboardProps) {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('tasks');

  if (!user) return null;

  const handleApplyToTask = (taskId: string) => {
    alert(`Applied to task ${taskId}. Customer will be notified of your interest!`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Avatar className="h-10 w-10">
                <AvatarImage src={user.profilePhoto} />
                <AvatarFallback>
                  {user.fullName.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-lg font-medium">Welcome, {user.fullName}</h1>
                <p className="text-sm text-muted-foreground">Worker Dashboard • {user.workCategory}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Bell className="h-5 w-5 text-muted-foreground" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                  3
                </span>
              </div>
              <Button variant="outline" size="sm" onClick={onLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border p-2">
            <TabsList className="flex w-full h-auto bg-transparent gap-1 overflow-x-auto">
              <TabsTrigger 
                value="tasks" 
                className="flex flex-col items-center justify-center min-w-[80px] h-16 p-2 rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-200 hover:bg-muted"
              >
                <CheckCircle className="h-5 w-5 mb-1" />
                <span className="text-xs font-medium">Tasks</span>
              </TabsTrigger>
              <TabsTrigger 
                value="profile" 
                className="flex flex-col items-center justify-center min-w-[80px] h-16 p-2 rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-200 hover:bg-muted"
              >
                <Settings className="h-5 w-5 mb-1" />
                <span className="text-xs font-medium">Profile</span>
              </TabsTrigger>
              <TabsTrigger 
                value="shifts" 
                className="flex flex-col items-center justify-center min-w-[80px] h-16 p-2 rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-200 hover:bg-muted"
              >
                <Clock className="h-5 w-5 mb-1" />
                <span className="text-xs font-medium">Shifts</span>
              </TabsTrigger>
              <TabsTrigger 
                value="earnings" 
                className="flex flex-col items-center justify-center min-w-[80px] h-16 p-2 rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-200 hover:bg-muted"
              >
                <DollarSign className="h-5 w-5 mb-1" />
                <span className="text-xs font-medium">Earnings</span>
              </TabsTrigger>
              <TabsTrigger 
                value="history" 
                className="flex flex-col items-center justify-center min-w-[80px] h-16 p-2 rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-200 hover:bg-muted"
              >
                <Calendar className="h-5 w-5 mb-1" />
                <span className="text-xs font-medium">History</span>
              </TabsTrigger>
              <TabsTrigger 
                value="ecommerce" 
                className="flex flex-col items-center justify-center min-w-[80px] h-16 p-2 rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-200 hover:bg-muted"
              >
                <ShoppingCart className="h-5 w-5 mb-1" />
                <span className="text-xs font-medium">E-Commerce</span>
              </TabsTrigger>
              <TabsTrigger 
                value="shg" 
                className="flex flex-col items-center justify-center min-w-[80px] h-16 p-2 rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-200 hover:bg-muted"
              >
                <Users className="h-5 w-5 mb-1" />
                <span className="text-xs font-medium">SHG</span>
              </TabsTrigger>
              <TabsTrigger 
                value="insurance" 
                className="flex flex-col items-center justify-center min-w-[80px] h-16 p-2 rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-200 hover:bg-muted"
              >
                <Shield className="h-5 w-5 mb-1" />
                <span className="text-xs font-medium">Insurance</span>
              </TabsTrigger>
              <TabsTrigger 
                value="premium" 
                className="flex flex-col items-center justify-center min-w-[80px] h-16 p-2 rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-200 hover:bg-muted"
              >
                <Crown className="h-5 w-5 mb-1" />
                <span className="text-xs font-medium">Premium</span>
              </TabsTrigger>
              <TabsTrigger 
                value="support" 
                className="flex flex-col items-center justify-center min-w-[80px] h-16 p-2 rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-200 hover:bg-muted"
              >
                <Headphones className="h-5 w-5 mb-1" />
                <span className="text-xs font-medium">Support</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="tasks">
            <Suspense fallback={<div className="flex items-center justify-center h-64"><div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full"></div></div>}>
              <div className="space-y-6">
                {/* Quick Tasks Overview on Dashboard */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center space-x-2">
                          <CheckCircle className="h-5 w-5" />
                          <span>Available Tasks Today</span>
                        </CardTitle>
                        <CardDescription>Fresh tasks matching your skills - updated every 5 minutes</CardDescription>
                      </div>
                      <Badge className="bg-green-100 text-green-800">
                        🔄 Live Updates
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Suspense fallback={<div className="animate-pulse space-y-4"><div className="h-20 bg-muted rounded-lg"></div></div>}>
                      <AvailableTasks user={user} displayMode="dashboard" limit={3} />
                    </Suspense>
                  </CardContent>
                </Card>
                
                {/* Full Task Board */}
                <TaskBoard user={user} onApplyToTask={handleApplyToTask} />
              </div>
            </Suspense>
          </TabsContent>

          <TabsContent value="profile">
            <Suspense fallback={<div className="flex items-center justify-center h-64"><div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full"></div></div>}>
              <ProfileManagement user={user} />
            </Suspense>
          </TabsContent>

          <TabsContent value="shifts">
            <Suspense fallback={<div className="flex items-center justify-center h-64"><div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full"></div></div>}>
              <ShiftSelection user={user} />
            </Suspense>
          </TabsContent>

          <TabsContent value="earnings">
            <Suspense fallback={<div className="flex items-center justify-center h-64"><div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full"></div></div>}>
              <EarningsTracking user={user} />
            </Suspense>
          </TabsContent>

          <TabsContent value="history">
            <Suspense fallback={<div className="flex items-center justify-center h-64"><div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full"></div></div>}>
              <WorkHistory user={user} />
            </Suspense>
          </TabsContent>

          <TabsContent value="ecommerce">
            <Suspense fallback={<div className="flex items-center justify-center h-64"><div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full"></div></div>}>
              <ECommerceSection user={user} />
            </Suspense>
          </TabsContent>

          <TabsContent value="shg">
            <Suspense fallback={<div className="flex items-center justify-center h-64"><div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full"></div></div>}>
              <SHGSection user={user} />
            </Suspense>
          </TabsContent>

          <TabsContent value="insurance">
            <Suspense fallback={<div className="flex items-center justify-center h-64"><div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full"></div></div>}>
              <InsuranceSection user={user} />
            </Suspense>
          </TabsContent>

          <TabsContent value="premium">
            <Suspense fallback={<div className="flex items-center justify-center h-64"><div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full"></div></div>}>
              <PremiumSubscription user={user} />
            </Suspense>
          </TabsContent>

          <TabsContent value="support">
            <Suspense fallback={<div className="flex items-center justify-center h-64"><div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full"></div></div>}>
              <SupportSection user={user} />
            </Suspense>
          </TabsContent>
        </Tabs>

        {/* Floating Profile Button */}
        <div className="fixed bottom-6 right-6">
          <Button
            className="rounded-full h-14 w-14 shadow-lg"
            onClick={() => setActiveTab('profile')}
          >
            <Star className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </div>
  );
}