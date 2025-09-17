import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  FileText, 
  Users, 
  Upload, 
  Shield, 
  Calendar, 
  CalendarDays,
  TrendingUp
} from 'lucide-react';

interface KeyActionsWidgetProps {
  userType: 'startup' | 'investor' | 'service-provider';
}

export const KeyActionsWidget = ({ userType }: KeyActionsWidgetProps) => {
  const getActions = () => {
    switch (userType) {
      case 'startup':
        return [
          { icon: FileText, label: 'Generate Pitch Deck', variant: 'default' as const },
          { icon: Users, label: 'Find Investors', variant: 'outline' as const },
          { icon: Upload, label: 'Upload to Data Room', variant: 'secondary' as const },
        ];
      case 'investor':
        return [
          { icon: Shield, label: 'Run Risk Report', variant: 'default' as const },
          { icon: CalendarDays, label: 'Schedule a Meeting', variant: 'outline' as const },
          { icon: Calendar, label: 'View Events', variant: 'secondary' as const },
        ];
      case 'service-provider':
        return [
          { icon: Users, label: 'Browse Startups', variant: 'default' as const },
          { icon: TrendingUp, label: 'Update Services', variant: 'outline' as const },
          { icon: Shield, label: 'View Analytics', variant: 'secondary' as const },
        ];
    }
  };

  const actions = getActions();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Jump into your most important tasks</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {actions.map((action, index) => (
            <Button key={index} variant={action.variant} size="lg" className="h-14 flex-col gap-2">
              <action.icon className="h-6 w-6" />
              <span className="text-sm">{action.label}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};