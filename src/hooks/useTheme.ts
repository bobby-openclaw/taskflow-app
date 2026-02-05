import { useEffect, useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { themes, type ThemeName } from '@/config/themes';

export type Theme = ThemeName;

export function useTheme() {
  const [theme, setThemeRaw] = useLocalStorage<ThemeName>('taskflow-theme', 'dark');

  // Apply theme class to document — removes all theme classes, then adds the active one
  useEffect(() => {
    const root = document.documentElement;
    // Remove all known theme classes
    Object.values(themes).forEach(({ class: cls }) => {
      if (cls) root.classList.remove(cls);
    });
    root.classList.remove('dark');

    // Add the selected theme's class
    const themeClass = themes[theme]?.class;
    if (themeClass) {
      root.classList.add(themeClass);
    }
  }, [theme]);

  const setTheme = useCallback(
    (name: ThemeName) => setThemeRaw(name),
    [setThemeRaw],
  );

  const toggleTheme = useCallback(() => {
    setThemeRaw((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, [setThemeRaw]);

  return { theme, setTheme, toggleTheme };
}
