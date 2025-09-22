import React, { useState, Suspense, lazy } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { 
  Search, 
  Calendar, 
  ShoppingCart,
  CreditCard,
  Headphones,
  Star,
  Gift,
  AlertTriangle,
  LogOut,
  Settings,
  Crown
} from 'lucide-react';
import { User as UserType, useLanguage } from '../App';
import { LanguageSelector } from './LanguageSelector';

// Lazy load customer components
const ServiceCategories = lazy(() => import('./customer/ServiceCategories').then(module => ({ default: module.ServiceCategories })));
const BookingHistory = lazy(() => import('./customer/BookingHistory').then(module => ({ default: module.BookingHistory })));
const ECommerce = lazy(() => import('./customer/ECommerce').then(module => ({ default: module.ECommerce })));
const PaymentSection = lazy(() => import('./customer/PaymentSection').then(module => ({ default: module.PaymentSection })));
const Support = lazy(() => import('./customer/Support').then(module => ({ default: module.Support })));
const RatingReview = lazy(() => import('./customer/RatingReview').then(module => ({ default: module.RatingReview })));
const ReferEarn = lazy(() => import('./customer/ReferEarn').then(module => ({ default: module.ReferEarn })));
const IssueSection = lazy(() => import('./customer/IssueSection').then(module => ({ default: module.IssueSection })));
const ProfileSection = lazy(() => import('./customer/ProfileSection').then(module => ({ default: module.ProfileSection })));
const TaskPosting = lazy(() => import('./customer/TaskPosting').then(module => ({ default: module.TaskPosting })));
const PremiumSection = lazy(() => import('./customer/PremiumSection').then(module => ({ default: module.PremiumSection })));

interface CustomerDashboardProps {
  user: UserType | null;
  onLogout: () => void;
}

