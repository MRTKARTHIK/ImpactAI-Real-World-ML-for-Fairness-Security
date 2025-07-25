
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, ShieldAlert, ShieldOff, Upload, BarChart3, Users, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';
import { DatasetUploader } from '@/components/bias-detection/DatasetUploader';
import { BiasMetrics } from '@/components/bias-detection/BiasMetrics';
import { FairnessReport } from '@/components/bias-detection/FairnessReport';
import { ModelExplainer } from '@/components/bias-detection/ModelExplainer';

interface Dataset {
  name: string;
  size: number;
  features: string[];
  sensitiveAttributes: string[];
  targetVariable: string;
}

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

const BiasDetection = () => {
  const [dataset, setDataset] = useState<Dataset | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [biasAnalysis, setBiasAnalysis] = useState<BiasAnalysis | null>(null);
  const [modelPredictions, setModelPredictions] = useState<ModelPrediction[]>([]);
  const [selectedSensitiveAttribute, setSelectedSensitiveAttribute] = useState<string>('');

  // Simulate bias analysis
  const runBiasAnalysis = async () => {
    if (!dataset) {
      toast.error('Please upload a dataset first');
      return;
    }

    setIsAnalyzing(true);
    setAnalysisProgress(0);

    // Simulate analysis steps
    const steps = [
      'Loading dataset...',
      'Preprocessing data...',
      'Training baseline model...',
      'Calculating demographic parity...',
      'Computing equalized odds...',
      'Analyzing calibration metrics...',
      'Generating recommendations...'
    ];

    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 800));
      setAnalysisProgress(((i + 1) / steps.length) * 100);
      toast.info(steps[i]);
    }

    // Simulate bias analysis results
    const mockAnalysis: BiasAnalysis = {
      demographicParity: Math.random() * 0.3 + 0.7, // 0.7-1.0
      equalizedOdds: Math.random() * 0.4 + 0.6, // 0.6-1.0
      calibration: Math.random() * 0.35 + 0.65, // 0.65-1.0
      overallFairness: Math.random() > 0.7 ? 'high' : Math.random() > 0.4 ? 'medium' : 'low',
      recommendations: [
        'Consider re-balancing the training dataset',
        'Apply fairness constraints during model training',
        'Use post-processing techniques to improve equity',
        'Collect more diverse training data',
        'Implement bias monitoring in production'
      ]
    };

    const mockPredictions: ModelPrediction[] = dataset.features.map(feature => ({
      feature,
      importance: Math.random(),
      bias_score: Math.random() * 0.5
    })).sort((a, b) => b.importance - a.importance);

    setBiasAnalysis(mockAnalysis);
    setModelPredictions(mockPredictions);
    setIsAnalyzing(false);
    toast.success('Bias analysis completed successfully!');
  };

  const getFairnessIcon = (fairness: string) => {
    switch (fairness) {
      case 'high': return <Shield className="h-5 w-5 text-green-600" />;
      case 'medium': return <ShieldAlert className="h-5 w-5 text-yellow-600" />;
      case 'low': return <ShieldOff className="h-5 w-5 text-red-600" />;
      default: return <ShieldAlert className="h-5 w-5 text-gray-600" />;
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent mb-4">
            AI Ethics & Bias Detection
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Detect and mitigate bias in machine learning models with comprehensive fairness metrics 
            and explainable AI techniques. Build responsible AI systems that work fairly for everyone.
          </p>
        </div>

        <Tabs defaultValue="upload" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="upload" className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Dataset
            </TabsTrigger>
            <TabsTrigger value="metrics" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Bias Metrics
            </TabsTrigger>
            <TabsTrigger value="fairness" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Fairness Report
            </TabsTrigger>
            <TabsTrigger value="explainer" className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Model Explainer
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upload">
            <DatasetUploader 
              onDatasetUploaded={setDataset}
              dataset={dataset}
            />
          </TabsContent>

          <TabsContent value="metrics">
            <div className="space-y-6">
              {!dataset ? (
                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    Please upload a dataset first to analyze bias metrics.
                  </AlertDescription>
                </Alert>
              ) : (
                <>
                  <Card>
                    <CardHeader>
                      <CardTitle>Bias Analysis</CardTitle>
                      <CardDescription>
                        Run comprehensive bias detection on your ML model
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex gap-4">
                        <Button 
                          onClick={runBiasAnalysis}
                          disabled={isAnalyzing}
                          className="bg-purple-600 hover:bg-purple-700"
                        >
                          {isAnalyzing ? 'Analyzing...' : 'Run Bias Analysis'}
                        </Button>
                        {dataset.sensitiveAttributes.length > 0 && (
                          <select 
                            value={selectedSensitiveAttribute}
                            onChange={(e) => setSelectedSensitiveAttribute(e.target.value)}
                            className="px-3 py-2 border rounded-md"
                          >
                            <option value="">Select sensitive attribute</option>
                            {dataset.sensitiveAttributes.map(attr => (
                              <option key={attr} value={attr}>{attr}</option>
                            ))}
                          </select>
                        )}
                      </div>

                      {isAnalyzing && (
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm text-gray-600">
                            <span>Analysis Progress</span>
                            <span>{Math.round(analysisProgress)}%</span>
                          </div>
                          <Progress value={analysisProgress} />
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {biasAnalysis && (
                    <BiasMetrics 
                      analysis={biasAnalysis}
                      predictions={modelPredictions}
                    />
                  )}
                </>
              )}
            </div>
          </TabsContent>

          <TabsContent value="fairness">
            {biasAnalysis ? (
              <FairnessReport analysis={biasAnalysis} />
            ) : (
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  Run bias analysis first to view the fairness report.
                </AlertDescription>
              </Alert>
            )}
          </TabsContent>

          <TabsContent value="explainer">
            {modelPredictions.length > 0 ? (
              <ModelExplainer predictions={modelPredictions} />
            ) : (
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  Complete bias analysis to view model explanations.
                </AlertDescription>
              </Alert>
            )}
          </TabsContent>
        </Tabs>

        {biasAnalysis && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {getFairnessIcon(biasAnalysis.overallFairness)}
                Overall Fairness Assessment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-4">
                <Badge className={getFairnessColor(biasAnalysis.overallFairness)}>
                  {biasAnalysis.overallFairness.toUpperCase()} FAIRNESS
                </Badge>
                <span className="text-gray-600">
                  Based on demographic parity, equalized odds, and calibration metrics
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-700">
                    {(biasAnalysis.demographicParity * 100).toFixed(1)}%
                  </div>
                  <div className="text-sm text-blue-600">Demographic Parity</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-700">
                    {(biasAnalysis.equalizedOdds * 100).toFixed(1)}%
                  </div>
                  <div className="text-sm text-green-600">Equalized Odds</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-700">
                    {(biasAnalysis.calibration * 100).toFixed(1)}%
                  </div>
                  <div className="text-sm text-purple-600">Calibration</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="text-center mt-8 text-gray-600">
          <p className="text-sm">
            This tool demonstrates bias detection techniques and fairness metrics for responsible AI development.
            Always consider ethical implications when deploying ML models in production.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BiasDetection;
