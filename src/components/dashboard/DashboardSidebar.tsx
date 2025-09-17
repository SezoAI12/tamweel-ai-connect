import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useLocation, useNavigate } from 'react-router-dom';
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
  const location = useLocation();
  const navigate = useNavigate();

  const getMenuItems = (): MenuItem[] => {
    // Main navigation items (same for all roles)
    const mainItems: MenuItem[] = [
      { icon: Home, label: 'Home', href: '/dashboard' },
      { icon: Users, label: 'Discover', href: '/discover' },
      { icon: Lightbulb, label: 'AI Coach', href: '/ai-coach' },
      { icon: Shield, label: 'My Score', href: '/my-score' },
      { icon: MessageSquare, label: 'Inbox', href: '/inbox' },
    ];

    // Add service management for service providers
    if (userType === 'service-provider') {
      mainItems.push({
        icon: Briefcase,
        label: 'Services',
        href: '/service-management'
      });
    }

    return mainItems;
  };

  const menuItems = getMenuItems();

  const isActive = (path: string) => location.pathname === path;

  return (
    <aside className="w-64 border-r bg-card h-screen sticky top-16">
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => (
          <Button
            key={item.href}
            variant={isActive(item.href) ? 'default' : 'ghost'}
            className={cn(
              'w-full justify-start',
              isActive(item.href) && 'bg-primary text-primary-foreground'
            )}
            onClick={() => navigate(item.href)}
          >
            <item.icon className="mr-3 h-4 w-4" />
            {item.label}
          </Button>
        ))}
      </nav>
    </aside>
  );
};