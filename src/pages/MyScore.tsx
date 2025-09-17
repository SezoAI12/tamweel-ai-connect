import { useAuth } from '@/hooks/useAuth';
import { useProfile } from '@/hooks/useProfile';
import { Navigate } from 'react-router-dom';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Shield, 
  CheckCircle, 
  XCircle, 
  Upload, 
  User, 
  MessageSquare, 
  TrendingUp, 
  Target,
  Linkedin,
  FileText
} from 'lucide-react';

const MyScore = () => {
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

  const scoreComponents = [
    { name: 'Profile Completeness', score: 75, maxScore: 100, color: 'bg-blue-500' },
    { name: 'Verification Status', score: 60, maxScore: 100, color: 'bg-green-500' },
    { name: 'Platform Engagement', score: 45, maxScore: 100, color: 'bg-purple-500' },
  ];

  const verificationItems = [
    { name: 'Email Verification', status: 'completed', icon: CheckCircle },
    { name: 'Phone Verification', status: 'completed', icon: CheckCircle },
    { name: 'LinkedIn Profile', status: 'pending', icon: XCircle },
    { name: 'Identity Document', status: 'pending', icon: XCircle },
    { name: 'Business Registration', status: 'pending', icon: XCircle },
    { name: 'Financial Documents', status: 'not_started', icon: XCircle },
  ];

  const improvementTasks = [
    {
      task: 'Connect your LinkedIn profile',
      points: 15,
      icon: Linkedin,
      action: 'Connect LinkedIn',
      priority: 'high'
    },
    {
      task: 'Upload financial projections',
      points: 20,
      icon: FileText,
      action: 'Upload Documents',
      priority: 'high'
    },
    {
      task: 'Complete your company description',
      points: 10,
      icon: User,
      action: 'Update Profile',
      priority: 'medium'
    }
  ];

  const getTrustBadge = (score: number) => {
    if (score >= 80) return { label: 'Platinum', variant: 'default' as const, color: 'text-yellow-500' };
    if (score >= 60) return { label: 'Gold', variant: 'secondary' as const, color: 'text-yellow-600' };
    if (score >= 40) return { label: 'Silver', variant: 'outline' as const, color: 'text-gray-500' };
    return { label: 'Bronze', variant: 'destructive' as const, color: 'text-orange-600' };
  };

  const trustBadge = getTrustBadge(profile.trust_score);

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
                <Shield className="h-8 w-8 text-primary" />
                My Score
              </h1>
              <p className="text-muted-foreground mt-2">
                Track your Trust Score® and complete verification to unlock more opportunities
              </p>
            </div>

            {/* Current Score Overview */}
            <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-primary-glow/5">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl">Your Trust Score®</CardTitle>
                    <CardDescription>Your credibility and verification status</CardDescription>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary mb-2">{profile.trust_score}</div>
                    <Badge variant={trustBadge.variant} className={trustBadge.color}>
                      {trustBadge.label}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Progress value={profile.trust_score} className="h-4 mb-4" />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Bronze (0-39)</span>
                  <span>Silver (40-59)</span>
                  <span>Gold (60-79)</span>
                  <span>Platinum (80-100)</span>
                </div>
              </CardContent>
            </Card>

            {/* Score Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>Score Breakdown</CardTitle>
                <CardDescription>See how your score is calculated across different areas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {scoreComponents.map((component, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{component.name}</span>
                        <span className="text-sm text-muted-foreground">
                          {component.score}/{component.maxScore}
                        </span>
                      </div>
                      <div className="relative">
                        <Progress value={(component.score / component.maxScore) * 100} className="h-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Improvement Plan */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Improvement Plan
                </CardTitle>
                <CardDescription>Complete these tasks to boost your Trust Score®</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {improvementTasks.map((task, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <task.icon className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">{task.task}</p>
                          <p className="text-sm text-muted-foreground">+{task.points} points</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant={task.priority === 'high' ? 'default' : 'secondary'}>
                          {task.priority === 'high' ? 'High Priority' : 'Medium'}
                        </Badge>
                        <Button variant="outline" size="sm">
                          {task.action}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Verification Checklist */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  Verification Checklist
                </CardTitle>
                <CardDescription>Complete your verification to increase trust and unlock features</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {verificationItems.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <item.icon className={`h-5 w-5 ${
                          item.status === 'completed' ? 'text-green-500' : 'text-gray-400'
                        }`} />
                        <span className={item.status === 'completed' ? 'text-foreground' : 'text-muted-foreground'}>
                          {item.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        {item.status === 'completed' ? (
                          <Badge variant="default">Verified</Badge>
                        ) : (
                          <Button variant="outline" size="sm">
                            <Upload className="h-4 w-4 mr-2" />
                            Upload
                          </Button>
                        )}
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

export default MyScore;