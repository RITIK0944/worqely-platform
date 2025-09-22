import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Separator } from '../ui/separator';
import { 
  Crown, 
  Star, 
  Zap, 
  Shield,
  CheckCircle,
  X,
  Gift,
  TrendingUp,
  Clock,
  Users,
  Phone,
  Target,
  Award
} from 'lucide-react';
import { User as UserType } from '../../App';

interface PremiumSubscriptionProps {
  user: UserType | null;
}

const subscriptionPlans = [
  {
    id: 'basic',
    name: 'Basic',
    price: 0,
    period: 'Free',
    description: 'Get started with essential features',
    icon: Shield,
    color: 'bg-gray-500',
    features: [
      { name: 'Basic job listings', included: true },
      { name: 'Profile creation', included: true },
      { name: 'Customer ratings', included: true },
      { name: 'Payment tracking', included: true },
      { name: 'Priority support', included: false },
      { name: 'Advanced analytics', included: false },
      { name: 'Premium job access', included: false }
    ]
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 199,
    period: 'per month',
    description: 'Unlock advanced features for better earnings',
    icon: Star,
    color: 'bg-blue-500',
    popular: true,
    features: [
      { name: 'All Basic features', included: true },
      { name: 'Priority job listings', included: true },
      { name: 'Advanced profile showcase', included: true },
      { name: 'Customer preference matching', included: true },
      { name: 'Priority support', included: true },
      { name: 'Earnings analytics', included: true },
      { name: 'Premium job access', included: false }
    ]
  },
  {
    id: 'pro',
    name: 'Professional',
    price: 399,
    period: 'per month',
    description: 'Maximum visibility and exclusive opportunities',
    icon: Crown,
    color: 'bg-purple-500',
    features: [
      { name: 'All Premium features', included: true },
      { name: 'Exclusive high-value jobs', included: true },
      { name: 'Professional portfolio', included: true },
      { name: 'Advanced analytics dashboard', included: true }
    ]
  }
];

const currentSubscription = {
  plan: 'premium',
  startDate: '2024-01-01',
  endDate: '2024-12-31',
  autoRenew: true,
  daysLeft: 345
};

const benefits = [
  {
    icon: TrendingUp,
    title: 'Premium Earnings Boost',
    description: 'Premium members earn 40% more through exclusive opportunities',
    stat: '+40%'
  },
  {
    icon: Zap,
    title: 'Priority Job Access',
    description: 'Premium workers get jobs 3x faster than basic users',
    stat: '3x'
  },
  {
    icon: Users,
    title: 'Exclusive Customer Base',
    description: 'Access to premium customers willing to pay higher rates',
    stat: '+50%'
  },
  {
    icon: Star,
    title: 'Premium Support',
    description: 'Dedicated 24/7 premium member support line',
    stat: '24/7'
  }
];

