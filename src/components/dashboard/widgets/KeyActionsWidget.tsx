import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  FileText, 
  Users, 
  Upload, 
  Shield, 
  Calendar, 
  CalendarDays,
  TrendingUp,
  Rocket
} from 'lucide-react';

interface KeyActionsWidgetProps {
  userType: 'startup' | 'investor' | 'service-provider';
}

export const KeyActionsWidget = ({ userType }: KeyActionsWidgetProps) => {
  const getActions = () => {
    switch (userType) {
      case 'startup':
        return [
          { icon: Rocket, label: 'Start Fundraising', variant: 'default' as const, highlight: true },
          { icon: FileText, label: 'Generate Pitch Deck', variant: 'outline' as const },
          { icon: Users, label: 'Find Investors', variant: 'outline' as const },
          { icon: Upload, label: 'Upload to Data Room', variant: 'outline' as const },
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {actions.map((action, index) => (
            <Button 
              key={index} 
              variant={action.variant} 
              size="lg" 
              className={`h-16 flex-col gap-2 ${
                action.highlight ? 'bg-gradient-to-r from-primary to-primary-glow hover:from-primary/90 hover:to-primary-glow/90' : ''
              }`}
            >
              <action.icon className="h-6 w-6" />
              <span className="text-sm font-medium">{action.label}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};