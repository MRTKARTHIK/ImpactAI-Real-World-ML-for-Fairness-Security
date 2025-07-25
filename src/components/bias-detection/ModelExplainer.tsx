
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Brain, Eye, BarChart } from 'lucide-react';

interface ModelPrediction {
  feature: string;
  importance: number;
  bias_score: number;
}

interface ModelExplainerProps {
  predictions: ModelPrediction[];
}

export const ModelExplainer = ({ predictions }: ModelExplainerProps) => {
  // Mock SHAP values for explanation
  const shapValues = predictions.map(pred => ({
    ...pred,
    shap_value: (Math.random() - 0.5) * 2, // -1 to 1
    lime_value: (Math.random() - 0.5) * 1.5 // -0.75 to 0.75
  }));

  // Mock individual prediction explanation
  const samplePrediction = {
    input: {
      age: 35,
      gender: 'Female',
      education: 'Masters',
      experience: 8,
      race: 'Hispanic'
    },
    prediction: 0.73,
    confidence: 0.82
  };

  const getShapColor = (value: number) => {
    if (value > 0) return 'text-green-600';
    return 'text-red-600';
  };

  const getShapBg = (value: number) => {
    if (value > 0) return 'bg-green-100';
    return 'bg-red-100';
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            Model Explainability Analysis
          </CardTitle>
          <CardDescription>
            Understand how your model makes decisions and identify potential bias sources
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="shap" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="shap">SHAP Values</TabsTrigger>
              <TabsTrigger value="lime">LIME Analysis</TabsTrigger>
              <TabsTrigger value="sample">Sample Prediction</TabsTrigger>
            </TabsList>

            <TabsContent value="shap" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">SHAP Feature Importance</CardTitle>
                  <CardDescription>
                    Shapley values showing each feature's contribution to model predictions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {shapValues.slice(0, 10).map((feature, index) => (
                      <div key={feature.feature} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-medium text-gray-500">#{index + 1}</span>
                          <span className="font-medium">{feature.feature}</span>
                        </div>
                        
                        <div className="flex items-center gap-4">
                          <div className={`px-3 py-1 rounded-lg ${getShapBg(feature.shap_value)}`}>
                            <span className={`font-semibold ${getShapColor(feature.shap_value)}`}>
                              {feature.shap_value > 0 ? '+' : ''}{feature.shap_value.toFixed(3)}
                            </span>
                          </div>
                          <div className="w-32">
                            <div className="flex items-center justify-center h-6 bg-gray-200 rounded relative">
                              <div 
                                className={`absolute h-full rounded ${feature.shap_value > 0 ? 'bg-green-500' : 'bg-red-500'}`}
                                style={{
                                  width: `${Math.abs(feature.shap_value) * 50}%`,
                                  [feature.shap_value > 0 ? 'left' : 'right']: '50%'
                                }}
                              />
                              <div className="absolute w-0.5 h-full bg-gray-600 left-1/2 transform -translate-x-1/2" />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold mb-2">Understanding SHAP Values:</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• <span className="text-green-600 font-medium">Positive values</span> push the prediction toward the positive class</li>
                      <li>• <span className="text-red-600 font-medium">Negative values</span> push the prediction toward the negative class</li>
                      <li>• Larger absolute values indicate stronger feature influence</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="lime" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">LIME Local Explanations</CardTitle>
                  <CardDescription>
                    Local interpretable model-agnostic explanations for individual predictions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {shapValues.slice(0, 8).map((feature, index) => (
                      <div key={feature.feature} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <span className="font-medium">{feature.feature}</span>
                          <Badge variant="outline">
                            {Math.abs(feature.lime_value) > 0.3 ? 'High Impact' : 'Low Impact'}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <div className="text-sm text-gray-600">LIME Score</div>
                            <div className={`font-semibold ${getShapColor(feature.lime_value)}`}>
                              {feature.lime_value.toFixed(3)}
                            </div>
                          </div>
                          <div className="w-24">
                            <Progress value={Math.abs(feature.lime_value) * 100} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 p-4 bg-green-50 rounded-lg">
                    <h4 className="font-semibold mb-2">LIME Interpretation:</h4>
                    <p className="text-sm text-gray-700">
                      LIME creates a local linear model around each prediction to explain why the model 
                      made that specific decision. This helps identify which features were most influential 
                      for individual cases.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="sample" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Sample Prediction Breakdown</CardTitle>
                  <CardDescription>
                    Detailed explanation for a specific model prediction
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3">Input Features</h4>
                      <div className="space-y-2">
                        {Object.entries(samplePrediction.input).map(([key, value]) => (
                          <div key={key} className="flex justify-between p-2 bg-gray-50 rounded">
                            <span className="font-medium capitalize">{key.replace('_', ' ')}</span>
                            <span>{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3">Prediction Results</h4>
                      <div className="space-y-4">
                        <div className="p-4 bg-blue-50 rounded-lg text-center">
                          <div className="text-3xl font-bold text-blue-700 mb-1">
                            {(samplePrediction.prediction * 100).toFixed(1)}%
                          </div>
                          <div className="text-blue-600">Prediction Probability</div>
                        </div>
                        
                        <div className="p-4 bg-green-50 rounded-lg text-center">
                          <div className="text-2xl font-bold text-green-700 mb-1">
                            {(samplePrediction.confidence * 100).toFixed(1)}%
                          </div>
                          <div className="text-green-600">Model Confidence</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="font-semibold mb-3">Feature Contributions</h4>
                    <div className="space-y-2">
                      {shapValues.slice(0, 5).map((feature) => (
                        <div key={feature.feature} className="flex items-center justify-between p-2 border rounded">
                          <span className="font-medium">{feature.feature}</span>
                          <div className="flex items-center gap-2">
                            <span className={`text-sm ${getShapColor(feature.shap_value)}`}>
                              {feature.shap_value > 0 ? '+' : ''}{feature.shap_value.toFixed(3)}
                            </span>
                            <div className="w-16 h-2 bg-gray-200 rounded">
                              <div 
                                className={`h-full rounded ${feature.shap_value > 0 ? 'bg-green-500' : 'bg-red-500'}`}
                                style={{ width: `${Math.abs(feature.shap_value) * 100}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Eye className="h-4 w-4" />
                      Bias Alert
                    </h4>
                    <p className="text-sm text-gray-700">
                      This prediction shows high influence from gender and race features, which may indicate 
                      potential bias. Consider reviewing the model's decision logic and implementing fairness constraints.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
