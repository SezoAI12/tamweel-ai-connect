import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Eye, HandHeart, FileCheck, X } from 'lucide-react';

export const PipelineWidget = () => {
  const pipelineStages = [
    { stage: 'Interested', count: 8, icon: Eye, color: 'bg-blue-500' },
    { stage: 'In DD', count: 3, icon: TrendingUp, color: 'bg-yellow-500' },
    { stage: 'Term Sheet', count: 1, icon: FileCheck, color: 'bg-green-500' },
    { stage: 'Passed', count: 12, icon: X, color: 'bg-gray-400' },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <HandHeart className="h-5 w-5" />
          Pipeline Snapshot
        </CardTitle>
        <CardDescription>Current status of your investment pipeline</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {pipelineStages.map((stage, index) => (
            <div key={index} className="text-center">
              <div className="relative mb-3">
                <div className={`w-16 h-16 ${stage.color} rounded-full mx-auto flex items-center justify-center mb-2`}>
                  <stage.icon className="h-6 w-6 text-white" />
                </div>
                <Badge variant="secondary" className="absolute -top-1 -right-1">
                  {stage.count}
                </Badge>
              </div>
              <p className="text-sm font-medium">{stage.stage}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};