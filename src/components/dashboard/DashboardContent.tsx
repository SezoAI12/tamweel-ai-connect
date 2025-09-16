import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  Users, 
  MessageSquare, 
  Calendar,
  Shield,
  Star,
  Target,
  Zap
} from 'lucide-react';

interface DashboardContentProps {
  profile: {
    full_name: string;
    user_type: 'startup' | 'investor' | 'service-provider';
    trust_score: number;
    is_verified: boolean;
  };
}

export const DashboardContent = ({ profile }: DashboardContentProps) => {
  const getWelcomeMessage = () => {
    const timeOfDay = new Date().getHours() < 12 ? 'Good morning' : 
                     new Date().getHours() < 18 ? 'Good afternoon' : 'Good evening';
    
    return `${timeOfDay}, ${profile.full_name.split(' ')[0]}! 👋`;
  };

  const getRoleSpecificStats = () => {
    switch (profile.user_type) {
      case 'startup':
        return [
          { label: 'AI Project Score', value: '82/100', icon: Star, color: 'text-yellow-500' },
          { label: 'Investor Connections', value: '12', icon: Users, color: 'text-blue-500' },
          { label: 'Data Room Views', value: '34', icon: TrendingUp, color: 'text-green-500' },
          { label: 'Funding Target', value: '$2M', icon: Target, color: 'text-purple-500' },
        ];
      case 'investor':
        return [
          { label: 'Deal Flow', value: '28', icon: TrendingUp, color: 'text-green-500' },
          { label: 'Portfolio Companies', value: '15', icon: Users, color: 'text-blue-500' },
          { label: 'Active Evaluations', value: '5', icon: Star, color: 'text-yellow-500' },
          { label: 'Meetings Scheduled', value: '8', icon: Calendar, color: 'text-purple-500' },
        ];
      case 'service-provider':
        return [
          { label: 'Active Leads', value: '18', icon: Target, color: 'text-green-500' },
          { label: 'Client Connections', value: '45', icon: Users, color: 'text-blue-500' },
          { label: 'Services Listed', value: '6', icon: Zap, color: 'text-yellow-500' },
          { label: 'Completed Projects', value: '23', icon: Star, color: 'text-purple-500' },
        ];
    }
  };

  const stats = getRoleSpecificStats();

  const getQuickActions = () => {
    switch (profile.user_type) {
      case 'startup':
        return [
          { label: 'Update Pitch Deck', variant: 'default' as const },
          { label: 'Browse Investors', variant: 'outline' as const },
          { label: 'Schedule AI Review', variant: 'secondary' as const },
        ];
      case 'investor':
        return [
          { label: 'Review Startups', variant: 'default' as const },
          { label: 'Join Pitch Event', variant: 'outline' as const },
          { label: 'Update Preferences', variant: 'secondary' as const },
        ];
      case 'service-provider':
        return [
          { label: 'Browse Startups', variant: 'default' as const },
          { label: 'Update Services', variant: 'outline' as const },
          { label: 'View Analytics', variant: 'secondary' as const },
        ];
    }
  };

  const quickActions = getQuickActions();

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold">{getWelcomeMessage()}</h1>
        <p className="text-muted-foreground mt-2">
          Here's what's happening with your {profile.user_type} account today.
        </p>
      </div>

      {/* Trust Score Card */}
      <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-primary-glow/5">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Trust Score®
            </div>
            {profile.is_verified && (
              <Badge variant="secondary">
                ✓ Verified
              </Badge>
            )}
          </CardTitle>
          <CardDescription>
            Your credibility score based on profile completeness and verification
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">{profile.trust_score}%</span>
              <Badge variant={profile.trust_score >= 80 ? 'default' : 'secondary'}>
                {profile.trust_score >= 80 ? 'Platinum' : 
                 profile.trust_score >= 60 ? 'Gold' : 
                 profile.trust_score >= 40 ? 'Silver' : 'Bronze'}
              </Badge>
            </div>
            <Progress value={profile.trust_score} className="h-2" />
            <p className="text-sm text-muted-foreground">
              {profile.trust_score < 100 && 'Complete your verification to increase your score'}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Jump into your most important tasks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            {quickActions.map((action, index) => (
              <Button key={index} variant={action.variant}>
                {action.label}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
              <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
              <div>
                <p className="text-sm">Welcome to Tamweel! Complete your profile to get started.</p>
                <p className="text-xs text-muted-foreground">Just now</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};