
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, TrendingDown, Shield, AlertTriangle } from 'lucide-react';

export const FraudAnalytics = () => {
  const [timeframe, setTimeframe] = useState('24h');
  
  // Mock data for charts
  const fraudTrends = [
    { time: '00:00', fraudulent: 12, legitimate: 148 },
    { time: '04:00', fraudulent: 8, legitimate: 92 },
    { time: '08:00', fraudulent: 24, legitimate: 287 },
    { time: '12:00', fraudulent: 31, legitimate: 412 },
    { time: '16:00', fraudulent: 28, legitimate: 356 },
    { time: '20:00', fraudulent: 19, legitimate: 234 }
  ];

  const fraudByMethod = [
    { method: 'Credit Card', fraudulent: 45, total: 892, rate: 5.0 },
    { method: 'Debit Card', fraudulent: 32, total: 756, rate: 4.2 },
    { method: 'Mobile Payment', fraudulent: 18, total: 423, rate: 4.3 },
    { method: 'Bank Transfer', fraudulent: 12, total: 234, rate: 5.1 },
    { method: 'Digital Wallet', fraudulent: 8, total: 167, rate: 4.8 }
  ];

  const riskDistribution = [
    { name: 'Low Risk', value: 78, color: '#10B981' },
    { name: 'Medium Risk', value: 15, color: '#F59E0B' },
    { name: 'High Risk', value: 7, color: '#EF4444' }
  ];

  const monthlyStats = [
    { month: 'Jan', prevented: 2400, detected: 2100, savings: 1200000 },
    { month: 'Feb', prevented: 2800, detected: 2300, savings: 1450000 },
    { month: 'Mar', prevented: 3200, detected: 2800, savings: 1680000 },
    { month: 'Apr', prevented: 2900, detected: 2500, savings: 1520000 },
    { month: 'May', prevented: 3400, detected: 3100, savings: 1890000 },
    { month: 'Jun', prevented: 3800, detected: 3400, savings: 2100000 }
  ];

  const realTimeMetrics = {
    transactionsProcessed: 15678,
    fraudDetected: 89,
    falsePositives: 12,
    moneySaved: 1250000,
    avgResponseTime: 0.15
  };

  return (
    <div className="space-y-6">
      {/* Real-time Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Transactions Processed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{realTimeMetrics.transactionsProcessed.toLocaleString()}</div>
            <div className="flex items-center text-sm text-green-600">
              <TrendingUp className="h-4 w-4 mr-1" />
              +12.5%
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Fraud Detected</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{realTimeMetrics.fraudDetected}</div>
            <div className="flex items-center text-sm text-red-600">
              <TrendingDown className="h-4 w-4 mr-1" />
              -3.2%
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">False Positives</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{realTimeMetrics.falsePositives}</div>
            <div className="flex items-center text-sm text-green-600">
              <TrendingDown className="h-4 w-4 mr-1" />
              -8.1%
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Money Saved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              ${(realTimeMetrics.moneySaved / 1000000).toFixed(1)}M
            </div>
            <div className="flex items-center text-sm text-green-600">
              <TrendingUp className="h-4 w-4 mr-1" />
              +15.3%
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{realTimeMetrics.avgResponseTime}s</div>
            <div className="flex items-center text-sm text-green-600">
              <TrendingDown className="h-4 w-4 mr-1" />
              -5.7%
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Tabs */}
      <Tabs defaultValue="trends" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="trends">Fraud Trends</TabsTrigger>
          <TabsTrigger value="methods">Payment Methods</TabsTrigger>
          <TabsTrigger value="risk">Risk Distribution</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Fraud Detection Trends (24 Hours)</CardTitle>
              <CardDescription>
                Real-time fraud detection patterns throughout the day
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={fraudTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="fraudulent" stroke="#EF4444" strokeWidth={2} />
                  <Line type="monotone" dataKey="legitimate" stroke="#10B981" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="methods" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Fraud by Payment Method</CardTitle>
              <CardDescription>
                Fraud rates across different payment methods
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={fraudByMethod}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="method" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="fraudulent" fill="#EF4444" />
                  <Bar dataKey="total" fill="#10B981" />
                </BarChart>
              </ResponsiveContainer>
              
              <div className="mt-4 space-y-2">
                {fraudByMethod.map((method) => (
                  <div key={method.method} className="flex items-center justify-between">
                    <span className="font-medium">{method.method}</span>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">
                        {method.fraudulent}/{method.total} transactions
                      </Badge>
                      <Badge className={method.rate > 5 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}>
                        {method.rate}% fraud rate
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="risk" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Risk Score Distribution</CardTitle>
              <CardDescription>
                Distribution of transactions by risk level
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={riskDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {riskDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mt-4">
                {riskDistribution.map((risk) => (
                  <div key={risk.name} className="text-center">
                    <div className="text-2xl font-bold" style={{ color: risk.color }}>
                      {risk.value}%
                    </div>
                    <div className="text-sm text-gray-600">{risk.name}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Performance Metrics</CardTitle>
              <CardDescription>
                Fraud prevention effectiveness and financial impact
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyStats}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value, name) => {
                    if (name === 'savings') {
                      return [`$${(value as number / 1000000).toFixed(1)}M`, 'Money Saved'];
                    }
                    return [value, name];
                  }} />
                  <Bar dataKey="prevented" fill="#10B981" name="Fraud Prevented" />
                  <Bar dataKey="detected" fill="#3B82F6" name="Fraud Detected" />
                </BarChart>
              </ResponsiveContainer>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <Shield className="h-8 w-8 mx-auto text-green-600 mb-2" />
                  <div className="text-2xl font-bold text-green-600">18,600</div>
                  <div className="text-sm text-green-700">Total Fraud Prevented</div>
                </div>

                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <AlertTriangle className="h-8 w-8 mx-auto text-blue-600 mb-2" />
                  <div className="text-2xl font-bold text-blue-600">16,200</div>
                  <div className="text-sm text-blue-700">Total Fraud Detected</div>
                </div>

                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <TrendingUp className="h-8 w-8 mx-auto text-purple-600 mb-2" />
                  <div className="text-2xl font-bold text-purple-600">$9.8M</div>
                  <div className="text-sm text-purple-700">Total Money Saved</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
