import { Outlet, NavLink } from 'react-router-dom';
import { useThemeContext } from '../context';

function Header() {
  const { theme, toggleTheme } = useThemeContext();

  return (
    <header className="flex items-center gap-8 px-6 py-4 bg-gray-100 border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700 transition-colors duration-200">
      <h1 className="text-2xl font-bold">TaskFlow</h1>
      <nav className="flex gap-2 flex-1">
        <NavLink 
          to="/" 
          end
          className={({ isActive }) => 
            `px-4 py-2 rounded-lg transition-all duration-200 ${
              isActive 
                ? 'bg-indigo-600/20 text-indigo-600 dark:text-indigo-400' 
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-700'
            }`
          }
        >
          Dashboard
        </NavLink>
        <NavLink 
          to="/settings"
          className={({ isActive }) => 
            `px-4 py-2 rounded-lg transition-all duration-200 ${
              isActive 
                ? 'bg-indigo-600/20 text-indigo-600 dark:text-indigo-400' 
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-700'
            }`
          }
        >
          Settings
        </NavLink>
      </nav>
      <button 
        onClick={toggleTheme}
        className="p-2 text-xl hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-all duration-200 hover:scale-110"
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      >
        {theme === 'light' ? '🌙' : '☀️'}
      </button>
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
