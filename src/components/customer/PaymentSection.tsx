import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  CreditCard,
  Wallet,
  Plus,
  Star,
  Gift,
  History,
  Smartphone,
  University,
  DollarSign
} from 'lucide-react';
import { User as UserType } from '../../App';

interface PaymentSectionProps {
  user: UserType;
}

// Mock wallet data
const mockWalletBalance = 2450;
const mockTransactions = [
  { id: 'T001', type: 'Payment', description: 'Plumber service - Rajesh Kumar', amount: -800, date: '2024-01-15', status: 'Completed' },
  { id: 'T002', type: 'Refund', description: 'Cancelled booking refund', amount: 600, date: '2024-01-12', status: 'Completed' },
  { id: 'T003', type: 'Add Money', description: 'Wallet top-up', amount: 1000, date: '2024-01-10', status: 'Completed' },
  { id: 'T004', type: 'Payment', description: 'Electrician service - Suresh Patel', amount: -1200, date: '2024-01-08', status: 'Completed' },
  { id: 'T005', type: 'Tip', description: 'Tip for Amit Singh', amount: -50, date: '2024-01-05', status: 'Completed' }
];

const paymentMethods = [
  { id: 'upi', name: 'UPI', icon: '📱', description: 'Pay using UPI apps like GPay, PhonePe' },
  { id: 'card', name: 'Credit/Debit Card', icon: '💳', description: 'Visa, Mastercard, RuPay' },
  { id: 'netbanking', name: 'Net Banking', icon: '🏦', description: 'All major banks supported' },
  { id: 'wallet', name: 'Digital Wallets', icon: '📱', description: 'Paytm, Amazon Pay, etc.' },
  { id: 'cash', name: 'Cash on Service', icon: '💵', description: 'Pay directly to the worker' }
];

