
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { TransactionMonitor } from '@/components/fraud-detection/TransactionMonitor';
import { AnomalyDetector } from '@/components/fraud-detection/AnomalyDetector';
import { RiskAssessment } from '@/components/fraud-detection/RiskAssessment';
import { FraudAnalytics } from '@/components/fraud-detection/FraudAnalytics';
import { AlertTriangle, Shield, TrendingUp, Activity } from 'lucide-react';

const FraudDetection = () => {
  const [alertCount, setAlertCount] = useState(0);
  const [systemStatus, setSystemStatus] = useState<'healthy' | 'warning' | 'critical'>('healthy');

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setAlertCount(prev => prev + Math.floor(Math.random() * 2));
      
      // Randomly update system status
      const statuses = ['healthy', 'warning', 'critical'] as const;
      setSystemStatus(statuses[Math.floor(Math.random() * 3)]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'bg-green-500';
      case 'warning': return 'bg-yellow-500';
      case 'critical': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Fraud Detection System
          </h1>
          <p className="text-xl text-gray-600">
            Real-time fraud detection using ML and anomaly detection
          </p>
        </div>

        {/* System Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              System Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`w-4 h-4 rounded-full ${getStatusColor(systemStatus)}`} />
                <span className="text-lg font-medium capitalize">{systemStatus}</span>
              </div>
              <div className="flex items-center gap-4">
                <Badge variant="destructive">
                  {alertCount} Active Alerts
                </Badge>
                <Badge variant="outline">
                  Real-time Monitoring
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <Tabs defaultValue="monitor" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="monitor" className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Transaction Monitor
            </TabsTrigger>
            <TabsTrigger value="anomaly" className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Anomaly Detection
            </TabsTrigger>
            <TabsTrigger value="risk" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Risk Assessment
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="monitor" className="space-y-6">
            <TransactionMonitor />
          </TabsContent>

          <TabsContent value="anomaly" className="space-y-6">
            <AnomalyDetector />
          </TabsContent>

          <TabsContent value="risk" className="space-y-6">
            <RiskAssessment />
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <FraudAnalytics />
          </TabsContent>
        </Tabs>

        {/* Tech Stack Info */}
        <Card>
          <CardHeader>
            <CardTitle>Technology Stack</CardTitle>
            <CardDescription>
              Advanced fraud detection using modern ML and streaming technologies
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-900">Machine Learning</h4>
                <p className="text-sm text-blue-700">Scikit-learn, XGBoost</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <h4 className="font-semibold text-green-900">Streaming</h4>
                <p className="text-sm text-green-700">Apache Kafka</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <h4 className="font-semibold text-purple-900">Search & Analytics</h4>
                <p className="text-sm text-purple-700">Elasticsearch</p>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <h4 className="font-semibold text-orange-900">Real-time Processing</h4>
                <p className="text-sm text-orange-700">Anomaly Detection</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Business Impact */}
        <Alert>
          <TrendingUp className="h-4 w-4" />
          <AlertTitle>Business Impact</AlertTitle>
          <AlertDescription>
            This fraud detection system demonstrates critical fintech capabilities including real-time transaction monitoring, 
            machine learning-based risk scoring, and automated alert systems that can prevent millions in fraudulent losses.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
};

export default FraudDetection;
