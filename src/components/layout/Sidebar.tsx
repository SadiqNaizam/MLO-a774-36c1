import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils'; // Assumes utils.ts for clsx/tailwind-merge
import { ScrollArea } from '@/components/ui/scroll-area';
import { Home, Compass, Library, PlusSquare, Heart, Search, Radio } from 'lucide-react'; // Example icons

interface NavItem {
  href: string;
  label: string;
  icon: React.ElementType;
  disabled?: boolean;
}

interface SidebarProps {
  className?: string;
}

const mainNavItems: NavItem[] = [
  { href: '/dashboard', label: 'Home', icon: Home },
  { href: '/discover', label: 'Discover', icon: Compass },
  { href: '/search', label: 'Search', icon: Search },
  { href: '/radio', label: 'Radio', icon: Radio },
];

const libraryNavItems: NavItem[] = [
  { href: '/collection/playlists', label: 'Playlists', icon: Library },
  { href: '/collection/artists', label: 'Artists', icon: Library },
  { href: '/collection/albums', label: 'Albums', icon: Library },
  { href: '/collection/liked', label: 'Liked Songs', icon: Heart },
];

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const location = useLocation();
  console.log("Rendering Sidebar, current location:", location.pathname);

  const renderNavList = (items: NavItem[], title?: string) => (
    <div className="space-y-1">
      {title && <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">{title}</h2>}
      {items.map((item) => (
        <Link
          key={item.href}
          to={item.href}
          className={cn(
            'flex items-center gap-3 rounded-md px-4 py-2 text-sm font-medium transition-colors',
            location.pathname === item.href
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:bg-muted hover:text-foreground',
            item.disabled && 'pointer-events-none opacity-50'
          )}
        >
          <item.icon className="h-4 w-4" />
          {item.label}
        </Link>
      ))}
    </div>
  );

  return (
    <aside className={cn("hidden md:block w-64 border-r bg-background", className)}>
      <ScrollArea className="h-full py-6 pr-4">
        <div className="space-y-4 py-4">
          {renderNavList(mainNavItems)}
        </div>
        <div className="space-y-4 py-4">
          {renderNavList(libraryNavItems, "Your Library")}
          <div className="px-3 py-2">
            <Link
              to="/playlist/new"
              className={cn(
                'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors w-full',
                 location.pathname === "/playlist/new"
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              )}
            >
              <PlusSquare className="mr-2 h-4 w-4" />
              Create Playlist
            </Link>
          </div>
        </div>
      </ScrollArea>
    </aside>
  );
};

export default Sidebar;