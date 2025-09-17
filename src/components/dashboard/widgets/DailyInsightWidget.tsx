import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lightbulb, TrendingDown, TrendingUp, AlertTriangle } from 'lucide-react';

interface DailyInsightWidgetProps {
  userType: 'startup' | 'investor' | 'service-provider';
}

export const DailyInsightWidget = ({ userType }: DailyInsightWidgetProps) => {
  const getInsight = () => {
    switch (userType) {
      case 'startup':
        return {
          icon: TrendingDown,
          title: 'Daily AI Insight',
          insight: 'Your traction is 40% below seed-stage average. Focus on user growth.',
          action: 'View Growth Plan',
          variant: 'destructive' as const
        };
      case 'investor':
        return {
          icon: TrendingUp,
          title: 'Market Pulse',
          insight: 'MENA FinTech valuations cooled by 15% in Q3. Early-stage remains strong.',
          action: 'View Market Report',
          variant: 'default' as const
        };
      case 'service-provider':
        return {
          icon: AlertTriangle,
          title: 'Business Insight',
          insight: 'Legal services demand increased 30% among Series A startups this quarter.',
          action: 'Update Services',
          variant: 'secondary' as const
        };
    }
  };

  const insight = getInsight();
  const IconComponent = insight.icon;

  return (
    <Card className="border-orange-200 dark:border-orange-800 bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-orange-500" />
          {insight.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <IconComponent className="h-5 w-5 text-orange-500 mt-0.5" />
            <p className="text-sm leading-relaxed">{insight.insight}</p>
          </div>
          <Button variant={insight.variant} size="sm">
            {insight.action}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};