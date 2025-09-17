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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MessageSquare, Send, Search, Filter, Calendar, Paperclip } from 'lucide-react';

const Inbox = () => {
  const { user, loading: authLoading } = useAuth();
  const { profile, loading: profileLoading } = useProfile();
  const [selectedConversation, setSelectedConversation] = useState(1);
  const [message, setMessage] = useState('');

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

  const conversations = [
    {
      id: 1,
      name: 'Ahmed Al-Rashid',
      role: 'Managing Partner at Gulf Ventures',
      lastMessage: 'Looking forward to discussing your Series A plans.',
      timestamp: '2 min ago',
      unread: 2,
      status: 'Connected'
    },
    {
      id: 2,
      name: 'Sarah Hassan',
      role: 'Investment Director at MENA Capital',
      lastMessage: 'Your pitch deck looks promising. Can we schedule a call?',
      timestamp: '1 hour ago',
      unread: 0,
      status: 'Connected'
    },
    {
      id: 3,
      name: 'Omar Khalil',
      role: 'Angel Investor',
      lastMessage: 'Thank you for connecting! I\'d love to learn more about your traction.',
      timestamp: '3 hours ago',
      unread: 1,
      status: 'Connected'
    }
  ];

  const messages = [
    {
      id: 1,
      sender: 'Ahmed Al-Rashid',
      content: 'Hi there! I reviewed your profile and I\'m impressed with your traction numbers.',
      timestamp: '10:30 AM',
      isMe: false
    },
    {
      id: 2,
      sender: 'You',
      content: 'Thank you Ahmed! I\'d love to discuss our Series A plans with you.',
      timestamp: '10:35 AM',
      isMe: true
    },
    {
      id: 3,
      sender: 'Ahmed Al-Rashid',
      content: 'Perfect! I have some specific questions about your market expansion strategy.',
      timestamp: '10:37 AM',
      isMe: false
    },
    {
      id: 4,
      sender: 'Ahmed Al-Rashid',
      content: 'Looking forward to discussing your Series A plans.',
      timestamp: '10:38 AM',
      isMe: false
    }
  ];

  const handleSendMessage = () => {
    if (!message.trim()) return;
    // Handle message sending logic here
    setMessage('');
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader profile={profile} />
      <div className="flex">
        <DashboardSidebar userType={profile.user_type} />
        <main className="flex-1 p-6">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold flex items-center gap-2">
                <MessageSquare className="h-8 w-8 text-primary" />
                Inbox
              </h1>
              <p className="text-muted-foreground mt-2">
                Manage your conversations and connections
              </p>
            </div>

            <div className="grid grid-cols-12 gap-6 h-[600px]">
              {/* Conversations List */}
              <div className="col-span-4">
                <Card className="h-full">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Conversations</CardTitle>
                    <div className="flex gap-2">
                      <Input placeholder="Search conversations..." className="flex-1" />
                      <Button variant="outline" size="icon">
                        <Search className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="space-y-0">
                      {conversations.map((conv) => (
                        <div
                          key={conv.id}
                          className={`p-4 border-b cursor-pointer hover:bg-muted/50 transition-colors ${
                            selectedConversation === conv.id ? 'bg-muted' : ''
                          }`}
                          onClick={() => setSelectedConversation(conv.id)}
                        >
                          <div className="flex items-start gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarFallback>{conv.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <p className="font-medium truncate">{conv.name}</p>
                                {conv.unread > 0 && (
                                  <Badge variant="default" className="text-xs h-5 w-5 rounded-full p-0 flex items-center justify-center">
                                    {conv.unread}
                                  </Badge>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground truncate">{conv.role}</p>
                              <p className="text-sm truncate mt-1">{conv.lastMessage}</p>
                              <p className="text-xs text-muted-foreground mt-1">{conv.timestamp}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Chat Interface */}
              <div className="col-span-8">
                <Card className="h-full flex flex-col">
                  {/* Chat Header */}
                  <CardHeader className="pb-3 border-b">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback>A</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">Ahmed Al-Rashid</p>
                          <p className="text-sm text-muted-foreground">Managing Partner at Gulf Ventures</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Calendar className="h-4 w-4 mr-2" />
                          Schedule Meeting
                        </Button>
                        <Button variant="outline" size="sm">
                          <Paperclip className="h-4 w-4 mr-2" />
                          Share Document
                        </Button>
                      </div>
                    </div>
                  </CardHeader>

                  {/* Messages */}
                  <CardContent className="flex-1 p-4 overflow-y-auto">
                    <div className="space-y-4">
                      {messages.map((msg) => (
                        <div
                          key={msg.id}
                          className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-[80%] rounded-lg p-3 ${
                              msg.isMe
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-muted'
                            }`}
                          >
                            <p className="text-sm">{msg.content}</p>
                            <p className={`text-xs mt-2 ${
                              msg.isMe ? 'text-primary-foreground/70' : 'text-muted-foreground'
                            }`}>
                              {msg.timestamp}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>

                  {/* Message Input */}
                  <div className="border-t p-4">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Type your message..."
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
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Inbox;