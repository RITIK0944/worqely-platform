import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Separator } from '../ui/separator';
import { 
  Shield, 
  Heart, 
  Home, 
  Car,
  FileText,
  Phone,
  Clock,
  CheckCircle,
  AlertTriangle,
  Plus,
  Download,
  Calculator,
  Building,
  ExternalLink
} from 'lucide-react';
import { User as UserType } from '../../App';

interface InsuranceSectionProps {
  user: UserType | null;
}

const insurancePlans = [
  {
    id: 'health',
    name: 'Health Insurance',
    icon: Heart,
    premium: 2400,
    coverage: '₹5,00,000',
    status: 'active',
    expiryDate: '2024-12-31',
    benefits: [
      'Hospitalization coverage',
      'OPD benefits',
      'Maternity coverage',
      'Pre/Post hospitalization'
    ],
    color: 'bg-red-500'
  },
  {
    id: 'life',
    name: 'Life Insurance',
    icon: Shield,
    premium: 3600,
    coverage: '₹10,00,000',
    status: 'active',
    expiryDate: '2024-11-15',
    benefits: [
      'Term life coverage',
      'Accidental death benefit',
      'Disability coverage',
      'Critical illness rider'
    ],
    color: 'bg-blue-500'
  },
  {
    id: 'tool',
    name: 'Tool Insurance',
    icon: Car,
    premium: 1200,
    coverage: '₹50,000',
    status: 'expired',
    expiryDate: '2023-12-01',
    benefits: [
      'Tool theft coverage',
      'Equipment damage',
      'Replacement cost',
      'Third party liability'
    ],
    color: 'bg-orange-500'
  },
  {
    id: 'accident',
    name: 'Personal Accident',
    icon: AlertTriangle,
    premium: 800,
    coverage: '₹2,00,000',
    status: 'pending',
    expiryDate: '2024-06-30',
    benefits: [
      'Accidental death',
      'Permanent disability',
      'Temporary disability',
      'Medical expenses'
    ],
    color: 'bg-purple-500'
  }
];

const recentClaims = [
  {
    id: '1',
    type: 'Health Insurance',
    amount: '₹15,000',
    date: '2024-01-10',
    status: 'approved',
    description: 'Fever treatment at City Hospital'
  },
  {
    id: '2',
    type: 'Tool Insurance',
    amount: '₹8,500',
    date: '2023-12-15',
    status: 'processing',
    description: 'Drill machine replacement'
  }
];

