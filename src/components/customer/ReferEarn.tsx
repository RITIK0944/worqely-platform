import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { 
  Gift, 
  Share2, 
  Copy, 
  Users, 
  DollarSign, 
  Trophy,
  CheckCircle,
  MessageCircle,
  Mail,
  Smartphone
} from 'lucide-react';
import { User as UserType } from '../../App';

interface ReferEarnProps {
  user: UserType;
}

// Mock referral data
const mockReferralStats = {
  totalReferrals: 8,
  successfulReferrals: 5,
  totalEarnings: 1250,
  pendingEarnings: 300,
  referralCode: 'JOHN2024'
};

const mockReferralHistory = [
  { id: 'R001', name: 'Amit Sharma', phone: '9876543210', status: 'Completed', earnings: 250, date: '2024-01-15' },
  { id: 'R002', name: 'Priya Patel', phone: '9876543211', status: 'Completed', earnings: 250, date: '2024-01-12' },
  { id: 'R003', name: 'Ravi Kumar', phone: '9876543212', status: 'Pending', earnings: 250, date: '2024-01-10' },
  { id: 'R004', name: 'Sunita Devi', phone: '9876543213', status: 'Completed', earnings: 250, date: '2024-01-08' },
  { id: 'R005', name: 'Vikram Singh', phone: '9876543214', status: 'Pending', earnings: 0, date: '2024-01-05' }
];

