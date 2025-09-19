import { useAuth } from '@/hooks/useAuth';
import { useProfile } from '@/hooks/useProfile';
import { Navigate } from 'react-router-dom';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Clock, Users, Video } from 'lucide-react';

const Events = () => {
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

  const events = [
    {
      id: 1,
      title: 'MENA Startup Pitch Competition',
      description: 'Join the biggest pitch competition in the Middle East and showcase your startup to top VCs.',
      date: '2024-02-15',
      time: '14:00 - 18:00',
      location: 'Dubai World Trade Centre',
      type: 'In-Person',
      category: 'Competition',
      attendees: 250,
      status: 'upcoming'
    },
    {
      id: 2,
      title: 'Virtual Investor Meetup: FinTech Focus',
      description: 'Network with leading FinTech investors and entrepreneurs in our monthly virtual meetup.',
      date: '2024-02-08',
      time: '19:00 - 21:00',
      location: 'Virtual Event',
      type: 'Virtual',
      category: 'Networking',
      attendees: 120,
      status: 'registered'
    },
    {
      id: 3,
      title: 'Fundraising 101: Series A Workshop',
      description: 'Learn the fundamentals of Series A fundraising from successful founders and investors.',
      date: '2024-01-25',
      time: '10:00 - 16:00',
      location: 'Riyadh Tech Hub',
      type: 'Workshop',
      category: 'Education',
      attendees: 80,
      status: 'completed'
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
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold flex items-center gap-2">
                  <Calendar className="h-8 w-8 text-primary" />
                  Events
                </h1>
                <p className="text-muted-foreground mt-2">
                  Discover and join networking events, pitch competitions, and workshops
                </p>
              </div>
              <Button>
                <Calendar className="h-4 w-4 mr-2" />
                Create Event
              </Button>
            </div>

            {/* Events List */}
            <div className="space-y-6">
              {events.map((event) => (
                <Card key={event.id} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-semibold">{event.title}</h3>
                          <Badge 
                            variant={event.status === 'upcoming' ? 'default' : 
                                   event.status === 'registered' ? 'secondary' : 'outline'}
                          >
                            {event.status}
                          </Badge>
                          <Badge variant="outline">{event.category}</Badge>
                        </div>
                        <p className="text-muted-foreground mb-4">{event.description}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-primary" />
                            <span>{event.date}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-primary" />
                            <span>{event.time}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            {event.type === 'Virtual' ? (
                              <Video className="h-4 w-4 text-primary" />
                            ) : (
                              <MapPin className="h-4 w-4 text-primary" />
                            )}
                            <span>{event.location}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 mt-3 text-sm text-muted-foreground">
                          <Users className="h-4 w-4" />
                          <span>{event.attendees} attendees</span>
                        </div>
                      </div>
                      
                      <div className="flex gap-2 ml-6">
                        {event.status === 'upcoming' && (
                          <Button>Register</Button>
                        )}
                        {event.status === 'registered' && (
                          <Button variant="outline">View Details</Button>
                        )}
                        {event.status === 'completed' && (
                          <Button variant="outline">View Recordings</Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Events;