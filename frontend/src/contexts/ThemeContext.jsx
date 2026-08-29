import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

/*
  Two looks, one markup tree.

  The theme only ever sets data-theme on <html>; every visual difference
  lives in CSS. Nothing in the components knows which theme is on, so the
  plain theme keeps working untouched no matter what the brutal one does.
*/
const THEMES = ['plain', 'brutal'];

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem('emergency_theme');
      return THEMES.includes(saved) ? saved : 'plain';
    } catch {
      return 'plain';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('emergency_theme', theme);
    } catch { /* localStorage unavailable */ }

    document.documentElement.dataset.theme = theme;

    // Keep the browser chrome in step with the page it is framing
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = theme === 'brutal' ? '#ffd60a' : '#a81f19';
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((current) => (current === 'brutal' ? 'plain' : 'brutal'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
}
