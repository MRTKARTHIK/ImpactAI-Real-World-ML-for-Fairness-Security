
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Upload, FileText, Database } from 'lucide-react';
import { toast } from 'sonner';

interface Dataset {
  name: string;
  size: number;
  features: string[];
  sensitiveAttributes: string[];
  targetVariable: string;
}

interface DatasetUploaderProps {
  onDatasetUploaded: (dataset: Dataset) => void;
  dataset: Dataset | null;
}

export const DatasetUploader = ({ onDatasetUploaded, dataset }: DatasetUploaderProps) => {
  const [isUploading, setIsUploading] = useState(false);

  const handleSampleDataset = async (datasetType: string) => {
    setIsUploading(true);
    
    // Simulate upload delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    let sampleDataset: Dataset;

    switch (datasetType) {
      case 'hiring':
        sampleDataset = {
          name: 'Employee Hiring Dataset',
          size: 5000,
          features: ['age', 'education_level', 'experience_years', 'gender', 'race', 'interview_score', 'previous_company_rating'],
          sensitiveAttributes: ['gender', 'race', 'age'],
          targetVariable: 'hired'
        };
        break;
      case 'lending':
        sampleDataset = {
          name: 'Credit Lending Dataset',
          size: 10000,
          features: ['income', 'credit_score', 'employment_length', 'gender', 'ethnicity', 'marital_status', 'loan_amount'],
          sensitiveAttributes: ['gender', 'ethnicity', 'marital_status'],
          targetVariable: 'loan_approved'
        };
        break;
      case 'healthcare':
        sampleDataset = {
          name: 'Medical Treatment Dataset',
          size: 7500,
          features: ['age', 'gender', 'race', 'income_level', 'insurance_type', 'symptoms_severity', 'hospital_type'],
          sensitiveAttributes: ['gender', 'race', 'income_level'],
          targetVariable: 'treatment_recommendation'
        };
        break;
      default:
        sampleDataset = {
          name: 'General Dataset',
          size: 3000,
          features: ['feature1', 'feature2', 'feature3', 'sensitive_attr1', 'sensitive_attr2'],
          sensitiveAttributes: ['sensitive_attr1', 'sensitive_attr2'],
          targetVariable: 'target'
        };
    }

    onDatasetUploaded(sampleDataset);
    setIsUploading(false);
    toast.success(`${sampleDataset.name} loaded successfully!`);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.csv')) {
      toast.error('Please upload a CSV file');
      return;
    }

    setIsUploading(true);
    
    // Simulate file processing
    setTimeout(() => {
      const mockDataset: Dataset = {
        name: file.name,
        size: Math.floor(Math.random() * 10000) + 1000,
        features: ['feature1', 'feature2', 'feature3', 'feature4', 'sensitive_attr'],
        sensitiveAttributes: ['sensitive_attr'],
        targetVariable: 'target'
      };

      onDatasetUploaded(mockDataset);
      setIsUploading(false);
      toast.success('Dataset uploaded successfully!');
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Dataset Upload
          </CardTitle>
          <CardDescription>
            Upload your dataset or use one of our sample datasets to get started with bias analysis
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* File Upload */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
            <p className="text-gray-600 mb-4">Upload your CSV dataset</p>
            <Input
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              disabled={isUploading}
              className="max-w-xs mx-auto"
            />
          </div>

          {/* Sample Datasets */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Or try a sample dataset:</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="cursor-pointer hover:shadow-md transition-shadow" 
                    onClick={() => handleSampleDataset('hiring')}>
                <CardContent className="p-4 text-center">
                  <FileText className="h-8 w-8 mx-auto text-blue-600 mb-2" />
                  <h4 className="font-semibold">Hiring Dataset</h4>
                  <p className="text-sm text-gray-600">Employee recruitment with gender/race bias</p>
                  <Button variant="outline" size="sm" className="mt-2" disabled={isUploading}>
                    {isUploading ? 'Loading...' : 'Load Dataset'}
                  </Button>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-md transition-shadow" 
                    onClick={() => handleSampleDataset('lending')}>
                <CardContent className="p-4 text-center">
                  <Database className="h-8 w-8 mx-auto text-green-600 mb-2" />
                  <h4 className="font-semibold">Credit Lending</h4>
                  <p className="text-sm text-gray-600">Loan approval with demographic bias</p>
                  <Button variant="outline" size="sm" className="mt-2" disabled={isUploading}>
                    {isUploading ? 'Loading...' : 'Load Dataset'}
                  </Button>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-md transition-shadow" 
                    onClick={() => handleSampleDataset('healthcare')}>
                <CardContent className="p-4 text-center">
                  <FileText className="h-8 w-8 mx-auto text-red-600 mb-2" />
                  <h4 className="font-semibold">Healthcare</h4>
                  <p className="text-sm text-gray-600">Medical treatment recommendations</p>
                  <Button variant="outline" size="sm" className="mt-2" disabled={isUploading}>
                    {isUploading ? 'Loading...' : 'Load Dataset'}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Dataset Info */}
      {dataset && (
        <Card>
          <CardHeader>
            <CardTitle>Dataset Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600">Dataset Name</label>
                <p className="font-semibold">{dataset.name}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Number of Records</label>
                <p className="font-semibold">{dataset.size.toLocaleString()}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Target Variable</label>
                <p className="font-semibold">{dataset.targetVariable}</p>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600 block mb-2">Features ({dataset.features.length})</label>
              <div className="flex flex-wrap gap-2">
                {dataset.features.map(feature => (
                  <Badge key={feature} variant="outline">{feature}</Badge>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600 block mb-2">Sensitive Attributes ({dataset.sensitiveAttributes.length})</label>
              <div className="flex flex-wrap gap-2">
                {dataset.sensitiveAttributes.map(attr => (
                  <Badge key={attr} className="bg-red-100 text-red-800">{attr}</Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
