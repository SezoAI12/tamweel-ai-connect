import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Users, Building, TrendingUp } from 'lucide-react';

interface TopMatchesWidgetProps {
  userType: 'startup' | 'investor' | 'service-provider';
}

export const TopMatchesWidget = ({ userType }: TopMatchesWidgetProps) => {
  const getMatches = () => {
    if (userType === 'startup') {
      return [
        { name: 'Ahmed Al-Rashid', company: 'MENA Ventures', match: 92, avatar: null },
        { name: 'Sarah Hassan', company: 'Gulf Capital', match: 88, avatar: null },
        { name: 'Omar Khalil', company: 'Desert Bloom VC', match: 85, avatar: null },
        { name: 'Fatima Al-Zahra', company: 'Falcon Investments', match: 82, avatar: null },
      ];
    } else {
      return [
        { name: 'TechFlow Solutions', company: 'FinTech', match: 94, avatar: null },
        { name: 'GreenTech MENA', company: 'CleanTech', match: 89, avatar: null },
        { name: 'HealthCare AI', company: 'HealthTech', match: 87, avatar: null },
        { name: 'EduNext Platform', company: 'EdTech', match: 84, avatar: null },
      ];
    }
  };

  const matches = getMatches();
  const title = userType === 'startup' ? 'Top Investor Matches' : 'Top Opportunities';
  const icon = userType === 'startup' ? Users : Building;
  const IconComponent = icon;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <IconComponent className="h-5 w-5" />
          {title}
        </CardTitle>
        <CardDescription>
          {userType === 'startup' ? 'Investors that match your profile and funding needs' : 'Startups matching your investment criteria'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {matches.map((match, index) => (
            <div key={index} className="flex items-center justify-between p-3 rounded-lg border bg-card/50">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={match.avatar} />
                  <AvatarFallback>{match.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{match.name}</p>
                  <p className="text-sm text-muted-foreground">{match.company}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant={match.match >= 90 ? 'default' : 'secondary'}>
                  {match.match}% match
                </Badge>
                <Button size="sm">Connect</Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};