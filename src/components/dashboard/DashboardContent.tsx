import { FundingReadinessCard } from './widgets/FundingReadinessCard';
import { KeyActionsWidget } from './widgets/KeyActionsWidget';
import { TopMatchesWidget } from './widgets/TopMatchesWidget';
import { DailyInsightWidget } from './widgets/DailyInsightWidget';
import { ActivityFeedWidget } from './widgets/ActivityFeedWidget';
import { PipelineWidget } from './widgets/PipelineWidget';

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

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold">{getWelcomeMessage()}</h1>
        <p className="text-muted-foreground mt-2">
          Here's what's happening with your {profile.user_type} account today.
        </p>
      </div>

      {/* Funding Readiness / Deal Flow Card */}
      <FundingReadinessCard score={profile.trust_score} userType={profile.user_type} />

      {/* Key Actions */}
      <KeyActionsWidget userType={profile.user_type} />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Matches */}
        <TopMatchesWidget userType={profile.user_type} />

        {/* Daily Insight or Pipeline */}
        {profile.user_type === 'investor' ? (
          <PipelineWidget />
        ) : (
          <DailyInsightWidget userType={profile.user_type} />
        )}
      </div>

      {/* Activity Feed */}
      <ActivityFeedWidget userType={profile.user_type} />
    </div>
  );
};