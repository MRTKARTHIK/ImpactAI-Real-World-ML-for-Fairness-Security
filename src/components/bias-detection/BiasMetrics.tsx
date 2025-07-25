
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { BarChart3, TrendingUp, AlertCircle } from 'lucide-react';

interface BiasAnalysis {
  demographicParity: number;
  equalizedOdds: number;
  calibration: number;
  overallFairness: 'high' | 'medium' | 'low';
  recommendations: string[];
}

interface ModelPrediction {
  feature: string;
  importance: number;
  bias_score: number;
}

interface BiasMetricsProps {
  analysis: BiasAnalysis;
  predictions: ModelPrediction[];
}

export const BiasMetrics = ({ analysis, predictions }: BiasMetricsProps) => {
  const getScoreColor = (score: number) => {
    if (score >= 0.8) return 'text-green-600';
    if (score >= 0.6) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBg = (score: number) => {
    if (score >= 0.8) return 'bg-green-100';
    if (score >= 0.6) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  const getBiasLevel = (score: number) => {
    if (score <= 0.2) return { level: 'Low Bias', color: 'bg-green-100 text-green-800' };
    if (score <= 0.4) return { level: 'Medium Bias', color: 'bg-yellow-100 text-yellow-800' };
    return { level: 'High Bias', color: 'bg-red-100 text-red-800' };
  };

  return (
    <div className="space-y-6">
      {/* Fairness Metrics Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Fairness Metrics
          </CardTitle>
          <CardDescription>
            Key metrics to evaluate model fairness across different demographic groups
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Demographic Parity */}
            <div className={`p-4 rounded-lg ${getScoreBg(analysis.demographicParity)}`}>
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold">Demographic Parity</h3>
                <span className={`text-xl font-bold ${getScoreColor(analysis.demographicParity)}`}>
                  {(analysis.demographicParity * 100).toFixed(1)}%
                </span>
              </div>
              <Progress value={analysis.demographicParity * 100} className="mb-2" />
              <p className="text-sm text-gray-600">
                Equal positive prediction rates across groups
              </p>
            </div>

            {/* Equalized Odds */}
            <div className={`p-4 rounded-lg ${getScoreBg(analysis.equalizedOdds)}`}>
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold">Equalized Odds</h3>
                <span className={`text-xl font-bold ${getScoreColor(analysis.equalizedOdds)}`}>
                  {(analysis.equalizedOdds * 100).toFixed(1)}%
                </span>
              </div>
              <Progress value={analysis.equalizedOdds * 100} className="mb-2" />
              <p className="text-sm text-gray-600">
                Equal TPR and FPR across groups
              </p>
            </div>

            {/* Calibration */}
            <div className={`p-4 rounded-lg ${getScoreBg(analysis.calibration)}`}>
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold">Calibration</h3>
                <span className={`text-xl font-bold ${getScoreColor(analysis.calibration)}`}>
                  {(analysis.calibration * 100).toFixed(1)}%
                </span>
              </div>
              <Progress value={analysis.calibration * 100} className="mb-2" />
              <p className="text-sm text-gray-600">
                Predicted probabilities match actual outcomes
              </p>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Understanding Fairness Metrics:</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• <strong>Demographic Parity:</strong> All groups have equal positive prediction rates</li>
              <li>• <strong>Equalized Odds:</strong> True positive and false positive rates are equal across groups</li>
              <li>• <strong>Calibration:</strong> Predicted probabilities accurately reflect actual outcomes for all groups</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Feature Bias Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Feature Bias Analysis
          </CardTitle>
          <CardDescription>
            Individual feature importance and bias scores
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {predictions.slice(0, 8).map((prediction, index) => {
              const biasInfo = getBiasLevel(prediction.bias_score);
              return (
                <div key={prediction.feature} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-gray-500">#{index + 1}</span>
                    <span className="font-semibold">{prediction.feature}</span>
                    <Badge className={biasInfo.color}>{biasInfo.level}</Badge>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-sm text-gray-600">Importance</div>
                      <div className="font-semibold">{(prediction.importance * 100).toFixed(1)}%</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-600">Bias Score</div>
                      <div className="font-semibold">{(prediction.bias_score * 100).toFixed(1)}%</div>
                    </div>
                    <div className="w-24">
                      <Progress value={prediction.bias_score * 100} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            Bias Mitigation Recommendations
          </CardTitle>
          <CardDescription>
            Actionable steps to improve model fairness
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {analysis.recommendations.map((recommendation, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white text-sm rounded-full flex items-center justify-center">
                  {index + 1}
                </span>
                <p className="text-gray-700">{recommendation}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