export function CustomerDashboard({ user, onLogout }: CustomerDashboardProps) {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('service');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [showTaskPosting, setShowTaskPosting] = useState(false);

  if (!user) return null;

  const handleTaskPosted = (task: any) => {
    // Handle task posted event - could be used to show notifications, etc.
    console.log('Task posted:', task);
    setShowTaskPosting(false);
    setSelectedCategory('');
  };

  const handleCategorySelected = (category: string) => {
    setSelectedCategory(category);
    setShowTaskPosting(true);
  };

  const handleBackToService = () => {
    setShowTaskPosting(false);
    setSelectedCategory('');
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
                <p className="text-sm text-muted-foreground">Customer Dashboard</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <LanguageSelector variant="compact" />
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
                value="service" 
                className="flex flex-col items-center justify-center min-w-[80px] h-16 p-2 rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-200 hover:bg-muted"
              >
                <Search className="h-5 w-5 mb-1" />
                <span className="text-xs font-medium">Service</span>
              </TabsTrigger>
              <TabsTrigger 
                value="bookings" 
                className="flex flex-col items-center justify-center min-w-[80px] h-16 p-2 rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-200 hover:bg-muted"
              >
                <Calendar className="h-5 w-5 mb-1" />
                <span className="text-xs font-medium">Bookings</span>
              </TabsTrigger>
              <TabsTrigger 
                value="ecom" 
                className="flex flex-col items-center justify-center min-w-[80px] h-16 p-2 rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-200 hover:bg-muted"
              >
                <ShoppingCart className="h-5 w-5 mb-1" />
                <span className="text-xs font-medium">E-Com</span>
              </TabsTrigger>
              <TabsTrigger 
                value="payment" 
                className="flex flex-col items-center justify-center min-w-[80px] h-16 p-2 rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-200 hover:bg-muted"
              >
                <CreditCard className="h-5 w-5 mb-1" />
                <span className="text-xs font-medium">Payment</span>
              </TabsTrigger>
              <TabsTrigger 
                value="support" 
                className="flex flex-col items-center justify-center min-w-[80px] h-16 p-2 rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-200 hover:bg-muted"
              >
                <Headphones className="h-5 w-5 mb-1" />
                <span className="text-xs font-medium">Support</span>
              </TabsTrigger>
              <TabsTrigger 
                value="rating" 
                className="flex flex-col items-center justify-center min-w-[80px] h-16 p-2 rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-200 hover:bg-muted"
              >
                <Star className="h-5 w-5 mb-1" />
                <span className="text-xs font-medium">Rating</span>
              </TabsTrigger>
              <TabsTrigger 
                value="refer" 
                className="flex flex-col items-center justify-center min-w-[80px] h-16 p-2 rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-200 hover:bg-muted"
              >
                <Gift className="h-5 w-5 mb-1" />
                <span className="text-xs font-medium">Refer</span>
              </TabsTrigger>
              <TabsTrigger 
                value="issue" 
                className="flex flex-col items-center justify-center min-w-[80px] h-16 p-2 rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-200 hover:bg-muted"
              >
                <AlertTriangle className="h-5 w-5 mb-1" />
                <span className="text-xs font-medium">Issues</span>
              </TabsTrigger>
              <TabsTrigger 
                value="premium" 
                className="flex flex-col items-center justify-center min-w-[80px] h-16 p-2 rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-200 hover:bg-muted"
              >
                <Crown className="h-5 w-5 mb-1" />
                <span className="text-xs font-medium">Premium</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="service">
            <Suspense fallback={<div className="flex items-center justify-center h-64"><div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full"></div></div>}>
              {showTaskPosting ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Post Task for {selectedCategory}</h3>
                    <Button 
                      variant="outline" 
                      onClick={handleBackToService}
                    >
                      ← Back to Services
                    </Button>
                  </div>
                  <TaskPosting 
                    user={user} 
                    onTaskPosted={handleTaskPosted}
                    selectedCategory={selectedCategory}
                  />
                </div>
              ) : (
                <ServiceCategories user={user} onCategorySelected={handleCategorySelected} />
              )}
            </Suspense>
          </TabsContent>

          <TabsContent value="bookings">
            <Suspense fallback={<div className="flex items-center justify-center h-64"><div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full"></div></div>}>
              <BookingHistory user={user} />
            </Suspense>
          </TabsContent>

          <TabsContent value="ecom">
            <Suspense fallback={<div className="flex items-center justify-center h-64"><div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full"></div></div>}>
              <ECommerce user={user} />
            </Suspense>
          </TabsContent>

          <TabsContent value="payment">
            <Suspense fallback={<div className="flex items-center justify-center h-64"><div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full"></div></div>}>
              <PaymentSection user={user} />
            </Suspense>
          </TabsContent>

          <TabsContent value="support">
            <Suspense fallback={<div className="flex items-center justify-center h-64"><div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full"></div></div>}>
              <Support user={user} />
            </Suspense>
          </TabsContent>

          <TabsContent value="rating">
            <Suspense fallback={<div className="flex items-center justify-center h-64"><div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full"></div></div>}>
              <RatingReview user={user} />
            </Suspense>
          </TabsContent>

          <TabsContent value="refer">
            <Suspense fallback={<div className="flex items-center justify-center h-64"><div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full"></div></div>}>
              <ReferEarn user={user} />
            </Suspense>
          </TabsContent>

          <TabsContent value="issue">
            <Suspense fallback={<div className="flex items-center justify-center h-64"><div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full"></div></div>}>
              <IssueSection user={user} />
            </Suspense>
          </TabsContent>

          <TabsContent value="premium">
            <Suspense fallback={<div className="flex items-center justify-center h-64"><div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full"></div></div>}>
              <PremiumSection user={user} />
            </Suspense>
          </TabsContent>
        </Tabs>

        {/* Floating Profile Button */}
        <div className="fixed bottom-6 right-6">
          <Button
            className="rounded-full h-14 w-14 shadow-lg"
            onClick={() => setActiveTab('profile')}
          >
            <Settings className="h-6 w-6" />
          </Button>
        </div>

        {/* Profile Modal/Section */}
        {activeTab === 'profile' && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setActiveTab('service')}>
            <div className="max-w-2xl w-full mx-4" onClick={(e) => e.stopPropagation()}>
              <Suspense fallback={<div className="bg-white rounded-lg p-8 text-center"><div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full mx-auto"></div></div>}>
                <ProfileSection user={user} onClose={() => setActiveTab('service')} />
              </Suspense>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}