import { Outlet, NavLink } from 'react-router-dom';
import { useThemeContext } from '../context';

function Header() {
  const { theme, toggleTheme } = useThemeContext();

  return (
    <header className="header">
      <h1>TaskFlow</h1>
      <nav className="nav">
        <NavLink 
          to="/" 
          end
          className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
        >
          Dashboard
        </NavLink>
        <NavLink 
          to="/settings"
          className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
        >
          Settings
        </NavLink>
      </nav>
      <button className="theme-toggle" onClick={toggleTheme}>
        {theme === 'light' ? '🌙' : '☀️'}
      </button>
    </header>
  );
}

export function Layout() {
  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}
