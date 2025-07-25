
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Shield, ShieldAlert, ShieldOff, FileText, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface BiasAnalysis {
  demographicParity: number;
  equalizedOdds: number;
  calibration: number;
  overallFairness: 'high' | 'medium' | 'low';
  recommendations: string[];
}

interface FairnessReportProps {
  analysis: BiasAnalysis;
}

export const FairnessReport = ({ analysis }: FairnessReportProps) => {
  const getFairnessIcon = (fairness: string) => {
    switch (fairness) {
      case 'high': return <Shield className="h-6 w-6 text-green-600" />;
      case 'medium': return <ShieldAlert className="h-6 w-6 text-yellow-600" />;
      case 'low': return <ShieldOff className="h-6 w-6 text-red-600" />;
      default: return <ShieldAlert className="h-6 w-6 text-gray-600" />;
    }
  };

  const getFairnessColor = (fairness: string) => {
    switch (fairness) {
      case 'high': return 'bg-green-100 text-green-800 border-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getComplianceStatus = () => {
    const avgScore = (analysis.demographicParity + analysis.equalizedOdds + analysis.calibration) / 3;
    if (avgScore >= 0.8) return { status: 'Compliant', color: 'text-green-600', bg: 'bg-green-50' };
    if (avgScore >= 0.6) return { status: 'Partially Compliant', color: 'text-yellow-600', bg: 'bg-yellow-50' };
    return { status: 'Non-Compliant', color: 'text-red-600', bg: 'bg-red-50' };
  };

  const downloadReport = () => {
    // Simulate report download
    toast.success('Fairness report downloaded successfully!');
  };

  const compliance = getComplianceStatus();

  // Mock demographic group data
  const demographicGroups = [
    { group: 'Male', accuracy: 0.85, precision: 0.82, recall: 0.88, f1: 0.85 },
    { group: 'Female', accuracy: 0.78, precision: 0.75, recall: 0.81, f1: 0.78 },
    { group: 'White', accuracy: 0.86, precision: 0.84, recall: 0.88, f1: 0.86 },
    { group: 'Black', accuracy: 0.74, precision: 0.71, recall: 0.77, f1: 0.74 },
    { group: 'Hispanic', accuracy: 0.79, precision: 0.76, recall: 0.82, f1: 0.79 },
    { group: 'Asian', accuracy: 0.83, precision: 0.81, recall: 0.85, f1: 0.83 }
  ];

  return (
    <div className="space-y-6">
      {/* Executive Summary */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Fairness Assessment Report
              </CardTitle>
              <CardDescription>
                Comprehensive analysis of model fairness and bias
              </CardDescription>
            </div>
            <Button onClick={downloadReport} variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Download Report
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className={`p-6 rounded-lg ${compliance.bg} border`}>
              <div className="flex items-center gap-3 mb-4">
                {getFairnessIcon(analysis.overallFairness)}
                <div>
                  <h3 className="text-lg font-semibold">Overall Fairness</h3>
                  <Badge className={getFairnessColor(analysis.overallFairness)}>
                    {analysis.overallFairness.toUpperCase()}
                  </Badge>
                </div>
              </div>
              <p className="text-gray-700">
                Based on comprehensive analysis of demographic parity, equalized odds, and calibration metrics.
              </p>
            </div>

            <div className={`p-6 rounded-lg ${compliance.bg} border`}>
              <div className="flex items-center gap-3 mb-4">
                <Shield className={`h-6 w-6 ${compliance.color}`} />
                <div>
                  <h3 className="text-lg font-semibold">Compliance Status</h3>
                  <span className={`font-medium ${compliance.color}`}>
                    {compliance.status}
                  </span>
                </div>
              </div>
              <p className="text-gray-700">
                Regulatory compliance assessment based on fairness thresholds.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-3xl font-bold text-blue-700 mb-1">
                {(analysis.demographicParity * 100).toFixed(0)}%
              </div>
              <div className="text-sm text-blue-600 font-medium">Demographic Parity</div>
              <Progress value={analysis.demographicParity * 100} className="mt-2" />
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-3xl font-bold text-green-700 mb-1">
                {(analysis.equalizedOdds * 100).toFixed(0)}%
              </div>
              <div className="text-sm text-green-600 font-medium">Equalized Odds</div>
              <Progress value={analysis.equalizedOdds * 100} className="mt-2" />
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-3xl font-bold text-purple-700 mb-1">
                {(analysis.calibration * 100).toFixed(0)}%
              </div>
              <div className="text-sm text-purple-600 font-medium">Calibration</div>
              <Progress value={analysis.calibration * 100} className="mt-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Performance by Demographic Groups */}
      <Card>
        <CardHeader>
          <CardTitle>Performance by Demographic Groups</CardTitle>
          <CardDescription>
            Model performance metrics across different demographic segments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-semibold">Group</th>
                  <th className="text-center p-3 font-semibold">Accuracy</th>
                  <th className="text-center p-3 font-semibold">Precision</th>
                  <th className="text-center p-3 font-semibold">Recall</th>
                  <th className="text-center p-3 font-semibold">F1-Score</th>
                  <th className="text-center p-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {demographicGroups.map((group, index) => {
                  const isLowPerforming = group.accuracy < 0.8;
                  return (
                    <tr key={group.group} className={`border-b ${index % 2 === 0 ? 'bg-gray-50' : ''}`}>
                      <td className="p-3 font-medium">{group.group}</td>
                      <td className="text-center p-3">{(group.accuracy * 100).toFixed(1)}%</td>
                      <td className="text-center p-3">{(group.precision * 100).toFixed(1)}%</td>
                      <td className="text-center p-3">{(group.recall * 100).toFixed(1)}%</td>
                      <td className="text-center p-3">{(group.f1 * 100).toFixed(1)}%</td>
                      <td className="text-center p-3">
                        <Badge className={isLowPerforming ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}>
                          {isLowPerforming ? 'Needs Attention' : 'Good'}
                        </Badge>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Risk Assessment */}
      <Card>
        <CardHeader>
          <CardTitle>Risk Assessment</CardTitle>
          <CardDescription>
            Potential risks and legal considerations
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border border-red-200 bg-red-50 rounded-lg">
              <h4 className="font-semibold text-red-800 mb-2">High Risk Areas</h4>
              <ul className="text-sm text-red-700 space-y-1">
                <li>• Disparate impact on protected groups</li>
                <li>• Potential EEOC compliance issues</li>
                <li>• Reputational risk from biased decisions</li>
              </ul>
            </div>
            <div className="p-4 border border-yellow-200 bg-yellow-50 rounded-lg">
              <h4 className="font-semibold text-yellow-800 mb-2">Medium Risk Areas</h4>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• Calibration disparities between groups</li>
                <li>• Inconsistent performance across demographics</li>
                <li>• Limited diversity in training data</li>
              </ul>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">Recommended Actions</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-700">
              <div>
                <h5 className="font-medium mb-1">Immediate (1-2 weeks)</h5>
                <ul className="space-y-1">
                  <li>• Implement bias monitoring</li>
                  <li>• Document fairness procedures</li>
                  <li>• Train team on bias detection</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium mb-1">Long-term (1-3 months)</h5>
                <ul className="space-y-1">
                  <li>• Collect more diverse training data</li>
                  <li>• Implement fairness constraints</li>
                  <li>• Regular bias audits</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