export function ReferEarn({ user }: ReferEarnProps) {
  const [shareMethod, setShareMethod] = useState<string>('');
  const [referralLink] = useState(`https://workconnect.app/join?ref=${mockReferralStats.referralCode}`);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  const copyToClipboard = (text: string, type: 'link' | 'code') => {
    navigator.clipboard.writeText(text).then(() => {
      if (type === 'link') {
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2000);
      } else {
        setCopiedCode(true);
        setTimeout(() => setCopiedCode(false), 2000);
      }
    });
  };

  const shareViaWhatsApp = () => {
    const message = `Hi! Join WorkConnect and get reliable home services at your doorstep. Use my referral code ${mockReferralStats.referralCode} and we both earn ₹250! Download: ${referralLink}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const shareViaSMS = () => {
    const message = `Join WorkConnect for reliable home services! Use code ${mockReferralStats.referralCode} to earn ₹250. Download: ${referralLink}`;
    const smsUrl = `sms:?body=${encodeURIComponent(message)}`;
    window.location.href = smsUrl;
  };

  const shareViaEmail = () => {
    const subject = 'Join WorkConnect - Get ₹250 Bonus!';
    const body = `Hi,\n\nI've been using WorkConnect for home services and it's amazing! Join using my referral code ${mockReferralStats.referralCode} and we both get ₹250.\n\nDownload the app: ${referralLink}\n\nBest regards,\n${user.fullName}`;
    const emailUrl = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = emailUrl;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-500';
      case 'Pending': return 'bg-yellow-500';
      case 'Failed': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Gift className="h-5 w-5 mr-2" />
            Refer & Earn
          </CardTitle>
          <CardDescription>
            Invite friends and family to earn ₹250 for each successful referral
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Earnings Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-green-500 to-emerald-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Total Earned</p>
                <p className="text-2xl font-bold">₹{mockReferralStats.totalEarnings}</p>
              </div>
              <DollarSign className="h-8 w-8 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Successful Referrals</p>
                <p className="text-2xl font-bold">{mockReferralStats.successfulReferrals}</p>
              </div>
              <CheckCircle className="h-8 w-8 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-pink-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Total Referrals</p>
                <p className="text-2xl font-bold">{mockReferralStats.totalReferrals}</p>
              </div>
              <Users className="h-8 w-8 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-yellow-500 to-orange-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Pending Earnings</p>
                <p className="text-2xl font-bold">₹{mockReferralStats.pendingEarnings}</p>
              </div>
              <Trophy className="h-8 w-8 opacity-80" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* How it Works */}
      <Card>
        <CardHeader>
          <CardTitle>How Refer & Earn Works</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Share2 className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-medium mb-2">1. Share Your Code</h3>
              <p className="text-sm text-muted-foreground">
                Share your unique referral code with friends and family
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-medium mb-2">2. Friend Joins & Books</h3>
              <p className="text-sm text-muted-foreground">
                Your friend signs up and completes their first service booking
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Gift className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-medium mb-2">3. Both Earn ₹250</h3>
              <p className="text-sm text-muted-foreground">
                You get ₹250 in your wallet, and your friend gets ₹250 discount
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Referral Code & Link */}
      <Card>
        <CardHeader>
          <CardTitle>Share Your Referral Code</CardTitle>
          <CardDescription>Use these methods to invite your friends</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Referral Code */}
          <div>
            <label className="text-sm font-medium mb-2 block">Your Referral Code</label>
            <div className="flex space-x-2">
              <Input 
                value={mockReferralStats.referralCode} 
                readOnly 
                className="font-mono text-lg font-bold"
              />
              <Button 
                variant="outline" 
                onClick={() => copyToClipboard(mockReferralStats.referralCode, 'code')}
              >
                {copiedCode ? <CheckCircle className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                {copiedCode ? 'Copied!' : 'Copy'}
              </Button>
            </div>
          </div>

          {/* Referral Link */}
          <div>
            <label className="text-sm font-medium mb-2 block">Your Referral Link</label>
            <div className="flex space-x-2">
              <Input 
                value={referralLink} 
                readOnly 
                className="text-sm"
              />
              <Button 
                variant="outline" 
                onClick={() => copyToClipboard(referralLink, 'link')}
              >
                {copiedLink ? <CheckCircle className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                {copiedLink ? 'Copied!' : 'Copy'}
              </Button>
            </div>
          </div>

          {/* Share Buttons */}
          <div>
            <label className="text-sm font-medium mb-3 block">Quick Share</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <Button onClick={shareViaWhatsApp} className="bg-green-600 hover:bg-green-700">
                <MessageCircle className="h-4 w-4 mr-2" />
                WhatsApp
              </Button>
              
              <Button onClick={shareViaSMS} variant="outline">
                <Smartphone className="h-4 w-4 mr-2" />
                SMS
              </Button>
              
              <Button onClick={shareViaEmail} variant="outline">
                <Mail className="h-4 w-4 mr-2" />
                Email
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Referral History */}
      <Card>
        <CardHeader>
          <CardTitle>Referral History</CardTitle>
          <CardDescription>Track your referral progress and earnings</CardDescription>
        </CardHeader>
        <CardContent>
          {mockReferralHistory.length === 0 ? (
            <div className="text-center py-8">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No referrals yet. Start sharing to earn rewards!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {mockReferralHistory.map((referral) => (
                <div key={referral.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="bg-primary/10 rounded-full p-2">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">{referral.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {referral.phone} • Joined {referral.date}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className={`${getStatusColor(referral.status)} text-white mb-1`}>
                      {referral.status}
                    </Badge>
                    <p className="text-sm font-medium">
                      {referral.earnings > 0 ? `₹${referral.earnings}` : 'Pending completion'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Terms & Conditions */}
      <Card className="bg-yellow-50 border-yellow-200">
        <CardContent className="p-6">
          <h3 className="font-medium mb-3 flex items-center">
            <Trophy className="h-5 w-5 mr-2 text-yellow-600" />
            Terms & Conditions
          </h3>
          <ul className="text-sm space-y-1 text-muted-foreground">
            <li>• You earn ₹250 for each successful referral after their first service completion</li>
            <li>• Your friend gets ₹250 discount on their first booking</li>
            <li>• Referral earnings are credited to your wallet within 24 hours of service completion</li>
            <li>• Self-referrals and fake accounts are not allowed</li>
            <li>• WorkConnect reserves the right to modify terms at any time</li>
            <li>• Maximum 20 successful referrals per month allowed</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}