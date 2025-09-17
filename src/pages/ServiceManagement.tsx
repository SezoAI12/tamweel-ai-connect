import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useProfile } from '@/hooks/useProfile';
import { Navigate } from 'react-router-dom';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Briefcase, 
  Plus, 
  Edit, 
  Trash2, 
  Users, 
  Calendar, 
  DollarSign,
  FileText,
  Star,
  TrendingUp
} from 'lucide-react';

const ServiceManagement = () => {
  const { user, loading: authLoading } = useAuth();
  const { profile, loading: profileLoading } = useProfile();
  const [isCreating, setIsCreating] = useState(false);

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

  if (!profile || profile.user_type !== 'service-provider') {
    return <Navigate to="/dashboard" replace />;
  }

  const services = [
    {
      id: 1,
      title: 'Pitch Deck Design & Strategy',
      description: 'Complete pitch deck creation with storytelling and design expertise',
      price: 'AED 5,000 - 15,000',
      duration: '2-3 weeks',
      status: 'active',
      clients: 24,
      rating: 4.8,
      category: 'Design & Strategy'
    },
    {
      id: 2,
      title: 'Financial Model Development',
      description: 'Build comprehensive financial models for fundraising',
      price: 'AED 3,000 - 8,000',
      duration: '1-2 weeks',
      status: 'active',
      clients: 18,
      rating: 4.9,
      category: 'Financial Advisory'
    },
    {
      id: 3,
      title: 'Legal Documentation Review',
      description: 'Review and prepare legal documents for fundraising',
      price: 'AED 2,000 - 6,000',
      duration: '1 week',
      status: 'draft',
      clients: 0,
      rating: 0,
      category: 'Legal Services'
    }
  ];

  const clients = [
    {
      id: 1,
      name: 'TechStart MENA',
      service: 'Pitch Deck Design',
      status: 'In Progress',
      startDate: '2024-01-15',
      value: 'AED 8,000'
    },
    {
      id: 2,
      name: 'FinTech Solutions',
      service: 'Financial Modeling',
      status: 'Completed',
      startDate: '2024-01-10',
      value: 'AED 5,000'
    },
    {
      id: 3,
      name: 'GreenTech Innovations',
      service: 'Pitch Deck Design',
      status: 'Pending Review',
      startDate: '2024-01-20',
      value: 'AED 12,000'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader profile={profile} />
      <div className="flex">
        <DashboardSidebar userType={profile.user_type} />
        <main className="flex-1 p-6">
          <div className="max-w-6xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold flex items-center gap-2">
                  <Briefcase className="h-8 w-8 text-primary" />
                  Service Management
                </h1>
                <p className="text-muted-foreground mt-2">
                  Manage your services, clients, and business performance
                </p>
              </div>
              <Button onClick={() => setIsCreating(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add New Service
              </Button>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-primary" />
                    <span className="text-sm font-medium text-muted-foreground">Active Services</span>
                  </div>
                  <div className="text-2xl font-bold mt-2">
                    {services.filter(s => s.status === 'active').length}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    <span className="text-sm font-medium text-muted-foreground">Total Clients</span>
                  </div>
                  <div className="text-2xl font-bold mt-2">42</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-primary" />
                    <span className="text-sm font-medium text-muted-foreground">Monthly Revenue</span>
                  </div>
                  <div className="text-2xl font-bold mt-2">AED 25,000</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-primary" />
                    <span className="text-sm font-medium text-muted-foreground">Average Rating</span>
                  </div>
                  <div className="text-2xl font-bold mt-2">4.8</div>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="services" className="space-y-6">
              <TabsList>
                <TabsTrigger value="services">My Services</TabsTrigger>
                <TabsTrigger value="clients">Active Clients</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
              </TabsList>

              {/* Services Tab */}
              <TabsContent value="services">
                <div className="space-y-4">
                  {services.map((service) => (
                    <Card key={service.id}>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-lg font-semibold">{service.title}</h3>
                              <Badge variant={service.status === 'active' ? 'default' : 'secondary'}>
                                {service.status}
                              </Badge>
                              <Badge variant="outline">{service.category}</Badge>
                            </div>
                            <p className="text-muted-foreground mb-4">{service.description}</p>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                              <div>
                                <span className="text-muted-foreground">Price Range:</span>
                                <p className="font-medium">{service.price}</p>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Duration:</span>
                                <p className="font-medium">{service.duration}</p>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Clients Served:</span>
                                <p className="font-medium">{service.clients}</p>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Rating:</span>
                                <p className="font-medium flex items-center gap-1">
                                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                  {service.rating > 0 ? service.rating : 'No ratings yet'}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </Button>
                            <Button variant="outline" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Clients Tab */}
              <TabsContent value="clients">
                <Card>
                  <CardHeader>
                    <CardTitle>Active Client Projects</CardTitle>
                    <CardDescription>
                      Manage your ongoing client engagements
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {clients.map((client) => (
                        <div key={client.id} className="border rounded-lg p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-semibold">{client.name}</h4>
                              <p className="text-sm text-muted-foreground">{client.service}</p>
                              <p className="text-sm text-muted-foreground">Started: {client.startDate}</p>
                            </div>
                            <div className="text-right">
                              <Badge 
                                variant={client.status === 'Completed' ? 'default' : 
                                        client.status === 'In Progress' ? 'secondary' : 'outline'}
                              >
                                {client.status}
                              </Badge>
                              <p className="text-sm font-medium mt-1">{client.value}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Analytics Tab */}
              <TabsContent value="analytics">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5" />
                        Revenue Trend
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-8">
                        <TrendingUp className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground">Revenue analytics coming soon</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Users className="h-5 w-5" />
                        Client Satisfaction
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span>5 Stars</span>
                          <div className="flex items-center gap-2">
                            <div className="w-20 h-2 bg-muted rounded-full">
                              <div className="w-16 h-2 bg-primary rounded-full"></div>
                            </div>
                            <span className="text-sm text-muted-foreground">80%</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>4 Stars</span>
                          <div className="flex items-center gap-2">
                            <div className="w-20 h-2 bg-muted rounded-full">
                              <div className="w-4 h-2 bg-primary rounded-full"></div>
                            </div>
                            <span className="text-sm text-muted-foreground">20%</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ServiceManagement;