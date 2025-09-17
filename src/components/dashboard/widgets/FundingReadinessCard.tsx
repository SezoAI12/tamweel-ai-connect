import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, AlertCircle } from 'lucide-react';

interface FundingReadinessCardProps {
  score: number;
  userType: 'startup' | 'investor' | 'service-provider';
}

export const FundingReadinessCard = ({ score, userType }: FundingReadinessCardProps) => {
  if (userType === 'startup') {
    return (
      <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-primary-glow/5">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-bold">Your Funding Readiness</CardTitle>
              <CardDescription>Combined score based on profile, AI analysis, and verification</CardDescription>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-primary">{score}/100</div>
              <div className="text-sm text-muted-foreground">
                {score >= 80 ? 'Investment Ready' : score >= 60 ? 'Good Progress' : 'Needs Work'}
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Progress value={score} className="h-3" />
            <Button size="lg" className="w-full">
              <TrendingUp className="mr-2 h-4 w-4" />
              Improve Score
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (userType === 'investor') {
    return (
      <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-primary-glow/5">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-bold">Your Deal Flow</CardTitle>
              <CardDescription>New opportunities matching your investment criteria</CardDescription>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-primary">12</div>
              <div className="text-sm text-muted-foreground">New Matches</div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Button size="lg" className="w-full">
            <AlertCircle className="mr-2 h-4 w-4" />
            Review Now
          </Button>
        </CardContent>
      </Card>
    );
  }

  return null;
};