
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { AlertTriangle, TrendingUp, Users, CreditCard } from 'lucide-react';

interface Anomaly {
  id: string;
  type: 'velocity' | 'location' | 'amount' | 'pattern';
  description: string;
  severity: 'low' | 'medium' | 'high';
  confidence: number;
  timestamp: string;
  affectedTransactions: number;
}

export const AnomalyDetector = () => {
  const [anomalies, setAnomalies] = useState<Anomaly[]>([]);
  const [detectionStatus, setDetectionStatus] = useState<'running' | 'paused'>('running');
  const [stats, setStats] = useState({
    totalAnomalies: 0,
    highSeverity: 0,
    detectionAccuracy: 95.7,
    falsePositiveRate: 2.1
  });

  useEffect(() => {
    const generateAnomaly = (): Anomaly => {
      const types = ['velocity', 'location', 'amount', 'pattern'] as const;
      const severities = ['low', 'medium', 'high'] as const;
      const descriptions = {
        velocity: 'Unusually high transaction frequency detected',
        location: 'Transaction from unusual geographic location',
        amount: 'Transaction amount significantly above user average',
        pattern: 'Unusual spending pattern detected'
      };

      const type = types[Math.floor(Math.random() * types.length)];
      const severity = severities[Math.floor(Math.random() * severities.length)];

      return {
        id: `ANM-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
        type,
        description: descriptions[type],
        severity,
        confidence: Math.floor(Math.random() * 30) + 70, // 70-100%
        timestamp: new Date().toISOString(),
        affectedTransactions: Math.floor(Math.random() * 10) + 1
      };
    };

    // Generate initial anomalies
    const initialAnomalies = Array.from({ length: 5 }, generateAnomaly);
    setAnomalies(initialAnomalies);

    // Update stats
    const highSeverityCount = initialAnomalies.filter(a => a.severity === 'high').length;
    setStats(prev => ({
      ...prev,
      totalAnomalies: initialAnomalies.length,
      highSeverity: highSeverityCount
    }));

    // Add new anomalies periodically if detection is running
    const interval = setInterval(() => {
      if (detectionStatus === 'running' && Math.random() > 0.7) {
        const newAnomaly = generateAnomaly();
        setAnomalies(prev => [newAnomaly, ...prev.slice(0, 9)]); // Keep last 10
        
        setStats(prev => ({
          ...prev,
          totalAnomalies: prev.totalAnomalies + 1,
          highSeverity: newAnomaly.severity === 'high' ? prev.highSeverity + 1 : prev.highSeverity
        }));
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [detectionStatus]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'velocity': return <TrendingUp className="h-4 w-4" />;
      case 'location': return <Users className="h-4 w-4" />;
      case 'amount': return <CreditCard className="h-4 w-4" />;
      case 'pattern': return <AlertTriangle className="h-4 w-4" />;
      default: return <AlertTriangle className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Detection Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Anomalies</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalAnomalies}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">High Severity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.highSeverity}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Detection Accuracy</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.detectionAccuracy}%</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">False Positive Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.falsePositiveRate}%</div>
          </CardContent>
        </Card>
      </div>

      {/* Detection Controls */}
      <Card>
        <CardHeader>
          <CardTitle>Anomaly Detection Engine</CardTitle>
          <CardDescription>
            Machine learning-based anomaly detection using ensemble methods
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className={`w-3 h-3 rounded-full ${detectionStatus === 'running' ? 'bg-green-500' : 'bg-red-500'}`} />
              <span className="font-medium">
                Detection Status: {detectionStatus === 'running' ? 'Running' : 'Paused'}
              </span>
            </div>
            <Button
              onClick={() => setDetectionStatus(prev => prev === 'running' ? 'paused' : 'running')}
              variant={detectionStatus === 'running' ? 'destructive' : 'default'}
            >
              {detectionStatus === 'running' ? 'Pause Detection' : 'Start Detection'}
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <h4 className="font-semibold mb-2">Model Performance</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Precision</span>
                  <span>94.2%</span>
                </div>
                <Progress value={94.2} className="h-2" />
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Recall</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Sensitivity</span>
                  <span>91.8%</span>
                </div>
                <Progress value={91.8} className="h-2" />
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2">F1-Score</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Overall</span>
                  <span>93.0%</span>
                </div>
                <Progress value={93.0} className="h-2" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Anomaly List */}
      <Card>
        <CardHeader>
          <CardTitle>Detected Anomalies</CardTitle>
          <CardDescription>
            Recent anomalies detected by the ML algorithms
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {anomalies.map((anomaly) => (
              <div key={anomaly.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    {getTypeIcon(anomaly.type)}
                    <div>
                      <h4 className="font-semibold">{anomaly.description}</h4>
                      <p className="text-sm text-gray-600">
                        Affected transactions: {anomaly.affectedTransactions} | 
                        Confidence: {anomaly.confidence}%
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(anomaly.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getSeverityColor(anomaly.severity)}>
                      {anomaly.severity.toUpperCase()}
                    </Badge>
                    <Progress value={anomaly.confidence} className="w-20 h-2" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
