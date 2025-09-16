import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  Users, 
  MessageSquare, 
  FileText, 
  Calendar, 
  TrendingUp,
  Shield,
  CreditCard,
  Briefcase,
  Target,
  Building,
  Lightbulb
} from 'lucide-react';

interface DashboardSidebarProps {
  userType: 'startup' | 'investor' | 'service-provider';
}

type MenuItem = {
  icon: React.ElementType;
  label: string;
  href: string;
  active?: boolean;
};

export const DashboardSidebar = ({ userType }: DashboardSidebarProps) => {
  const [activeItem, setActiveItem] = useState('overview');

  const getMenuItems = (): MenuItem[] => {
    const baseItems: MenuItem[] = [
      { icon: Home, label: 'Overview', href: 'overview' },
      { icon: Users, label: 'Connections', href: 'connections' },
      { icon: MessageSquare, label: 'Messages', href: 'messages' },
      { icon: Calendar, label: 'Events', href: 'events' },
      { icon: Shield, label: 'Verification', href: 'verification' },
      { icon: CreditCard, label: 'Subscription', href: 'subscription' },
    ];

    const roleSpecificItems: Record<string, MenuItem[]> = {
      startup: [
        { icon: FileText, label: 'Data Room', href: 'dataroom' },
        { icon: TrendingUp, label: 'AI Score', href: 'ai-score' },
        { icon: Target, label: 'Fundraising', href: 'fundraising' },
        { icon: Lightbulb, label: 'AI Coach', href: 'ai-coach' },
      ],
      investor: [
        { icon: Briefcase, label: 'Deal Flow', href: 'dealflow' },
        { icon: TrendingUp, label: 'Analytics', href: 'analytics' },
        { icon: Building, label: 'Portfolio', href: 'portfolio' },
      ],
      'service-provider': [
        { icon: Briefcase, label: 'Services', href: 'services' },
        { icon: Target, label: 'Leads', href: 'leads' },
        { icon: TrendingUp, label: 'Performance', href: 'performance' },
      ],
    };

    return [...baseItems, ...roleSpecificItems[userType]];
  };

  const menuItems = getMenuItems();

  return (
    <aside className="w-64 border-r bg-card h-screen sticky top-16">
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => (
          <Button
            key={item.href}
            variant={activeItem === item.href ? 'default' : 'ghost'}
            className={cn(
              'w-full justify-start',
              activeItem === item.href && 'bg-primary text-primary-foreground'
            )}
            onClick={() => setActiveItem(item.href)}
          >
            <item.icon className="mr-3 h-4 w-4" />
            {item.label}
          </Button>
        ))}
      </nav>
    </aside>
  );
};