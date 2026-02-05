import { Moon, Sun, Info } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useThemeContext } from '@/context';

export function Settings() {
  const { theme, toggleTheme } = useThemeContext();

  return (
    <div className="max-w-2xl animate-fade-in">
      <h2 className="text-2xl font-bold mb-6">Settings</h2>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
          <CardDescription>Customize how TaskFlow looks on your device</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Theme</p>
              <p className="text-sm text-muted-foreground">
                Currently using {theme} mode
              </p>
            </div>
            <Button variant="secondary" onClick={toggleTheme}>
              {theme === 'light' ? (
                <>
                  <Moon className="h-4 w-4 mr-2" />
                  Dark Mode
                </>
              ) : (
                <>
                  <Sun className="h-4 w-4 mr-2" />
                  Light Mode
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="h-5 w-5" />
            About
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-2">TaskFlow v1.0.0</p>
          <p className="text-muted-foreground">
            A simple task management app built with React 19, TypeScript, Tailwind CSS, and shadcn/ui.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
