import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { ArrowLeft } from 'lucide-react';
import { User as UserType } from '../App';
import { LanguageSelector } from './LanguageSelector';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface LaborLoginProps {
  onNavigate: (page: string) => void;
  onLogin: (user: UserType) => void;
}

// Mock worker data for demonstration
const mockWorkers = [
  {
    id: '1',
    fullName: 'Rajesh Kumar',
    email: 'rajesh@example.com',
    password: 'password',
    mobile: '9876543212',
    type: 'worker' as const,
    workCategory: 'Plumber',
    aadhaarNumber: '1234-5678-9012'
  },
  {
    id: '2', 
    fullName: 'Suresh Patel',
    email: 'suresh@example.com',
    password: 'password',
    mobile: '9876543213',
    type: 'worker' as const,
    workCategory: 'Electrician',
    aadhaarNumber: '2345-6789-0123'
  }
];

export function LaborLogin({ onNavigate, onLogin }: LaborLoginProps) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      const worker = mockWorkers.find(
        w => w.email === formData.email && w.password === formData.password
      );

      if (worker) {
        const { password, ...userWithoutPassword } = worker;
        onLogin(userWithoutPassword);
      } else {
        setError('Invalid email or password');
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <Button 
            variant="ghost" 
            onClick={() => onNavigate('home')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
          <LanguageSelector variant="compact" />
        </div>

        <Card>
          <CardHeader className="text-center">
            <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <ImageWithFallback 
                src="figma:asset/9e2bbd175b93fb6381c9377c8286952ef7ab87da.png" 
                alt="WORQELY Logo" 
                className="h-8 w-8"
              />
            </div>
            <CardTitle>Worker Login</CardTitle>
            <CardDescription>
              Sign in to receive work requests and manage your profile
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your email"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your password"
                />
              </div>

              {error && (
                <p className="text-destructive text-sm text-center">{error}</p>
              )}

              <Button 
                type="submit" 
                className="w-full" 
                disabled={loading}
              >
                {loading ? 'Signing in...' : 'Login as Worker'}
              </Button>
            </form>

            <div className="mt-6 text-center space-y-2">
              <Button variant="link" className="text-sm">
                Forgot Password?
              </Button>
              
              <div className="text-sm text-muted-foreground">
                Don't have an account?{' '}
                <Button 
                  variant="link" 
                  className="p-0 h-auto"
                  onClick={() => onNavigate('worker-signup')}
                >
                  Register here
                </Button>
              </div>
            </div>

            <div className="mt-4 p-3 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">Demo Credentials:</p>
              <p className="text-xs text-muted-foreground">Email: rajesh@example.com</p>
              <p className="text-xs text-muted-foreground">Password: password</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}