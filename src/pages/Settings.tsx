import { useThemeContext } from '../context';

export function Settings() {
  const { theme, toggleTheme } = useThemeContext();

  return (
    <div className="settings">
      <h2>Settings</h2>
      
      <div className="settings-section">
        <h3>Appearance</h3>
        
        <div className="setting-item">
          <label>
            <span>Theme</span>
            <button className="theme-btn" onClick={toggleTheme}>
              {theme === 'light' ? '🌙 Switch to Dark' : '☀️ Switch to Light'}
            </button>
          </label>
        </div>
      </div>

      <div className="settings-section">
        <h3>About</h3>
        <p>TaskFlow v1.0.0</p>
        <p>A simple task management app built with React 19.</p>
      </div>
    </div>
  );
}
