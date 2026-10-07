import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    // Check initial
    if (document.documentElement.classList.contains('light-theme')) {
      setTheme('light');
    }
  }, []);

  const toggleTheme = () => {
    if (theme === 'dark') {
      document.documentElement.classList.add('light-theme');
      setTheme('light');
    } else {
      document.documentElement.classList.remove('light-theme');
      setTheme('dark');
    }
  };

  return (
    <button className="theme-toggle" onClick={toggleTheme} aria-label="Alternar tema">
      <div className="theme-toggle-track">
        <div className="theme-toggle-thumb" style={{ transform: theme === 'light' ? 'translateX(100%)' : 'translateX(0)' }}>
          {theme === 'dark' ? '🌙' : '☀️'}
        </div>
      </div>
    </button>
  );
}
