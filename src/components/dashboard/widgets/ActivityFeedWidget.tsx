import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Eye, TrendingUp, User, Calendar } from 'lucide-react';

interface ActivityFeedWidgetProps {
  userType: 'startup' | 'investor' | 'service-provider';
}

export const ActivityFeedWidget = ({ userType }: ActivityFeedWidgetProps) => {
  const getActivities = () => {
    switch (userType) {
      case 'startup':
        return [
          {
            icon: Eye,
            message: 'Investor Ahmed from MENA Ventures viewed your profile',
            time: '2 hours ago',
            type: 'view'
          },
          {
            icon: TrendingUp,
            message: 'Your Trust Score® increased to Silver',
            time: '1 day ago',
            type: 'achievement'
          },
          {
            icon: MessageSquare,
            message: 'New message from Sarah Hassan (Gulf Capital)',
            time: '2 days ago',
            type: 'message'
          },
          {
            icon: User,
            message: 'Your AI Project Score updated to 82/100',
            time: '3 days ago',
            type: 'score'
          }
        ];
      case 'investor':
        return [
          {
            icon: User,
            message: 'TechFlow Solutions updated their pitch deck',
            time: '1 hour ago',
            type: 'update'
          },
          {
            icon: Calendar,
            message: 'Pitch event "FinTech Founders" starts in 2 days',
            time: '4 hours ago',
            type: 'event'
          },
          {
            icon: MessageSquare,
            message: 'New connection request from GreenTech MENA',
            time: '1 day ago',
            type: 'connection'
          },
          {
            icon: TrendingUp,
            message: 'Weekly deal flow report is ready',
            time: '2 days ago',
            type: 'report'
          }
        ];
      case 'service-provider':
        return [
          {
            icon: User,
            message: 'HealthCare AI is looking for legal services',
            time: '30 minutes ago',
            type: 'opportunity'
          },
          {
            icon: MessageSquare,
            message: 'EduNext Platform sent you a message',
            time: '3 hours ago',
            type: 'message'
          },
          {
            icon: TrendingUp,
            message: 'Your service rating increased to 4.8/5',
            time: '1 day ago',
            type: 'rating'
          },
          {
            icon: Calendar,
            message: 'Networking event "Service Providers Meetup" tomorrow',
            time: '1 day ago',
            type: 'event'
          }
        ];
    }
  };

  const activities = getActivities();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          Activity Feed
        </CardTitle>
        <CardDescription>Your recent activity and updates</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
              <activity.icon className="h-4 w-4 text-primary mt-1" />
              <div className="flex-1 min-w-0">
                <p className="text-sm leading-relaxed">{activity.message}</p>
                <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
              </div>
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};