export function PaymentSection({ user }: PaymentSectionProps) {
  const [activeTab, setActiveTab] = useState('wallet');
  const [addMoneyAmount, setAddMoneyAmount] = useState('');
  const [tipAmount, setTipAmount] = useState('');
  const [selectedWorker, setSelectedWorker] = useState('');

  const handleAddMoney = () => {
    if (addMoneyAmount && parseFloat(addMoneyAmount) > 0) {
      alert(`Adding ₹${addMoneyAmount} to your wallet`);
      setAddMoneyAmount('');
    }
  };

  const handleSendTip = () => {
    if (tipAmount && selectedWorker) {
      alert(`Sending ₹${tipAmount} tip to ${selectedWorker}`);
      setTipAmount('');
      setSelectedWorker('');
    }
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'Payment': return '💸';
      case 'Refund': return '↩️';
      case 'Add Money': return '💰';
      case 'Tip': return '⭐';
      default: return '💳';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Payment & Wallet</CardTitle>
          <CardDescription>Manage your payments, wallet balance, and tips</CardDescription>
        </CardHeader>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="wallet" className="flex items-center space-x-1">
            <Wallet className="h-4 w-4" />
            <span className="hidden sm:inline">Wallet</span>
          </TabsTrigger>
          <TabsTrigger value="methods" className="flex items-center space-x-1">
            <CreditCard className="h-4 w-4" />
            <span className="hidden sm:inline">Methods</span>
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center space-x-1">
            <History className="h-4 w-4" />
            <span className="hidden sm:inline">History</span>
          </TabsTrigger>
          <TabsTrigger value="tips" className="flex items-center space-x-1">
            <Star className="h-4 w-4" />
            <span className="hidden sm:inline">Tips</span>
          </TabsTrigger>
        </TabsList>

        {/* Wallet Tab */}
        <TabsContent value="wallet" className="space-y-4">
          {/* Wallet Balance Card */}
          <Card className="bg-gradient-to-r from-green-500 to-emerald-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg mb-2">Wallet Balance</h3>
                  <p className="text-3xl font-bold">₹{mockWalletBalance.toLocaleString()}</p>
                </div>
                <Wallet className="h-12 w-12 opacity-80" />
              </div>
            </CardContent>
          </Card>

          {/* Add Money */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Plus className="h-5 w-5 mr-2" />
                Add Money to Wallet
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {['100', '500', '1000', '2000'].map(amount => (
                  <Button
                    key={amount}
                    variant="outline"
                    onClick={() => setAddMoneyAmount(amount)}
                    className="h-12"
                  >
                    ₹{amount}
                  </Button>
                ))}
              </div>
              
              <div className="flex space-x-2">
                <Input
                  placeholder="Enter custom amount"
                  value={addMoneyAmount}
                  onChange={(e) => setAddMoneyAmount(e.target.value)}
                  type="number"
                />
                <Button onClick={handleAddMoney} disabled={!addMoneyAmount}>
                  Add Money
                </Button>
              </div>

              <p className="text-sm text-muted-foreground">
                💡 Tip: Keep money in wallet for faster payments and exclusive discounts!
              </p>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">
                  ₹{mockTransactions.filter(t => t.amount > 0).reduce((sum, t) => sum + t.amount, 0)}
                </div>
                <div className="text-sm text-muted-foreground">Total Received</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-red-600">
                  ₹{Math.abs(mockTransactions.filter(t => t.amount < 0).reduce((sum, t) => sum + t.amount, 0))}
                </div>
                <div className="text-sm text-muted-foreground">Total Spent</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{mockTransactions.length}</div>
                <div className="text-sm text-muted-foreground">Total Transactions</div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Payment Methods Tab */}
        <TabsContent value="methods" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Available Payment Methods</CardTitle>
              <CardDescription>Choose your preferred payment option for services</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {paymentMethods.map(method => (
                  <div key={method.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50">
                    <div className="flex items-center space-x-4">
                      <div className="text-2xl">{method.icon}</div>
                      <div>
                        <h3 className="font-medium">{method.name}</h3>
                        <p className="text-sm text-muted-foreground">{method.description}</p>
                      </div>
                    </div>
                    <Badge variant="outline">Available</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Security Features */}
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-blue-500 text-white rounded-full p-2">
                  <CreditCard className="h-5 w-5" />
                </div>
                <h3 className="font-medium">Secure Payments</h3>
              </div>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• 256-bit SSL encryption</li>
                <li>• PCI DSS compliant</li>
                <li>• 100% secure transactions</li>
                <li>• Instant refund on cancellations</li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Payment History Tab */}
        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Payment History</CardTitle>
              <CardDescription>Your recent payment transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockTransactions.map(transaction => (
                  <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="text-2xl">{getTransactionIcon(transaction.type)}</div>
                      <div>
                        <h3 className="font-medium">{transaction.description}</h3>
                        <p className="text-sm text-muted-foreground">
                          {transaction.date} • ID: {transaction.id}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-medium ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {transaction.amount > 0 ? '+' : ''}₹{Math.abs(transaction.amount)}
                      </p>
                      <Badge className="bg-green-500 text-white text-xs">
                        {transaction.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tips Tab */}
        <TabsContent value="tips" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Gift className="h-5 w-5 mr-2" />
                Send Tip to Workers
              </CardTitle>
              <CardDescription>Show appreciation for excellent service</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Select Worker</label>
                <select 
                  className="w-full p-2 border rounded-lg"
                  value={selectedWorker}
                  onChange={(e) => setSelectedWorker(e.target.value)}
                >
                  <option value="">Choose a worker you've worked with</option>
                  <option value="Rajesh Kumar">Rajesh Kumar (Plumber)</option>
                  <option value="Suresh Patel">Suresh Patel (Electrician)</option>
                  <option value="Amit Singh">Amit Singh (Carpenter)</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Tip Amount</label>
                <div className="grid grid-cols-4 gap-2 mb-2">
                  {['50', '100', '200', '500'].map(amount => (
                    <Button
                      key={amount}
                      variant="outline"
                      onClick={() => setTipAmount(amount)}
                      className="h-12"
                    >
                      ₹{amount}
                    </Button>
                  ))}
                </div>
                <Input
                  placeholder="Enter custom tip amount"
                  value={tipAmount}
                  onChange={(e) => setTipAmount(e.target.value)}
                  type="number"
                />
              </div>

              <Button 
                className="w-full" 
                onClick={handleSendTip}
                disabled={!selectedWorker || !tipAmount}
              >
                <Star className="h-4 w-4 mr-2" />
                Send Tip
              </Button>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-yellow-800">
                  💡 Tips help workers earn extra and encourage quality service. 
                  Workers love customers who appreciate their hard work!
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}