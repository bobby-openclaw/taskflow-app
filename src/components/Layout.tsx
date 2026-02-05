import { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { LayoutDashboard, Settings as SettingsIcon, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { ThemeSwitcher } from './ThemeSwitcher';

const NavLinks = ({ onNavigate }: { onNavigate?: () => void }) => {
  return (
    <>
      <NavLink 
        to="/" 
        end
        onClick={onNavigate}
        className={({ isActive }) => 
          `flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
            isActive 
              ? 'bg-primary/10 text-primary' 
              : 'text-muted-foreground hover:text-foreground hover:bg-accent'
          }`
        }
      >
        <LayoutDashboard className="h-4 w-4" />
        Dashboard
      </NavLink>
      <NavLink 
        to="/settings"
        onClick={onNavigate}
        className={({ isActive }) => 
          `flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
            isActive 
              ? 'bg-primary/10 text-primary' 
              : 'text-muted-foreground hover:text-foreground hover:bg-accent'
          }`
        }
      >
        <SettingsIcon className="h-4 w-4" />
        Settings
      </NavLink>
    </>
  );
};

const MobileSidebar = () => {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="sm:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>TaskFlow</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-2 mt-6">
          <NavLinks onNavigate={() => setOpen(false)} />
        </nav>
      </SheetContent>
    </Sheet>
  );
};

const Header = () => {
  return (
    <header className="flex items-center gap-4 sm:gap-8 px-4 sm:px-6 py-4 border-b bg-card">
      <MobileSidebar />
      <h1 className="text-xl sm:text-2xl font-bold">TaskFlow</h1>
      <nav className="hidden sm:flex gap-2 flex-1">
        <NavLinks />
      </nav>
      <div className="flex-1 sm:flex-none" />
      <ThemeSwitcher />
    </header>
  );
};

export const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 p-4 sm:p-6 max-w-4xl mx-auto w-full">
        <Outlet />
      </main>
    </div>
  );
};
