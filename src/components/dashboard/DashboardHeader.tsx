import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Bell, Settings, LogOut } from 'lucide-react';

interface DashboardHeaderProps {
  profile: {
    full_name: string;
    email: string;
    profile_image_url?: string;
    trust_score: number;
    user_type: string;
  };
}

export const DashboardHeader = ({ profile }: DashboardHeaderProps) => {
  const { signOut } = useAuth();

  const getTrustBadge = (score: number) => {
    if (score >= 80) return { label: 'Platinum', variant: 'default' as const };
    if (score >= 60) return { label: 'Gold', variant: 'secondary' as const };
    if (score >= 40) return { label: 'Silver', variant: 'outline' as const };
    return { label: 'Bronze', variant: 'destructive' as const };
  };

  const trustBadge = getTrustBadge(profile.trust_score);

  return (
    <header className="border-b bg-card shadow-sm">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            Tamweel
          </h1>
          <Badge variant={trustBadge.variant}>
            Trust Score: {profile.trust_score}% ({trustBadge.label})
          </Badge>
        </div>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={profile.profile_image_url} />
                  <AvatarFallback>
                    {profile.full_name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <div className="flex items-center justify-start gap-2 p-2">
                <div className="flex flex-col space-y-1 leading-none">
                  <p className="font-medium">{profile.full_name}</p>
                  <p className="w-[200px] truncate text-sm text-muted-foreground">
                    {profile.email}
                  </p>
                  <Badge variant="outline" className="w-fit text-xs">
                    {profile.user_type.charAt(0).toUpperCase() + profile.user_type.slice(1)}
                  </Badge>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => signOut()}>
                <LogOut className="mr-2 h-4 w-4" />
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};