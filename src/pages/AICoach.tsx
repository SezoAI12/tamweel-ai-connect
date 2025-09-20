import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useProfile } from '@/hooks/useProfile';
import { Navigate } from 'react-router-dom';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { 
  Lightbulb, 
  Send, 
  Sparkles, 
  FileText, 
  Mail, 
  Calculator,
  Upload,
  Link,
  CheckCircle,
  Clock,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Settings,
  Eye,
  Download,
  ExternalLink,
  Zap,
  TrendingUp,
  Shield
} from 'lucide-react';

const AICoach = () => {
  const { user, loading: authLoading } = useAuth();
  const { profile, loading: profileLoading } = useProfile();
  const [message, setMessage] = useState('');
  const [projectOverviewOpen, setProjectOverviewOpen] = useState(false);
  const [maintenanceLogOpen, setMaintenanceLogOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState({
    id: 'proj_001',
    name: 'E-commerce Platform',
    stage: 'development', // 'initiation', 'development', 'maintenance'
    progress: 65,
    status: 'active'
  });

  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content: 'Welcome to AI Factory! 🚀 I\'m your intelligent development assistant. I can help you build, deploy, and maintain custom web applications from start to finish. What would you like to create today?',
      timestamp: new Date(),
      interactive: null,
      status: null
    }
  ]);

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

  const projectInitiationPrompts = [
    {
      icon: Sparkles,
      text: 'I want to build a marketplace for artisans',
      category: 'New Project'
    },
    {
      icon: Upload,
      text: 'I have an SRS document to upload',
      category: 'Upload Requirements'
    },
    {
      icon: FileText,
      text: 'I need a website for my local bakery',
      category: 'Business Website'
    },
    {
      icon: TrendingUp,
      text: 'Create a SaaS application for project management',
      category: 'SaaS Platform'
    }
  ];

  const developmentPrompts = [
    {
      icon: Eye,
      text: 'Show me the current prototype',
      category: 'Review'
    },
    {
      icon: Settings,
      text: 'Make the checkout button green instead of blue',
      category: 'Feedback'
    },
    {
      icon: CheckCircle,
      text: 'Approve prototype for full development',
      category: 'Approval'
    },
    {
      icon: ExternalLink,
      text: 'Deploy to staging environment',
      category: 'Deployment'
    }
  ];

  const maintenancePrompts = [
    {
      icon: Shield,
      text: 'Show me the maintenance log',
      category: 'Monitoring'
    },
    {
      icon: TrendingUp,
      text: 'Add a new feature to my application',
      category: 'Enhancement'
    },
    {
      icon: AlertTriangle,
      text: 'Check for security vulnerabilities',
      category: 'Security'
    },
    {
      icon: Zap,
      text: 'Optimize application performance',
      category: 'Optimization'
    }
  ];

  const getCurrentPrompts = () => {
    switch (currentProject.stage) {
      case 'initiation':
        return projectInitiationPrompts;
      case 'development':
        return developmentPrompts;
      case 'maintenance':
        return maintenancePrompts;
      default:
        return projectInitiationPrompts;
    }
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const newUserMessage = {
      id: messages.length + 1,
      type: 'user',
      content: message,
      timestamp: new Date(),
      interactive: null,
      status: null
    };

    // Generate context-aware AI response based on message content
    let aiResponse;
    const messageText = message.toLowerCase();

    if (messageText.includes('marketplace') || messageText.includes('artisan')) {
      aiResponse = {
        id: messages.length + 2,
        type: 'ai',
        content: 'That\'s a fantastic idea! A marketplace for artisans has great potential. To get started, I\'ll need to ask you a few questions. What kind of users will be on your platform?',
        timestamp: new Date(),
        interactive: {
          type: 'multipleChoice',
          options: [
            'Artists and customers',
            'Just artists (B2B)',
            'Multiple vendor types',
            'Let me explain more'
          ]
        },
        status: 'active'
      };
    } else if (messageText.includes('prototype') || messageText.includes('show me')) {
      aiResponse = {
        id: messages.length + 2,
        type: 'ai',
        content: 'Great news! Your interactive prototype is ready. You can view and test it using the link below. The current version includes the user registration, product catalog, and basic checkout flow.',
        timestamp: new Date(),
        interactive: {
          type: 'linkPreview',
          url: 'https://demo.ai-factory.com/prototype',
          title: 'E-commerce Platform Prototype',
          description: 'Interactive prototype with core functionality'
        },
        status: 'ready'
      };
    } else if (messageText.includes('maintenance') || messageText.includes('log')) {
      setMaintenanceLogOpen(true);
      aiResponse = {
        id: messages.length + 2,
        type: 'ai',
        content: 'I\'ve opened the maintenance log panel for you. Here you can see all automated fixes, security updates, and performance optimizations I\'ve performed on your application.',
        timestamp: new Date(),
        interactive: null,
        status: 'info'
      };
    } else if (messageText.includes('green') || messageText.includes('button')) {
      aiResponse = {
        id: messages.length + 2,
        type: 'ai',
        content: 'Understood! I\'ll change the checkout button from blue to green. This change will be applied to both the prototype and the final application. The update will be ready in approximately 30 seconds.',
        timestamp: new Date(),
        interactive: {
          type: 'status',
          action: 'Updating button color...',
          progress: 0
        },
        status: 'processing'
      };
    } else {
      aiResponse = {
        id: messages.length + 2,
        type: 'ai',
        content: 'I understand your request. Based on your project stage and requirements, I\'ll provide detailed guidance. Could you provide more specific details about what you\'d like to accomplish?',
        timestamp: new Date(),
        interactive: null,
        status: 'active'
      };
    }

    setMessages(prev => [...prev, newUserMessage, aiResponse]);
    setMessage('');
  };

  const handleQuickPrompt = (prompt: string) => {
    setMessage(prompt);
  };

  const handleFileUpload = () => {
    const aiResponse = {
      id: messages.length + 1,
      type: 'ai',
      content: 'Perfect! I\'ve received your SRS document. Let me analyze it and generate a project proposal for you. This will take about 2-3 minutes.',
      timestamp: new Date(),
      interactive: {
        type: 'status',
        action: 'Analyzing requirements document...',
        progress: 0
      },
      status: 'processing'
    };
    
    setMessages(prev => [...prev, aiResponse]);
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader profile={profile} />
      <div className="flex">
        <DashboardSidebar userType={profile.user_type} />
        <main className="flex-1 p-6">
          <div className="max-w-6xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold flex items-center gap-2">
                  <Sparkles className="h-8 w-8 text-primary" />
                  AI Factory Platform
                </h1>
                <p className="text-muted-foreground mt-2">
                  Build, deploy, and maintain custom web applications with intelligent AI assistance
                </p>
              </div>
              <Button variant="outline" className="gap-2">
                <Upload className="h-4 w-4" />
                New Project
              </Button>
            </div>

            {/* Project Status Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Current Project</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-lg font-semibold">{currentProject.name}</p>
                      <Badge variant={currentProject.stage === 'development' ? 'default' : 'secondary'} className="mt-1">
                        {currentProject.stage.charAt(0).toUpperCase() + currentProject.stage.slice(1)}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-primary">{currentProject.progress}%</p>
                      <Progress value={currentProject.progress} className="w-16 mt-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Development Stage</CardTitle>
                </CardHeader>
                <CardContent className="flex items-center gap-2">
                  {currentProject.stage === 'initiation' && <Clock className="h-4 w-4 text-orange-500" />}
                  {currentProject.stage === 'development' && <Settings className="h-4 w-4 text-blue-500" />}
                  {currentProject.stage === 'maintenance' && <Shield className="h-4 w-4 text-green-500" />}
                  <span className="font-medium">
                    {currentProject.stage === 'initiation' && 'Requirements Gathering'}
                    {currentProject.stage === 'development' && 'Active Development'}
                    {currentProject.stage === 'maintenance' && 'Live & Maintained'}
                  </span>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">AI Actions Today</CardTitle>
                </CardHeader>
                <CardContent className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-yellow-500" />
                  <span className="text-2xl font-bold">12</span>
                  <span className="text-sm text-muted-foreground">automated tasks</span>
                </CardContent>
              </Card>
            </div>

            {/* Main Interface Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Conversational Dashboard - Main Chat */}
              <div className="lg:col-span-3">
                {/* Context-Aware Quick Actions */}
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Lightbulb className="h-5 w-5" />
                      Quick Actions for {currentProject.stage.charAt(0).toUpperCase() + currentProject.stage.slice(1)}
                    </CardTitle>
                    <CardDescription>
                      Context-aware suggestions based on your current project stage
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {getCurrentPrompts().map((prompt, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          className="justify-start h-auto p-4 text-left hover:bg-muted/50"
                          onClick={() => handleQuickPrompt(prompt.text)}
                        >
                          <div className="flex items-start gap-3 w-full">
                            <prompt.icon className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                            <div className="flex-1">
                              <p className="text-sm font-medium">{prompt.text}</p>
                              <Badge variant="secondary" className="mt-2 text-xs">
                                {prompt.category}
                              </Badge>
                            </div>
                          </div>
                        </Button>
                      ))}
                    </div>
                    
                    {/* File Upload for SRS Documents */}
                    <Separator className="my-4" />
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" className="gap-2" onClick={handleFileUpload}>
                        <Upload className="h-4 w-4" />
                        Upload SRS Document
                      </Button>
                      <Button variant="outline" size="sm" className="gap-2">
                        <ExternalLink className="h-4 w-4" />
                        View Prototype
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Main Chat Interface */}
                <Card className="flex flex-col h-[600px]">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-primary" />
                      AI Development Assistant
                    </CardTitle>
                    <CardDescription>
                      Conversational interface for project management and development
                    </CardDescription>
                  </CardHeader>
                  
                  {/* Messages with Interactive Elements */}
                  <ScrollArea className="flex-1 p-4">
                    <div className="space-y-4">
                      {messages.map((msg) => (
                        <div
                          key={msg.id}
                          className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-[85%] rounded-lg ${
                              msg.type === 'user'
                                ? 'bg-primary text-primary-foreground p-3'
                                : 'bg-card border p-4'
                            }`}
                          >
                            {/* Status Indicator */}
                            {msg.status && msg.type === 'ai' && (
                              <div className="flex items-center gap-2 mb-2">
                                {msg.status === 'processing' && <Clock className="h-3 w-3 text-orange-500" />}
                                {msg.status === 'ready' && <CheckCircle className="h-3 w-3 text-green-500" />}
                                {msg.status === 'active' && <Zap className="h-3 w-3 text-blue-500" />}
                                {msg.status === 'info' && <Lightbulb className="h-3 w-3 text-purple-500" />}
                                <Badge variant="outline" className="text-xs">
                                  {msg.status}
                                </Badge>
                              </div>
                            )}

                            <p className="text-sm leading-relaxed">{msg.content}</p>

                            {/* Interactive Elements */}
                            {msg.interactive && msg.type === 'ai' && (
                              <div className="mt-3">
                                {msg.interactive.type === 'multipleChoice' && (
                                  <div className="space-y-2">
                                    {msg.interactive.options.map((option, idx) => (
                                      <Button
                                        key={idx}
                                        variant="outline"
                                        size="sm"
                                        className="w-full justify-start text-xs"
                                        onClick={() => handleQuickPrompt(option)}
                                      >
                                        {String.fromCharCode(65 + idx)}) {option}
                                      </Button>
                                    ))}
                                  </div>
                                )}

                                {msg.interactive.type === 'linkPreview' && (
                                  <Card className="mt-2 bg-muted/30">
                                    <CardContent className="p-3">
                                      <div className="flex items-center gap-2 mb-2">
                                        <ExternalLink className="h-4 w-4" />
                                        <span className="font-medium text-sm">{msg.interactive.title}</span>
                                      </div>
                                      <p className="text-xs text-muted-foreground mb-2">
                                        {msg.interactive.description}
                                      </p>
                                      <Button size="sm" variant="default" className="gap-2">
                                        <Eye className="h-3 w-3" />
                                        View Prototype
                                      </Button>
                                    </CardContent>
                                  </Card>
                                )}

                                {msg.interactive.type === 'status' && (
                                  <div className="mt-2 p-2 bg-muted/50 rounded">
                                    <div className="flex items-center gap-2 mb-2">
                                      <Clock className="h-3 w-3 animate-spin" />
                                      <span className="text-xs font-medium">{msg.interactive.action}</span>
                                    </div>
                                    <Progress value={msg.interactive.progress || 30} className="h-1" />
                                  </div>
                                )}
                              </div>
                            )}

                            <p className={`text-xs mt-2 ${
                              msg.type === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground'
                            }`}>
                              {msg.timestamp.toLocaleTimeString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>

                  {/* Enhanced Input */}
                  <div className="border-t p-4">
                    <div className="flex gap-2">
                      <Textarea
                        placeholder="Tell me about your project idea, ask for updates, or request changes..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSendMessage())}
                        className="flex-1 min-h-[60px] max-h-32 resize-none"
                      />
                      <div className="flex flex-col gap-2">
                        <Button onClick={handleSendMessage} disabled={!message.trim()} size="sm">
                          <Send className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Upload className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Press Enter to send, Shift+Enter for new line
                    </p>
                  </div>
                </Card>
              </div>

              {/* Supplementary Panels */}
              <div className="lg:col-span-1 space-y-6">
                {/* Project Overview Panel */}
                <Collapsible open={projectOverviewOpen} onOpenChange={setProjectOverviewOpen}>
                  <Card>
                    <CollapsibleTrigger asChild>
                      <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                        <CardTitle className="flex items-center justify-between text-sm">
                          <span className="flex items-center gap-2">
                            <FileText className="h-4 w-4" />
                            Project Overview
                          </span>
                          {projectOverviewOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                        </CardTitle>
                      </CardHeader>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <CardContent className="pt-0">
                        <div className="space-y-3">
                          <div>
                            <p className="text-xs font-medium text-muted-foreground">Timeline</p>
                            <p className="text-sm">Started 5 days ago</p>
                          </div>
                          <div>
                            <p className="text-xs font-medium text-muted-foreground">Estimated Completion</p>
                            <p className="text-sm">3 days remaining</p>
                          </div>
                          <div>
                            <p className="text-xs font-medium text-muted-foreground">Features Completed</p>
                            <p className="text-sm">8 of 12</p>
                          </div>
                          <Separator />
                          <Button size="sm" variant="outline" className="w-full gap-2">
                            <Download className="h-3 w-3" />
                            Download SRS
                          </Button>
                        </div>
                      </CardContent>
                    </CollapsibleContent>
                  </Card>
                </Collapsible>

                {/* Maintenance Log Panel */}
                <Collapsible open={maintenanceLogOpen} onOpenChange={setMaintenanceLogOpen}>
                  <Card>
                    <CollapsibleTrigger asChild>
                      <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                        <CardTitle className="flex items-center justify-between text-sm">
                          <span className="flex items-center gap-2">
                            <Settings className="h-4 w-4" />
                            Maintenance Log
                          </span>
                          {maintenanceLogOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                        </CardTitle>
                      </CardHeader>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <CardContent className="pt-0">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-xs">
                            <CheckCircle className="h-3 w-3 text-green-500" />
                            <span>Security patch applied</span>
                            <Badge variant="outline" className="text-xs">2h ago</Badge>
                          </div>
                          <div className="flex items-center gap-2 text-xs">
                            <Zap className="h-3 w-3 text-blue-500" />
                            <span>Performance optimized</span>
                            <Badge variant="outline" className="text-xs">1d ago</Badge>
                          </div>
                          <div className="flex items-center gap-2 text-xs">
                            <Shield className="h-3 w-3 text-purple-500" />
                            <span>Dependencies updated</span>
                            <Badge variant="outline" className="text-xs">3d ago</Badge>
                          </div>
                        </div>
                      </CardContent>
                    </CollapsibleContent>
                  </Card>
                </Collapsible>

                {/* Quick Stats */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Platform Stats</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Uptime</span>
                      <span className="font-medium">99.9%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Response Time</span>
                      <span className="font-medium">120ms</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>AI Actions</span>
                      <span className="font-medium">1,247</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AICoach;