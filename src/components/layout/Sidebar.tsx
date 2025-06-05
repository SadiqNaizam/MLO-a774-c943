import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, Library, UserCircle, RadioTower } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

// Example: Define props if needed, e.g., for playlists
// interface SidebarProps { userPlaylists?: { id: string; name: string }[]; }

const Sidebar: React.FC = () => {
  console.log("Rendering Sidebar");
  const location = useLocation();

  const navLinks = [
    { href: "/", label: "Home", icon: Home },
    { href: "/search", label: "Search", icon: Search },
    { href: "/library", label: "Your Library", icon: Library },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <aside className="w-64 bg-neutral-900 text-neutral-100 p-4 flex flex-col space-y-6 fixed top-0 left-0 h-full z-40">
      {/* Logo/Brand Placeholder */}
      <div className="mb-4">
        <Link to="/" className="flex items-center space-x-2">
          <RadioTower className="h-8 w-8 text-blue-400" /> {/* Doraemon Blue accent */}
          <h1 className="text-xl font-bold">MusicApp</h1>
        </Link>
      </div>

      <nav className="flex-grow">
        <ul className="space-y-2">
          {navLinks.map((link) => (
            <li key={link.label}>
              <Button
                variant={isActive(link.href) ? "secondary" : "ghost"}
                className={`w-full justify-start ${isActive(link.href) ? 'bg-neutral-700 text-white' : 'hover:bg-neutral-800'}`}
                asChild
              >
                <Link to={link.href}>
                  <link.icon className="mr-3 h-5 w-5" />
                  {link.label}
                </Link>
              </Button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Optional: User Playlists Section */}
      {/* <div className="mt-auto space-y-2">
        <h2 className="text-xs font-semibold uppercase text-neutral-400 px-3">Playlists</h2>
        <ScrollArea className="h-48">
          <ul className="space-y-1 p-1">
            {Array.from({ length: 10 }).map((_, i) => ( // Placeholder playlists
              <li key={i}>
                <Button variant="ghost" className="w-full justify-start text-sm text-neutral-300 hover:bg-neutral-800">
                  Playlist {i + 1}
                </Button>
              </li>
            ))}
          </ul>
        </ScrollArea>
      </div> */}

      <div className="mt-auto border-t border-neutral-700 pt-4">
        <Button variant="ghost" className="w-full justify-start hover:bg-neutral-800" asChild>
          <Link to="/profile">
            <UserCircle className="mr-3 h-5 w-5" />
            User Profile
          </Link>
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;