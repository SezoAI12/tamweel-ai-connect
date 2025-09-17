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
import { Lightbulb, Send, Sparkles, FileText, Mail, Calculator } from 'lucide-react';

const AICoach = () => {
  const { user, loading: authLoading } = useAuth();
  const { profile, loading: profileLoading } = useProfile();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      type: 'ai',
      content: 'Hello! I\'m your AI Coach. I can help you with fundraising strategy, pitch deck improvements, financial modeling, and investor outreach. What would you like to work on today?',
      timestamp: new Date()
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

  const quickPrompts = [
    {
      icon: Mail,
      text: 'Help me write a follow-up email to Investor Ahmed',
      category: 'Communication'
    },
    {
      icon: FileText,
      text: 'Analyze my pitch deck and suggest improvements',
      category: 'Pitch Deck'
    },
    {
      icon: Calculator,
      text: 'Model a $500k investment on a SAFE with a $5M cap',
      category: 'Financial Modeling'
    },
    {
      icon: Lightbulb,
      text: 'What are the key metrics investors look for in my industry?',
      category: 'Strategy'
    }
  ];

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const newUserMessage = {
      type: 'user',
      content: message,
      timestamp: new Date()
    };

    const aiResponse = {
      type: 'ai',
      content: 'I understand you\'d like help with that. This is a demo response - in the full version, I would provide detailed, actionable advice based on your specific situation and the latest fundraising best practices.',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newUserMessage, aiResponse]);
    setMessage('');
  };

  const handleQuickPrompt = (prompt: string) => {
    setMessage(prompt);
  };

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
                <Sparkles className="h-8 w-8 text-primary" />
                AI Coach
              </h1>
              <p className="text-muted-foreground mt-2">
                Your intelligent assistant for fundraising, strategy, and growth
              </p>
            </div>

            {/* Quick Prompts */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Start</CardTitle>
                <CardDescription>Choose a prompt to get started, or type your own question below</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {quickPrompts.map((prompt, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="justify-start h-auto p-4 text-left"
                      onClick={() => handleQuickPrompt(prompt.text)}
                    >
                      <div className="flex items-start gap-3 w-full">
                        <prompt.icon className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">{prompt.text}</p>
                          <Badge variant="secondary" className="mt-2">
                            {prompt.category}
                          </Badge>
                        </div>
                      </div>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Chat Interface */}
            <Card className="flex flex-col h-[500px]">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5" />
                  Conversation
                </CardTitle>
              </CardHeader>
              
              {/* Messages */}
              <CardContent className="flex-1 overflow-y-auto space-y-4">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        msg.type === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                      }`}
                    >
                      <p className="text-sm">{msg.content}</p>
                      <p className={`text-xs mt-2 ${
                        msg.type === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground'
                      }`}>
                        {msg.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>

              {/* Input */}
              <div className="border-t p-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Ask me anything about fundraising, strategy, or growth..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1"
                  />
                  <Button onClick={handleSendMessage} disabled={!message.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AICoach;