export function PremiumSubscription({ user }: PremiumSubscriptionProps) {
  const [selectedPlan, setSelectedPlan] = useState('premium');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const currentPlan = subscriptionPlans.find(plan => plan.id === currentSubscription.plan);
  const isCurrentlyPremium = user?.isPremium || currentSubscription.plan !== 'basic';

  return (
    <div className="space-y-6">
      {/* Current Subscription Status */}
      {isCurrentlyPremium && (
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-blue-800">
              <Crown className="h-5 w-5" />
              <span>Premium Active</span>
              <Badge className="bg-blue-500">Current Plan</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="text-sm text-blue-600 mb-1">Current Plan</p>
                <p className="text-xl font-medium text-blue-800">{currentPlan?.name}</p>
              </div>
              <div>
                <p className="text-sm text-blue-600 mb-1">Days Remaining</p>
                <p className="text-xl font-medium text-blue-800">{currentSubscription.daysLeft} days</p>
              </div>
              <div>
                <p className="text-sm text-blue-600 mb-1">Expires On</p>
                <p className="text-xl font-medium text-blue-800">{currentSubscription.endDate}</p>
              </div>
            </div>
            
            <Separator className="my-4" />
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm text-blue-700">
                  Auto-renewal is {currentSubscription.autoRenew ? 'enabled' : 'disabled'}
                </span>
              </div>
              <Button variant="outline" size="sm">
                Manage Subscription
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Benefits Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {benefits.map((benefit, index) => {
          const IconComponent = benefit.icon;
          return (
            <Card key={index}>
              <CardContent className="p-6 text-center">
                <div className="bg-blue-100 rounded-full p-3 w-fit mx-auto mb-4">
                  <IconComponent className="h-6 w-6 text-blue-600" />
                </div>
                <div className="text-2xl font-medium text-blue-600 mb-2">{benefit.stat}</div>
                <h3 className="font-medium mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Billing Toggle */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center space-x-4">
            <span className={`text-sm ${billingCycle === 'monthly' ? 'font-medium' : 'text-muted-foreground'}`}>
              Monthly
            </span>
            <button
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                billingCycle === 'yearly' ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  billingCycle === 'yearly' ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`text-sm ${billingCycle === 'yearly' ? 'font-medium' : 'text-muted-foreground'}`}>
              Yearly
            </span>
            {billingCycle === 'yearly' && (
              <Badge className="bg-green-500">Save 20%</Badge>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Subscription Plans */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {subscriptionPlans.map(plan => {
          const IconComponent = plan.icon;
          const yearlyPrice = Math.round(plan.price * 12 * 0.8); // 20% discount
          const displayPrice = billingCycle === 'yearly' ? yearlyPrice : plan.price;
          const period = billingCycle === 'yearly' ? 'per year' : plan.period;
          
          return (
            <Card 
              key={plan.id}
              className={`relative transition-all hover:shadow-lg ${
                plan.popular ? 'border-blue-500 shadow-md scale-105' : ''
              } ${selectedPlan === plan.id ? 'ring-2 ring-blue-500' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-blue-500 px-4 py-1">Most Popular</Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-4">
                <div className={`${plan.color} rounded-full p-3 w-fit mx-auto mb-4 text-white`}>
                  <IconComponent className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <div className="space-y-2">
                  <div className="flex items-baseline justify-center space-x-1">
                    <span className="text-3xl font-bold">₹{displayPrice}</span>
                    <span className="text-muted-foreground">/{period}</span>
                  </div>
                  {billingCycle === 'yearly' && plan.price > 0 && (
                    <div className="text-sm text-green-600">
                      Save ₹{(plan.price * 12) - yearlyPrice} per year
                    </div>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{plan.description}</p>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      {feature.included ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <X className="h-4 w-4 text-muted-foreground" />
                      )}
                      <span className={`text-sm ${
                        feature.included ? '' : 'text-muted-foreground line-through'
                      }`}>
                        {feature.name}
                      </span>
                    </div>
                  ))}
                </div>
                
                <Separator />
                
                <Button 
                  className="w-full" 
                  variant={plan.id === currentSubscription.plan ? 'outline' : 'default'}
                  onClick={() => setSelectedPlan(plan.id)}
                  disabled={plan.id === currentSubscription.plan}
                >
                  {plan.id === currentSubscription.plan ? 'Current Plan' : 
                   plan.id === 'basic' ? 'Downgrade' : 'Upgrade Now'}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Premium Features Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Gift className="h-5 w-5" />
            <span>What You Get with Premium</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="bg-blue-100 rounded-full p-2 mt-1">
                  <Target className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium">Priority Job Matching</h4>
                  <p className="text-sm text-muted-foreground">
                    Get notified first about high-paying jobs in your area
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="bg-green-100 rounded-full p-2 mt-1">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <h4 className="font-medium">Enhanced Profile Visibility</h4>
                  <p className="text-sm text-muted-foreground">
                    Stand out with premium badges and detailed portfolio
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="bg-purple-100 rounded-full p-2 mt-1">
                  <Award className="h-4 w-4 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-medium">Exclusive Opportunities</h4>
                  <p className="text-sm text-muted-foreground">
                    Access to premium customers and high-value projects
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="bg-orange-100 rounded-full p-2 mt-1">
                  <Phone className="h-4 w-4 text-orange-600" />
                </div>
                <div>
                  <h4 className="font-medium">Priority Customer Support</h4>
                  <p className="text-sm text-muted-foreground">
                    24/7 dedicated support with faster response times
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="bg-red-100 rounded-full p-2 mt-1">
                  <Star className="h-4 w-4 text-red-600" />
                </div>
                <div>
                  <h4 className="font-medium">Advanced Analytics</h4>
                  <p className="text-sm text-muted-foreground">
                    Detailed insights into your earnings and performance
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="bg-yellow-100 rounded-full p-2 mt-1">
                  <Zap className="h-4 w-4 text-yellow-600" />
                </div>
                <div>
                  <h4 className="font-medium">Marketing Tools</h4>
                  <p className="text-sm text-muted-foreground">
                    Promote your services with built-in marketing features
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Testimonials */}
      <Card>
        <CardHeader>
          <CardTitle>What Premium Members Say</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-muted rounded-lg">
              <div className="flex items-center space-x-3 mb-3">
                <div className="bg-blue-500 rounded-full p-2 text-white">
                  <Star className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-medium">Rajesh Kumar</p>
                  <p className="text-sm text-muted-foreground">Plumber, 3 years premium</p>
                </div>
              </div>
              <p className="text-sm">
                "Since upgrading to premium, my monthly earnings have increased by 60%. 
                The priority job notifications really make a difference!"
              </p>
            </div>
            
            <div className="p-4 bg-muted rounded-lg">
              <div className="flex items-center space-x-3 mb-3">
                <div className="bg-green-500 rounded-full p-2 text-white">
                  <Crown className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-medium">Priya Sharma</p>
                  <p className="text-sm text-muted-foreground">Electrician, 2 years premium</p>
                </div>
              </div>
              <p className="text-sm">
                "The professional portfolio feature helped me showcase my work better. 
                Now I get repeat customers and referrals regularly."
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}