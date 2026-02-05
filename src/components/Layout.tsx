import type { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

function Header() {
  return (
    <header className="header">
      <h1>TaskFlow</h1>
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