export function InsuranceSection({ user }: InsuranceSectionProps) {
  const [activeTab, setActiveTab] = useState('overview');

  const totalPremium = insurancePlans.reduce((sum, plan) => 
    plan.status === 'active' ? sum + plan.premium : sum, 0
  );

  const activePlans = insurancePlans.filter(plan => plan.status === 'active').length;
  const expiredPlans = insurancePlans.filter(plan => plan.status === 'expired').length;

  return (
    <div className="space-y-6">
      {/* Insurance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Plans</p>
                <p className="text-2xl">{activePlans}</p>
              </div>
              <Shield className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Coverage</p>
                <p className="text-2xl">₹17.5L</p>
              </div>
              <Heart className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Annual Premium</p>
                <p className="text-2xl">₹{totalPremium}</p>
              </div>
              <Calculator className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Claims</p>
                <p className="text-2xl">{recentClaims.length}</p>
              </div>
              <FileText className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

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
          variant={activeTab === 'plans' ? 'default' : 'outline'}
          onClick={() => setActiveTab('plans')}
          size="sm"
        >
          My Plans
        </Button>
        <Button 
          variant={activeTab === 'claims' ? 'default' : 'outline'}
          onClick={() => setActiveTab('claims')}
          size="sm"
        >
          Claims
        </Button>
        <Button 
          variant={activeTab === 'explore' ? 'default' : 'outline'}
          onClick={() => setActiveTab('explore')}
          size="sm"
        >
          Explore Plans
        </Button>
        <Button 
          variant={activeTab === 'govt-benefits' ? 'default' : 'outline'}
          onClick={() => setActiveTab('govt-benefits')}
          size="sm"
        >
          Govt Benefits
        </Button>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Coverage Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span>Coverage Summary</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Health Coverage</span>
                    <span className="font-medium">₹5,00,000</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Life Coverage</span>
                    <span className="font-medium">₹10,00,000</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Personal Accident</span>
                    <span className="font-medium">₹2,00,000</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center font-medium">
                    <span>Total Coverage</span>
                    <span>₹17,50,000</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-medium text-green-800 mb-2">Well Protected!</h4>
                    <p className="text-sm text-green-600">
                      You have comprehensive coverage across multiple insurance categories.
                    </p>
                  </div>
                  <div className="p-4 bg-yellow-50 rounded-lg">
                    <h4 className="font-medium text-yellow-800 mb-2">Action Required</h4>
                    <p className="text-sm text-yellow-600">
                      Your tool insurance has expired. Renew to maintain protection.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Premium Payment Timeline */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-5 w-5" />
                <span>Upcoming Premium Payments</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Heart className="h-5 w-5 text-red-500" />
                    <div>
                      <p className="font-medium">Health Insurance</p>
                      <p className="text-sm text-muted-foreground">Due: December 31, 2024</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">₹2,400</p>
                    <Badge variant="outline">358 days left</Badge>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Shield className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="font-medium">Life Insurance</p>
                      <p className="text-sm text-muted-foreground">Due: November 15, 2024</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">₹3,600</p>
                    <Badge variant="outline">312 days left</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* My Plans Tab */}
      {activeTab === 'plans' && (
        <div className="space-y-4">
          {insurancePlans.map(plan => {
            const IconComponent = plan.icon;
            return (
              <Card key={plan.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className={`p-3 rounded-lg ${plan.color} text-white`}>
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-medium">{plan.name}</h3>
                          <Badge 
                            variant={plan.status === 'active' ? 'default' : 
                                   plan.status === 'expired' ? 'destructive' : 'secondary'}
                            className={plan.status === 'active' ? 'bg-green-500' : ''}
                          >
                            {plan.status.charAt(0).toUpperCase() + plan.status.slice(1)}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div>
                            <p className="text-sm text-muted-foreground">Coverage Amount</p>
                            <p className="font-medium">{plan.coverage}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Annual Premium</p>
                            <p className="font-medium">₹{plan.premium}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Expiry Date</p>
                            <p className="font-medium">{plan.expiryDate}</p>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-2">Benefits:</p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
                            {plan.benefits.map((benefit, index) => (
                              <div key={index} className="flex items-center space-x-2">
                                <CheckCircle className="h-3 w-3 text-green-500" />
                                <span className="text-sm">{benefit}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col space-y-2">
                      {plan.status === 'active' && (
                        <>
                          <Button size="sm" variant="outline">
                            <Download className="h-4 w-4 mr-2" />
                            Policy
                          </Button>
                          <Button size="sm" variant="outline">
                            <FileText className="h-4 w-4 mr-2" />
                            Claim
                          </Button>
                        </>
                      )}
                      {plan.status === 'expired' && (
                        <Button size="sm">
                          Renew Now
                        </Button>
                      )}
                      {plan.status === 'pending' && (
                        <Button size="sm" variant="outline">
                          Complete
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Claims Tab */}
      {activeTab === 'claims' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <FileText className="h-5 w-5" />
                  <span>Claims History</span>
                </div>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  New Claim
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentClaims.map(claim => (
                  <div key={claim.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className={`p-2 rounded-full ${
                        claim.status === 'approved' ? 'bg-green-100' : 'bg-yellow-100'
                      }`}>
                        <FileText className={`h-4 w-4 ${
                          claim.status === 'approved' ? 'text-green-600' : 'text-yellow-600'
                        }`} />
                      </div>
                      <div>
                        <p className="font-medium">{claim.type}</p>
                        <p className="text-sm text-muted-foreground">{claim.description}</p>
                        <p className="text-xs text-muted-foreground">{claim.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{claim.amount}</p>
                      <Badge 
                        variant={claim.status === 'approved' ? 'default' : 'secondary'}
                        className={claim.status === 'approved' ? 'bg-green-500' : ''}
                      >
                        {claim.status.charAt(0).toUpperCase() + claim.status.slice(1)}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>How to File a Claim</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="bg-blue-100 rounded-full p-2 mt-1">
                    <span className="text-blue-600 font-medium text-sm">1</span>
                  </div>
                  <div>
                    <p className="font-medium">Report the incident</p>
                    <p className="text-sm text-muted-foreground">
                      Call our 24/7 helpline or use the mobile app to report your claim
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-blue-100 rounded-full p-2 mt-1">
                    <span className="text-blue-600 font-medium text-sm">2</span>
                  </div>
                  <div>
                    <p className="font-medium">Submit documents</p>
                    <p className="text-sm text-muted-foreground">
                      Upload required documents like bills, reports, and ID proof
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-blue-100 rounded-full p-2 mt-1">
                    <span className="text-blue-600 font-medium text-sm">3</span>
                  </div>
                  <div>
                    <p className="font-medium">Track your claim</p>
                    <p className="text-sm text-muted-foreground">
                      Monitor claim status and receive updates via SMS and email
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Phone className="h-4 w-4 text-blue-600" />
                  <span className="font-medium text-blue-800">24/7 Claim Helpline</span>
                </div>
                <p className="text-blue-600">1800-XXX-XXXX</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Explore Plans Tab */}
      {activeTab === 'explore' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recommended Plans for You</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-2 border-green-200">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-3 mb-4">
                      <Home className="h-6 w-6 text-green-600" />
                      <div>
                        <h3 className="font-medium">Home Insurance</h3>
                        <p className="text-sm text-muted-foreground">Protect your home and belongings</p>
                      </div>
                    </div>
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between">
                        <span className="text-sm">Coverage</span>
                        <span className="font-medium">₹15,00,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Premium</span>
                        <span className="font-medium">₹3,500/year</span>
                      </div>
                    </div>
                    <Button className="w-full" size="sm">
                      Get Quote
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-2 border-blue-200">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-3 mb-4">
                      <Car className="h-6 w-6 text-blue-600" />
                      <div>
                        <h3 className="font-medium">Vehicle Insurance</h3>
                        <p className="text-sm text-muted-foreground">Comprehensive vehicle protection</p>
                      </div>
                    </div>
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between">
                        <span className="text-sm">Coverage</span>
                        <span className="font-medium">₹5,00,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Premium</span>
                        <span className="font-medium">₹2,800/year</span>
                      </div>
                    </div>
                    <Button className="w-full" size="sm" variant="outline">
                      Learn More
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Government Benefits Tab */}
      {activeTab === 'govt-benefits' && (
        <div className="space-y-6">
          <Card className="border-2 border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Building className="h-5 w-5 text-green-600" />
                <span>Government Benefit Policies</span>
              </CardTitle>
              <p className="text-muted-foreground">
                Access government schemes and benefits designed for Indian workers
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* ESIC */}
                <Card className="border border-blue-200">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-3 mb-4">
                      <Heart className="h-6 w-6 text-blue-600" />
                      <div>
                        <h3 className="font-semibold text-blue-800">ESIC</h3>
                        <p className="text-sm text-blue-600">Employee State Insurance Corporation</p>
                      </div>
                    </div>
                    <div className="space-y-2 mb-4">
                      <p className="text-sm text-gray-600">
                        Medical care and cash benefits for employees and their dependents
                      </p>
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-3 w-3 text-green-500" />
                          <span className="text-xs">Medical treatment</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-3 w-3 text-green-500" />
                          <span className="text-xs">Sickness benefit</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-3 w-3 text-green-500" />
                          <span className="text-xs">Maternity benefit</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-3 w-3 text-green-500" />
                          <span className="text-xs">Disability benefit</span>
                        </div>
                      </div>
                    </div>
                    <Button className="w-full" size="sm">
                      <ExternalLink className="h-3 w-3 mr-1" />
                      Apply for ESIC
                    </Button>
                  </CardContent>
                </Card>

                {/* PM Shram Yogi Maandhan Yojana */}
                <Card className="border border-orange-200">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-3 mb-4">
                      <Shield className="h-6 w-6 text-orange-600" />
                      <div>
                        <h3 className="font-semibold text-orange-800">PM Shram Yogi Maandhan</h3>
                        <p className="text-sm text-orange-600">Pension Scheme for Workers</p>
                      </div>
                    </div>
                    <div className="space-y-2 mb-4">
                      <p className="text-sm text-gray-600">
                        Monthly pension of ₹3,000 after 60 years for unorganized workers
                      </p>
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-3 w-3 text-green-500" />
                          <span className="text-xs">₹3,000 monthly pension</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-3 w-3 text-green-500" />
                          <span className="text-xs">Entry age 18-40 years</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-3 w-3 text-green-500" />
                          <span className="text-xs">Monthly contribution ₹55-200</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-3 w-3 text-green-500" />
                          <span className="text-xs">Government co-contribution</span>
                        </div>
                      </div>
                    </div>
                    <Button className="w-full" size="sm" variant="outline">
                      <ExternalLink className="h-3 w-3 mr-1" />
                      Apply for Pension
                    </Button>
                  </CardContent>
                </Card>

                {/* Ayushman Bharat */}
                <Card className="border border-green-200">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-3 mb-4">
                      <Heart className="h-6 w-6 text-green-600" />
                      <div>
                        <h3 className="font-semibold text-green-800">Ayushman Bharat</h3>
                        <p className="text-sm text-green-600">Pradhan Mantri Jan Arogya Yojana</p>
                      </div>
                    </div>
                    <div className="space-y-2 mb-4">
                      <p className="text-sm text-gray-600">
                        Health insurance coverage up to ₹5 lakh per family per year
                      </p>
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-3 w-3 text-green-500" />
                          <span className="text-xs">₹5 lakh annual coverage</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-3 w-3 text-green-500" />
                          <span className="text-xs">Cashless treatment</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-3 w-3 text-green-500" />
                          <span className="text-xs">1,400+ medical packages</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-3 w-3 text-green-500" />
                          <span className="text-xs">Pre and post hospitalization</span>
                        </div>
                      </div>
                    </div>
                    <Button className="w-full" size="sm">
                      <ExternalLink className="h-3 w-3 mr-1" />
                      Check Eligibility
                    </Button>
                  </CardContent>
                </Card>

                {/* PM Jeevan Jyoti Bima Yojana */}
                <Card className="border border-purple-200">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-3 mb-4">
                      <Shield className="h-6 w-6 text-purple-600" />
                      <div>
                        <h3 className="font-semibold text-purple-800">PM Jeevan Jyoti Bima</h3>
                        <p className="text-sm text-purple-600">Life Insurance Scheme</p>
                      </div>
                    </div>
                    <div className="space-y-2 mb-4">
                      <p className="text-sm text-gray-600">
                        Term life insurance of ₹2 lakh for just ₹330 per year
                      </p>
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-3 w-3 text-green-500" />
                          <span className="text-xs">₹2 lakh life cover</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-3 w-3 text-green-500" />
                          <span className="text-xs">Annual premium ₹330</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-3 w-3 text-green-500" />
                          <span className="text-xs">Age 18-50 years</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-3 w-3 text-green-500" />
                          <span className="text-xs">Auto-debit facility</span>
                        </div>
                      </div>
                    </div>
                    <Button className="w-full" size="sm" variant="outline">
                      <ExternalLink className="h-3 w-3 mr-1" />
                      Apply for Insurance
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Application Help */}
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-2 mb-3">
                  <Phone className="h-4 w-4 text-blue-600" />
                  <span className="font-medium text-blue-800">Need Help with Applications?</span>
                </div>
                <p className="text-sm text-blue-700 mb-3">
                  Our team can help you with documentation and application process for these government schemes.
                </p>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    <Phone className="h-3 w-3 mr-1" />
                    Call: 8340 315 955
                  </Button>
                  <Button size="sm" variant="outline">
                    Schedule Consultation
                  </Button>
                </div>
              </div>

              {/* Benefits Status */}
              <Card className="border border-gray-200">
                <CardHeader>
                  <CardTitle className="text-sm">My Government Benefits Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">ESIC Registration</span>
                      <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">PM Shram Yogi Pension</span>
                      <Badge className="bg-gray-100 text-gray-800">Not Applied</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Ayushman Bharat</span>
                      <Badge className="bg-green-100 text-green-800">Active</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">PM Jeevan Jyoti</span>
                      <Badge className="bg-gray-100 text-gray-800">Not Applied</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}