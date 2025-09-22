import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
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
  Award,
  Sparkles,
  Priority,
  Headphones
} from 'lucide-react';
import { User as UserType } from '../../App';

interface PremiumSectionProps {
  user: UserType | null;
}

const subscriptionPlans = [
  {
    id: 'basic',
    name: 'Basic',
    price: 0,
    period: 'Free',
    description: 'Essential features for basic service needs',
    icon: Shield,
    color: 'bg-gray-500',
    features: [
      { name: 'Standard service booking', included: true },
      { name: 'Basic customer support', included: true },
      { name: 'Standard worker search', included: true },
      { name: 'Basic payment options', included: true },
      { name: 'Priority customer support', included: false },
      { name: 'Premium worker access', included: false },
      { name: 'Task priority boost', included: false }
    ]
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 99,
    period: 'per month',
    description: 'Enhanced experience with priority access',
    icon: Star,
    color: 'bg-blue-500',
    popular: true,
    features: [
      { name: 'All Basic features', included: true },
      { name: 'Priority customer support', included: true },
      { name: 'Premium worker access', included: true },
      { name: 'Task priority boost', included: true },
      { name: 'Exclusive discounts', included: true },
      { name: 'VIP worker access', included: false },
      { name: 'Personalised service', included: false }
    ]
  },
  {
    id: 'vip',
    name: 'VIP',
    price: 199,
    period: 'per month',
    description: 'Ultimate experience with exclusive benefits',
    icon: Crown,
    color: 'bg-purple-500',
    features: [
      { name: 'All Premium features', included: true },
      { name: 'VIP worker access', included: true },
      { name: 'Instant response guarantee', included: true },
      { name: 'Premium insurance coverage', included: true },
      { name: 'Custom service packages', included: true },
      { name: 'Personalised service', included: true }
    ]
  }
];

const currentSubscription = {
  plan: 'basic',
  startDate: '2024-01-01',
  endDate: null,
  autoRenew: false,
  daysLeft: null
};

const benefits = [
  {
    icon: Zap,
    title: 'Priority Booking',
    description: 'Get priority access to top-rated workers',
    stat: '50%'
  },
  {
    icon: Users,
    title: 'Premium Workers',
    description: 'Access to verified premium professionals',
    stat: '3x'
  },
  {
    icon: Headphones,
    title: 'Priority Support',
    description: 'Dedicated customer support line',
    stat: '24/7'
  },
  {
    icon: Award,
    title: 'Exclusive Deals',
    description: 'Special discounts and offers',
    stat: '20%'
  }
];

export function PremiumSection({ user }: PremiumSectionProps) {
  const [selectedPlan, setSelectedPlan] = useState('premium');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const currentPlan = subscriptionPlans.find(plan => plan.id === currentSubscription.plan);
  const isCurrentlyPremium = user?.isPremium || currentSubscription.plan !== 'basic';

  return (
    <div className="space-y-6">
      {/* Current Subscription Status */}
      {!isCurrentlyPremium && (
        <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-blue-800">
              <Sparkles className="h-5 w-5" />
              <span>Upgrade to Premium</span>
              <Badge className="bg-yellow-500 text-black">Limited Offer</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-blue-700 mb-4">
                  Unlock premium features and get priority access to the best workers on WORQELY!
                </p>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Crown className="h-4 w-4 mr-2" />
                  Upgrade Now
                </Button>
              </div>
              <div className="text-sm text-blue-600">
                <div className="flex items-center space-x-2 mb-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Priority worker matching</span>
                </div>
                <div className="flex items-center space-x-2 mb-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>24/7 premium support</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Exclusive discounts</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Premium Benefits Overview */}
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
              <Badge className="bg-green-500">Save 25%</Badge>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Subscription Plans */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {subscriptionPlans.map(plan => {
          const IconComponent = plan.icon;
          const yearlyPrice = Math.round(plan.price * 12 * 0.75); // 25% discount
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
                   plan.id === 'basic' ? 'Current Plan' : 'Upgrade Now'}
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
            <span>Premium Customer Benefits</span>
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
                  <h4 className="font-medium">Priority Worker Matching</h4>
                  <p className="text-sm text-muted-foreground">
                    Get first access to the best available workers before other customers
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="bg-green-100 rounded-full p-2 mt-1">
                  <Users className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <h4 className="font-medium">Premium Worker Network</h4>
                  <p className="text-sm text-muted-foreground">
                    Access to verified premium professionals with higher ratings
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="bg-purple-100 rounded-full p-2 mt-1">
                  <Award className="h-4 w-4 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-medium">Exclusive Discounts</h4>
                  <p className="text-sm text-muted-foreground">
                    Special rates and promotional offers only for premium customers
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
                  <h4 className="font-medium">Premium Customer Support</h4>
                  <p className="text-sm text-muted-foreground">
                    Dedicated 24/7 support line with faster response times
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="bg-red-100 rounded-full p-2 mt-1">
                  <TrendingUp className="h-4 w-4 text-red-600" />
                </div>
                <div>
                  <h4 className="font-medium">Task Priority Boost</h4>
                  <p className="text-sm text-muted-foreground">
                    Your tasks get higher priority and faster worker responses
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="bg-yellow-100 rounded-full p-2 mt-1">
                  <Shield className="h-4 w-4 text-yellow-600" />
                </div>
                <div>
                  <h4 className="font-medium">Enhanced Protection</h4>
                  <p className="text-sm text-muted-foreground">
                    Extended insurance coverage and satisfaction guarantees
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Customer Testimonials */}
      <Card>
        <CardHeader>
          <CardTitle>What Premium Customers Say</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-muted rounded-lg">
              <div className="flex items-center space-x-3 mb-3">
                <div className="bg-blue-500 rounded-full p-2 text-white">
                  <Star className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-medium">Priya Sharma</p>
                  <p className="text-sm text-muted-foreground">Premium customer, 2 years</p>
                </div>
              </div>
              <p className="text-sm">
                "Premium membership has been a game-changer! I always get the best workers 
                and the support team is incredibly responsive. Worth every penny!"
              </p>
            </div>
            
            <div className="p-4 bg-muted rounded-lg">
              <div className="flex items-center space-x-3 mb-3">
                <div className="bg-purple-500 rounded-full p-2 text-white">
                  <Crown className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-medium">Rajesh Kumar</p>
                  <p className="text-sm text-muted-foreground">VIP customer, 1 year</p>
                </div>
              </div>
              <p className="text-sm">
                "The VIP service is outstanding. The personalised service team handles everything, 
                and I never have to worry about finding reliable workers."
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}