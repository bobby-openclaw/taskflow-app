import type { ReactNode } from 'react';
import { useThemeContext } from '../context';

interface LayoutProps {
  children: ReactNode;
}

function Header() {
  const { theme, toggleTheme } = useThemeContext();

  return (
    <header className="header">
      <h1>TaskFlow</h1>
      <button className="theme-toggle" onClick={toggleTheme}>
        {theme === 'light' ? '🌙' : '☀️'}
      </button>
    </header>
  );
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="app">
      <Header />
      <main className="main-content">{children}</main>
    </div>
  );
}
