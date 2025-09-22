import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  Calendar,
  Target,
  Award,
  Download,
  Filter,
  BarChart3,
  PieChart
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { User as UserType } from '../../App';

interface EarningsTrackingProps {
  user: UserType | null;
}

// Mock earnings data
const mockEarnings = {
  today: 1500,
  thisWeek: 8500,
  thisMonth: 32000,
  lastMonth: 28500,
  totalEarnings: 125000,
  monthlyGoal: 50000,
  totalJobs: 157,
  avgPerJob: 800
};

// Generate current week dates
const getCurrentWeekDates = () => {
  const today = new Date();
  const currentDay = today.getDay();
  const monday = new Date(today);
  monday.setDate(today.getDate() - (currentDay === 0 ? 6 : currentDay - 1));
  
  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date(monday);
    date.setDate(monday.getDate() + i);
    return date;
  });
};

const weekDates = getCurrentWeekDates();

const weeklyData = [
  { date: '15 Sep 2025', fullDate: weekDates[0], earnings: 1200, jobs: 2 },
  { date: '16 Sep 2025', fullDate: weekDates[1], earnings: 1800, jobs: 3 },
  { date: '17 Sep 2025', fullDate: weekDates[2], earnings: 950, jobs: 1 },
  { date: '18 Sep 2025', fullDate: weekDates[3], earnings: 2100, jobs: 3 },
  { date: '19 Sep 2025', fullDate: weekDates[4], earnings: 1650, jobs: 2 },
  { date: '20 Sep 2025', fullDate: weekDates[5], earnings: 800, jobs: 1 },
  { date: '21 Sep 2025', fullDate: weekDates[6], earnings: 0, jobs: 0 }
];

const monthlyBreakdown = [
  { month: 'Jan', earnings: 28500, jobs: 42 },
  { month: 'Feb', earnings: 31200, jobs: 45 },
  { month: 'Mar', earnings: 29800, jobs: 41 },
  { month: 'Apr', earnings: 32000, jobs: 48 },
];

const recentTransactions = [
  { id: '1', date: '2024-01-20', customer: 'Arjun Patel', service: 'Plumbing', amount: 800, status: 'Paid' },
  { id: '2', date: '2024-01-19', customer: 'Kavita Sharma', service: 'Plumbing', amount: 1200, status: 'Paid' },
  { id: '3', date: '2024-01-18', customer: 'Rohit Kumar', service: 'Plumbing', amount: 650, status: 'Pending' },
  { id: '4', date: '2024-01-17', customer: 'Sneha Singh', service: 'Plumbing', amount: 950, status: 'Paid' },
  { id: '5', date: '2024-01-16', customer: 'Manoj Gupta', service: 'Plumbing', amount: 1100, status: 'Paid' },
];

export function EarningsTracking({ user }: EarningsTrackingProps) {
  const [selectedPeriod, setSelectedPeriod] = useState('thisMonth');

  const monthlyProgress = (mockEarnings.thisMonth / mockEarnings.monthlyGoal) * 100;
  const monthlyGrowth = ((mockEarnings.thisMonth - mockEarnings.lastMonth) / mockEarnings.lastMonth * 100).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Earnings Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Today's Earnings</p>
                <p className="text-2xl">₹{mockEarnings.today}</p>
                <p className="text-xs text-green-600">+12% from yesterday</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">15 Sep - 21 Sep 2025</p>
                <p className="text-2xl">₹{mockEarnings.thisWeek}</p>
                <p className="text-xs text-green-600">+8% from previous week</p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">This Month</p>
                <p className="text-2xl">₹{mockEarnings.thisMonth}</p>
                <p className={`text-xs ${Number(monthlyGrowth) > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {Number(monthlyGrowth) > 0 ? '+' : ''}{monthlyGrowth}% from last month
                </p>
              </div>
              <Calendar className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Average/Job</p>
                <p className="text-2xl">₹{mockEarnings.avgPerJob}</p>
                <p className="text-xs text-muted-foreground">{mockEarnings.totalJobs} total jobs</p>
              </div>
              <Award className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Goal Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Target className="h-5 w-5" />
              <span>Monthly Goal Progress</span>
            </div>
            <Badge variant="outline">₹{mockEarnings.thisMonth} / ₹{mockEarnings.monthlyGoal}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Progress value={monthlyProgress} className="h-3" />
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">
                {monthlyProgress.toFixed(1)}% completed
              </span>
              <span className="text-muted-foreground">
                ₹{mockEarnings.monthlyGoal - mockEarnings.thisMonth} remaining
              </span>
            </div>
            {monthlyProgress >= 100 ? (
              <div className="flex items-center space-x-2 text-green-600">
                <Award className="h-4 w-4" />
                <span>Congratulations! You've exceeded your monthly goal!</span>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                Keep up the great work to reach your monthly target!
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Detailed Analytics */}
      <Tabs defaultValue="weekly" className="space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
          <TabsList>
            <TabsTrigger value="weekly" className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4" />
              <span>Weekly</span>
            </TabsTrigger>
            <TabsTrigger value="monthly" className="flex items-center space-x-2">
              <PieChart className="h-4 w-4" />
              <span>Monthly</span>
            </TabsTrigger>
            <TabsTrigger value="transactions" className="flex items-center space-x-2">
              <DollarSign className="h-4 w-4" />
              <span>Transactions</span>
            </TabsTrigger>
          </TabsList>
          
          <div className="flex items-center space-x-2">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-[150px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="thisWeek">This Week</SelectItem>
                <SelectItem value="thisMonth">This Month</SelectItem>
                <SelectItem value="last3Months">Last 3 Months</SelectItem>
                <SelectItem value="thisYear">This Year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        <TabsContent value="weekly">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {weeklyData.map((day, index) => (
                  <div key={day.date} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-20 text-center">
                        <p className="font-medium text-sm">{day.date}</p>
                        <p className="text-xs text-muted-foreground">
                          {day.fullDate.toLocaleDateString('en-US', { weekday: 'short' })}
                        </p>
                      </div>
                      <div>
                        <p className="font-medium">₹{day.earnings}</p>
                        <p className="text-sm text-muted-foreground">{day.jobs} jobs</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary transition-all"
                          style={{ width: `${(day.earnings / Math.max(...weeklyData.map(d => d.earnings))) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monthly">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {monthlyBreakdown.map((month) => (
                  <div key={month.month} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 text-center">
                        <p className="font-medium">{month.month}</p>
                      </div>
                      <div>
                        <p className="text-lg font-medium">₹{month.earnings}</p>
                        <p className="text-sm text-muted-foreground">{month.jobs} jobs completed</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Avg: ₹{Math.round(month.earnings / month.jobs)}/job</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transactions">
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="text-left">
                        <p className="font-medium">{transaction.customer}</p>
                        <p className="text-sm text-muted-foreground">{transaction.service} • {transaction.date}</p>
                      </div>
                    </div>
                    <div className="text-right flex items-center space-x-3">
                      <div>
                        <p className="font-medium">₹{transaction.amount}</p>
                        <Badge 
                          variant={transaction.status === 'Paid' ? 'default' : 'secondary'}
                          className={transaction.status === 'Paid' ? 'bg-green-500' : ''}
                        >
                          {transaction.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}