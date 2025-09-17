import { useAuth } from '@/hooks/useAuth';
import { useProfile } from '@/hooks/useProfile';
import { Navigate } from 'react-router-dom';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search, MapPin, Building, TrendingUp, Users } from 'lucide-react';

const Discover = () => {
  const { user, loading: authLoading } = useAuth();
  const { profile, loading: profileLoading } = useProfile();

  if (!authLoading && !user) {
    return <Navigate to="/auth" replace />;
  }

  if (authLoading || profileLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-lg font-semibold">Profile not found</h2>
          <p className="text-muted-foreground">Please contact support for assistance.</p>
        </div>
      </div>
    );
  }

  const mockMatches = [
    {
      id: 1,
      name: profile.user_type === 'startup' ? 'Ahmed Al-Rashid' : 'TechCorp MENA',
      title: profile.user_type === 'startup' ? 'Managing Partner at Gulf Ventures' : 'AI-Powered FinTech Platform',
      location: 'Dubai, UAE',
      matchScore: 94,
      description: profile.user_type === 'startup' 
        ? 'Focused on early-stage B2B SaaS companies in MENA'
        : 'Revolutionizing payments in the Middle East',
      tags: profile.user_type === 'startup' 
        ? ['FinTech', 'B2B SaaS', 'Series A'] 
        : ['FinTech', 'Series A', 'B2B'],
      funding: profile.user_type === 'startup' ? 'AED 500K - 5M' : 'Seeking AED 2M'
    },
    {
      id: 2,
      name: profile.user_type === 'startup' ? 'Sarah Hassan' : 'EcoTech Solutions',
      title: profile.user_type === 'startup' ? 'Investment Director at MENA Capital' : 'Sustainable Technology Startup',
      location: 'Riyadh, KSA',
      matchScore: 89,
      description: profile.user_type === 'startup' 
        ? 'Specializes in climate tech and sustainability'
        : 'Green technology for smart cities',
      tags: profile.user_type === 'startup' 
        ? ['CleanTech', 'Sustainability', 'Seed'] 
        : ['CleanTech', 'Smart Cities', 'Seed'],
      funding: profile.user_type === 'startup' ? 'AED 100K - 2M' : 'Seeking AED 1.5M'
    },
    {
      id: 3,
      name: profile.user_type === 'startup' ? 'Omar Khalil' : 'HealthBot AI',
      title: profile.user_type === 'startup' ? 'Angel Investor & Former Founder' : 'AI Healthcare Assistant',
      location: 'Cairo, Egypt',
      matchScore: 82,
      description: profile.user_type === 'startup' 
        ? 'Invests in healthcare and AI startups'
        : 'Democratizing healthcare through AI',
      tags: profile.user_type === 'startup' 
        ? ['HealthTech', 'AI', 'Pre-Seed'] 
        : ['HealthTech', 'AI', 'Pre-Seed'],
      funding: profile.user_type === 'startup' ? 'AED 50K - 500K' : 'Seeking AED 800K'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader profile={profile} />
      <div className="flex">
        <DashboardSidebar userType={profile.user_type} />
        <main className="flex-1 p-6">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Header */}
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-2">
                <Search className="h-8 w-8 text-primary" />
                Discover
              </h1>
              <p className="text-muted-foreground mt-2">
                {profile.user_type === 'startup' 
                  ? 'Find the perfect investors for your startup' 
                  : profile.user_type === 'investor'
                  ? 'Discover promising startups matching your investment criteria'
                  : 'Connect with startups and investors who need your services'
                }
              </p>
            </div>

            {/* Search & Filters */}
            <Card>
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <Input 
                      placeholder={`Search for ${profile.user_type === 'startup' ? 'investors' : 'startups'}...`}
                      className="w-full"
                    />
                  </div>
                  <Button>
                    <Search className="h-4 w-4 mr-2" />
                    Search
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Match Results */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Top Matches ({mockMatches.length})
                </CardTitle>
                <CardDescription>
                  AI-curated matches based on your profile and preferences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockMatches.map((match) => (
                    <div key={match.id} className="border rounded-lg p-6 hover:bg-muted/50 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4">
                          <Avatar className="h-16 w-16">
                            <AvatarFallback className="text-lg">
                              {match.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="text-lg font-semibold">{match.name}</h3>
                              <Badge variant="secondary" className="text-xs">
                                {match.matchScore}% Match
                              </Badge>
                            </div>
                            <p className="text-muted-foreground mb-2">{match.title}</p>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                              <span className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                {match.location}
                              </span>
                              <span className="flex items-center gap-1">
                                <Building className="h-4 w-4" />
                                {match.funding}
                              </span>
                            </div>
                            <p className="text-sm mb-3">{match.description}</p>
                            <div className="flex gap-2 flex-wrap">
                              {match.tags.map((tag, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <Button>Connect</Button>
                          <Button variant="outline">View Profile</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Discover;