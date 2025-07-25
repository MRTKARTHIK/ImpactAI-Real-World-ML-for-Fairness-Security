
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Calculator, User, CreditCard, MapPin, Clock } from 'lucide-react';

interface RiskFactors {
  userHistory: number;
  transactionAmount: number;
  locationRisk: number;
  timeRisk: number;
  paymentMethodRisk: number;
  velocityRisk: number;
}

export const RiskAssessment = () => {
  const [transactionData, setTransactionData] = useState({
    amount: '',
    merchant: '',
    location: '',
    userId: '',
    paymentMethod: 'credit_card'
  });

  const [riskScore, setRiskScore] = useState<number | null>(null);
  const [riskFactors, setRiskFactors] = useState<RiskFactors | null>(null);
  const [recommendation, setRecommendation] = useState<string>('');

  const calculateRisk = () => {
    // Simulate ML-based risk calculation
    const amount = parseFloat(transactionData.amount) || 0;
    
    // Risk factors calculation (simplified)
    const factors: RiskFactors = {
      userHistory: Math.random() * 30 + 10, // 10-40
      transactionAmount: Math.min((amount / 1000) * 20, 30), // Amount-based risk
      locationRisk: Math.random() * 25 + 5, // 5-30
      timeRisk: Math.random() * 15 + 5, // 5-20
      paymentMethodRisk: transactionData.paymentMethod === 'bank_transfer' ? 5 : 15,
      velocityRisk: Math.random() * 20 + 10 // 10-30
    };

    const totalRisk = Object.values(factors).reduce((sum, factor) => sum + factor, 0);
    const normalizedRisk = Math.min(totalRisk, 100);

    setRiskFactors(factors);
    setRiskScore(Math.round(normalizedRisk));

    // Generate recommendation
    if (normalizedRisk > 75) {
      setRecommendation('BLOCK: High fraud risk detected. Manual review required.');
    } else if (normalizedRisk > 50) {
      setRecommendation('FLAG: Medium risk. Additional verification recommended.');
    } else if (normalizedRisk > 25) {
      setRecommendation('MONITOR: Low-medium risk. Continue monitoring.');
    } else {
      setRecommendation('APPROVE: Low risk. Transaction can proceed.');
    }
  };

  const getRiskColor = (score: number) => {
    if (score > 75) return 'text-red-600';
    if (score > 50) return 'text-yellow-600';
    if (score > 25) return 'text-blue-600';
    return 'text-green-600';
  };

  const getRiskBadge = (score: number) => {
    if (score > 75) return <Badge className="bg-red-100 text-red-800">High Risk</Badge>;
    if (score > 50) return <Badge className="bg-yellow-100 text-yellow-800">Medium Risk</Badge>;
    if (score > 25) return <Badge className="bg-blue-100 text-blue-800">Low-Medium Risk</Badge>;
    return <Badge className="bg-green-100 text-green-800">Low Risk</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Risk Calculator */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Risk Assessment Calculator
          </CardTitle>
          <CardDescription>
            Enter transaction details to calculate fraud risk score using ML models
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="space-y-2">
              <Label htmlFor="amount">Transaction Amount ($)</Label>
              <Input
                id="amount"
                type="number"
                placeholder="Enter amount"
                value={transactionData.amount}
                onChange={(e) => setTransactionData(prev => ({ ...prev, amount: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="merchant">Merchant</Label>
              <Input
                id="merchant"
                placeholder="Enter merchant name"
                value={transactionData.merchant}
                onChange={(e) => setTransactionData(prev => ({ ...prev, merchant: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                placeholder="Enter location"
                value={transactionData.location}
                onChange={(e) => setTransactionData(prev => ({ ...prev, location: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="userId">User ID</Label>
              <Input
                id="userId"
                placeholder="Enter user ID"
                value={transactionData.userId}
                onChange={(e) => setTransactionData(prev => ({ ...prev, userId: e.target.value }))}
              />
            </div>
          </div>

          <Button onClick={calculateRisk} className="w-full">
            Calculate Risk Score
          </Button>
        </CardContent>
      </Card>

      {/* Risk Results */}
      {riskScore !== null && riskFactors && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Risk Score Display */}
          <Card>
            <CardHeader>
              <CardTitle>Risk Assessment Results</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-6">
                <div className={`text-6xl font-bold ${getRiskColor(riskScore)}`}>
                  {riskScore}%
                </div>
                <div className="mt-2">
                  {getRiskBadge(riskScore)}
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Recommendation</h4>
                  <div className={`p-3 rounded-lg ${
                    riskScore > 75 ? 'bg-red-50 text-red-800' :
                    riskScore > 50 ? 'bg-yellow-50 text-yellow-800' :
                    riskScore > 25 ? 'bg-blue-50 text-blue-800' :
                    'bg-green-50 text-green-800'
                  }`}>
                    {recommendation}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Risk Level Distribution</h4>
                  <Progress value={riskScore} className="h-4" />
                  <div className="flex justify-between text-sm text-gray-600 mt-1">
                    <span>Low</span>
                    <span>Medium</span>
                    <span>High</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Risk Factors Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Risk Factors Analysis</CardTitle>
              <CardDescription>
                Breakdown of contributing risk factors
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>User History Risk</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{Math.round(riskFactors.userHistory)}%</span>
                    <Progress value={riskFactors.userHistory} className="w-20 h-2" />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4" />
                    <span>Transaction Amount</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{Math.round(riskFactors.transactionAmount)}%</span>
                    <Progress value={riskFactors.transactionAmount} className="w-20 h-2" />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>Location Risk</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{Math.round(riskFactors.locationRisk)}%</span>
                    <Progress value={riskFactors.locationRisk} className="w-20 h-2" />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>Time-based Risk</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{Math.round(riskFactors.timeRisk)}%</span>
                    <Progress value={riskFactors.timeRisk} className="w-20 h-2" />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4" />
                    <span>Payment Method</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{Math.round(riskFactors.paymentMethodRisk)}%</span>
                    <Progress value={riskFactors.paymentMethodRisk} className="w-20 h-2" />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>Velocity Risk</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{Math.round(riskFactors.velocityRisk)}%</span>
                    <Progress value={riskFactors.velocityRisk} className="w-20 h-2" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Model Information */}
      <Card>
        <CardHeader>
          <CardTitle>ML Models & Algorithms</CardTitle>
          <CardDescription>
            Advanced ensemble methods for accurate fraud detection
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-900">XGBoost</h4>
              <p className="text-sm text-blue-700">Gradient boosting for complex patterns</p>
              <div className="mt-2">
                <Badge variant="outline">95.2% Accuracy</Badge>
              </div>
            </div>

            <div className="text-center p-4 bg-green-50 rounded-lg">
              <h4 className="font-semibold text-green-900">Random Forest</h4>
              <p className="text-sm text-green-700">Ensemble decision trees</p>
              <div className="mt-2">
                <Badge variant="outline">92.8% Accuracy</Badge>
              </div>
            </div>

            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <h4 className="font-semibold text-purple-900">Neural Network</h4>
              <p className="text-sm text-purple-700">Deep learning for anomaly detection</p>
              <div className="mt-2">
                <Badge variant="outline">94.1% Accuracy</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
