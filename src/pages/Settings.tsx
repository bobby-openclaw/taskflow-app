import { useThemeContext } from '../context';

export function Settings() {
  const { theme, toggleTheme } = useThemeContext();

  return (
    <div className="max-w-2xl animate-fade-in">
      <h2 className="text-2xl font-bold mb-6">Settings</h2>
      
      <div className="card p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4">Appearance</h3>
        
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Theme</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Currently using {theme} mode
            </p>
          </div>
          <button className="btn btn-secondary" onClick={toggleTheme}>
            {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
          </button>
        </div>
      </div>

      <div className="card p-6">
        <h3 className="text-lg font-semibold mb-4">About</h3>
        <p className="text-gray-500 dark:text-gray-400 mb-2">TaskFlow v1.0.0</p>
        <p className="text-gray-500 dark:text-gray-400">
          A simple task management app built with React 19, TypeScript, and Tailwind CSS.
        </p>
      </div>
    </div>
  );
}
