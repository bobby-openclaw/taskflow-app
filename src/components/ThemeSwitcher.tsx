import { Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { themes, type ThemeName } from '@/config/themes';
import { useThemeContext } from '@/context';

const themeIcons: Record<ThemeName, string> = {
  light: '☀️',
  dark: '🌙',
  blue: '🌊',
  green: '🌲',
};

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useThemeContext();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Switch theme">
          <Palette className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {(Object.keys(themes) as ThemeName[]).map((key) => (
          <DropdownMenuItem
            key={key}
            onClick={() => setTheme(key)}
            className={theme === key ? 'bg-accent' : ''}
          >
            <span className="mr-2">{themeIcons[key]}</span>
            {themes[key].name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
