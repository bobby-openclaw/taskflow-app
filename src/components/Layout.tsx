import { Outlet, NavLink } from 'react-router-dom';
import { Moon, Sun, LayoutDashboard, Settings as SettingsIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useThemeContext } from '@/context';

function Header() {
  const { theme, toggleTheme } = useThemeContext();

  return (
    <header className="flex items-center gap-8 px-6 py-4 border-b bg-card">
      <h1 className="text-2xl font-bold">TaskFlow</h1>
      <nav className="flex gap-2 flex-1">
        <NavLink 
          to="/" 
          end
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
      </nav>
      <Button 
        variant="ghost" 
        size="icon"
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      >
        {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
      </Button>
    </header>
  );
}

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 p-4 sm:p-6 max-w-4xl mx-auto w-full">
        <Outlet />
      </main>
    </div>
  );
}
